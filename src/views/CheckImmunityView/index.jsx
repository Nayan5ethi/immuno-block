import React, { Fragment, useEffect, useRef, useState } from 'react';

import { enableEthereum } from '../../blockchain';
import CheckImmunityForm from './form';
import CertificateResult from './result';

const CheckImmunityView = () => {
  const resultRef = useRef(null);
  const [certificate, setCertificate] = useState({});
  const [isCertificateFetched, setIsCertificateFetched] = useState(false);
  useEffect(() => {
    enableEthereum();
  }, []);
  return (
    <>
      <div className='row'>
        <div className='column'>
          <h2>Check Immunity</h2>
          <CheckImmunityForm
            setCertificate={setCertificate}
            setIsCertificateFetched={setIsCertificateFetched}
            resultRef={resultRef}
          />
        </div>
      </div>
      {isCertificateFetched && (
        <CertificateResult certificate={certificate} resultRef={resultRef} />
      )}
    </>
  );
};

export default CheckImmunityView;
