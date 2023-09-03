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
exports.Gradient = exports.AlphaKey = exports.ColorKey = void 0;
const CCClassDecorator_1 = require("../../../platform/CCClassDecorator");
const CCEnum_1 = __importDefault(require("../../../platform/CCEnum"));
const value_types_1 = require("../../../value-types");
// tslint:disable: max-line-length
const Mode = (0, CCEnum_1.default)({
    Blend: 0,
    Fixed: 1,
});
/**
 * !#en The color key of gradient.
 * !#zh color 关键帧
 * @class ColorKey
 */
let ColorKey = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.ColorKey')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _color_decorators;
    let _color_initializers = [];
    let _time_decorators;
    let _time_initializers = [];
    var ColorKey = _classThis = class {
        constructor() {
            /**
             * !#en Color value.
             * !#zh 颜色值。
             * @property {Color} color
             */
            this.color = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _color_initializers, cc.Color.WHITE.clone()));
            /**
             * !#en Time value.
             * !#zh 时间值。
             * @property {Number} time
             */
            this.time = __runInitializers(this, _time_initializers, 0);
        }
    };
    __setFunctionName(_classThis, "ColorKey");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _color_decorators = [CCClassDecorator_1.property];
        _time_decorators = [CCClassDecorator_1.property];
        __esDecorate(null, null, _color_decorators, { kind: "field", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color, set: (obj, value) => { obj.color = value; } }, metadata: _metadata }, _color_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _time_decorators, { kind: "field", name: "time", static: false, private: false, access: { has: obj => "time" in obj, get: obj => obj.time, set: (obj, value) => { obj.time = value; } }, metadata: _metadata }, _time_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ColorKey = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ColorKey = _classThis;
})();
exports.ColorKey = ColorKey;
/**
 * !#en The alpha key of gradient.
 * !#zh alpha 关键帧
 * @class AlphaKey
 */
let AlphaKey = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.AlphaKey')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _alpha_decorators;
    let _alpha_initializers = [];
    let _time_decorators;
    let _time_initializers = [];
    var AlphaKey = _classThis = class {
        constructor() {
            /**
             * !#en Alpha value.
             * !#zh 透明度。
             * @property {Number} alpha
             */
            this.alpha = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _alpha_initializers, 1));
            /**
             * !#en Time.
             * !#zh 时间帧。
             * @property {Number} time
             */
            this.time = __runInitializers(this, _time_initializers, 0);
        }
    };
    __setFunctionName(_classThis, "AlphaKey");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _alpha_decorators = [CCClassDecorator_1.property];
        _time_decorators = [CCClassDecorator_1.property];
        __esDecorate(null, null, _alpha_decorators, { kind: "field", name: "alpha", static: false, private: false, access: { has: obj => "alpha" in obj, get: obj => obj.alpha, set: (obj, value) => { obj.alpha = value; } }, metadata: _metadata }, _alpha_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _time_decorators, { kind: "field", name: "time", static: false, private: false, access: { has: obj => "time" in obj, get: obj => obj.time, set: (obj, value) => { obj.time = value; } }, metadata: _metadata }, _time_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AlphaKey = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AlphaKey = _classThis;
})();
exports.AlphaKey = AlphaKey;
/**
 * !#en The gradient data of color.
 * !#zh 颜色渐变数据
 * @class Gradient
 */
let Gradient = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.Gradient')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _colorKeys_decorators;
    let _colorKeys_initializers = [];
    let _alphaKeys_decorators;
    let _alphaKeys_initializers = [];
    let _mode_decorators;
    let _mode_initializers = [];
    var Gradient = _classThis = class {
        constructor() {
            /**
             * !#en Array of color key.
             * !#zh 颜色关键帧列表。
             * @property {[ColorKey]} colorKeys
             */
            this.colorKeys = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _colorKeys_initializers, new Array()));
            /**
             * !#en Array of alpha key.
             * !#zh 透明度关键帧列表。
             * @property {[AlphaKey]} alphaKeys
             */
            this.alphaKeys = __runInitializers(this, _alphaKeys_initializers, new Array());
            /**
             * !#en Blend mode.
             * !#zh 混合模式。
             * @property {Mode} mode
             */
            this.mode = __runInitializers(this, _mode_initializers, Mode.Blend);
            this._color = null;
            this._color = cc.Color.WHITE.clone();
        }
        setKeys(colorKeys, alphaKeys) {
            this.colorKeys = colorKeys;
            this.alphaKeys = alphaKeys;
        }
        sortKeys() {
            if (this.colorKeys.length > 1) {
                this.colorKeys.sort((a, b) => a.time - b.time);
            }
            if (this.alphaKeys.length > 1) {
                this.alphaKeys.sort((a, b) => a.time - b.time);
            }
        }
        evaluate(time) {
            this.getRGB(time);
            this._color._fastSetA(this.getAlpha(time));
            return this._color;
        }
        randomColor() {
            const c = this.colorKeys[Math.trunc(Math.random() * this.colorKeys.length)];
            const a = this.alphaKeys[Math.trunc(Math.random() * this.alphaKeys.length)];
            this._color.set(c.color);
            this._color._fastSetA(a.alpha);
            return this._color;
        }
        getRGB(time) {
            if (this.colorKeys.length > 1) {
                time = (0, value_types_1.repeat)(time, 1);
                for (let i = 1; i < this.colorKeys.length; ++i) {
                    const preTime = this.colorKeys[i - 1].time;
                    const curTime = this.colorKeys[i].time;
                    if (time >= preTime && time < curTime) {
                        if (this.mode === Mode.Fixed) {
                            return this.colorKeys[i].color;
                        }
                        const factor = (time - preTime) / (curTime - preTime);
                        this.colorKeys[i - 1].color.lerp(this.colorKeys[i].color, factor, this._color);
                        return this._color;
                    }
                }
                const lastIndex = this.colorKeys.length - 1;
                if (time < this.colorKeys[0].time) {
                    cc.Color.BLACK.lerp(this.colorKeys[0].color, time / this.colorKeys[0].time, this._color);
                }
                else if (time > this.colorKeys[lastIndex].time) {
                    this.colorKeys[lastIndex].color.lerp(cc.Color.BLACK, (time - this.colorKeys[lastIndex].time) / (1 - this.colorKeys[lastIndex].time), this._color);
                }
                // console.warn('something went wrong. can not get gradient color.');
            }
            else if (this.colorKeys.length === 1) {
                this._color.set(this.colorKeys[0].color);
                return this._color;
            }
            else {
                this._color.set(cc.Color.WHITE);
                return this._color;
            }
        }
        getAlpha(time) {
            if (this.alphaKeys.length > 1) {
                time = (0, value_types_1.repeat)(time, 1);
                for (let i = 1; i < this.alphaKeys.length; ++i) {
                    const preTime = this.alphaKeys[i - 1].time;
                    const curTime = this.alphaKeys[i].time;
                    if (time >= preTime && time < curTime) {
                        if (this.mode === Mode.Fixed) {
                            return this.alphaKeys[i].alpha;
                        }
                        const factor = (time - preTime) / (curTime - preTime);
                        return (0, value_types_1.lerp)(this.alphaKeys[i - 1].alpha, this.alphaKeys[i].alpha, factor);
                    }
                }
                const lastIndex = this.alphaKeys.length - 1;
                if (time < this.alphaKeys[0].time) {
                    return (0, value_types_1.lerp)(255, this.alphaKeys[0].alpha, time / this.alphaKeys[0].time);
                }
                else if (time > this.alphaKeys[lastIndex].time) {
                    return (0, value_types_1.lerp)(this.alphaKeys[lastIndex].alpha, 255, (time - this.alphaKeys[lastIndex].time) / (1 - this.alphaKeys[lastIndex].time));
                }
            }
            else if (this.alphaKeys.length === 1) {
                return this.alphaKeys[0].alpha;
            }
            else {
                return 255;
            }
        }
    };
    __setFunctionName(_classThis, "Gradient");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _colorKeys_decorators = [(0, CCClassDecorator_1.property)({
                type: [ColorKey],
            })];
        _alphaKeys_decorators = [(0, CCClassDecorator_1.property)({
                type: [AlphaKey],
            })];
        _mode_decorators = [(0, CCClassDecorator_1.property)({
                type: Mode,
            })];
        __esDecorate(null, null, _colorKeys_decorators, { kind: "field", name: "colorKeys", static: false, private: false, access: { has: obj => "colorKeys" in obj, get: obj => obj.colorKeys, set: (obj, value) => { obj.colorKeys = value; } }, metadata: _metadata }, _colorKeys_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _alphaKeys_decorators, { kind: "field", name: "alphaKeys", static: false, private: false, access: { has: obj => "alphaKeys" in obj, get: obj => obj.alphaKeys, set: (obj, value) => { obj.alphaKeys = value; } }, metadata: _metadata }, _alphaKeys_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Gradient = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    _classThis.Mode = Mode;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Gradient = _classThis;
})();
exports.Gradient = Gradient;
cc.ColorKey = ColorKey;
cc.AlphaKey = AlphaKey;
cc.Gradient = Gradient;
