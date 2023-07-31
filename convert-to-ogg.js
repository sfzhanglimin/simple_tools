const Path = require("path")
const FS = require("fs")
const Execute = require("child_process").exec
const ROOT_DIR = "D:\\work\\fish_h5\\assets"
const OUT_DIR_ROOT = "d:\\FFOutput"

const format = "\"D:\\Program Files\\ffmpeg\\bin\\ffmpeg.exe\""
// "D:\Program Files\ffmpeg\bin\ffmpeg.exe" -y -i "d:\88F_SLOT_INTRO.mp3" -b:a "32k" "d:\tt32.ogg"
function run() {
    let files = []
    convertFiles(ROOT_DIR)
    
    doCmds();
}

function convertFiles(aDirPath) {
    let list = FS.readdirSync(aDirPath)
    list.forEach(element => {
        let dir = Path.join(aDirPath, element)
        let state = FS.statSync(dir);
        if (state.isDirectory()) {
            let dirPath = Path.join(aDirPath, element)
            convertFiles(dirPath);
        }
        else if (state.isFile()) {
            convert(aDirPath, element)
        }
    });
}


let count = 30;

let cmds = [];

function convert(aDir, aFile) {
    let file = aFile.toLocaleLowerCase();
    let filePath = Path.join(aDir, aFile);
    let extName = Path.extname(file);


    if (extName === ".mp3") {
        let sub = aDir.replace(ROOT_DIR, OUT_DIR_ROOT)
        // const file = aFile.replace(".mp3", ".ogg");
        let output = Path.join(sub, file);

        const cmd = `${format} -y -i "${filePath}" -b:a "32k" ${output}`
        cmds.push({ cmd: cmd, dir: sub, file: file });
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
                }
                count++;
                doCmds();
            })
        }
    }
}

run()
