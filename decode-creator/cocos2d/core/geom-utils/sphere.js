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
const _v3_tmp = new value_types_1.Vec3();
/**
 * !#en
 * Sphere.
 * !#zh
 * 轴对齐球。
 * @class geomUtils.Sphere
 */
class sphere {
    /**
     * !#en
     * create a new sphere
     * !#zh
     * 创建一个新的 sphere 实例。
     * @method create
     * @param cx X coordinates of the shape relative to the origin.
     * @param cy Y coordinates of the shape relative to the origin.
     * @param cz Z coordinates of the shape relative to the origin.
     * @param r Radius of sphere
     * @return {Sphere} Returns a sphere.
     */
    static create(cx, cy, cz, r) {
        return new sphere(cx, cy, cz, r);
    }
    /**
     * !#en
     * clone a new sphere
     * !#zh
     * 克隆一个新的 sphere 实例。
     * @method clone
     * @param {Sphere} p The target of cloning.
     * @return {Sphere} The cloned instance.
     */
    static clone(p) {
        return new sphere(p.center.x, p.center.y, p.center.z, p.radius);
    }
    /**
     * !#en
     * copy the values from one sphere to another
     * !#zh
     * 将从一个 sphere 的值复制到另一个 sphere。
     * @method copy
     * @param {Sphere} out Accept the sphere of operations.
     * @param {Sphere} a Sphere being copied.
     * @return {Sphere} out Accept the sphere of operations.
     */
    static copy(out, p) {
        value_types_1.Vec3.copy(out.center, p.center);
        out.radius = p.radius;
        return out;
    }
    /**
     * !#en
     * create a new bounding sphere from two corner points
     * !#zh
     * 从两个点创建一个新的 sphere。
     * @method fromPoints
     * @param out - Accept the sphere of operations.
     * @param minPos - The smallest point of sphere.
     * @param maxPos - The maximum point of sphere.
     * @returns {Sphere} out Accept the sphere of operations.
     */
    static fromPoints(out, minPos, maxPos) {
        value_types_1.Vec3.multiplyScalar(out.center, value_types_1.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);
        out.radius = value_types_1.Vec3.subtract(_v3_tmp, maxPos, minPos).len() * 0.5;
        return out;
    }
    /**
     * !#en Set the components of a sphere to the given values
     * !#zh 将球体的属性设置为给定的值。
     * @method set
     * @param {Sphere} out Accept the sphere of operations.
     * @param cx X coordinates of the shape relative to the origin.
     * @param cy Y coordinates of the shape relative to the origin.
     * @param cz Z coordinates of the shape relative to the origin.
     * @param {number} r Radius.
     * @return {Sphere} out Accept the sphere of operations.
     */
    static set(out, cx, cy, cz, r) {
        out.center.x = cx;
        out.center.y = cy;
        out.center.z = cz;
        out.radius = r;
        return out;
    }
    /**
     * !#en
     * Construct a sphere.
     * !#zh
     * 构造一个球。
     * @constructor
     * @param cx The x-coordinate of the sphere's world coordinates.
     * @param cy The y-coordinate of the sphere's world coordinates.
     * @param cz The z-coordinate of the sphere's world coordinates.
     * @param {number} r Radius.
     */
    constructor(cx = 0, cy = 0, cz = 0, r = 1) {
        this._type = enums_1.default.SHAPE_SPHERE;
        this.center = new value_types_1.Vec3(cx, cy, cz);
        this.radius = r;
    }
    /**
     * !#en
     * Clone.
     * !#zh
     * 获得克隆。
     * @method clone
     */
    clone() {
        return sphere.clone(this);
    }
    /**
     * !#en
     * Copy sphere
     * !#zh
     * 拷贝对象。
     * @method copy
     * @param a Copy target.
     */
    copy(a) {
        return sphere.copy(this, a);
    }
    /**
     * !#en
     * Get the bounding points of this shape
     * !#zh
     * 获取此形状的边界点。
     * @method getBoundary
     * @param {Vec3} minPos
     * @param {Vec3} maxPos
     */
    getBoundary(minPos, maxPos) {
        value_types_1.Vec3.set(minPos, this.center.x - this.radius, this.center.y - this.radius, this.center.z - this.radius);
        value_types_1.Vec3.set(maxPos, this.center.x + this.radius, this.center.y + this.radius, this.center.z + this.radius);
    }
    /**
     * !#en
     * Transform this shape
     * !#zh
     * 将 out 根据这个 sphere 的数据进行变换。
     * @method transform
     * @param m The transformation matrix.
     * @param pos The position part of the transformation.
     * @param rot The rotating part of the transformation.
     * @param scale The scaling part of the transformation.
     * @param out The target of the transformation.
     */
    transform(m, pos, rot, scale, out) {
        value_types_1.Vec3.transformMat4(out.center, this.center, m);
        out.radius = this.radius * scale.maxAxis();
    }
    /**
     * !#zh
     * 将 out 根据这个 sphere 的数据进行变换。
     * @translateAndRotate
     * @param m The transformation matrix.
     * @param rot The rotating part of the transformation.
     * @param out The target of the transformation.
     */
    translateAndRotate(m, rot, out) {
        value_types_1.Vec3.transformMat4(out.center, this.center, m);
    }
    /**
     * !#en
     * Scale out based on the sphere data.
     * !#zh
     * 将 out 根据这个 sphere 的数据进行缩放。
     * @method setScale
     * @param scale Scale value
     * @param out Scale target
     */
    setScale(scale, out) {
        out.radius = this.radius * scale.maxAxis();
    }
}
exports.default = sphere;
