import React from 'react';
import { Form } from 'react-bootstrap';
import { Grid } from '../../styled';

const TextArea = ({ label, rows, name, xs, md, changehandler, val }) => {
  return (
    <Grid.Col xs={xs} md={md}>
      <Form.Group className='mb-5'>
        <Form.Label>{label}</Form.Label>
        {/* <FormTextArea
          as='textarea'
          name={name}
          rows={rows}
          onChange={changehandler}
          defaultValue={val}
        /> */}
      </Form.Group>
    </Grid.Col>
  );
};

export default TextArea;
