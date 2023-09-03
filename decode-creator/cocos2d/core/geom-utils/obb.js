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
const _v3_tmp2 = new value_types_1.Vec3();
const _m3_tmp = new value_types_1.Mat3();
// https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/
const transform_extent_m3 = (out, extent, m3) => {
    let m3_tmpm = _m3_tmp.m, m3m = m3.m;
    m3_tmpm[0] = Math.abs(m3m[0]);
    m3_tmpm[1] = Math.abs(m3m[1]);
    m3_tmpm[2] = Math.abs(m3m[2]);
    m3_tmpm[3] = Math.abs(m3m[3]);
    m3_tmpm[4] = Math.abs(m3m[4]);
    m3_tmpm[5] = Math.abs(m3m[5]);
    m3_tmpm[6] = Math.abs(m3m[6]);
    m3_tmpm[7] = Math.abs(m3m[7]);
    m3_tmpm[8] = Math.abs(m3m[8]);
    value_types_1.Vec3.transformMat3(out, extent, _m3_tmp);
};
/**
 * !#en obb
 * !#zh
 * 基础几何  方向包围盒。
 * @class geomUtils.Obb
 */
class obb {
    /**
     * !#zh
     * 获取形状的类型。
     * @property {number} type
     * @readonly
     */
    get type() {
        return this._type;
    }
    /**
     * !#en
     * create a new obb
     * !#zh
     * 创建一个新的 obb 实例。
     * @method create
     * @param {Number} cx X coordinates of the shape relative to the origin.
     * @param {Number} cy Y coordinates of the shape relative to the origin.
     * @param {Number} cz Z coordinates of the shape relative to the origin.
     * @param {Number} hw Obb is half the width.
     * @param {Number} hh Obb is half the height.
     * @param {Number} hl Obb is half the Length.
     * @param {Number} ox_1 Direction matrix parameter.
     * @param {Number} ox_2 Direction matrix parameter.
     * @param {Number} ox_3 Direction matrix parameter.
     * @param {Number} oy_1 Direction matrix parameter.
     * @param {Number} oy_2 Direction matrix parameter.
     * @param {Number} oy_3 Direction matrix parameter.
     * @param {Number} oz_1 Direction matrix parameter.
     * @param {Number} oz_2 Direction matrix parameter.
     * @param {Number} oz_3 Direction matrix parameter.
     * @return {Obb} Direction Box.
     */
    static create(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
        return new obb(cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
    }
    /**
     * !#en
     * clone a new obb
     * !#zh
     * 克隆一个 obb。
     * @method clone
     * @param {Obb} a The target of cloning.
     * @returns {Obb} New object cloned.
     */
    static clone(a) {
        let aom = a.orientation.m;
        return new obb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z, aom[0], aom[1], aom[2], aom[3], aom[4], aom[5], aom[6], aom[7], aom[8]);
    }
    /**
     * !#en
     * copy the values from one obb to another
     * !#zh
     * 将从一个 obb 的值复制到另一个 obb。
     * @method copy
     * @param {Obb} out Obb that accepts the operation.
     * @param {Obb} a Obb being copied.
     * @return {Obb} out Obb that accepts the operation.
     */
    static copy(out, a) {
        value_types_1.Vec3.copy(out.center, a.center);
        value_types_1.Vec3.copy(out.halfExtents, a.halfExtents);
        value_types_1.Mat3.copy(out.orientation, a.orientation);
        return out;
    }
    /**
     * !#en
     * create a new obb from two corner points
     * !#zh
     * 用两个点创建一个新的 obb。
     * @method fromPoints
     * @param {Obb} out Obb that accepts the operation.
     * @param {Vec3} minPos The smallest point of obb.
     * @param {Vec3} maxPos Obb's maximum point.
     * @returns {Obb} out Obb that accepts the operation.
     */
    static fromPoints(out, minPos, maxPos) {
        value_types_1.Vec3.multiplyScalar(out.center, value_types_1.Vec3.add(_v3_tmp, minPos, maxPos), 0.5);
        value_types_1.Vec3.multiplyScalar(out.halfExtents, value_types_1.Vec3.subtract(_v3_tmp2, maxPos, minPos), 0.5);
        value_types_1.Mat3.identity(out.orientation);
        return out;
    }
    /**
     * !#en
     * Set the components of a obb to the given values
     * !#zh
     * 将给定 obb 的属性设置为给定的值。
     * @method set
     * @param {Number} cx X coordinates of the shape relative to the origin.
     * @param {Number} cy Y coordinates of the shape relative to the origin.
     * @param {Number} cz Z coordinates of the shape relative to the origin.
     * @param {Number} hw Obb is half the width.
     * @param {Number} hh Obb is half the height.
     * @param {Number} hl Obb is half the Length.
     * @param {Number} ox_1 Direction matrix parameter.
     * @param {Number} ox_2 Direction matrix parameter.
     * @param {Number} ox_3 Direction matrix parameter.
     * @param {Number} oy_1 Direction matrix parameter.
     * @param {Number} oy_2 Direction matrix parameter.
     * @param {Number} oy_3 Direction matrix parameter.
     * @param {Number} oz_1 Direction matrix parameter.
     * @param {Number} oz_2 Direction matrix parameter.
     * @param {Number} oz_3 Direction matrix parameter.
     * @return {Obb} out
     */
    static set(out, cx, cy, cz, hw, hh, hl, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3) {
        value_types_1.Vec3.set(out.center, cx, cy, cz);
        value_types_1.Vec3.set(out.halfExtents, hw, hh, hl);
        value_types_1.Mat3.set(out.orientation, ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
        return out;
    }
    constructor(cx = 0, cy = 0, cz = 0, hw = 1, hh = 1, hl = 1, ox_1 = 1, ox_2 = 0, ox_3 = 0, oy_1 = 0, oy_2 = 1, oy_3 = 0, oz_1 = 0, oz_2 = 0, oz_3 = 1) {
        this._type = enums_1.default.SHAPE_OBB;
        this.center = new value_types_1.Vec3(cx, cy, cz);
        this.halfExtents = new value_types_1.Vec3(hw, hh, hl);
        this.orientation = new value_types_1.Mat3(ox_1, ox_2, ox_3, oy_1, oy_2, oy_3, oz_1, oz_2, oz_3);
    }
    /**
     * !#en
     * Get the bounding points of this shape
     * !#zh
     * 获取 obb 的最小点和最大点。
     * @method getBoundary
     * @param {Vec3} minPos
     * @param {Vec3} maxPos
     */
    getBoundary(minPos, maxPos) {
        transform_extent_m3(_v3_tmp, this.halfExtents, this.orientation);
        value_types_1.Vec3.subtract(minPos, this.center, _v3_tmp);
        value_types_1.Vec3.add(maxPos, this.center, _v3_tmp);
    }
    /**
     * !#en Transform this shape
     * !#zh
     * 将 out 根据这个 obb 的数据进行变换。
     * @method transform
     * @param {Mat4} m The transformation matrix.
     * @param {Vec3} pos The position part of the transformation.
     * @param {Quat} rot The rotating part of the transformation.
     * @param {Vec3} scale The scaling part of the transformation.
     * @param {Obb} out Target of transformation.
     */
    transform(m, pos, rot, scale, out) {
        value_types_1.Vec3.transformMat4(out.center, this.center, m);
        // parent shape doesn't contain rotations for now
        value_types_1.Mat3.fromQuat(out.orientation, rot);
        value_types_1.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
    }
    /**
     * !#en
     * Transform out based on this obb data.
     * !#zh
     * 将 out 根据这个 obb 的数据进行变换。
     * @method translateAndRotate
     * @param {Mat4} m The transformation matrix.
     * @param {Quat} rot The rotating part of the transformation.
     * @param {Obb} out Target of transformation.
     */
    translateAndRotate(m, rot, out) {
        value_types_1.Vec3.transformMat4(out.center, this.center, m);
        // parent shape doesn't contain rotations for now
        value_types_1.Mat3.fromQuat(out.orientation, rot);
    }
    /**
     * !#en
     * Scale out based on this obb data.
     * !#zh
     * 将 out 根据这个 obb 的数据进行缩放。
     * @method setScale
     * @param {Vec3} scale Scale value.
     * @param {Obb} out Scaled target.
     */
    setScale(scale, out) {
        value_types_1.Vec3.multiply(out.halfExtents, this.halfExtents, scale);
    }
}
exports.default = obb;
