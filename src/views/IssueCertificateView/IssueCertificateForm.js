import React, { useEffect, useState, Fragment } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { CheckMark } from '/core/components';
import { Message } from '/core/messages';
import { SEPARATOR } from '/core/constants';
import { Button, RadioField } from '/core/forms/fields';
import { generatePepper } from '/core/utils';

import CertificateFieldSet from './CertificateFieldSet';
import CreatIdentityComponent from './CreatIdentityComponent';
import ScanIdentityComponent from './ScanIdentityComponent';

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);


const IssueCertificateForm = () => {

  const [pepper, setPepper] = useState('');
  const [governmentId, setgovernmentId] = useState('');
  const [certificateIssued, setCertificateIssued] = useState(false);

  return (
    <Formik
      initialValues={{
        identityMethod: 'create',
        governmentId: '',
        vaccineDate: todayStr,
        vaccineTime: '09:00',
        vaccineId: '',
      }}
      validationSchema={Yup.object({
        governmentId: Yup.string(),
        vaccineDate: Yup.string().required('This field is required'),
        vaccineTime: Yup.string().required('This field is required'),
        vaccineId: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personHash = web3.utils.sha3(`${governmentId}${SEPARATOR}${pepper}`);
        const vaccineTimestamp = Math.floor(Date.parse(`${values.vaccineDate}T${values.vaccineTime}`) / 1000);
        issueCertificate(personHash, vaccineTimestamp, values.vaccineId)
          .then((result) => { result.status ? setCertificateIssued(true) : console.error(result); })
          .catch(console.error)
          .finally(() => { setSubmitting(false); });
      }}
    >
      {(form) => {

        useEffect(() => {
          setPepper('');
          setgovernmentId('');
          resetCertificateForm();
        }, [form.values.identityMethod]);

        const resetCertificateForm = () => {
          setCertificateIssued(false);
          ['vaccineId', 'vaccineDate', 'vaccineTime'].map((fieldName) => {
            form.setFieldValue(fieldName, form.initialValues[fieldName]);
          });
        }

        const handleCreateIdentity = (_e) => {
          form.validateField('governmentId');
          setgovernmentId(form.values.governmentId);
          setPepper(generatePepper(8));
          resetCertificateForm();
        }

        const handleFormReset = (_e) => {
          form.resetForm();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const handleQrScan = (result) => {
          if (!result || !result.includes(SEPARATOR)) {
            console.error('Invalid QR code.');
            return;
          }
          const [qrgovernmentId, qrPepper] = result.split(SEPARATOR);
          setgovernmentId(qrgovernmentId);
          setPepper(qrPepper);
          resetCertificateForm();
        }

        return (
          <Form>

            <h2>Choose Identity</h2>

            <div className="radio-button-group">
              {[['create', 'Create new identity'], ['scan', 'Scan existing ID']].map(
                ([value, label]) => (
                  <RadioField
                    key={value}
                    value={value}
                    label={label}
                    name="identityMethod"
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    checked={form.values.identityMethod == value}
                  />
                )
              )}
            </div>

            {form.values.identityMethod === 'create' && (
              <CreatIdentityComponent
                onSubmit={handleCreateIdentity}
                governmentId={governmentId}
                pepper={pepper}
              />
            )}

            {form.values.identityMethod === 'scan' && (
              <ScanIdentityComponent
                onScan={handleQrScan}
                governmentId={governmentId}
                pepper={pepper}
              />
            )}

            {certificateIssued && (
              <Fragment>
                <CheckMark size="large" />
                <h4 className="padded">Certificate issued</h4>
                <Button className="button-outline" onClick={handleFormReset}>Issue Another</Button>
              </Fragment>
            )}

            {(!certificateIssued && form.isSubmitting ) && (
              <Message>
                Please confirm the certificate issuing and wait for the confirmation.
                This may take a couple of seconds depending on the network speed.
              </Message>
            )}

            {(!certificateIssued && !form.isSubmitting) && <CertificateFieldSet  />}

          </Form>
        );
      }}
    </Formik>
  );
};

export default IssueCertificateForm;
