import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({label, disabled, ...props}) => {
  const [field, meta] = useField(props);
  
  return (
      <div className="c-TextField">
        <label htmlFor={field.name}>{label}</label>
        <input disabled={disabled} {...field} {...props} autoComplete="off" name={props.name} type = {props.type} placeholder={props.placeholder} />
        <ErrorMessage component="div" className = "c-TextField__Error" name={field.name} /> 
      </div>
  );
};

export default TextField;;