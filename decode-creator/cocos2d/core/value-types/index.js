"use strict";
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trs = exports.Quat = exports.Color = exports.Size = exports.Rect = exports.Mat3 = exports.Mat4 = exports.Vec4 = exports.Vec3 = exports.Vec2 = void 0;
var vec2_1 = require("./vec2");
Object.defineProperty(exports, "Vec2", { enumerable: true, get: function () { return __importDefault(vec2_1).default; } });
var vec3_1 = require("./vec3");
Object.defineProperty(exports, "Vec3", { enumerable: true, get: function () { return __importDefault(vec3_1).default; } });
var vec4_1 = require("./vec4");
Object.defineProperty(exports, "Vec4", { enumerable: true, get: function () { return __importDefault(vec4_1).default; } });
var mat4_1 = require("./mat4");
Object.defineProperty(exports, "Mat4", { enumerable: true, get: function () { return __importDefault(mat4_1).default; } });
var mat3_1 = require("./mat3");
Object.defineProperty(exports, "Mat3", { enumerable: true, get: function () { return __importDefault(mat3_1).default; } });
var rect_1 = require("./rect");
Object.defineProperty(exports, "Rect", { enumerable: true, get: function () { return __importDefault(rect_1).default; } });
var size_1 = require("./size");
Object.defineProperty(exports, "Size", { enumerable: true, get: function () { return __importDefault(size_1).default; } });
var color_1 = require("./color");
Object.defineProperty(exports, "Color", { enumerable: true, get: function () { return __importDefault(color_1).default; } });
var quat_1 = require("./quat");
Object.defineProperty(exports, "Quat", { enumerable: true, get: function () { return __importDefault(quat_1).default; } });
var trs_1 = require("./trs");
Object.defineProperty(exports, "Trs", { enumerable: true, get: function () { return __importDefault(trs_1).default; } });
__exportStar(require("./utils"), exports);
cc.math = module.exports;
