"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const value_types_1 = require("../../value-types");
class Particle {
    constructor(particleSystem) {
        this.particleSystem = null;
        this.position = null;
        this.velocity = null;
        this.animatedVelocity = null;
        this.ultimateVelocity = null;
        this.angularVelocity = null;
        this.axisOfRotation = null;
        this.rotation = null;
        this.startSize = null;
        this.size = null;
        this.startColor = null;
        this.color = cc.Color.WHITE;
        this.randomSeed = null; // uint
        this.remainingLifetime = null;
        this.startLifetime = null;
        this.emitAccumulator0 = null;
        this.emitAccumulator1 = null;
        this.frameIndex = null;
        this.particleSystem = particleSystem;
        this.position = new value_types_1.Vec3(0, 0, 0);
        this.velocity = new value_types_1.Vec3(0, 0, 0);
        this.animatedVelocity = new value_types_1.Vec3(0, 0, 0);
        this.ultimateVelocity = new value_types_1.Vec3(0, 0, 0);
        this.angularVelocity = new value_types_1.Vec3(0, 0, 0);
        this.axisOfRotation = new value_types_1.Vec3(0, 0, 0);
        this.rotation = new value_types_1.Vec3(0, 0, 0);
        this.startSize = new value_types_1.Vec3(0, 0, 0);
        this.size = new value_types_1.Vec3(0, 0, 0);
        this.startColor = cc.Color.WHITE.clone();
        this.color = cc.Color.WHITE.clone();
        this.randomSeed = 0; // uint
        this.remainingLifetime = 0.0;
        this.startLifetime = 0.0;
        this.emitAccumulator0 = 0.0;
        this.emitAccumulator1 = 0.0;
        this.frameIndex = 0.0;
    }
}
exports.default = Particle;
