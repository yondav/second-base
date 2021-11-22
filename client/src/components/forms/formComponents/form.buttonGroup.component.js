import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ButtonGroup = ({ handleCancel, handleSubmit }) => {
  return (
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button
          variant='outline-dark'
          type='button'
          className='m-1'
          onClick={handleCancel}
        >
          cancel
        </Button>
        <Button
          variant='outline-dark'
          type='submit'
          className='m-1'
          onClick={handleSubmit}
        >
          submit
        </Button>
      </Col>
    </Row>
  );
};

export default ButtonGroup;
