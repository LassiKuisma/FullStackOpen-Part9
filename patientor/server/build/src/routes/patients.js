"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const newPatientEntry_1 = __importDefault(require("../utils/newPatientEntry"));
const newEntry_1 = __importDefault(require("../utils/newEntry"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getPatients());
});
router.post('/', (req, res) => {
    const result = (0, newPatientEntry_1.default)(req.body);
    if (result instanceof Error) {
        return res.status(400).send('Error: ' + result.message);
    }
    const addedEntry = patientService_1.default.addPatient(result);
    return res.json(addedEntry);
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (!patient) {
        return res.status(404).send(`Patient '${id}' not found`);
    }
    return res.send(patient);
});
router.post('/:id/entries', (req, res) => {
    const id = req.params.id;
    const patient = patientService_1.default.getPatientById(id);
    if (!patient) {
        return res.status(404).send(`Patient '${id}' not found`);
    }
    const entry = (0, newEntry_1.default)(req.body);
    if (entry.k === 'error') {
        return res.status(400).send(entry.message);
    }
    const newEntry = patientService_1.default.addEntry(patient, entry.value);
    return res.send(newEntry);
});
exports.default = router;
