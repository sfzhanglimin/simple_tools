const common = require("../common/common")
const Path = require("path")
const toolPath = Path.join(__dirname,"FBX2glTF","FBX2glTF-windows-x86_64.exe")
const EXE = require("child_process")

class main {
    run(aSrc, aDst) {
        if (!aSrc || aSrc.length === 0 || !aDst || aDst.length === 0) {
            console.log("Usage: node main.js <src> <dst>")
            return;
        }

        const list = common.readAllFiles(aSrc,".fbx");
        for (let index = 0; index < list.length; index++) {
            const file = list[index];
           const result = EXE.execFileSync(toolPath,["-i",file,"-o",Path.join(aDst,Path.basename(file,".fbx"))])
           console.log(result.toString())
        }
    }
}

(new main()).run("D:/Users/zlm/Desktop/temp/ddd/output","D:/Users/zlm/Desktop/temp/ddd/gltf")
