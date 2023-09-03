"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassStage = exports.RenderQueue = void 0;
let RenderQueue = {
    OPAQUE: 0,
    TRANSPARENT: 1,
    OVERLAY: 2
};
exports.RenderQueue = RenderQueue;
let PassStage = {
    DEFAULT: 1,
    FORWARD: 2,
    SHADOWCAST: 4
};
exports.PassStage = PassStage;
