"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = exports.options = void 0;
exports.options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};
const capitalize = (s) => {
    return s && s[0].toUpperCase() + s.slice(1);
};
exports.capitalize = capitalize;
//# sourceMappingURL=joiOptions.js.map