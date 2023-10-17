const Path = require("path")
const FS = require("fs")
const Config = require("./config")
const { cleanDir } = require("../common/common")

class EMFilePackage {
    outputData = new Uint8Array()
    config = null;
    checkSep() {
        let r = Path.sep === "/" ? "\\" : "/"
        let sep = r === "/" ? "\\" : "/"
        this.config.source_dir = this.config.source_dir.replace(r, sep)
        this.config.source_constrct = this.config.source_constrct.replace(r, sep);
        this.config.output_dir = this.config.output_dir.replace(r, sep)
    }

    run(aConfig) {
        this.config = aConfig
        this.checkSep()
        const result = {}
        result.remote_package_base = `${this.config.file_name}.data`
        result.package_name = result.remote_package_base;

        result.fileDirList = []

        const dirList = this.config.source_constrct.replace(/\\/g, "/").split("/")
        dirList.unshift("/")
        for (let i = 1; i < dirList.length; ++i) {
            result.fileDirList.push({ parent: dirList[i - 1], name: dirList[i] })
        }

        result.fileConfig = { files: [], remote_package_size: 0 }

        this.startLoad(this.config.source_dir, result)

        if (!FS.existsSync(this.config.output_dir)) {
            FS.mkdirSync(this.config.output_dir, { recursive: true })
        }

        const dataPath = Path.join(this.config.output_dir, this.config.file_name + ".data");
        FS.writeFileSync(dataPath, this.outputData);
        result.fileConfig.remote_package_size = FS.statSync(dataPath).size
        FS.writeFileSync(Path.join(this.config.output_dir, this.config.file_name + ".json"), JSON.stringify(result));
    }

    startLoad(aDir, aConfigData) {
        const files = FS.readdirSync(aDir)
        for (let i = 0; i < files.length; ++i) {
            const fullPath = Path.join(aDir, files[i]);
            if (FS.statSync(fullPath).isDirectory()) {
                this.checkDirectory(fullPath, aConfigData.fileDirList)
                this.startLoad(fullPath, aConfigData)
            }
            else {
                this.checkFile(fullPath, aConfigData.fileConfig.files)
            }
        }
    }

    checkDirectory(aFullPath, aConfigDirList) {
        let convertPath = aFullPath.replace(this.config.source_dir, "");
        let parent = this.config.source_constrct + Path.dirname(convertPath)
        parent = "/" + parent.replace(/\\/g, "/")
        if (parent.endsWith("/")) {
            parent = parent.substring(0, parent.length - 1)
        }
        let baseName = Path.basename(convertPath)
        aConfigDirList.push({ parent: parent, name: baseName })
    }

    checkFile(aFullPath, aConfigList) {
        const state = FS.statSync(aFullPath);
        const fileData = FS.readFileSync(aFullPath);
        let last = 0;
        if (aConfigList[aConfigList.length - 1]) {
            last = aConfigList[aConfigList.length - 1].end;
        }
        let convertPath = this.config.source_constrct + aFullPath.replace(this.config.source_dir, "");
        convertPath = "/" + convertPath.replace(/\\/g, "/");
        aConfigList.push({ filename: convertPath, start: last, end: last + state.size });

        const b = Buffer.concat([this.outputData, new Uint8Array(fileData)]);
        this.outputData = b
    }
}

new EMFilePackage().run(Config)