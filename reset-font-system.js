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

const math = /\"_font\":.*\{[\s\S]+?\"c297c978-4a81-47fa-9857-d6aaa00521f7\"[\s\S]+?\},/g
// const math = /\"_font\":.*\{[\s\S]+?\"023d2623-42e9-40a8-8b80-599cf3b808f7\"[\s\S]+?\},/g
const replaceStr = "\"_font\":null,"
function convert(aDir, aFile) {
    if (!!aFile) {
        let filePath = Path.join(aDir, aFile);
        if (Path.extname(filePath) === ".prefab" || Path.extname(filePath) === ".scene") {
            let str = FS.readFileSync(filePath, "utf8");
            const match = str.matchAll(math);
            let replace = false;
            for (const iterator of match) {
                replace = true;
                str = str.replace(iterator[0], replaceStr)
            }

            // match.forEach(element => {
            //     replace = true;
            // });
            if (replace) {
                console.log("replace font :"+filePath)
                FS.writeFileSync(filePath, str);
            }
        }
    }
}

run()

