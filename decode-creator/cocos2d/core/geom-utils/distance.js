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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pt_point_obb = exports.pt_point_aabb = exports.pt_point_plane = exports.point_plane = void 0;
const value_types_1 = require("../value-types");
const X = new value_types_1.Vec3();
const Y = new value_types_1.Vec3();
const Z = new value_types_1.Vec3();
const d = new value_types_1.Vec3();
const min = new value_types_1.Vec3();
const max = new value_types_1.Vec3();
const u = new Array(3);
const e = new Array(3);
/**
 * Some helpful utilities
 * @module cc.geomUtils
 */
/**
 * !#en
 * the distance between a point and a plane
 * !#zh
 * 计算点和平面之间的距离。
 * @method point_plane
 * @param {Vec3} point
 * @param {Plane} plane
 * @return {Number} Distance
 */
function point_plane(point, plane_) {
    return value_types_1.Vec3.dot(plane_.n, point) - plane_.d;
}
exports.point_plane = point_plane;
/**
 * !#en
 * the closest point on plane to a given point
 * !#zh
 * 计算平面上最接近给定点的点。
 * @method pt_point_plane
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Plane} plane
 * @return {Vec3} Closest point
 */
function pt_point_plane(out, point, plane_) {
    const t = point_plane(point, plane_);
    return value_types_1.Vec3.subtract(out, point, value_types_1.Vec3.multiplyScalar(out, plane_.n, t));
}
exports.pt_point_plane = pt_point_plane;
/**
 * !#en
 * the closest point on aabb to a given point
 * !#zh
 * 计算 aabb 上最接近给定点的点。
 * @method pt_point_aabb
 * @param {Vec3} out Closest point.
 * @param {Vec3} point Given point.
 * @param {Aabb} aabb Align the axis around the box.
 * @return {Vec3} Closest point.
 */
function pt_point_aabb(out, point, aabb_) {
    value_types_1.Vec3.copy(out, point);
    value_types_1.Vec3.subtract(min, aabb_.center, aabb_.halfExtents);
    value_types_1.Vec3.add(max, aabb_.center, aabb_.halfExtents);
    out.x = (out.x < min.x) ? min.x : out.x;
    out.y = (out.y < min.x) ? min.y : out.y;
    out.z = (out.z < min.x) ? min.z : out.z;
    out.x = (out.x > max.x) ? max.x : out.x;
    out.y = (out.y > max.x) ? max.y : out.y;
    out.z = (out.z > max.x) ? max.z : out.z;
    return out;
}
exports.pt_point_aabb = pt_point_aabb;
/**
 * !#en
 * the closest point on obb to a given point
 * !#zh
 * 计算 obb 上最接近给定点的点。
 * @method pt_point_obb
 * @param {Vec3} out Closest point
 * @param {Vec3} point Given point
 * @param {Obb} obb Direction box
 * @return {Vec3} closest point
 */
function pt_point_obb(out, point, obb_) {
    let obbm = obb_.orientation.m;
    value_types_1.Vec3.set(X, obbm[0], obbm[1], obbm[2]);
    value_types_1.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);
    value_types_1.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);
    u[0] = X;
    u[1] = Y;
    u[2] = Z;
    e[0] = obb_.halfExtents.x;
    e[1] = obb_.halfExtents.y;
    e[2] = obb_.halfExtents.z;
    value_types_1.Vec3.subtract(d, point, obb_.center);
    // Start result at center of obb; make steps from there
    value_types_1.Vec3.set(out, obb_.center.x, obb_.center.y, obb_.center.z);
    // For each OBB axis...
    for (let i = 0; i < 3; i++) {
        // ...project d onto that axis to get the distance
        // along the axis of d from the obb center
        let dist = value_types_1.Vec3.dot(d, u[i]);
        // if distance farther than the obb extents, clamp to the obb
        if (dist > e[i]) {
            dist = e[i];
        }
        if (dist < -e[i]) {
            dist = -e[i];
        }
        // Step that distance along the axis to get world coordinate
        out.x += dist * u[i].x;
        out.y += dist * u[i].y;
        out.z += dist * u[i].z;
    }
    return out;
}
exports.pt_point_obb = pt_point_obb;
