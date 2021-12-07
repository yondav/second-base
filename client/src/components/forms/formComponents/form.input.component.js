import React from 'react';
import { Column, FormInput } from '../../styled';

const Input = ({ label, type, name, xs, md, changehandler, value, style }) => {
  const handleReturn = e => {
    if (e.key === 'Enter') return;
  };

  return (
    <Column xs={xs} md={md}>
      <div className='mb-8' style={style}>
        <label htmlFor={name} className='mb-3'>
          {label}
        </label>
        <FormInput
          type={type}
          name={name}
          onChange={changehandler}
          defaultValue={value}
          onKeyPress={handleReturn}
        />
      </div>
    </Column>
  );
};

export default Input;
