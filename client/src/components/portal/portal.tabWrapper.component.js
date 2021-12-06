import React from 'react';
import { Card, Row, Container } from 'react-bootstrap';
import { RiEditBoxLine } from 'react-icons/ri';

const TabWrapper = ({ title, handleEdit, children }) => {
  return (
    <Card style={{ borderTopLeftRadius: 0 }}>
      <Card.Header className='d-flex justify-content-between align-items-center'>
        <h1>{title}</h1>
        <RiEditBoxLine
          size='2em'
          className='pointer edit-icon'
          onClick={handleEdit}
        />
      </Card.Header>
      <Card.Body>
        <Container fluid className='py-5'>
          <Row>{children}</Row>
        </Container>
      </Card.Body>{' '}
    </Card>
  );
};

export default TabWrapper;
