/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Diagnosis,
         NewPatient,
         Gender, 
         Entry, 
         BaseEntry, 
         HealthCheckEntry,
         HospitalEntry,
         OccupationalHealthcareEntry,
         HealthCheckRating } from "./types";

export const toNewEntry = (object: any): Entry => {
    const newEntry = parseEntry(object);
    return newEntry;
};

export const toNewPatient = (object: any): NewPatient => {
    const newPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
    return newPatient;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name: " + name);
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing ssn: " + ssn);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation: " + occupation);
    }
    return occupation;
};

const parseEntries = (entries: any): Entry[] => {
    if (!entries || !Array.isArray(entries)) {
        throw new Error("Incorrect or missing entries: " + entries);
    }

    return entries.map((entry: any) => {
        return parseEntry(entry);
    });
};

const parseEntry = (entry: any): Entry => {
    if (!isBaseEntry(entry)) {
        throw new Error("Not base entry");
    } else if (isHospitalEntry(entry) || isOccupationalHealthCareEntry(entry) || isHealthCheckEntry(entry)) {
        return entry;
    } else {
        throw new Error(`Not an entry from the above types.`);
    }
};

const isBaseEntry = (entry: any): entry is BaseEntry => {

    if (!entry) {
        throw new Error('Missing Entry');
    }

    if (!entry.id || !isString(entry.id)) {
        throw new Error("Incorrect or missing id: " + entry.id);
    }
    if (!entry.description || !isString(entry.description)) {
        throw new Error("Incorrect or missing description: " + entry.description);
    }
    if (!entry.date || !isString(entry.date)) {
        throw new Error("Incorrect or missing date: " + entry.date);
    }
    if (!entry.specialist || !isString(entry.specialist)) {
        throw new Error("Incorrect or missing specialist: " + entry.specialist);
    }
    if (entry.diagnosisCodes) {
        if (!isDiagnosisCodes(entry.diagnosisCodes)) {
            throw new Error("Incorrect diagnosis codes: " + entry.diagnosisCodes);
        }
    }
    return true;
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
    if (entry.discharge &&
        Object.keys(entry.discharge).includes('date') &&
        Object.keys(entry.discharge).includes('criteria')) {
        if (!isString(entry.discharge.criteria) || (entry.discharge.date.length !== 0 && !isDate(entry.discharge.date))) {
          throw new Error('Incorrect discharge information');
        } else {
          return true;
        }
    }
    return false;
};

const isOccupationalHealthCareEntry = (entry: any): entry is OccupationalHealthcareEntry => {
    if (entry.employerName && isString(entry.employerName)) {
        if (entry.sickLeave &&
            Object.keys(entry.sickLeave).includes('startDate') &&
            Object.keys(entry.sickLeave).includes('endDate')) {
                if ((entry.sickLeave.startDate.length !== 0 ||
                    entry.sickLeave.endDate.length !== 0) &&
                    (!isDate(entry.sickLeave.startDate) ||
                    !isDate(entry.sickLeave.endDate))) {
                        throw new Error('Incorrect sick leave information');
                }
        }
        return true;
    }
    return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
    if (entry.healthCheckRating !== undefined) {
        if (!Object.values(HealthCheckRating)
              .includes(entry.healthCheckRating)) {
            throw new Error("Incorrect health check rating provided");
        } else {
            return true;
        }
    }
    return false;
};

const isDiagnosisCodes = (codes: any): codes is Array<Diagnosis['code']> => {
    if (!codes || !Array.isArray(codes)) {
        throw new Error("Incorrect or missing diagnosis codes");
    }
    return codes.every((code: any) => isString(code));
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (params: any): params is Gender => {
    return Object.values(Gender).includes(params);
};

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
