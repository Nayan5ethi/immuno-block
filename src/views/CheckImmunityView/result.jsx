import React from "react";

import { CheckMark, DescriptionList } from "../../core/components";
import { CertificateExpired, CertificateRevoked, Message } from "../../core/messages";
import { formatDate } from "../../core/utils";


const CertificateResult = ({ certificate, resultRef }) => {
  if (!certificate) {
    return <Message className="uppercase">No certificate found.</Message>;
  }
  const { passportId, timestamp, doctorId } = certificate;
  const data = [
    ['Government ID Number', passportId],
    ['Doctor Name', `${doctorId}`],

    ['Vaccination Date', formatDate(timestamp)],
  ];
  return (
    <div className="row" ref={resultRef}>
      <div className="column">
        <br />
        <h3>COVID19 Immunity</h3>
        <CheckMark size="large" />
        <br />
        <DescriptionList data={data} />
      </div>
    </div>
  )
};

export default CertificateResult;
