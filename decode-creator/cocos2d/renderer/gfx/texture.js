"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
/**
 * @type {WebGLTexture}
 */
const _nullWebGLTexture = null;
let _textureID = 0;
/**
 * @typedef {import("../gfx/device").default} Device
 */
class Texture {
    /**
     * @param {Device} device
     */
    constructor(device) {
        this._device = device;
        this._width = 4;
        this._height = 4;
        this._genMipmaps = false;
        this._compressed = false;
        this._anisotropy = 1;
        this._minFilter = enums_1.enums.FILTER_LINEAR;
        this._magFilter = enums_1.enums.FILTER_LINEAR;
        this._mipFilter = enums_1.enums.FILTER_LINEAR;
        this._wrapS = enums_1.enums.WRAP_REPEAT;
        this._wrapT = enums_1.enums.WRAP_REPEAT;
        // wrapR available in webgl2
        // this._wrapR = enums.WRAP_REPEAT;
        this._format = enums_1.enums.TEXTURE_FMT_RGBA8;
        this._target = -1;
        this._id = _textureID++;
    }
    /**
     * @method destroy
     */
    destroy() {
        if (this._glID === _nullWebGLTexture) {
            console.error('The texture already destroyed');
            return;
        }
        let gl = this._device._gl;
        gl.deleteTexture(this._glID);
        this._device._stats.tex -= this.bytes;
        this._glID = _nullWebGLTexture;
    }
}
exports.default = Texture;
