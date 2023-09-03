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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_types_1 = require("../value-types");
const enums_1 = __importDefault(require("./enums"));
const v1 = new value_types_1.Vec3(0, 0, 0);
const v2 = new value_types_1.Vec3(0, 0, 0);
const temp_mat = cc.mat4();
const temp_vec4 = cc.v4();
/**
 * !#en
 * plane。
 * !#zh
 * 平面。
 * @class geomUtils.Plane
 */
class plane {
    /**
     * !#en
     * create a new plane
     * !#zh
     * 创建一个新的 plane。
     * @method create
     * @param {Number} nx The x part of the normal component.
     * @param {Number} ny The y part of the normal component.
     * @param {Number} nz The z part of the normal component.
     * @param {Number} d Distance from the origin.
     * @return {Plane}
     */
    static create(nx, ny, nz, d) {
        return new plane(nx, ny, nz, d);
    }
    /**
     * !#en
     * clone a new plane
     * !#zh
     * 克隆一个新的 plane。
     * @method clone
     * @param {Plane} p The source of cloning.
     * @return {Plane} The cloned object.
     */
    static clone(p) {
        return new plane(p.n.x, p.n.y, p.n.z, p.d);
    }
    /**
     * !#en
     * copy the values from one plane to another
     * !#zh
     * 复制一个平面的值到另一个。
     * @method copy
     * @param {Plane} out The object that accepts the action.
     * @param {Plane} p The source of the copy.
     * @return {Plane} The object that accepts the action.
     */
    static copy(out, p) {
        value_types_1.Vec3.copy(out.n, p.n);
        out.d = p.d;
        return out;
    }
    /**
     * !#en
     * create a plane from three points
     * !#zh
     * 用三个点创建一个平面。
     * @method fromPoints
     * @param {Plane} out The object that accepts the action.
     * @param {Vec3} a Point a。
     * @param {Vec3} b Point b。
     * @param {Vec3} c Point c。
     * @return {Plane} out The object that accepts the action.
     */
    static fromPoints(out, a, b, c) {
        value_types_1.Vec3.subtract(v1, b, a);
        value_types_1.Vec3.subtract(v2, c, a);
        value_types_1.Vec3.normalize(out.n, value_types_1.Vec3.cross(out.n, v1, v2));
        out.d = value_types_1.Vec3.dot(out.n, a);
        return out;
    }
    /**
     * !#en
     * Set the components of a plane to the given values
     * !#zh
     * 将给定平面的属性设置为给定值。
     * @method set
     * @param {Plane} out The object that accepts the action.
     * @param {Number} nx The x part of the normal component.
     * @param {Number} ny The y part of the normal component.
     * @param {Number} nz The z part of the normal component.
     * @param {Number} d Distance from the origin.
     * @return {Plane} out The object that accepts the action.
     */
    static set(out, nx, ny, nz, d) {
        out.n.x = nx;
        out.n.y = ny;
        out.n.z = nz;
        out.d = d;
        return out;
    }
    /**
     * !#en
     * create plane from normal and point
     * !#zh
     * 用一条法线和一个点创建平面。
     * @method fromNormalAndPoint
     * @param {Plane} out The object that accepts the action.
     * @param {Vec3} normal The normal of a plane.
     * @param {Vec3} point A point on the plane.
     * @return {Plane} out The object that accepts the action.
     */
    static fromNormalAndPoint(out, normal, point) {
        value_types_1.Vec3.copy(out.n, normal);
        out.d = value_types_1.Vec3.dot(normal, point);
        return out;
    }
    /**
     * !#en
     * normalize a plane
     * !#zh
     * 归一化一个平面。
     * @method normalize
     * @param {Plane} out The object that accepts the action.
     * @param {Plane} a Source data for operations.
     * @return {Plane} out The object that accepts the action.
     */
    static normalize(out, a) {
        const len = a.n.len();
        value_types_1.Vec3.normalize(out.n, a.n);
        if (len > 0) {
            out.d = a.d / len;
        }
        return out;
    }
    /**
     * !#en Construct a plane.
     * !#zh 构造一个平面。
     * @constructor
     * @param {Number} nx The x part of the normal component.
     * @param {Number} ny The y part of the normal component.
     * @param {Number} nz The z part of the normal component.
     * @param {Number} d Distance from the origin.
     */
    constructor(nx = 0, ny = 1, nz = 0, d = 0) {
        this._type = enums_1.default.SHAPE_PLANE;
        this.n = new value_types_1.Vec3(nx, ny, nz);
        this.d = d;
    }
    /**
     * !#en
     * Transform a plane.
     * !#zh
     * 变换一个平面。
     * @method transform
     * @param {Mat4} mat
     */
    transform(mat) {
        value_types_1.Mat4.invert(temp_mat, mat);
        value_types_1.Mat4.transpose(temp_mat, temp_mat);
        value_types_1.Vec4.set(temp_vec4, this.n.x, this.n.y, this.n.z, this.d);
        value_types_1.Vec4.transformMat4(temp_vec4, temp_vec4, temp_mat);
        value_types_1.Vec3.set(this.n, temp_vec4.x, temp_vec4.y, temp_vec4.z);
        this.d = temp_vec4.w;
    }
}
exports.default = plane;
