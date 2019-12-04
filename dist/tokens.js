"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tokens = {
    '!': { escape: true },
    '#': { pattern: /\d/ },
    '+': { continue: true },
    'A': { pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleUpperCase(); } },
    'S': { pattern: /[a-zA-Z]/ },
    'X': { pattern: /[0-9a-zA-Z]/ },
    'a': { pattern: /[a-zA-Z]/, transform: function (v) { return v.toLocaleLowerCase(); } },
};
exports.default = tokens;
