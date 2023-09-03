"use strict";
/****************************************************************************
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = __importDefault(require("../../renderer/enums"));
const color_1 = __importDefault(require("../value-types/color"));
const value_types_1 = require("../value-types");
let RendererLight = null;
if (CC_JSB && CC_NATIVERENDERER) {
    // @ts-ignore
    RendererLight = window.renderer.Light;
}
else {
    // @ts-ignore
    RendererLight = require('../../renderer/scene/light');
}
const index_1 = __importDefault(require("../renderer/index"));
const CCEnum_1 = __importDefault(require("../platform/CCEnum"));
const CCComponent_1 = __importDefault(require("../components/CCComponent"));
const CCClassDecorator_1 = require("../platform/CCClassDecorator");
/**
 * !#en The light source type
 *
 * !#zh 光源类型
 * @static
 * @enum Light.Type
 */
const LightType = (0, CCEnum_1.default)({
    /**
     * !#en The direction of light
     *
     * !#zh 平行光
     * @property {Number} DIRECTIONAL
     * @readonly
     */
    DIRECTIONAL: 0,
    /**
     * !#en The point of light
     *
     * !#zh 点光源
     * @property {Number} POINT
     * @readonly
     */
    POINT: 1,
    /**
     * !#en The spot of light
     *
     * !#zh 聚光灯
     * @property {Number} SPOT
     * @readonly
     */
    SPOT: 2,
    /**
     * !#en The ambient light
     * !#zh 环境光
     * @property {Number} AMBIENT
     * @readonly
     */
    AMBIENT: 3
});
/**
 * !#en The shadow type
 *
 * !#zh 阴影类型
 * @static
 * @enum Light.ShadowType
 */
const LightShadowType = (0, CCEnum_1.default)({
    /**
     * !#en No shadows
     *
     * !#zh 阴影关闭
     * @property NONE
     * @readonly
     * @type {Number}
     */
    NONE: 0,
    /**
     * !#en Hard shadows
     *
     * !#zh 阴硬影
     * @property HARD
     * @readonly
     * @type {Number}
     */
    HARD: 2,
    /**
     * !#en Soft PCF 3x3 shadows
     *
     * !#zh PCF 3x3 软阴影
     * @property SOFT_PCF3X3
     * @readonly
     * @type {Number}
     */
    SOFT_PCF3X3: 3,
    /**
     * !#en Soft PCF 5x5 shadows
     *
     * !#zh PCF 5x5 软阴影
     * @property SOFT_PCF5X5
     * @readonly
     * @type {Number}
     */
    SOFT_PCF5X5: 4,
});
let Light = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.Light'), (0, CCClassDecorator_1.menu)('i18n:MAIN_MENU.component.renderers/Light'), CCClassDecorator_1.executeInEditMode, (0, CCClassDecorator_1.inspector)('packages://inspector/inspectors/comps/light.js')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = CCComponent_1.default;
    let _instanceExtraInitializers = [];
    let __type_decorators;
    let __type_initializers = [];
    let __color_decorators;
    let __color_initializers = [];
    let __intensity_decorators;
    let __intensity_initializers = [];
    let __range_decorators;
    let __range_initializers = [];
    let __spotAngle_decorators;
    let __spotAngle_initializers = [];
    let __spotExp_decorators;
    let __spotExp_initializers = [];
    let __shadowType_decorators;
    let __shadowType_initializers = [];
    let __shadowResolution_decorators;
    let __shadowResolution_initializers = [];
    let __shadowDarkness_decorators;
    let __shadowDarkness_initializers = [];
    let __shadowMinDepth_decorators;
    let __shadowMinDepth_initializers = [];
    let __shadowMaxDepth_decorators;
    let __shadowMaxDepth_initializers = [];
    let __shadowFrustumSize_decorators;
    let __shadowFrustumSize_initializers = [];
    let __shadowBias_decorators;
    let __shadowBias_initializers = [];
    let _get_type_decorators;
    let _get_color_decorators;
    let _get_intensity_decorators;
    let _get_range_decorators;
    let _get_spotAngle_decorators;
    let _get_spotExp_decorators;
    let _get_shadowType_decorators;
    let _get_shadowResolution_decorators;
    let _get_shadowDarkness_decorators;
    let _get_shadowMinDepth_decorators;
    let _get_shadowMaxDepth_decorators;
    let _get_shadowFrustumSize_decorators;
    var Light = _classThis = class extends _classSuper {
        /**
         * !#en The light source type，currently we have directional, point, spot three type.
         * !#zh 光源类型，目前有 平行光，聚光灯，点光源 三种类型
         * @type {LightType}
         */
        get type() {
            return this._type;
        }
        set type(val) {
            this._type = val;
            let type = enums_1.default.LIGHT_DIRECTIONAL;
            if (val === LightType.POINT) {
                type = enums_1.default.LIGHT_POINT;
            }
            else if (val === LightType.SPOT) {
                type = enums_1.default.LIGHT_SPOT;
            }
            else if (val === LightType.AMBIENT) {
                type = enums_1.default.LIGHT_AMBIENT;
            }
            this._light.setType(type);
        }
        /**
         * !#en The light source color
         * !#zh 光源颜色
         * @type {Color}
         */
        get color() {
            return this._color;
        }
        set color(val) {
            if (!this._color.equals(val)) {
                this._color.set(val);
            }
            this._light.setColor(val.r / 255, val.g / 255, val.b / 255);
        }
        /**
         * !#en The light source intensity
         *
         * !#zh 光源强度
         * @type {Number}
         */
        get intensity() {
            return this._intensity;
        }
        set intensity(val) {
            this._intensity = val;
            this._light.setIntensity(val);
        }
        /**
         * !#en The light range, used for spot and point light
         *
         * !#zh 针对聚光灯和点光源设置光源范围
         * @type {Number}
         */
        get range() {
            return this._range;
        }
        set range(val) {
            this._range = val;
            this._light.setRange(val);
        }
        /**
         * !#en The spot light cone angle
         *
         * !#zh 聚光灯锥角
         * @type {Number}
         */
        get spotAngle() {
            return this._spotAngle;
        }
        set spotAngle(val) {
            this._spotAngle = val;
            this._light.setSpotAngle((0, value_types_1.toRadian)(val));
        }
        /**
         * !#en The spot light exponential
         *
         * !#zh 聚光灯指数
         * @type {Number}
         */
        get spotExp() {
            return this._spotExp;
        }
        set spotExp(val) {
            this._spotExp = val;
            this._light.setSpotExp(val);
        }
        /**
         * !#en The shadow type
         *
         * !#zh 阴影类型
         * @type {Number} shadowType
         */
        get shadowType() {
            return this._shadowType;
        }
        set shadowType(val) {
            this._shadowType = val;
            this._light.setShadowType(val);
        }
        /**
         * !#en The shadow resolution
         *
         * !#zh 阴影分辨率
         *
         * @type {Number}
         */
        get shadowResolution() {
            return this._shadowResolution;
        }
        set shadowResolution(val) {
            this._shadowResolution = val;
            this._light.setShadowResolution(val);
        }
        /**
         * !#en The shadow darkness
         *
         * !#zh 阴影灰度值
         *
         * @type {Number}
         */
        get shadowDarkness() {
            return this._shadowDarkness;
        }
        set shadowDarkness(val) {
            this._shadowDarkness = val;
            this._light.setShadowDarkness(val);
        }
        /**
         * !#en The shadow min depth
         *
         * !#zh 阴影最小深度
         *
         * @type {Number}
         */
        get shadowMinDepth() {
            return this._shadowMinDepth;
        }
        set shadowMinDepth(val) {
            this._shadowMinDepth = val;
            this._light.setShadowMinDepth(val);
        }
        /**
         * !#en The shadow max depth
         *
         * !#zh 阴影最大深度
         *
         * @type {Number}
         */
        get shadowMaxDepth() {
            return this._shadowMaxDepth;
        }
        set shadowMaxDepth(val) {
            this._shadowMaxDepth = val;
            this._light.setShadowMaxDepth(val);
        }
        /**
         * !#en The shadow frustum size
         *
         * !#zh 阴影截锥体大小
         *
         * @type {Number}
         */
        get shadowFrustumSize() {
            return this._shadowFrustumSize;
        }
        set shadowFrustumSize(val) {
            this._shadowFrustumSize = val;
            this._light.setShadowFrustumSize(val);
        }
        constructor() {
            super();
            this._type = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __type_initializers, LightType.DIRECTIONAL));
            this._color = __runInitializers(this, __color_initializers, color_1.default.WHITE);
            this._intensity = __runInitializers(this, __intensity_initializers, 1);
            this._range = __runInitializers(this, __range_initializers, 1000);
            this._spotAngle = __runInitializers(this, __spotAngle_initializers, 60);
            this._spotExp = __runInitializers(this, __spotExp_initializers, 1);
            this._shadowType = __runInitializers(this, __shadowType_initializers, LightShadowType.NONE);
            this._shadowResolution = __runInitializers(this, __shadowResolution_initializers, 1024);
            this._shadowDarkness = __runInitializers(this, __shadowDarkness_initializers, 0.5);
            this._shadowMinDepth = __runInitializers(this, __shadowMinDepth_initializers, 1);
            this._shadowMaxDepth = __runInitializers(this, __shadowMaxDepth_initializers, 4096);
            this._shadowFrustumSize = __runInitializers(this, __shadowFrustumSize_initializers, 1024);
            this._shadowBias = __runInitializers(this, __shadowBias_initializers, 0.0005);
            this._light = new RendererLight();
        }
        onLoad() {
            this._light.setNode(this.node);
            this.type = this._type;
            this.color = this._color;
            this.intensity = this._intensity;
            this.range = this._range;
            this.spotAngle = this._spotAngle;
            this.spotExp = this._spotExp;
            this.shadowType = this._shadowType;
            this.shadowResolution = this._shadowResolution;
            this.shadowDarkness = this._shadowDarkness;
            this.shadowMaxDepth = this._shadowMaxDepth;
            this.shadowFrustumSize = this._shadowFrustumSize;
            this.shadowBias = this._shadowBias;
        }
        onEnable() {
            index_1.default.scene.addLight(this._light);
        }
        onDisable() {
            index_1.default.scene.removeLight(this._light);
        }
    };
    __setFunctionName(_classThis, "Light");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __type_decorators = [CCClassDecorator_1.property];
        __color_decorators = [CCClassDecorator_1.property];
        __intensity_decorators = [CCClassDecorator_1.property];
        __range_decorators = [CCClassDecorator_1.property];
        __spotAngle_decorators = [CCClassDecorator_1.property];
        __spotExp_decorators = [CCClassDecorator_1.property];
        __shadowType_decorators = [CCClassDecorator_1.property];
        __shadowResolution_decorators = [CCClassDecorator_1.property];
        __shadowDarkness_decorators = [CCClassDecorator_1.property];
        __shadowMinDepth_decorators = [CCClassDecorator_1.property];
        __shadowMaxDepth_decorators = [CCClassDecorator_1.property];
        __shadowFrustumSize_decorators = [CCClassDecorator_1.property];
        __shadowBias_decorators = [CCClassDecorator_1.property];
        _get_type_decorators = [(0, CCClassDecorator_1.property)({
                type: LightType
            })];
        _get_color_decorators = [CCClassDecorator_1.property];
        _get_intensity_decorators = [CCClassDecorator_1.property];
        _get_range_decorators = [CCClassDecorator_1.property];
        _get_spotAngle_decorators = [CCClassDecorator_1.property];
        _get_spotExp_decorators = [CCClassDecorator_1.property];
        _get_shadowType_decorators = [(0, CCClassDecorator_1.property)({
                type: LightShadowType
            })];
        _get_shadowResolution_decorators = [CCClassDecorator_1.property];
        _get_shadowDarkness_decorators = [CCClassDecorator_1.property];
        _get_shadowMinDepth_decorators = [CCClassDecorator_1.property];
        _get_shadowMaxDepth_decorators = [CCClassDecorator_1.property];
        _get_shadowFrustumSize_decorators = [CCClassDecorator_1.property];
        __esDecorate(_classThis, null, _get_type_decorators, { kind: "getter", name: "type", static: false, private: false, access: { has: obj => "type" in obj, get: obj => obj.type }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_color_decorators, { kind: "getter", name: "color", static: false, private: false, access: { has: obj => "color" in obj, get: obj => obj.color }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_intensity_decorators, { kind: "getter", name: "intensity", static: false, private: false, access: { has: obj => "intensity" in obj, get: obj => obj.intensity }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_range_decorators, { kind: "getter", name: "range", static: false, private: false, access: { has: obj => "range" in obj, get: obj => obj.range }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_spotAngle_decorators, { kind: "getter", name: "spotAngle", static: false, private: false, access: { has: obj => "spotAngle" in obj, get: obj => obj.spotAngle }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_spotExp_decorators, { kind: "getter", name: "spotExp", static: false, private: false, access: { has: obj => "spotExp" in obj, get: obj => obj.spotExp }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowType_decorators, { kind: "getter", name: "shadowType", static: false, private: false, access: { has: obj => "shadowType" in obj, get: obj => obj.shadowType }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowResolution_decorators, { kind: "getter", name: "shadowResolution", static: false, private: false, access: { has: obj => "shadowResolution" in obj, get: obj => obj.shadowResolution }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowDarkness_decorators, { kind: "getter", name: "shadowDarkness", static: false, private: false, access: { has: obj => "shadowDarkness" in obj, get: obj => obj.shadowDarkness }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowMinDepth_decorators, { kind: "getter", name: "shadowMinDepth", static: false, private: false, access: { has: obj => "shadowMinDepth" in obj, get: obj => obj.shadowMinDepth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowMaxDepth_decorators, { kind: "getter", name: "shadowMaxDepth", static: false, private: false, access: { has: obj => "shadowMaxDepth" in obj, get: obj => obj.shadowMaxDepth }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shadowFrustumSize_decorators, { kind: "getter", name: "shadowFrustumSize", static: false, private: false, access: { has: obj => "shadowFrustumSize" in obj, get: obj => obj.shadowFrustumSize }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __type_decorators, { kind: "field", name: "_type", static: false, private: false, access: { has: obj => "_type" in obj, get: obj => obj._type, set: (obj, value) => { obj._type = value; } }, metadata: _metadata }, __type_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __color_decorators, { kind: "field", name: "_color", static: false, private: false, access: { has: obj => "_color" in obj, get: obj => obj._color, set: (obj, value) => { obj._color = value; } }, metadata: _metadata }, __color_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __intensity_decorators, { kind: "field", name: "_intensity", static: false, private: false, access: { has: obj => "_intensity" in obj, get: obj => obj._intensity, set: (obj, value) => { obj._intensity = value; } }, metadata: _metadata }, __intensity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __range_decorators, { kind: "field", name: "_range", static: false, private: false, access: { has: obj => "_range" in obj, get: obj => obj._range, set: (obj, value) => { obj._range = value; } }, metadata: _metadata }, __range_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __spotAngle_decorators, { kind: "field", name: "_spotAngle", static: false, private: false, access: { has: obj => "_spotAngle" in obj, get: obj => obj._spotAngle, set: (obj, value) => { obj._spotAngle = value; } }, metadata: _metadata }, __spotAngle_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __spotExp_decorators, { kind: "field", name: "_spotExp", static: false, private: false, access: { has: obj => "_spotExp" in obj, get: obj => obj._spotExp, set: (obj, value) => { obj._spotExp = value; } }, metadata: _metadata }, __spotExp_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowType_decorators, { kind: "field", name: "_shadowType", static: false, private: false, access: { has: obj => "_shadowType" in obj, get: obj => obj._shadowType, set: (obj, value) => { obj._shadowType = value; } }, metadata: _metadata }, __shadowType_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowResolution_decorators, { kind: "field", name: "_shadowResolution", static: false, private: false, access: { has: obj => "_shadowResolution" in obj, get: obj => obj._shadowResolution, set: (obj, value) => { obj._shadowResolution = value; } }, metadata: _metadata }, __shadowResolution_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowDarkness_decorators, { kind: "field", name: "_shadowDarkness", static: false, private: false, access: { has: obj => "_shadowDarkness" in obj, get: obj => obj._shadowDarkness, set: (obj, value) => { obj._shadowDarkness = value; } }, metadata: _metadata }, __shadowDarkness_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowMinDepth_decorators, { kind: "field", name: "_shadowMinDepth", static: false, private: false, access: { has: obj => "_shadowMinDepth" in obj, get: obj => obj._shadowMinDepth, set: (obj, value) => { obj._shadowMinDepth = value; } }, metadata: _metadata }, __shadowMinDepth_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowMaxDepth_decorators, { kind: "field", name: "_shadowMaxDepth", static: false, private: false, access: { has: obj => "_shadowMaxDepth" in obj, get: obj => obj._shadowMaxDepth, set: (obj, value) => { obj._shadowMaxDepth = value; } }, metadata: _metadata }, __shadowMaxDepth_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowFrustumSize_decorators, { kind: "field", name: "_shadowFrustumSize", static: false, private: false, access: { has: obj => "_shadowFrustumSize" in obj, get: obj => obj._shadowFrustumSize, set: (obj, value) => { obj._shadowFrustumSize = value; } }, metadata: _metadata }, __shadowFrustumSize_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shadowBias_decorators, { kind: "field", name: "_shadowBias", static: false, private: false, access: { has: obj => "_shadowBias" in obj, get: obj => obj._shadowBias, set: (obj, value) => { obj._shadowBias = value; } }, metadata: _metadata }, __shadowBias_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Light = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
    })();
    // /**
    //  * !#en The shadow bias
    //  *
    //  * !#zh 阴影偏移量
    //  *
    //  * @type {Number}
    //  */
    // @property
    // get shadowBias() {
    //     return this._shadowBias;
    // }
    // set shadowBias(val) {
    //     this._shadowBias = val;
    //     this._light.setShadowBias(val);
    // }
    _classThis.Type = LightType;
    _classThis.ShadowType = LightShadowType;
    (() => {
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Light = _classThis;
})();
exports.default = Light;
cc.Light = Light;
