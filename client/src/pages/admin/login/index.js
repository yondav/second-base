import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useAdminContext from '../../../hooks/useAdminContext';

import { LoginForm } from '../../../components/forms';
import Alert from '../../../components/alert';
import { Card } from '../../../components/styled';

const Login = () => {
  const { verifyToken } = useAdminContext();
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    variant: '',
    message: '',
  });

  useEffect(
    () =>
      verifyToken().then(res => {
        if (res.verified) navigate('/admin/portal');
      }),
    []
  );

  return (
    <div className='flex items-center h-screen'>
      <Card.Base login>
        <Card.Body>
          {alert.variant ? (
            <Alert alert={alert} />
          ) : (
            <LoginForm setAlert={setAlert} />
          )}
        </Card.Body>
      </Card.Base>
    </div>
  );
};

export default Login;
