import React from 'react';
import { Card, Form, Container, Row } from 'react-bootstrap'; // Alert
import {
  FormHeader,
  YearSelect,
  Input,
  TextArea,
  ButtonGroup,
  ImageUploader,
} from './formComponents';

const GearForm = ({ method }) => {
  return (
    <Card>
      <FormHeader
        method={method}
        edit='Edit <GEAR>'
        create='Add <GEARTYPE> Gear'
      />
      <Card.Body>
        <Container>
          <Form>
            <Row>
              <Input label='Name' type='text' name='name' xs={12} md={6} />
              <Input label='Brand' type='text' name='brand' xs={12} md={6} />
              <YearSelect name='year' xs={12} md={6} />
              <Input label='Count' type='number' name='count' xs={12} md={6} />
              <TextArea label='Description' rows={5} name='desc' xs={12} />
              <ImageUploader />
            </Row>
            <ButtonGroup />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default GearForm;
