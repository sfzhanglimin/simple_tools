const Path = require("path")
const FS = require("fs")

const ROOT_DIR = "D:\\work\\simple_tools\\temp"

function run() {
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
            let newPath = Path.join(aDir, file);
            FS.renameSync(filePath, newPath);

            convertContent(newPath)
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

function convertContent(aFile) {
    const extName = Path.extname(aFile);
    let content = null;
    let writeAble = false;
    switch (extName) {
        /**spine 映射资源变小写 */
        case ".atlas": {
            writeAble = true;
            content = FS.readFileSync(aFile, "utf8");
            let list = content.split("\n");
            if (list[0] !== "\r") {
                list[0] = list[0].toLocaleLowerCase();
            }
            else {
                list[1] = list[1].toLocaleLowerCase();
            }
            content = list.join("\n");

        }
            break;
        /**plist映射资源变小写 */
        case ".plist": {
            writeAble = true;
            content = FS.readFileSync(aFile, "utf8");
            let findKey = "<key>realTextureFileName</key>"
            let pos = content.indexOf(findKey);
            if (pos >= 0) {
                const valuePos = content.indexOf("</string>", pos);
                let sub = content.substring(pos + findKey.length, valuePos);
                sub = sub.toLocaleLowerCase();

                content = content.substring(0, pos + findKey.length) + sub + content.substring(valuePos);
            }


            findKey = "<key>textureFileName</key>"
            pos = content.indexOf(findKey);
            if (pos >= 0) {
                const valuePos = content.indexOf("</string>", pos);
                let sub = content.substring(pos + findKey.length, valuePos);
                sub = sub.toLocaleLowerCase();

                content = content.substring(0, pos + findKey.length) + sub + content.substring(valuePos);
            }
        }
            break;
    }

    if (writeAble && content) {
        FS.writeFileSync(aFile, content);
    }
}

run()

