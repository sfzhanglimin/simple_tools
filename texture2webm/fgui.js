let PackageItemType;
(function (PackageItemType) {
    PackageItemType[PackageItemType["Image"] = 0] = "Image";
    PackageItemType[PackageItemType["MovieClip"] = 1] = "MovieClip";
    PackageItemType[PackageItemType["Sound"] = 2] = "Sound";
    PackageItemType[PackageItemType["Component"] = 3] = "Component";
    PackageItemType[PackageItemType["Atlas"] = 4] = "Atlas";
    PackageItemType[PackageItemType["Font"] = 5] = "Font";
    PackageItemType[PackageItemType["Swf"] = 6] = "Swf";
    PackageItemType[PackageItemType["Misc"] = 7] = "Misc";
    PackageItemType[PackageItemType["Unknown"] = 8] = "Unknown";
    PackageItemType[PackageItemType["Spine"] = 9] = "Spine";
    PackageItemType[PackageItemType["DragonBones"] = 10] = "DragonBones";
})(PackageItemType || (PackageItemType = {}));

class Rect {
    x = 0;
    y = 0;
    width = 0;
    height = 0;
}

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    x = 0;
    y = 0;
}

class Size {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    width = 0;
    height = 0;
}


class ByteBuffer {
    constructor(buffer, offset, length) {
        this.version = 0;
        offset = offset || 0;
        if (length == null || length == -1)
            length = buffer.byteLength - offset;
        this._bytes = new Uint8Array(buffer, offset, length);
        this._view = new DataView(this._bytes.buffer, offset, length);
        this._pos = 0;
        this._length = length;
    }
    get data() {
        return this._bytes;
    }
    get position() {
        return this._pos;
    }
    set position(value) {
        if (value > this._length)
            throw "Out of bounds";
        this._pos = value;
    }
    skip(count) {
        this._pos += count;
    }
    validate(forward) {
        if (this._pos + forward > this._length)
            throw "Out of bounds";
    }
    readByte() {
        this.validate(1);
        return this._view.getUint8(this._pos++);
    }
    readBool() {
        return this.readByte() == 1;
    }
    readShort() {
        this.validate(2);
        let ret = this._view.getInt16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }
    readUshort() {
        this.validate(2);
        let ret = this._view.getUint16(this._pos, this.littleEndian);
        this._pos += 2;
        return ret;
    }
    readInt() {
        this.validate(4);
        let ret = this._view.getInt32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readUint() {
        this.validate(4);
        let ret = this._view.getUint32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readFloat() {
        this.validate(4);
        let ret = this._view.getFloat32(this._pos, this.littleEndian);
        this._pos += 4;
        return ret;
    }
    readString(len) {
        if (len == undefined)
            len = this.readUshort();
        this.validate(len);
        let v = "", max = this._pos + len, c = 0, c2 = 0, c3 = 0, f = String.fromCharCode;
        let u = this._bytes;
        let pos = this._pos;
        while (pos < max) {
            c = u[pos++];
            if (c < 0x80) {
                if (c != 0) {
                    v += f(c);
                }
            }
            else if (c < 0xE0) {
                v += f(((c & 0x3F) << 6) | (u[pos++] & 0x7F));
            }
            else if (c < 0xF0) {
                c2 = u[pos++];
                v += f(((c & 0x1F) << 12) | ((c2 & 0x7F) << 6) | (u[pos++] & 0x7F));
            }
            else {
                c2 = u[pos++];
                c3 = u[pos++];
                v += f(((c & 0x0F) << 18) | ((c2 & 0x7F) << 12) | ((c3 << 6) & 0x7F) | (u[pos++] & 0x7F));
            }
        }
        this._pos += len;
        return v;
    }
    readS() {
        var index = this.readUshort();
        if (index == 65534) //null
            return null;
        else if (index == 65533)
            return "";
        else
            return this.stringTable[index];
    }
    readSArray(cnt) {
        var ret = new Array(cnt);
        for (var i = 0; i < cnt; i++)
            ret[i] = this.readS();
        return ret;
    }
    writeS(value) {
        var index = this.readUshort();
        if (index != 65534 && index != 65533)
            this.stringTable[index] = value;
    }
    readColor(hasAlpha) {
        var r = this.readByte();
        var g = this.readByte();
        var b = this.readByte();
        var a = this.readByte();
        return new Color(r, g, b, (hasAlpha ? a : 255));
    }
    readChar() {
        var i = this.readUshort();
        return String.fromCharCode(i);
    }
    readBuffer() {
        var count = this.readUint();
        this.validate(count);
        var ba = new ByteBuffer(this._bytes.buffer, this._bytes.byteOffset + this._pos, count);
        ba.stringTable = this.stringTable;
        ba.version = this.version;
        this._pos += count;
        return ba;
    }
    seek(indexTablePos, blockIndex) {
        var tmp = this._pos;
        this._pos = indexTablePos;
        var segCount = this.readByte();
        if (blockIndex < segCount) {
            var useShort = this.readByte() == 1;
            var newPos;
            if (useShort) {
                this._pos += 2 * blockIndex;
                newPos = this.readUshort();
            }
            else {
                this._pos += 4 * blockIndex;
                newPos = this.readUint();
            }
            if (newPos > 0) {
                this._pos = indexTablePos + newPos;
                return true;
            }
            else {
                this._pos = tmp;
                return false;
            }
        }
        else {
            this._pos = tmp;
            return false;
        }
    }
}

class FguiParser {
    _sprites = {}
    _itemsById = {}
    _items = []

    clips = []

    loadJtaBuffer(aBuffer) {
        let buf = new ByteBuffer(aBuffer)

        const headlen = buf.readUshort();
        const head = buf.readString(headlen);
        const version = buf.readUint()
        const fps = buf.readByte()
        let p = buf.readByte()
        let s = buf.readByte()
        let t = buf.readByte()

        const rx = buf.readUshort()// boundRect.x
        const ry = buf.readUshort()// boundRect.y
        const rw = buf.readUshort()// boundRect.width
        const rh = buf.readUshort()// boundRect.height

        const spd = buf.readByte()
        const repeatDelay = buf.readByte();
        const swing = buf.readByte();
        const frameList = buf.readUshort()

        let rects = []
        for (let i = 0; i < frameList; ++i) {
            let rect = {}
            rect.delay = buf.readUshort();
            rect.x = buf.readUshort();
            rect.y = buf.readUshort();
            rect.w = buf.readUshort();
            rect.h = buf.readUshort();
            rect.idx = buf.readUshort();
            rects[rect.idx] = rect
        }

        const len = buf.readUshort();
        const pngBytes = []
        for (let i = 0; i < len; i++) {
            const pngBuff = buf.readBuffer()
            pngBytes.push(pngBuff)
        }

        return {
            version: version,
            head: head,
            boundRect: { x: rx, y: ry, w: rw, h: rh },
            frameList: rects,
            spd: spd,
            repeatDelay: repeatDelay,
            swing: swing,
            pngBuffers: pngBytes
        }
    }

    loadPackage(aBuffer, path) {
        let buffer = new ByteBuffer(aBuffer)
        if (buffer.readUint() != 0x46475549)
            throw "FairyGUI: old package format found in '" + path + "'";
        this.path = path;
        buffer.version = buffer.readInt();
        let ver2 = buffer.version >= 2;
        buffer.readBool();
        this.id = buffer.readString();
        this.name = buffer.readString();
        buffer.skip(20);
        let indexTablePos = buffer.position;
        let cnt;
        let i;
        let nextPos;
        let str;
        let branchIncluded;
        buffer.seek(indexTablePos, 4);
        cnt = buffer.readInt();
        let stringTable = new Array(cnt);
        buffer.stringTable = stringTable;
        for (i = 0; i < cnt; i++)
            stringTable[i] = buffer.readString();
        if (buffer.seek(indexTablePos, 5)) {
            cnt = buffer.readInt();
            for (i = 0; i < cnt; i++) {
                let index = buffer.readUshort();
                let len = buffer.readInt();
                stringTable[index] = buffer.readString(len);
            }
        }
        buffer.seek(indexTablePos, 0);
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++)
            this._dependencies.push({ id: buffer.readS(), name: buffer.readS() });
        if (ver2) {
            cnt = buffer.readShort();
            if (cnt > 0) {
                this._branches = buffer.readSArray(cnt);
                if (_branch)
                    this._branchIndex = this._branches.indexOf(_branch);
            }
            branchIncluded = cnt > 0;
        }
        buffer.seek(indexTablePos, 1);
        let pi;
        let pos = path.lastIndexOf('/');
        let shortPath = pos == -1 ? "" : path.substr(0, pos + 1);
        path = path + "_";
        cnt = buffer.readShort();

        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readInt();
            nextPos += buffer.position;
            pi = {}
            // pi.owner = this;
            pi.type = buffer.readByte();
            pi.id = buffer.readS();
            pi.name = buffer.readS();
            const piPath = buffer.readS(); //path
            pi.file = buffer.readS();
            pi.realFile = `${this.name}_${pi.file ? pi.file : ""}`
            buffer.readBool(); //exported
            pi.width = buffer.readInt();
            pi.height = buffer.readInt();
            switch (pi.type) {
                case PackageItemType.Image:
                    {
                        let scaleOption = buffer.readByte();
                        if (scaleOption == 1) {
                            buffer.readInt();
                            buffer.readInt();
                            buffer.readInt();
                            buffer.readInt();
                            buffer.readInt();
                        }
                        buffer.readBool();
                        break;
                    }
                case PackageItemType.MovieClip:
                    {
                        pi.smoothing = buffer.readBool();
                        pi.objectType = 1;
                        pi.rawData = buffer.readBuffer();

                        this.clips.push(pi)
                        break;
                    }
                case PackageItemType.Font:
                    {
                        buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Component:
                    {
                        buffer.readByte();
                        buffer.readBuffer();
                        break;
                    }
                case PackageItemType.Atlas:
                case PackageItemType.Sound:
                case PackageItemType.Misc:
                    {
                        // pi.file = path + PathUtils.mainFileName(pi.file);
                        break;
                    }
                case PackageItemType.Spine:
                case PackageItemType.DragonBones:
                    {
                        buffer.readFloat();
                        buffer.readFloat();
                        break;
                    }
            }
            if (ver2) {
                str = buffer.readS(); //branch
                if (str)
                    pi.name = str + "/" + pi.name;
                let branchCnt = buffer.readByte();
                if (branchCnt > 0) {
                    if (branchIncluded)
                        pi.branches = buffer.readSArray(branchCnt);
                    else
                        this._itemsById[buffer.readS()] = pi;
                }
                let highResCnt = buffer.readByte();
                if (highResCnt > 0)
                    pi.highResolution = buffer.readSArray(highResCnt);
            }
            this._items.push(pi);
            this._itemsById[pi.id] = pi;
            buffer.position = nextPos;
        }

        buffer.seek(indexTablePos, 2);
        cnt = buffer.readShort();
        for (i = 0; i < cnt; i++) {
            nextPos = buffer.readShort();
            nextPos += buffer.position;
            let itemId = buffer.readS();
            let pi = this._itemsById[buffer.readS()];
            let rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            let sprite = { atlas: pi, rect: rect, offset: new Vec2(), originalSize: new Size(0, 0) };
            sprite.rotated = buffer.readBool();
            if (ver2 && buffer.readBool()) {
                sprite.offset.x = buffer.readInt();
                sprite.offset.y = buffer.readInt();
                sprite.originalSize.width = buffer.readInt();
                sprite.originalSize.height = buffer.readInt();
            }
            else {
                sprite.originalSize.width = sprite.rect.width;
                sprite.originalSize.height = sprite.rect.height;
            }
            this._sprites[itemId] = sprite;
            buffer.position = nextPos;
        }

        this.clips.forEach(aClip => {
            this.loadMovieClip(aClip)
        });

        return this
    }



    loadMovieClip(item) {
        let buffer = item.rawData;
        buffer.seek(0, 0);
        item.interval = buffer.readInt() / 1000;
        item.swing = buffer.readBool();
        item.repeatDelay = buffer.readInt() / 1000;
        buffer.seek(0, 1);
        let frameCount = buffer.readShort();
        item.frames = Array(frameCount);
        let spriteId;
        let sprite;
        for (let i = 0; i < frameCount; i++) {
            let nextPos = buffer.readShort();
            nextPos += buffer.position;
            let rect = new Rect();
            rect.x = buffer.readInt();
            rect.y = buffer.readInt();
            rect.width = buffer.readInt();
            rect.height = buffer.readInt();
            let addDelay = buffer.readInt() / 1000;
            let frame = { rect: rect, addDelay: addDelay, texture: null };
            spriteId = buffer.readS();
            if (spriteId != null && (sprite = this._sprites[spriteId]) != null) {
                frame.atlas = sprite.atlas
                frame.rotated = sprite.rotated
                frame.sprite = sprite
                frame.offset = new Vec2(frame.rect.x - (item.width - frame.rect.width) / 2, -(frame.rect.y - (item.height - frame.rect.height) / 2));
                frame.originalSize = new Size(item.width, item.height);



                // let atlasTexture = this.getItemAsset(sprite.atlas);
                // if (atlasTexture) {
                //     item.width / frame.rect.width;
                //     let sf = new SpriteFrame();
                //     sf.texture = atlasTexture;
                //     sf.rect = sprite.rect;
                //     sf.rotated = sprite.rotated;
                //     sf.offset = new Vec2(frame.rect.x - (item.width - frame.rect.width) / 2, -(frame.rect.y - (item.height - frame.rect.height) / 2));
                //     sf.originalSize = new Size(item.width, item.height);
                //     frame.texture = sf;
                // }
            }
            item.frames[i] = frame;
            buffer.position = nextPos;
        }
    }
}


module.exports = FguiParser