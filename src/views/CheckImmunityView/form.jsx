import React, { useState } from "react";
import Web3 from "web3";

import { QrReader } from '../../core/components';
import { SEPARATOR } from "../../core/constants";

const CheckImmunityForm = ({ setCertificate, setIsCertificateFetched, resultRef }) => {
  const handleQrScan = (personalCode) => {
    setIsCertificateFetched(false);
    // TODO handle invalid QR code
    if (!personalCode) {
      return null;
    }
    const personalCodeHash = Web3.utils.sha3(`${personalCode}`);
    getLastCertificate(personalCodeHash).then((result) => {
      try {
        getDoctorId(result.doctor).then((doctor) => {
          const [doctorId, doctorName] = doctor.split(SEPARATOR);
          const [passportId, _pepper] = personalCode.split(SEPARATOR);
          result.timestamp = new Date(Number(result.timestamp));
          result.passportId = passportId;
          result.doctorId = doctorId;
          result.doctorName = doctorName;
          handleSubmitFinished(result);
          resultRef.current && resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        });
      } catch (_error) {
        handleSubmitFinished(result);
      }
    });
  };
  const handleSubmitFinished = (result) => {
    setCertificate(result);
    setIsCertificateFetched(true);
  };
  return (
    <QrReader
      id="qr-reader"
      qrCodeSuccessCallback={handleQrScan}
    />
  );
};

export default CheckImmunityForm;
