'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vertex_data_1 = __importDefault(require("./vertex-data"));
const value_types_1 = require("../../value-types");
let positions = [
    -0.5, -0.5, 0,
    -0.5, 0.5, 0,
    0.5, 0.5, 0,
    0.5, -0.5, 0, // bottom-right
];
let normals = [
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
];
let uvs = [
    0, 0,
    0, 1,
    1, 1,
    1, 0,
];
let indices = [
    0, 3, 1,
    3, 2, 1
];
// TODO: ?
let minPos = new value_types_1.Vec3(-0.5, -0.5, 0);
let maxPos = new value_types_1.Vec3(0.5, 0.5, 0);
let boundingRadius = Math.sqrt(0.5 * 0.5 + 0.5 * 0.5);
function default_1() {
    return new vertex_data_1.default(positions, normals, uvs, indices, minPos, maxPos, boundingRadius);
}
exports.default = default_1;
