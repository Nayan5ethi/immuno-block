// TODO real fieldset, check formik docs, check milligram

import React, { Fragment } from 'react';

import { Button, DateTimeFields, TextField } from '/core/forms/fields';


const CertificateFieldSet = () => (
  <Fragment>
    <hr />
    <h2>Issue Certificate</h2>
    <TextField
      label="Vaccine Serial Number"
      name="testKitId"
      type="text"
    />
    <DateTimeFields
      label="Date and time of vaccination"
      nameDate="sampleDate"
      nameTime="sampleTime"
    />

    <Button type="submit">Submit</Button>
  </Fragment>
);

export default CertificateFieldSet;
