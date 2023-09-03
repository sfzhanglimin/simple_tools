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
const vec3_1 = __importDefault(require("../value-types/vec3"));
const mat3_1 = __importDefault(require("../value-types/mat3"));
const enums_1 = __importDefault(require("./enums"));
let _v3_tmp = new vec3_1.default();
let _v3_tmp2 = new vec3_1.default();
let _m3_tmp = new mat3_1.default();
// https://zeuxcg.org/2010/10/17/aabb-from-obb-with-component-wise-abs/
let transform_extent_m4 = function (out, extent, m4) {
    let _m3_tmpm = _m3_tmp.m, m4m = m4.m;
    _m3_tmpm[0] = Math.abs(m4m[0]);
    _m3_tmpm[1] = Math.abs(m4m[1]);
    _m3_tmpm[2] = Math.abs(m4m[2]);
    _m3_tmpm[3] = Math.abs(m4m[4]);
    _m3_tmpm[4] = Math.abs(m4m[5]);
    _m3_tmpm[5] = Math.abs(m4m[6]);
    _m3_tmpm[6] = Math.abs(m4m[8]);
    _m3_tmpm[7] = Math.abs(m4m[9]);
    _m3_tmpm[8] = Math.abs(m4m[10]);
    vec3_1.default.transformMat3(out, extent, _m3_tmp);
};
/**
 * Aabb
 * @class geomUtils.Aabb
 */
class aabb {
    /**
     * create a new aabb
     * @method create
     * @param {number} px X coordinates for aabb's original point
     * @param {number} py Y coordinates for aabb's original point
     * @param {number} pz Z coordinates for aabb's original point
     * @param {number} w the half of aabb width
     * @param {number} h the half of aabb height
     * @param {number} l the half of aabb length
     * @return {geomUtils.Aabb}
     */
    static create(px, py, pz, w, h, l) {
        return new aabb(px, py, pz, w, h, l);
    }
    /**
     * clone a new aabb
     * @method clone
     * @param {geomUtils.Aabb} a the source aabb
     * @return {geomUtils.Aabb}
     */
    static clone(a) {
        return new aabb(a.center.x, a.center.y, a.center.z, a.halfExtents.x, a.halfExtents.y, a.halfExtents.z);
    }
    /**
     * copy the values from one aabb to another
     * @method copy
     * @param {geomUtils.Aabb} out the receiving aabb
     * @param {geomUtils.Aabb} a the source aabb
     * @return {geomUtils.Aabb}
     */
    static copy(out, a) {
        vec3_1.default.copy(out.center, a.center);
        vec3_1.default.copy(out.halfExtents, a.halfExtents);
        return out;
    }
    /**
     * create a new aabb from two corner points
     * @method fromPoints
     * @param {geomUtils.Aabb} out the receiving aabb
     * @param {Vec3} minPos lower corner position of the aabb
     * @param {Vec3} maxPos upper corner position of the aabb
     * @return {geomUtils.Aabb}
     */
    static fromPoints(out, minPos, maxPos) {
        vec3_1.default.scale(out.center, vec3_1.default.add(_v3_tmp, minPos, maxPos), 0.5);
        vec3_1.default.scale(out.halfExtents, vec3_1.default.sub(_v3_tmp2, maxPos, minPos), 0.5);
        return out;
    }
    /**
     * Set the components of a aabb to the given values
     * @method set
     * @param {geomUtils.Aabb} out the receiving aabb
     * @param {number} px X coordinates for aabb's original point
     * @param {number} py Y coordinates for aabb's original point
     * @param {number} pz Z coordinates for aabb's original point
     * @param {number} w the half of aabb width
     * @param {number} h the half of aabb height
     * @param {number} l the half of aabb length
     * @return {geomUtils.Aabb} out
     */
    static set(out, px, py, pz, w, h, l) {
        vec3_1.default.set(out.center, px, py, pz);
        vec3_1.default.set(out.halfExtents, w, h, l);
        return out;
    }
    constructor(px, py, pz, w, h, l) {
        this._type = enums_1.default.SHAPE_AABB;
        this.center = new vec3_1.default(px, py, pz);
        this.halfExtents = new vec3_1.default(w, h, l);
    }
    /**
     * Get the bounding points of this shape
     * @method getBoundary
     * @param {Vec3} minPos
     * @param {Vec3} maxPos
     */
    getBoundary(minPos, maxPos) {
        vec3_1.default.sub(minPos, this.center, this.halfExtents);
        vec3_1.default.add(maxPos, this.center, this.halfExtents);
    }
    /**
     * Transform this shape
     * @method transform
     * @param {Mat4} m the transform matrix
     * @param {Vec3} pos the position part of the transform
     * @param {Quat} rot the rotation part of the transform
     * @param {Vec3} scale the scale part of the transform
     * @param {geomUtils.Aabb} [out] the target shape
     */
    transform(m, pos, rot, scale, out) {
        if (!out)
            out = this;
        vec3_1.default.transformMat4(out.center, this.center, m);
        transform_extent_m4(out.halfExtents, this.halfExtents, m);
    }
}
exports.default = aabb;
