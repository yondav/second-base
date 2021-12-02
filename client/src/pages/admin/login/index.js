import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../../../components/forms';
import { AdminContext } from '../../../context/context.auth';

const Login = () => {
  const admin = useContext(AdminContext);
  const [statusMessage, setStatusMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin.state.admin) {
      setStatusMessage({ variant: 'success', message: 'Welcome back Neil' });
      setTimeout(() => {
        navigate('/admin/portal');
      }, 1000);
    } else {
      setStatusMessage({ variant: 'danger', message: 'Go home Crosby' });
    }
  }, [admin.state.admin, navigate]);

  return (
    <LoginForm
      statusMessage={statusMessage}
      setStatusMessage={setStatusMessage}
    />
  );
};

export default Login;
