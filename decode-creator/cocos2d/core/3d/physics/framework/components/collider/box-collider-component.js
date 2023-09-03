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
exports.BoxCollider3D = void 0;
const instance_1 = require("../../instance");
const collider_component_1 = require("./collider-component");
const { ccclass, executeInEditMode, executionOrder, menu, property, } = cc._decorator;
const Vec3 = cc.Vec3;
/**
 * !#en
 * Physics box collider
 * !#zh
 * 物理盒子碰撞器
 * @class BoxCollider3D
 * @extends Collider3D
 */
let BoxCollider3D = (() => {
    let _classDecorators = [ccclass('cc.BoxCollider3D'), executionOrder(98), menu('i18n:MAIN_MENU.component.physics/Collider/Box 3D'), executeInEditMode];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = collider_component_1.Collider3D;
    let _instanceExtraInitializers = [];
    let _get_size_decorators;
    let __size_decorators;
    let __size_initializers = [];
    var BoxCollider3D = _classThis = class extends _classSuper {
        /// PUBLIC PROPERTY GETTER\SETTER ///
        /**
         * !#en
         * Get or set the size of the box, in local space.
         * !#zh
         * 获取或设置盒的大小。
         * @property {Vec3} size
         */
        get size() {
            return this._size;
        }
        set size(value) {
            Vec3.copy(this._size, value);
            if (!CC_EDITOR) {
                this.boxShape.size = this._size;
            }
        }
        /**
         * @property {IBoxShape} boxShape
         * @readonly
         */
        get boxShape() {
            return this._shape;
        }
        constructor() {
            super();
            /// PRIVATE PROPERTY ///
            this._size = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __size_initializers, new Vec3(1, 1, 1)));
            if (!CC_EDITOR) {
                this._shape = (0, instance_1.createBoxShape)(this._size);
            }
        }
    };
    __setFunctionName(_classThis, "BoxCollider3D");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _get_size_decorators = [property({
                type: cc.Vec3
            })];
        __size_decorators = [property];
        __esDecorate(_classThis, null, _get_size_decorators, { kind: "getter", name: "size", static: false, private: false, access: { has: obj => "size" in obj, get: obj => obj.size }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __size_decorators, { kind: "field", name: "_size", static: false, private: false, access: { has: obj => "_size" in obj, get: obj => obj._size, set: (obj, value) => { obj._size = value; } }, metadata: _metadata }, __size_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BoxCollider3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BoxCollider3D = _classThis;
})();
exports.BoxCollider3D = BoxCollider3D;
