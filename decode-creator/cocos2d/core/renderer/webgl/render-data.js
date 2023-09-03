"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flex_buffer_1 = __importDefault(require("./flex-buffer"));
const vertex_format_1 = require("./vertex-format");
function RenderData() {
    this.vDatas = [];
    this.uintVDatas = [];
    this.iDatas = [];
    this.meshCount = 0;
    this._infos = null;
    this._flexBuffer = null;
}
exports.default = RenderData;
cc.js.mixin(RenderData.prototype, {
    init(assembler) {
    },
    clear() {
        this.vDatas.length = 0;
        this.iDatas.length = 0;
        this.uintVDatas.length = 0;
        this.meshCount = 0;
        this._infos = null;
        if (this._flexBuffer) {
            this._flexBuffer.reset();
        }
    },
    updateMesh(index, vertices, indices) {
        this.vDatas[index] = vertices;
        this.uintVDatas[index] = new Uint32Array(vertices.buffer, 0, vertices.length);
        this.iDatas[index] = indices;
        this.meshCount = this.vDatas.length;
    },
    updateMeshRange(verticesCount, indicesCount) {
    },
    createData(index, verticesFloats, indicesCount) {
        let vertices = new Float32Array(verticesFloats);
        let indices = new Uint16Array(indicesCount);
        this.updateMesh(index, vertices, indices);
    },
    createQuadData(index, verticesFloats, indicesCount) {
        this.createData(index, verticesFloats, indicesCount);
        this.initQuadIndices(this.iDatas[index]);
    },
    createFlexData(index, verticesFloats, indicesCount, vfmt) {
        vfmt = vfmt || vertex_format_1.vfmtPosUvColor;
        this._flexBuffer = new flex_buffer_1.default(this, index, verticesFloats, indicesCount, vfmt);
    },
    initQuadIndices(indices) {
        let count = indices.length / 6;
        for (let i = 0, idx = 0; i < count; i++) {
            let vertextID = i * 4;
            indices[idx++] = vertextID;
            indices[idx++] = vertextID + 1;
            indices[idx++] = vertextID + 2;
            indices[idx++] = vertextID + 1;
            indices[idx++] = vertextID + 3;
            indices[idx++] = vertextID + 2;
        }
    }
});
cc.RenderData = RenderData;
