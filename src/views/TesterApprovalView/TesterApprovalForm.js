import React from "react";
import { Formik,Field, Form } from 'formik';
import * as Yup from 'yup';

import { TextField } from '/core/forms/fields';
import { SEPARATOR } from "/core/constants";


const TesterApprovalForm = () => (
 
  <Formik
    initialValues={{
      name: '',
      id: '',
      address: '',
    }}
    validationSchema={Yup.object({
      name: Yup.string().required('This field is required'),
      id: Yup.string().required('This field is required'),
      address: Yup.string().required('This field is required'),
    })}
    onSubmit={(values, { setSubmitting }) => {
      const testerId = `${values.id}${SEPARATOR}${values.name}`;
      approveTester(values.address, testerId);
      setSubmitting(false);
    }}
  >
    {({ values }) => (
        <Form>
          <div>Form</div>
          <div role="group" aria-labelledby="my-radio-group">
          <label>
              Name
              <Field name="Name" />
            </label>
            <label>
              Wallet Address
              <Field name="Wallet Address" />
            </label>
            <label>
              Doctor ID
              <Field name="Doctor ID" />
            </label>
          </div>

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
);

export default  TesterApprovalForm;