"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assembler_1 = __importDefault(require("../../../assembler"));
const CCSprite_1 = require("../../../../components/CCSprite");
const simple_1 = __importDefault(require("./2d/simple"));
const sliced_1 = __importDefault(require("./2d/sliced"));
const tiled_1 = __importDefault(require("./2d/tiled"));
const radial_filled_1 = __importDefault(require("./2d/radial-filled"));
const bar_filled_1 = __importDefault(require("./2d/bar-filled"));
const mesh_1 = __importDefault(require("./2d/mesh"));
const simple_2 = __importDefault(require("./3d/simple"));
const sliced_2 = __importDefault(require("./3d/sliced"));
const tiled_2 = __importDefault(require("./3d/tiled"));
const radial_filled_2 = __importDefault(require("./3d/radial-filled"));
const bar_filled_2 = __importDefault(require("./3d/bar-filled"));
const mesh_2 = __importDefault(require("./3d/mesh"));
let ctor = {
    getConstructor(sprite) {
        let is3DNode = sprite.node.is3DNode;
        let ctor = is3DNode ? simple_2.default : simple_1.default;
        switch (sprite.type) {
            case CCSprite_1.Type.SLICED:
                ctor = is3DNode ? sliced_2.default : sliced_1.default;
                break;
            case CCSprite_1.Type.TILED:
                ctor = is3DNode ? tiled_2.default : tiled_1.default;
                break;
            case CCSprite_1.Type.FILLED:
                if (sprite._fillType === CCSprite_1.FillType.RADIAL) {
                    ctor = is3DNode ? radial_filled_2.default : radial_filled_1.default;
                }
                else {
                    ctor = is3DNode ? bar_filled_2.default : bar_filled_1.default;
                }
                break;
            case CCSprite_1.Type.MESH:
                ctor = is3DNode ? mesh_2.default : mesh_1.default;
                break;
        }
        return ctor;
    },
    Simple: simple_1.default,
    Sliced: sliced_1.default,
    Tiled: tiled_1.default,
    RadialFilled: radial_filled_1.default,
    BarFilled: bar_filled_1.default,
    Mesh: mesh_1.default,
    Simple3D: simple_2.default,
    Sliced3D: sliced_2.default,
    Tiled3D: tiled_2.default,
    RadialFilled3D: radial_filled_2.default,
    BarFilled3D: bar_filled_2.default,
    Mesh3D: mesh_2.default,
};
assembler_1.default.register(cc.Sprite, ctor);
