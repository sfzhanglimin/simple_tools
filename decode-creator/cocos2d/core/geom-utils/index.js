"use strict";
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
exports.Plane = exports.Line = exports.Frustum = exports.Obb = exports.Sphere = exports.intersect = exports.Ray = exports.Aabb = exports.Triangle = exports.enums = void 0;
var enums_1 = require("./enums");
Object.defineProperty(exports, "enums", { enumerable: true, get: function () { return __importDefault(enums_1).default; } });
var triangle_1 = require("./triangle");
Object.defineProperty(exports, "Triangle", { enumerable: true, get: function () { return __importDefault(triangle_1).default; } });
var aabb_1 = require("./aabb");
Object.defineProperty(exports, "Aabb", { enumerable: true, get: function () { return __importDefault(aabb_1).default; } });
var ray_1 = require("./ray");
Object.defineProperty(exports, "Ray", { enumerable: true, get: function () { return __importDefault(ray_1).default; } });
var intersect_1 = require("./intersect");
Object.defineProperty(exports, "intersect", { enumerable: true, get: function () { return __importDefault(intersect_1).default; } });
var sphere_1 = require("./sphere");
Object.defineProperty(exports, "Sphere", { enumerable: true, get: function () { return __importDefault(sphere_1).default; } });
var obb_1 = require("./obb");
Object.defineProperty(exports, "Obb", { enumerable: true, get: function () { return __importDefault(obb_1).default; } });
var frustum_1 = require("./frustum");
Object.defineProperty(exports, "Frustum", { enumerable: true, get: function () { return __importDefault(frustum_1).default; } });
var line_1 = require("./line");
Object.defineProperty(exports, "Line", { enumerable: true, get: function () { return __importDefault(line_1).default; } });
var plane_1 = require("./plane");
Object.defineProperty(exports, "Plane", { enumerable: true, get: function () { return __importDefault(plane_1).default; } });
__exportStar(require("./distance"), exports);
cc.geomUtils = module.exports;
