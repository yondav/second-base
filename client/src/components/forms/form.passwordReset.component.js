import React from 'react';
import { Card, Alert, Container, Row, Form } from 'react-bootstrap';
import { FormHeader, Input, ButtonGroup } from './formComponents';

const PasswordResetForm = () => {
  return (
    <Card>
      <FormHeader method='put' edit='Update Password' />
      <Card.Body>
        <Container>
          <Form>
            <Row>
              <Input label='New Password' type='password' xs={12} />
              <Input label='Confirm Password' type='confirm_password' xs={12} />
            </Row>
            <ButtonGroup />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default PasswordResetForm;
