"use strict";
/****************************************************************************
 Copyright (c) 2019 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicsMaterial = void 0;
const { ccclass, property } = cc._decorator;
const fastRemove = cc.js.array.fastRemove;
const equals = cc.math.equals;
/**
 * !#en
 * Physics material.
 * !#zh
 * 物理材质。
 * @class PhysicsMaterial
 * @extends Asset
 */
let PhysicsMaterial = (() => {
    let _classDecorators = [ccclass('cc.PhysicsMaterial')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = cc.Asset;
    let _instanceExtraInitializers = [];
    let __friction_decorators;
    let __friction_initializers = [];
    let __restitution_decorators;
    let __restitution_initializers = [];
    let _get_friction_decorators;
    let _get_restitution_decorators;
    var PhysicsMaterial = _classThis = class extends _classSuper {
        /**
         * !#en
         * Friction for this material.
         * !#zh
         * 物理材质的摩擦力。
         * @property {number} friction
         */
        get friction() {
            return this._friction;
        }
        set friction(value) {
            if (!equals(this._friction, value)) {
                this._friction = value;
                this.emit('physics_material_update');
            }
        }
        /**
         * !#en
         * Restitution for this material.
         * !#zh
         * 物理材质的弹力。
         * @property {number} restitution
         */
        get restitution() {
            return this._restitution;
        }
        set restitution(value) {
            if (!equals(this._restitution, value)) {
                this._restitution = value;
                this.emit('physics_material_update');
            }
        }
        constructor() {
            super();
            this._friction = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __friction_initializers, 0.1));
            this._restitution = __runInitializers(this, __restitution_initializers, 0.1);
            cc.EventTarget.call(this);
            PhysicsMaterial.allMaterials.push(this);
            if (this._uuid == '') {
                this._uuid = 'pm_' + PhysicsMaterial._idCounter++;
            }
        }
        clone() {
            let c = new PhysicsMaterial();
            c._friction = this._friction;
            c._restitution = this._restitution;
            return c;
        }
        destroy() {
            if (super.destroy()) {
                fastRemove(PhysicsMaterial.allMaterials, this);
                return true;
            }
            else {
                return false;
            }
        }
    };
    __setFunctionName(_classThis, "PhysicsMaterial");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __friction_decorators = [property];
        __restitution_decorators = [property];
        _get_friction_decorators = [property];
        _get_restitution_decorators = [property];
        __esDecorate(_classThis, null, _get_friction_decorators, { kind: "getter", name: "friction", static: false, private: false, access: { has: obj => "friction" in obj, get: obj => obj.friction }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_restitution_decorators, { kind: "getter", name: "restitution", static: false, private: false, access: { has: obj => "restitution" in obj, get: obj => obj.restitution }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __friction_decorators, { kind: "field", name: "_friction", static: false, private: false, access: { has: obj => "_friction" in obj, get: obj => obj._friction, set: (obj, value) => { obj._friction = value; } }, metadata: _metadata }, __friction_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __restitution_decorators, { kind: "field", name: "_restitution", static: false, private: false, access: { has: obj => "_restitution" in obj, get: obj => obj._restitution, set: (obj, value) => { obj._restitution = value; } }, metadata: _metadata }, __restitution_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PhysicsMaterial = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.allMaterials = [];
    _classThis._idCounter = 0;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PhysicsMaterial = _classThis;
})();
exports.PhysicsMaterial = PhysicsMaterial;
cc.js.mixin(PhysicsMaterial.prototype, cc.EventTarget.prototype);
cc.PhysicsMaterial = PhysicsMaterial;
