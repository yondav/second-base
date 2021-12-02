import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FormButton } from '../../styled/form';

const ButtonGroup = ({ handleCancel, handleSubmit }) => {
  return (
    <Row>
      <Col className='d-flex justify-content-end'>
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
      </Col>
    </Row>
  );
};

export default ButtonGroup;
