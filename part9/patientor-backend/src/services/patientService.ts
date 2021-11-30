/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patients from "../../data/patients";
import { NonSensitivePatientEntry, Patient, NewPatient } from "../types";
import {v1 as uuid} from 'uuid';

const getPatients = (): NonSensitivePatientEntry [] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
      }));
};

const addPatient = (patient: NewPatient): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id: string = uuid();
    const newPatient = {
        id,
        ...patient
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    addPatient
};