const Path = require("path")
const FS = require("fs")


function cleanDir(aDir, aRemoveSelf) {
    if (FS.existsSync(aDir)) {
        const list = FS.readdirSync(aDir);
        list.forEach(aFileName => {
            const fullPath = Path.join(aDir, aFileName)
            if (FS.statSync(fullPath).isDirectory()) {
                this.cleanDir(aDir, false);
                FS.unlinkSync(fullPath)
            }
            else {
                FS.unlinkSync(fullPath)
            }
        });

        if (aRemoveSelf) {
            FS.unlinkSync(aDir);
        }
    }
}


function getFiles(aDir, aFilter, aList) {
    const list = FS.readdirSync(aDir);
    const files = aList ?? [];
    list.forEach(aFileName => {
        const fullPath = Path.join(aDir, aFileName)
        if (FS.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, aFilter, files)
        }
        else if(Path.extname(aFileName) === aFilter){
            files.push(fullPath);
        }
    });

    return files;
}

module.exports = {
    cleanDir: cleanDir,
    getFiles: getFiles
}