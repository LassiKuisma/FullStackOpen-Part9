"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("./utils");
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        return new Error('Incorrect or missing data');
    }
    if (!('name' in object) ||
        !('dateOfBirth' in object) ||
        !('ssn' in object) ||
        !('gender' in object) ||
        !('occupation' in object)) {
        return new Error('Incorrect data: field(s) missing');
    }
    let entries = undefined;
    if ('entries' in object) {
        entries = object.entries;
    }
    try {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: parseEntries(entries),
        };
    }
    catch (error) {
        // I prefer to return errors instead of throwing them, as  that way they
        // can be clearly seen in function signature
        if (error instanceof Error) {
            return error;
        }
        return new Error('Something went wrong');
    }
};
const parseName = (name) => {
    if (!(0, utils_1.isString)(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!(0, utils_1.isString)(date) || !(0, utils_1.isDate)(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!(0, utils_1.isString)(ssn)) {
        throw new Error('Invalid social security number');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!(0, utils_1.isString)(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!(0, utils_1.isString)(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseEntries = (entries) => {
    if (!entries || !(entries instanceof Array)) {
        return new Array();
    }
    const parsed = entries.map((entry) => {
        if (!('type' in entry)) {
            throw new Error('Entry is missing type.');
        }
        return entry;
    });
    return parsed;
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
exports.default = toNewPatientEntry;
