import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import FieldError from './error';

const TextField = ({ id, label, name, type, ...props }) => (
  <Fragment>
    {label && (<label htmlFor={id || name}>{label}</label>)}
    <Field type={type} id={id || name} name={name} {...props}/>
    <FieldError name={name} />
    <br />
  </Fragment>
);

TextField.defaultProps = {
  id: '',
  label: '',
  type: 'text',
};

TextField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default TextField;
