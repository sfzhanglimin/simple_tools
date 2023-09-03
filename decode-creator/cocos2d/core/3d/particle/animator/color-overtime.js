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
const CCClassDecorator_1 = require("../../../platform/CCClassDecorator");
const value_types_1 = require("../../../value-types");
const gradient_range_1 = __importDefault(require("./gradient-range"));
const COLOR_OVERTIME_RAND_OFFSET = 91041;
let ColorOvertimeModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.ColorOvertimeModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _enable_decorators;
    let _enable_initializers = [];
    let _color_decorators;
    let _color_initializers = [];
    var ColorOvertimeModule = _classThis = class {
        constructor() {
            /**
             * !#en The enable of ColorOvertimeModule.
             * !#zh 是否启用
             * @property {Boolean} enable
             */
            this.enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _enable_initializers, false));
            /**
             * !#en The parameter of color change over time, the linear difference between each key changes.
             * !#zh 颜色随时间变化的参数，各个 key 之间线性差值变化。
             * @type {GradientRange} color
             */
            this.color = __runInitializers(this, _color_initializers, new gradient_range_1.default());
        }
        animate(particle) {
            if (this.enable) {
                particle.color.set(particle.startColor);
                particle.color.multiply(this.color.evaluate(1.0 - particle.remainingLifetime / particle.startLifetime, (0, value_types_1.pseudoRandom)(particle.randomSeed + COLOR_OVERTIME_RAND_OFFSET)));
            }
        }
    };
    __setFunctionName(_classThis, "ColorOvertimeModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _enable_decorators = [CCClassDecorator_1.property];
        _color_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_range_1.default,
            })];
        __esDecorate(null, null, _enable_decorators, { kind: "field", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable, set: (obj, value) => { obj.enable = value; } }, metadata: _metadata }, _enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColorOvertimeModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColorOvertimeModule = _classThis;
})();
exports.default = ColorOvertimeModule;
