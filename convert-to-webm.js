const Path = require("path")
const FS = require("fs")
const Execute = require("child_process").exec
const ROOT_DIR = "D:\\Users\\zlm\\Desktop\\test\\CrabMeter"
const OUT_DIR_ROOT = "d:\\FFOutput"

const format = "\"D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe\""
// "D:\Program Files\ffmpeg\bin\ffmpeg.exe" -y -i "d:\88F_SLOT_INTRO.mp3" -b:a "32k" "d:\tt32.ogg"
function run() {
    let files = []
    convertWebmFiles(ROOT_DIR)

    doCmds();
}

function convertWebmFiles(aDirPath) {
    let list = FS.readdirSync(aDirPath)
    list.forEach(element => {
        let dir = Path.join(aDirPath, element)
        let state = FS.statSync(dir);
        if (state.isDirectory()) {
            let dirPath = Path.join(aDirPath, element)
            convertWebmFiles(dirPath);
        }
        else if (state.isFile()) {
            convertWebm(aDirPath, element)
        }
    });
}


let count = 30;

let cmds = [];

function convertWebm(aDir, aFile) {
    let file = aFile.toLocaleLowerCase();
    let filePath = Path.join(aDir, aFile);
    let extName = Path.extname(file);
    // if (file.endsWith(".mp3")) {
    //     FS.unlinkSync(filePath)
    // }
    // else if (file.endsWith(".mp3.meta")) {
    //     console.log(`relname ${file}`)
    //     const newName = filePath.replace(".mp3.meta", ".ogg.meta")
    //     FS.renameSync(filePath, newName)
    // }    


    if (extName === ".webm") {
        let sub = aDir.replace(ROOT_DIR, OUT_DIR_ROOT)
        // const file = aFile.replace(".mp3", ".ogg");
        let output = Path.join(sub, file);

        const cmd = `${format} -y -i "${filePath}" -c:v vp8 ${output}`
        cmds.push({ cmd: cmd, dir: sub, file: file, output: output });
    }
}


let execount = 0;
function doCmds() {
    if (cmds.length > 0) {
        if (count > 0) {
            console.log(`execute count:${execount++}`)
            count--;
            const cmd = cmds.pop();
            if (!FS.existsSync(cmd.dir)) {
                FS.mkdirSync(cmd.dir, { recursive: true });
            }
            Execute(cmd.cmd, (aE, aOut, aStr) => {
                if (!!aE) {
                    console.log(`execute ${cmd.cmd} failed!!!!`)
                }
                else {
                    console.log(`execute ${cmd.cmd} success!!!!`)
                    let output = cmd.output;
                    let newPath = output.replace(".webm",".bin")
                    FS.renameSync(output,newPath)
                }
                count++;
                doCmds();
            })
        }
    }
}

run()
