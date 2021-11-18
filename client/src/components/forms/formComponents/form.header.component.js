import React from 'react';
import { Card } from 'react-bootstrap';

const FormHeader = ({ method, edit, create }) => {
  return (
    <Card.Header>
      {method === 'put' ? <h4>{edit}</h4> : <h4>{create}</h4>}
    </Card.Header>
  );
};

export default FormHeader;
