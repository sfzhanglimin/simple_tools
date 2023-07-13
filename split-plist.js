const Path = require("path")
const FS = require("fs")
const PlistParser = require("plist")
const Images = require("images")
const ROOT_DIR = "D:\\work\\fish_h5\\assets\\slot"
const OUT_DIR_ROOT = "d:\\FFOutput"


// const format = "\"D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe\""
// "D:\Program Files\ffmpeg\bin\ffmpeg.exe" -y -i "d:\88F_SLOT_INTRO.mp3" -b:a "32k" "d:\tt32.ogg"
function run() {
    // let files = []
    function getAllPlistFiles(dir) {
        let files = FS.readdirSync(dir);
        files.forEach(file => {
            let fullPath = Path.join(dir, file);
            if (FS.statSync(fullPath).isDirectory()) {
                getAllPlistFiles(fullPath);
            } else if (Path.extname(file) === '.plist') {
                convert(dir, file);
            }
        });
    }

    let directoryPath = process.argv[2];
    getAllPlistFiles(directoryPath);

    doCmds();
}

/* function convertFiles(aDirPath) {
    let list = FS.readdirSync(aDirPath)
    list.forEach(element => {
        let dir = Path.join(aDirPath, element)
        let state = FS.statSync(dir);
        if (state.isDirectory()) {
            let dirPath = Path.join(aDirPath, element)
            convertFiles(dirPath);
        }

        else if (state.isFile()) {
            convert(aDirPath, element)
        }
    });
} */


// let count = 30;

let plistFiles = [];

function convert(aDir, aFile) {
    // let file = aFile.toLocaleLowerCase();
    let filePath = Path.join(aDir, aFile);
    // let extName = Path.extname(file);

    // if (extName === ".plist") {
    //     let convert = filePath.replace(/\\/g, "/");
    //     // const match = convert.match(/animation\/|animations\//g)
    //     if (!!match) {
    plistFiles.push(filePath);
    //     }
    // }
}

function doCmds() {
    if (plistFiles.length > 0) {
        const plistFile = plistFiles.pop()
        const data = FS.readFileSync(plistFile, "utf-8");
        const framesData = PlistParser.parse(data)
        const dir = Path.dirname(plistFile);
        let sub = Path.basename(plistFile, Path.extname(plistFile));
        sub = sub.toLocaleLowerCase()
        let outputDir = dir.replace(ROOT_DIR, OUT_DIR_ROOT)
        // outputDir = Path.join(outputDir, sub)

        let bigPngPath = framesData["metadata"]["realTextureFileName"];
        if (!!bigPngPath) {
            bigPngPath = Path.join(dir, bigPngPath);
            if (!FS.existsSync(bigPngPath)) {
                bigPngPath = null;
                console.log(`1 plist解析错误:${plistFile}`)
            }
        }
        else {
            bigPngPath = null;
            console.log(`2 plist解析错误:${plistFile}`)
        }

        const frames = framesData["frames"]
        if (!!frames) {
            const plistInfos = []

            for (const key in frames) {
                if (Object.hasOwnProperty.call(frames, key)) {
                    const element = frames[key];
                    const frameStr = element["frame"] ?? element["textureRect"]
                    if (!!frameStr) {
                        const jsonStr = frameStr.replace(/\{/g, "\[").replace(/\}/g, "\]")
                        const jsonData = JSON.parse(jsonStr)
                        const frameInfo = { x: jsonData[0][0], y: jsonData[0][1], w: jsonData[1][0], h: jsonData[1][1],rotated:element.rotated };

                        const miniPath = Path.join(outputDir, sub, key)
                        plistInfos.push({ frameInfo: frameInfo, outPath: miniPath })
                    }
                    else {
                        console.log(`4 plist解析错误:${plistFile}`)
                    }
                }
            }

            const item = Images(bigPngPath);
            splitPngForImages(item, plistInfos, () => {
                doCmds();
            })
        }
        else {
            console.log(`3 plist解析错误:${plistFile}`)
        }
    }
}

/* function splitPngForImages(item, frameList, aCallback) {
    if (!!item && !!frameList) {
        const info = frameList.pop();
        if (!!info) {
            const frameInfo = info.frameInfo;
            const miniPath = info.outPath


            const newDir = Path.dirname(miniPath)
            if (!FS.existsSync(newDir)) {
                FS.mkdirSync(newDir, { recursive: true })
            }
            let single_png = Images(item, frameInfo.x, frameInfo.y, frameInfo.w, frameInfo.h);
            Images(frameInfo.w, frameInfo.h)
                .draw(single_png, 0, 0)
                .save(miniPath, { quality: 80 });
            splitPngForImages(item, frameList, aCallback)
        }
        else if (aCallback) {
            aCallback()
        }
    }
    else if (aCallback) {
        aCallback()
    }
} */
function splitPngForImages(item, frameList, aCallback) {
    if (!!item && !!frameList) {
        const info = frameList.pop();
        if (!!info) {
            const frameInfo = info.frameInfo;
            const miniPath = info.outPath;

            const newDir = Path.dirname(miniPath);
            if (!FS.existsSync(newDir)) {
                FS.mkdirSync(newDir, { recursive: true });
            }

            let single_png;
            if (frameInfo.rotated) {
                // Handle rotated images
                single_png = Images(item, frameInfo.x, frameInfo.y, frameInfo.h, frameInfo.w).rotate(270);
            } else {
                single_png = Images(item, frameInfo.x, frameInfo.y, frameInfo.w, frameInfo.h);
            }

            Images(frameInfo.w, frameInfo.h)
                .draw(single_png, 0, 0)
                .save(miniPath, { quality: 80 });

            splitPngForImages(item, frameList, aCallback);
        } else if (aCallback) {
            aCallback();
        }
    } else if (aCallback) {
        aCallback();
    }
}

run()
