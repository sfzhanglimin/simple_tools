const Path = require("path")
const FS = require("fs")
const Execute = require("child_process")

let ROOT_DIR = Path.join(__dirname, "temp");
let OUTPUT_DIR = Path.join(__dirname, "textures")
let TexturePackerPath = "D:/Program Files/CodeAndWeb/TexturePacker/bin/TexturePacker.exe"

let REGEX = /(\.png|\.jpg|\.jpeg)$/i;
let MAX_SIZE = { w: 4096, h: 4096 }

class TexturePacker {
    compress() {
        const dirList = []
        const cmds = []
        if (FS.existsSync(OUTPUT_DIR)) {
            FS.rmSync(OUTPUT_DIR, { recursive: true });
        }
        this.find(ROOT_DIR, dirList);
        this.makeDirs(dirList);
        this.generateCmds(dirList, cmds);
        this.executeCmds(cmds)
    }

    find(aRoot, aList) {
        let list = FS.readdirSync(aRoot)
        list.forEach(element => {
            let dir = Path.join(aRoot, element)
            let state = FS.statSync(dir);
            if (state.isDirectory()) {
                let dirPath = Path.join(aRoot, element)
                aList.push(dirPath);
                this.find(dirPath, aList);
            }
        });
    }

    makeDirs(aDirList) {
        aDirList.forEach(aDir => {
            const cacheDir = aDir.replace(ROOT_DIR, OUTPUT_DIR);
            if (!FS.existsSync(cacheDir)) {
                FS.mkdirSync(cacheDir, { recursive: true });
            }
        });
    }

    executeCmds(aCmds) {
        let cmd = aCmds.pop();
        if (!!cmd) {
            console.log(`execute cmd:${cmd}`)
            Execute.exec(cmd, (aEE, aOut, aStr) => {
                console.log(`execute ${!!!aEE} ${aOut}`)

                this.executeCmds(aCmds);
            })
        }
        else {
            this.cleanEmptyDir(OUTPUT_DIR);
        }
    }

    checkHasPngs(aDir) {
        let result = false;
        let list = FS.readdirSync(aDir)
        for (let i = 0; i < list.length; ++i) {
            const fileName = list[i];
            if (REGEX.test(fileName)) {
                result = true
                break;
            }
        }
        return result;
    }

    cleanEmptyDir(aRoot) {
        let list = FS.readdirSync(aRoot)
        if (!!list && list.length > 0) {
            list.forEach(element => {
                let dir = Path.join(aRoot, element)
                let state = FS.statSync(dir);
                if (state.isDirectory()) {
                    let dirPath = Path.join(aRoot, element)
                    this.cleanEmptyDir(dirPath);
                }
            });
        }
        else {
            FS.rmdirSync(aRoot)
        }
    }

    generateCmds(aDirList, aCmdList) {
        for (let i = 0; i < aDirList.length; ++i) {
            let dir = aDirList[i]
            if (!this.checkHasPngs(dir)) {
                continue;
            }

            let baseName = Path.basename(dir)
            let output = dir.replace(ROOT_DIR, OUTPUT_DIR)
            let cmd = `"${TexturePackerPath}"`;
            cmd += " --extrude 1"
            cmd += " --trim-mode Trim"
            cmd += " --scale-mode Smooth"
            cmd += "  --pack-mode Best"
            cmd += "  --algorithm MaxRects"
            cmd += "  --maxrects-heuristics Best"
            cmd += "  --max-width " + MAX_SIZE.w
            cmd += "  --max-height " + MAX_SIZE.h
            cmd += `  --data ${Path.join(output, baseName)}.plist`
            cmd += `  --format cocos2d-x`
            cmd += `  --sheet ${Path.join(output, baseName)}.png`
            cmd += ` ${dir}`
            aCmdList.push(cmd);
        }
    }
}

(new TexturePacker()).compress();
