import React, { useState } from 'react';
import { LoginForm } from '../../../components/forms';
import { Card, Alert } from 'react-bootstrap';

const Login = () => {
  const [alert, setAlert] = useState({
    variant: '',
    message: '',
  });

  return (
    <Card className='login-card'>
      <Alert variant={alert.variant} className='login-status text-center'>
        {alert.message}
      </Alert>
      <Card.Body className='d-flex justify-content-center align-items-center'>
        <LoginForm setAlert={setAlert} />
      </Card.Body>
    </Card>
  );
};

export default Login;
