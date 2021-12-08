import React, { useState } from 'react';
import { LoginForm } from '../../../components/forms';
import { Card } from '../../../components/styled';
import Alert from '../../../components/alert';

const Login = () => {
  const [alert, setAlert] = useState({
    variant: '',
    message: '',
  });

  return (
    <Card.Base login>
      <Card.Body>
        {alert.variant ? (
          <Alert alert={alert} />
        ) : (
          <LoginForm setAlert={setAlert} />
        )}
      </Card.Body>
    </Card.Base>
  );
};

export default Login;
