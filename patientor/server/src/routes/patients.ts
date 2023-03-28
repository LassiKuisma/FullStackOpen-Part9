import express from 'express';

import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const result = toNewPatientEntry(req.body);
  if (result instanceof Error) {
    return res.status(400).send('Error: ' + result.message);
  }

  const addedEntry = patientService.addPatient(result);
  return res.json(addedEntry);
});

export default router;
