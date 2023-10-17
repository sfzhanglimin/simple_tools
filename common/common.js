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

module.exports = {
    cleanDir: cleanDir
}