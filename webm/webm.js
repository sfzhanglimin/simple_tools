const Path = require("path")
const FS = require("fs")
const PNG = require("pngjs").PNG;
const Execute = require("child_process")

let REGEX = /(\.png|\.jpg|\.jpeg)$/i;

let Crypto = require('crypto');

const TEMP_DIR = Path.join(__dirname, "temp");

const packConfigPath = Path.join(__dirname, "..", 'pack-config.json');
const PACK_CONFIG = JSON.parse(FS.readFileSync(packConfigPath, 'utf8'));

const FFmepg = "D:/Program Files/ffmpeg/bin/ffmpeg.exe"
const Magick = "D:\\Program Files\\ImageMagick\\magick.exe"
//ffmpeg -framerate 25 -i input_%03d.png -c:v libvpx-vp9 -b:v 1M output.webm
class Webm {
    _config = null;

    _md5Cache = null;

    init() {
        const md5Path = Path.join(__dirname, "cache.json");
        if (FS.existsSync(md5Path)) {
            const fileString = FS.readFileSync(md5Path);
            try {
                this._md5Cache = JSON.parse(fileString);
            }
            catch (aE) {
                console.log("============md5 cache资源格式错误.删掉")
                FS.unlinkSync(md5Path);
            }
        }

        if (!this._md5Cache) {
            this._md5Cache = {}
        }
    }

    saveMd5() {
        if (this._md5Cache) {
            const md5Path = Path.join(__dirname, "cache.json");
            FS.writeFileSync(md5Path, JSON.stringify(this._md5Cache));
        }
    }

    run(aCfg) {
        this.init()
        this._config = aCfg;
        this.checkAndConvert(aCfg.dir)
    }

    checkTemp() {
        if (FS.existsSync(TEMP_DIR)) {
            const list = FS.readdirSync(TEMP_DIR);
            list.forEach(aFileName => {
                FS.unlinkSync(Path.join(TEMP_DIR, aFileName))
            });
        }
        else {
            FS.mkdirSync(TEMP_DIR, { recursive: true })
        }
    }

    checkAndConvert(aDirList) {
        const path = aDirList.pop();
        if (path && FS.existsSync(path) && this.checkCanConvert(path)) {
            this.convert(path, () => {
                this.saveMd5();
                this.checkAndConvert(aDirList);
            })
        }
        else if (aDirList.length > 0) {
            this.checkAndConvert(aDirList);
        }
        else {
            this._config.callback();
        }
    }

    convert(aPath, aCallback) {
        if (FS.statSync(aPath).isDirectory()) {
            const list = FS.readdirSync(aPath);
            this.checkTemp();
            this.renamePngs(aPath, list);
            const outputDir = aPath.replace(this._config.root, this._config.output)
            // -auto-alt-ref 0
            // const cmd = `"${FFmepg}" -framerate 25 -i ${Path.join(TEMP_DIR, `%d.png`)} -c:v libvpx-vp9 -y -pix_fmt yuva420p -b:v 1M ${Path.join(outputDir, Path.basename(aPath).toLocaleLowerCase() + ".webm")}`
            let outputPath = Path.join(outputDir, Path.basename(aPath).toLocaleLowerCase() + ".webm");
            let cmd = `"${FFmepg}" -framerate 30 -i ${Path.join(TEMP_DIR, `%d.png`)} -c:v libvpx -pix_fmt yuv420p -auto-alt-ref 1 -y -b:v 250K  ${outputPath}`
            this.executeCmds([cmd], () => {
                FS.renameSync(outputPath, outputPath.replace(".webm", ".bin"));

                outputPath = Path.join(outputDir, Path.basename(aPath).toLocaleLowerCase() + "_alpha.webm");
                cmd = `"${FFmepg}" -framerate 30 -i ${Path.join(TEMP_DIR, `alpha_%d.png`)} -c:v libvpx -pix_fmt yuv420p -auto-alt-ref 1 -y -b:v 50K  ${outputPath}`
                this.executeCmds([cmd], () => {
                    FS.renameSync(outputPath, outputPath.replace(".webm", ".bin"));
                    aCallback();
                })
            })
        }
        else {
            aCallback();
        }
    }

    renamePngs(aRoot, aList) {
        if (aList.length > 1) {
            let str1 = aList[0];
            let str2 = aList[1];
            let nums1 = str1.match(/\d+/g);
            let nums2 = str2.match(/\d+/g);
            let index = -1;
            if (nums1.length === nums2.length) {
                for (let i = 0; i < nums1.length; ++i) {
                    if (nums1[i] !== nums2[i]) {
                        index = i;
                        break;
                    }
                }

                if (index >= 0) {
                    for (let i = 0; i < aList.length; ++i) {
                        const path = aList[i];
                        let matchs = path.match(/\d+/g);
                        const outs = Path.join(TEMP_DIR, `${matchs[index]}.png`);

                        const outputPath = Path.join(aRoot, path)

                        this.optimizePng(outputPath, outs)

                        this.convertPngPiext(outs)
                    }
                }
            }
        }
        else if (aList.length > 0) {
            FS.copyFileSync(aRoot, Path.join(aList[0]), Path.join(TEMP_DIR, `${i}.png`));
        }
    }

    optimizePng(aRoot, aOutput) {
        FS.copyFileSync(aRoot, aOutput);
    }

    convertPngPiext(aPath) {
        const stream = FS.readFileSync(aPath);
        const png = PNG.sync.read(stream);
        const data = png.data;
        for (let i = 0; i < data.length; i += 4) {
            data[i] = data[i + 3];
            data[i + 1] = 0;
            data[i + 2] = 0;
            data[i + 3] = 0;
        }
        const parent = Path.dirname(aPath);
        const newEx = Path.join(parent, "alpha_" + Path.basename(aPath))
        const buffer = PNG.sync.write(png)
        FS.writeFileSync(newEx, buffer);
    }

    checkConfig(aDir) {
        let sort = aDir.replace(this._config.root, "");
        sort = sort.replace(/\\/g, "/");
        sort = sort.substring(0, 1) === "/" ? sort.substring(1) : sort;

        const key = sort.substring("slot-".length, sort.indexOf("/"))
        let result = false;
        if (Object.prototype.hasOwnProperty.call(PACK_CONFIG, key)) {
            const cfg = PACK_CONFIG[key];
            const sub = sort.substring(`slot-${key}/`.length);
            if (typeof (cfg.all) === "boolean") {
                result = cfg.all;
            }
            else if (!!cfg.webm_must) {
                result = cfg.webm_must.indexOf(sub) >= 0;
            }
            else if (!!cfg.webm_skip) {
                result = cfg.webm_must.indexOf(sub) < 0;
            }
        }

        return result;
    }

    checkCanConvert(aDir) {
        let result = this.checkConfig(aDir);
        if (result) {
            result = this.checkModify(aDir);
        }
        return result;
    }

    checkModify(aDir) {
        let result = false;
        let list = FS.readdirSync(aDir)
        let root = this._config.root;
        root = root.replace(/\\/g, "/");
        if (!root.endsWith("/")) {
            root += "/";
        }

        let dir = aDir.replace(/\\/g, "/");
        const key = dir.replace(root, "");
        let md5Map = this._md5Cache[key] ?? {}

        let findPng = false;
        for (let i = 0; i < list.length; ++i) {
            const fileName = list[i];
            if (Path.extname(fileName) === ".png") {
                findPng = true;
                const fileMd5 = this.getMd5(Path.join(aDir, fileName));
                const fileKey = Path.basename(fileName, ".png")
                if (!md5Map[fileKey] || md5Map[fileKey] !== fileMd5) {
                    result = true;
                    md5Map[fileKey] = fileMd5;
                }
            }
        }

        if (result) {
            this._md5Cache[key] = md5Map;
        }
        else if (findPng) {
            console.log(`资源目录没有变动,不需要转换:${key}`)
        }

        return result;
    }




    getMd5(aPath) {
        return Crypto.createHash('md5').update(FS.readFileSync(aPath)).digest('hex');
    }


    executeCmds(aCmds, aCallback) {
        let cmd = aCmds.pop();
        if (!!cmd) {
            console.log(`execute cmd:${cmd}`)
            Execute.exec(cmd, (aEE, aOut, aStr) => {
                console.log(`execute ${!!!aEE} ${aOut}`)

                this.executeCmds(aCmds, aCallback);
            })
        }
        else {
            aCallback();
        }
    }
}


// (new Webm()).run({ root: "D:\\work\\texturepacker\\output\\slot-289\\animations", output: Path.join(__dirname, "webm_output"), dir: ["D:\\work\\texturepacker\\output\\slot-289\\animations\\"], callback: () => { console.log("success") } });

module.exports = Webm