"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
const _default = {
    // blend
    blend: false,
    blendSep: false,
    blendColor: 0xffffffff,
    blendEq: enums_1.enums.BLEND_FUNC_ADD,
    blendAlphaEq: enums_1.enums.BLEND_FUNC_ADD,
    blendSrc: enums_1.enums.BLEND_ONE,
    blendDst: enums_1.enums.BLEND_ZERO,
    blendSrcAlpha: enums_1.enums.BLEND_ONE,
    blendDstAlpha: enums_1.enums.BLEND_ZERO,
    // depth
    depthTest: false,
    depthWrite: false,
    depthFunc: enums_1.enums.DS_FUNC_LESS,
    // stencil
    stencilTest: false,
    stencilSep: false,
    stencilFuncFront: enums_1.enums.DS_FUNC_ALWAYS,
    stencilRefFront: 0,
    stencilMaskFront: 0xff,
    stencilFailOpFront: enums_1.enums.STENCIL_OP_KEEP,
    stencilZFailOpFront: enums_1.enums.STENCIL_OP_KEEP,
    stencilZPassOpFront: enums_1.enums.STENCIL_OP_KEEP,
    stencilWriteMaskFront: 0xff,
    stencilFuncBack: enums_1.enums.DS_FUNC_ALWAYS,
    stencilRefBack: 0,
    stencilMaskBack: 0xff,
    stencilFailOpBack: enums_1.enums.STENCIL_OP_KEEP,
    stencilZFailOpBack: enums_1.enums.STENCIL_OP_KEEP,
    stencilZPassOpBack: enums_1.enums.STENCIL_OP_KEEP,
    stencilWriteMaskBack: 0xff,
    // cull-mode
    cullMode: enums_1.enums.CULL_BACK,
    // primitive-type
    primitiveType: enums_1.enums.PT_TRIANGLES,
    // bindings
    maxStream: -1,
    vertexBuffers: [],
    vertexBufferOffsets: [],
    indexBuffer: null,
    maxTextureSlot: -1,
    textureUnits: [],
    program: null,
};
class State {
    constructor(device) {
        // bindings
        this.vertexBuffers = new Array(device._caps.maxVertexStreams);
        this.vertexBufferOffsets = new Array(device._caps.maxVertexStreams);
        this.textureUnits = new Array(device._caps.maxTextureUnits);
        this.set(_default);
    }
    static initDefault(device) {
        _default.vertexBuffers = new Array(device._caps.maxVertexStreams);
        _default.vertexBufferOffsets = new Array(device._caps.maxVertexStreams);
        _default.textureUnits = new Array(device._caps.maxTextureUnits);
    }
    reset() {
        this.set(_default);
    }
    set(cpy) {
        // blending
        this.blend = cpy.blend;
        this.blendSep = cpy.blendSep;
        this.blendColor = cpy.blendColor;
        this.blendEq = cpy.blendEq;
        this.blendAlphaEq = cpy.blendAlphaEq;
        this.blendSrc = cpy.blendSrc;
        this.blendDst = cpy.blendDst;
        this.blendSrcAlpha = cpy.blendSrcAlpha;
        this.blendDstAlpha = cpy.blendDstAlpha;
        // depth
        this.depthTest = cpy.depthTest;
        this.depthWrite = cpy.depthWrite;
        this.depthFunc = cpy.depthFunc;
        // stencil
        this.stencilTest = cpy.stencilTest;
        this.stencilSep = cpy.stencilSep;
        this.stencilFuncFront = cpy.stencilFuncFront;
        this.stencilRefFront = cpy.stencilRefFront;
        this.stencilMaskFront = cpy.stencilMaskFront;
        this.stencilFailOpFront = cpy.stencilFailOpFront;
        this.stencilZFailOpFront = cpy.stencilZFailOpFront;
        this.stencilZPassOpFront = cpy.stencilZPassOpFront;
        this.stencilWriteMaskFront = cpy.stencilWriteMaskFront;
        this.stencilFuncBack = cpy.stencilFuncBack;
        this.stencilRefBack = cpy.stencilRefBack;
        this.stencilMaskBack = cpy.stencilMaskBack;
        this.stencilFailOpBack = cpy.stencilFailOpBack;
        this.stencilZFailOpBack = cpy.stencilZFailOpBack;
        this.stencilZPassOpBack = cpy.stencilZPassOpBack;
        this.stencilWriteMaskBack = cpy.stencilWriteMaskBack;
        // cull-mode
        this.cullMode = cpy.cullMode;
        // primitive-type
        this.primitiveType = cpy.primitiveType;
        // buffer bindings
        this.maxStream = cpy.maxStream;
        for (let i = 0; i < cpy.vertexBuffers.length; ++i) {
            this.vertexBuffers[i] = cpy.vertexBuffers[i];
        }
        for (let i = 0; i < cpy.vertexBufferOffsets.length; ++i) {
            this.vertexBufferOffsets[i] = cpy.vertexBufferOffsets[i];
        }
        this.indexBuffer = cpy.indexBuffer;
        // texture bindings
        this.maxTextureSlot = cpy.maxTextureSlot;
        for (let i = 0; i < cpy.textureUnits.length; ++i) {
            this.textureUnits[i] = cpy.textureUnits[i];
        }
        this.program = cpy.program;
    }
}
exports.default = State;
