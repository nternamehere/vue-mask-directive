"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var applyTheMask_1 = __importDefault(require("./applyTheMask"));
exports.default = {
    inserted: function (el, _a) {
        var value = _a.value;
        if (!(/input/i).test(el.tagName) || !(/text/i).test(el.type)) {
            console.warn('v-mask: Element with mask directive needs to be a text input to work appropriately.', el);
            return;
        }
        if (value.length === 0) {
            console.warn('v-mask: Element with mask directive needs a mask value to work appropriately.', el);
            return;
        }
        if (el.getAttribute('mask-placeholder') !== 'false') {
            el.placeholder = value;
        }
        el.value = applyTheMask_1.default(el.value, value);
        el.dispatchEvent(new CustomEvent('input'));
    },
    bind: function (el, _a) {
        var value = _a.value;
        if (!(/input/i).test(el.tagName) || !(/text/i).test(el.type) || value.length === 0) {
            return;
        }
        el.addEventListener('input', function (e) {
            var _a = e, inputType = _a.inputType, isTrusted = _a.isTrusted;
            if ((/(delete|backspace)/i).test(inputType) || !isTrusted) {
                return;
            }
            el.value = applyTheMask_1.default(el.value, value);
            el.dispatchEvent(new CustomEvent('input'));
        });
    },
};
