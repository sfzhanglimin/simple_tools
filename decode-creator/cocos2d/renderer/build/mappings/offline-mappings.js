"use strict";
// this file is used for offline effect building.
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
const enums_1 = require("../../gfx/enums");
const constants_1 = require("../../core/constants");
const murmurhash2_gc_1 = __importDefault(require("../../murmurhash2_gc"));
const gfx = __importStar(require("./gfx/define"));
const define_1 = require("./pipeline/define");
var SamplerInfoIndex;
(function (SamplerInfoIndex) {
    SamplerInfoIndex[SamplerInfoIndex["minFilter"] = 0] = "minFilter";
    SamplerInfoIndex[SamplerInfoIndex["magFilter"] = 1] = "magFilter";
    SamplerInfoIndex[SamplerInfoIndex["mipFilter"] = 2] = "mipFilter";
    SamplerInfoIndex[SamplerInfoIndex["addressU"] = 3] = "addressU";
    SamplerInfoIndex[SamplerInfoIndex["addressV"] = 4] = "addressV";
    SamplerInfoIndex[SamplerInfoIndex["addressW"] = 5] = "addressW";
    SamplerInfoIndex[SamplerInfoIndex["maxAnisotropy"] = 6] = "maxAnisotropy";
    SamplerInfoIndex[SamplerInfoIndex["cmpFunc"] = 7] = "cmpFunc";
    SamplerInfoIndex[SamplerInfoIndex["minLOD"] = 8] = "minLOD";
    SamplerInfoIndex[SamplerInfoIndex["maxLOD"] = 9] = "maxLOD";
    SamplerInfoIndex[SamplerInfoIndex["mipLODBias"] = 10] = "mipLODBias";
    SamplerInfoIndex[SamplerInfoIndex["borderColor"] = 11] = "borderColor";
    SamplerInfoIndex[SamplerInfoIndex["total"] = 15] = "total";
})(SamplerInfoIndex || (SamplerInfoIndex = {}));
let typeMap = {};
typeMap[typeMap['bool'] = gfx.GFXType.BOOL] = 'bool';
typeMap[typeMap['int'] = gfx.GFXType.INT] = 'int';
typeMap[typeMap['ivec2'] = gfx.GFXType.INT2] = 'ivec2invTypeParams';
typeMap[typeMap['ivec3'] = gfx.GFXType.INT3] = 'ivec3';
typeMap[typeMap['ivec4'] = gfx.GFXType.INT4] = 'ivec4';
typeMap[typeMap['float'] = gfx.GFXType.FLOAT] = 'float';
typeMap[typeMap['vec2'] = gfx.GFXType.FLOAT2] = 'vec2';
typeMap[typeMap['vec3'] = gfx.GFXType.FLOAT3] = 'vec3';
typeMap[typeMap['vec4'] = gfx.GFXType.FLOAT4] = 'vec4';
typeMap[typeMap['mat2'] = gfx.GFXType.MAT2] = 'mat2';
typeMap[typeMap['mat3'] = gfx.GFXType.MAT3] = 'mat3';
typeMap[typeMap['mat4'] = gfx.GFXType.MAT4] = 'mat4';
typeMap[typeMap['sampler2D'] = gfx.GFXType.SAMPLER2D] = 'sampler2D';
typeMap[typeMap['samplerCube'] = gfx.GFXType.SAMPLER_CUBE] = 'samplerCube';
const sizeMap = {
    [gfx.GFXType.BOOL]: 4,
    [gfx.GFXType.INT]: 4,
    [gfx.GFXType.INT2]: 8,
    [gfx.GFXType.INT3]: 12,
    [gfx.GFXType.INT4]: 16,
    [gfx.GFXType.FLOAT]: 4,
    [gfx.GFXType.FLOAT2]: 8,
    [gfx.GFXType.FLOAT3]: 12,
    [gfx.GFXType.FLOAT4]: 16,
    [gfx.GFXType.MAT2]: 16,
    [gfx.GFXType.MAT3]: 36,
    [gfx.GFXType.MAT4]: 64,
    [gfx.GFXType.SAMPLER2D]: 4,
    [gfx.GFXType.SAMPLER_CUBE]: 4,
};
const formatMap = {
    [gfx.GFXType.BOOL]: gfx.GFXFormat.R32I,
    [gfx.GFXType.INT]: gfx.GFXFormat.R32I,
    [gfx.GFXType.INT2]: gfx.GFXFormat.RG32I,
    [gfx.GFXType.INT3]: gfx.GFXFormat.RGB32I,
    [gfx.GFXType.INT4]: gfx.GFXFormat.RGBA32I,
    [gfx.GFXType.FLOAT]: gfx.GFXFormat.R32F,
    [gfx.GFXType.FLOAT2]: gfx.GFXFormat.RG32F,
    [gfx.GFXType.FLOAT3]: gfx.GFXFormat.RGB32F,
    [gfx.GFXType.FLOAT4]: gfx.GFXFormat.RGBA32F,
};
// const passParams = {
//   // color mask
//   NONE: gfx.GFXColorMask.NONE,
//   R: gfx.GFXColorMask.R,
//   G: gfx.GFXColorMask.G,
//   B: gfx.GFXColorMask.B,
//   A: gfx.GFXColorMask.A,
//   RG: gfx.GFXColorMask.R | gfx.GFXColorMask.G,
//   RB: gfx.GFXColorMask.R | gfx.GFXColorMask.B,
//   RA: gfx.GFXColorMask.R | gfx.GFXColorMask.A,
//   GB: gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   GA: gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   BA: gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   RGB: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.B,
//   RGA: gfx.GFXColorMask.R | gfx.GFXColorMask.G | gfx.GFXColorMask.A,
//   RBA: gfx.GFXColorMask.R | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   GBA: gfx.GFXColorMask.G | gfx.GFXColorMask.B | gfx.GFXColorMask.A,
//   ALL: gfx.GFXColorMask.ALL,
//   // blend operation
//   ADD: gfx.GFXBlendOp.ADD,
//   SUB: gfx.GFXBlendOp.SUB,
//   REV_SUB: gfx.GFXBlendOp.REV_SUB,
//   MIN: gfx.GFXBlendOp.MIN,
//   MAX: gfx.GFXBlendOp.MAX,
//   // blend factor
//   ZERO: gfx.GFXBlendFactor.ZERO,
//   ONE: gfx.GFXBlendFactor.ONE,
//   SRC_ALPHA: gfx.GFXBlendFactor.SRC_ALPHA,
//   DST_ALPHA: gfx.GFXBlendFactor.DST_ALPHA,
//   ONE_MINUS_SRC_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_SRC_ALPHA,
//   ONE_MINUS_DST_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_DST_ALPHA,
//   SRC_COLOR: gfx.GFXBlendFactor.SRC_COLOR,
//   DST_COLOR: gfx.GFXBlendFactor.DST_COLOR,
//   ONE_MINUS_SRC_COLOR: gfx.GFXBlendFactor.ONE_MINUS_SRC_COLOR,
//   ONE_MINUS_DST_COLOR: gfx.GFXBlendFactor.ONE_MINUS_DST_COLOR,
//   SRC_ALPHA_SATURATE: gfx.GFXBlendFactor.SRC_ALPHA_SATURATE,
//   CONSTANT_COLOR: gfx.GFXBlendFactor.CONSTANT_COLOR,
//   ONE_MINUS_CONSTANT_COLOR: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_COLOR,
//   CONSTANT_ALPHA: gfx.GFXBlendFactor.CONSTANT_ALPHA,
//   ONE_MINUS_CONSTANT_ALPHA: gfx.GFXBlendFactor.ONE_MINUS_CONSTANT_ALPHA,
//   // stencil operation
//   // ZERO: GFXStencilOp.ZERO, // duplicate, safely removed because enum value is(and always will be) the same
//   KEEP: gfx.GFXStencilOp.KEEP,
//   REPLACE: gfx.GFXStencilOp.REPLACE,
//   INCR: gfx.GFXStencilOp.INCR,
//   DECR: gfx.GFXStencilOp.DECR,
//   INVERT: gfx.GFXStencilOp.INVERT,
//   INCR_WRAP: gfx.GFXStencilOp.INCR_WRAP,
//   DECR_WRAP: gfx.GFXStencilOp.DECR_WRAP,
//     // comparison function
//   NEVER: gfx.GFXComparisonFunc.NEVER,
//   LESS: gfx.GFXComparisonFunc.LESS,
//   EQUAL: gfx.GFXComparisonFunc.EQUAL,
//   LESS_EQUAL: gfx.GFXComparisonFunc.LESS_EQUAL,
//   GREATER: gfx.GFXComparisonFunc.GREATER,
//   NOT_EQUAL: gfx.GFXComparisonFunc.NOT_EQUAL,
//   GREATER_EQUAL: gfx.GFXComparisonFunc.GREATER_EQUAL,
//   ALWAYS: gfx.GFXComparisonFunc.ALWAYS,
//   // cull mode
//   // NONE: GFXCullMode.NONE, // duplicate, safely removed because enum value is(and always will be) the same
//   FRONT: gfx.GFXCullMode.FRONT,
//   BACK: gfx.GFXCullMode.BACK,
//   // shade mode
//   GOURAND: gfx.GFXShadeModel.GOURAND,
//   FLAT: gfx.GFXShadeModel.FLAT,
//   // polygon mode
//   FILL: gfx.GFXPolygonMode.FILL,
//   LINE: gfx.GFXPolygonMode.LINE,
//   POINT: gfx.GFXPolygonMode.POINT,
//   // primitive mode
//   POINT_LIST: gfx.GFXPrimitiveMode.POINT_LIST,
//   LINE_LIST: gfx.GFXPrimitiveMode.LINE_LIST,
//   LINE_STRIP: gfx.GFXPrimitiveMode.LINE_STRIP,
//   LINE_LOOP: gfx.GFXPrimitiveMode.LINE_LOOP,
//   TRIANGLE_LIST: gfx.GFXPrimitiveMode.TRIANGLE_LIST,
//   TRIANGLE_STRIP: gfx.GFXPrimitiveMode.TRIANGLE_STRIP,
//   TRIANGLE_FAN: gfx.GFXPrimitiveMode.TRIANGLE_FAN,
//   LINE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.LINE_LIST_ADJACENCY,
//   LINE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.LINE_STRIP_ADJACENCY,
//   TRIANGLE_LIST_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_LIST_ADJACENCY,
//   TRIANGLE_STRIP_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_STRIP_ADJACENCY,
//   TRIANGLE_PATCH_ADJACENCY: gfx.GFXPrimitiveMode.TRIANGLE_PATCH_ADJACENCY,
//   QUAD_PATCH_LIST: gfx.GFXPrimitiveMode.QUAD_PATCH_LIST,
//   ISO_LINE_LIST: gfx.GFXPrimitiveMode.ISO_LINE_LIST,
//   // POINT: gfx.GFXFilter.POINT, // duplicate, safely removed because enum value is(and always will be) the same
//   LINEAR: gfx.GFXFilter.LINEAR,
//   ANISOTROPIC: gfx.GFXFilter.ANISOTROPIC,
//   WRAP: gfx.GFXAddress.WRAP,
//   MIRROR: gfx.GFXAddress.MIRROR,
//   CLAMP: gfx.GFXAddress.CLAMP,
//   BORDER: gfx.GFXAddress.BORDER,
//   VIEWPORT: gfx.GFXDynamicState.VIEWPORT,
//   SCISSOR: gfx.GFXDynamicState.SCISSOR,
//   LINE_WIDTH: gfx.GFXDynamicState.LINE_WIDTH,
//   DEPTH_BIAS: gfx.GFXDynamicState.DEPTH_BIAS,
//   BLEND_CONSTANTS: gfx.GFXDynamicState.BLEND_CONSTANTS,
//   DEPTH_BOUNDS: gfx.GFXDynamicState.DEPTH_BOUNDS,
//   STENCIL_WRITE_MASK: gfx.GFXDynamicState.STENCIL_WRITE_MASK,
//   STENCIL_COMPARE_MASK: gfx.GFXDynamicState.STENCIL_COMPARE_MASK,
//   TRUE: true,
//   FALSE: false
// };
const passParams = {
    BACK: enums_1.enums.CULL_BACK,
    FRONT: enums_1.enums.CULL_FRONT,
    NONE: enums_1.enums.CULL_NONE,
    ADD: enums_1.enums.BLEND_FUNC_ADD,
    SUB: enums_1.enums.BLEND_FUNC_SUBTRACT,
    REV_SUB: enums_1.enums.BLEND_FUNC_REVERSE_SUBTRACT,
    ZERO: enums_1.enums.BLEND_ZERO,
    ONE: enums_1.enums.BLEND_ONE,
    SRC_COLOR: enums_1.enums.BLEND_SRC_COLOR,
    ONE_MINUS_SRC_COLOR: enums_1.enums.BLEND_ONE_MINUS_SRC_COLOR,
    DST_COLOR: enums_1.enums.BLEND_DST_COLOR,
    ONE_MINUS_DST_COLOR: enums_1.enums.BLEND_ONE_MINUS_DST_COLOR,
    SRC_ALPHA: enums_1.enums.BLEND_SRC_ALPHA,
    ONE_MINUS_SRC_ALPHA: enums_1.enums.BLEND_ONE_MINUS_SRC_ALPHA,
    DST_ALPHA: enums_1.enums.BLEND_DST_ALPHA,
    ONE_MINUS_DST_ALPHA: enums_1.enums.BLEND_ONE_MINUS_DST_ALPHA,
    CONSTANT_COLOR: enums_1.enums.BLEND_CONSTANT_COLOR,
    ONE_MINUS_CONSTANT_COLOR: enums_1.enums.BLEND_ONE_MINUS_CONSTANT_COLOR,
    CONSTANT_ALPHA: enums_1.enums.BLEND_CONSTANT_ALPHA,
    ONE_MINUS_CONSTANT_ALPHA: enums_1.enums.BLEND_ONE_MINUS_CONSTANT_ALPHA,
    SRC_ALPHA_SATURATE: enums_1.enums.BLEND_SRC_ALPHA_SATURATE,
    NEVER: enums_1.enums.DS_FUNC_NEVER,
    LESS: enums_1.enums.DS_FUNC_LESS,
    EQUAL: enums_1.enums.DS_FUNC_EQUAL,
    LEQUAL: enums_1.enums.DS_FUNC_LEQUAL,
    GREATER: enums_1.enums.DS_FUNC_GREATER,
    NOTEQUAL: enums_1.enums.DS_FUNC_NOTEQUAL,
    GEQUAL: enums_1.enums.DS_FUNC_GEQUAL,
    ALWAYS: enums_1.enums.DS_FUNC_ALWAYS,
    KEEP: enums_1.enums.STENCIL_OP_KEEP,
    REPLACE: enums_1.enums.STENCIL_OP_REPLACE,
    INCR: enums_1.enums.STENCIL_OP_INCR,
    INCR_WRAP: enums_1.enums.STENCIL_OP_INCR_WRAP,
    DECR: enums_1.enums.STENCIL_OP_DECR,
    DECR_WRAP: enums_1.enums.STENCIL_OP_DECR_WRAP,
    INVERT: enums_1.enums.STENCIL_OP_INVERT
};
Object.assign(passParams, define_1.RenderPassStage);
// for structural type checking
// an 'any' key will check against all elements defined in that object
// a key start with '$' means its essential, and can't be undefined
const effectStructure = {
    $techniques: [
        {
            $passes: [
                {
                    depthStencilState: {},
                    rasterizerState: {},
                    blendState: { targets: [{}] },
                    properties: { any: { sampler: {}, inspector: {} } }
                }
            ]
        }
    ]
};
let mappings = {
    murmurhash2_32_gc: murmurhash2_gc_1.default,
    SamplerInfoIndex,
    effectStructure,
    typeMap,
    sizeMap,
    formatMap,
    passParams,
    RenderQueue: constants_1.RenderQueue,
    RenderPriority: define_1.RenderPriority,
    GFXGetTypeSize: gfx.GFXGetTypeSize,
    UniformBinding: define_1.UniformBinding
};
exports.default = mappings;
