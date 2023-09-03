"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CCMaterial_1 = __importDefault(require("./CCMaterial"));
const effect_variant_1 = __importDefault(require("./effect-variant"));
const material_pool_1 = __importDefault(require("./material-pool"));
let { ccclass, } = cc._decorator;
let MaterialVariant = (() => {
    let _classDecorators = [ccclass('cc.MaterialVariant')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = CCMaterial_1.default;
    var MaterialVariant = _classThis = class extends _classSuper {
        /**
         * @method createWithBuiltin
         * @param {Material.BUILTIN_NAME} materialName
         * @param {RenderComponent} [owner]
         * @typescript
         * static createWithBuiltin (materialName: string, owner: cc.RenderComponent): MaterialVariant | null
         */
        static createWithBuiltin(materialName, owner) {
            return MaterialVariant.create(CCMaterial_1.default.getBuiltinMaterial(materialName), owner);
        }
        /**
         * @method create
         * @param {Material} material
         * @param {RenderComponent} [owner]
         * @typescript
         * static create (material: Material, owner: cc.RenderComponent): MaterialVariant | null
         */
        static create(material, owner) {
            if (!material)
                return null;
            return material_pool_1.default.get(material, owner);
        }
        get uuid() {
            return this._material._uuid;
        }
        get owner() {
            return this._owner;
        }
        get material() {
            return this._material;
        }
        constructor(material) {
            super();
            this._owner = null;
            this._material = null;
            this.init(material);
        }
        init(material) {
            this._effect = new effect_variant_1.default(material.effect);
            this._effectAsset = material._effectAsset;
            this._material = material;
        }
    };
    __setFunctionName(_classThis, "MaterialVariant");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MaterialVariant = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MaterialVariant = _classThis;
})();
exports.default = MaterialVariant;
cc.MaterialVariant = MaterialVariant;
