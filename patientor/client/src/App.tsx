import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Patient, Diagnosis } from './types';

import patientService from './services/patients';
import diagnosisService from './services/diagnosis';
import PatientListPage from './components/PatientListPage';
import PatientInfoPage from './components/PatientInfoPage';

import './App.css';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Map<string, Diagnosis>>(new Map());

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAllDiagnoses();
      const mapped = diagnoses.reduce((map, object) => {
        map.set(object.code, object);
        return map;
      }, new Map<string, Diagnosis>());

      setDiagnoses(mapped);
    };

    void fetchDiagnoses();
    void fetchPatientList();
  }, []);

  const match = useMatch('/patient/:id');
  const patientId = match?.params.id;

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patient/:id"
            element={<PatientInfoPage id={patientId} diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
