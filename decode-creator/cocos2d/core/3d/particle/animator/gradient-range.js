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
const CCEnum_1 = __importDefault(require("../../../platform/CCEnum"));
const gradient_1 = require("./gradient");
const GRADIENT_MODE_FIX = 0;
const GRADIENT_MODE_BLEND = 1;
const GRADIENT_RANGE_MODE_COLOR = 0;
const GRADIENT_RANGE_MODE_TWO_COLOR = 1;
const GRADIENT_RANGE_MODE_RANDOM_COLOR = 2;
const GRADIENT_RANGE_MODE_GRADIENT = 3;
const GRADIENT_RANGE_MODE_TWO_GRADIENT = 4;
const SerializableTable = CC_EDITOR && [
    ["_mode", "color"],
    ["_mode", "gradient"],
    ["_mode", "colorMin", "colorMax"],
    ["_mode", "gradientMin", "gradientMax"],
    ["_mode", "gradient"]
];
const Mode = (0, CCEnum_1.default)({
    Color: 0,
    Gradient: 1,
    TwoColors: 2,
    TwoGradients: 3,
    RandomColor: 4,
});
let GradientRange = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.GradientRange')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let __mode_decorators;
    let __mode_initializers = [];
    let _get_mode_decorators;
    let __color_decorators;
    let __color_initializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _colorMin_decorators;
    let _colorMin_initializers = [];
    let _colorMax_decorators;
    let _colorMax_initializers = [];
    let _gradient_decorators;
    let _gradient_initializers = [];
    let _gradientMin_decorators;
    let _gradientMin_initializers = [];
    let _gradientMax_decorators;
    let _gradientMax_initializers = [];
    var GradientRange = _classThis = class {
        constructor() {
            this._mode = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __mode_initializers, Mode.Color));
            this._color = __runInitializers(this, __color_initializers, cc.Color.WHITE.clone());
            /**
             * !#en The color when mode is Color.
             * !#zh 当 mode 为 Color 时的颜色。
             * @property {Color} color
             */
            this.color = __runInitializers(this, _color_initializers, cc.Color.WHITE.clone());
            /**
             * !#en Lower color limit when mode is TwoColors.
             * !#zh 当 mode 为 TwoColors 时的颜色下限。
             * @property {Color} colorMin
             */
            this.colorMin = __runInitializers(this, _colorMin_initializers, cc.Color.WHITE.clone());
            /**
             * !#en Upper color limit when mode is TwoColors.
             * !#zh 当 mode 为 TwoColors 时的颜色上限。
             * @property {Color} colorMax
             */
            this.colorMax = __runInitializers(this, _colorMax_initializers, cc.Color.WHITE.clone());
            /**
             * !#en Color gradient when mode is Gradient
             * !#zh 当 mode 为 Gradient 时的颜色渐变。
             * @property {Gradient} gradient
             */
            this.gradient = __runInitializers(this, _gradient_initializers, new gradient_1.Gradient());
            /**
             * !#en Lower color gradient limit when mode is TwoGradients.
             * !#zh 当 mode 为 TwoGradients 时的颜色渐变下限。
             * @property {Gradient} gradientMin
             */
            this.gradientMin = __runInitializers(this, _gradientMin_initializers, new gradient_1.Gradient());
            /**
             * !#en Upper color gradient limit when mode is TwoGradients.
             * !#zh 当 mode 为 TwoGradients 时的颜色渐变上限。
             * @property {Gradient} gradientMax
             */
            this.gradientMax = __runInitializers(this, _gradientMax_initializers, new gradient_1.Gradient());
        }
        /**
         * !#en Gradient type.
         * !#zh 渐变色类型。
         * @property {Mode} mode
         */
        get mode() {
            return this._mode;
        }
        set mode(m) {
            if (CC_EDITOR) {
                if (m === Mode.RandomColor) {
                    if (this.gradient.colorKeys.length === 0) {
                        this.gradient.colorKeys.push(new gradient_1.ColorKey());
                    }
                    if (this.gradient.alphaKeys.length === 0) {
                        this.gradient.alphaKeys.push(new gradient_1.AlphaKey());
                    }
                }
            }
            this._mode = m;
        }
        evaluate(time, rndRatio) {
            switch (this._mode) {
                case Mode.Color:
                    return this.color;
                case Mode.TwoColors:
                    this.colorMin.lerp(this.colorMax, rndRatio, this._color);
                    return this._color;
                case Mode.RandomColor:
                    return this.gradient.randomColor();
                case Mode.Gradient:
                    return this.gradient.evaluate(time);
                case Mode.TwoGradients:
                    this.gradientMin.evaluate(time).lerp(this.gradientMax.evaluate(time), rndRatio, this._color);
                    return this._color;
                default:
                    return this.color;
            }
        }
    };
    __setFunctionName(_classThis, "GradientRange");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __mode_decorators = [CCClassDecorator_1.property];
        _get_mode_decorators = [(0, CCClassDecorator_1.property)({
                type: Mode,
            })];
        __color_decorators = [CCClassDecorator_1.property];
        _color_decorators = [CCClassDecorator_1.property];
        _colorMin_decorators = [CCClassDecorator_1.property];
        _colorMax_decorators = [CCClassDecorator_1.property];
        _gradient_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_1.Gradient,
            })];
        _gradientMin_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_1.Gradient,
            })];
        _gradientMax_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_1.Gradient,
            })];
        __esDecorate(_classThis, null, _get_mode_decorators, { kind: "getter", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __mode_decorators, { kind: "field", name: "_mode", static: false, private: false, access: { has: obj => "_mode" in obj, get: obj => obj._mode, set: (obj, value) => { obj._mode = value; } }, metadata: _metadata }, __mode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __color_decorators, { kind: "field", name: "_color", static: false, private: false, access: { has: obj => "_color" in obj, get: obj => obj._color, set: (obj, value) => { obj._color = value; } }, metadata: _metadata }, __color_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _colorMin_decorators, { kind: "field", name: "colorMin", static: false, private: false, access: { has: obj => "colorMin" in obj, get: obj => obj.colorMin, set: (obj, value) => { obj.colorMin = value; } }, metadata: _metadata }, _colorMin_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _colorMax_decorators, { kind: "field", name: "colorMax", static: false, private: false, access: { has: obj => "colorMax" in obj, get: obj => obj.colorMax, set: (obj, value) => { obj.colorMax = value; } }, metadata: _metadata }, _colorMax_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _gradient_decorators, { kind: "field", name: "gradient", static: false, private: false, access: { has: obj => "gradient" in obj, get: obj => obj.gradient, set: (obj, value) => { obj.gradient = value; } }, metadata: _metadata }, _gradient_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _gradientMin_decorators, { kind: "field", name: "gradientMin", static: false, private: false, access: { has: obj => "gradientMin" in obj, get: obj => obj.gradientMin, set: (obj, value) => { obj.gradientMin = value; } }, metadata: _metadata }, _gradientMin_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _gradientMax_decorators, { kind: "field", name: "gradientMax", static: false, private: false, access: { has: obj => "gradientMax" in obj, get: obj => obj.gradientMax, set: (obj, value) => { obj.gradientMax = value; } }, metadata: _metadata }, _gradientMax_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GradientRange = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Mode = Mode;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GradientRange = _classThis;
})();
exports.default = GradientRange;
CC_EDITOR && (GradientRange.prototype._onBeforeSerialize = function (props) { return SerializableTable[this._mode]; });
cc.GradientRange = GradientRange;
