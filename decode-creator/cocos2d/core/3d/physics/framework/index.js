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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RigidBody3D = exports.SphereCollider3D = exports.BoxCollider3D = exports.Collider3D = exports.PhysicsMaterial = exports.PhysicsRayResult = exports.Physics3DManager = void 0;
const physics_manager_1 = require("./physics-manager");
Object.defineProperty(exports, "Physics3DManager", { enumerable: true, get: function () { return physics_manager_1.Physics3DManager; } });
const physics_ray_result_1 = require("./physics-ray-result");
Object.defineProperty(exports, "PhysicsRayResult", { enumerable: true, get: function () { return physics_ray_result_1.PhysicsRayResult; } });
const box_collider_component_1 = require("./components/collider/box-collider-component");
Object.defineProperty(exports, "BoxCollider3D", { enumerable: true, get: function () { return box_collider_component_1.BoxCollider3D; } });
const collider_component_1 = require("./components/collider/collider-component");
Object.defineProperty(exports, "Collider3D", { enumerable: true, get: function () { return collider_component_1.Collider3D; } });
const sphere_collider_component_1 = require("./components/collider/sphere-collider-component");
Object.defineProperty(exports, "SphereCollider3D", { enumerable: true, get: function () { return sphere_collider_component_1.SphereCollider3D; } });
const rigid_body_component_1 = require("./components/rigid-body-component");
Object.defineProperty(exports, "RigidBody3D", { enumerable: true, get: function () { return rigid_body_component_1.RigidBody3D; } });
const constant_force_1 = require("./components/constant-force");
const physics_material_1 = require("./assets/physics-material");
Object.defineProperty(exports, "PhysicsMaterial", { enumerable: true, get: function () { return physics_material_1.PhysicsMaterial; } });
cc.Physics3DManager = physics_manager_1.Physics3DManager;
cc.Collider3D = collider_component_1.Collider3D;
cc.BoxCollider3D = box_collider_component_1.BoxCollider3D;
cc.SphereCollider3D = sphere_collider_component_1.SphereCollider3D;
cc.RigidBody3D = rigid_body_component_1.RigidBody3D;
cc.PhysicsRayResult = physics_ray_result_1.PhysicsRayResult;
cc.ConstantForce = constant_force_1.ConstantForce;
