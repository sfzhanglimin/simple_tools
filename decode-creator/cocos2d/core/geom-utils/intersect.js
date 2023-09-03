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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gfx_1 = __importDefault(require("../../renderer/gfx"));
const recycle_pool_1 = __importDefault(require("../../renderer/memop/recycle-pool"));
const value_types_1 = require("../value-types");
const aabb_1 = __importDefault(require("./aabb"));
const distance = __importStar(require("./distance"));
const enums_1 = __importDefault(require("./enums"));
const ray_1 = __importDefault(require("./ray"));
const triangle_1 = __importDefault(require("./triangle"));
/**
 * @class geomUtils.intersect
 */
const ray_mesh = (function () {
    let tri = triangle_1.default.create();
    let minDist = Infinity;
    function getVec3(out, data, idx, stride) {
        value_types_1.Vec3.set(out, data[idx * stride], data[idx * stride + 1], data[idx * stride + 2]);
    }
    return function (ray, mesh) {
        minDist = Infinity;
        let subMeshes = mesh._subMeshes;
        for (let i = 0; i < subMeshes.length; i++) {
            if (subMeshes[i]._primitiveType !== gfx_1.default.PT_TRIANGLES)
                continue;
            let subData = (mesh._subDatas[i] || mesh._subDatas[0]);
            let posData = mesh._getAttrMeshData(i, gfx_1.default.ATTR_POSITION);
            let iData = subData.getIData(Uint16Array);
            let format = subData.vfm;
            let fmt = format.element(gfx_1.default.ATTR_POSITION);
            let num = fmt.num;
            for (let i = 0; i < iData.length; i += 3) {
                getVec3(tri.a, posData, iData[i], num);
                getVec3(tri.b, posData, iData[i + 1], num);
                getVec3(tri.c, posData, iData[i + 2], num);
                let dist = ray_triangle(ray, tri);
                if (dist > 0 && dist < minDist) {
                    minDist = dist;
                }
            }
        }
        return minDist;
    };
})();
// adapt to old api
const rayMesh = ray_mesh;
/**
 * !#en
 * Check whether ray intersect with nodes
 * !#zh
 * 检测射线是否与物体有交集
 * @static
 * @method ray_cast
 * @param {Node} root - If root is null, then traversal nodes from scene node
 * @param {geomUtils.Ray} worldRay
 * @param {Function} handler
 * @param {Function} filter
 * @return {[]} [{node, distance}]
*/
const ray_cast = (function () {
    function traversal(node, cb) {
        var children = node.children;
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            traversal(child, cb);
        }
        cb(node);
    }
    function cmp(a, b) {
        return a.distance - b.distance;
    }
    function transformMat4Normal(out, a, m) {
        let mm = m.m;
        let x = a.x, y = a.y, z = a.z, rhw = mm[3] * x + mm[7] * y + mm[11] * z;
        rhw = rhw ? 1 / rhw : 1;
        out.x = (mm[0] * x + mm[4] * y + mm[8] * z) * rhw;
        out.y = (mm[1] * x + mm[5] * y + mm[9] * z) * rhw;
        out.z = (mm[2] * x + mm[6] * y + mm[10] * z) * rhw;
        return out;
    }
    let resultsPool = new recycle_pool_1.default(function () {
        return {
            distance: 0,
            node: null
        };
    }, 1);
    let results = [];
    // temp variable
    let nodeAabb = aabb_1.default.create();
    let minPos = new value_types_1.Vec3();
    let maxPos = new value_types_1.Vec3();
    let modelRay = new ray_1.default();
    let m4_1 = cc.mat4();
    let m4_2 = cc.mat4();
    let d = new value_types_1.Vec3();
    function distanceValid(distance) {
        return distance > 0 && distance < Infinity;
    }
    return function (root, worldRay, handler, filter) {
        resultsPool.reset();
        results.length = 0;
        root = root || cc.director.getScene();
        traversal(root, function (node) {
            if (filter && !filter(node))
                return;
            // transform world ray to model ray
            value_types_1.Mat4.invert(m4_2, node.getWorldMatrix(m4_1));
            value_types_1.Vec3.transformMat4(modelRay.o, worldRay.o, m4_2);
            value_types_1.Vec3.normalize(modelRay.d, transformMat4Normal(modelRay.d, worldRay.d, m4_2));
            // raycast with bounding box
            let distance = Infinity;
            let component = node._renderComponent;
            if (component instanceof cc.MeshRenderer) {
                distance = ray_aabb(modelRay, component._boundingBox);
            }
            else if (node.width && node.height) {
                value_types_1.Vec3.set(minPos, -node.width * node.anchorX, -node.height * node.anchorY, node.z);
                value_types_1.Vec3.set(maxPos, node.width * (1 - node.anchorX), node.height * (1 - node.anchorY), node.z);
                aabb_1.default.fromPoints(nodeAabb, minPos, maxPos);
                distance = ray_aabb(modelRay, nodeAabb);
            }
            if (!distanceValid(distance))
                return;
            if (handler) {
                distance = handler(modelRay, node, distance);
            }
            if (distanceValid(distance)) {
                value_types_1.Vec3.scale(d, modelRay.d, distance);
                transformMat4Normal(d, d, m4_1);
                let res = resultsPool.add();
                res.node = node;
                res.distance = value_types_1.Vec3.mag(d);
                results.push(res);
            }
        });
        results.sort(cmp);
        return results;
    };
})();
// adapt to old api
const raycast = ray_cast;
/**
 * !#en ray-plane intersect<br/>
 * !#zh 射线与平面的相交性检测。
 * @static
 * @method ray_plane
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */
const ray_plane = (function () {
    const pt = new value_types_1.Vec3(0, 0, 0);
    return function (ray, plane) {
        const denom = value_types_1.Vec3.dot(ray.d, plane.n);
        if (Math.abs(denom) < Number.EPSILON) {
            return 0;
        }
        value_types_1.Vec3.multiplyScalar(pt, plane.n, plane.d);
        const t = value_types_1.Vec3.dot(value_types_1.Vec3.subtract(pt, pt, ray.o), plane.n) / denom;
        if (t < 0) {
            return 0;
        }
        return t;
    };
})();
/**
 * !#en line-plane intersect<br/>
 * !#zh 线段与平面的相交性检测。
 * @static
 * @method line_plane
 * @param {geomUtils.Line} line
 * @param {geomUtils.Plane} plane
 * @return {number} 0 or not 0
 */
const line_plane = (function () {
    const ab = new value_types_1.Vec3(0, 0, 0);
    return function (line, plane) {
        value_types_1.Vec3.subtract(ab, line.e, line.s);
        const t = (plane.d - value_types_1.Vec3.dot(line.s, plane.n)) / value_types_1.Vec3.dot(ab, plane.n);
        if (t < 0 || t > 1) {
            return 0;
        }
        return t;
    };
})();
// based on http://fileadmin.cs.lth.se/cs/Personal/Tomas_Akenine-Moller/raytri/
/**
 * !#en ray-triangle intersect<br/>
 * !#zh 射线与三角形的相交性检测。
 * @static
 * @method ray_triangle
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Triangle} triangle
 * @param {boolean} doubleSided
 * @return {number} 0 or not 0
 */
const ray_triangle = (function () {
    const ab = new value_types_1.Vec3(0, 0, 0);
    const ac = new value_types_1.Vec3(0, 0, 0);
    const pvec = new value_types_1.Vec3(0, 0, 0);
    const tvec = new value_types_1.Vec3(0, 0, 0);
    const qvec = new value_types_1.Vec3(0, 0, 0);
    return function (ray, triangle, doubleSided) {
        value_types_1.Vec3.subtract(ab, triangle.b, triangle.a);
        value_types_1.Vec3.subtract(ac, triangle.c, triangle.a);
        value_types_1.Vec3.cross(pvec, ray.d, ac);
        const det = value_types_1.Vec3.dot(ab, pvec);
        if (det < Number.EPSILON && (!doubleSided || det > -Number.EPSILON)) {
            return 0;
        }
        const inv_det = 1 / det;
        value_types_1.Vec3.subtract(tvec, ray.o, triangle.a);
        const u = value_types_1.Vec3.dot(tvec, pvec) * inv_det;
        if (u < 0 || u > 1) {
            return 0;
        }
        value_types_1.Vec3.cross(qvec, tvec, ab);
        const v = value_types_1.Vec3.dot(ray.d, qvec) * inv_det;
        if (v < 0 || u + v > 1) {
            return 0;
        }
        const t = value_types_1.Vec3.dot(ac, qvec) * inv_det;
        return t < 0 ? 0 : t;
    };
})();
// adapt to old api
const rayTriangle = ray_triangle;
/**
 * !#en line-triangle intersect<br/>
 * !#zh 线段与三角形的相交性检测。
 * @static
 * @method line_triangle
 * @param {geomUtils.Line} line
 * @param {geomUtils.Triangle} triangle
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */
const line_triangle = (function () {
    const ab = new value_types_1.Vec3(0, 0, 0);
    const ac = new value_types_1.Vec3(0, 0, 0);
    const qp = new value_types_1.Vec3(0, 0, 0);
    const ap = new value_types_1.Vec3(0, 0, 0);
    const n = new value_types_1.Vec3(0, 0, 0);
    const e = new value_types_1.Vec3(0, 0, 0);
    return function (line, triangle, outPt) {
        value_types_1.Vec3.subtract(ab, triangle.b, triangle.a);
        value_types_1.Vec3.subtract(ac, triangle.c, triangle.a);
        value_types_1.Vec3.subtract(qp, line.s, line.e);
        value_types_1.Vec3.cross(n, ab, ac);
        const det = value_types_1.Vec3.dot(qp, n);
        if (det <= 0.0) {
            return 0;
        }
        value_types_1.Vec3.subtract(ap, line.s, triangle.a);
        const t = value_types_1.Vec3.dot(ap, n);
        if (t < 0 || t > det) {
            return 0;
        }
        value_types_1.Vec3.cross(e, qp, ap);
        let v = value_types_1.Vec3.dot(ac, e);
        if (v < 0 || v > det) {
            return 0;
        }
        let w = -value_types_1.Vec3.dot(ab, e);
        if (w < 0.0 || v + w > det) {
            return 0;
        }
        if (outPt) {
            const invDet = 1.0 / det;
            v *= invDet;
            w *= invDet;
            const u = 1.0 - v - w;
            // outPt = u*a + v*d + w*c;
            value_types_1.Vec3.set(outPt, triangle.a.x * u + triangle.b.x * v + triangle.c.x * w, triangle.a.y * u + triangle.b.y * v + triangle.c.y * w, triangle.a.z * u + triangle.b.z * v + triangle.c.z * w);
        }
        return 1;
    };
})();
/**
 * !#en line-quad intersect<br/>
 * !#zh 线段与四边形的相交性检测。
 * @static
 * @method line_quad
 * @param {Vec3} p A point on a line segment
 * @param {Vec3} q Another point on the line segment
 * @param {Vec3} a Quadrilateral point a
 * @param {Vec3} b Quadrilateral point b
 * @param {Vec3} c Quadrilateral point c
 * @param {Vec3} d Quadrilateral point d
 * @param {Vec3} outPt optional, The intersection point
 * @return {number} 0 or not 0
 */
const line_quad = (function () {
    const pq = new value_types_1.Vec3(0, 0, 0);
    const pa = new value_types_1.Vec3(0, 0, 0);
    const pb = new value_types_1.Vec3(0, 0, 0);
    const pc = new value_types_1.Vec3(0, 0, 0);
    const pd = new value_types_1.Vec3(0, 0, 0);
    const m = new value_types_1.Vec3(0, 0, 0);
    const tmp = new value_types_1.Vec3(0, 0, 0);
    return function (p, q, a, b, c, d, outPt) {
        value_types_1.Vec3.subtract(pq, q, p);
        value_types_1.Vec3.subtract(pa, a, p);
        value_types_1.Vec3.subtract(pb, b, p);
        value_types_1.Vec3.subtract(pc, c, p);
        // Determine which triangle to test against by testing against diagonal first
        value_types_1.Vec3.cross(m, pc, pq);
        let v = value_types_1.Vec3.dot(pa, m);
        if (v >= 0) {
            // Test intersection against triangle abc
            let u = -value_types_1.Vec3.dot(pb, m);
            if (u < 0) {
                return 0;
            }
            let w = value_types_1.Vec3.dot(value_types_1.Vec3.cross(tmp, pq, pb), pa);
            if (w < 0) {
                return 0;
            }
            // outPt = u*a + v*b + w*c;
            if (outPt) {
                const denom = 1.0 / (u + v + w);
                u *= denom;
                v *= denom;
                w *= denom;
                value_types_1.Vec3.set(outPt, a.x * u + b.x * v + c.x * w, a.y * u + b.y * v + c.y * w, a.z * u + b.z * v + c.z * w);
            }
        }
        else {
            // Test intersection against triangle dac
            value_types_1.Vec3.subtract(pd, d, p);
            let u = value_types_1.Vec3.dot(pd, m);
            if (u < 0) {
                return 0;
            }
            let w = value_types_1.Vec3.dot(value_types_1.Vec3.cross(tmp, pq, pa), pd);
            if (w < 0) {
                return 0;
            }
            // outPt = u*a + v*d + w*c;
            if (outPt) {
                v = -v;
                const denom = 1.0 / (u + v + w);
                u *= denom;
                v *= denom;
                w *= denom;
                value_types_1.Vec3.set(outPt, a.x * u + d.x * v + c.x * w, a.y * u + d.y * v + c.y * w, a.z * u + d.z * v + c.z * w);
            }
        }
        return 1;
    };
})();
/**
 * !#en ray-sphere intersect<br/>
 * !#zh 射线和球的相交性检测。
 * @static
 * @method ray_sphere
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Sphere} sphere
 * @return {number} 0 or not 0
 */
const ray_sphere = (function () {
    const e = new value_types_1.Vec3(0, 0, 0);
    return function (ray, sphere) {
        const r = sphere.radius;
        const c = sphere.center;
        const o = ray.o;
        const d = ray.d;
        const rSq = r * r;
        value_types_1.Vec3.subtract(e, c, o);
        const eSq = e.lengthSqr();
        const aLength = value_types_1.Vec3.dot(e, d); // assume ray direction already normalized
        const fSq = rSq - (eSq - aLength * aLength);
        if (fSq < 0) {
            return 0;
        }
        const f = Math.sqrt(fSq);
        const t = eSq < rSq ? aLength + f : aLength - f;
        if (t < 0) {
            return 0;
        }
        return t;
    };
})();
/**
 * !#en ray-aabb intersect<br/>
 * !#zh 射线和轴对齐包围盒的相交性检测。
 * @static
 * @method ray_aabb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @return {number} 0 or not 0
 */
const ray_aabb = (function () {
    const min = new value_types_1.Vec3();
    const max = new value_types_1.Vec3();
    return function (ray, aabb) {
        const o = ray.o, d = ray.d;
        const ix = 1 / d.x, iy = 1 / d.y, iz = 1 / d.z;
        value_types_1.Vec3.subtract(min, aabb.center, aabb.halfExtents);
        value_types_1.Vec3.add(max, aabb.center, aabb.halfExtents);
        const t1 = (min.x - o.x) * ix;
        const t2 = (max.x - o.x) * ix;
        const t3 = (min.y - o.y) * iy;
        const t4 = (max.y - o.y) * iy;
        const t5 = (min.z - o.z) * iz;
        const t6 = (max.z - o.z) * iz;
        const tmin = Math.max(Math.max(Math.min(t1, t2), Math.min(t3, t4)), Math.min(t5, t6));
        const tmax = Math.min(Math.min(Math.max(t1, t2), Math.max(t3, t4)), Math.max(t5, t6));
        if (tmax < 0 || tmin > tmax) {
            return 0;
        }
        ;
        return tmin;
    };
})();
// adapt to old api
const rayAabb = ray_aabb;
/**
 * !#en ray-obb intersect<br/>
 * !#zh 射线和方向包围盒的相交性检测。
 * @static
 * @method ray_obb
 * @param {geomUtils.Ray} ray
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or or 0
 */
const ray_obb = (function () {
    let center = new value_types_1.Vec3();
    let o = new value_types_1.Vec3();
    let d = new value_types_1.Vec3();
    const X = new value_types_1.Vec3();
    const Y = new value_types_1.Vec3();
    const Z = new value_types_1.Vec3();
    const p = new value_types_1.Vec3();
    const size = new Array(3);
    const f = new Array(3);
    const e = new Array(3);
    const t = new Array(6);
    return function (ray, obb) {
        size[0] = obb.halfExtents.x;
        size[1] = obb.halfExtents.y;
        size[2] = obb.halfExtents.z;
        center = obb.center;
        o = ray.o;
        d = ray.d;
        let obbm = obb.orientation.m;
        value_types_1.Vec3.set(X, obbm[0], obbm[1], obbm[2]);
        value_types_1.Vec3.set(Y, obbm[3], obbm[4], obbm[5]);
        value_types_1.Vec3.set(Z, obbm[6], obbm[7], obbm[8]);
        value_types_1.Vec3.subtract(p, center, o);
        // The cos values of the ray on the X, Y, Z
        f[0] = value_types_1.Vec3.dot(X, d);
        f[1] = value_types_1.Vec3.dot(Y, d);
        f[2] = value_types_1.Vec3.dot(Z, d);
        // The projection length of P on X, Y, Z
        e[0] = value_types_1.Vec3.dot(X, p);
        e[1] = value_types_1.Vec3.dot(Y, p);
        e[2] = value_types_1.Vec3.dot(Z, p);
        for (let i = 0; i < 3; ++i) {
            if (f[i] === 0) {
                if (-e[i] - size[i] > 0 || -e[i] + size[i] < 0) {
                    return 0;
                }
                // Avoid div by 0!
                f[i] = 0.0000001;
            }
            // min
            t[i * 2 + 0] = (e[i] + size[i]) / f[i];
            // max
            t[i * 2 + 1] = (e[i] - size[i]) / f[i];
        }
        const tmin = Math.max(Math.max(Math.min(t[0], t[1]), Math.min(t[2], t[3])), Math.min(t[4], t[5]));
        const tmax = Math.min(Math.min(Math.max(t[0], t[1]), Math.max(t[2], t[3])), Math.max(t[4], t[5]));
        if (tmax < 0 || tmin > tmax || tmin < 0) {
            return 0;
        }
        return tmin;
    };
})();
/**
 * !#en aabb-aabb intersect<br/>
 * !#zh 轴对齐包围盒和轴对齐包围盒的相交性检测。
 * @static
 * @method aabb_aabb
 * @param {geomUtils.Aabb} aabb1 Axis alignment surrounds box 1
 * @param {geomUtils.Aabb} aabb2 Axis alignment surrounds box 2
 * @return {number} 0 or not 0
 */
const aabb_aabb = (function () {
    const aMin = new value_types_1.Vec3();
    const aMax = new value_types_1.Vec3();
    const bMin = new value_types_1.Vec3();
    const bMax = new value_types_1.Vec3();
    return function (aabb1, aabb2) {
        value_types_1.Vec3.subtract(aMin, aabb1.center, aabb1.halfExtents);
        value_types_1.Vec3.add(aMax, aabb1.center, aabb1.halfExtents);
        value_types_1.Vec3.subtract(bMin, aabb2.center, aabb2.halfExtents);
        value_types_1.Vec3.add(bMax, aabb2.center, aabb2.halfExtents);
        return (aMin.x <= bMax.x && aMax.x >= bMin.x) &&
            (aMin.y <= bMax.y && aMax.y >= bMin.y) &&
            (aMin.z <= bMax.z && aMax.z >= bMin.z);
    };
})();
function getAABBVertices(min, max, out) {
    value_types_1.Vec3.set(out[0], min.x, max.y, max.z);
    value_types_1.Vec3.set(out[1], min.x, max.y, min.z);
    value_types_1.Vec3.set(out[2], min.x, min.y, max.z);
    value_types_1.Vec3.set(out[3], min.x, min.y, min.z);
    value_types_1.Vec3.set(out[4], max.x, max.y, max.z);
    value_types_1.Vec3.set(out[5], max.x, max.y, min.z);
    value_types_1.Vec3.set(out[6], max.x, min.y, max.z);
    value_types_1.Vec3.set(out[7], max.x, min.y, min.z);
}
function getOBBVertices(c, e, a1, a2, a3, out) {
    value_types_1.Vec3.set(out[0], c.x + a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y + a3.z * e.z);
    value_types_1.Vec3.set(out[1], c.x - a1.x * e.x + a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y + a3.z * e.z);
    value_types_1.Vec3.set(out[2], c.x + a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y + a3.z * e.z);
    value_types_1.Vec3.set(out[3], c.x + a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x + a2.z * e.y - a3.z * e.z);
    value_types_1.Vec3.set(out[4], c.x - a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y - a3.z * e.z);
    value_types_1.Vec3.set(out[5], c.x + a1.x * e.x - a2.x * e.y - a3.x * e.z, c.y + a1.y * e.x - a2.y * e.y - a3.y * e.z, c.z + a1.z * e.x - a2.z * e.y - a3.z * e.z);
    value_types_1.Vec3.set(out[6], c.x - a1.x * e.x + a2.x * e.y - a3.x * e.z, c.y - a1.y * e.x + a2.y * e.y - a3.y * e.z, c.z - a1.z * e.x + a2.z * e.y - a3.z * e.z);
    value_types_1.Vec3.set(out[7], c.x - a1.x * e.x - a2.x * e.y + a3.x * e.z, c.y - a1.y * e.x - a2.y * e.y + a3.y * e.z, c.z - a1.z * e.x - a2.z * e.y + a3.z * e.z);
}
function getInterval(vertices, axis) {
    let min = value_types_1.Vec3.dot(axis, vertices[0]), max = min;
    for (let i = 1; i < 8; ++i) {
        const projection = value_types_1.Vec3.dot(axis, vertices[i]);
        min = (projection < min) ? projection : min;
        max = (projection > max) ? projection : max;
    }
    return [min, max];
}
/**
 * !#en aabb-obb intersect<br/>
 * !#zh 轴对齐包围盒和方向包围盒的相交性检测。
 * @static
 * @method aabb_obb
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Obb} obb Direction box
 * @return {number} 0 or not 0
 */
const aabb_obb = (function () {
    const test = new Array(15);
    for (let i = 0; i < 15; i++) {
        test[i] = new value_types_1.Vec3(0, 0, 0);
    }
    const vertices = new Array(8);
    const vertices2 = new Array(8);
    for (let i = 0; i < 8; i++) {
        vertices[i] = new value_types_1.Vec3(0, 0, 0);
        vertices2[i] = new value_types_1.Vec3(0, 0, 0);
    }
    const min = new value_types_1.Vec3();
    const max = new value_types_1.Vec3();
    return function (aabb, obb) {
        let obbm = obb.orientation.m;
        value_types_1.Vec3.set(test[0], 1, 0, 0);
        value_types_1.Vec3.set(test[1], 0, 1, 0);
        value_types_1.Vec3.set(test[2], 0, 0, 1);
        value_types_1.Vec3.set(test[3], obbm[0], obbm[1], obbm[2]);
        value_types_1.Vec3.set(test[4], obbm[3], obbm[4], obbm[5]);
        value_types_1.Vec3.set(test[5], obbm[6], obbm[7], obbm[8]);
        for (let i = 0; i < 3; ++i) { // Fill out rest of axis
            value_types_1.Vec3.cross(test[6 + i * 3 + 0], test[i], test[0]);
            value_types_1.Vec3.cross(test[6 + i * 3 + 1], test[i], test[1]);
            value_types_1.Vec3.cross(test[6 + i * 3 + 1], test[i], test[2]);
        }
        value_types_1.Vec3.subtract(min, aabb.center, aabb.halfExtents);
        value_types_1.Vec3.add(max, aabb.center, aabb.halfExtents);
        getAABBVertices(min, max, vertices);
        getOBBVertices(obb.center, obb.halfExtents, test[3], test[4], test[5], vertices2);
        for (let j = 0; j < 15; ++j) {
            const a = getInterval(vertices, test[j]);
            const b = getInterval(vertices2, test[j]);
            if (b[0] > a[1] || a[0] > b[1]) {
                return 0; // Seperating axis found
            }
        }
        return 1;
    };
})();
/**
 * !#en aabb-plane intersect<br/>
 * !#zh 轴对齐包围盒和平面的相交性检测。
 * @static
 * @method aabb_plane
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */
const aabb_plane = function (aabb, plane) {
    const r = aabb.halfExtents.x * Math.abs(plane.n.x) +
        aabb.halfExtents.y * Math.abs(plane.n.y) +
        aabb.halfExtents.z * Math.abs(plane.n.z);
    const dot = value_types_1.Vec3.dot(plane.n, aabb.center);
    if (dot + r < plane.d) {
        return -1;
    }
    else if (dot - r > plane.d) {
        return 0;
    }
    return 1;
};
/**
 * !#en aabb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method aabb_frustum
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */
const aabb_frustum = function (aabb, frustum) {
    for (let i = 0; i < frustum.planes.length; i++) {
        // frustum plane normal points to the inside
        if (aabb_plane(aabb, frustum.planes[i]) === -1) {
            return 0;
        }
    } // completely outside
    return 1;
};
// https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/
/**
 * !#en aabb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 轴对齐包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method aabb_frustum_accurate
 * @param {geomUtils.Aabb} aabb Align the axis around the box
 * @param {geomUtils.Frustum} frustum
 * @return {number}
 */
const aabb_frustum_accurate = (function () {
    const tmp = new Array(8);
    let out1 = 0, out2 = 0;
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = new value_types_1.Vec3(0, 0, 0);
    }
    return function (aabb, frustum) {
        let result = 0, intersects = false;
        // 1. aabb inside/outside frustum test
        for (let i = 0; i < frustum.planes.length; i++) {
            result = aabb_plane(aabb, frustum.planes[i]);
            // frustum plane normal points to the inside
            if (result === -1) {
                return 0;
            } // completely outside
            else if (result === 1) {
                intersects = true;
            }
        }
        if (!intersects) {
            return 1;
        } // completely inside
        // in case of false positives
        // 2. frustum inside/outside aabb test
        for (let i = 0; i < frustum.vertices.length; i++) {
            value_types_1.Vec3.subtract(tmp[i], frustum.vertices[i], aabb.center);
        }
        out1 = 0, out2 = 0;
        for (let i = 0; i < frustum.vertices.length; i++) {
            if (tmp[i].x > aabb.halfExtents.x) {
                out1++;
            }
            else if (tmp[i].x < -aabb.halfExtents.x) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        out1 = 0;
        out2 = 0;
        for (let i = 0; i < frustum.vertices.length; i++) {
            if (tmp[i].y > aabb.halfExtents.y) {
                out1++;
            }
            else if (tmp[i].y < -aabb.halfExtents.y) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        out1 = 0;
        out2 = 0;
        for (let i = 0; i < frustum.vertices.length; i++) {
            if (tmp[i].z > aabb.halfExtents.z) {
                out1++;
            }
            else if (tmp[i].z < -aabb.halfExtents.z) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        return 1;
    };
})();
/**
 * !#en obb-point intersect<br/>
 * !#zh 方向包围盒和点的相交性检测。
 * @static
 * @method obb_point
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Vec3} point
 * @return {boolean} true or false
 */
const obb_point = (function () {
    const tmp = new value_types_1.Vec3(0, 0, 0), m3 = new value_types_1.Mat3();
    const lessThan = function (a, b) { return Math.abs(a.x) < b.x && Math.abs(a.y) < b.y && Math.abs(a.z) < b.z; };
    return function (obb, point) {
        value_types_1.Vec3.subtract(tmp, point, obb.center);
        value_types_1.Vec3.transformMat3(tmp, tmp, value_types_1.Mat3.transpose(m3, obb.orientation));
        return lessThan(tmp, obb.halfExtents);
    };
})();
/**
 * !#en obb-plane intersect<br/>
 * !#zh 方向包围盒和平面的相交性检测。
 * @static
 * @method obb_plane
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */
const obb_plane = (function () {
    const absDot = function (n, x, y, z) {
        return Math.abs(n.x * x + n.y * y + n.z * z);
    };
    return function (obb, plane) {
        let obbm = obb.orientation.m;
        // Real-Time Collision Detection, Christer Ericson, p. 163.
        const r = obb.halfExtents.x * absDot(plane.n, obbm[0], obbm[1], obbm[2]) +
            obb.halfExtents.y * absDot(plane.n, obbm[3], obbm[4], obbm[5]) +
            obb.halfExtents.z * absDot(plane.n, obbm[6], obbm[7], obbm[8]);
        const dot = value_types_1.Vec3.dot(plane.n, obb.center);
        if (dot + r < plane.d) {
            return -1;
        }
        else if (dot - r > plane.d) {
            return 0;
        }
        return 1;
    };
})();
/**
 * !#en obb-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 方向包围盒和锥台相交性检测，速度快，但有错误情况。
 * @static
 * @method obb_frustum
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */
const obb_frustum = function (obb, frustum) {
    for (let i = 0; i < frustum.planes.length; i++) {
        // frustum plane normal points to the inside
        if (obb_plane(obb, frustum.planes[i]) === -1) {
            return 0;
        }
    } // completely outside
    return 1;
};
// https://cesium.com/blog/2017/02/02/tighter-frustum-culling-and-why-you-may-want-to-disregard-it/
/**
 * !#en obb-frustum intersect, handles most of the false positives correctly<br/>
 * !#zh 方向包围盒和锥台相交性检测，正确处理大多数错误情况。
 * @static
 * @method obb_frustum_accurate
 * @param {geomUtils.Obb} obb Direction box
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */
const obb_frustum_accurate = (function () {
    const tmp = new Array(8);
    let dist = 0, out1 = 0, out2 = 0;
    for (let i = 0; i < tmp.length; i++) {
        tmp[i] = new value_types_1.Vec3(0, 0, 0);
    }
    const dot = function (n, x, y, z) {
        return n.x * x + n.y * y + n.z * z;
    };
    return function (obb, frustum) {
        let result = 0, intersects = false;
        // 1. obb inside/outside frustum test
        for (let i = 0; i < frustum.planes.length; i++) {
            result = obb_plane(obb, frustum.planes[i]);
            // frustum plane normal points to the inside
            if (result === -1) {
                return 0;
            } // completely outside
            else if (result === 1) {
                intersects = true;
            }
        }
        if (!intersects) {
            return 1;
        } // completely inside
        // in case of false positives
        // 2. frustum inside/outside obb test
        for (let i = 0; i < frustum.vertices.length; i++) {
            value_types_1.Vec3.subtract(tmp[i], frustum.vertices[i], obb.center);
        }
        out1 = 0, out2 = 0;
        let obbm = obb.orientation.m;
        for (let i = 0; i < frustum.vertices.length; i++) {
            dist = dot(tmp[i], obbm[0], obbm[1], obbm[2]);
            if (dist > obb.halfExtents.x) {
                out1++;
            }
            else if (dist < -obb.halfExtents.x) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        out1 = 0;
        out2 = 0;
        for (let i = 0; i < frustum.vertices.length; i++) {
            dist = dot(tmp[i], obbm[3], obbm[4], obbm[5]);
            if (dist > obb.halfExtents.y) {
                out1++;
            }
            else if (dist < -obb.halfExtents.y) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        out1 = 0;
        out2 = 0;
        for (let i = 0; i < frustum.vertices.length; i++) {
            dist = dot(tmp[i], obbm[6], obbm[7], obbm[8]);
            if (dist > obb.halfExtents.z) {
                out1++;
            }
            else if (dist < -obb.halfExtents.z) {
                out2++;
            }
        }
        if (out1 === frustum.vertices.length || out2 === frustum.vertices.length) {
            return 0;
        }
        return 1;
    };
})();
/**
 * !#en obb-obb intersect<br/>
 * !#zh 方向包围盒和方向包围盒的相交性检测。
 * @static
 * @method obb_obb
 * @param {geomUtils.Obb} obb1 Direction box1
 * @param {geomUtils.Obb} obb2 Direction box2
 * @return {number} 0 or not 0
 */
const obb_obb = (function () {
    const test = new Array(15);
    for (let i = 0; i < 15; i++) {
        test[i] = new value_types_1.Vec3(0, 0, 0);
    }
    const vertices = new Array(8);
    const vertices2 = new Array(8);
    for (let i = 0; i < 8; i++) {
        vertices[i] = new value_types_1.Vec3(0, 0, 0);
        vertices2[i] = new value_types_1.Vec3(0, 0, 0);
    }
    return function (obb1, obb2) {
        let obb1m = obb1.orientation.m;
        let obb2m = obb2.orientation.m;
        value_types_1.Vec3.set(test[0], obb1m[0], obb1m[1], obb1m[2]);
        value_types_1.Vec3.set(test[1], obb1m[3], obb1m[4], obb1m[5]);
        value_types_1.Vec3.set(test[2], obb1m[6], obb1m[7], obb1m[8]);
        value_types_1.Vec3.set(test[3], obb2m[0], obb2m[1], obb2m[2]);
        value_types_1.Vec3.set(test[4], obb2m[3], obb2m[4], obb2m[5]);
        value_types_1.Vec3.set(test[5], obb2m[6], obb2m[7], obb2m[8]);
        for (let i = 0; i < 3; ++i) { // Fill out rest of axis
            value_types_1.Vec3.cross(test[6 + i * 3 + 0], test[i], test[0]);
            value_types_1.Vec3.cross(test[6 + i * 3 + 1], test[i], test[1]);
            value_types_1.Vec3.cross(test[6 + i * 3 + 1], test[i], test[2]);
        }
        getOBBVertices(obb1.center, obb1.halfExtents, test[0], test[1], test[2], vertices);
        getOBBVertices(obb2.center, obb2.halfExtents, test[3], test[4], test[5], vertices2);
        for (let i = 0; i < 15; ++i) {
            const a = getInterval(vertices, test[i]);
            const b = getInterval(vertices2, test[i]);
            if (b[0] > a[1] || a[0] > b[1]) {
                return 0; // Seperating axis found
            }
        }
        return 1;
    };
})();
/**
 * !#en phere-plane intersect, not necessarily faster than obb-plane<br/>
 * due to the length calculation of the plane normal to factor out<br/>
 * the unnomalized plane distance<br/>
 * !#zh 球与平面的相交性检测。
 * @static
 * @method sphere_plane
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Plane} plane
 * @return {number} inside(back) = -1, outside(front) = 0, intersect = 1
 */
const sphere_plane = function (sphere, plane) {
    const dot = value_types_1.Vec3.dot(plane.n, sphere.center);
    const r = sphere.radius * plane.n.length();
    if (dot + r < plane.d) {
        return -1;
    }
    else if (dot - r > plane.d) {
        return 0;
    }
    return 1;
};
/**
 * !#en sphere-frustum intersect, faster but has false positive corner cases<br/>
 * !#zh 球和锥台的相交性检测，速度快，但有错误情况。
 * @static
 * @method sphere_frustum
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */
const sphere_frustum = function (sphere, frustum) {
    for (let i = 0; i < frustum.planes.length; i++) {
        // frustum plane normal points to the inside
        if (sphere_plane(sphere, frustum.planes[i]) === -1) {
            return 0;
        }
    } // completely outside
    return 1;
};
// https://stackoverflow.com/questions/20912692/view-frustum-culling-corner-cases
/**
 * !#en sphere-frustum intersect, handles the false positives correctly<br/>
 * !#zh 球和锥台的相交性检测，正确处理大多数错误情况。
 * @static
 * @method sphere_frustum_accurate
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Frustum} frustum
 * @return {number} 0 or not 0
 */
const sphere_frustum_accurate = (function () {
    const pt = new value_types_1.Vec3(0, 0, 0), map = [1, -1, 1, -1, 1, -1];
    return function (sphere, frustum) {
        for (let i = 0; i < 6; i++) {
            const plane = frustum.planes[i];
            const r = sphere.radius, c = sphere.center;
            const n = plane.n, d = plane.d;
            const dot = value_types_1.Vec3.dot(n, c);
            // frustum plane normal points to the inside
            if (dot + r < d) {
                return 0;
            } // completely outside
            else if (dot - r > d) {
                continue;
            }
            // in case of false positives
            // has false negatives, still working on it
            value_types_1.Vec3.add(pt, c, value_types_1.Vec3.multiplyScalar(pt, n, r));
            for (let j = 0; j < 6; j++) {
                if (j === i || j === i + map[i]) {
                    continue;
                }
                const test = frustum.planes[j];
                if (value_types_1.Vec3.dot(test.n, pt) < test.d) {
                    return 0;
                }
            }
        }
        return 1;
    };
})();
/**
 * !#en sphere-sphere intersect<br/>
 * !#zh 球和球的相交性检测。
 * @static
 * @method sphere_sphere
 * @param {geomUtils.Sphere} sphere0
 * @param {geomUtils.Sphere} sphere1
 * @return {boolean} true or false
 */
const sphere_sphere = function (sphere0, sphere1) {
    const r = sphere0.radius + sphere1.radius;
    return value_types_1.Vec3.squaredDistance(sphere0.center, sphere1.center) < r * r;
};
/**
 * !#en sphere-aabb intersect<br/>
 * !#zh 球和轴对齐包围盒的相交性检测。
 * @static
 * @method sphere_aabb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Aabb} aabb
 * @return {boolean} true or false
 */
const sphere_aabb = (function () {
    const pt = new value_types_1.Vec3();
    return function (sphere, aabb) {
        distance.pt_point_aabb(pt, sphere.center, aabb);
        return value_types_1.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
    };
})();
/**
 * !#en sphere-obb intersect<br/>
 * !#zh 球和方向包围盒的相交性检测。
 * @static
 * @method sphere_obb
 * @param {geomUtils.Sphere} sphere
 * @param {geomUtils.Obb} obb
 * @return {boolean} true or false
 */
const sphere_obb = (function () {
    const pt = new value_types_1.Vec3();
    return function (sphere, obb) {
        distance.pt_point_obb(pt, sphere.center, obb);
        return value_types_1.Vec3.squaredDistance(sphere.center, pt) < sphere.radius * sphere.radius;
    };
})();
const intersect = {
    // old api
    rayAabb,
    rayMesh,
    raycast,
    rayTriangle,
    ray_sphere,
    ray_aabb,
    ray_obb,
    ray_plane,
    ray_triangle,
    line_plane,
    line_triangle,
    line_quad,
    sphere_sphere,
    sphere_aabb,
    sphere_obb,
    sphere_plane,
    sphere_frustum,
    sphere_frustum_accurate,
    aabb_aabb,
    aabb_obb,
    aabb_plane,
    aabb_frustum,
    aabb_frustum_accurate,
    obb_obb,
    obb_plane,
    obb_frustum,
    obb_frustum_accurate,
    obb_point,
    /**
     * !#en
     * The intersection detection of g1 and g2 can fill in the shape in the basic geometry.
     * !#zh
     * g1 和 g2 的相交性检测，可填入基础几何中的形状。
     * @static
     * @method resolve
     * @param g1 Geometry 1
     * @param g2 Geometry 2
     * @param outPt optional, Intersection point. (note: only partial shape detection with this return value)
     */
    resolve(g1, g2, outPt = null) {
        const type1 = g1._type, type2 = g2._type;
        const resolver = this[type1 | type2];
        if (type1 < type2) {
            return resolver(g1, g2, outPt);
        }
        else {
            return resolver(g2, g1, outPt);
        }
    },
};
intersect[enums_1.default.SHAPE_RAY | enums_1.default.SHAPE_SPHERE] = ray_sphere;
intersect[enums_1.default.SHAPE_RAY | enums_1.default.SHAPE_AABB] = ray_aabb;
intersect[enums_1.default.SHAPE_RAY | enums_1.default.SHAPE_OBB] = ray_obb;
intersect[enums_1.default.SHAPE_RAY | enums_1.default.SHAPE_PLANE] = ray_plane;
intersect[enums_1.default.SHAPE_RAY | enums_1.default.SHAPE_TRIANGLE] = ray_triangle;
intersect[enums_1.default.SHAPE_LINE | enums_1.default.SHAPE_PLANE] = line_plane;
intersect[enums_1.default.SHAPE_LINE | enums_1.default.SHAPE_TRIANGLE] = line_triangle;
intersect[enums_1.default.SHAPE_SPHERE] = sphere_sphere;
intersect[enums_1.default.SHAPE_SPHERE | enums_1.default.SHAPE_AABB] = sphere_aabb;
intersect[enums_1.default.SHAPE_SPHERE | enums_1.default.SHAPE_OBB] = sphere_obb;
intersect[enums_1.default.SHAPE_SPHERE | enums_1.default.SHAPE_PLANE] = sphere_plane;
intersect[enums_1.default.SHAPE_SPHERE | enums_1.default.SHAPE_FRUSTUM] = sphere_frustum;
intersect[enums_1.default.SHAPE_SPHERE | enums_1.default.SHAPE_FRUSTUM_ACCURATE] = sphere_frustum_accurate;
intersect[enums_1.default.SHAPE_AABB] = aabb_aabb;
intersect[enums_1.default.SHAPE_AABB | enums_1.default.SHAPE_OBB] = aabb_obb;
intersect[enums_1.default.SHAPE_AABB | enums_1.default.SHAPE_PLANE] = aabb_plane;
intersect[enums_1.default.SHAPE_AABB | enums_1.default.SHAPE_FRUSTUM] = aabb_frustum;
intersect[enums_1.default.SHAPE_AABB | enums_1.default.SHAPE_FRUSTUM_ACCURATE] = aabb_frustum_accurate;
intersect[enums_1.default.SHAPE_OBB] = obb_obb;
intersect[enums_1.default.SHAPE_OBB | enums_1.default.SHAPE_PLANE] = obb_plane;
intersect[enums_1.default.SHAPE_OBB | enums_1.default.SHAPE_FRUSTUM] = obb_frustum;
intersect[enums_1.default.SHAPE_OBB | enums_1.default.SHAPE_FRUSTUM_ACCURATE] = obb_frustum_accurate;
exports.default = intersect;
