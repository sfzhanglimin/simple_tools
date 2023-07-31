const Path = require("path")
const FS = require("fs")
const ROOT_DIR = "D:\\will\\third\\testunity\\TS\\Src"

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

function convert(aDir, aFile) {
    if (!!aFile) {
        let file = aFile.toLocaleLowerCase();
        if (file !== aFile) {
            let filePath = Path.join(aDir, aFile);
            if(Path.extname(filePath) === ".ts"){
                let newPath = Path.join(aDir, file.replace(".ts",".mts"));
                FS.renameSync(filePath, newPath);
            }
        }
    }
    else {
        let sub = aDir.replace(ROOT_DIR, "")
        let file = sub.toLocaleLowerCase();
        let newFile = Path.join(ROOT_DIR, file)
        if (newFile !== aDir) {
            FS.renameSync(aDir, newFile);
        }
    }
}

run()
