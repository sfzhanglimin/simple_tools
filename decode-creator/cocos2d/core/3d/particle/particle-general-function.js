"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSign = exports.randomSortArray = exports.randomPointBetweenCube = exports.randomPointInCube = exports.randomPointBetweenCircleAtFixedAngle = exports.randomPointBetweenCircle = exports.randomPointInUnitCircle = exports.randomPointBetweenSphere = exports.randomPointInUnitSphere = exports.randomUnitVector = exports.randomUnitVector2 = exports.fixedAngleUnitVector2 = exports.calculateTransform = exports.particleEmitZAxis = void 0;
const value_types_1 = require("../../value-types");
const utils_1 = require("../../value-types/utils");
const enum_1 = require("./enum");
exports.particleEmitZAxis = new value_types_1.Vec3(0, 0, -1);
function calculateTransform(systemSpace, moduleSpace, worldTransform, outQuat) {
    if (moduleSpace !== systemSpace) {
        if (systemSpace === enum_1.Space.World) {
            value_types_1.Mat4.getRotation(outQuat, worldTransform);
        }
        else {
            value_types_1.Mat4.invert(worldTransform, worldTransform);
            value_types_1.Mat4.getRotation(outQuat, worldTransform);
        }
        return true;
    }
    else {
        value_types_1.Quat.set(outQuat, 0, 0, 0, 1);
        return false;
    }
}
exports.calculateTransform = calculateTransform;
function fixedAngleUnitVector2(out, theta) {
    value_types_1.Vec2.set(out, Math.cos(theta), Math.sin(theta));
}
exports.fixedAngleUnitVector2 = fixedAngleUnitVector2;
function randomUnitVector2(out) {
    const a = (0, value_types_1.randomRange)(0, 2 * Math.PI);
    const x = Math.cos(a);
    const y = Math.sin(a);
    value_types_1.Vec2.set(out, x, y);
}
exports.randomUnitVector2 = randomUnitVector2;
function randomUnitVector(out) {
    const z = (0, value_types_1.randomRange)(-1, 1);
    const a = (0, value_types_1.randomRange)(0, 2 * Math.PI);
    const r = Math.sqrt(1 - z * z);
    const x = r * Math.cos(a);
    const y = r * Math.sin(a);
    value_types_1.Vec3.set(out, x, y, z);
}
exports.randomUnitVector = randomUnitVector;
function randomPointInUnitSphere(out) {
    randomUnitVector(out);
    value_types_1.Vec3.scale(out, out, (0, value_types_1.random)());
}
exports.randomPointInUnitSphere = randomPointInUnitSphere;
function randomPointBetweenSphere(out, minRadius, maxRadius) {
    randomUnitVector(out);
    value_types_1.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, value_types_1.random)());
}
exports.randomPointBetweenSphere = randomPointBetweenSphere;
function randomPointInUnitCircle(out) {
    randomUnitVector2(out);
    out.z = 0;
    value_types_1.Vec3.scale(out, out, (0, value_types_1.random)());
}
exports.randomPointInUnitCircle = randomPointInUnitCircle;
function randomPointBetweenCircle(out, minRadius, maxRadius) {
    randomUnitVector2(out);
    out.z = 0;
    value_types_1.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, value_types_1.random)());
}
exports.randomPointBetweenCircle = randomPointBetweenCircle;
function randomPointBetweenCircleAtFixedAngle(out, minRadius, maxRadius, theta) {
    fixedAngleUnitVector2(out, theta);
    out.z = 0;
    value_types_1.Vec3.scale(out, out, minRadius + (maxRadius - minRadius) * (0, value_types_1.random)());
}
exports.randomPointBetweenCircleAtFixedAngle = randomPointBetweenCircleAtFixedAngle;
function randomPointInCube(out, extents) {
    value_types_1.Vec3.set(out, (0, value_types_1.randomRange)(-extents.x, extents.x), (0, value_types_1.randomRange)(-extents.y, extents.y), (0, value_types_1.randomRange)(-extents.z, extents.z));
}
exports.randomPointInCube = randomPointInCube;
function randomPointBetweenCube(out, minBox, maxBox) {
    const subscript = ['x', 'y', 'z'];
    const edge = (0, value_types_1.randomRangeInt)(0, 3);
    for (let i = 0; i < 3; i++) {
        if (i === edge) {
            out[subscript[i]] = (0, value_types_1.randomRange)(-maxBox[subscript[i]], maxBox[subscript[i]]);
            continue;
        }
        const x = (0, value_types_1.random)() * 2 - 1;
        if (x < 0) {
            out[subscript[i]] = -minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
        }
        else {
            out[subscript[i]] = minBox[subscript[i]] + x * (maxBox[subscript[i]] - minBox[subscript[i]]);
        }
    }
}
exports.randomPointBetweenCube = randomPointBetweenCube;
// Fisher–Yates shuffle
function randomSortArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        const transpose = i + (0, value_types_1.randomRangeInt)(0, arr.length - i);
        const val = arr[transpose];
        arr[transpose] = arr[i];
        arr[i] = val;
    }
}
exports.randomSortArray = randomSortArray;
function randomSign() {
    let sgn = (0, value_types_1.randomRange)(-1, 1);
    sgn === 0 ? sgn++ : sgn;
    return (0, utils_1.sign)(sgn);
}
exports.randomSign = randomSign;
