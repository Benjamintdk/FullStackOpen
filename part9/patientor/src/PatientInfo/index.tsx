import React from 'react';
import { Patient, Gender, Entry } from '../types';
import { useParams } from 'react-router';
import { apiBaseUrl } from "../constants";
import { Icon, SemanticICONS, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useStateValue, addPatient, addEntry } from "../state";
import EntryDetails from './EntryDetails';
import AddHealthCheckModal, { HealthCheckEntryFormValues } from './AddHealthCheckModal';
import AddHospitalModal, { HospitalEntryFormValues } from './AddHospitalModal';
import AddOccupationalHealthcareModal, { OccupationalHealthcareFormValues } from './AddOccupationalHealthcareModal';

const PatientInfo = () => {
    const [ { patients }, dispatch ] = useStateValue();
    const [ entryType, setEntryType ] = React.useState('HealthCheckEntry');
    const [ modalOpen, setModalOpen ] = React.useState<boolean>(false);
    const [ error, setError ] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const [patient, setPatient] = React.useState<Patient | undefined>();
    const [ genderIcon, setGenderIcon ] = React.useState<SemanticICONS | undefined>();
    const { id } = useParams<{ id: string }>();

    React.useEffect(() => {
        const fetchPatient = async () => {
            if (patients[id] && patients[id].ssn) {
                setPatient(patients[id]);
                genderSign(patients[id].gender);
            } else {
                try {
                    const { data: singlePatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                    setPatient(singlePatient);
                    genderSign(singlePatient.gender);
                    dispatch(addPatient(singlePatient));
                } catch (e) {
                    console.error(e.response?.data || 'Unknown Error');
                }
            }
        };

        void fetchPatient();
    }, []);

    const genderSign = (gender: Gender): void => {
        switch (gender) {
            case "male":
                setGenderIcon("mars");
                return;
            case "female":
                setGenderIcon("venus");
                return;
            default:
                setGenderIcon("genderless");
                return;
        }
    };

    const submitNewEntry = async (values: HealthCheckEntryFormValues 
        | HospitalEntryFormValues 
        | OccupationalHealthcareFormValues) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          console.log(newEntry);
          dispatch(addEntry(newEntry, id));
        } catch (e) {
          console.error(e.response?.data || 'Unknown Error');
          setError(e.response?.data?.error || 'Unknown error');
        }
    };

    return (
        <>
        {
            patient &&
            <div>
                <h1>
                    <b>
                        {patient.name}
                        <Icon name={genderIcon} />
                    </b>
                </h1>
                <p>ssn:{patient.ssn}</p>
                <p>occupation:{patient.occupation}</p>
                <h3>entries</h3>
                <p>
                    <select onChange={(e) => setEntryType(e.target.value)}>
                        <option value="HealthCheckEntry">HealthCheckEntry</option>
                        <option value="HospitalEntry">HospitalEntry</option>
                        <option value="OccupationalHealthcareEntry">
                        OccupationalHealthcareEntry
                        </option>
                    </select>
                </p>
                {entryType === "HealthCheckEntry" && <AddHealthCheckModal 
                                                        modalOpen={modalOpen}
                                                        onSubmit={submitNewEntry} 
                                                        error={error}
                                                        onClose={closeModal}/>}
                {entryType === "HospitalEntry" && <AddHospitalModal 
                                                        modalOpen={modalOpen}
                                                        onSubmit={submitNewEntry} 
                                                        error={error}
                                                        onClose={closeModal}/>}
                {entryType === "OccupationalHealthcareEntry" && <AddOccupationalHealthcareModal 
                                                                    modalOpen={modalOpen}
                                                                    onSubmit={submitNewEntry} 
                                                                    error={error}
                                                                    onClose={closeModal}/>}
                <Button onClick={() => openModal()}>Add New Entry</Button>
                <div>
                    {patient.entries.map((entry: Entry) => <EntryDetails key={entry.id} entry={entry} />
                    )}
                </div>
            </div>
        }
        </>
    );
};

export default PatientInfo;