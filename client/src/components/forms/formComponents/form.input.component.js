import React from 'react';
import { Form, Col } from 'react-bootstrap';
import { FormInput } from '../../styled/form/styled.form.input.component';

const Input = ({ label, type, name, xs, md, changehandler, value, style }) => {
  const handleReturn = e => {
    if (e.key === 'Enter') return;
  };

  return (
    <Col xs={xs} md={md}>
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
    </Col>
  );
};

export default Input;
