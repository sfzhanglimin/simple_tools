const Path = require("path");
const FS = require("fs");

function run() {
    const files = FS.readdirSync(__dirname);
    files.forEach(aFile => {
        if (Path.extname(aFile) === ".atlas") {
            readWrite(Path.join(__dirname, aFile))
        }
    });
}

function readWrite(aFile) {
    const text = FS.readFileSync(aFile, "utf8");
    const lines = text.split("\n");
    let writeText = "";
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].replace(/\r/g, "").trim();

        if (!line.startsWith("index")) {
            const p = line.split(":")
            if (p && p.length < 2) {
                writeText += line + "\n"
                continue
            }
            const n = p[1].split(",")
            if (n && n.length > 0) {
                writeText += p[0] + ":"
                const nLen = n.length
                for (let j = 0; j < nLen; j++) {
                    const num = Number(n[j].trim());
                    if(isNaN(num)){                       
                        writeText += n[j]
                        if(nLen > 0 &&j !== (nLen - 1)){
                            writeText += ","
                        }
                    }
                    else{
                        const v = Math.floor(Number(n[j].trim()) * 0.5)
                        writeText += v
                        if(nLen > 0 &&j !== (nLen - 1)){
                            writeText += ","
                        }
                    }
                }
                writeText += "\n"
            }
        }
        else {
            writeText += line + "\n"
        }
    }
    
    const parent = Path.join(__dirname,"cache")
    if(!FS.existsSync(parent)){
        FS.mkdirSync(parent)
    }
    const newFile = Path.join(parent,Path.basename(aFile));
    FS.writeFileSync(newFile, writeText, "utf8");
}

run()