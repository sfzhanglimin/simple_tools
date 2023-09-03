"use strict";
// Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gfx_1 = __importDefault(require("../gfx"));
class InputAssembler {
    constructor(vb, ib, pt = gfx_1.default.PT_TRIANGLES) {
        this._vertexBuffer = vb;
        this._indexBuffer = ib;
        this._primitiveType = pt;
        this._start = 0;
        this._count = -1;
        // TODO: instancing data
        // this._stream = 0;
    }
    /**
     * @property {Number} count The number of indices or vertices to dispatch in the draw call.
     */
    get count() {
        if (this._count !== -1) {
            return this._count;
        }
        if (this._indexBuffer) {
            return this._indexBuffer.count;
        }
        if (this._vertexBuffer) {
            return this._vertexBuffer.count;
        }
        return 0;
    }
}
exports.default = InputAssembler;
