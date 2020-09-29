import React from "react";


import { Button } from '/core/forms/fields';


export const Message = ({ children, className }) => <div className={`message ${className}`}>{children}</div>;


export const CertificateExpired = () => <Message className="uppercase">This certificate has expired!</Message>


export const CertificateRevoked = () => <Message className="uppercase">This certificate has been revoked!</Message>
