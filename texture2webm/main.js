const Path = require("path")
const FS = require("fs")
const Config = require("./config")
const { cleanDir } = require("../common/common")
const { LoadJta } = require("./fgui")
const Images = require("images")
// const Sharp = require("sharp")

const sprites = {}

const BASE_DIR = "D:/work/fslots/UI_Project/assets/Basics"
const OUT_DIR = Path.join(__dirname, "cache")

if (!FS.existsSync(OUT_DIR)) {
    FS.mkdirSync(OUT_DIR)
}


let finish = false;

async function main() {
    // const bytes = FS.readFileSync(Path.join(BASE_DIR,"Assets","FaFaFaWinMsg","plist",'Level7_firework_start_0000', "Level7_firework_start_0000.jta"))
    // const info = LoadJta(Uint8Array.from(bytes))
    // buffer2Png(info)


    

    let log = false;
}

function buffer2Png(aInfo) {
    for (let i = 0; i < aInfo.pngBuffers.length; ++i) {
        const buf = aInfo.pngBuffers[i];
        // const info = aInfo.

        FS.writeFileSync(outputPath, buf.data)
    }
}

function split(clips, aIdx = 0) {
    return new Promise(resolve => {
        if (clips.length > aIdx) {
            const clip = clips[aIdx]
            splitPngForImages(clip, () => {
                split(clips, aIdx + 1)
            })
        }
        else {
            resolve();
        }
    })
}

function loadSprites(clips) {
    clips.forEach(aClip => {
        aClip.frames.forEach(aFrame => {
            if (!!!sprites[aFrame.atlas.id]) {
                const filePath = Path.join(BASE_DIR, `Basics_${aFrame.atlas.file}`)
                const buffers = Uint8Array.from(FS.readFileSync(filePath))
                sprites[aFrame.atlas.id] = Images(filePath)
                // sprites[aFrame.atlas.id] = buffers//Sharp(filePath)
            }
        });
    });
}

function splitPngForImages(aClip, aCallback, aIdx = 0) {
    if (!!aClip) {
        const info = aClip.frames[aIdx]
        if (!!info) {
            let item = sprites[info.atlas.id]
            if (!!!item) { splitPngForImages(aClip, aCallback, aIdx + 1); return; }

            // item = Sharp(item)

            const miniPath = Path.join(OUT_DIR, `${Path.basename(info.atlas.file, Path.extname(info.atlas.file))}_${aIdx}.png`)

            const newDir = Path.dirname(miniPath);
            if (!FS.existsSync(newDir)) {
                FS.mkdirSync(newDir, { recursive: true });
            }

            let single_png;
            const rect = info.sprite.rect
            const size = info.originalSize
            if (info.rotated) {
                // Handle rotated images
                single_png = Images(item, rect.x, rect.y, rect.height, rect.width).rotate(270);
            } else {

                single_png = Images(item, rect.x, rect.y, rect.width, rect.height);
            }



            Images(size.width, size.height)
                .draw(single_png, (size.width - rect.width) * 0.5 + info.offset.x, (size.height - rect.height) * 0.5 + info.offset.y)
                .save(miniPath, { quality: 80 });

            splitPngForImages(aClip, aCallback, aIdx + 1);
        } else if (aCallback) {
            aCallback();
        }
    } else if (aCallback) {
        aCallback();
    }
}


main()