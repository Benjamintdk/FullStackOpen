import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const OccupationalHealthCare = ({ entry }: { entry: OccupationalHealthcareEntry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="stethoscope"/>
                </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <Icon color="green" name="heart outline" />
            </Card.Content>
        </Card>
    );
};

const Hospital = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="hospital"/>
                </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <Icon color="yellow" name="heart outline" />
            </Card.Content>
        </Card>
    );
};

const HealthCheck = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    {entry.date}
                    <Icon name="h square"/>
                </Card.Header>
                <Card.Description>{entry.description}</Card.Description>
                <Icon color="blue" name="heart outline" />
            </Card.Content>
        </Card>
    );
};

const EntryDetails = ({ entry }: { entry: Entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <Hospital entry={entry} />;
        case "HealthCheck":
            return <HealthCheck entry={entry} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthCare entry={entry} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;