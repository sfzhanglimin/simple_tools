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
// const gfx_1 = __importDefault(require("../../../renderer/gfx"));
// var vfmt3D = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
//     { name: gfx_1.default.ATTR_UV0, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
// ]);
// vfmt3D.name = 'vfmt3D';
// gfx_1.default.VertexFormat.XYZ_UV_Color = vfmt3D;
// var vfmtPosUvColor = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_UV0, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
// ]);
// vfmtPosUvColor.name = 'vfmtPosUvColor';
// gfx_1.default.VertexFormat.XY_UV_Color = vfmtPosUvColor;
// var vfmtPosUvTwoColor = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_UV0, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
//     { name: gfx_1.default.ATTR_COLOR0, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
// ]);
// vfmtPosUvTwoColor.name = 'vfmtPosUvTwoColor';
// gfx_1.default.VertexFormat.XY_UV_Two_Color = vfmtPosUvTwoColor;
// var vfmtPosUv = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_UV0, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 }
// ]);
// vfmtPosUv.name = 'vfmtPosUv';
// gfx_1.default.VertexFormat.XY_UV = vfmtPosUv;
// var vfmtPosColor = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
//     { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
// ]);
// vfmtPosColor.name = 'vfmtPosColor';
// gfx_1.default.VertexFormat.XY_Color = vfmtPosColor;
// var vfmtPos = new gfx_1.default.VertexFormat([
//     { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 2 },
// ]);
// vfmtPos.name = 'vfmtPos';
// gfx_1.default.VertexFormat.XY = vfmtPos;
// module.exports = {
//     vfmt3D,
//     vfmtPosUvColor,
//     vfmtPosUvTwoColor,
//     vfmtPosUv,
//     vfmtPosColor,
//     vfmtPos
// };
