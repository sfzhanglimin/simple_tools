const Path = require("path")
const FS = require("fs")
const CMD = require("child_process")

class VP92Png {

    run(aCfg) {
        this.config = aCfg
        if (this.checkConfig()) {
            this.convert()
        }
    }

    convert() {
        this.checkTemp()
        const alpha = 16;
        let cmd = `"${this.config.ffmpeg}" -i ${this.config.src} `
        cmd += ` -pix_fmt rgba `
        cmd += ` ${Path.join(this.config.output, Path.basename(this.config.src))}_%d.png`


        // let commandLine = ""
        // //ffmpeg -i in.png -vf format=yuva444p,geq='if(lte(alpha(X,Y),16),255,p(X,Y))':'if(lte(alpha(X,Y),16),128,p(X,Y))':'if(lte(alpha(X,Y),16),128,p(X,Y))' out.jpg
        // commandLine += " -i \"" + path.resolve(inputDir, filesnamePrefix) + "%d.png\"";
        // commandLine += ` -vf format=yuva444p,geq='if(lte(alpha(X,Y),${alpha}),255,p(X,Y))':'if(lte(alpha(X,Y),${alpha}),128,p(X,Y))':'if(lte(alpha(X,Y),${alpha}),128,p(X,Y))'`
        // commandLine += " -y ";
        // commandLine += `\"${path.resolve(outputDir, "t" + filesnamePrefix.slice(0, filesnamePrefix.length - 1) + "%d.jpg")}\"`;

        const outstr = CMD.execSync(cmd);
    }

    checkTemp() {
        if (FS.existsSync(this.config.output)) {
            const list = FS.readdirSync(this.config.output);
            list.forEach(aFileName => {
                FS.unlinkSync(Path.join(this.config.output, aFileName))
            });
        }
        else {
            FS.mkdirSync(this.config.output, { recursive: true })
        }
    }

    checkConfig() {
        if (!this.config) {
            console.error("没有传入config")
            return false;
        }
        if (!this.config.src) {
            console.error("没有传入src资源路径")
            return false;
        }

        if (!FS.existsSync(this.config.src) || !FS.statSync(this.config.src).isFile()) {
            console.error("没有找到目标资源,或者目标不是文件");
            return false;
        }


        if (!this.config.ffmpeg || !FS.existsSync(this.config.ffmpeg)) {
            console.error("config.js文件里面没有配 ffmpeg 文件,或者不存在");
            return false;
        }


        if (!this.config.output || !FS.existsSync(this.config.output) || !FS.statSync(this.config.output).isDirectory()) {
            this.config.output = Path.join(__dirname, "split_cache")
            if (!FS.existsSync(this.config.output)) {
                FS.mkdirSync(this.config.output, { recursive: true })
            }
            console.warn("没有传入output导出路径,将导出到:" + this.config.output)
        }


        return true;
    }
}


if (process.argv[1] === __filename) {
    new VP92Png().run({
        src: "D:/work/fslots/Assets/Cocos2dx/Game335/Webm/EN_ZH_UHDL_JpFtr_RvlMjr_00000.webm",
    })

}


module.exports = VP92Png;