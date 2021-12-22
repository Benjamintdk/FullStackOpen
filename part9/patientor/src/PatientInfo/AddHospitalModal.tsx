import React from "react";
import { HospitalEntry } from "../types";
import { Field, Formik, Form } from "formik";
import { useStateValue } from "../state";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";
import { Grid, Button, Modal, Segment } from "semantic-ui-react";

export type HospitalEntryFormValues = Omit<HospitalEntry, "id">;

interface Props {
    onSubmit: (values: HospitalEntryFormValues) => void;
    onCancel: () => void;
}

interface ModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: HospitalEntryFormValues) => void;
    error?: string;
  }

export const AddHospitalForm = ({ onSubmit, onCancel }: Props) => {

    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            description: "",
            specialist: "",
            date: "",
            type: "Hospital",
            discharge: {
                date: "",
                criteria: ""
            }
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
            if (!values.discharge) {
                errors.discharge = requiredError;
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
              label="Discharge Date"
              name="discharge.date"
              placeholder = "discharge date"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              name="discharge.criteria"
              placeholder = "discharge criteria"
              component={TextField}
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

const AddHospitalModal = ({ modalOpen, onClose, onSubmit, error }: ModalProps) => (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddHospitalForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
);

export default AddHospitalModal;