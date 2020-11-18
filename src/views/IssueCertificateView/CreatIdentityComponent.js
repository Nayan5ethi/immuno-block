import React, { Fragment } from 'react';
import QRCode from 'qrcode.react';

import { SEPARATOR } from "/core/constants";
import { DescriptionList } from '/core/components';
import { Button, TextField } from '/core/forms/fields';


const CreatIdentityComponent = ({ onSubmit, passportId, pepper }) => (
  <Fragment>
    <TextField label="Government ID" name="passportId" type="text" />
    <Button onClick={onSubmit}>Create</Button>
    {passportId && pepper && (
      <Fragment>
        <hr />
        <QRCode className="qr-code-img" value={`${passportId}${SEPARATOR}${pepper}`} level="H" />
        <DescriptionList data={[['ID Number', passportId]]} />
      </Fragment>
    )}
  </Fragment>
);

export default CreatIdentityComponent;
