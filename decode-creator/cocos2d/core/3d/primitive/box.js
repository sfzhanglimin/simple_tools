'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vec3_1 = __importDefault(require("../../value-types/vec3"));
const vertex_data_1 = __importDefault(require("./vertex-data"));
let temp1 = new vec3_1.default();
let temp2 = new vec3_1.default();
let temp3 = new vec3_1.default();
let r = new vec3_1.default();
let c0 = new vec3_1.default();
let c1 = new vec3_1.default();
let c2 = new vec3_1.default();
let c3 = new vec3_1.default();
let c4 = new vec3_1.default();
let c5 = new vec3_1.default();
let c6 = new vec3_1.default();
let c7 = new vec3_1.default();
/**
 * @param {Number} width
 * @param {Number} height
 * @param {Number} length
 * @param {Object} opts
 * @param {Number} opts.widthSegments
 * @param {Number} opts.heightSegments
 * @param {Number} opts.lengthSegments
 */
function default_1(width = 1, height = 1, length = 1, opts = { widthSegments: 1, heightSegments: 1, lengthSegments: 1, invWinding: false }) {
    let ws = opts.widthSegments;
    let hs = opts.heightSegments;
    let ls = opts.lengthSegments;
    let inv = opts.invWinding;
    let hw = width * 0.5;
    let hh = height * 0.5;
    let hl = length * 0.5;
    let corners = [
        vec3_1.default.set(c0, -hw, -hh, hl),
        vec3_1.default.set(c1, hw, -hh, hl),
        vec3_1.default.set(c2, hw, hh, hl),
        vec3_1.default.set(c3, -hw, hh, hl),
        vec3_1.default.set(c4, hw, -hh, -hl),
        vec3_1.default.set(c5, -hw, -hh, -hl),
        vec3_1.default.set(c6, -hw, hh, -hl),
        vec3_1.default.set(c7, hw, hh, -hl),
    ];
    let faceAxes = [
        [2, 3, 1],
        [4, 5, 7],
        [7, 6, 2],
        [1, 0, 4],
        [1, 4, 2],
        [5, 0, 6] // LEFT
    ];
    let faceNormals = [
        [0, 0, 1],
        [0, 0, -1],
        [0, 1, 0],
        [0, -1, 0],
        [1, 0, 0],
        [-1, 0, 0] // LEFT
    ];
    let positions = [];
    let normals = [];
    let uvs = [];
    let indices = [];
    let minPos = new vec3_1.default(-hw, -hh, -hl);
    let maxPos = new vec3_1.default(hw, hh, hl);
    let boundingRadius = Math.sqrt(hw * hw + hh * hh + hl * hl);
    function _buildPlane(side, uSegments, vSegments) {
        let u, v;
        let ix, iy;
        let offset = positions.length / 3;
        let faceAxe = faceAxes[side];
        let faceNormal = faceNormals[side];
        for (iy = 0; iy <= vSegments; iy++) {
            for (ix = 0; ix <= uSegments; ix++) {
                u = ix / uSegments;
                v = iy / vSegments;
                vec3_1.default.lerp(temp1, corners[faceAxe[0]], corners[faceAxe[1]], u);
                vec3_1.default.lerp(temp2, corners[faceAxe[0]], corners[faceAxe[2]], v);
                vec3_1.default.subtract(temp3, temp2, corners[faceAxe[0]]);
                vec3_1.default.add(r, temp1, temp3);
                positions.push(r.x, r.y, r.z);
                normals.push(faceNormal[0], faceNormal[1], faceNormal[2]);
                uvs.push(u, v);
                if ((ix < uSegments) && (iy < vSegments)) {
                    let useg1 = uSegments + 1;
                    let a = ix + iy * useg1;
                    let b = ix + (iy + 1) * useg1;
                    let c = (ix + 1) + (iy + 1) * useg1;
                    let d = (ix + 1) + iy * useg1;
                    if (inv) {
                        indices.push(offset + a, offset + b, offset + d);
                        indices.push(offset + d, offset + b, offset + c);
                    }
                    else {
                        indices.push(offset + a, offset + d, offset + b);
                        indices.push(offset + b, offset + d, offset + c);
                    }
                }
            }
        }
    }
    _buildPlane(0, ws, hs); // FRONT
    _buildPlane(4, ls, hs); // RIGHT
    _buildPlane(1, ws, hs); // BACK
    _buildPlane(5, ls, hs); // LEFT
    _buildPlane(3, ws, ls); // BOTTOM
    _buildPlane(2, ws, ls); // TOP
    return new vertex_data_1.default(positions, normals, uvs, indices, minPos, maxPos, boundingRadius);
}
exports.default = default_1;
