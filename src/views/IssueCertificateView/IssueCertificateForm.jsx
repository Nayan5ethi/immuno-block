import React, { useEffect, useState, Fragment } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import web3 from 'web3';

import { CheckMark } from '../../core/components';
import { Message } from '../../core/messages';
import { SEPARATOR } from '../../core/constants';
import { Button, RadioField } from '../../core/forms/fields';
import { generatePepper } from '../../core/utils';

import CertificateFieldSet from './CertificateFieldSet';
import CreatIdentityComponent from './CreatIdentityComponent';
import ScanIdentityComponent from './ScanIdentityComponent';

const today = new Date();
const todayStr = today.toISOString().slice(0, 10);
const inSixMonthsStr = new Date(today.setMonth(today.getMonth() + 6)).toISOString().slice(0, 10);


const IssueCertificateForm = () => {

  const [pepper, setPepper] = useState('');
  const [passportId, setPassportId] = useState('');
  const [certificateIssued, setCertificateIssued] = useState(false);

  return (
    <Formik
      initialValues={{
        identityMethod: 'create',
        vaccinationDate: todayStr,
        vaccinationTime: '12:00',
        passportId: '',
        vaccineSerial: '',
      }}
      validationSchema={Yup.object({
        vaccinationDate: Yup.string().required('This field is required'),
        vaccinationTime: Yup.string().required('This field is required'),
        passportId: Yup.string().required('This field is required'),
        vaccineSerial: Yup.string().required('This field is required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        const personHash = web3.utils.sha3(`${values.passportId}${SEPARATOR}${pepper}`);
        const timestamp = Date.parse(`${values.vaccinationDate}T${values.vaccinationTime}`);
        issueCertificate(personHash, timestamp, values.vaccineSerial)
          .then(() => setCertificateIssued(true))
          .catch(console.error)
          .finally(() => { setSubmitting(false); });
      }}
    >
      {(form) => {

        useEffect(() => {
          setPepper('');
          setPassportId('');
          resetCertificateForm();
        }, [form.values.identityMethod]);

        const resetCertificateForm = () => {
          setCertificateIssued(false);
          ['vaccineSerial', 'vaccinationDate', 'vaccinationTime'].map((fieldName) => {
            form.setFieldValue(fieldName, form.initialValues[fieldName]);
          });
        }

        const handleCreateIdentity = async () => {
          await form.validateField('passportId');
          setPassportId(form.values.passportId);
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
          const [qrPassportId, qrPepper] = result.split(SEPARATOR);
          setPassportId(qrPassportId);
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
                passportId={passportId}
                pepper={pepper}
              />
            )}

            {form.values.identityMethod === 'scan' && (

              <ScanIdentityComponent
                onScan={handleQrScan}
                passportId={passportId}
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

            {(!certificateIssued && form.isSubmitting) && (
              <Message>
                Please confirm the certificate issuing and wait for the confirmation.
                This may take a couple of seconds depending on the network speed.
              </Message>
            )}

            {(!certificateIssued && !form.isSubmitting) && <CertificateFieldSet />}

          </Form>
        );
      }}
    </Formik>
  );
};

export default IssueCertificateForm;
