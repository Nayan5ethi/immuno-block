import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

import { SEPARATOR } from "/core/constants";
import { DescriptionList, LegacyQrReader } from '/core/components';


const ScanIdentityComponent = ({ onScan, governmentId, pepper }) => (
  <Fragment>
    <br />
    <LegacyQrReader onScan={onScan} />
    {governmentId && pepper && (
      <Fragment>
        <hr />
        <DescriptionList data={[['Government ID', governmentId]]} />
      </Fragment>
    )}
  </Fragment>
);

export default ScanIdentityComponent;
