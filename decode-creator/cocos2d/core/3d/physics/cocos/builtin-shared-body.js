"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuiltinSharedBody = void 0;
const util_1 = require("../framework/util");
const intersect = cc.geomUtils.intersect;
const fastRemove = cc.js.array.fastRemove;
const v3_0 = new cc.Vec3();
const v3_1 = new cc.Vec3();
const quat_0 = new cc.Quat();
/**
 * Built-in static collider, no physical forces involved
 */
class BuiltinSharedBody {
    static getSharedBody(node, wrappedWorld) {
        const key = node._id;
        if (BuiltinSharedBody.sharedBodiesMap.has(key)) {
            return BuiltinSharedBody.sharedBodiesMap.get(key);
        }
        else {
            const newSB = new BuiltinSharedBody(node, wrappedWorld);
            BuiltinSharedBody.sharedBodiesMap.set(node._id, newSB);
            return newSB;
        }
    }
    get id() {
        return this._id;
    }
    /**
     * add or remove from world \
     * add, if enable \
     * remove, if disable & shapes.length == 0 & wrappedBody disable
     */
    set enabled(v) {
        if (v) {
            if (this.index < 0) {
                this.index = this.world.bodies.length;
                this.world.addSharedBody(this);
                this.syncSceneToPhysics(true);
            }
        }
        else {
            if (this.index >= 0) {
                const isRemove = (this.shapes.length == 0);
                if (isRemove) {
                    this.index = -1;
                    this.world.removeSharedBody(this);
                }
            }
        }
    }
    set reference(v) {
        v ? this.ref++ : this.ref--;
        if (this.ref == 0) {
            this.destory();
        }
    }
    constructor(node, world) {
        this.index = -1;
        this.ref = 0;
        this.shapes = [];
        this._id = BuiltinSharedBody.idCounter++;
        this.node = node;
        this.world = world;
    }
    intersects(body) {
        for (let i = 0; i < this.shapes.length; i++) {
            const shapeA = this.shapes[i];
            for (let j = 0; j < body.shapes.length; j++) {
                const shapeB = body.shapes[j];
                if (intersect.resolve(shapeA.worldShape, shapeB.worldShape)) {
                    this.world.shapeArr.push(shapeA);
                    this.world.shapeArr.push(shapeB);
                }
            }
        }
    }
    addShape(shape) {
        const i = this.shapes.indexOf(shape);
        if (i < 0) {
            this.shapes.push(shape);
        }
    }
    removeShape(shape) {
        fastRemove(this.shapes, shape);
    }
    syncSceneToPhysics(force = false) {
        let node = this.node;
        let needUpdateTransform = (0, util_1.worldDirty)(node);
        if (!force && !needUpdateTransform)
            return;
        node.getWorldPosition(v3_0);
        node.getWorldRotation(quat_0);
        node.getWorldScale(v3_1);
        for (let i = 0; i < this.shapes.length; i++) {
            this.shapes[i].transform(node._worldMatrix, v3_0, quat_0, v3_1);
        }
    }
    destory() {
        BuiltinSharedBody.sharedBodiesMap.delete(this.node._id);
        this.node = null;
        this.world = null;
        this.shapes = null;
    }
}
exports.BuiltinSharedBody = BuiltinSharedBody;
BuiltinSharedBody.sharedBodiesMap = new Map();
/** id generator */
BuiltinSharedBody.idCounter = 0;
