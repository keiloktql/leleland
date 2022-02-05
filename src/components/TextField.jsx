import React from 'react';

const TextField = ({label, placeholder="", type="text", name, value, handleInput}) => {
  return (
      <div className="c-TextField">
        <label htmlFor={name}>{label}</label>
        <input name={name} type = {type} placeholder={placeholder} value = {value} onChange={(event) => handleInput(event)}/>
      </div>
  );
};

export default TextField;;