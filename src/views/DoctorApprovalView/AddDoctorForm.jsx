import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CheckMark } from '../../core/components';
import { Message } from '../../core/messages';
import { Button, TextField } from '../../core/forms/fields';

const RegisterDoctorForm = () => {

  const [registrationCompleted, setRegistrationCompleted] = useState(false);

  return (
    <Formik
      initialValues={{
        account: '',
        doctorName: '',
      }}
      validationSchema={Yup.object({
        doctorName: Yup.string().required('This field is required'),
        account: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        approveDoctor(values.account, values.doctorName).then((result) => {
          result.status ? setRegistrationCompleted(true) : console.error(result);
          setSubmitting(false);
        }).catch((error) => {
          console.error(error);
          setSubmitting(false);
        });
      }}
    >
      {(form) => {

        useEffect(() => {
          resetDoctorForm();
        }, []);

        const resetDoctorForm = () => {
          setRegistrationCompleted(false);
          ['doctorName', 'account'].map((fieldName) => {
            form.setFieldValue(fieldName, form.initialValues[fieldName]);
          });
        }

        const handleFormReset = () => {
          form.resetForm();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        return (
          <Form>
            <h2>Register Doctor</h2>

            <TextField
              label="Doctor Name"
              name="doctorName"
              type="text"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.doctorName}
            />

            <TextField
              label="Account Address"
              name="account"
              type="text"
              onBlur={form.handleBlur}
              onChange={form.handleChange}
              value={form.values.account}
            />

            {registrationCompleted && (
              <div>
                <CheckMark size="large" />
                <h4 className="padded">Registration completed</h4>
                <Button className="button-outline" onClick={handleFormReset}>Register Another</Button>
              </div>
            )}

            {(!registrationCompleted && form.isSubmitting) && (
              <Message>
                Please wait for the registration process to complete.
                This may take a moment.
              </Message>
            )}

            {(!registrationCompleted && !form.isSubmitting) && (
              <Button type="submit">Register Doctor</Button>
            )}

          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterDoctorForm;
