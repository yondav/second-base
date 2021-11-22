import React, { useState } from 'react';
import { Card, Alert, Form, Container, Row, Col } from 'react-bootstrap';
import {
  FormHeader,
  YearSelect,
  Input,
  ButtonGroup,
  ImageUploader,
  StreamLink,
} from './formComponents';

const PrjectForm = ({ method }) => {
  const [linkList, setLinkList] = useState([{ link_service: '', link: '' }]);

  return (
    <Card>
      <FormHeader
        method={method}
        edit='Edit <PROJECT>'
        create='Add Project by <ARTIST>'
      />
      <Card.Body>
        <Container>
          <Form>
            <Row>
              <Input label='Name' type='text' name='name' xs={12} md={6} />
              <YearSelect name='year' xs={12} md={6} />
              <Col xs={12}>
                <h5>Links</h5>
              </Col>
              {linkList.map((link, i) => (
                <StreamLink
                  key={i}
                  linkList={linkList}
                  setLinkList={setLinkList}
                  index={i}
                />
              ))}
              <ImageUploader single={true} />
            </Row>
            <ButtonGroup />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default PrjectForm;
