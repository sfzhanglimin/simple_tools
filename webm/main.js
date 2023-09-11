const Config = require("./config")
const Path = require("path")
const FS = require("fs")

const Convert = require("./vp9-2-png")
const Webm = require("./webm")

function run() {
    const list = []

    findVp9(Config.src, list)

    const vp9Convert = new Convert()
    const webm = new Webm()
    const config = {}

    const webmOutput = Path.join(__dirname, "cache")

    if(!FS.existsSync(webmOutput)){
        FS.mkdirSync(webmOutput,{recursive:true})
    }

    list.forEach(aFile => {
        config.ffmpeg = Config.ffmpeg
        config.src = aFile
        vp9Convert.run(config)

        

        webm.run({
            dir:[config.output],
            root: config.output,
            output: webmOutput,
            ffmpeg: Config.ffmpeg
        })
    });



}

function findVp9(aDir, aList) {
    const list = FS.readdirSync(aDir);
    list.forEach(aFile => {
        const fullPath = Path.join(aDir,aFile)
        if (FS.statSync(fullPath).isDirectory()) {
            findVp9(fullPath, aList)
        }
        else if (Path.extname(aFile) === Config.ext) {
            aList.push(fullPath)
        }
    });
}

run()