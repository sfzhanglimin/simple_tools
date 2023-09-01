const FS = require("fs")
const Path = require("path")

const DecodeUUID = require("../decode-uuid/decode-uuid")

class Decode {
    _root = "D:/work/simple_tools/download-assets/static.pgf-asw0zz.com/63/assets"
    run() {
        this.reNameAllMd5Name(this._root)
        let maps = {}
        this.findAll(maps)
    }

    reNameAllMd5Name(aDir) {
        const files = FS.readdirSync(aDir);
        files.forEach(aFile => {
            let full = Path.join(aDir, aFile)
            if (FS.statSync(full).isDirectory()) {
                this.reNameAllMd5Name(full)
            }
            else {
                let list = aFile.split(".")
                if (list.length > 2) {
                    list.splice(1, 1)
                }
                let newName = list.join(".")
                FS.renameSync(full, Path.join(aDir, newName))
            }
        });
    }

    findAll(aMap) {
        const list = this.findConfigs()
        Object.keys(list).forEach(aKey => {
            aMap[aKey] = {}
            this.listAllFiles(Path.dirname(list[aKey]), aMap[aKey])
            this.parseConfig(list[aKey], aMap[aKey])
        });

        console.log("sssssssss")
    }

    listAllFiles(aDir, aMaps) {
        const files = FS.readdirSync(aDir);
        files.forEach(aFile => {
            const subDir = Path.join(aDir, aFile);
            if (FS.statSync(subDir).isDirectory()) {
                this.listAllFiles(subDir, aMaps);
            }
            else {
                if (aMaps[aFile]) {
                    console.warn("找到重复key的文件 :" + aFile);
                }
                aMaps[aFile] = Path.join(aDir, aFile)
            }
        });
    }

    parseConfig(aConfigPath, aAllFiles) {
        const configData = JSON.parse(FS.readFileSync(aConfigPath, "utf-8"))
        if (configData.types.length > 0) {
            console.log("sssssss")
            let needIdx = []
            for (let i = 0; i < configData.types.length; ++i) {
                if (configData.types[i] === "cc.SpriteAtlas") {
                    needIdx.push(i);
                }
            }


            const longUUID = {}

            configData.uuids.forEach(element => {
                const uuid = DecodeUUID(element);
                longUUID[element] = uuid
                console.log(`解析出长uuid:${uuid} sort:${element}`)
            });

            Object.keys(configData.paths).forEach(aKey => {
                const element = configData.paths[aKey];
                if (element[1] === needIdx[0]) {
                    console.log("找到atlas:" + element[0])
                }
            });
        }
    }

    findConfigs() {
        const dis = {}
        const files = FS.readdirSync(this._root);
        files.forEach(aDir => {
            const subDir = Path.join(this._root, aDir);
            console.log(`subdir:${subDir}`)
            const state = FS.statSync(subDir);
            if (state.isDirectory()) {
                const subs = FS.readdirSync(subDir)
                subs.forEach(aFile => {
                    if (aFile.startsWith("config")) {
                        let dirName = Path.basename(subDir)
                        dis[dirName] = Path.join(subDir, aFile)
                    }
                });
            }
        });
        return dis;
    }
}

new Decode().run()