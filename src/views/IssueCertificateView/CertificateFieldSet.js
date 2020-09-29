// TODO real fieldset, check formik docs, check milligram

import React, { Fragment } from 'react';

import { Button, DateTimeFields, TextField } from '/core/forms/fields';


const CertificateFieldSet = () => (
  <Fragment>
    <hr />
    <h2>Issue Certificate</h2>
    <TextField
      label="Vaccine ID"
      name="vaccineId"
      type="text"
    />
    <DateTimeFields
      label="Vaccine Date and Time"
      nameDate="vaccineDate"
      nameTime="vaccineTime"
    />
    <Button type="submit">Submit</Button>
  </Fragment>
);

export default CertificateFieldSet;
