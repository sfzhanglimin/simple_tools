"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vertex_format_1 = require("./webgl/vertex-format");
const vec3_1 = __importDefault(require("../value-types/vec3"));
let vec3_temps = [];
for (let i = 0; i < 4; i++) {
    vec3_temps.push(cc.v3());
}
let Assembler3D = {
    floatsPerVert: 6,
    uvOffset: 3,
    colorOffset: 5,
    getBuffer(renderer) {
        return renderer._meshBuffer3D;
    },
    getVfmt() {
        return vertex_format_1.vfmt3D;
    },
    updateWorldVerts(comp) {
        let matrix = comp.node._worldMatrix;
        let local = this._local;
        let world = this._renderData.vDatas[0];
        vec3_1.default.set(vec3_temps[0], local[0], local[1], 0);
        vec3_1.default.set(vec3_temps[1], local[2], local[1], 0);
        vec3_1.default.set(vec3_temps[2], local[0], local[3], 0);
        vec3_1.default.set(vec3_temps[3], local[2], local[3], 0);
        let floatsPerVert = this.floatsPerVert;
        for (let i = 0; i < 4; i++) {
            let vertex = vec3_temps[i];
            vec3_1.default.transformMat4(vertex, vertex, matrix);
            let dstOffset = floatsPerVert * i;
            world[dstOffset] = vertex.x;
            world[dstOffset + 1] = vertex.y;
            world[dstOffset + 2] = vertex.z;
        }
    },
};
cc.Assembler3D = Assembler3D;
exports.default = Assembler3D;
