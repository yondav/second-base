import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login.css';

const Login = () => {
  return (
    <Card className='login-card'>
      <Form className='login-form'>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' />
        </Form.Group>
        <Form.Group className='mb-3' controlId='formBasicCheckbox'>
          <Form.Check type='radio' label="Don't Be Denied" />
        </Form.Group>
        <Button variant='outline-dark' type='submit'>
          login
        </Button>
      </Form>
    </Card>
  );
};

export default Login;
