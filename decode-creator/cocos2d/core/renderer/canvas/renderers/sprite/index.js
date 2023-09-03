"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assembler_1 = __importDefault(require("../../../assembler"));
const CCSprite_1 = require("../../../../components/CCSprite");
const simple_1 = __importDefault(require("./simple"));
const sliced_1 = __importDefault(require("./sliced"));
const tiled_1 = __importDefault(require("./tiled"));
let ctor = {
    getConstructor(sprite) {
        let ctor = simple_1.default;
        switch (sprite.type) {
            case CCSprite_1.Type.SLICED:
                ctor = sliced_1.default;
                break;
            case CCSprite_1.Type.TILED:
                ctor = tiled_1.default;
                break;
        }
        return ctor;
    },
    Simple: simple_1.default,
    Sliced: sliced_1.default,
    Tiled: tiled_1.default
};
assembler_1.default.register(cc.Sprite, ctor);
