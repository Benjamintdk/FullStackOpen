import React from "react";
import { HealthCheckEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { Grid, Button, Modal, Segment } from "semantic-ui-react";

export type HealthCheckEntryFormValues = Omit<HealthCheckEntry, "id">;

interface Props {
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    onCancel: () => void;
}

interface ModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HealthCheckEntryFormValues) => void;
    error?: string;
  }

export const AddHealthCheckForm = ({ onSubmit, onCancel }: Props) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            description: "",
            specialist: "",
            date: "",
            type: "HealthCheck",
            healthCheckRating: 0
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.description) {
            errors.description = requiredError;
            }
            if (!values.specialist) {
            errors.specialist = requiredError;
            }
            if (!values.date) {
            errors.date = requiredError;
            }
            return errors;
        }}
        >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="John Doe"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              placeholder = {0}
              min={0}
              max={3}
              component={NumberField}
            />
            <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
            />  
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

const AddHealthCheckModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHealthCheckForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
);

export default AddHealthCheckModal;