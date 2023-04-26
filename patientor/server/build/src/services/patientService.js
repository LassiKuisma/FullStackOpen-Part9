"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};
const addPatient = (entry) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patients_1.default.push(newEntry);
    return newEntry;
};
const getPatientById = (id) => {
    return patients_1.default.find((p) => p.id === id);
};
const addEntry = (patient, entry) => {
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    patient.entries.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    addPatient,
    getPatientById,
    addEntry,
};
