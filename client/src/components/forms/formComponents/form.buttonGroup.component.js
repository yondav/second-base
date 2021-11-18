import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ButtonGroup = () => {
  return (
    <Row>
      <Col className='d-flex justify-content-end'>
        <Button variant='outline-dark' type='submit' className='m-1'>
          cancel
        </Button>
        <Button variant='outline-dark' type='submit' className='m-1'>
          submit
        </Button>
      </Col>
    </Row>
  );
};

export default ButtonGroup;
