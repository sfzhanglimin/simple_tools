"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vertex_format_1 = require("./webgl/vertex-format");
const assembler_pool_1 = __importDefault(require("./assembler-pool"));
class Assembler {
    constructor() {
        this._extendNative && this._extendNative();
    }
    init(renderComp) {
        this._renderComp = renderComp;
    }
    updateRenderData(comp) {
    }
    fillBuffers(comp, renderer) {
    }
    getVfmt() {
        return vertex_format_1.vfmtPosUvColor;
    }
}
exports.default = Assembler;
Assembler.register = function (renderCompCtor, assembler) {
    renderCompCtor.__assembler__ = assembler;
};
Assembler.init = function (renderComp) {
    let renderCompCtor = renderComp.constructor;
    let assemblerCtor = renderCompCtor.__assembler__;
    while (!assemblerCtor) {
        renderCompCtor = renderCompCtor.$super;
        if (!renderCompCtor) {
            cc.warn(`Can not find assembler for render component : [${cc.js.getClassName(renderComp)}]`);
            return;
        }
        assemblerCtor = renderCompCtor.__assembler__;
    }
    if (assemblerCtor.getConstructor) {
        assemblerCtor = assemblerCtor.getConstructor(renderComp);
    }
    if (!renderComp._assembler || renderComp._assembler.constructor !== assemblerCtor) {
        let assembler = assembler_pool_1.default.get(assemblerCtor);
        assembler.init(renderComp);
        renderComp._assembler = assembler;
    }
};
cc.Assembler = Assembler;
