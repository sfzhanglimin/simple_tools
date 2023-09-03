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
const plane_1 = __importDefault(require("./plane"));
const _v = new Array(8);
_v[0] = new value_types_1.Vec3(1, 1, 1);
_v[1] = new value_types_1.Vec3(-1, 1, 1);
_v[2] = new value_types_1.Vec3(-1, -1, 1);
_v[3] = new value_types_1.Vec3(1, -1, 1);
_v[4] = new value_types_1.Vec3(1, 1, -1);
_v[5] = new value_types_1.Vec3(-1, 1, -1);
_v[6] = new value_types_1.Vec3(-1, -1, -1);
_v[7] = new value_types_1.Vec3(1, -1, -1);
/**
 * !#en frustum
 * !#zh 平截头体
 * @class geomUtils.Frustum
 */
class frustum {
    /**
     * Set whether to use accurate intersection testing function on this frustum
     * @property {boolean} accurate
     */
    set accurate(b) {
        this._type = b ? enums_1.default.SHAPE_FRUSTUM_ACCURATE : enums_1.default.SHAPE_FRUSTUM;
    }
    /**
     * create a new frustum
     * @method create
     * @static
     * @return {Frustum}
     */
    static create() {
        return new frustum();
    }
    /**
     * Clone a frustum
     * @method clone
     * @param {Frustum} f
     * @static
     * @return {Frustum}
     */
    static clone(f) {
        return frustum.copy(new frustum(), f);
    }
    /**
     * Copy the values from one frustum to another
     * @method copy
     * @param {Frustum} out
     * @param {Frustum} f
     * @return {Frustum}
     */
    static copy(out, f) {
        out._type = f._type;
        for (let i = 0; i < 6; ++i) {
            plane_1.default.copy(out.planes[i], f.planes[i]);
        }
        for (let i = 0; i < 8; ++i) {
            value_types_1.Vec3.copy(out.vertices[i], f.vertices[i]);
        }
        return out;
    }
    constructor() {
        this._type = enums_1.default.SHAPE_FRUSTUM;
        this.planes = new Array(6);
        for (let i = 0; i < 6; ++i) {
            this.planes[i] = plane_1.default.create(0, 0, 0, 0);
        }
        this.vertices = new Array(8);
        for (let i = 0; i < 8; ++i) {
            this.vertices[i] = new value_types_1.Vec3();
        }
    }
    /**
     * !#en Update the frustum information according to the given transform matrix.
     * Note that the resulting planes are not normalized under normal mode.
     * @method update
     * @param {Mat4} m the view-projection matrix
     * @param {Mat4} inv the inverse view-projection matrix
     */
    update(m, inv) {
        // RTR4, ch. 22.14.1, p. 983
        // extract frustum planes from view-proj matrix.
        let mm = m.m;
        // left plane
        value_types_1.Vec3.set(this.planes[0].n, mm[3] + mm[0], mm[7] + mm[4], mm[11] + mm[8]);
        this.planes[0].d = -(mm[15] + mm[12]);
        // right plane
        value_types_1.Vec3.set(this.planes[1].n, mm[3] - mm[0], mm[7] - mm[4], mm[11] - mm[8]);
        this.planes[1].d = -(mm[15] - mm[12]);
        // bottom plane
        value_types_1.Vec3.set(this.planes[2].n, mm[3] + mm[1], mm[7] + mm[5], mm[11] + mm[9]);
        this.planes[2].d = -(mm[15] + mm[13]);
        // top plane
        value_types_1.Vec3.set(this.planes[3].n, mm[3] - mm[1], mm[7] - mm[5], mm[11] - mm[9]);
        this.planes[3].d = -(mm[15] - mm[13]);
        // near plane
        value_types_1.Vec3.set(this.planes[4].n, mm[3] + mm[2], mm[7] + mm[6], mm[11] + mm[10]);
        this.planes[4].d = -(mm[15] + mm[14]);
        // far plane
        value_types_1.Vec3.set(this.planes[5].n, mm[3] - mm[2], mm[7] - mm[6], mm[11] - mm[10]);
        this.planes[5].d = -(mm[15] - mm[14]);
        if (this._type !== enums_1.default.SHAPE_FRUSTUM_ACCURATE) {
            return;
        }
        // normalize planes
        for (let i = 0; i < 6; i++) {
            const pl = this.planes[i];
            const invDist = 1 / pl.n.length();
            value_types_1.Vec3.multiplyScalar(pl.n, pl.n, invDist);
            pl.d *= invDist;
        }
        // update frustum vertices
        for (let i = 0; i < 8; i++) {
            value_types_1.Vec3.transformMat4(this.vertices[i], _v[i], inv);
        }
    }
    /**
     * !#en transform by matrix
     * @method transform
     * @param {Mat4} mat
     */
    transform(mat) {
        if (this._type !== enums_1.default.SHAPE_FRUSTUM_ACCURATE) {
            return;
        }
        for (let i = 0; i < 8; i++) {
            value_types_1.Vec3.transformMat4(this.vertices[i], this.vertices[i], mat);
        }
        plane_1.default.fromPoints(this.planes[0], this.vertices[1], this.vertices[5], this.vertices[6]);
        plane_1.default.fromPoints(this.planes[1], this.vertices[3], this.vertices[7], this.vertices[4]);
        plane_1.default.fromPoints(this.planes[2], this.vertices[6], this.vertices[7], this.vertices[3]);
        plane_1.default.fromPoints(this.planes[3], this.vertices[0], this.vertices[4], this.vertices[5]);
        plane_1.default.fromPoints(this.planes[4], this.vertices[2], this.vertices[3], this.vertices[0]);
        plane_1.default.fromPoints(this.planes[0], this.vertices[7], this.vertices[6], this.vertices[5]);
    }
}
frustum.createOrtho = (() => {
    const _temp_v3 = new value_types_1.Vec3();
    return (out, width, height, near, far, transform) => {
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        value_types_1.Vec3.set(_temp_v3, halfWidth, halfHeight, near);
        value_types_1.Vec3.transformMat4(out.vertices[0], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, -halfWidth, halfHeight, near);
        value_types_1.Vec3.transformMat4(out.vertices[1], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, -halfWidth, -halfHeight, near);
        value_types_1.Vec3.transformMat4(out.vertices[2], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, halfWidth, -halfHeight, near);
        value_types_1.Vec3.transformMat4(out.vertices[3], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, halfWidth, halfHeight, far);
        value_types_1.Vec3.transformMat4(out.vertices[4], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, -halfWidth, halfHeight, far);
        value_types_1.Vec3.transformMat4(out.vertices[5], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, -halfWidth, -halfHeight, far);
        value_types_1.Vec3.transformMat4(out.vertices[6], _temp_v3, transform);
        value_types_1.Vec3.set(_temp_v3, halfWidth, -halfHeight, far);
        value_types_1.Vec3.transformMat4(out.vertices[7], _temp_v3, transform);
        plane_1.default.fromPoints(out.planes[0], out.vertices[1], out.vertices[6], out.vertices[5]);
        plane_1.default.fromPoints(out.planes[1], out.vertices[3], out.vertices[4], out.vertices[7]);
        plane_1.default.fromPoints(out.planes[2], out.vertices[6], out.vertices[3], out.vertices[7]);
        plane_1.default.fromPoints(out.planes[3], out.vertices[0], out.vertices[5], out.vertices[4]);
        plane_1.default.fromPoints(out.planes[4], out.vertices[2], out.vertices[0], out.vertices[3]);
        plane_1.default.fromPoints(out.planes[0], out.vertices[7], out.vertices[5], out.vertices[6]);
    };
})();
exports.default = frustum;
