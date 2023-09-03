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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannonWorld = void 0;
const cannon_1 = __importDefault(require("../../../../../external/cannon/cannon"));
const cannon_util_1 = require("./cannon-util");
const cannon_shape_1 = require("./shapes/cannon-shape");
const cannon_shared_body_1 = require("./cannon-shared-body");
const util_1 = require("../framework/util");
const Vec3 = cc.Vec3;
const fastRemoveAt = cc.js.array.fastRemoveAt;
class CannonWorld {
    get world() {
        return this._world;
    }
    set defaultMaterial(mat) {
        this._world.defaultMaterial.friction = mat.friction;
        this._world.defaultMaterial.restitution = mat.restitution;
        if (cannon_shape_1.CannonShape.idToMaterial[mat._uuid] != null) {
            cannon_shape_1.CannonShape.idToMaterial[mat._uuid] = this._world.defaultMaterial;
        }
    }
    set allowSleep(v) {
        this._world.allowSleep = v;
    }
    set gravity(gravity) {
        Vec3.copy(this._world.gravity, gravity);
    }
    constructor() {
        this.bodies = [];
        this._raycastResult = new cannon_1.default.RaycastResult();
        this._world = new cannon_1.default.World();
        this._world.broadphase = new cannon_1.default.NaiveBroadphase();
        this._world.addEventListener("postStep", this.onPostStep.bind(this));
    }
    onPostStep() {
        const p3dm = cc.director.getPhysics3DManager();
        if (p3dm.useFixedDigit) {
            const pd = p3dm.fixDigits.position;
            const rd = p3dm.fixDigits.rotation;
            const bodies = this._world.bodies;
            for (let i = 0; i < bodies.length; i++) {
                const bi = bodies[i];
                if (bi.type != cannon_1.default.Body.STATIC && !bi.isSleeping()) {
                    const pos = bi.position;
                    pos.x = parseFloat(pos.x.toFixed(pd));
                    pos.y = parseFloat(pos.y.toFixed(pd));
                    pos.z = parseFloat(pos.z.toFixed(pd));
                    const rot = bi.quaternion;
                    rot.x = parseFloat(rot.x.toFixed(rd));
                    rot.y = parseFloat(rot.y.toFixed(rd));
                    rot.z = parseFloat(rot.z.toFixed(rd));
                    rot.w = parseFloat(rot.w.toFixed(rd));
                    const vel = bi.velocity;
                    vel.x = parseFloat(vel.x.toFixed(pd));
                    vel.y = parseFloat(vel.y.toFixed(pd));
                    vel.z = parseFloat(vel.z.toFixed(pd));
                    const avel = bi.angularVelocity;
                    avel.x = parseFloat(avel.x.toFixed(pd));
                    avel.y = parseFloat(avel.y.toFixed(pd));
                    avel.z = parseFloat(avel.z.toFixed(pd));
                }
            }
        }
    }
    step(deltaTime, timeSinceLastCalled, maxSubStep) {
        this.syncSceneToPhysics();
        this._world.step(deltaTime, timeSinceLastCalled, maxSubStep);
        this.syncPhysicsToScene();
        this.emitEvents();
    }
    syncSceneToPhysics() {
        (0, util_1.clearNodeTransformRecord)();
        // sync scene to physics
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncSceneToPhysics();
        }
        (0, util_1.clearNodeTransformDirtyFlag)();
    }
    syncPhysicsToScene() {
        // sync physics to scene
        for (let i = 0; i < this.bodies.length; i++) {
            this.bodies[i].syncPhysicsToScene();
        }
    }
    emitEvents() {
        this._world.emitTriggeredEvents();
        this._world.emitCollisionEvents();
    }
    raycastClosest(worldRay, options, result) {
        setupFromAndTo(worldRay, options.maxDistance);
        (0, cannon_util_1.toCannonRaycastOptions)(raycastOpt, options);
        const hit = this._world.raycastClosest(from, to, raycastOpt, this._raycastResult);
        if (hit) {
            (0, cannon_util_1.fillRaycastResult)(result, this._raycastResult);
        }
        return hit;
    }
    raycast(worldRay, options, pool, results) {
        setupFromAndTo(worldRay, options.maxDistance);
        (0, cannon_util_1.toCannonRaycastOptions)(raycastOpt, options);
        const hit = this._world.raycastAll(from, to, raycastOpt, (result) => {
            const r = pool.add();
            (0, cannon_util_1.fillRaycastResult)(r, result);
            results.push(r);
        });
        return hit;
    }
    getSharedBody(node) {
        return cannon_shared_body_1.CannonSharedBody.getSharedBody(node, this);
    }
    addSharedBody(sharedBody) {
        const i = this.bodies.indexOf(sharedBody);
        if (i < 0) {
            this.bodies.push(sharedBody);
            this._world.addBody(sharedBody.body);
        }
    }
    removeSharedBody(sharedBody) {
        const i = this.bodies.indexOf(sharedBody);
        if (i >= 0) {
            fastRemoveAt(this.bodies, i);
            this._world.remove(sharedBody.body);
        }
    }
}
exports.CannonWorld = CannonWorld;
const from = new cannon_1.default.Vec3();
const to = new cannon_1.default.Vec3();
function setupFromAndTo(worldRay, distance) {
    Vec3.copy(from, worldRay.o);
    worldRay.computeHit(to, distance);
}
const raycastOpt = {
    'checkCollisionResponse': false,
    'collisionFilterGroup': -1,
    'collisionFilterMask': -1,
    'skipBackFaces': false
};
