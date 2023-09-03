"use strict";
/****************************************************************************
 Copyright (c) 2017-2018 Chukong Technologies Inc.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
  worldwide, royalty-free, non-assignable, revocable and  non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
  not use Cocos Creator software for developing other software or tools that's
  used for developing games. You are not granted to publish, distribute,
  sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Chukong Aipu reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assembler_1 = __importDefault(require("../core/renderer/assembler"));
const ParticleSystem = require('./CCParticleSystem');
const renderer = require('../core/renderer/');
const QuadBuffer = require('../core/renderer/webgl/quad-buffer');
const vfmtPosUvColor = require('../core/renderer/webgl/vertex-format').vfmtPosUvColor;
const input_assembler_1 = __importDefault(require("../renderer/core/input-assembler"));
class ParticleAssembler extends assembler_1.default {
    constructor(comp) {
        super(comp);
        this._buffer = null;
        this._ia = null;
        this._vfmt = vfmtPosUvColor;
    }
    getBuffer() {
        if (!this._buffer) {
            // Create quad buffer for vertex and index
            this._buffer = new QuadBuffer(renderer._handle, vfmtPosUvColor);
            this._ia = new input_assembler_1.default();
            this._ia._vertexBuffer = this._buffer._vb;
            this._ia._indexBuffer = this._buffer._ib;
            this._ia._start = 0;
            this._ia._count = 0;
        }
        return this._buffer;
    }
    fillBuffers(comp, renderer) {
        if (!this._ia)
            return;
        const PositionType = cc.ParticleSystem.PositionType;
        if (comp.positionType === PositionType.RELATIVE) {
            renderer.node = comp.node.parent;
        }
        else {
            renderer.node = comp.node;
        }
        renderer.material = comp._materials[0];
        renderer._flushIA(this._ia);
    }
}
assembler_1.default.register(ParticleSystem, ParticleAssembler);
module.exports = ParticleAssembler;
