const Path = require("path")
const FS = require("fs")
const PNG = require("pngjs").PNG;
const Execute = require("child_process")

let REGEX = /(\.png|\.jpg|\.jpeg)$/i;

const TEMP_DIR = Path.join(__dirname, "temp");

const packConfigPath = Path.join(__dirname, 'pack-config.json');
const PACK_CONFIG = JSON.parse(FS.readFileSync(packConfigPath, 'utf8'));

//ffmpeg -framerate 25 -i input_%03d.png -c:v libvpx-vp9 -b:v 1M output.webm
class Webm {
    _config = null;

    init() {

    }

    saveMd5() {
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
            let cmd = `"${this._config.ffmpeg}" -framerate 30 -i ${Path.join(TEMP_DIR, `%d.png`)} -c:v libvpx -pix_fmt yuv420p -auto-alt-ref 1 -y -b:v 250K  ${outputPath}`
            Execute.execSync(cmd)
            FS.renameSync(outputPath, outputPath.replace(".webm", ".bin"));

            outputPath = Path.join(outputDir, Path.basename(aPath).toLocaleLowerCase() + "_alpha.webm");
            cmd = `"${this._config.ffmpeg}" -framerate 30 -i ${Path.join(TEMP_DIR, `alpha_%d.png`)} -c:v libvpx -pix_fmt yuv420p -auto-alt-ref 1 -y -b:v 50K  ${outputPath}`
            Execute.execSync(cmd)
            FS.renameSync(outputPath, outputPath.replace(".webm", ".bin"));
            aCallback();
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


    checkCanConvert(aDir) {
        return true;
    }


    getMd5(aPath) {
        return //Crypto.createHash('md5').update(FS.readFileSync(aPath)).digest('hex');
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

if (process.argv[1] === __filename) {
    new Webm().run()
}

module.exports = Webm