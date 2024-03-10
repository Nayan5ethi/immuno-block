import { Fragment } from 'react';
import { DescriptionList, QrReader } from '../../core/components';


const ScanIdentityComponent = ({ onScan, passportId, pepper }) => (
  <Fragment>
    <br />
    <QrReader qrCodeSuccessCallback={onScan} />

    {passportId && pepper && (
      <Fragment>
        <hr />
        <DescriptionList data={[['Passport ID', passportId]]} />
      </Fragment>
    )}
  </Fragment>
);



export default ScanIdentityComponent;
