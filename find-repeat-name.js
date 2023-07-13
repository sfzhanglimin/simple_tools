const Path = require("path")
const FS = require("fs")

const ROOT_DIR = "D:\\work\\fish_h5\\assets"

function run() {
    let files = []
    let dirs = []
    convertFiles(ROOT_DIR, dirs)

    for (let i = dirs.length - 1; i >= 0; --i) {
        convert(dirs[i]);
    }
}

function convertFiles(aDirPath, aDirs) {
    let list = FS.readdirSync(aDirPath)
    list.forEach(element => {
        let dir = Path.join(aDirPath, element)
        let state = FS.statSync(dir);
        if (state.isDirectory()) {
            let dirPath = Path.join(aDirPath, element)
            aDirs.push(dirPath);
            convertFiles(dirPath, aDirs);
        }
        else if (state.isFile()) {
            convert(aDirPath, element)
        }
    });
}

const mapDir = {}

function convert(aDir, aFile) {
    if (!!aFile) {
        let filePath = Path.join(aDir, aFile);
        if (Path.extname(filePath) === ".ts") {
            let str = FS.readFileSync(filePath, "utf8");
            const matchArray = str.match(/@ccclass.*\(.*\)/g);
            if (!!matchArray) {
                const subs = matchArray[0].split(/\"|\'/);
                if (subs && subs.length > 1) {
                    let className = subs[1];
                    className = className.replace("\"","\'");
                    if (!!!mapDir[className]) {
                        mapDir[className] = filePath;
                    }
                    else {
                        console.log(`查询到${filePath} 和\n${mapDir[className]} 重复使用类名`)
                    }
                }
            }
        }
    }
}

run()

