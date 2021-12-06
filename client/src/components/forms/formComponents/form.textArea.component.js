import React from 'react';
import { Form } from 'react-bootstrap';
import { Column, FormTextArea } from '../../styled';

const TextArea = ({ label, rows, name, xs, md, changehandler, val }) => {
  return (
    <Column xs={xs} md={md}>
      <Form.Group className='mb-5'>
        <Form.Label>{label}</Form.Label>
        <FormTextArea
          as='textarea'
          name={name}
          rows={rows}
          onChange={changehandler}
          defaultValue={val}
        />
      </Form.Group>
    </Column>
  );
};

export default TextArea;
