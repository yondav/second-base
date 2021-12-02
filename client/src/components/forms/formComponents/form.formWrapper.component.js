import React from 'react';
import { Card, Alert, Form, Container, Row } from 'react-bootstrap';
import { FormHeader, ButtonGroup } from '.';

const FormWrapper = ({
  handleSubmit,
  setEdit,
  headerEdit,
  children,
  alert,
}) => {
  return (
    <Card>
      <FormHeader method='put' edit={headerEdit} />
      <Card.Body>
        <Container>
          <Form className='my-5' onSubmit={handleSubmit}>
            <Row>
              {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
              {children}
              <ButtonGroup
                handleCancel={() => setEdit(false)}
                handleSubmit={handleSubmit}
              />
            </Row>
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default FormWrapper;
