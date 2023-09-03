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

    checkValid(aUrls) {
        const map = {}
        for (let i = aUrls.length; i >= 0; i--) {
            const url = aUrls[i];

            if (!url || map[url] || !Path.extname(url).startsWith(".")) {
                aUrls.splice(i, 1)
            }
            else {
                map[url] = true;
            }
        }
    }

    ALL_COUNT = 0
    D_MAX = 30
    downLoad(aUrls, aCallback) {
        if (this.D_MAX > 0) {
            this.D_MAX--;
            let url = aUrls.pop()
            if (url) {
                const urlInfo = Path.parse(url);
                const dirs = url.split("/");
                let filepath = url.replace(dirs[0], Path.join(__dirname,"temp"))
                filepath = Path.normalize(filepath)
                filepath = filepath.replace(/\\/g,"/")
                const dir = Path.dirname(filepath);

                if (FS.existsSync(filepath)) {
                    this.D_MAX++;
                    this.ALL_COUNT++;
                    console.log(`已经下载资源:${filepath} count:${this.ALL_COUNT}`)
                    this.downLoad(aUrls)
                    return;
                }

                fetch(url, { method: "get" }).then(response => {
                    if (response.ok) {                        
                        response.buffer().then(aBuffer => {
                            if (!FS.existsSync(dir)) {
                                FS.mkdirSync(dir, { recursive: true });
                            }
                            FS.writeFileSync(filepath, aBuffer)
                            console.log(`下载资源:${filepath} count:${this.ALL_COUNT}`)
                            this.ALL_COUNT++;
                            this.D_MAX++
                            this.downLoad(aUrls)
                        })
                    }
                    else {
                        this.D_MAX++
                        aUrls.push(url);
                        console.log(`下载资源失败:${url}`)
                    }
                })

                this.downLoad(aUrls)
            }
            else if (aUrls.length > 0) {
                this.D_MAX++
                this.downLoad(aUrls)
            }
            else {
                console.log(`下载完成`)
            }
        }


    }

    run() {
        this.readDir(this.assetUrlDir)
        this.checkValid(this.urls)
        this.D_MAX = 30
        this.downLoad(this.urls)
    }
}


new DownloadAssets(Path.join(__dirname,"temp", "urls")).run()


