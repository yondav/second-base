import React from 'react';
import { Form } from 'react-bootstrap';
import { Column, FormInput } from '../../styled';

const Input = ({ label, type, name, xs, md, changehandler, value, style }) => {
  const handleReturn = e => {
    if (e.key === 'Enter') return;
  };

  return (
    <Column xs={xs} md={md}>
      <Form.Group className='mb-5' style={style}>
        <Form.Label>{label}</Form.Label>
        <FormInput
          type={type}
          name={name}
          onChange={changehandler}
          defaultValue={value}
          onKeyPress={handleReturn}
        />
      </Form.Group>
    </Column>
  );
};

export default Input;
