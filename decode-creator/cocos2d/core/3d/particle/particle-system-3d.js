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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const value_types_1 = require("../../value-types");
const utils_1 = require("../../value-types/utils");
const CCMaterial_1 = __importDefault(require("../../assets/material/CCMaterial"));
const color_overtime_1 = __importDefault(require("./animator/color-overtime"));
const curve_range_1 = __importStar(require("./animator/curve-range"));
const force_overtime_1 = __importDefault(require("./animator/force-overtime"));
const gradient_range_1 = __importDefault(require("./animator/gradient-range"));
const limit_velocity_overtime_1 = __importDefault(require("./animator/limit-velocity-overtime"));
const rotation_overtime_1 = __importDefault(require("./animator/rotation-overtime"));
const size_overtime_1 = __importDefault(require("./animator/size-overtime"));
const texture_animation_1 = __importDefault(require("./animator/texture-animation"));
const velocity_overtime_1 = __importDefault(require("./animator/velocity-overtime"));
const burst_1 = __importDefault(require("./burst"));
const shape_module_1 = __importDefault(require("./emitter/shape-module"));
const enum_1 = require("./enum");
const particle_general_function_1 = require("./particle-general-function");
const trail_1 = __importDefault(require("./renderer/trail"));
const CCMesh_1 = __importDefault(require("../../mesh/CCMesh"));
const { ccclass, menu, property, executeInEditMode, executionOrder } = require('../../platform/CCClassDecorator');
const RenderComponent = require('../../components/CCRenderComponent');
const _world_mat = new value_types_1.Mat4();
const _module_props = CC_EDITOR && [
    "_colorOverLifetimeModule",
    "_shapeModule",
    "_sizeOvertimeModule",
    "_velocityOvertimeModule",
    "_forceOvertimeModule",
    "_limitVelocityOvertimeModule",
    "_rotationOvertimeModule",
    "_textureAnimationModule",
    "_trailModule"
];
let ParticleSystem3D = (() => {
    let _classDecorators = [ccclass('cc.ParticleSystem3D'), menu('i18n:MAIN_MENU.component.renderers/ParticleSystem3D'), executionOrder(99), executeInEditMode];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = RenderComponent;
    let _instanceExtraInitializers = [];
    let _duration_decorators;
    let _duration_initializers = [];
    let __capacity_decorators;
    let __capacity_initializers = [];
    let _get_capacity_decorators;
    let _loop_decorators;
    let _loop_initializers = [];
    let _playOnAwake_decorators;
    let _playOnAwake_initializers = [];
    let __prewarm_decorators;
    let __prewarm_initializers = [];
    let _get_prewarm_decorators;
    let __simulationSpace_decorators;
    let __simulationSpace_initializers = [];
    let _get_simulationSpace_decorators;
    let _simulationSpeed_decorators;
    let _simulationSpeed_initializers = [];
    let _startDelay_decorators;
    let _startDelay_initializers = [];
    let _startLifetime_decorators;
    let _startLifetime_initializers = [];
    let _startColor_decorators;
    let _startColor_initializers = [];
    let _scaleSpace_decorators;
    let _scaleSpace_initializers = [];
    let _startSize_decorators;
    let _startSize_initializers = [];
    let _startSpeed_decorators;
    let _startSpeed_initializers = [];
    let _startRotation_decorators;
    let _startRotation_initializers = [];
    let _gravityModifier_decorators;
    let _gravityModifier_initializers = [];
    let _rateOverTime_decorators;
    let _rateOverTime_initializers = [];
    let _rateOverDistance_decorators;
    let _rateOverDistance_initializers = [];
    let _bursts_decorators;
    let _bursts_initializers = [];
    let _get_materials_decorators;
    let __shapeModule_decorators;
    let __shapeModule_initializers = [];
    let _get_shapeModule_decorators;
    let __colorOverLifetimeModule_decorators;
    let __colorOverLifetimeModule_initializers = [];
    let _get_colorOverLifetimeModule_decorators;
    let __sizeOvertimeModule_decorators;
    let __sizeOvertimeModule_initializers = [];
    let _get_sizeOvertimeModule_decorators;
    let __velocityOvertimeModule_decorators;
    let __velocityOvertimeModule_initializers = [];
    let _get_velocityOvertimeModule_decorators;
    let __forceOvertimeModule_decorators;
    let __forceOvertimeModule_initializers = [];
    let _get_forceOvertimeModule_decorators;
    let __limitVelocityOvertimeModule_decorators;
    let __limitVelocityOvertimeModule_initializers = [];
    let _get_limitVelocityOvertimeModule_decorators;
    let __rotationOvertimeModule_decorators;
    let __rotationOvertimeModule_initializers = [];
    let _get_rotationOvertimeModule_decorators;
    let __textureAnimationModule_decorators;
    let __textureAnimationModule_initializers = [];
    let _get_textureAnimationModule_decorators;
    let __trailModule_decorators;
    let __trailModule_initializers = [];
    let _get_trailModule_decorators;
    let __renderMode_decorators;
    let __renderMode_initializers = [];
    let _get_renderMode_decorators;
    let __velocityScale_decorators;
    let __velocityScale_initializers = [];
    let _get_velocityScale_decorators;
    let __lengthScale_decorators;
    let __lengthScale_initializers = [];
    let _get_lengthScale_decorators;
    let __mesh_decorators;
    let __mesh_initializers = [];
    let _get_mesh_decorators;
    let _get_particleMaterial_decorators;
    let _get_trailMaterial_decorators;
    var ParticleSystem3D = _classThis = class extends _classSuper {
        /**
         * !#en The maximum number of particles that a particle system can generate.
         * !#zh 粒子系统能生成的最大粒子数量
         * @property {Number} capacity
         */
        get capacity() {
            return this._capacity;
        }
        set capacity(val) {
            this._capacity = val;
            if (this._assembler) {
                this._assembler.setCapacity(this._capacity);
            }
        }
        /**
         * !#en When selected, the particle system will start playing after one round has been played (only effective when loop is enabled).
         * !#zh 选中之后，粒子系统会以已播放完一轮之后的状态开始播放（仅当循环播放启用时有效）
         * @property {Boolean} prewarm
         */
        get prewarm() {
            return this._prewarm;
        }
        set prewarm(val) {
            if (val === true && this.loop === false) {
                // console.warn('prewarm only works if loop is also enabled.');
            }
            this._prewarm = val;
        }
        /**
         * !#en The coordinate system in which the particle system is located.<br>
         * World coordinates (does not change when the position of other objects changes)<br>
         * Local coordinates (moving as the position of the parent node changes)<br>
         * Custom coordinates (moving with the position of a custom node)
         * !#zh 选择粒子系统所在的坐标系<br>
         * 世界坐标（不随其他物体位置改变而变换）<br>
         * 局部坐标（跟随父节点位置改变而移动）<br>
         * 自定坐标（跟随自定义节点的位置改变而移动）
         * @property {Space} simulationSpace
         */
        get simulationSpace() {
            return this._simulationSpace;
        }
        set simulationSpace(val) {
            if (val !== this._simulationSpace) {
                this._simulationSpace = val;
                if (this._assembler) {
                    this._assembler._updateMaterialParams();
                    this._assembler._updateTrailMaterial();
                }
            }
        }
        get materials() {
            // if we don't create an array copy, the editor will modify the original array directly.
            return this._materials;
        }
        set materials(val) {
            this._materials = val;
            this._activateMaterial();
        }
        /**
         * !#en Particle emitter module
         * !#zh 粒子发射器模块
         * @property {ShapeModule} shapeModule
         */
        get shapeModule() {
            return this._shapeModule;
        }
        set shapeModule(val) {
            this._shapeModule = val;
            this._shapeModule.onInit(this);
        }
        /**
         * !#en Color control module
         * !#zh 颜色控制模块
         * @property {ColorOverLifetimeModule} colorOverLifetimeModule
         */
        get colorOverLifetimeModule() {
            return this._colorOverLifetimeModule;
        }
        set colorOverLifetimeModule(val) {
            this._colorOverLifetimeModule = val;
        }
        /**
         * !#en Particle size module
         * !#zh 粒子大小模块
         * @property {SizeOvertimeModule} sizeOvertimeModule
         */
        get sizeOvertimeModule() {
            return this._sizeOvertimeModule;
        }
        set sizeOvertimeModule(val) {
            this._sizeOvertimeModule = val;
        }
        /**
         * !#en Particle speed module
         * !#zh 粒子速度模块
         * @property {VelocityOvertimeModule} velocityOvertimeModule
         */
        get velocityOvertimeModule() {
            return this._velocityOvertimeModule;
        }
        set velocityOvertimeModule(val) {
            this._velocityOvertimeModule = val;
        }
        /**
         * !#en Particle acceleration module
         * !#zh 粒子加速度模块
         * @property {ForceOvertimeModule} forceOvertimeModule
         */
        get forceOvertimeModule() {
            return this._forceOvertimeModule;
        }
        set forceOvertimeModule(val) {
            this._forceOvertimeModule = val;
        }
        /**
         * !#en Particle limit speed module (only CPU particles are supported)
         * !#zh 粒子限制速度模块（只支持 CPU 粒子）
         * @property {LimitVelocityOvertimeModule} limitVelocityOvertimeModule
         */
        get limitVelocityOvertimeModule() {
            return this._limitVelocityOvertimeModule;
        }
        set limitVelocityOvertimeModule(val) {
            this._limitVelocityOvertimeModule = val;
        }
        /**
         * !#en Particle rotation module
         * !#zh 粒子旋转模块
         * @property {RotationOvertimeModule} rotationOvertimeModule
         */
        get rotationOvertimeModule() {
            return this._rotationOvertimeModule;
        }
        set rotationOvertimeModule(val) {
            this._rotationOvertimeModule = val;
        }
        /**
         * !#en Texture Animation Module
         * !#zh 贴图动画模块
         * @property {TextureAnimationModule} textureAnimationModule
         */
        get textureAnimationModule() {
            return this._textureAnimationModule;
        }
        set textureAnimationModule(val) {
            this._textureAnimationModule = val;
            this._textureAnimationModule.onInit(this);
        }
        /**
         * !#en Particle Trajectory Module
         * !#zh 粒子轨迹模块
         * @property {TrailModule} trailModule
         */
        get trailModule() {
            return this._trailModule;
        }
        set trailModule(val) {
            this._trailModule = val;
            this._trailModule.onInit(this);
        }
        /**
         * !#en Particle generation mode
         * !#zh 设定粒子生成模式
         * @property {RenderMode} renderMode
         */
        get renderMode() {
            return this._renderMode;
        }
        set renderMode(val) {
            if (this._renderMode === val) {
                return;
            }
            this._renderMode = val;
            if (this._assembler) {
                this._assembler._setVertexAttrib();
                this._assembler._updateModel();
                this._assembler._updateMaterialParams();
            }
        }
        /**
         * !#en When the particle generation mode is StrecthedBillboard, in the direction of movement of the particles is stretched by velocity magnitude
         * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按速度大小进行拉伸
         * @property {Number} velocityScale
         */
        get velocityScale() {
            return this._velocityScale;
        }
        set velocityScale(val) {
            this._velocityScale = val;
            this._assembler && this._assembler._updateMaterialParams();
        }
        /**
         * !#en When the particle generation method is StrecthedBillboard, the particles are stretched according to the particle size in the direction of motion
         * !#zh 在粒子生成方式为 StrecthedBillboard 时,对粒子在运动方向上按粒子大小进行拉伸
         * @property {Number} lengthScale
         */
        get lengthScale() {
            return this._lengthScale;
        }
        set lengthScale(val) {
            this._lengthScale = val;
            this._assembler && this._assembler._updateMaterialParams();
        }
        /**
         * !#en Particle model
         * !#zh 粒子模型
         * @property {Mesh} mesh
         */
        get mesh() {
            return this._mesh;
        }
        set mesh(val) {
            this._mesh = val;
            this._assembler && this._assembler._updateModel();
        }
        /**
         * !#en Particle material
         * !#zh 粒子材质
         * @property {Material} particleMaterial
         */
        get particleMaterial() {
            return this.getMaterial(0);
        }
        set particleMaterial(val) {
            this.setMaterial(0, val);
            this._onMaterialModified(0, val);
        }
        /**
         * !#en Particle trail material
         * !#zh 粒子轨迹材质
         * @property {Material} trailMaterial
         */
        get trailMaterial() {
            return this.getMaterial(1);
        }
        set trailMaterial(val) {
            this.setMaterial(1, val);
            this._onMaterialModified(1, val);
        }
        constructor() {
            super();
            /**
             * !#en The run time of particle.
             * !#zh 粒子系统运行时间
             * @property {Number} duration
             */
            this.duration = (__runInitializers(this, _instanceExtraInitializers), __runInitializers(this, _duration_initializers, 5.0));
            this._capacity = __runInitializers(this, __capacity_initializers, 100);
            /**
             * !#en Whether the particle system loops.
             * !#zh 粒子系统是否循环播放
             * @property {Boolean} loop
             */
            this.loop = __runInitializers(this, _loop_initializers, true);
            /**
             * !#en Whether the particles start playing automatically after loaded.
             * !#zh 粒子系统加载后是否自动开始播放
             * @property {Boolean} playOnAwake
             */
            this.playOnAwake = __runInitializers(this, _playOnAwake_initializers, true);
            this._prewarm = __runInitializers(this, __prewarm_initializers, false);
            this._simulationSpace = __runInitializers(this, __simulationSpace_initializers, enum_1.Space.Local);
            /**
             * !#en Controlling the update speed of the entire particle system.
             * !#zh 控制整个粒子系统的更新速度。
             * @property {Number} simulationSpeed
             */
            this.simulationSpeed = __runInitializers(this, _simulationSpeed_initializers, 1.0);
            /**
             * !#en Delay particle emission time after particle system starts running.
             * !#zh 粒子系统开始运行后，延迟粒子发射的时间。
             * @property {CurveRange} startDelay
             */
            this.startDelay = __runInitializers(this, _startDelay_initializers, new curve_range_1.default());
            /**
             * !#en Particle life cycle。
             * !#zh 粒子生命周期。
             * @property {CurveRange} startLifetime
             */
            this.startLifetime = __runInitializers(this, _startLifetime_initializers, new curve_range_1.default());
            /**
             * !#en Particle initial color
             * !#zh 粒子初始颜色
             * @property {GradientRange} startColor
             */
            this.startColor = __runInitializers(this, _startColor_initializers, new gradient_range_1.default());
            /**
             * !#en Particle scale space
             * !#zh 缩放空间
             * @property {Space} scaleSpace
             */
            this.scaleSpace = __runInitializers(this, _scaleSpace_initializers, enum_1.Space.Local);
            /**
             * !#en Initial particle size
             * !#zh 粒子初始大小
             * @property {CurveRange} startSize
             */
            this.startSize = __runInitializers(this, _startSize_initializers, new curve_range_1.default());
            /**
             * !#en Initial particle speed
             * !#zh 粒子初始速度
             * @property {CurveRange} startSpeed
             */
            this.startSpeed = __runInitializers(this, _startSpeed_initializers, new curve_range_1.default());
            /**
             * !#en Particle initial rotation angle
             * !#zh 粒子初始旋转角度
             * @property {CurveRange} startRotation
             */
            this.startRotation = __runInitializers(this, _startRotation_initializers, new curve_range_1.default());
            /**
             * !#en Gravity coefficient of particles affected by gravity
             * !#zh 粒子受重力影响的重力系数
             * @property {CurveRange} gravityModifier
             */
            this.gravityModifier = __runInitializers(this, _gravityModifier_initializers, new curve_range_1.default());
            // emission module
            /**
             * !#en Particles emitted per second
             * !#zh 每秒发射的粒子数
             * @property {CurveRange} rateOverTime
             */
            this.rateOverTime = __runInitializers(this, _rateOverTime_initializers, new curve_range_1.default());
            /**
             * !#en Number of particles emitted per unit distance moved
             * !#zh 每移动单位距离发射的粒子数
             * @property {CurveRange} rateOverDistance
             */
            this.rateOverDistance = __runInitializers(this, _rateOverDistance_initializers, new curve_range_1.default());
            /**
             * !#en The number of Brusts that emit a specified number of particles at a specified time
             * !#zh 设定在指定时间发射指定数量的粒子的 Brust 的数量
             * @property {[Burst]} bursts
             */
            this.bursts = __runInitializers(this, _bursts_initializers, new Array());
            this._shapeModule = __runInitializers(this, __shapeModule_initializers, new shape_module_1.default());
            this._colorOverLifetimeModule = __runInitializers(this, __colorOverLifetimeModule_initializers, new color_overtime_1.default());
            this._sizeOvertimeModule = __runInitializers(this, __sizeOvertimeModule_initializers, new size_overtime_1.default());
            this._velocityOvertimeModule = __runInitializers(this, __velocityOvertimeModule_initializers, new velocity_overtime_1.default());
            this._forceOvertimeModule = __runInitializers(this, __forceOvertimeModule_initializers, new force_overtime_1.default());
            this._limitVelocityOvertimeModule = __runInitializers(this, __limitVelocityOvertimeModule_initializers, new limit_velocity_overtime_1.default());
            this._rotationOvertimeModule = __runInitializers(this, __rotationOvertimeModule_initializers, new rotation_overtime_1.default());
            this._textureAnimationModule = __runInitializers(this, __textureAnimationModule_initializers, new texture_animation_1.default());
            this._trailModule = __runInitializers(this, __trailModule_initializers, new trail_1.default());
            this._renderMode = __runInitializers(this, __renderMode_initializers, enum_1.RenderMode.Billboard);
            this._velocityScale = __runInitializers(this, __velocityScale_initializers, 1);
            this._lengthScale = __runInitializers(this, __lengthScale_initializers, 1);
            this._mesh = __runInitializers(this, __mesh_initializers, null);
            this.rateOverTime.constant = 10;
            this.startLifetime.constant = 5;
            this.startSize.constant = 1;
            this.startSpeed.constant = 5;
            // internal status
            this._isPlaying = false;
            this._isPaused = false;
            this._isStopped = true;
            this._isEmitting = false;
            this._time = 0.0; // playback position in seconds.
            this._emitRateTimeCounter = 0.0;
            this._emitRateDistanceCounter = 0.0;
            this._oldWPos = new value_types_1.Vec3(0, 0, 0);
            this._curWPos = new value_types_1.Vec3(0, 0, 0);
            this._customData1 = new value_types_1.Vec2(0, 0);
            this._customData2 = new value_types_1.Vec2(0, 0);
            this._subEmitters = []; // array of { emitter: ParticleSystemComponent, type: 'birth', 'collision' or 'death'}
        }
        onLoad() {
            this._assembler.onInit(this);
            this.shapeModule.onInit(this);
            this.trailModule.onInit(this);
            this.textureAnimationModule.onInit(this);
            this._resetPosition();
            // this._system.add(this);
        }
        _onMaterialModified(index, material) {
            this._assembler && this._assembler._onMaterialModified(index, material);
        }
        _onRebuildPSO(index, material) {
            this._assembler && this._assembler._onRebuildPSO(index, material);
        }
        // TODO: fastforward current particle system by simulating particles over given period of time, then pause it.
        // simulate(time, withChildren, restart, fixedTimeStep) {
        // }
        /**
         * !#en Playing particle effects
         * !#zh 播放粒子效果
         * @method play
         */
        play() {
            if (this._isPaused) {
                this._isPaused = false;
            }
            if (this._isStopped) {
                this._isStopped = false;
            }
            this._isPlaying = true;
            this._isEmitting = true;
            this._resetPosition();
            // prewarm
            if (this._prewarm) {
                this._prewarmSystem();
            }
        }
        /**
         * !#en Pause particle effect
         * !#zh 暂停播放粒子效果
         * @method pause
         */
        pause() {
            if (this._isStopped) {
                console.warn('pause(): particle system is already stopped.');
                return;
            }
            if (this._isPlaying) {
                this._isPlaying = false;
            }
            this._isPaused = true;
        }
        /**
         * !#en Stop particle effect
         * !#zh 停止播放粒子效果
         * @method stop
         */
        stop() {
            if (this._isPlaying || this._isPaused) {
                this.clear();
            }
            if (this._isPlaying) {
                this._isPlaying = false;
            }
            if (this._isPaused) {
                this._isPaused = false;
            }
            this._time = 0.0;
            this._emitRateTimeCounter = 0.0;
            this._emitRateDistanceCounter = 0.0;
            this._isStopped = true;
        }
        // remove all particles from current particle system.
        /**
         * !#en Remove all particle effect
         * !#zh 将所有粒子从粒子系统中清除
         * @method clear
         */
        clear() {
            if (this.enabledInHierarchy) {
                this._assembler && this._assembler.clear();
                this.trailModule.clear();
            }
        }
        getParticleCount() {
            return this._assembler ? this._assembler.getParticleCount() : 0;
        }
        setCustomData1(x, y) {
            value_types_1.Vec2.set(this._customData1, x, y);
        }
        setCustomData2(x, y) {
            value_types_1.Vec2.set(this._customData2, x, y);
        }
        onDestroy() {
            // this._system.remove(this);
            this._assembler.onDestroy();
            this.trailModule.destroy();
        }
        onEnable() {
            super.onEnable();
            if (this.playOnAwake) {
                this.play();
            }
            this._assembler.onEnable();
            this.trailModule.onEnable();
        }
        onDisable() {
            super.onDisable();
            this._assembler.onDisable();
            this.trailModule.onDisable();
        }
        update(dt) {
            const scaledDeltaTime = dt * this.simulationSpeed;
            if (this._isPlaying) {
                this._time += scaledDeltaTime;
                // excute emission
                this._emit(scaledDeltaTime);
                // simulation, update particles.
                if (this._assembler._updateParticles(scaledDeltaTime) === 0 && !this._isEmitting) {
                    this.stop();
                }
                // update render data
                this._assembler.updateParticleBuffer();
                // update trail
                if (this.trailModule.enable) {
                    this.trailModule.updateTrailBuffer();
                }
            }
        }
        emit(count, dt) {
            if (!this._assembler) {
                return;
            }
            if (this._simulationSpace === enum_1.Space.World) {
                this.node.getWorldMatrix(_world_mat);
            }
            for (let i = 0; i < count; ++i) {
                const particle = this._assembler._getFreeParticle();
                if (particle === null) {
                    return;
                }
                const rand = (0, value_types_1.pseudoRandom)((0, value_types_1.randomRangeInt)(0, utils_1.INT_MAX));
                if (this.shapeModule.enable) {
                    this.shapeModule.emit(particle);
                }
                else {
                    value_types_1.Vec3.set(particle.position, 0, 0, 0);
                    value_types_1.Vec3.copy(particle.velocity, particle_general_function_1.particleEmitZAxis);
                }
                if (this.textureAnimationModule.enable) {
                    this.textureAnimationModule.init(particle);
                }
                value_types_1.Vec3.scale(particle.velocity, particle.velocity, this.startSpeed.evaluate(this._time / this.duration, rand));
                switch (this._simulationSpace) {
                    case enum_1.Space.Local:
                        break;
                    case enum_1.Space.World:
                        value_types_1.Vec3.transformMat4(particle.position, particle.position, _world_mat);
                        const worldRot = new value_types_1.Quat();
                        this.node.getWorldRotation(worldRot);
                        value_types_1.Vec3.transformQuat(particle.velocity, particle.velocity, worldRot);
                        break;
                    case enum_1.Space.Custom:
                        // TODO:
                        break;
                }
                value_types_1.Vec3.copy(particle.ultimateVelocity, particle.velocity);
                // apply startRotation. now 2D only.
                value_types_1.Vec3.set(particle.rotation, 0, 0, this.startRotation.evaluate(this._time / this.duration, rand));
                // apply startSize. now 2D only.
                value_types_1.Vec3.set(particle.startSize, this.startSize.evaluate(this._time / this.duration, rand), 1, 1);
                particle.startSize.y = particle.startSize.x;
                value_types_1.Vec3.copy(particle.size, particle.startSize);
                // apply startColor.
                particle.startColor.set(this.startColor.evaluate(this._time / this.duration, rand));
                particle.color.set(particle.startColor);
                // apply startLifetime.
                particle.startLifetime = this.startLifetime.evaluate(this._time / this.duration, rand) + dt;
                particle.remainingLifetime = particle.startLifetime;
                particle.randomSeed = (0, value_types_1.randomRangeInt)(0, 233280);
                this._assembler._setNewParticle(particle);
            } // end of particles forLoop.
        }
        // initialize particle system as though it had already completed a full cycle.
        _prewarmSystem() {
            this.startDelay.mode = curve_range_1.Mode.Constant; // clear startDelay.
            this.startDelay.constant = 0;
            const dt = 1.0; // should use varying value?
            const cnt = this.duration / dt;
            for (let i = 0; i < cnt; ++i) {
                this._time += dt;
                this._emit(dt);
                this._assembler && this._assembler._updateParticles(dt);
            }
        }
        // internal function
        _emit(dt) {
            // emit particles.
            const startDelay = this.startDelay.evaluate(0, 1);
            if (this._time > startDelay) {
                if (this._time > (this.duration + startDelay)) {
                    // this._time = startDelay; // delay will not be applied from the second loop.(Unity)
                    // this._emitRateTimeCounter = 0.0;
                    // this._emitRateDistanceCounter = 0.0;
                    if (!this.loop) {
                        this._isEmitting = false;
                        return;
                    }
                }
                // emit by rateOverTime
                this._emitRateTimeCounter += this.rateOverTime.evaluate(this._time / this.duration, 1) * dt;
                if (this._emitRateTimeCounter > 1 && this._isEmitting) {
                    const emitNum = Math.floor(this._emitRateTimeCounter);
                    this._emitRateTimeCounter -= emitNum;
                    this.emit(emitNum, dt);
                }
                // emit by rateOverDistance
                this.node.getWorldPosition(this._curWPos);
                const distance = value_types_1.Vec3.distance(this._curWPos, this._oldWPos);
                value_types_1.Vec3.copy(this._oldWPos, this._curWPos);
                this._emitRateDistanceCounter += distance * this.rateOverDistance.evaluate(this._time / this.duration, 1);
                if (this._emitRateDistanceCounter > 1 && this._isEmitting) {
                    const emitNum = Math.floor(this._emitRateDistanceCounter);
                    this._emitRateDistanceCounter -= emitNum;
                    this.emit(emitNum, dt);
                }
                // bursts
                for (const burst of this.bursts) {
                    burst.update(this, dt);
                }
            }
        }
        _activateMaterial() {
        }
        _resetPosition() {
            this.node.getWorldPosition(this._oldWPos);
            value_types_1.Vec3.copy(this._curWPos, this._oldWPos);
        }
        addSubEmitter(subEmitter) {
            this._subEmitters.push(subEmitter);
        }
        removeSubEmitter(idx) {
            this._subEmitters.splice(this._subEmitters.indexOf(idx), 1);
        }
        addBurst(burst) {
            this.bursts.push(burst);
        }
        removeBurst(idx) {
            this.bursts.splice(this.bursts.indexOf(idx), 1);
        }
        _checkBacth() {
        }
        get isPlaying() {
            return this._isPlaying;
        }
        get isPaused() {
            return this._isPaused;
        }
        get isStopped() {
            return this._isStopped;
        }
        get isEmitting() {
            return this._isEmitting;
        }
        get time() {
            return this._time;
        }
    };
    __setFunctionName(_classThis, "ParticleSystem3D");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _duration_decorators = [property];
        __capacity_decorators = [property];
        _get_capacity_decorators = [property];
        _loop_decorators = [property];
        _playOnAwake_decorators = [property({
                animatable: false
            })];
        __prewarm_decorators = [property];
        _get_prewarm_decorators = [property({
                animatable: false
            })];
        __simulationSpace_decorators = [property];
        _get_simulationSpace_decorators = [property({
                type: enum_1.Space,
                animatable: false
            })];
        _simulationSpeed_decorators = [property];
        _startDelay_decorators = [property({
                type: curve_range_1.default,
            })];
        _startLifetime_decorators = [property({
                type: curve_range_1.default,
            })];
        _startColor_decorators = [property({
                type: gradient_range_1.default,
            })];
        _scaleSpace_decorators = [property({
                type: enum_1.Space,
            })];
        _startSize_decorators = [property({
                type: curve_range_1.default,
            })];
        _startSpeed_decorators = [property({
                type: curve_range_1.default,
                range: [-1, 1],
            })];
        _startRotation_decorators = [property({
                type: curve_range_1.default,
                range: [-1, 1],
                radian: true,
            })];
        _gravityModifier_decorators = [property({
                type: curve_range_1.default,
                range: [-1, 1],
            })];
        _rateOverTime_decorators = [property({
                type: curve_range_1.default,
            })];
        _rateOverDistance_decorators = [property({
                type: curve_range_1.default,
            })];
        _bursts_decorators = [property({
                type: [burst_1.default],
                animatable: false
            })];
        _get_materials_decorators = [property({
                type: [CCMaterial_1.default],
                displayName: 'Materials',
                visible: false,
                override: true,
            })];
        __shapeModule_decorators = [property];
        _get_shapeModule_decorators = [property({
                type: shape_module_1.default,
                animatable: false
            })];
        __colorOverLifetimeModule_decorators = [property];
        _get_colorOverLifetimeModule_decorators = [property({
                type: color_overtime_1.default,
                animatable: false
            })];
        __sizeOvertimeModule_decorators = [property];
        _get_sizeOvertimeModule_decorators = [property({
                type: size_overtime_1.default,
                animatable: false
            })];
        __velocityOvertimeModule_decorators = [property];
        _get_velocityOvertimeModule_decorators = [property({
                type: velocity_overtime_1.default,
                animatable: false
            })];
        __forceOvertimeModule_decorators = [property];
        _get_forceOvertimeModule_decorators = [property({
                type: force_overtime_1.default,
                animatable: false
            })];
        __limitVelocityOvertimeModule_decorators = [property];
        _get_limitVelocityOvertimeModule_decorators = [property({
                type: limit_velocity_overtime_1.default,
                animatable: false
            })];
        __rotationOvertimeModule_decorators = [property];
        _get_rotationOvertimeModule_decorators = [property({
                type: rotation_overtime_1.default,
                animatable: false
            })];
        __textureAnimationModule_decorators = [property];
        _get_textureAnimationModule_decorators = [property({
                type: texture_animation_1.default,
                animatable: false
            })];
        __trailModule_decorators = [property];
        _get_trailModule_decorators = [property({
                type: trail_1.default,
                animatable: false
            })];
        __renderMode_decorators = [property];
        _get_renderMode_decorators = [property({
                type: enum_1.RenderMode,
                animatable: false
            })];
        __velocityScale_decorators = [property];
        _get_velocityScale_decorators = [property({
                animatable: false
            })];
        __lengthScale_decorators = [property];
        _get_lengthScale_decorators = [property({
                animatable: false
            })];
        __mesh_decorators = [property];
        _get_mesh_decorators = [property({
                type: CCMesh_1.default,
                animatable: false
            })];
        _get_particleMaterial_decorators = [property({
                type: CCMaterial_1.default,
                animatable: false
            })];
        _get_trailMaterial_decorators = [property({
                type: CCMaterial_1.default,
                animatable: false
            })];
        __esDecorate(_classThis, null, _get_capacity_decorators, { kind: "getter", name: "capacity", static: false, private: false, access: { has: obj => "capacity" in obj, get: obj => obj.capacity }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_prewarm_decorators, { kind: "getter", name: "prewarm", static: false, private: false, access: { has: obj => "prewarm" in obj, get: obj => obj.prewarm }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_simulationSpace_decorators, { kind: "getter", name: "simulationSpace", static: false, private: false, access: { has: obj => "simulationSpace" in obj, get: obj => obj.simulationSpace }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_materials_decorators, { kind: "getter", name: "materials", static: false, private: false, access: { has: obj => "materials" in obj, get: obj => obj.materials }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_shapeModule_decorators, { kind: "getter", name: "shapeModule", static: false, private: false, access: { has: obj => "shapeModule" in obj, get: obj => obj.shapeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_colorOverLifetimeModule_decorators, { kind: "getter", name: "colorOverLifetimeModule", static: false, private: false, access: { has: obj => "colorOverLifetimeModule" in obj, get: obj => obj.colorOverLifetimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_sizeOvertimeModule_decorators, { kind: "getter", name: "sizeOvertimeModule", static: false, private: false, access: { has: obj => "sizeOvertimeModule" in obj, get: obj => obj.sizeOvertimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_velocityOvertimeModule_decorators, { kind: "getter", name: "velocityOvertimeModule", static: false, private: false, access: { has: obj => "velocityOvertimeModule" in obj, get: obj => obj.velocityOvertimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_forceOvertimeModule_decorators, { kind: "getter", name: "forceOvertimeModule", static: false, private: false, access: { has: obj => "forceOvertimeModule" in obj, get: obj => obj.forceOvertimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_limitVelocityOvertimeModule_decorators, { kind: "getter", name: "limitVelocityOvertimeModule", static: false, private: false, access: { has: obj => "limitVelocityOvertimeModule" in obj, get: obj => obj.limitVelocityOvertimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_rotationOvertimeModule_decorators, { kind: "getter", name: "rotationOvertimeModule", static: false, private: false, access: { has: obj => "rotationOvertimeModule" in obj, get: obj => obj.rotationOvertimeModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_textureAnimationModule_decorators, { kind: "getter", name: "textureAnimationModule", static: false, private: false, access: { has: obj => "textureAnimationModule" in obj, get: obj => obj.textureAnimationModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_trailModule_decorators, { kind: "getter", name: "trailModule", static: false, private: false, access: { has: obj => "trailModule" in obj, get: obj => obj.trailModule }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_renderMode_decorators, { kind: "getter", name: "renderMode", static: false, private: false, access: { has: obj => "renderMode" in obj, get: obj => obj.renderMode }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_velocityScale_decorators, { kind: "getter", name: "velocityScale", static: false, private: false, access: { has: obj => "velocityScale" in obj, get: obj => obj.velocityScale }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_lengthScale_decorators, { kind: "getter", name: "lengthScale", static: false, private: false, access: { has: obj => "lengthScale" in obj, get: obj => obj.lengthScale }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_mesh_decorators, { kind: "getter", name: "mesh", static: false, private: false, access: { has: obj => "mesh" in obj, get: obj => obj.mesh }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_particleMaterial_decorators, { kind: "getter", name: "particleMaterial", static: false, private: false, access: { has: obj => "particleMaterial" in obj, get: obj => obj.particleMaterial }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _get_trailMaterial_decorators, { kind: "getter", name: "trailMaterial", static: false, private: false, access: { has: obj => "trailMaterial" in obj, get: obj => obj.trailMaterial }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _duration_decorators, { kind: "field", name: "duration", static: false, private: false, access: { has: obj => "duration" in obj, get: obj => obj.duration, set: (obj, value) => { obj.duration = value; } }, metadata: _metadata }, _duration_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __capacity_decorators, { kind: "field", name: "_capacity", static: false, private: false, access: { has: obj => "_capacity" in obj, get: obj => obj._capacity, set: (obj, value) => { obj._capacity = value; } }, metadata: _metadata }, __capacity_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _loop_decorators, { kind: "field", name: "loop", static: false, private: false, access: { has: obj => "loop" in obj, get: obj => obj.loop, set: (obj, value) => { obj.loop = value; } }, metadata: _metadata }, _loop_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _playOnAwake_decorators, { kind: "field", name: "playOnAwake", static: false, private: false, access: { has: obj => "playOnAwake" in obj, get: obj => obj.playOnAwake, set: (obj, value) => { obj.playOnAwake = value; } }, metadata: _metadata }, _playOnAwake_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __prewarm_decorators, { kind: "field", name: "_prewarm", static: false, private: false, access: { has: obj => "_prewarm" in obj, get: obj => obj._prewarm, set: (obj, value) => { obj._prewarm = value; } }, metadata: _metadata }, __prewarm_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __simulationSpace_decorators, { kind: "field", name: "_simulationSpace", static: false, private: false, access: { has: obj => "_simulationSpace" in obj, get: obj => obj._simulationSpace, set: (obj, value) => { obj._simulationSpace = value; } }, metadata: _metadata }, __simulationSpace_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _simulationSpeed_decorators, { kind: "field", name: "simulationSpeed", static: false, private: false, access: { has: obj => "simulationSpeed" in obj, get: obj => obj.simulationSpeed, set: (obj, value) => { obj.simulationSpeed = value; } }, metadata: _metadata }, _simulationSpeed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startDelay_decorators, { kind: "field", name: "startDelay", static: false, private: false, access: { has: obj => "startDelay" in obj, get: obj => obj.startDelay, set: (obj, value) => { obj.startDelay = value; } }, metadata: _metadata }, _startDelay_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startLifetime_decorators, { kind: "field", name: "startLifetime", static: false, private: false, access: { has: obj => "startLifetime" in obj, get: obj => obj.startLifetime, set: (obj, value) => { obj.startLifetime = value; } }, metadata: _metadata }, _startLifetime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startColor_decorators, { kind: "field", name: "startColor", static: false, private: false, access: { has: obj => "startColor" in obj, get: obj => obj.startColor, set: (obj, value) => { obj.startColor = value; } }, metadata: _metadata }, _startColor_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _scaleSpace_decorators, { kind: "field", name: "scaleSpace", static: false, private: false, access: { has: obj => "scaleSpace" in obj, get: obj => obj.scaleSpace, set: (obj, value) => { obj.scaleSpace = value; } }, metadata: _metadata }, _scaleSpace_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startSize_decorators, { kind: "field", name: "startSize", static: false, private: false, access: { has: obj => "startSize" in obj, get: obj => obj.startSize, set: (obj, value) => { obj.startSize = value; } }, metadata: _metadata }, _startSize_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startSpeed_decorators, { kind: "field", name: "startSpeed", static: false, private: false, access: { has: obj => "startSpeed" in obj, get: obj => obj.startSpeed, set: (obj, value) => { obj.startSpeed = value; } }, metadata: _metadata }, _startSpeed_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _startRotation_decorators, { kind: "field", name: "startRotation", static: false, private: false, access: { has: obj => "startRotation" in obj, get: obj => obj.startRotation, set: (obj, value) => { obj.startRotation = value; } }, metadata: _metadata }, _startRotation_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _gravityModifier_decorators, { kind: "field", name: "gravityModifier", static: false, private: false, access: { has: obj => "gravityModifier" in obj, get: obj => obj.gravityModifier, set: (obj, value) => { obj.gravityModifier = value; } }, metadata: _metadata }, _gravityModifier_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rateOverTime_decorators, { kind: "field", name: "rateOverTime", static: false, private: false, access: { has: obj => "rateOverTime" in obj, get: obj => obj.rateOverTime, set: (obj, value) => { obj.rateOverTime = value; } }, metadata: _metadata }, _rateOverTime_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _rateOverDistance_decorators, { kind: "field", name: "rateOverDistance", static: false, private: false, access: { has: obj => "rateOverDistance" in obj, get: obj => obj.rateOverDistance, set: (obj, value) => { obj.rateOverDistance = value; } }, metadata: _metadata }, _rateOverDistance_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, _bursts_decorators, { kind: "field", name: "bursts", static: false, private: false, access: { has: obj => "bursts" in obj, get: obj => obj.bursts, set: (obj, value) => { obj.bursts = value; } }, metadata: _metadata }, _bursts_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __shapeModule_decorators, { kind: "field", name: "_shapeModule", static: false, private: false, access: { has: obj => "_shapeModule" in obj, get: obj => obj._shapeModule, set: (obj, value) => { obj._shapeModule = value; } }, metadata: _metadata }, __shapeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __colorOverLifetimeModule_decorators, { kind: "field", name: "_colorOverLifetimeModule", static: false, private: false, access: { has: obj => "_colorOverLifetimeModule" in obj, get: obj => obj._colorOverLifetimeModule, set: (obj, value) => { obj._colorOverLifetimeModule = value; } }, metadata: _metadata }, __colorOverLifetimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __sizeOvertimeModule_decorators, { kind: "field", name: "_sizeOvertimeModule", static: false, private: false, access: { has: obj => "_sizeOvertimeModule" in obj, get: obj => obj._sizeOvertimeModule, set: (obj, value) => { obj._sizeOvertimeModule = value; } }, metadata: _metadata }, __sizeOvertimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __velocityOvertimeModule_decorators, { kind: "field", name: "_velocityOvertimeModule", static: false, private: false, access: { has: obj => "_velocityOvertimeModule" in obj, get: obj => obj._velocityOvertimeModule, set: (obj, value) => { obj._velocityOvertimeModule = value; } }, metadata: _metadata }, __velocityOvertimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __forceOvertimeModule_decorators, { kind: "field", name: "_forceOvertimeModule", static: false, private: false, access: { has: obj => "_forceOvertimeModule" in obj, get: obj => obj._forceOvertimeModule, set: (obj, value) => { obj._forceOvertimeModule = value; } }, metadata: _metadata }, __forceOvertimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __limitVelocityOvertimeModule_decorators, { kind: "field", name: "_limitVelocityOvertimeModule", static: false, private: false, access: { has: obj => "_limitVelocityOvertimeModule" in obj, get: obj => obj._limitVelocityOvertimeModule, set: (obj, value) => { obj._limitVelocityOvertimeModule = value; } }, metadata: _metadata }, __limitVelocityOvertimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __rotationOvertimeModule_decorators, { kind: "field", name: "_rotationOvertimeModule", static: false, private: false, access: { has: obj => "_rotationOvertimeModule" in obj, get: obj => obj._rotationOvertimeModule, set: (obj, value) => { obj._rotationOvertimeModule = value; } }, metadata: _metadata }, __rotationOvertimeModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __textureAnimationModule_decorators, { kind: "field", name: "_textureAnimationModule", static: false, private: false, access: { has: obj => "_textureAnimationModule" in obj, get: obj => obj._textureAnimationModule, set: (obj, value) => { obj._textureAnimationModule = value; } }, metadata: _metadata }, __textureAnimationModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __trailModule_decorators, { kind: "field", name: "_trailModule", static: false, private: false, access: { has: obj => "_trailModule" in obj, get: obj => obj._trailModule, set: (obj, value) => { obj._trailModule = value; } }, metadata: _metadata }, __trailModule_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __renderMode_decorators, { kind: "field", name: "_renderMode", static: false, private: false, access: { has: obj => "_renderMode" in obj, get: obj => obj._renderMode, set: (obj, value) => { obj._renderMode = value; } }, metadata: _metadata }, __renderMode_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __velocityScale_decorators, { kind: "field", name: "_velocityScale", static: false, private: false, access: { has: obj => "_velocityScale" in obj, get: obj => obj._velocityScale, set: (obj, value) => { obj._velocityScale = value; } }, metadata: _metadata }, __velocityScale_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __lengthScale_decorators, { kind: "field", name: "_lengthScale", static: false, private: false, access: { has: obj => "_lengthScale" in obj, get: obj => obj._lengthScale, set: (obj, value) => { obj._lengthScale = value; } }, metadata: _metadata }, __lengthScale_initializers, _instanceExtraInitializers);
        __esDecorate(null, null, __mesh_decorators, { kind: "field", name: "_mesh", static: false, private: false, access: { has: obj => "_mesh" in obj, get: obj => obj._mesh, set: (obj, value) => { obj._mesh = value; } }, metadata: _metadata }, __mesh_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ParticleSystem3D = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ParticleSystem3D = _classThis;
})();
exports.default = ParticleSystem3D;
CC_EDITOR && (ParticleSystem3D.prototype._onBeforeSerialize = function (props) { return props.filter(p => !_module_props.includes(p) || this[p].enable); });
cc.ParticleSystem3D = ParticleSystem3D;
