import React, { useState } from 'react';
import { LoginForm } from '../../../components/forms';
import { Card, CardBody } from '../../../components/styled';
import Alert from '../../../components/alert';

const Login = () => {
  const [alert, setAlert] = useState({
    variant: '',
    message: '',
  });

  return (
    <Card login>
      <CardBody>
        {alert.variant ? (
          <Alert alert={alert} />
        ) : (
          <LoginForm setAlert={setAlert} />
        )}
      </CardBody>
    </Card>
  );
};

export default Login;
