"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const utils_1 = require("./utils");
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        return (0, utils_1.error)('Incorrect or missing data');
    }
    if (!('type' in object))
        return (0, utils_1.error)('Missing field: type');
    if (!(0, utils_1.isString)(object.type)) {
        return (0, utils_1.error)('Field is not a string: type.');
    }
    switch (object.type) {
        case 'HealthCheck':
            return parseHealthCheckEntry(object);
        case 'OccupationalHealthcare':
            return parseOccupationalEntry(object);
        case 'Hospital':
            return parseHospitalEntry(object);
        default:
            return (0, utils_1.error)(`Unknown entry type: '${object.type}'.`);
    }
};
const parseFields = (object) => {
    if (!('date' in object))
        return (0, utils_1.error)('missing field: date');
    if (!('description' in object))
        return (0, utils_1.error)('missing field: description');
    if (!('specialist' in object))
        return (0, utils_1.error)('missing field: specialist');
    if (!((0, utils_1.isString)(object.date) && (0, utils_1.isDate)(object.date))) {
        return (0, utils_1.error)('Invalid field: date.');
    }
    if (!(0, utils_1.isString)(object.description)) {
        return (0, utils_1.error)('Field is not a string: description.');
    }
    if (!(0, utils_1.isString)(object.specialist)) {
        return (0, utils_1.error)('Field is not a string: specialist.');
    }
    const diagnosisCodes = parseDiagnosisCodes(object);
    return (0, utils_1.ok)({
        date: object.date,
        description: object.description,
        specialist: object.specialist,
        diagnosisCodes,
    });
};
const parseDiagnosisCodes = (object) => {
    if (!('diagnosisCodes' in object)) {
        return [];
    }
    // TODO/FIXME: this assumes data is in right form
    return object.diagnosisCodes;
};
const parseHealthCheckEntry = (object) => {
    const parseResult = parseFields(object);
    if (parseResult.k === 'error') {
        return parseResult;
    }
    const hcr = parseHealthCheckRating(object);
    if (hcr.k === 'error') {
        return hcr;
    }
    const baseEntry = parseResult.value;
    return (0, utils_1.ok)(Object.assign({ type: 'HealthCheck', healthCheckRating: hcr.value }, baseEntry));
};
const isHealthCheckRating = (param) => {
    return Object.values(types_1.HealthCheckRating).includes(param);
};
const parseHealthCheckRating = (object) => {
    if (!('healthCheckRating' in object)) {
        return (0, utils_1.error)('Missing field: healthCheckRating');
    }
    const hcr = object.healthCheckRating;
    if ((0, utils_1.isNumber)(hcr) && isHealthCheckRating(hcr)) {
        return (0, utils_1.ok)(hcr);
    }
    return (0, utils_1.error)('Invalid field: healthCheckRating');
};
const parseOccupationalEntry = (object) => {
    const parseResult = parseFields(object);
    if (parseResult.k === 'error') {
        return parseResult;
    }
    if (!('employerName' in object)) {
        return (0, utils_1.error)('Missing field: employerName');
    }
    if (!(0, utils_1.isString)(object.employerName)) {
        return (0, utils_1.error)('Field is not a string: employerName');
    }
    let sickLeave = undefined;
    if ('sickLeave' in object) {
        const sickLeaveParsed = parseSickLeave(object.sickLeave);
        if (sickLeaveParsed.k === 'error') {
            return sickLeaveParsed;
        }
        sickLeave = sickLeaveParsed.value;
    }
    const baseEntry = parseResult.value;
    return (0, utils_1.ok)(Object.assign({ type: 'OccupationalHealthcare', employerName: object.employerName, sickLeave }, baseEntry));
};
const parseSickLeave = (object) => {
    if (!object || typeof object !== 'object') {
        return (0, utils_1.error)('Incorrect or missing data: sickLeave');
    }
    if (!('startDate' in object))
        return (0, utils_1.error)('Missing field: startDate');
    if (!('endDate' in object))
        return (0, utils_1.error)('Missing field: endDate');
    if (!(0, utils_1.isString)(object.startDate) || !(0, utils_1.isDate)(object.startDate)) {
        return (0, utils_1.error)('Invalid date: startDate');
    }
    if (!(0, utils_1.isString)(object.endDate) || !(0, utils_1.isDate)(object.endDate)) {
        return (0, utils_1.error)('Invalid date: endDate');
    }
    return (0, utils_1.ok)({
        startDate: object.startDate,
        endDate: object.endDate,
    });
};
const parseHospitalEntry = (object) => {
    const parseResult = parseFields(object);
    if (parseResult.k === 'error') {
        return parseResult;
    }
    if (!('discharge' in object)) {
        return (0, utils_1.error)('Missing field: discharge');
    }
    const discharge = parseDischarge(object.discharge);
    if (discharge.k === 'error') {
        return discharge;
    }
    const baseEntry = parseResult.value;
    return (0, utils_1.ok)(Object.assign({ type: 'Hospital', discharge: discharge.value }, baseEntry));
};
const parseDischarge = (object) => {
    if (!object || typeof object !== 'object') {
        return (0, utils_1.error)('Incorrect or missing data: discharge');
    }
    if (!('date' in object))
        return (0, utils_1.error)('Missing field: discharge date');
    if (!('criteria' in object))
        return (0, utils_1.error)('Missing field: criteria');
    if (!(0, utils_1.isString)(object.date) || !(0, utils_1.isDate)(object.date)) {
        return (0, utils_1.error)('Invalid date');
    }
    if (!(0, utils_1.isString)(object.criteria)) {
        return (0, utils_1.error)('Field is not a string: criteria');
    }
    return (0, utils_1.ok)({
        date: object.date,
        criteria: object.criteria,
    });
};
exports.default = toNewEntry;
