import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({label, ...props}) => {
  const [field, meta] = useField(props);
  
  return (
      <div className="c-TextField">
        <label htmlFor={field.name}>{label}</label>
        <input {...field} {...props} autoComplete="off"/>
        <ErrorMessage component="div" className = "c-TextField__Error" name={field.name} /> 
      </div>
  );
};

export default TextField;;