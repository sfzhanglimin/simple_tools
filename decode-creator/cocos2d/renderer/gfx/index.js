"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("./enums");
let gfx = null;
if (CC_JSB && CC_NATIVERENDERER) {
    gfx = window.gfx;
}
else {
    let VertexFormat = require('./vertex-format');
    let IndexBuffer = require('./index-buffer');
    let VertexBuffer = require('./vertex-buffer');
    let Program = require('./program');
    let Texture = require('./texture');
    let Texture2D = require('./texture-2d');
    let TextureCube = require('./texture-cube');
    let RenderBuffer = require('./render-buffer');
    let FrameBuffer = require('./frame-buffer');
    let Device = require('./device');
    gfx = {
        // classes
        VertexFormat,
        IndexBuffer,
        VertexBuffer,
        Program,
        Texture,
        Texture2D,
        TextureCube,
        RenderBuffer,
        FrameBuffer,
        Device,
        // functions
        attrTypeBytes: enums_1.attrTypeBytes,
        glFilter: enums_1.glFilter,
        glTextureFmt: enums_1.glTextureFmt,
    };
    Object.assign(gfx, enums_1.enums);
}
exports.default = gfx;
cc.gfx = gfx;
