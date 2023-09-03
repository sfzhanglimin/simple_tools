"use strict";
/****************************************************************************
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assembler_1 = __importDefault(require("../../../assembler"));
const CCLabel_1 = __importDefault(require("../../../../components/CCLabel"));
const ttf_1 = __importDefault(require("./2d/ttf"));
const bmfont_1 = __importDefault(require("./2d/bmfont"));
const letter_1 = __importDefault(require("./2d/letter"));
const ttf_2 = __importDefault(require("./3d/ttf"));
const bmfont_2 = __importDefault(require("./3d/bmfont"));
const letter_2 = __importDefault(require("./3d/letter"));
let NativeTTF = undefined;
if (CC_JSB) {
    NativeTTF = require("./2d/nativeTTF");
}
CCLabel_1.default._canvasPool = {
    pool: [],
    get() {
        let data = this.pool.pop();
        if (!data) {
            let canvas = document.createElement("canvas");
            let context = canvas.getContext("2d");
            data = {
                canvas: canvas,
                context: context
            };
            // default text info
            context.textBaseline = 'alphabetic';
        }
        return data;
    },
    put(canvas) {
        if (this.pool.length >= 32) {
            return;
        }
        this.pool.push(canvas);
    }
};
assembler_1.default.register(cc.Label, {
    getConstructor(label) {
        let is3DNode = label.node.is3DNode;
        let ctor = is3DNode ? ttf_2.default : ttf_1.default;
        if (label.font instanceof cc.BitmapFont) {
            ctor = is3DNode ? bmfont_2.default : bmfont_1.default;
        }
        else if (label.cacheMode === CCLabel_1.default.CacheMode.CHAR) {
            if (CC_JSB && !is3DNode && !!jsb.LabelRenderer && label.font instanceof cc.TTFFont && label._useNativeTTF()) {
                ctor = NativeTTF;
            }
            else if (cc.sys.platform === cc.sys.WECHAT_GAME_SUB) {
                cc.warn('sorry, subdomain does not support CHAR mode currently!');
            }
            else {
                ctor = is3DNode ? letter_2.default : letter_1.default;
            }
        }
        return ctor;
    },
    TTF: ttf_1.default,
    Bmfont: bmfont_1.default,
    Letter: letter_1.default,
    TTF3D: ttf_2.default,
    Bmfont3D: bmfont_2.default,
    Letter3D: letter_2.default,
    NativeTTF
});
