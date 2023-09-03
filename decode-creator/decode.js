const FS = require("fs")
const Path = require("path")
const Sharp = require("sharp")

const Images = require("images")

globalThis.window = globalThis
globalThis.cc = {}

globalThis.cc = globalThis.cc || {};

// For internal usage
cc.internal = cc.internal || {};

CC_TEST = false
CC_DEV = false;
CC_EDITOR = false
CC_JSB = false
CC_RUNTIME = true
CC_PREVIEW = false
CC_SUPPORT_JIT = false
CC_DEBUG = false
CC_BUILD = true

CC_DOWNLOAD_CACHE_PATH = Path.join(__dirname, "download_cacne")
if (!FS.existsSync(CC_DOWNLOAD_CACHE_PATH)) {
    FS.mkdirSync(CC_DOWNLOAD_CACHE_PATH)
}

require("./cocos2d/core/index")
require("./cocos2d/core/utils/index")
require("./cocos2d/core/platform/index")
require("./cocos2d/core/components/index")
require("./cocos2d/core/assets/index")

const Config = require("./cocos2d/core/asset-manager/config")
const UrlTrans = require("./cocos2d/core/asset-manager/urlTransformer")
const Task = require("./cocos2d/core/asset-manager/task")
const AssetManager = require("./cocos2d/core/asset-manager/CCAssetManager")
require("./cocos2d/core/asset-manager/shared")
const Bundle = require("./cocos2d/core/asset-manager/bundle")
const Loader = require("./cocos2d/core/asset-manager/load")
const assetManager = require("./cocos2d/core/asset-manager/CCAssetManager")

class Decode {
    _root = Path.join(__dirname, "..", "download-assets", "temp", "static.pgf-asw0zz.com", "63", "assets")

    _baseUrl = "https://static.pgf-asw0zz.com/63/assets"
    _interBaseURL = "https://static.pgf-asw0zz.com/shared/0bc343f586/builtins"
    run() {
        // this.reNameAllMd5Name(this._root)
        let maps = {}
        this.findAll(maps)

    }

    reNameAllMd5Name(aDir) {
        const files = FS.readdirSync(aDir);
        files.forEach(aFile => {
            let full = Path.join(aDir, aFile)
            if (FS.statSync(full).isDirectory()) {
                this.reNameAllMd5Name(full)
            }
            else {
                let list = aFile.split(".")
                if (list.length > 2) {
                    list.splice(1, 1)
                }
                let newName = list.join(".")
                FS.renameSync(full, Path.join(aDir, newName))
            }
        });
    }

    _waitID = -1;

    appentBundle(list) {
        for (const key in list) {
            if (Object.hasOwnProperty.call(list, key)) {
                const configPath = list[key];
                const configData = JSON.parse(FS.readFileSync(configPath, "utf-8"))
                const bundle = new Bundle();
                bundle.init(configData)
                const cfg = bundle._config
                if (key === "internal") {
                    cfg.base = `${this._interBaseURL}/${bundle.name}/`;
                }
                else {
                    cfg.base = `${this._baseUrl}/${bundle.name}/`;
                }

                bundle._jsonData_ = configData;
            }
        }
    }

    findAll(aMap) {
        const list = this.findConfigs()

        this.appentBundle(list)

        this._waitID = setInterval(() => {
            // console.log("wait")
            if (this._max > 0 && this._currentDownload) {
                this.downloadAssets(this._currentDownload.bundles, this._currentDownload.callback)
            }
        }, 200);

        const keys = Object.keys(list)
        const bundles = []
        keys.forEach(aKey => {
            bundles.push(assetManager.getBundle(aKey))
        });
        this.doParse(bundles)
    }

    doParse(list) {
        this.parseConfig(list, () => {
            clearInterval(this._waitID)
        })
    }

    listAllFiles(aDir, aMaps) {
        const files = FS.readdirSync(aDir);
        files.forEach(aFile => {
            const subDir = Path.join(aDir, aFile);
            if (FS.statSync(subDir).isDirectory()) {
                this.listAllFiles(subDir, aMaps);
            }
            else {
                if (aMaps[aFile]) {
                    console.warn("找到重复key的文件 :" + aFile);
                }
                aMaps[aFile] = Path.join(aDir, aFile)
            }
        });
    }

    _max = 30;
    _finish = false;
    downloadAssets(bundles, callback) {
        const bundle = bundles.pop()
        if (bundle) {
            this._max--;
            bundle.loadDir("", (aE, aR) => {
                this._max++;

                if (aR) {
                    aR.forEach(aSource => {
                        let next = true;
                        let find = false
                        const info = bundle.getAssetInfo(aSource._uuid)
                        let fullPath = null;
                        if (info?.path) {
                            fullPath = Path.join(__dirname, "cache", info.path)
                            if (fullPath.indexOf("background_controller") >= 0) {
                                console.log("");
                            }
                            let dir = fullPath
                            if (aSource._native) {
                                dir = Path.dirname(fullPath)
                            }

                            if (!FS.existsSync(dir)) {
                                FS.mkdirSync(dir, { recursive: true })
                            }
                        }
                        if (aSource instanceof cc.AudioClip) {
                            FS.writeFileSync(fullPath + aSource._native, aSource._audio)
                            find = true;
                        }
                        else if (aSource instanceof cc.SpriteAtlas) {
                            this.splist(aSource, fullPath)
                            next = false;
                        }
                        else if (aSource instanceof cc.SpriteFrame) {
                            const buffers = aSource._texture._image;
                            FS.writeFileSync(fullPath + aSource._texture._native, buffers)
                            find = true;
                        }
                        else if (aSource instanceof cc.Texture2D) {
                            find = true;
                            FS.writeFileSync(fullPath + aSource._native, aSource._image)
                        }
                        else if (aSource instanceof cc.Prefab) {
                            // const data = aSource.data
                            // debugger
                        }

                        /**
                         *  cc.Texture2D
                            cc.Prefab
                            cc.AnimationClip
                            cc.SpriteAtlas
                            cc.AudioClip
                            cc.SpriteFrame
                         */

                        console.log(`解析到资源 ${aSource?.__classname__}`)
                    });

                    let used = {}
                    for (const key in bundle._config.assetInfos._map) {
                        if (Object.hasOwnProperty.call(bundle._config.assetInfos._map, key)) {
                            const element = bundle._config.assetInfos._map[key];
                            if (element.packs) {
                                const uuid = element.packs[0].uuid
                                if (!used[uuid]) {
                                    used[uuid] = true;
                                    this.parsePackages(bundle, key)
                                }
                            }
                        }
                    }
                }

                // if (find) {
                //     console.log("ddddddd :" + info.path)
                // }

                this.downloadAssets(bundles, callback)
            })
        }
        else {
            callback()
        }
    }

    //0cfd8f700
    parsePackages(aBundle, aKey) {
        // if (aBundle.name === "resources") {
        //     debugger
        // }
        const info = aBundle.getAssetInfo(aKey);
        info.packs.forEach(list => {
            if (typeof (list) === "string") {
                const subInfo = aBundle.getAssetInfo(list);
                const url = assetManager.utils.getUrlWithUuid(list)
                console.log("")
            }
            else {
                list.packs.forEach(aUUID => {
                    const p = [list, info, aBundle, aKey];
                    const subInfo = aBundle.getAssetInfo(aUUID);
                    const url = assetManager.utils.getUrlWithUuid(aUUID)
                    console.log("")
                });
            }
        });
    }


    _currentDownload = {}
    parseConfig(aAllBundle, callback) {
        this._currentDownload = { bundles: aAllBundle, callback: callback }
        this.downloadAssets(aAllBundle, callback)



        return;

        Object.keys(cfg.assetInfos._map).forEach(aKey => {
            const info = cfg.assetInfos._map[aKey]
            if (info.path) {
                // const task = new Task({ input: info.path, options: { __requestType__: "path", bundle: bundle.name } })
                // UrlTrans.parse(task)
                // task.input = task.output;
                // UrlTrans.combine(task)
                // Loader(task, (aE, aR) => {
                //     console.log("ttttttttt")
                // })
                // console.log("ssssss")

                bundle.load(info.path, (aE, aR) => {
                    console.log("ddddddd")
                })
            }
            // let base = cfg.base + cfg.nativeBase


            // let uuid = info.uuid;

            // let ver = '';
            // if (true) {
            //     ver = info.nativeVer ? ('.' + info.nativeVer) : '';
            // }
            // else {
            //     ver = item.info.ver ? ('.' + item.info.ver) : '';
            // }

            // // ugly hack, WeChat does not support loading font likes 'myfont.dw213.ttf'. So append hash to directory
            // if (item.ext === '.ttf') {
            //     url = `${base}/${uuid.slice(0, 2)}/${uuid}${ver}/${item.options.__nativeName__}`;
            // }
            // else {
            //     url = `${base}/${uuid.slice(0, 2)}/${uuid}${ver}${item.ext}`;
            // }

            // item.url = url;

            console.log("ssssss")
        })


        // if (configData.types.length > 0) {
        //     console.log("sssssss")
        //     let needIdx = []
        //     for (let i = 0; i < configData.types.length; ++i) {
        //         if (configData.types[i] === "cc.SpriteAtlas") {
        //             needIdx.push(i);
        //         }
        //     }


        //     const longUUID = {}

        //     configData.uuids.forEach(element => {
        //         const uuid = decodeUuid(element);
        //         longUUID[element] = uuid
        //         console.log(`解析出长uuid:${uuid} sort:${element}`)
        //     });

        //     Object.keys(configData.paths).forEach(aKey => {
        //         const element = configData.paths[aKey];
        //         if (element[1] === needIdx[0]) {
        //             console.log("找到atlas:" + element[0])
        //         }
        //     });
        // }
    }

    findConfigs() {
        const dis = {}
        const files = FS.readdirSync(this._root);
        files.forEach(aDir => {
            const subDir = Path.join(this._root, aDir);
            console.log(`subdir:${subDir}`)
            const state = FS.statSync(subDir);
            if (state.isDirectory()) {
                const subs = FS.readdirSync(subDir)
                subs.forEach(aFile => {
                    if (aFile.startsWith("config")) {
                        let dirName = Path.basename(subDir)
                        dis[dirName] = Path.join(subDir, aFile)
                    }
                });
            }
        });
        return dis;
    }






    //============================================

    splist(aInfo, aFullPath) {
        const frames = aInfo.getSpriteFrames()
        let buffers = null;
        let infos = []

        if (frames.length > 0) {
            let dir = aFullPath
            for (let i = 0; i < frames.length; ++i) {
                if (!buffers) buffers = frames[0]._texture._image;
                let info = frames[i]
                infos.push({
                    frameInfo: {
                        x: info._rect.x,
                        y: info._rect.y,
                        w: info._rect.width,
                        h: info._rect.height,
                        fx: info._flipX,
                        fx: info._flipY,
                        rotated: info._rotated
                        // frameInfo.x, frameInfo.y, frameInfo.h, frameInfo.w
                    },
                    outPath: Path.join(dir, info.name) + ".png"
                })

                if(info._flipX || info._flipY){
                    debugger
                }
            }

        }

        if (!buffers) return;

        // const cachePath = Path.join(__dirname,"cache.png");
        // FS.writeFileSync(cachePath,buffers)

        this.splitPngForImages(buffers, infos, () => {
            console.log("split frames success")
        })
    }


    splitPngForImages(aBuffer, frameList, aCallback) {
        if (aBuffer && !!frameList) {
            const info = frameList.pop();
            if (!!info) {
                const image = Sharp(aBuffer);
                const frameInfo = info.frameInfo;
                const miniPath = info.outPath;

                const newDir = Path.dirname(miniPath);
                if (!FS.existsSync(newDir)) {
                    FS.mkdirSync(newDir, { recursive: true });
                }


                let single_png;
                if (frameInfo.rotated) {
                    // Handle rotated images
                    // single_png = Images(item, frameInfo.x, frameInfo.y, frameInfo.h, frameInfo.w).rotate(270);
                    image.rotate(90);
                } else {
                    // single_png = Images(item, frameInfo.x, frameInfo.y, frameInfo.w, frameInfo.h);
                }

                

                image.flip(frameInfo.fy)
                image.flop(frameInfo.fx)

                image.extract({ left: frameInfo.x, top: frameInfo.y, height: frameInfo.h, width: frameInfo.w })

                image.png().toFile(miniPath, () => {
                    this.splitPngForImages(aBuffer, frameList, aCallback);
                })

                // Images(frameInfo.w, frameInfo.h)
                //     .draw(single_png, 0, 0)
                //     .save(miniPath, { quality: 100 });

                // splitPngForImages(item, frameList, aCallback);
            } else if (aCallback) {
                aCallback();
            }
        } else if (aCallback) {
            aCallback();
        }
    }
}


new Decode().run()