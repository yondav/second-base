import React from 'react';
import { Row } from 'react-bootstrap';
import { Column, FormButton } from '../../styled';

const ButtonGroup = ({ handleCancel, handleSubmit }) => {
  return (
    <Row>
      <Column className='d-flex justify-content-end'>
        <FormButton
          variant='outline-dark'
          type='button'
          className='m-1'
          onClick={handleCancel}
        >
          cancel
        </FormButton>
        <FormButton
          variant='outline-dark'
          type='submit'
          className='m-1'
          onClick={handleSubmit}
        >
          submit
        </FormButton>
      </Column>
    </Row>
  );
};

export default ButtonGroup;
