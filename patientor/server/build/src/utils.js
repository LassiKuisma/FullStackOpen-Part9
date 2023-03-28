"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
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
    try {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
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
    if (!isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDateOfBirth = (date) => {
    if (!isString(date) || !isDate(date)) {
        throw new Error('Incorrect date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!isString(ssn)) {
        throw new Error('Invalid social security number');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((g) => g.toString())
        .includes(param);
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
exports.default = toNewPatientEntry;
