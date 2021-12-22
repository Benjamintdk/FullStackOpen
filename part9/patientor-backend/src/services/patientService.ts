/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */
import patients from "../../data/patients";
import { NonSensitivePatientEntry,
         Patient, 
         NewPatient,
         Entry } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
      }));
};

const getPatientById = (id: string): NonSensitivePatientEntry | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, newEntry: Entry): Entry => {
    patients.forEach(patient => {
        if (patientId !== patient.id) {
            return patient;
        } else {
            patient.entries.push(newEntry);
            return patient;
        }
    });
    return newEntry;
};

export default {
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};