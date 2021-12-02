import React from 'react';
import { Form, Col } from 'react-bootstrap';

const TextArea = ({ label, rows, name, xs, md, onChange }) => {
  return (
    <Col xs={xs} md={md}>
      <Form.Group className='mb-5'>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as='textarea'
          name={name}
          rows={rows}
          onChange={onChange}
        />
      </Form.Group>
    </Col>
  );
};

export default TextArea;
