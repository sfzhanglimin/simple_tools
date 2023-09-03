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
exports.PhysicsRayResult = void 0;
const Vec3 = cc.Vec3;
/**
 * !#en
 * Used to store physical ray detection results
 * !#zh
 * 用于保存物理射线检测结果
 * @class PhysicsRayResult
 */
class PhysicsRayResult {
    constructor() {
        this._hitPoint = new Vec3();
        this._distance = 0;
        this._collidier = null;
    }
    /**
     * !#en
     * Hit the point
     * !#zh
     * 击中点
     * @property {Vec3} hitPoint
     * @readonly
     */
    get hitPoint() {
        return this._hitPoint;
    }
    /**
     * !#en
     * Distance
     * !#zh
     * 距离
     * @property {number} distance
     * @readonly
     */
    get distance() {
        return this._distance;
    }
    /**
     * !#en
     * Hit the collision box
     * !#zh
     * 击中的碰撞盒
     * @property {Collider3D} collider
     * @readonly
     */
    get collider() {
        return this._collidier;
    }
    /**
     * !#en
     * Set up ray. This method is used internally by the engine. Do not call it from an external script
     * !#zh
     * 设置射线，此方法由引擎内部使用，请勿在外部脚本调用
     * @method _assign
     * @param {Vec3} hitPoint
     * @param {number} distance
     * @param {Collider3D} collider
     */
    _assign(hitPoint, distance, collider) {
        Vec3.copy(this._hitPoint, hitPoint);
        this._distance = distance;
        this._collidier = collider;
    }
    /**
     * !#en
     * Clone
     * !#zh
     * 克隆
     * @method clone
     */
    clone() {
        const c = new PhysicsRayResult();
        Vec3.copy(c._hitPoint, this._hitPoint);
        c._distance = this._distance;
        c._collidier = this._collidier;
        return c;
    }
}
exports.PhysicsRayResult = PhysicsRayResult;
