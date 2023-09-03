/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

const fetch = require("node-fetch")
const Path = require("path")
const FS = require("fs")

const { parseParameters } = require('./utilities');

function onGetSources(aBuffer, options, url, onComplete) {
    let result = null;
    switch (options.responseType) {
        case "json": {
            result = JSON.parse(aBuffer.toString())
        }
            break;
        case "text": {
            result = aBuffer.toString()
        }
            break;
        default:
            {
                result = aBuffer;
            }
            break;
    }
    onComplete && onComplete(null, result);
}

function downloadFile(url, options, onProgress, onComplete) {
    var { options, onProgress, onComplete } = parseParameters(options, onProgress, onComplete);
    var errInfo = 'download failed: ' + url + ', status: ';
    const fileName = Path.basename(url)
    const fullPath = Path.join(CC_DOWNLOAD_CACHE_PATH, fileName)
    if (FS.existsSync(fullPath)) {
        FS.readFile(fullPath, (aE, aData) => {
            onGetSources(aData, options, url, onComplete);
        })
    }
    else {
        fetch(url, { method: "get" }).then(response => {
            if (response.ok) {
                response.buffer().then(aBuffer => {
                    FS.writeFileSync(fullPath, aBuffer)
                    onGetSources(aBuffer, options, url, onComplete)
                })
            }
            else {
                onComplete && onComplete(new Error(errInfo + '(no response)'));
            }
        })
    }
    // console.log(`start download :${url}`)



    // xhr.open('GET', url, true);
    // if (options.responseType !== undefined)
    //     xhr.responseType = options.responseType;
    // if (options.withCredentials !== undefined)
    //     xhr.withCredentials = options.withCredentials;
    // if (options.mimeType !== undefined && xhr.overrideMimeType)
    //     xhr.overrideMimeType(options.mimeType);
    // if (options.timeout !== undefined)
    //     xhr.timeout = options.timeout;
    // if (options.header) {
    //     for (var header in options.header) {
    //         xhr.setRequestHeader(header, options.header[header]);
    //     }
    // }
    // xhr.onload = function () {
    //     if (xhr.status === 200 || xhr.status === 0) {
    //         onComplete && onComplete(null, xhr.response);
    //     }
    //     else {
    //         onComplete && onComplete(new Error(errInfo + xhr.status + '(no response)'));
    //     }
    // };
    // if (onProgress) {
    //     xhr.onprogress = function (e) {
    //         if (e.lengthComputable) {
    //             onProgress(e.loaded, e.total);
    //         }
    //     };
    // }
    // xhr.onerror = function () {
    //     onComplete && onComplete(new Error(errInfo + xhr.status + '(error)'));
    // };
    // xhr.ontimeout = function () {
    //     onComplete && onComplete(new Error(errInfo + xhr.status + '(time out)'));
    // };
    // xhr.onabort = function () {
    //     onComplete && onComplete(new Error(errInfo + xhr.status + '(abort)'));
    // };
    // xhr.send(null);
    // return xhr;
}
module.exports = downloadFile;
