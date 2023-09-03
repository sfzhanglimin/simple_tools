"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInspectorProps = exports.getClassName = exports.getInstanceCtor = exports.getInstanceType = exports.enums2default = exports.ctor2enums = void 0;
const enums_1 = __importDefault(require("./enums"));
const value_types_1 = require("../core/value-types");
const CCTexture2D_1 = __importDefault(require("../core/assets/CCTexture2D"));
let gfxTexture2D = null, gfxTextureCube = null;
if (CC_JSB && CC_NATIVERENDERER) {
    gfxTexture2D = gfx.Texture2D;
}
else {
    gfxTexture2D = require('./gfx/texture-2d');
}
const CCObject = cc.Object;
let ctor2default = {
    [Boolean]: v => v || false,
    [Number]: v => v ? (ArrayBuffer.isView(v) ? v[0] : v) : 0,
    [value_types_1.Vec2]: v => v ? cc.v2(v[0], v[1]) : cc.v2(),
    [value_types_1.Vec3]: v => v ? cc.v3(v[0], v[1], v[2]) : cc.v3(),
    [value_types_1.Vec4]: v => v ? cc.v4(v[0], v[1], v[2], v[3]) : cc.v4(),
    [value_types_1.Color]: v => v ? cc.color(v[0] * 255, v[1] * 255, v[2] * 255, (v[3] || 1) * 255) : cc.color(),
    [value_types_1.Mat4]: v => v ? cc.mat4(v[0], v[1], v[2], v[3], v[4], v[5], v[6], v[7], v[8], v[9], v[10], v[11], v[12], v[13], v[14], v[15]) : cc.mat4(),
    [CCTexture2D_1.default]: () => null,
    [CCObject]: () => null
};
let enums2ctor = {
    [enums_1.default.PARAM_INT]: Number,
    [enums_1.default.PARAM_INT2]: value_types_1.Vec2,
    [enums_1.default.PARAM_INT3]: value_types_1.Vec3,
    [enums_1.default.PARAM_INT4]: value_types_1.Vec4,
    [enums_1.default.PARAM_FLOAT]: Number,
    [enums_1.default.PARAM_FLOAT2]: value_types_1.Vec2,
    [enums_1.default.PARAM_FLOAT3]: value_types_1.Vec3,
    [enums_1.default.PARAM_FLOAT4]: value_types_1.Vec4,
    [enums_1.default.PARAM_MAT4]: value_types_1.Mat4,
    [enums_1.default.PARAM_TEXTURE_2D]: CCTexture2D_1.default,
    color: value_types_1.Color,
    number: Number,
    boolean: Boolean,
    default: CCObject
};
exports.ctor2enums = {
    [Number]: enums_1.default.PARAM_FLOAT,
    [value_types_1.Vec2]: enums_1.default.PARAM_FLOAT2,
    [value_types_1.Vec3]: enums_1.default.PARAM_FLOAT3,
    [value_types_1.Vec4]: enums_1.default.PARAM_FLOAT4,
    [value_types_1.Color]: enums_1.default.PARAM_COLOR3,
    [value_types_1.Color]: enums_1.default.PARAM_COLOR4,
    [value_types_1.Mat4]: enums_1.default.PARAM_MAT4,
    [CCTexture2D_1.default]: enums_1.default.PARAM_TEXTURE_2D,
    [gfxTexture2D]: enums_1.default.PARAM_TEXTURE_2D,
};
exports.enums2default = {
    [enums_1.default.PARAM_INT]: new Uint32Array([0]),
    [enums_1.default.PARAM_INT2]: new Uint32Array([0, 0]),
    [enums_1.default.PARAM_INT3]: new Uint32Array([0, 0, 0]),
    [enums_1.default.PARAM_INT4]: new Uint32Array([0, 0, 0, 0]),
    [enums_1.default.PARAM_FLOAT]: new Float32Array([0]),
    [enums_1.default.PARAM_FLOAT2]: new Float32Array([0, 0]),
    [enums_1.default.PARAM_FLOAT3]: new Float32Array([0, 0, 0]),
    [enums_1.default.PARAM_FLOAT4]: new Float32Array([0, 0, 0, 0]),
    [enums_1.default.PARAM_MAT4]: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    [enums_1.default.PARAM_TEXTURE_2D]: null,
    number: 0,
    boolean: false,
};
let getInstanceType = function (t) {
    return enums2ctor[t] || enums2ctor.default;
};
exports.getInstanceType = getInstanceType;
let getInstanceCtor = function (t) {
    return ctor2default[(0, exports.getInstanceType)(t)];
};
exports.getInstanceCtor = getInstanceCtor;
let getClassName = function (t) {
    return cc.js.getClassName((0, exports.getInstanceType)(t));
};
exports.getClassName = getClassName;
let className2InspectorName = {
    Number: 'number',
    Boolean: 'boolean'
};
function getInspectorProps(prop) {
    let editor = {
        type: prop.type
    };
    Object.assign(editor, prop.editor || prop.inspector);
    editor.defines = prop.defines;
    editor.value = (0, exports.getInstanceCtor)(editor.type)(prop.value);
    if (prop.range) {
        editor.range = prop.range;
    }
    let className = (0, exports.getClassName)(editor.type);
    editor.typeName = className2InspectorName[className] || className;
    editor.valueCtor = enums2ctor[editor.type];
    if (editor.typeName == 'cc.Texture2D') {
        editor.typeName = 'cc.Asset';
        editor.assetType = 'cc.Texture2D';
    }
    return editor;
}
exports.getInspectorProps = getInspectorProps;
;
