"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDate = exports.isString = exports.isNumber = exports.ok = exports.error = void 0;
/**
 * Helper function for Result type.
 */
const error = (message) => {
    return { k: 'error', message };
};
exports.error = error;
/**
 * Helper function for Result type.
 */
const ok = (value) => {
    return { k: 'ok', value };
};
exports.ok = ok;
const isNumber = (param) => {
    return typeof param === 'number' || param instanceof Number;
};
exports.isNumber = isNumber;
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.isString = isString;
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.isDate = isDate;
