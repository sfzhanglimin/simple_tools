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
const gfx_1 = __importDefault(require("../../../../renderer/gfx"));
const pool_1 = __importDefault(require("../../../../renderer/memop/pool"));
const curve_range_1 = __importDefault(require("../animator/curve-range"));
const gradient_range_1 = __importDefault(require("../animator/gradient-range"));
const enum_1 = require("../enum");
const utils_1 = __importDefault(require("../utils"));
// tslint:disable: max-line-length
const PRE_TRIANGLE_INDEX = 1;
const NEXT_TRIANGLE_INDEX = 1 << 2;
const DIRECTION_THRESHOLD = Math.cos((0, value_types_1.toRadian)(100));
const _temp_trailEle = { position: cc.v3(), velocity: cc.v3() };
const _temp_quat = cc.quat();
const _temp_xform = cc.mat4();
const _temp_Vec3 = cc.v3();
const _temp_Vec3_1 = cc.v3();
const _temp_color = cc.color();
// var barycentric = [1, 0, 0, 0, 1, 0, 0, 0, 1]; // <wireframe debug>
// var _bcIdx = 0;
class ITrailElement {
}
// the valid element is in [start,end) range.if start equals -1,it represents the array is empty.
class TrailSegment {
    constructor(maxTrailElementNum) {
        this.trailElements = [];
        this.start = -1;
        this.end = -1;
        this.trailElements = [];
        while (maxTrailElementNum--) {
            this.trailElements.push({
                position: cc.v3(),
                lifetime: 0,
                width: 0,
                velocity: cc.v3(),
                direction: 0,
                color: cc.color(),
            });
        }
    }
    getElement(idx) {
        if (this.start === -1) {
            return null;
        }
        if (idx < 0) {
            idx = (idx + this.trailElements.length) % this.trailElements.length;
        }
        if (idx >= this.trailElements.length) {
            idx %= this.trailElements.length;
        }
        return this.trailElements[idx];
    }
    addElement() {
        if (this.trailElements.length === 0) {
            return null;
        }
        if (this.start === -1) {
            this.start = 0;
            this.end = 1;
            return this.trailElements[0];
        }
        if (this.start === this.end) {
            this.trailElements.splice(this.end, 0, {
                position: cc.v3(),
                lifetime: 0,
                width: 0,
                velocity: cc.v3(),
                direction: 0,
                color: cc.color(),
            });
            this.start++;
            this.start %= this.trailElements.length;
        }
        const newEleLoc = this.end++;
        this.end %= this.trailElements.length;
        return this.trailElements[newEleLoc];
    }
    iterateElement(target, f, p, dt) {
        const end = this.start >= this.end ? this.end + this.trailElements.length : this.end;
        for (let i = this.start; i < end; i++) {
            if (f(target, this.trailElements[i % this.trailElements.length], p, dt)) {
                this.start++;
                this.start %= this.trailElements.length;
            }
        }
        if (this.start === end) {
            this.start = -1;
            this.end = -1;
        }
    }
    count() {
        if (this.start < this.end) {
            return this.end - this.start;
        }
        else {
            return this.trailElements.length + this.end - this.start;
        }
    }
    clear() {
        this.start = -1;
        this.end = -1;
    }
}
let TrailModule = (() => {
    let _classDecorators = [(0, CCClassDecorator_1.ccclass)('cc.TrailModule')];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let __enable_decorators;
    let __enable_initializers = [];
    let _get_enable_decorators;
    let _mode_decorators;
    let _mode_initializers = [];
    let _lifeTime_decorators;
    let _lifeTime_initializers = [];
    let __minParticleDistance_decorators;
    let __minParticleDistance_initializers = [];
    let _get_minParticleDistance_decorators;
    let __space_decorators;
    let __space_initializers = [];
    let _get_space_decorators;
    let _existWithParticles_decorators;
    let _existWithParticles_initializers = [];
    let _textureMode_decorators;
    let _textureMode_initializers = [];
    let _widthFromParticle_decorators;
    let _widthFromParticle_initializers = [];
    let _widthRatio_decorators;
    let _widthRatio_initializers = [];
    let _colorFromParticle_decorators;
    let _colorFromParticle_initializers = [];
    let _colorOverTrail_decorators;
    let _colorOverTrail_initializers = [];
    let _colorOvertime_decorators;
    let _colorOvertime_initializers = [];
    var TrailModule = _classThis = class {
        /**
         * !#en The enable of trailModule.
         * !#zh 是否启用
         * @property {Boolean} enable
         */
        get enable() {
            return this._enable;
        }
        set enable(val) {
            if (val) {
                this._createTrailData();
            }
            if (val && !this._enable) {
                this._enable = val;
                this._particleSystem._assembler._updateTrailMaterial();
            }
            this._enable = val;
            this._particleSystem._assembler._updateTrailEnable(this._enable);
        }
        /**
         * !#en Minimum spacing between each track particle
         * !#zh 每个轨迹粒子之间的最小间距。
         * @property {Number} minParticleDistance
         */
        get minParticleDistance() {
            return this._minParticleDistance;
        }
        set minParticleDistance(val) {
            this._minParticleDistance = val;
            this._minSquaredDistance = val * val;
        }
        /**
         * !#en The coordinate system of trajectories.
         * !#zh 轨迹设定时的坐标系。
         * @property {Space} space
         */
        get space() {
            return this._space;
        }
        set space(val) {
            this._space = val;
            if (this._particleSystem) {
                this._particleSystem._assembler._updateTrailMaterial();
            }
        }
        constructor() {
            this._enable = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, __enable_initializers, false));
            /**
             * !#en Sets how particles generate trajectories.
             * !#zh 设定粒子生成轨迹的方式。
             * @property {TrailMode} mode
             */
            this.mode = __runInitializers(this, _mode_initializers, enum_1.TrailMode.Particles);
            /**
             * !#en Life cycle of trajectory.
             * !#zh 轨迹存在的生命周期。
             * @property {CurveRange} lifeTime
             */
            this.lifeTime = __runInitializers(this, _lifeTime_initializers, new curve_range_1.default());
            this._minParticleDistance = __runInitializers(this, __minParticleDistance_initializers, 0.1);
            this._space = __runInitializers(this, __space_initializers, enum_1.Space.World);
            /**
             * !#en Whether the particle itself exists.
             * !#zh 粒子本身是否存在。
             * @property {Boolean} existWithParticles
             */
            this.existWithParticles = __runInitializers(this, _existWithParticles_initializers, true);
            /**
             * !#en Set the texture fill method
             * !#zh 设定纹理填充方式。
             * @property {TextureMode} textureMode
             */
            this.textureMode = __runInitializers(this, _textureMode_initializers, enum_1.TextureMode.Stretch);
            /**
             * !#en Whether to use particle width
             * !#zh 是否使用粒子的宽度。
             * @property {Boolean} widthFromParticle
             */
            this.widthFromParticle = __runInitializers(this, _widthFromParticle_initializers, true);
            /**
             * !#en Curves that control track length
             * !#zh 控制轨迹长度的曲线。
             * @property {CurveRange} widthRatio
             */
            this.widthRatio = __runInitializers(this, _widthRatio_initializers, new curve_range_1.default());
            /**
             * !#en Whether to use particle color
             * !#zh 是否使用粒子的颜色。
             * @property {Boolean} colorFromParticle
             */
            this.colorFromParticle = __runInitializers(this, _colorFromParticle_initializers, false);
            /**
             * !#en The color of trajectories.
             * !#zh 轨迹的颜色。
             * @property {GradientRange} colorOverTrail
             */
            this.colorOverTrail = __runInitializers(this, _colorOverTrail_initializers, new gradient_range_1.default());
            /**
             * !#en Trajectories color over time.
             * !#zh 轨迹随时间变化的颜色。
             * @property {GradientRange} colorOvertime
             */
            this.colorOvertime = __runInitializers(this, _colorOvertime_initializers, new gradient_range_1.default());
            this._particleSystem = null;
            this._minSquaredDistance = 0;
            this._vertSize = 0;
            this._trailNum = 0;
            this._trailLifetime = 0;
            this.vbOffset = 0;
            this.ibOffset = 0;
            this._trailSegments = null;
            this._particleTrail = null;
            this._ia = null;
            this._gfxVFmt = null;
            this._vbF32 = null;
            this._vbUint32 = null;
            this._iBuffer = null;
            this._needTransform = null;
            this._defaultMat = null;
            this._material = null;
            this._gfxVFmt = new gfx_1.default.VertexFormat([
                { name: gfx_1.default.ATTR_POSITION, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
                { name: gfx_1.default.ATTR_TEX_COORD, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 4 },
                //{ name: gfx.ATTR_TEX_COORD2, type: gfx.ATTR_TYPE_FLOAT32, num: 3 }, // <wireframe debug>
                { name: gfx_1.default.ATTR_TEX_COORD1, type: gfx_1.default.ATTR_TYPE_FLOAT32, num: 3 },
                { name: gfx_1.default.ATTR_COLOR, type: gfx_1.default.ATTR_TYPE_UINT8, num: 4, normalize: true },
            ]);
            this._vertSize = this._gfxVFmt._bytes;
            this._particleTrail = new utils_1.default(); // Map<Particle, TrailSegment>();
        }
        onInit(ps) {
            this._particleSystem = ps;
            this.minParticleDistance = this._minParticleDistance;
            let burstCount = 0;
            for (const b of ps.bursts) {
                burstCount += b.getMaxCount(ps);
            }
            this.lifeTime.constant = 1;
            this._trailNum = Math.ceil(ps.startLifetime.getMax() * this.lifeTime.getMax() * 60 * (ps.rateOverTime.getMax() * ps.duration + burstCount));
            this._trailSegments = new pool_1.default(() => new TrailSegment(10), Math.ceil(ps.rateOverTime.getMax() * ps.duration));
            if (this._enable) {
                this.enable = this._enable;
                this._updateMaterial();
            }
        }
        onEnable() {
        }
        onDisable() {
        }
        destroy() {
            if (this._trailSegments) {
                this._trailSegments.clear((obj) => { obj.trailElements.length = 0; });
                this._trailSegments = null;
            }
        }
        clear() {
            if (this.enable) {
                const trailIter = this._particleTrail.values();
                let trail = trailIter.next();
                while (!trail.done) {
                    trail.value.clear();
                    trail = trailIter.next();
                }
                this._particleTrail.clear();
                this.updateTrailBuffer();
            }
        }
        _createTrailData() {
            let model = this._particleSystem._assembler._model;
            if (model) {
                model.createTrailData(this._gfxVFmt, this._trailNum);
                let subData = model._subDatas[1];
                this._vbF32 = subData.getVData();
                this._vbUint32 = subData.getVData(Uint32Array);
                this._iBuffer = subData.iData;
            }
        }
        _updateMaterial() {
            if (this._particleSystem) {
                const mat = this._particleSystem.trailMaterial;
                if (mat) {
                    this._material = mat;
                }
                else {
                    this._material = this._particleSystem._assembler._defaultTrailMat;
                }
            }
        }
        update() {
            this._trailLifetime = this.lifeTime.evaluate(this._particleSystem._time, 1);
            if (this.space === enum_1.Space.World && this._particleSystem._simulationSpace === enum_1.Space.Local) {
                this._needTransform = true;
                this._particleSystem.node.getWorldMatrix(_temp_xform);
                this._particleSystem.node.getWorldRotation(_temp_quat);
            }
            else {
                this._needTransform = false;
            }
        }
        animate(p, scaledDt) {
            if (!this._trailSegments) {
                return;
            }
            let trail = this._particleTrail.get(p);
            if (!trail) {
                trail = this._trailSegments.alloc();
                this._particleTrail.set(p, trail);
                return;
            }
            let lastSeg = trail.getElement(trail.end - 1);
            if (this._needTransform) {
                value_types_1.Vec3.transformMat4(_temp_Vec3, p.position, _temp_xform);
            }
            else {
                value_types_1.Vec3.copy(_temp_Vec3, p.position);
            }
            if (lastSeg) {
                trail.iterateElement(this, this._updateTrailElement, p, scaledDt);
                if (value_types_1.Vec3.squaredDistance(lastSeg.position, _temp_Vec3) < this._minSquaredDistance) {
                    return;
                }
            }
            lastSeg = trail.addElement();
            if (!lastSeg) {
                return;
            }
            value_types_1.Vec3.copy(lastSeg.position, _temp_Vec3);
            lastSeg.lifetime = 0;
            if (this.widthFromParticle) {
                lastSeg.width = p.size.x * this.widthRatio.evaluate(0, 1);
            }
            else {
                lastSeg.width = this.widthRatio.evaluate(0, 1);
            }
            const trailNum = trail.count();
            if (trailNum === 2) {
                const lastSecondTrail = trail.getElement(trail.end - 2);
                value_types_1.Vec3.subtract(lastSecondTrail.velocity, lastSeg.position, lastSecondTrail.position);
            }
            else if (trailNum > 2) {
                const lastSecondTrail = trail.getElement(trail.end - 2);
                const lastThirdTrail = trail.getElement(trail.end - 3);
                value_types_1.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, lastSecondTrail.position);
                value_types_1.Vec3.subtract(_temp_Vec3_1, lastSeg.position, lastSecondTrail.position);
                value_types_1.Vec3.subtract(lastSecondTrail.velocity, _temp_Vec3_1, _temp_Vec3);
                if (value_types_1.Vec3.equals(cc.Vec3.ZERO, lastSecondTrail.velocity)) {
                    value_types_1.Vec3.copy(lastSecondTrail.velocity, _temp_Vec3);
                }
            }
            if (this.colorFromParticle) {
                lastSeg.color.set(p.color);
            }
            else {
                lastSeg.color.set(this.colorOvertime.evaluate(0, 1));
            }
        }
        _updateTrailElement(trail, trailEle, p, dt) {
            trailEle.lifetime += dt;
            if (trail.colorFromParticle) {
                trailEle.color.set(p.color);
                trailEle.color.multiply(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
            }
            else {
                trailEle.color.set(trail.colorOvertime.evaluate(1.0 - p.remainingLifetime / p.startLifetime, 1));
            }
            if (trail.widthFromParticle) {
                trailEle.width = p.size.x * trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
            }
            else {
                trailEle.width = trail.widthRatio.evaluate(trailEle.lifetime / trail._trailLifetime, 1);
            }
            return trailEle.lifetime > trail._trailLifetime;
        }
        removeParticle(p) {
            const trail = this._particleTrail.get(p);
            if (trail && this._trailSegments) {
                trail.clear();
                this._trailSegments.free(trail);
                this._particleTrail.delete(p);
            }
        }
        updateTrailBuffer() {
            this.vbOffset = 0;
            this.ibOffset = 0;
            for (const p of this._particleTrail.keys()) {
                const trailSeg = this._particleTrail.get(p);
                if (trailSeg.start === -1) {
                    continue;
                }
                const indexOffset = this.vbOffset * 4 / this._vertSize;
                const end = trailSeg.start >= trailSeg.end ? trailSeg.end + trailSeg.trailElements.length : trailSeg.end;
                const trailNum = end - trailSeg.start;
                // const lastSegRatio = Vec3.distance(trailSeg.getTailElement()!.position, p.position) / this._minParticleDistance;
                const textCoordSeg = 1 / (trailNum /*- 1 + lastSegRatio*/);
                const startSegEle = trailSeg.trailElements[trailSeg.start];
                this._fillVertexBuffer(startSegEle, this.colorOverTrail.evaluate(1, 1), indexOffset, 1, 0, NEXT_TRIANGLE_INDEX);
                for (let i = trailSeg.start + 1; i < end; i++) {
                    const segEle = trailSeg.trailElements[i % trailSeg.trailElements.length];
                    const j = i - trailSeg.start;
                    this._fillVertexBuffer(segEle, this.colorOverTrail.evaluate(1 - j / trailNum, 1), indexOffset, 1 - j * textCoordSeg, j, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
                }
                if (this._needTransform) {
                    value_types_1.Vec3.transformMat4(_temp_trailEle.position, p.position, _temp_xform);
                }
                else {
                    value_types_1.Vec3.copy(_temp_trailEle.position, p.position);
                }
                if (trailNum === 1 || trailNum === 2) {
                    const lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);
                    value_types_1.Vec3.subtract(lastSecondTrail.velocity, _temp_trailEle.position, lastSecondTrail.position);
                    this._vbF32[this.vbOffset - this._vertSize / 4 - 4] = lastSecondTrail.velocity.x;
                    this._vbF32[this.vbOffset - this._vertSize / 4 - 3] = lastSecondTrail.velocity.y;
                    this._vbF32[this.vbOffset - this._vertSize / 4 - 2] = lastSecondTrail.velocity.z;
                    this._vbF32[this.vbOffset - 4] = lastSecondTrail.velocity.x;
                    this._vbF32[this.vbOffset - 3] = lastSecondTrail.velocity.y;
                    this._vbF32[this.vbOffset - 2] = lastSecondTrail.velocity.z;
                    value_types_1.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);
                    this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
                }
                else if (trailNum > 2) {
                    const lastSecondTrail = trailSeg.getElement(trailSeg.end - 1);
                    const lastThirdTrail = trailSeg.getElement(trailSeg.end - 2);
                    value_types_1.Vec3.subtract(_temp_Vec3, lastThirdTrail.position, lastSecondTrail.position);
                    value_types_1.Vec3.subtract(_temp_Vec3_1, _temp_trailEle.position, lastSecondTrail.position);
                    value_types_1.Vec3.normalize(_temp_Vec3, _temp_Vec3);
                    value_types_1.Vec3.normalize(_temp_Vec3_1, _temp_Vec3_1);
                    value_types_1.Vec3.subtract(lastSecondTrail.velocity, _temp_Vec3_1, _temp_Vec3);
                    value_types_1.Vec3.normalize(lastSecondTrail.velocity, lastSecondTrail.velocity);
                    this._checkDirectionReverse(lastSecondTrail, lastThirdTrail);
                    this.vbOffset -= this._vertSize / 4 * 2;
                    this.ibOffset -= 6;
                    //_bcIdx = (_bcIdx - 6 + 9) % 9;  // <wireframe debug>
                    this._fillVertexBuffer(lastSecondTrail, this.colorOverTrail.evaluate(textCoordSeg, 1), indexOffset, textCoordSeg, trailNum - 1, PRE_TRIANGLE_INDEX | NEXT_TRIANGLE_INDEX);
                    value_types_1.Vec3.subtract(_temp_trailEle.velocity, _temp_trailEle.position, lastSecondTrail.position);
                    value_types_1.Vec3.normalize(_temp_trailEle.velocity, _temp_trailEle.velocity);
                    this._checkDirectionReverse(_temp_trailEle, lastSecondTrail);
                }
                if (this.widthFromParticle) {
                    _temp_trailEle.width = p.size.x * this.widthRatio.evaluate(0, 1);
                }
                else {
                    _temp_trailEle.width = this.widthRatio.evaluate(0, 1);
                }
                _temp_trailEle.color = p.color;
                if (value_types_1.Vec3.equals(_temp_trailEle.velocity, cc.Vec3.ZERO)) {
                    this.ibOffset -= 3;
                }
                else {
                    this._fillVertexBuffer(_temp_trailEle, this.colorOverTrail.evaluate(0, 1), indexOffset, 0, trailNum, PRE_TRIANGLE_INDEX);
                }
            }
            this._updateIA(this.ibOffset);
        }
        _fillVertexBuffer(trailSeg, colorModifer, indexOffset, xTexCoord, trailEleIdx, indexSet) {
            this._vbF32[this.vbOffset++] = trailSeg.position.x;
            this._vbF32[this.vbOffset++] = trailSeg.position.y;
            this._vbF32[this.vbOffset++] = trailSeg.position.z;
            this._vbF32[this.vbOffset++] = 0;
            this._vbF32[this.vbOffset++] = trailSeg.width;
            this._vbF32[this.vbOffset++] = xTexCoord;
            this._vbF32[this.vbOffset++] = 0;
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
            // _bcIdx %= 9;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
            _temp_color.set(trailSeg.color);
            _temp_color.multiply(colorModifer);
            this._vbUint32[this.vbOffset++] = _temp_color._val;
            this._vbF32[this.vbOffset++] = trailSeg.position.x;
            this._vbF32[this.vbOffset++] = trailSeg.position.y;
            this._vbF32[this.vbOffset++] = trailSeg.position.z;
            this._vbF32[this.vbOffset++] = 1;
            this._vbF32[this.vbOffset++] = trailSeg.width;
            this._vbF32[this.vbOffset++] = xTexCoord;
            this._vbF32[this.vbOffset++] = 1;
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];  // <wireframe debug>
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
            // this._vbF32[this.vbOffset++] = barycentric[_bcIdx++];
            // _bcIdx %= 9;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.x;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.y;
            this._vbF32[this.vbOffset++] = trailSeg.velocity.z;
            this._vbUint32[this.vbOffset++] = _temp_color._val;
            if (indexSet & PRE_TRIANGLE_INDEX) {
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx - 1;
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
            }
            if (indexSet & NEXT_TRIANGLE_INDEX) {
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx;
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 1;
                this._iBuffer[this.ibOffset++] = indexOffset + 2 * trailEleIdx + 2;
            }
        }
        _updateIA(count) {
            if (this._particleSystem && this._particleSystem._assembler) {
                this._particleSystem._assembler.updateIA(1, count, true, true);
            }
        }
        _checkDirectionReverse(currElement, prevElement) {
            if (value_types_1.Vec3.dot(currElement.velocity, prevElement.velocity) < DIRECTION_THRESHOLD) {
                currElement.direction = 1 - prevElement.direction;
            }
            else {
                currElement.direction = prevElement.direction;
            }
        }
    };
    __setFunctionName(_classThis, "TrailModule");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __enable_decorators = [CCClassDecorator_1.property];
        _get_enable_decorators = [CCClassDecorator_1.property];
        _mode_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.TrailMode,
            })];
        _lifeTime_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        __minParticleDistance_decorators = [CCClassDecorator_1.property];
        _get_minParticleDistance_decorators = [CCClassDecorator_1.property];
        __space_decorators = [CCClassDecorator_1.property];
        _get_space_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.Space,
            })];
        _existWithParticles_decorators = [CCClassDecorator_1.property];
        _textureMode_decorators = [(0, CCClassDecorator_1.property)({
                type: enum_1.TextureMode,
            })];
        _widthFromParticle_decorators = [CCClassDecorator_1.property];
        _widthRatio_decorators = [(0, CCClassDecorator_1.property)({
                type: curve_range_1.default,
            })];
        _colorFromParticle_decorators = [CCClassDecorator_1.property];
        _colorOverTrail_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_range_1.default,
            })];
        _colorOvertime_decorators = [(0, CCClassDecorator_1.property)({
                type: gradient_range_1.default,
            })];
        __esDecorate(_classThis, null, _get_enable_decorators, { kind: "getter", name: "enable", static: false, private: false, access: { has: obj => "enable" in obj, get: obj => obj.enable }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_minParticleDistance_decorators, { kind: "getter", name: "minParticleDistance", static: false, private: false, access: { has: obj => "minParticleDistance" in obj, get: obj => obj.minParticleDistance }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_space_decorators, { kind: "getter", name: "space", static: false, private: false, access: { has: obj => "space" in obj, get: obj => obj.space }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, __enable_decorators, { kind: "field", name: "_enable", static: false, private: false, access: { has: obj => "_enable" in obj, get: obj => obj._enable, set: (obj, value) => { obj._enable = value; } }, metadata: _metadata }, __enable_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _mode_decorators, { kind: "field", name: "mode", static: false, private: false, access: { has: obj => "mode" in obj, get: obj => obj.mode, set: (obj, value) => { obj.mode = value; } }, metadata: _metadata }, _mode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _lifeTime_decorators, { kind: "field", name: "lifeTime", static: false, private: false, access: { has: obj => "lifeTime" in obj, get: obj => obj.lifeTime, set: (obj, value) => { obj.lifeTime = value; } }, metadata: _metadata }, _lifeTime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __minParticleDistance_decorators, { kind: "field", name: "_minParticleDistance", static: false, private: false, access: { has: obj => "_minParticleDistance" in obj, get: obj => obj._minParticleDistance, set: (obj, value) => { obj._minParticleDistance = value; } }, metadata: _metadata }, __minParticleDistance_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __space_decorators, { kind: "field", name: "_space", static: false, private: false, access: { has: obj => "_space" in obj, get: obj => obj._space, set: (obj, value) => { obj._space = value; } }, metadata: _metadata }, __space_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _existWithParticles_decorators, { kind: "field", name: "existWithParticles", static: false, private: false, access: { has: obj => "existWithParticles" in obj, get: obj => obj.existWithParticles, set: (obj, value) => { obj.existWithParticles = value; } }, metadata: _metadata }, _existWithParticles_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _textureMode_decorators, { kind: "field", name: "textureMode", static: false, private: false, access: { has: obj => "textureMode" in obj, get: obj => obj.textureMode, set: (obj, value) => { obj.textureMode = value; } }, metadata: _metadata }, _textureMode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _widthFromParticle_decorators, { kind: "field", name: "widthFromParticle", static: false, private: false, access: { has: obj => "widthFromParticle" in obj, get: obj => obj.widthFromParticle, set: (obj, value) => { obj.widthFromParticle = value; } }, metadata: _metadata }, _widthFromParticle_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _widthRatio_decorators, { kind: "field", name: "widthRatio", static: false, private: false, access: { has: obj => "widthRatio" in obj, get: obj => obj.widthRatio, set: (obj, value) => { obj.widthRatio = value; } }, metadata: _metadata }, _widthRatio_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _colorFromParticle_decorators, { kind: "field", name: "colorFromParticle", static: false, private: false, access: { has: obj => "colorFromParticle" in obj, get: obj => obj.colorFromParticle, set: (obj, value) => { obj.colorFromParticle = value; } }, metadata: _metadata }, _colorFromParticle_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _colorOverTrail_decorators, { kind: "field", name: "colorOverTrail", static: false, private: false, access: { has: obj => "colorOverTrail" in obj, get: obj => obj.colorOverTrail, set: (obj, value) => { obj.colorOverTrail = value; } }, metadata: _metadata }, _colorOverTrail_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _colorOvertime_decorators, { kind: "field", name: "colorOvertime", static: false, private: false, access: { has: obj => "colorOvertime" in obj, get: obj => obj.colorOvertime, set: (obj, value) => { obj.colorOvertime = value; } }, metadata: _metadata }, _colorOvertime_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TrailModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TrailModule = _classThis;
})();
exports.default = TrailModule;
