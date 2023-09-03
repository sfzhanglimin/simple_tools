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
let c00 = new vec3_1.default();
let c10 = new vec3_1.default();
let c01 = new vec3_1.default();
/**
 * @param {Number} width
 * @param {Number} length
 * @param {Object} opts
 * @param {Number} opts.widthSegments
 * @param {Number} opts.lengthSegments
 */
function default_1(width = 10, length = 10, opts = { widthSegments: 10, lengthSegments: 10 }) {
    let uSegments = opts.widthSegments;
    let vSegments = opts.lengthSegments;
    let hw = width * 0.5;
    let hl = length * 0.5;
    let positions = [];
    let normals = [];
    let uvs = [];
    let indices = [];
    let minPos = new vec3_1.default(-hw, 0, -hl);
    let maxPos = new vec3_1.default(hw, 0, hl);
    let boundingRadius = Math.sqrt(width * width + length * length);
    vec3_1.default.set(c00, -hw, 0, hl);
    vec3_1.default.set(c10, hw, 0, hl);
    vec3_1.default.set(c01, -hw, 0, -hl);
    for (let y = 0; y <= vSegments; y++) {
        for (let x = 0; x <= uSegments; x++) {
            let u = x / uSegments;
            let v = y / vSegments;
            vec3_1.default.lerp(temp1, c00, c10, u);
            vec3_1.default.lerp(temp2, c00, c01, v);
            vec3_1.default.sub(temp3, temp2, c00);
            vec3_1.default.add(r, temp1, temp3);
            positions.push(r.x, r.y, r.z);
            normals.push(0, 1, 0);
            uvs.push(u, v);
            if ((x < uSegments) && (y < vSegments)) {
                let useg1 = uSegments + 1;
                let a = x + y * useg1;
                let b = x + (y + 1) * useg1;
                let c = (x + 1) + (y + 1) * useg1;
                let d = (x + 1) + y * useg1;
                indices.push(a, d, b);
                indices.push(d, c, b);
            }
        }
    }
    return new vertex_data_1.default(positions, normals, uvs, indices, minPos, maxPos, boundingRadius);
}
exports.default = default_1;
