const FS = require("fs")
const Path = require("path")
const fetch = require("node-fetch")


class DownloadAssets {
    assetUrlDir = null;
    urls = []
    constructor(aUrls) {
        this.assetUrlDir = aUrls
    }

    readDir(aDir) {
        let list = FS.readdirSync(aDir)
        list.forEach(aFile => {
            const filePath = Path.join(aDir, aFile)
            if (FS.statSync(filePath).isDirectory()) {

            }
            else {
                let str = FS.readFileSync(filePath, "utf-8");
                str = str.replace(/\r\n/g, "\n")
                const split = str.split("\n")
                split.forEach(aUrl => {
                    this.urls.push(aUrl.trim());
                });
            }
        });
    }

    downLoad(aUrls) {
        let url = aUrls.pop()
        if (url) {
            fetch(url, { method: "get" }).then(response => {
                if (response.ok) {
                    const urlInfo = Path.parse(url);
                    const dirs = url.split("/");
                    const filepath = url.replace(dirs[0], __dirname)
                    const dir = Path.dirname(filepath);
                    if (!FS.existsSync(dir)) {
                        FS.mkdirSync(dir, { recursive: true });
                    }

                    response.buffer().then(aBuffer => {
                        FS.writeFileSync(filepath, aBuffer)
                        console.log(`下载资源:${filepath}`)

                        this.downLoad(aUrls)
                    })
                }
                else {
                    console.log(`下载资源失败:${filepath}`)
                }
            })
        }
        else if (aUrls.length > 0) {
            this.downLoad(aUrls)
        }
        else {
            console.log(`下载完成`)
        }
    }

    run() {
        this.readDir(this.assetUrlDir)
        this.downLoad(this.urls)
    }
}


new DownloadAssets(Path.join(__dirname, "urls")).run()


