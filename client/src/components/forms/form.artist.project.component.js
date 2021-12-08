import React, { useState } from 'react';
import { Card, Form, Container, Row } from 'react-bootstrap'; // Alert
import {
  FormHeader,
  YearSelect,
  Input,
  ButtonGroup,
  ImageUploader,
  StreamLink,
} from './formComponents';
import { Grid } from '../styled';

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
              <Grid.Col xs={12}>
                <h5>Links</h5>
              </Grid.Col>
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
