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
const value_types_1 = require("../../../value-types");
const curve_range_1 = __importDefault(require("./curve-range"));
// tslint:disable: max-line-length
const TEXTURE_ANIMATION_RAND_OFFSET = 90794;
/**
 * 粒子贴图动画类型
 * @enum textureAnimationModule.Mode
 */
const Mode = (0, CCEnum_1.default)({
    /**
     * 网格类型
     */
    Grid: 0,
    /**
     * 精灵类型（暂未支持）
     */
    //Sprites: 1,
});
/**
 * 贴图动画的播放方式
 * @enum textureAnimationModule.Animation
 */
const Animation = (0, CCEnum_1.default)({
    /**
     * 播放贴图中的所有帧
     */
    WholeSheet: 0,
    /**
     * 播放贴图中的其中一行动画
     */
    SingleRow: 1,
});
let TextureAnimationModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.TextureAnimationModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let __enable_decorators;
    let __enable_initializers = [];
    let _get_enable_decorators;
    let __mode_decorators;
    let __mode_initializers = [];
    let _get_mode_decorators;
    let __numTilesX_decorators;
    let __numTilesX_initializers = [];
    let _get_numTilesX_decorators;
    let __numTilesY_decorators;
    let __numTilesY_initializers = [];
    let _get_numTilesY_decorators;
    let _animation_decorators;
    let _animation_initializers = [];
    let _randomRow_decorators;
    let _randomRow_initializers = [];
    let _rowIndex_decorators;
    let _rowIndex_initializers = [];
    let _frameOverTime_decorators;
    let _frameOverTime_initializers = [];
    let _startFrame_decorators;
    let _startFrame_initializers = [];
    let _cycleCount_decorators;
    let _cycleCount_initializers = [];
    let _get_flipU_decorators;
    let _get_flipV_decorators;
    let _get_uvChannelMask_decorators;
    var TextureAnimationModule = _classThis = class {
        constructor() {
            this._enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __enable_initializers, false));
            this._mode = __runInitializers(this, __mode_initializers, Mode.Grid);
            this._numTilesX = __runInitializers(this, __numTilesX_initializers, 0);
            this._numTilesY = __runInitializers(this, __numTilesY_initializers, 0);
            /**
             * !#en The way of the animation plays.
             * !#zh 动画播放方式。
             * @property {Animation} animation
             */
            this.animation = __runInitializers(this, _animation_initializers, Animation.WholeSheet);
            /**
             * !#en Randomly select a line from the animated map to generate the animation. <br>
             * This option only takes effect when the animation playback mode is SingleRow.
             * !#zh 随机从动画贴图中选择一行以生成动画。<br>
             * 此选项仅在动画播放方式为 SingleRow 时生效。
             * @property {Boolean} randomRow
             */
            this.randomRow = __runInitializers(this, _randomRow_initializers, false);
            /**
             * !#en Select specific lines from the animation map to generate the animation. <br>
             * This option is only available when the animation playback mode is SingleRow and randomRow is disabled.
             * !#zh 从动画贴图中选择特定行以生成动画。<br>
             * 此选项仅在动画播放方式为 SingleRow 时且禁用 randomRow 时可用。
             * @property {Number} rowIndex
             */
            this.rowIndex = __runInitializers(this, _rowIndex_initializers, 0);
            /**
             * !#en Frame and time curve of animation playback in one cycle.
             * !#zh 一个周期内动画播放的帧与时间变化曲线。
             * @property {CurveRange} frameOverTime
             */
            this.frameOverTime = __runInitializers(this, _frameOverTime_initializers, new curve_range_1.default());
            /**
             * !#en Play from which frames, the time is the life cycle of the entire particle system.
             * !#zh 从第几帧开始播放，时间为整个粒子系统的生命周期。
             * @property {CurveRange} startFrame
             */
            this.startFrame = __runInitializers(this, _startFrame_initializers, new curve_range_1.default());
            /**
             * !#en Number of playback loops in a life cycle.
             * !#zh 一个生命周期内播放循环的次数。
             * @property {Number} cycleCount
             */
            this.cycleCount = __runInitializers(this, _cycleCount_initializers, 0);
            this._flipU = 0;
            this._flipV = 0;
            this._uvChannelMask = -1;
            this.ps = null;
        }
        /**
         * !#en The enable of TextureAnimationModule.
         * !#zh 是否启用
         * @property {Boolean} enable
         */
        get enable() {
            return this._enable;
        }
        set enable(val) {
            this._enable = val;
            this.ps._assembler._updateMaterialParams();
        }
        /**
         * !#en Set the type of particle map animation (only supports Grid mode for the time being)
         * !#zh 设定粒子贴图动画的类型（暂只支持 Grid 模式。
         * @property {Mode} mode
         */
        get mode() {
            return this._mode;
        }
        set mode(val) {
            if (val !== Mode.Grid) {
                console.error('particle texture animation\'s sprites is not supported!');
                return;
            }
        }
        /**
         * !#en Animation frames in X direction.
         * !#zh X 方向动画帧数。
         * @property {Number} numTilesX
         */
        get numTilesX() {
            return this._numTilesX;
        }
        ;
        set numTilesX(val) {
            if (this._numTilesX === val)
                return;
            this._numTilesX = val;
            if (this.ps && this.ps._assembler)
                this.ps._assembler._updateMaterialParams();
        }
        /**
         * !#en Animation frames in Y direction.
         * !#zh Y 方向动画帧数。
         * @property {Number} numTilesY
         */
        get numTilesY() {
            return this._numTilesY;
        }
        set numTilesY(val) {
            if (this._numTilesY === val)
                return;
            this._numTilesY = val;
            if (this.ps && this.ps._assembler)
                this.ps._assembler._updateMaterialParams();
        }
        get flipU() {
            return this._flipU;
        }
        set flipU(val) {
            console.error('particle texture animation\'s flipU is not supported!');
        }
        get flipV() {
            return this._flipV;
        }
        set flipV(val) {
            console.error('particle texture animation\'s flipV is not supported!');
        }
        get uvChannelMask() {
            return this._uvChannelMask;
        }
        set uvChannelMask(val) {
            console.error('particle texture animation\'s uvChannelMask is not supported!');
        }
        onInit(ps) {
            this.ps = ps;
        }
        init(p) {
            p.startRow = Math.floor(Math.random() * this.numTilesY);
        }
        animate(p) {
            const normalizedTime = 1 - p.remainingLifetime / p.startLifetime;
            const startFrame = this.startFrame.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) / (this.numTilesX * this.numTilesY);
            if (this.animation === Animation.WholeSheet) {
                p.frameIndex = (0, value_types_1.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
            }
            else if (this.animation === Animation.SingleRow) {
                const rowLength = 1 / this.numTilesY;
                if (this.randomRow) {
                    const f = (0, value_types_1.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1);
                    const from = p.startRow * rowLength;
                    const to = from + rowLength;
                    p.frameIndex = (0, value_types_1.lerp)(from, to, f);
                }
                else {
                    const from = this.rowIndex * rowLength;
                    const to = from + rowLength;
                    p.frameIndex = (0, value_types_1.lerp)(from, to, (0, value_types_1.repeat)(this.cycleCount * (this.frameOverTime.evaluate(normalizedTime, (0, value_types_1.pseudoRandom)(p.randomSeed + TEXTURE_ANIMATION_RAND_OFFSET)) + startFrame), 1));
                }
            }
        }
    };
    __setFunctionName(_classThis, "TextureAnimationModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __enable_decorators = [CCClassDecorator_1.property];
        _get_enable_decorators = [CCClassDecorator_1.property];
        __mode_decorators = [CCClassDecorator_1.property];
        _get_mode_decorators = [(0, CCClassDecorator_1.property)({
                type: Mode,
            })];
        __numTilesX_decorators = [CCClassDecorator_1.property];
        _get_numTilesX_decorators = [CCClassDecorator_1.property];
        __numTilesY_decorators = [CCClassDecorator_1.property];
        _get_numTilesY_decorators = [CCClassDecorator_1.property];
        _animation_decorators = [(0, CCClassDecorator_1.property)({
                type: Animation,
            })];
        _randomRow_decorators = [CCClassDecorator_1.property];
        _rowIndex_decorators = [CCClassDecorator_1.property];
        _frameOverTime_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        _startFrame_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        _cycleCount_decorators = [CCClassDecorator_1.property];
        _get_flipU_decorators = [CCClassDecorator_1.property];
        _get_flipV_decorators = [CCClassDecorator_1.property];
        _get_uvChannelMask_decorators = [CCClassDecorator_1.property];
        __esDecorate(_classThis, null, _get_enable_decorators, { kind: "getter", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_mode_decorators, { kind: "getter", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_numTilesX_decorators, { kind: "getter", name: "numTilesX", static: false, private: false, access: { has: obj => "numTilesX" in obj, get: obj => obj.numTilesX }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_numTilesY_decorators, { kind: "getter", name: "numTilesY", static: false, private: false, access: { has: obj => "numTilesY" in obj, get: obj => obj.numTilesY }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_flipU_decorators, { kind: "getter", name: "flipU", static: false, private: false, access: { has: obj => "flipU" in obj, get: obj => obj.flipU }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_flipV_decorators, { kind: "getter", name: "flipV", static: false, private: false, access: { has: obj => "flipV" in obj, get: obj => obj.flipV }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_uvChannelMask_decorators, { kind: "getter", name: "uvChannelMask", static: false, private: false, access: { has: obj => "uvChannelMask" in obj, get: obj => obj.uvChannelMask }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __enable_decorators, { kind: "field", name: "_enable", static: false, private: false, access: { has: obj => "_enable" in obj, get: obj => obj._enable, set: (obj, value) => { obj._enable = value; } }, metadata: _metadata }, __enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __mode_decorators, { kind: "field", name: "_mode", static: false, private: false, access: { has: obj => "_mode" in obj, get: obj => obj._mode, set: (obj, value) => { obj._mode = value; } }, metadata: _metadata }, __mode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __numTilesX_decorators, { kind: "field", name: "_numTilesX", static: false, private: false, access: { has: obj => "_numTilesX" in obj, get: obj => obj._numTilesX, set: (obj, value) => { obj._numTilesX = value; } }, metadata: _metadata }, __numTilesX_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __numTilesY_decorators, { kind: "field", name: "_numTilesY", static: false, private: false, access: { has: obj => "_numTilesY" in obj, get: obj => obj._numTilesY, set: (obj, value) => { obj._numTilesY = value; } }, metadata: _metadata }, __numTilesY_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _animation_decorators, { kind: "field", name: "animation", static: false, private: false, access: { has: obj => "animation" in obj, get: obj => obj.animation, set: (obj, value) => { obj.animation = value; } }, metadata: _metadata }, _animation_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _randomRow_decorators, { kind: "field", name: "randomRow", static: false, private: false, access: { has: obj => "randomRow" in obj, get: obj => obj.randomRow, set: (obj, value) => { obj.randomRow = value; } }, metadata: _metadata }, _randomRow_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rowIndex_decorators, { kind: "field", name: "rowIndex", static: false, private: false, access: { has: obj => "rowIndex" in obj, get: obj => obj.rowIndex, set: (obj, value) => { obj.rowIndex = value; } }, metadata: _metadata }, _rowIndex_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _frameOverTime_decorators, { kind: "field", name: "frameOverTime", static: false, private: false, access: { has: obj => "frameOverTime" in obj, get: obj => obj.frameOverTime, set: (obj, value) => { obj.frameOverTime = value; } }, metadata: _metadata }, _frameOverTime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startFrame_decorators, { kind: "field", name: "startFrame", static: false, private: false, access: { has: obj => "startFrame" in obj, get: obj => obj.startFrame, set: (obj, value) => { obj.startFrame = value; } }, metadata: _metadata }, _startFrame_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _cycleCount_decorators, { kind: "field", name: "cycleCount", static: false, private: false, access: { has: obj => "cycleCount" in obj, get: obj => obj.cycleCount, set: (obj, value) => { obj.cycleCount = value; } }, metadata: _metadata }, _cycleCount_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TextureAnimationModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TextureAnimationModule = _classThis;
})();
exports.default = TextureAnimationModule;
