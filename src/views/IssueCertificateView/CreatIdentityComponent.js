import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

import { SEPARATOR } from "/core/constants";
import { DescriptionList } from '/core/components';
import { Button, TextField } from '/core/forms/fields';


const CreatIdentityComponent = ({ onSubmit, governmentId, pepper }) => (
  <Fragment>
    <TextField label="Government ID" name="governmentId" type="text" />
    <Button onClick={onSubmit}>Create</Button>
    {governmentId && pepper && (
      <Fragment>
        <hr />
        <QRCode className="qr-code-img" value={`${governmentId}${SEPARATOR}${pepper}`} level="H" />
        <DescriptionList data={[['Government ID', governmentId], ['Personal Security Code', pepper]]} />
      </Fragment>
    )}
  </Fragment>
);

export default CreatIdentityComponent;
