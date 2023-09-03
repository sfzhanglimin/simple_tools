"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GFXGetTypeSize = exports.GFXFormatSurfaceSize = exports.GFXFormatSize = exports.GFXFormatInfos = exports.GFXBufferTextureCopy = exports.GFXTextureCopy = exports.GFXTextureSubres = exports.GFXClearFlag = exports.GFXQueueType = exports.GFXStencilFace = exports.GFXDynamicState = exports.GFXPipelineBindPoint = exports.GFXTextureLayout = exports.GFXStoreOp = exports.GFXLoadOp = exports.GFXCommandBufferType = exports.GFXBindingType = exports.GFXShaderType = exports.GFXTextureViewType = exports.GFXTextureFlagBit = exports.GFXSampleCount = exports.GFXTextureUsageBit = exports.GFXTextureType = exports.GFXAddress = exports.GFXFilter = exports.GFXColorMask = exports.GFXBlendFactor = exports.GFXBlendOp = exports.GFXStencilOp = exports.GFXComparisonFunc = exports.GFXCullMode = exports.GFXShadeModel = exports.GFXPolygonMode = exports.GFXPrimitiveMode = exports.GFXBufferAccessBit = exports.GFXMemoryUsageBit = exports.GFXBufferUsageBit = exports.GFXFormat = exports.GFXType = exports.GFXAttributeName = exports.GFXObject = exports.GFXStatus = exports.GFXObjectType = exports.GFX_MAX_BUFFER_BINDINGS = exports.GFX_MAX_ATTACHMENTS = exports.GFX_MAX_TEXTURE_UNITS = exports.GFX_MAX_VERTEX_ATTRIBUTES = exports.WebGLEXT = void 0;
// Extensions
var WebGLEXT;
(function (WebGLEXT) {
    WebGLEXT[WebGLEXT["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_SRGB_S3TC_DXT1_EXT"] = 35916] = "COMPRESSED_SRGB_S3TC_DXT1_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT"] = 35917] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT"] = 35918] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT"] = 35919] = "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT";
    WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
    WebGLEXT[WebGLEXT["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
    WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
    WebGLEXT[WebGLEXT["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
    WebGLEXT[WebGLEXT["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
})(WebGLEXT || (exports.WebGLEXT = WebGLEXT = {}));
exports.GFX_MAX_VERTEX_ATTRIBUTES = 16;
exports.GFX_MAX_TEXTURE_UNITS = 16;
exports.GFX_MAX_ATTACHMENTS = 4;
exports.GFX_MAX_BUFFER_BINDINGS = 24;
var GFXObjectType;
(function (GFXObjectType) {
    GFXObjectType[GFXObjectType["UNKNOWN"] = 0] = "UNKNOWN";
    GFXObjectType[GFXObjectType["BUFFER"] = 1] = "BUFFER";
    GFXObjectType[GFXObjectType["TEXTURE"] = 2] = "TEXTURE";
    GFXObjectType[GFXObjectType["TEXTURE_VIEW"] = 3] = "TEXTURE_VIEW";
    GFXObjectType[GFXObjectType["RENDER_PASS"] = 4] = "RENDER_PASS";
    GFXObjectType[GFXObjectType["FRAMEBUFFER"] = 5] = "FRAMEBUFFER";
    GFXObjectType[GFXObjectType["SAMPLER"] = 6] = "SAMPLER";
    GFXObjectType[GFXObjectType["SHADER"] = 7] = "SHADER";
    GFXObjectType[GFXObjectType["PIPELINE_LAYOUT"] = 8] = "PIPELINE_LAYOUT";
    GFXObjectType[GFXObjectType["PIPELINE_STATE"] = 9] = "PIPELINE_STATE";
    GFXObjectType[GFXObjectType["BINDING_LAYOUT"] = 10] = "BINDING_LAYOUT";
    GFXObjectType[GFXObjectType["INPUT_ASSEMBLER"] = 11] = "INPUT_ASSEMBLER";
    GFXObjectType[GFXObjectType["COMMAND_ALLOCATOR"] = 12] = "COMMAND_ALLOCATOR";
    GFXObjectType[GFXObjectType["COMMAND_BUFFER"] = 13] = "COMMAND_BUFFER";
    GFXObjectType[GFXObjectType["QUEUE"] = 14] = "QUEUE";
    GFXObjectType[GFXObjectType["WINDOW"] = 15] = "WINDOW";
})(GFXObjectType || (exports.GFXObjectType = GFXObjectType = {}));
var GFXStatus;
(function (GFXStatus) {
    GFXStatus[GFXStatus["UNREADY"] = 0] = "UNREADY";
    GFXStatus[GFXStatus["FAILED"] = 1] = "FAILED";
    GFXStatus[GFXStatus["SUCCESS"] = 2] = "SUCCESS";
})(GFXStatus || (exports.GFXStatus = GFXStatus = {}));
class GFXObject {
    get gfxType() {
        return this._gfxType;
    }
    get status() {
        return this._status;
    }
    constructor(gfxType) {
        this._gfxType = GFXObjectType.UNKNOWN;
        this._status = GFXStatus.UNREADY;
        this._gfxType = gfxType;
    }
}
exports.GFXObject = GFXObject;
var GFXAttributeName;
(function (GFXAttributeName) {
    GFXAttributeName["ATTR_POSITION"] = "a_position";
    GFXAttributeName["ATTR_NORMAL"] = "a_normal";
    GFXAttributeName["ATTR_TANGENT"] = "a_tangent";
    GFXAttributeName["ATTR_BITANGENT"] = "a_bitangent";
    GFXAttributeName["ATTR_WEIGHTS"] = "a_weights";
    GFXAttributeName["ATTR_JOINTS"] = "a_joints";
    GFXAttributeName["ATTR_COLOR"] = "a_color";
    GFXAttributeName["ATTR_COLOR1"] = "a_color1";
    GFXAttributeName["ATTR_COLOR2"] = "a_color2";
    GFXAttributeName["ATTR_TEX_COORD"] = "a_texCoord";
    GFXAttributeName["ATTR_TEX_COORD1"] = "a_texCoord1";
    GFXAttributeName["ATTR_TEX_COORD2"] = "a_texCoord2";
    GFXAttributeName["ATTR_TEX_COORD3"] = "a_texCoord3";
    GFXAttributeName["ATTR_TEX_COORD4"] = "a_texCoord4";
    GFXAttributeName["ATTR_TEX_COORD5"] = "a_texCoord5";
    GFXAttributeName["ATTR_TEX_COORD6"] = "a_texCoord6";
    GFXAttributeName["ATTR_TEX_COORD7"] = "a_texCoord7";
    GFXAttributeName["ATTR_TEX_COORD8"] = "a_texCoord8";
})(GFXAttributeName || (exports.GFXAttributeName = GFXAttributeName = {}));
var GFXType;
(function (GFXType) {
    GFXType[GFXType["UNKNOWN"] = 0] = "UNKNOWN";
    GFXType[GFXType["BOOL"] = 1] = "BOOL";
    GFXType[GFXType["BOOL2"] = 2] = "BOOL2";
    GFXType[GFXType["BOOL3"] = 3] = "BOOL3";
    GFXType[GFXType["BOOL4"] = 4] = "BOOL4";
    GFXType[GFXType["INT"] = 5] = "INT";
    GFXType[GFXType["INT2"] = 6] = "INT2";
    GFXType[GFXType["INT3"] = 7] = "INT3";
    GFXType[GFXType["INT4"] = 8] = "INT4";
    GFXType[GFXType["UINT"] = 9] = "UINT";
    GFXType[GFXType["UINT2"] = 10] = "UINT2";
    GFXType[GFXType["UINT3"] = 11] = "UINT3";
    GFXType[GFXType["UINT4"] = 12] = "UINT4";
    GFXType[GFXType["FLOAT"] = 13] = "FLOAT";
    GFXType[GFXType["FLOAT2"] = 14] = "FLOAT2";
    GFXType[GFXType["FLOAT3"] = 15] = "FLOAT3";
    GFXType[GFXType["FLOAT4"] = 16] = "FLOAT4";
    GFXType[GFXType["COLOR4"] = 17] = "COLOR4";
    GFXType[GFXType["MAT2"] = 18] = "MAT2";
    GFXType[GFXType["MAT2X3"] = 19] = "MAT2X3";
    GFXType[GFXType["MAT2X4"] = 20] = "MAT2X4";
    GFXType[GFXType["MAT3X2"] = 21] = "MAT3X2";
    GFXType[GFXType["MAT3"] = 22] = "MAT3";
    GFXType[GFXType["MAT3X4"] = 23] = "MAT3X4";
    GFXType[GFXType["MAT4X2"] = 24] = "MAT4X2";
    GFXType[GFXType["MAT4X3"] = 25] = "MAT4X3";
    GFXType[GFXType["MAT4"] = 26] = "MAT4";
    GFXType[GFXType["SAMPLER1D"] = 27] = "SAMPLER1D";
    GFXType[GFXType["SAMPLER1D_ARRAY"] = 28] = "SAMPLER1D_ARRAY";
    GFXType[GFXType["SAMPLER2D"] = 29] = "SAMPLER2D";
    GFXType[GFXType["SAMPLER2D_ARRAY"] = 30] = "SAMPLER2D_ARRAY";
    GFXType[GFXType["SAMPLER3D"] = 31] = "SAMPLER3D";
    GFXType[GFXType["SAMPLER_CUBE"] = 32] = "SAMPLER_CUBE";
    GFXType[GFXType["COUNT"] = 33] = "COUNT";
})(GFXType || (exports.GFXType = GFXType = {}));
var GFXFormat;
(function (GFXFormat) {
    GFXFormat[GFXFormat["UNKNOWN"] = 0] = "UNKNOWN";
    GFXFormat[GFXFormat["A8"] = 1] = "A8";
    GFXFormat[GFXFormat["L8"] = 2] = "L8";
    GFXFormat[GFXFormat["LA8"] = 3] = "LA8";
    GFXFormat[GFXFormat["R8"] = 4] = "R8";
    GFXFormat[GFXFormat["R8SN"] = 5] = "R8SN";
    GFXFormat[GFXFormat["R8UI"] = 6] = "R8UI";
    GFXFormat[GFXFormat["R8I"] = 7] = "R8I";
    GFXFormat[GFXFormat["R16F"] = 8] = "R16F";
    GFXFormat[GFXFormat["R16UI"] = 9] = "R16UI";
    GFXFormat[GFXFormat["R16I"] = 10] = "R16I";
    GFXFormat[GFXFormat["R32F"] = 11] = "R32F";
    GFXFormat[GFXFormat["R32UI"] = 12] = "R32UI";
    GFXFormat[GFXFormat["R32I"] = 13] = "R32I";
    GFXFormat[GFXFormat["RG8"] = 14] = "RG8";
    GFXFormat[GFXFormat["RG8SN"] = 15] = "RG8SN";
    GFXFormat[GFXFormat["RG8UI"] = 16] = "RG8UI";
    GFXFormat[GFXFormat["RG8I"] = 17] = "RG8I";
    GFXFormat[GFXFormat["RG16F"] = 18] = "RG16F";
    GFXFormat[GFXFormat["RG16UI"] = 19] = "RG16UI";
    GFXFormat[GFXFormat["RG16I"] = 20] = "RG16I";
    GFXFormat[GFXFormat["RG32F"] = 21] = "RG32F";
    GFXFormat[GFXFormat["RG32UI"] = 22] = "RG32UI";
    GFXFormat[GFXFormat["RG32I"] = 23] = "RG32I";
    GFXFormat[GFXFormat["RGB8"] = 24] = "RGB8";
    GFXFormat[GFXFormat["SRGB8"] = 25] = "SRGB8";
    GFXFormat[GFXFormat["RGB8SN"] = 26] = "RGB8SN";
    GFXFormat[GFXFormat["RGB8UI"] = 27] = "RGB8UI";
    GFXFormat[GFXFormat["RGB8I"] = 28] = "RGB8I";
    GFXFormat[GFXFormat["RGB16F"] = 29] = "RGB16F";
    GFXFormat[GFXFormat["RGB16UI"] = 30] = "RGB16UI";
    GFXFormat[GFXFormat["RGB16I"] = 31] = "RGB16I";
    GFXFormat[GFXFormat["RGB32F"] = 32] = "RGB32F";
    GFXFormat[GFXFormat["RGB32UI"] = 33] = "RGB32UI";
    GFXFormat[GFXFormat["RGB32I"] = 34] = "RGB32I";
    GFXFormat[GFXFormat["RGBA8"] = 35] = "RGBA8";
    GFXFormat[GFXFormat["SRGB8_A8"] = 36] = "SRGB8_A8";
    GFXFormat[GFXFormat["RGBA8SN"] = 37] = "RGBA8SN";
    GFXFormat[GFXFormat["RGBA8UI"] = 38] = "RGBA8UI";
    GFXFormat[GFXFormat["RGBA8I"] = 39] = "RGBA8I";
    GFXFormat[GFXFormat["RGBA16F"] = 40] = "RGBA16F";
    GFXFormat[GFXFormat["RGBA16UI"] = 41] = "RGBA16UI";
    GFXFormat[GFXFormat["RGBA16I"] = 42] = "RGBA16I";
    GFXFormat[GFXFormat["RGBA32F"] = 43] = "RGBA32F";
    GFXFormat[GFXFormat["RGBA32UI"] = 44] = "RGBA32UI";
    GFXFormat[GFXFormat["RGBA32I"] = 45] = "RGBA32I";
    // Special Format
    GFXFormat[GFXFormat["R5G6B5"] = 46] = "R5G6B5";
    GFXFormat[GFXFormat["R11G11B10F"] = 47] = "R11G11B10F";
    GFXFormat[GFXFormat["RGB5A1"] = 48] = "RGB5A1";
    GFXFormat[GFXFormat["RGBA4"] = 49] = "RGBA4";
    GFXFormat[GFXFormat["RGB10A2"] = 50] = "RGB10A2";
    GFXFormat[GFXFormat["RGB10A2UI"] = 51] = "RGB10A2UI";
    GFXFormat[GFXFormat["RGB9E5"] = 52] = "RGB9E5";
    // Depth-Stencil Format
    GFXFormat[GFXFormat["D16"] = 53] = "D16";
    GFXFormat[GFXFormat["D16S8"] = 54] = "D16S8";
    GFXFormat[GFXFormat["D24"] = 55] = "D24";
    GFXFormat[GFXFormat["D24S8"] = 56] = "D24S8";
    GFXFormat[GFXFormat["D32F"] = 57] = "D32F";
    GFXFormat[GFXFormat["D32F_S8"] = 58] = "D32F_S8";
    // Compressed Format
    // Block Compression Format, DDS (DirectDraw Surface)
    // DXT1: 3 channels (5:6:5), 1/8 origianl size, with 0 or 1 bit of alpha
    GFXFormat[GFXFormat["BC1"] = 59] = "BC1";
    GFXFormat[GFXFormat["BC1_ALPHA"] = 60] = "BC1_ALPHA";
    GFXFormat[GFXFormat["BC1_SRGB"] = 61] = "BC1_SRGB";
    GFXFormat[GFXFormat["BC1_SRGB_ALPHA"] = 62] = "BC1_SRGB_ALPHA";
    // DXT3: 4 channels (5:6:5), 1/4 origianl size, with 4 bits of alpha
    GFXFormat[GFXFormat["BC2"] = 63] = "BC2";
    GFXFormat[GFXFormat["BC2_SRGB"] = 64] = "BC2_SRGB";
    // DXT5: 4 channels (5:6:5), 1/4 origianl size, with 8 bits of alpha
    GFXFormat[GFXFormat["BC3"] = 65] = "BC3";
    GFXFormat[GFXFormat["BC3_SRGB"] = 66] = "BC3_SRGB";
    // 1 channel (8), 1/4 origianl size
    GFXFormat[GFXFormat["BC4"] = 67] = "BC4";
    GFXFormat[GFXFormat["BC4_SNORM"] = 68] = "BC4_SNORM";
    // 2 channels (8:8), 1/2 origianl size
    GFXFormat[GFXFormat["BC5"] = 69] = "BC5";
    GFXFormat[GFXFormat["BC5_SNORM"] = 70] = "BC5_SNORM";
    // 3 channels (16:16:16), half-floating point, 1/6 origianl size
    // UF16: unsigned float, 5 exponent bits + 11 mantissa bits
    // SF16: signed float, 1 signed bit + 5 exponent bits + 10 mantissa bits
    GFXFormat[GFXFormat["BC6H_UF16"] = 71] = "BC6H_UF16";
    GFXFormat[GFXFormat["BC6H_SF16"] = 72] = "BC6H_SF16";
    // 4 channels (4~7 bits per channel) with 0 to 8 bits of alpha, 1/3 original size
    GFXFormat[GFXFormat["BC7"] = 73] = "BC7";
    GFXFormat[GFXFormat["BC7_SRGB"] = 74] = "BC7_SRGB";
    // Ericsson Texture Compression Format
    GFXFormat[GFXFormat["ETC_RGB8"] = 75] = "ETC_RGB8";
    GFXFormat[GFXFormat["ETC2_RGB8"] = 76] = "ETC2_RGB8";
    GFXFormat[GFXFormat["ETC2_SRGB8"] = 77] = "ETC2_SRGB8";
    GFXFormat[GFXFormat["ETC2_RGB8_A1"] = 78] = "ETC2_RGB8_A1";
    GFXFormat[GFXFormat["ETC2_SRGB8_A1"] = 79] = "ETC2_SRGB8_A1";
    GFXFormat[GFXFormat["ETC2_RGBA8"] = 80] = "ETC2_RGBA8";
    GFXFormat[GFXFormat["ETC2_SRGB8_A8"] = 81] = "ETC2_SRGB8_A8";
    GFXFormat[GFXFormat["EAC_R11"] = 82] = "EAC_R11";
    GFXFormat[GFXFormat["EAC_R11SN"] = 83] = "EAC_R11SN";
    GFXFormat[GFXFormat["EAC_RG11"] = 84] = "EAC_RG11";
    GFXFormat[GFXFormat["EAC_RG11SN"] = 85] = "EAC_RG11SN";
    // PVRTC (PowerVR)
    GFXFormat[GFXFormat["PVRTC_RGB2"] = 86] = "PVRTC_RGB2";
    GFXFormat[GFXFormat["PVRTC_RGBA2"] = 87] = "PVRTC_RGBA2";
    GFXFormat[GFXFormat["PVRTC_RGB4"] = 88] = "PVRTC_RGB4";
    GFXFormat[GFXFormat["PVRTC_RGBA4"] = 89] = "PVRTC_RGBA4";
    GFXFormat[GFXFormat["PVRTC2_2BPP"] = 90] = "PVRTC2_2BPP";
    GFXFormat[GFXFormat["PVRTC2_4BPP"] = 91] = "PVRTC2_4BPP";
    // ASTC (Adaptive Scalable Texture Compression)
    GFXFormat[GFXFormat["ASTC_RGBA_4x4"] = 92] = "ASTC_RGBA_4x4";
    GFXFormat[GFXFormat["ASTC_RGBA_5x4"] = 93] = "ASTC_RGBA_5x4";
    GFXFormat[GFXFormat["ASTC_RGBA_5x5"] = 94] = "ASTC_RGBA_5x5";
    GFXFormat[GFXFormat["ASTC_RGBA_6x5"] = 95] = "ASTC_RGBA_6x5";
    GFXFormat[GFXFormat["ASTC_RGBA_6x6"] = 96] = "ASTC_RGBA_6x6";
    GFXFormat[GFXFormat["ASTC_RGBA_8x5"] = 97] = "ASTC_RGBA_8x5";
    GFXFormat[GFXFormat["ASTC_RGBA_8x6"] = 98] = "ASTC_RGBA_8x6";
    GFXFormat[GFXFormat["ASTC_RGBA_8x8"] = 99] = "ASTC_RGBA_8x8";
    GFXFormat[GFXFormat["ASTC_RGBA_10x5"] = 100] = "ASTC_RGBA_10x5";
    GFXFormat[GFXFormat["ASTC_RGBA_10x6"] = 101] = "ASTC_RGBA_10x6";
    GFXFormat[GFXFormat["ASTC_RGBA_10x8"] = 102] = "ASTC_RGBA_10x8";
    GFXFormat[GFXFormat["ASTC_RGBA_10x10"] = 103] = "ASTC_RGBA_10x10";
    GFXFormat[GFXFormat["ASTC_RGBA_12x10"] = 104] = "ASTC_RGBA_12x10";
    GFXFormat[GFXFormat["ASTC_RGBA_12x12"] = 105] = "ASTC_RGBA_12x12";
    // ASTC (Adaptive Scalable Texture Compression) SRGB
    GFXFormat[GFXFormat["ASTC_SRGBA_4x4"] = 106] = "ASTC_SRGBA_4x4";
    GFXFormat[GFXFormat["ASTC_SRGBA_5x4"] = 107] = "ASTC_SRGBA_5x4";
    GFXFormat[GFXFormat["ASTC_SRGBA_5x5"] = 108] = "ASTC_SRGBA_5x5";
    GFXFormat[GFXFormat["ASTC_SRGBA_6x5"] = 109] = "ASTC_SRGBA_6x5";
    GFXFormat[GFXFormat["ASTC_SRGBA_6x6"] = 110] = "ASTC_SRGBA_6x6";
    GFXFormat[GFXFormat["ASTC_SRGBA_8x5"] = 111] = "ASTC_SRGBA_8x5";
    GFXFormat[GFXFormat["ASTC_SRGBA_8x6"] = 112] = "ASTC_SRGBA_8x6";
    GFXFormat[GFXFormat["ASTC_SRGBA_8x8"] = 113] = "ASTC_SRGBA_8x8";
    GFXFormat[GFXFormat["ASTC_SRGBA_10x5"] = 114] = "ASTC_SRGBA_10x5";
    GFXFormat[GFXFormat["ASTC_SRGBA_10x6"] = 115] = "ASTC_SRGBA_10x6";
    GFXFormat[GFXFormat["ASTC_SRGBA_10x8"] = 116] = "ASTC_SRGBA_10x8";
    GFXFormat[GFXFormat["ASTC_SRGBA_10x10"] = 117] = "ASTC_SRGBA_10x10";
    GFXFormat[GFXFormat["ASTC_SRGBA_12x10"] = 118] = "ASTC_SRGBA_12x10";
    GFXFormat[GFXFormat["ASTC_SRGBA_12x12"] = 119] = "ASTC_SRGBA_12x12";
})(GFXFormat || (exports.GFXFormat = GFXFormat = {}));
var GFXBufferUsageBit;
(function (GFXBufferUsageBit) {
    GFXBufferUsageBit[GFXBufferUsageBit["NONE"] = 0] = "NONE";
    GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
    GFXBufferUsageBit[GFXBufferUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
    GFXBufferUsageBit[GFXBufferUsageBit["INDEX"] = 4] = "INDEX";
    GFXBufferUsageBit[GFXBufferUsageBit["VERTEX"] = 8] = "VERTEX";
    GFXBufferUsageBit[GFXBufferUsageBit["UNIFORM"] = 16] = "UNIFORM";
    GFXBufferUsageBit[GFXBufferUsageBit["STORAGE"] = 32] = "STORAGE";
    GFXBufferUsageBit[GFXBufferUsageBit["INDIRECT"] = 64] = "INDIRECT";
})(GFXBufferUsageBit || (exports.GFXBufferUsageBit = GFXBufferUsageBit = {}));
var GFXMemoryUsageBit;
(function (GFXMemoryUsageBit) {
    GFXMemoryUsageBit[GFXMemoryUsageBit["NONE"] = 0] = "NONE";
    GFXMemoryUsageBit[GFXMemoryUsageBit["DEVICE"] = 1] = "DEVICE";
    GFXMemoryUsageBit[GFXMemoryUsageBit["HOST"] = 2] = "HOST";
})(GFXMemoryUsageBit || (exports.GFXMemoryUsageBit = GFXMemoryUsageBit = {}));
var GFXBufferAccessBit;
(function (GFXBufferAccessBit) {
    GFXBufferAccessBit[GFXBufferAccessBit["NONE"] = 0] = "NONE";
    GFXBufferAccessBit[GFXBufferAccessBit["READ"] = 1] = "READ";
    GFXBufferAccessBit[GFXBufferAccessBit["WRITE"] = 2] = "WRITE";
})(GFXBufferAccessBit || (exports.GFXBufferAccessBit = GFXBufferAccessBit = {}));
var GFXPrimitiveMode;
(function (GFXPrimitiveMode) {
    GFXPrimitiveMode[GFXPrimitiveMode["POINT_LIST"] = 0] = "POINT_LIST";
    GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST"] = 1] = "LINE_LIST";
    GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP"] = 2] = "LINE_STRIP";
    GFXPrimitiveMode[GFXPrimitiveMode["LINE_LOOP"] = 3] = "LINE_LOOP";
    GFXPrimitiveMode[GFXPrimitiveMode["LINE_LIST_ADJACENCY"] = 4] = "LINE_LIST_ADJACENCY";
    GFXPrimitiveMode[GFXPrimitiveMode["LINE_STRIP_ADJACENCY"] = 5] = "LINE_STRIP_ADJACENCY";
    GFXPrimitiveMode[GFXPrimitiveMode["ISO_LINE_LIST"] = 6] = "ISO_LINE_LIST";
    // raycast detectable:
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST"] = 7] = "TRIANGLE_LIST";
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP"] = 8] = "TRIANGLE_STRIP";
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_FAN"] = 9] = "TRIANGLE_FAN";
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_LIST_ADJACENCY"] = 10] = "TRIANGLE_LIST_ADJACENCY";
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_STRIP_ADJACENCY"] = 11] = "TRIANGLE_STRIP_ADJACENCY";
    GFXPrimitiveMode[GFXPrimitiveMode["TRIANGLE_PATCH_ADJACENCY"] = 12] = "TRIANGLE_PATCH_ADJACENCY";
    GFXPrimitiveMode[GFXPrimitiveMode["QUAD_PATCH_LIST"] = 13] = "QUAD_PATCH_LIST";
})(GFXPrimitiveMode || (exports.GFXPrimitiveMode = GFXPrimitiveMode = {}));
var GFXPolygonMode;
(function (GFXPolygonMode) {
    GFXPolygonMode[GFXPolygonMode["FILL"] = 0] = "FILL";
    GFXPolygonMode[GFXPolygonMode["POINT"] = 1] = "POINT";
    GFXPolygonMode[GFXPolygonMode["LINE"] = 2] = "LINE";
})(GFXPolygonMode || (exports.GFXPolygonMode = GFXPolygonMode = {}));
var GFXShadeModel;
(function (GFXShadeModel) {
    GFXShadeModel[GFXShadeModel["GOURAND"] = 0] = "GOURAND";
    GFXShadeModel[GFXShadeModel["FLAT"] = 1] = "FLAT";
})(GFXShadeModel || (exports.GFXShadeModel = GFXShadeModel = {}));
var GFXCullMode;
(function (GFXCullMode) {
    GFXCullMode[GFXCullMode["NONE"] = 0] = "NONE";
    GFXCullMode[GFXCullMode["FRONT"] = 1] = "FRONT";
    GFXCullMode[GFXCullMode["BACK"] = 2] = "BACK";
})(GFXCullMode || (exports.GFXCullMode = GFXCullMode = {}));
var GFXComparisonFunc;
(function (GFXComparisonFunc) {
    GFXComparisonFunc[GFXComparisonFunc["NEVER"] = 0] = "NEVER";
    GFXComparisonFunc[GFXComparisonFunc["LESS"] = 1] = "LESS";
    GFXComparisonFunc[GFXComparisonFunc["EQUAL"] = 2] = "EQUAL";
    GFXComparisonFunc[GFXComparisonFunc["LESS_EQUAL"] = 3] = "LESS_EQUAL";
    GFXComparisonFunc[GFXComparisonFunc["GREATER"] = 4] = "GREATER";
    GFXComparisonFunc[GFXComparisonFunc["NOT_EQUAL"] = 5] = "NOT_EQUAL";
    GFXComparisonFunc[GFXComparisonFunc["GREATER_EQUAL"] = 6] = "GREATER_EQUAL";
    GFXComparisonFunc[GFXComparisonFunc["ALWAYS"] = 7] = "ALWAYS";
})(GFXComparisonFunc || (exports.GFXComparisonFunc = GFXComparisonFunc = {}));
var GFXStencilOp;
(function (GFXStencilOp) {
    GFXStencilOp[GFXStencilOp["ZERO"] = 0] = "ZERO";
    GFXStencilOp[GFXStencilOp["KEEP"] = 1] = "KEEP";
    GFXStencilOp[GFXStencilOp["REPLACE"] = 2] = "REPLACE";
    GFXStencilOp[GFXStencilOp["INCR"] = 3] = "INCR";
    GFXStencilOp[GFXStencilOp["DECR"] = 4] = "DECR";
    GFXStencilOp[GFXStencilOp["INVERT"] = 5] = "INVERT";
    GFXStencilOp[GFXStencilOp["INCR_WRAP"] = 6] = "INCR_WRAP";
    GFXStencilOp[GFXStencilOp["DECR_WRAP"] = 7] = "DECR_WRAP";
})(GFXStencilOp || (exports.GFXStencilOp = GFXStencilOp = {}));
var GFXBlendOp;
(function (GFXBlendOp) {
    GFXBlendOp[GFXBlendOp["ADD"] = 0] = "ADD";
    GFXBlendOp[GFXBlendOp["SUB"] = 1] = "SUB";
    GFXBlendOp[GFXBlendOp["REV_SUB"] = 2] = "REV_SUB";
    GFXBlendOp[GFXBlendOp["MIN"] = 3] = "MIN";
    GFXBlendOp[GFXBlendOp["MAX"] = 4] = "MAX";
})(GFXBlendOp || (exports.GFXBlendOp = GFXBlendOp = {}));
var GFXBlendFactor;
(function (GFXBlendFactor) {
    GFXBlendFactor[GFXBlendFactor["ZERO"] = 0] = "ZERO";
    GFXBlendFactor[GFXBlendFactor["ONE"] = 1] = "ONE";
    GFXBlendFactor[GFXBlendFactor["SRC_ALPHA"] = 2] = "SRC_ALPHA";
    GFXBlendFactor[GFXBlendFactor["DST_ALPHA"] = 3] = "DST_ALPHA";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_ALPHA"] = 4] = "ONE_MINUS_SRC_ALPHA";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_ALPHA"] = 5] = "ONE_MINUS_DST_ALPHA";
    GFXBlendFactor[GFXBlendFactor["SRC_COLOR"] = 6] = "SRC_COLOR";
    GFXBlendFactor[GFXBlendFactor["DST_COLOR"] = 7] = "DST_COLOR";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_SRC_COLOR"] = 8] = "ONE_MINUS_SRC_COLOR";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_DST_COLOR"] = 9] = "ONE_MINUS_DST_COLOR";
    GFXBlendFactor[GFXBlendFactor["SRC_ALPHA_SATURATE"] = 10] = "SRC_ALPHA_SATURATE";
    GFXBlendFactor[GFXBlendFactor["CONSTANT_COLOR"] = 11] = "CONSTANT_COLOR";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_COLOR"] = 12] = "ONE_MINUS_CONSTANT_COLOR";
    GFXBlendFactor[GFXBlendFactor["CONSTANT_ALPHA"] = 13] = "CONSTANT_ALPHA";
    GFXBlendFactor[GFXBlendFactor["ONE_MINUS_CONSTANT_ALPHA"] = 14] = "ONE_MINUS_CONSTANT_ALPHA";
})(GFXBlendFactor || (exports.GFXBlendFactor = GFXBlendFactor = {}));
var GFXColorMask;
(function (GFXColorMask) {
    GFXColorMask[GFXColorMask["NONE"] = 0] = "NONE";
    GFXColorMask[GFXColorMask["R"] = 1] = "R";
    GFXColorMask[GFXColorMask["G"] = 2] = "G";
    GFXColorMask[GFXColorMask["B"] = 4] = "B";
    GFXColorMask[GFXColorMask["A"] = 8] = "A";
    GFXColorMask[GFXColorMask["ALL"] = 15] = "ALL";
})(GFXColorMask || (exports.GFXColorMask = GFXColorMask = {}));
var GFXFilter;
(function (GFXFilter) {
    GFXFilter[GFXFilter["NONE"] = 0] = "NONE";
    GFXFilter[GFXFilter["POINT"] = 1] = "POINT";
    GFXFilter[GFXFilter["LINEAR"] = 2] = "LINEAR";
    GFXFilter[GFXFilter["ANISOTROPIC"] = 3] = "ANISOTROPIC";
})(GFXFilter || (exports.GFXFilter = GFXFilter = {}));
var GFXAddress;
(function (GFXAddress) {
    GFXAddress[GFXAddress["WRAP"] = 0] = "WRAP";
    GFXAddress[GFXAddress["MIRROR"] = 1] = "MIRROR";
    GFXAddress[GFXAddress["CLAMP"] = 2] = "CLAMP";
    GFXAddress[GFXAddress["BORDER"] = 3] = "BORDER";
})(GFXAddress || (exports.GFXAddress = GFXAddress = {}));
var GFXTextureType;
(function (GFXTextureType) {
    GFXTextureType[GFXTextureType["TEX1D"] = 0] = "TEX1D";
    GFXTextureType[GFXTextureType["TEX2D"] = 1] = "TEX2D";
    GFXTextureType[GFXTextureType["TEX3D"] = 2] = "TEX3D";
})(GFXTextureType || (exports.GFXTextureType = GFXTextureType = {}));
var GFXTextureUsageBit;
(function (GFXTextureUsageBit) {
    GFXTextureUsageBit[GFXTextureUsageBit["NONE"] = 0] = "NONE";
    GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_SRC"] = 1] = "TRANSFER_SRC";
    GFXTextureUsageBit[GFXTextureUsageBit["TRANSFER_DST"] = 2] = "TRANSFER_DST";
    GFXTextureUsageBit[GFXTextureUsageBit["SAMPLED"] = 4] = "SAMPLED";
    GFXTextureUsageBit[GFXTextureUsageBit["STORAGE"] = 8] = "STORAGE";
    GFXTextureUsageBit[GFXTextureUsageBit["COLOR_ATTACHMENT"] = 16] = "COLOR_ATTACHMENT";
    GFXTextureUsageBit[GFXTextureUsageBit["DEPTH_STENCIL_ATTACHMENT"] = 32] = "DEPTH_STENCIL_ATTACHMENT";
    GFXTextureUsageBit[GFXTextureUsageBit["TRANSIENT_ATTACHMENT"] = 64] = "TRANSIENT_ATTACHMENT";
    GFXTextureUsageBit[GFXTextureUsageBit["INPUT_ATTACHMENT"] = 128] = "INPUT_ATTACHMENT";
})(GFXTextureUsageBit || (exports.GFXTextureUsageBit = GFXTextureUsageBit = {}));
var GFXSampleCount;
(function (GFXSampleCount) {
    GFXSampleCount[GFXSampleCount["X1"] = 0] = "X1";
    GFXSampleCount[GFXSampleCount["X2"] = 1] = "X2";
    GFXSampleCount[GFXSampleCount["X4"] = 2] = "X4";
    GFXSampleCount[GFXSampleCount["X8"] = 3] = "X8";
    GFXSampleCount[GFXSampleCount["X16"] = 4] = "X16";
    GFXSampleCount[GFXSampleCount["X32"] = 5] = "X32";
    GFXSampleCount[GFXSampleCount["X64"] = 6] = "X64";
})(GFXSampleCount || (exports.GFXSampleCount = GFXSampleCount = {}));
var GFXTextureFlagBit;
(function (GFXTextureFlagBit) {
    GFXTextureFlagBit[GFXTextureFlagBit["NONE"] = 0] = "NONE";
    GFXTextureFlagBit[GFXTextureFlagBit["GEN_MIPMAP"] = 1] = "GEN_MIPMAP";
    GFXTextureFlagBit[GFXTextureFlagBit["CUBEMAP"] = 2] = "CUBEMAP";
    GFXTextureFlagBit[GFXTextureFlagBit["BAKUP_BUFFER"] = 4] = "BAKUP_BUFFER";
})(GFXTextureFlagBit || (exports.GFXTextureFlagBit = GFXTextureFlagBit = {}));
var GFXTextureViewType;
(function (GFXTextureViewType) {
    GFXTextureViewType[GFXTextureViewType["TV1D"] = 0] = "TV1D";
    GFXTextureViewType[GFXTextureViewType["TV2D"] = 1] = "TV2D";
    GFXTextureViewType[GFXTextureViewType["TV3D"] = 2] = "TV3D";
    GFXTextureViewType[GFXTextureViewType["CUBE"] = 3] = "CUBE";
    GFXTextureViewType[GFXTextureViewType["TV1D_ARRAY"] = 4] = "TV1D_ARRAY";
    GFXTextureViewType[GFXTextureViewType["TV2D_ARRAY"] = 5] = "TV2D_ARRAY";
})(GFXTextureViewType || (exports.GFXTextureViewType = GFXTextureViewType = {}));
var GFXShaderType;
(function (GFXShaderType) {
    GFXShaderType[GFXShaderType["VERTEX"] = 0] = "VERTEX";
    GFXShaderType[GFXShaderType["HULL"] = 1] = "HULL";
    GFXShaderType[GFXShaderType["DOMAIN"] = 2] = "DOMAIN";
    GFXShaderType[GFXShaderType["GEOMETRY"] = 3] = "GEOMETRY";
    GFXShaderType[GFXShaderType["FRAGMENT"] = 4] = "FRAGMENT";
    GFXShaderType[GFXShaderType["COMPUTE"] = 5] = "COMPUTE";
    GFXShaderType[GFXShaderType["COUNT"] = 6] = "COUNT";
})(GFXShaderType || (exports.GFXShaderType = GFXShaderType = {}));
var GFXBindingType;
(function (GFXBindingType) {
    GFXBindingType[GFXBindingType["UNKNOWN"] = 0] = "UNKNOWN";
    GFXBindingType[GFXBindingType["UNIFORM_BUFFER"] = 1] = "UNIFORM_BUFFER";
    GFXBindingType[GFXBindingType["SAMPLER"] = 2] = "SAMPLER";
    GFXBindingType[GFXBindingType["STORAGE_BUFFER"] = 3] = "STORAGE_BUFFER";
})(GFXBindingType || (exports.GFXBindingType = GFXBindingType = {}));
var GFXCommandBufferType;
(function (GFXCommandBufferType) {
    GFXCommandBufferType[GFXCommandBufferType["PRIMARY"] = 0] = "PRIMARY";
    GFXCommandBufferType[GFXCommandBufferType["SECONDARY"] = 1] = "SECONDARY";
})(GFXCommandBufferType || (exports.GFXCommandBufferType = GFXCommandBufferType = {}));
// Enumeration all possible values of operations to be performed on initially Loading a Framebuffer Object.
var GFXLoadOp;
(function (GFXLoadOp) {
    GFXLoadOp[GFXLoadOp["LOAD"] = 0] = "LOAD";
    GFXLoadOp[GFXLoadOp["CLEAR"] = 1] = "CLEAR";
    GFXLoadOp[GFXLoadOp["DISCARD"] = 2] = "DISCARD";
})(GFXLoadOp || (exports.GFXLoadOp = GFXLoadOp = {}));
// Enumerates all possible values of operations to be performed when Storing to a Framebuffer Object.
var GFXStoreOp;
(function (GFXStoreOp) {
    GFXStoreOp[GFXStoreOp["STORE"] = 0] = "STORE";
    GFXStoreOp[GFXStoreOp["DISCARD"] = 1] = "DISCARD";
})(GFXStoreOp || (exports.GFXStoreOp = GFXStoreOp = {}));
var GFXTextureLayout;
(function (GFXTextureLayout) {
    GFXTextureLayout[GFXTextureLayout["UNDEFINED"] = 0] = "UNDEFINED";
    GFXTextureLayout[GFXTextureLayout["GENERAL"] = 1] = "GENERAL";
    GFXTextureLayout[GFXTextureLayout["COLOR_ATTACHMENT_OPTIMAL"] = 2] = "COLOR_ATTACHMENT_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_ATTACHMENT_OPTIMAL"] = 3] = "DEPTH_STENCIL_ATTACHMENT_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["DEPTH_STENCIL_READONLY_OPTIMAL"] = 4] = "DEPTH_STENCIL_READONLY_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["SHADER_READONLY_OPTIMAL"] = 5] = "SHADER_READONLY_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["TRANSFER_SRC_OPTIMAL"] = 6] = "TRANSFER_SRC_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["TRANSFER_DST_OPTIMAL"] = 7] = "TRANSFER_DST_OPTIMAL";
    GFXTextureLayout[GFXTextureLayout["PREINITIALIZED"] = 8] = "PREINITIALIZED";
    GFXTextureLayout[GFXTextureLayout["PRESENT_SRC"] = 9] = "PRESENT_SRC";
})(GFXTextureLayout || (exports.GFXTextureLayout = GFXTextureLayout = {}));
var GFXPipelineBindPoint;
(function (GFXPipelineBindPoint) {
    GFXPipelineBindPoint[GFXPipelineBindPoint["GRAPHICS"] = 0] = "GRAPHICS";
    GFXPipelineBindPoint[GFXPipelineBindPoint["COMPUTE"] = 1] = "COMPUTE";
    GFXPipelineBindPoint[GFXPipelineBindPoint["RAY_TRACING"] = 2] = "RAY_TRACING";
})(GFXPipelineBindPoint || (exports.GFXPipelineBindPoint = GFXPipelineBindPoint = {}));
var GFXDynamicState;
(function (GFXDynamicState) {
    GFXDynamicState[GFXDynamicState["VIEWPORT"] = 0] = "VIEWPORT";
    GFXDynamicState[GFXDynamicState["SCISSOR"] = 1] = "SCISSOR";
    GFXDynamicState[GFXDynamicState["LINE_WIDTH"] = 2] = "LINE_WIDTH";
    GFXDynamicState[GFXDynamicState["DEPTH_BIAS"] = 3] = "DEPTH_BIAS";
    GFXDynamicState[GFXDynamicState["BLEND_CONSTANTS"] = 4] = "BLEND_CONSTANTS";
    GFXDynamicState[GFXDynamicState["DEPTH_BOUNDS"] = 5] = "DEPTH_BOUNDS";
    GFXDynamicState[GFXDynamicState["STENCIL_WRITE_MASK"] = 6] = "STENCIL_WRITE_MASK";
    GFXDynamicState[GFXDynamicState["STENCIL_COMPARE_MASK"] = 7] = "STENCIL_COMPARE_MASK";
})(GFXDynamicState || (exports.GFXDynamicState = GFXDynamicState = {}));
var GFXStencilFace;
(function (GFXStencilFace) {
    GFXStencilFace[GFXStencilFace["FRONT"] = 0] = "FRONT";
    GFXStencilFace[GFXStencilFace["BACK"] = 1] = "BACK";
    GFXStencilFace[GFXStencilFace["ALL"] = 2] = "ALL";
})(GFXStencilFace || (exports.GFXStencilFace = GFXStencilFace = {}));
var GFXQueueType;
(function (GFXQueueType) {
    GFXQueueType[GFXQueueType["GRAPHICS"] = 0] = "GRAPHICS";
    GFXQueueType[GFXQueueType["COMPUTE"] = 1] = "COMPUTE";
    GFXQueueType[GFXQueueType["TRANSFER"] = 2] = "TRANSFER";
})(GFXQueueType || (exports.GFXQueueType = GFXQueueType = {}));
var GFXClearFlag;
(function (GFXClearFlag) {
    GFXClearFlag[GFXClearFlag["NONE"] = 0] = "NONE";
    GFXClearFlag[GFXClearFlag["COLOR"] = 1] = "COLOR";
    GFXClearFlag[GFXClearFlag["DEPTH"] = 2] = "DEPTH";
    GFXClearFlag[GFXClearFlag["STENCIL"] = 4] = "STENCIL";
    GFXClearFlag[GFXClearFlag["DEPTH_STENCIL"] = 6] = "DEPTH_STENCIL";
    GFXClearFlag[GFXClearFlag["ALL"] = 7] = "ALL";
})(GFXClearFlag || (exports.GFXClearFlag = GFXClearFlag = {}));
class GFXTextureSubres {
    constructor() {
        this.baseMipLevel = 0;
        this.levelCount = 1;
        this.baseArrayLayer = 0;
        this.layerCount = 1;
    }
}
exports.GFXTextureSubres = GFXTextureSubres;
class GFXTextureCopy {
    constructor() {
        this.srcSubres = new GFXTextureSubres();
        this.srcOffset = { x: 0, y: 0, z: 0 };
        this.dstSubres = new GFXTextureSubres();
        this.dstOffset = { x: 0, y: 0, z: 0 };
        this.extent = { width: 0, height: 0, depth: 0 };
    }
}
exports.GFXTextureCopy = GFXTextureCopy;
class GFXBufferTextureCopy {
    constructor() {
        this.buffOffset = 0;
        this.buffStride = 0;
        this.buffTexHeight = 0;
        this.texOffset = { x: 0, y: 0, z: 0 };
        this.texExtent = { width: 0, height: 0, depth: 0 };
        this.texSubres = new GFXTextureSubres();
    }
}
exports.GFXBufferTextureCopy = GFXBufferTextureCopy;
// tslint:disable: max-line-length
exports.GFXFormatInfos = [
    { name: 'UNKNOWN', size: 0, count: 0, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'A8', size: 1, count: 1, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'L8', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'LA8', size: 1, count: 2, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R8', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R8SN', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R8UI', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R8I', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R16F', size: 2, count: 1, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R16UI', size: 2, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R16I', size: 2, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R32F', size: 4, count: 1, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R32UI', size: 4, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R32I', size: 4, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG8', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG8SN', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG8UI', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG8I', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG16F', size: 4, count: 2, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG16UI', size: 4, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG16I', size: 4, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG32F', size: 8, count: 2, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG32UI', size: 8, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RG32I', size: 8, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB8', size: 3, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'SRGB8', size: 3, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB8SN', size: 3, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB8UI', size: 3, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB8I', size: 3, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB16F', size: 6, count: 3, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB16UI', size: 6, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB16I', size: 6, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB32F', size: 12, count: 3, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB32UI', size: 12, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB32I', size: 12, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA8', size: 4, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'SRGB8_A8', size: 4, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA8SN', size: 4, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA8UI', size: 4, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA8I', size: 4, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA16F', size: 8, count: 4, isFloating: true, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA16UI', size: 8, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA16I', size: 8, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA32F', size: 16, count: 4, isFloating: true, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA32UI', size: 16, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA32I', size: 16, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R5G6B5', size: 2, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'R11G11B10F', size: 4, count: 3, isFloating: true, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB5A1', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGBA4', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB10A2', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB10A2UI', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'RGB9E5', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: false },
    { name: 'D16', size: 2, count: 1, isFloating: false, hasAlpha: false, hasDepth: true, hasStencil: false, isCompressed: false },
    { name: 'D16S8', size: 3, count: 2, isFloating: false, hasAlpha: false, hasDepth: true, hasStencil: true, isCompressed: false },
    { name: 'D24', size: 3, count: 1, isFloating: false, hasAlpha: false, hasDepth: true, hasStencil: false, isCompressed: false },
    { name: 'D24S8', size: 4, count: 2, isFloating: false, hasAlpha: false, hasDepth: true, hasStencil: true, isCompressed: false },
    { name: 'D32F', size: 4, count: 1, isFloating: true, hasAlpha: false, hasDepth: true, hasStencil: false, isCompressed: false },
    { name: 'D32FS8', size: 5, count: 2, isFloating: true, hasAlpha: false, hasDepth: true, hasStencil: true, isCompressed: false },
    { name: 'BC1', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC1_ALPHA', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC1_SRGB', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC1_SRGB_ALPHA', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC2', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC2_SRGB', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC3', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC3_SRGB', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC4', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC4_SNORM', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC5', size: 1, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC5_SNORM', size: 1, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC6H_UF16', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC6H_SF16', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC7', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'BC7_SRGB', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC_RGB8', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_RGB8', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_SRGB8', size: 1, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_RGB8_A1', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_SRGB8_A1', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_RGBA8', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ETC2_SRGB8_A8', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'EAC_R11', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'EAC_R11SN', size: 1, count: 1, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'EAC_RG11', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'EAC_RG11SN', size: 2, count: 2, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC_RGB2', size: 2, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC_RGBA2', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC_RGB4', size: 2, count: 3, isFloating: false, hasAlpha: false, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC_RGBA4', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC2_2BPP', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'PVRTC2_4BPP', size: 2, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_4x4', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_5x4', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_5x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_6x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_6x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_8x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_8x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_8x8', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_10x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_10x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_10x8', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_10x10', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_12x10', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_RGBA_12x12', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_4x4', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_5x4', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_5x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_6x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_6x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_8x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_8x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_8x8', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_10x5', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_10x6', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_10x8', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_10x10', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_12x10', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
    { name: 'ASTC_SRGBA_12x12', size: 1, count: 4, isFloating: false, hasAlpha: true, hasDepth: false, hasStencil: false, isCompressed: true },
];
// tslint:enable: max-line-length
function GFXFormatSize(format, width, height, depth) {
    if (!exports.GFXFormatInfos[format].isCompressed) {
        return (width * height * depth * exports.GFXFormatInfos[format].size);
    }
    else {
        switch (format) {
            case GFXFormat.BC1:
            case GFXFormat.BC1_ALPHA:
            case GFXFormat.BC1_SRGB:
            case GFXFormat.BC1_SRGB_ALPHA:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 8 * depth;
            case GFXFormat.BC2:
            case GFXFormat.BC2_SRGB:
            case GFXFormat.BC3:
            case GFXFormat.BC3_SRGB:
            case GFXFormat.BC4:
            case GFXFormat.BC4_SNORM:
            case GFXFormat.BC6H_SF16:
            case GFXFormat.BC6H_UF16:
            case GFXFormat.BC7:
            case GFXFormat.BC7_SRGB:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;
            case GFXFormat.BC5:
            case GFXFormat.BC5_SNORM:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 32 * depth;
            case GFXFormat.ETC_RGB8:
            case GFXFormat.ETC2_RGB8:
            case GFXFormat.ETC2_SRGB8:
            case GFXFormat.ETC2_RGB8_A1:
            case GFXFormat.ETC2_SRGB8_A1:
            case GFXFormat.EAC_R11:
            case GFXFormat.EAC_R11SN:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 8 * depth;
            case GFXFormat.EAC_RG11:
            case GFXFormat.EAC_RG11SN:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;
            case GFXFormat.PVRTC_RGB2:
            case GFXFormat.PVRTC_RGBA2:
            case GFXFormat.PVRTC2_2BPP:
                return Math.ceil(Math.max(width, 16) * Math.max(height, 8) / 4) * depth;
            case GFXFormat.PVRTC_RGB4:
            case GFXFormat.PVRTC_RGBA4:
            case GFXFormat.PVRTC2_4BPP:
                return Math.ceil(Math.max(width, 16) * Math.max(height, 8) / 2) * depth;
            case GFXFormat.ASTC_RGBA_4x4:
            case GFXFormat.ASTC_SRGBA_4x4:
                return Math.ceil(width / 4) * Math.ceil(height / 4) * 16 * depth;
            case GFXFormat.ASTC_RGBA_5x4:
            case GFXFormat.ASTC_SRGBA_5x4:
                return Math.ceil(width / 5) * Math.ceil(height / 4) * 16 * depth;
            case GFXFormat.ASTC_RGBA_5x5:
            case GFXFormat.ASTC_SRGBA_5x5:
                return Math.ceil(width / 5) * Math.ceil(height / 5) * 16 * depth;
            case GFXFormat.ASTC_RGBA_6x5:
            case GFXFormat.ASTC_SRGBA_6x5:
                return Math.ceil(width / 6) * Math.ceil(height / 5) * 16 * depth;
            case GFXFormat.ASTC_RGBA_6x6:
            case GFXFormat.ASTC_SRGBA_6x6:
                return Math.ceil(width / 6) * Math.ceil(height / 6) * 16 * depth;
            case GFXFormat.ASTC_RGBA_8x5:
            case GFXFormat.ASTC_SRGBA_8x5:
                return Math.ceil(width / 8) * Math.ceil(height / 5) * 16 * depth;
            case GFXFormat.ASTC_RGBA_8x6:
            case GFXFormat.ASTC_SRGBA_8x6:
                return Math.ceil(width / 8) * Math.ceil(height / 6) * 16 * depth;
            case GFXFormat.ASTC_RGBA_8x8:
            case GFXFormat.ASTC_SRGBA_8x8:
                return Math.ceil(width / 8) * Math.ceil(height / 8) * 16 * depth;
            case GFXFormat.ASTC_RGBA_10x5:
            case GFXFormat.ASTC_SRGBA_10x5:
                return Math.ceil(width / 10) * Math.ceil(height / 5) * 16 * depth;
            case GFXFormat.ASTC_RGBA_10x6:
            case GFXFormat.ASTC_SRGBA_10x6:
                return Math.ceil(width / 10) * Math.ceil(height / 6) * 16 * depth;
            case GFXFormat.ASTC_RGBA_10x8:
            case GFXFormat.ASTC_SRGBA_10x8:
                return Math.ceil(width / 10) * Math.ceil(height / 8) * 16 * depth;
            case GFXFormat.ASTC_RGBA_10x10:
            case GFXFormat.ASTC_SRGBA_10x10:
                return Math.ceil(width / 10) * Math.ceil(height / 10) * 16 * depth;
            case GFXFormat.ASTC_RGBA_12x10:
            case GFXFormat.ASTC_SRGBA_12x10:
                return Math.ceil(width / 12) * Math.ceil(height / 10) * 16 * depth;
            case GFXFormat.ASTC_RGBA_12x12:
            case GFXFormat.ASTC_SRGBA_12x12:
                return Math.ceil(width / 12) * Math.ceil(height / 12) * 16 * depth;
            default: {
                return 0;
            }
        }
    }
}
exports.GFXFormatSize = GFXFormatSize;
function GFXFormatSurfaceSize(format, width, height, depth, mips) {
    let size = 0;
    for (let i = 0; i < mips; ++i) {
        size += GFXFormatSize(format, width, height, depth);
        width = Math.max(width >> 1, 1);
        height = Math.max(height >> 1, 1);
        depth = Math.max(depth >> 1, 1);
    }
    return size;
}
exports.GFXFormatSurfaceSize = GFXFormatSurfaceSize;
function GFXGetTypeSize(type) {
    switch (type) {
        case GFXType.BOOL:
        case GFXType.INT:
        case GFXType.UINT:
        case GFXType.FLOAT: return 4;
        case GFXType.BOOL2:
        case GFXType.INT2:
        case GFXType.UINT2:
        case GFXType.FLOAT2: return 8;
        case GFXType.BOOL3:
        case GFXType.INT3:
        case GFXType.UINT3:
        case GFXType.FLOAT3: return 12;
        case GFXType.BOOL4:
        case GFXType.INT4:
        case GFXType.UINT4:
        case GFXType.FLOAT4:
        case GFXType.MAT2: return 16;
        case GFXType.MAT2X3: return 24;
        case GFXType.MAT2X4: return 32;
        case GFXType.MAT3X2: return 24;
        case GFXType.MAT3: return 36;
        case GFXType.MAT3X4: return 48;
        case GFXType.MAT4X2: return 32;
        case GFXType.MAT4X2: return 32;
        case GFXType.MAT4: return 64;
        case GFXType.SAMPLER1D:
        case GFXType.SAMPLER1D_ARRAY:
        case GFXType.SAMPLER2D:
        case GFXType.SAMPLER2D_ARRAY:
        case GFXType.SAMPLER3D:
        case GFXType.SAMPLER_CUBE: return 4;
        default: {
            return 0;
        }
    }
}
exports.GFXGetTypeSize = GFXGetTypeSize;
