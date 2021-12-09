import React from 'react';
import { Grid, Form } from '../../styled';

const Input = ({ label, type, name, xs, md, changehandler, value, style }) => {
  const handleReturn = e => {
    if (e.key === 'Enter') return;
  };

  return (
    <Grid.Col xs={xs} md={md}>
      <div className='mb-8' style={style}>
        <Form.Label htmlFor={name} group>
          {label}
        </Form.Label>
        <Form.Input
          type={type}
          name={name}
          onChange={changehandler}
          defaultValue={value}
          onKeyPress={handleReturn}
        />
      </div>
    </Grid.Col>
  );
};

export default Input;
