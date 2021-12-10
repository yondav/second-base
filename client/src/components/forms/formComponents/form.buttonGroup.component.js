import React from 'react';
import { Form } from '../../styled';

const ButtonGroup = ({ handleCancel, handleSubmit }) => {
  return (
    <div className='w-full flex justify-end'>
      <Form.Button
        danger
        variant='outline-dark'
        type='button'
        className='m-1'
        onClick={handleCancel}
      >
        cancel
      </Form.Button>
      <Form.Button
        success
        variant='outline-dark'
        type='submit'
        className='m-1'
        onClick={handleSubmit}
      >
        submit
      </Form.Button>
    </div>
  );
};

export default ButtonGroup;
