"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var maskit_1 = __importDefault(require("./maskit"));
var applyTheMask = function (input, mask) {
    var masked = '';
    var escapedCharacters = 0;
    var inputArray = input.split('');
    while (inputArray.length > 0) {
        var _a = maskit_1.default(masked + inputArray.shift(), mask, escapedCharacters), value = _a.value, escaped = _a.escaped;
        escapedCharacters += escaped;
        masked = value;
    }
    return masked;
};
exports.default = applyTheMask;
