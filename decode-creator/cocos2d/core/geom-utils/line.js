"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const value_types_1 = require("../value-types");
const enums_1 = __importDefault(require("./enums"));
/**
 * !#en
 * line
 * !#zh
 * 直线
 * @class geomUtils.Line
 */
class line {
    /**
     * !#en
     * create a new line
     * !#zh
     * 创建一个新的 line。
     * @method create
     * @param {Number} sx The x part of the starting point.
     * @param {Number} sy The y part of the starting point.
     * @param {Number} sz The z part of the starting point.
     * @param {Number} ex The x part of the end point.
     * @param {Number} ey The y part of the end point.
     * @param {Number} ez The z part of the end point.
     * @return {Line}
     */
    static create(sx, sy, sz, ex, ey, ez) {
        return new line(sx, sy, sz, ex, ey, ez);
    }
    /**
     * !#en
     * Creates a new line initialized with values from an existing line
     * !#zh
     * 克隆一个新的 line。
     * @method clone
     * @param {Line} a The source of cloning.
     * @return {Line} The cloned object.
     */
    static clone(a) {
        return new line(a.s.x, a.s.y, a.s.z, a.e.x, a.e.y, a.e.z);
    }
    /**
     * !#en
     * Copy the values from one line to another
     * !#zh
     * 复制一个线的值到另一个。
     * @method copy
     * @param {Line} out The object that accepts the action.
     * @param {Line} a The source of the copy.
     * @return {Line} The object that accepts the action.
     */
    static copy(out, a) {
        value_types_1.Vec3.copy(out.s, a.s);
        value_types_1.Vec3.copy(out.e, a.e);
        return out;
    }
    /**
     * !#en
     * create a line from two points
     * !#zh
     * 用两个点创建一个线。
     * @method fromPoints
     * @param {Line} out The object that accepts the action.
     * @param {Vec3} start The starting point.
     * @param {Vec3} end At the end.
     * @return {Line} out The object that accepts the action.
     */
    static fromPoints(out, start, end) {
        value_types_1.Vec3.copy(out.s, start);
        value_types_1.Vec3.copy(out.e, end);
        return out;
    }
    /**
     * !#en
     * Set the components of a Vec3 to the given values
     * !#zh
     * 将给定线的属性设置为给定值。
     * @method set
     * @param {Line} out The object that accepts the action.
     * @param {Number} sx The x part of the starting point.
     * @param {Number} sy The y part of the starting point.
     * @param {Number} sz The z part of the starting point.
     * @param {Number} ex The x part of the end point.
     * @param {Number} ey The y part of the end point.
     * @param {Number} ez The z part of the end point.
     * @return {Line} out The object that accepts the action.
     */
    static set(out, sx, sy, sz, ex, ey, ez) {
        out.s.x = sx;
        out.s.y = sy;
        out.s.z = sz;
        out.e.x = ex;
        out.e.y = ey;
        out.e.z = ez;
        return out;
    }
    /**
     * !#en
     * Calculate the length of the line.
     * !#zh
     * 计算线的长度。
     * @method len
     * @param {Line} a The line to calculate.
     * @return {Number} Length.
     */
    static len(a) {
        return value_types_1.Vec3.distance(a.s, a.e);
    }
    /**
     * !#en Construct a line.
     * !#zh 构造一条线。
     * @constructor
     * @param {Number} sx The x part of the starting point.
     * @param {Number} sy The y part of the starting point.
     * @param {Number} sz The z part of the starting point.
     * @param {Number} ex The x part of the end point.
     * @param {Number} ey The y part of the end point.
     * @param {Number} ez The z part of the end point.
     */
    constructor(sx = 0, sy = 0, sz = 0, ex = 0, ey = 0, ez = -1) {
        this._type = enums_1.default.SHAPE_LINE;
        this.s = new value_types_1.Vec3(sx, sy, sz);
        this.e = new value_types_1.Vec3(ex, ey, ez);
    }
    /**
     * !#en
     * Calculate the length of the line.
     * !#zh
     * 计算线的长度。
     * @method length
     * @return {Number} Length.
     */
    length() {
        return value_types_1.Vec3.distance(this.s, this.e);
    }
}
exports.default = line;
