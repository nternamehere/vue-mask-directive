"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tokens_1 = __importDefault(require("./tokens"));
var maskit = function (rawInput, mask, escapedCharacters) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var input = rawInput.split('');
    var maskArray = mask.split('');
    var nextChar = input.pop() || '';
    var position = input.length + escapedCharacters;
    var escaped = 0;
    var char = '';
    if ((_a = tokens_1.default[maskArray[position]]) === null || _a === void 0 ? void 0 : _a.continue) {
        char = maskArray[maskArray.length - 2];
        if ((_c = (_b = tokens_1.default[char]) === null || _b === void 0 ? void 0 : _b.pattern) === null || _c === void 0 ? void 0 : _c.test(nextChar)) {
            input.push(tokens_1.default[char].transform !== undefined ? (_d = tokens_1.default[char]) === null || _d === void 0 ? void 0 : _d.transform(nextChar) : nextChar);
        }
        return {
            escaped: escaped,
            value: input.join(''),
        };
    }
    if (position >= maskArray.length) {
        if ((_e = tokens_1.default[maskArray[maskArray.length - 1]]) === null || _e === void 0 ? void 0 : _e.continue) {
            char = maskArray[maskArray.length - 2];
            if ((_g = (_f = tokens_1.default[char]) === null || _f === void 0 ? void 0 : _f.pattern) === null || _g === void 0 ? void 0 : _g.test(nextChar)) {
                input.push(tokens_1.default[char].transform !== undefined ? (_h = tokens_1.default[char]) === null || _h === void 0 ? void 0 : _h.transform(nextChar) : nextChar);
            }
        }
        return {
            escaped: escaped,
            value: input.join(''),
        };
    }
    while (!tokens_1.default[maskArray[position]] || tokens_1.default[maskArray[position]].escape) {
        if ((_j = tokens_1.default[maskArray[position]]) === null || _j === void 0 ? void 0 : _j.escape) {
            position++;
            escaped++;
        }
        if (maskArray[position] === nextChar) {
            input.push(maskArray[position]);
            return {
                escaped: escaped,
                value: input.join(''),
            };
        }
        input.push(maskArray[position]);
        position++;
    }
    char = maskArray[position];
    if ((_l = (_k = tokens_1.default[char]) === null || _k === void 0 ? void 0 : _k.pattern) === null || _l === void 0 ? void 0 : _l.test(nextChar)) {
        input.push(tokens_1.default[char].transform !== undefined ? (_m = tokens_1.default[char]) === null || _m === void 0 ? void 0 : _m.transform(nextChar) : nextChar);
        position++;
    }
    var completedOutput = '';
    while (position < maskArray.length) {
        if (tokens_1.default[maskArray[position]] && !tokens_1.default[maskArray[position]].escape) {
            completedOutput = '';
            break;
        }
        if ((_o = tokens_1.default[maskArray[position]]) === null || _o === void 0 ? void 0 : _o.escape) {
            position++;
            completedOutput += maskArray[position];
            position++;
            continue;
        }
        completedOutput += maskArray[position];
        position++;
    }
    return {
        escaped: escaped,
        value: input.join('') + completedOutput,
    };
};
exports.default = maskit;
