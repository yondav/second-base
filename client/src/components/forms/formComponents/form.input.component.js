import React from 'react';
import { Form, Col } from 'react-bootstrap';

const Input = ({ label, type, name, xs, md, changehandler, value }) => {
  const handleReturn = e => {
    if (e.key === 'Enter') return;
  };

  return (
    <Col xs={xs} md={md}>
      <Form.Group className='mb-5'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
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
