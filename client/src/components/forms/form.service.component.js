import React from 'react';
import { Card, Container, Row, Form } from 'react-bootstrap'; // Alert
import { FormHeader, Input, TextArea, ButtonGroup } from './formComponents';

const ServiceForm = ({ method }) => {
  return (
    <Card>
      <FormHeader method={method} edit='Edit <SERVICE>' create='Add Service' />
      <Card.Body>
        <Container>
          <Form>
            <Row>
              <Input label='Name' type='text' name='name' xs={12} />
              <TextArea label='Description' rows={5} name='desc' xs={12} />
            </Row>
            <ButtonGroup />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ServiceForm;
