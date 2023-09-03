"use strict";
/****************************************************************************
 Copyright (c) 2018 Xiamen Yaji Software Co., Ltd.

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
const ttf_1 = __importDefault(require("./ttf"));
const bmfont_1 = __importDefault(require("./bmfont"));
let canvasPool = {
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
CCLabel_1.default._canvasPool = canvasPool;
assembler_1.default.register(CCLabel_1.default, {
    getConstructor(label) {
        let ctor = ttf_1.default;
        if (label.font instanceof cc.BitmapFont) {
            ctor = bmfont_1.default;
        }
        else if (label.cacheMode === CCLabel_1.default.CacheMode.CHAR) {
            cc.warn('sorry, canvas mode does not support CHAR mode currently!');
        }
        return ctor;
    },
    TTF: ttf_1.default,
    Bmfont: bmfont_1.default
});
