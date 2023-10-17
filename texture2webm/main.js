const Path = require("path")
const FS = require("fs")
const Config = require("./config")
const { cleanDir } = require("../common/common")
const FguiParser = require("./fgui")
const Sharp = require("sharp")
const Cmd = require("child_process")

const sprites = {}

const BASE_DIR = "D:/work/fslots/Assets/Creator/Basics"
const OUT_DIR = Path.join(__dirname, "cache")
const OUT_IMG_DIR = Path.join(OUT_DIR, "img")
const OUT_WEBM_DIR = Path.join(OUT_DIR, "webm")

if (!FS.existsSync(OUT_IMG_DIR)) {
    FS.mkdirSync(OUT_IMG_DIR, { recursive: true })
}
if (!FS.existsSync(OUT_WEBM_DIR)) {
    FS.mkdirSync(OUT_WEBM_DIR, { recursive: true })
}

cleanDir(OUT_IMG_DIR)
cleanDir(OUT_WEBM_DIR)

let finish = false;

async function main() {
    const list = []
    findAllBinFiles(BASE_DIR, list)

    await parseAndConvert(list, 0)
}

async function parseAndConvert(aFiles, aIdx) {
    const binPath = aFiles[aIdx];
    if (binPath) {
        const bytes = FS.readFileSync(binPath)
        const parser = (new FguiParser()).loadPackage(Uint8Array.from(bytes), Path.basename(binPath))

        loadSprites(parser)

        await split(parser);
        await parseAndConvert(aFiles, aIdx + 1)
    }
    else if (aIdx + 1 < aFiles.length) {
        await parseAndConvert(aFiles, aIdx + 1)
    }
}

function findAllBinFiles(aDir, aList) {
    if (FS.existsSync(aDir)) {
        const list = FS.readdirSync(aDir);
        list.forEach(aFileName => {
            const fullPath = Path.join(aDir, aFileName)
            if (FS.statSync(fullPath).isDirectory()) {
                this.findAllBinFiles(fullPath, aList);
            }
            else if (Path.extname(fullPath) === ".bin") {
                aList.push(fullPath)
            }
        });
    }
}

function split(parser, aIdx = 0) {
    return new Promise(resolve => {
        if (parser.clips.length > aIdx) {
            const clip = parser.clips[aIdx]
            cleanDir(OUT_IMG_DIR)
            splitPngForImages(clip, parser, () => {
                generateWebm(clip, parser.name)
                split(parser, aIdx + 1)
            })
        }
        else {
            resolve();
        }
    })
}

function generateWebm(aClip, aGameName) {
    const baseName = `${aGameName}_${aClip.id}`
    const cmd = `${Config.ffmpeg} -framerate 30 -f image2 -i "${Path.join(OUT_IMG_DIR, baseName + "_%d.png")}" -c:v libvpx-vp9 -b:v 1M -pix_fmt yuva420p "${OUT_WEBM_DIR}/${baseName}.webm"`
    FS.copyFileSync(Path.join(OUT_IMG_DIR, baseName + "_0.png"), Path.join(OUT_WEBM_DIR, baseName + "_0.png"));
    Cmd.execSync(cmd)
    console.log("")
}

function loadSprites(aParser) {
    sprites.length = 0;
    aParser.clips.forEach(aClip => {
        aClip.frames.forEach(aFrame => {
            if (!!!sprites[aFrame.atlas.id]) {
                const filePath = Path.join(BASE_DIR, `${aParser.name}_${aFrame.atlas.file}`)
                const buffers = Uint8Array.from(FS.readFileSync(filePath))
                sprites[aFrame.atlas.id] = buffers//Sharp(filePath)
            }
        });
    });
}

function splitPngForImages(aClip, aParser, aCallback, aIdx = 0) {
    if (!!aClip) {
        const info = aClip.frames[aIdx]
        if (!!info) {
            let item = sprites[info.atlas.id]
            if (!!!item) { splitPngForImages(aClip, aCallback, aIdx + 1); return; }

            item = Sharp(item)

            const miniPath = Path.join(OUT_IMG_DIR, `${aParser.name}_${aClip.id}_${aIdx}.png`)

            const newDir = Path.dirname(miniPath);
            if (!FS.existsSync(newDir)) {
                FS.mkdirSync(newDir, { recursive: true });
            }

            let single_png;
            const rect = info.sprite.rect
            const size = info.originalSize
            if (info.rotated) {
                // Handle rotated images
                item = item.extract({ left: rect.x, top: rect.y, height: rect.width, width: rect.height })
                item = item.rotate(270);
                //   single_png = Images(item, rect.x, rect.y, rect.height, rect.width).rotate(270);
                // image.rotate(180);
            } else {
                item = item.extract({ left: rect.x, top: rect.y, height: rect.height, width: rect.width })
                //   single_png = Images(item, rect.x, rect.y, rect.width, rect.height);
            }

            item.png().toBuffer((error, buff) => {
                let newImg = Sharp(buff)
                const extendInfo = {
                    left: info.rect.x,
                    right: size.width - info.rect.x - info.rect.width,
                    top: info.rect.y,
                    bottom: size.height - info.rect.y - info.rect.height,
                    background: { r: 0, g: 0, b: 0, alpha: 0 }
                }
                newImg = newImg.extend(extendInfo)
                console.log(`extend info:${extendInfo.bottom} idx:${aIdx}`)
                newImg.toFile(miniPath, (error) => {
                    if (error) console.log(`解析错误: ${info.atlas.file} idx:${aIdx}`)
                    splitPngForImages(aClip, aParser, aCallback, aIdx + 1);
                })
            })

        } else if (aCallback) {
            aCallback();
        }
    } else if (aCallback) {
        aCallback();
    }
}


main()