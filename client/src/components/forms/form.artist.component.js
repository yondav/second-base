import React from 'react';
import { Card, Alert, Container, Row, Form } from 'react-bootstrap';
import { FormHeader, Input, ButtonGroup } from './formComponents';

const ArtistForm = ({ method }) => {
  return (
    <Card>
      <FormHeader method={method} edit='Edit <ARTIST>' create='Add Artist' />
      <Card.Body>
        <Container>
          <Form>
            <Row>
              <Input label='Name' type='text' name='name' xs={12} />
            </Row>
            <ButtonGroup />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ArtistForm;
