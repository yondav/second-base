import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';
import { loginInputs, inputHandler, renderInputs } from './formComponents';
import { Form, Grid } from '../styled';

const LoginForm = ({ setAlert }) => {
  const { login } = useAdminContext();
  const navigate = useNavigate();
  const radioRef = useRef();

  const checkIfRemembered = key => localStorage.getItem(key);

  const [formData, setFormData] = useState({
    email: checkIfRemembered('2bEmail') || '',
    password: checkIfRemembered('2bPassword') || '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.email)
      setAlert({
        variant: 'danger',
        message: 'Please provide a valid email address',
      });

    if (!formData.password)
      setAlert({
        variant: 'danger',
        message: 'Please provide a valid password',
      });

    if (radioRef.current.checked) {
      localStorage.setItem('2bEmail', formData.email);
      localStorage.setItem('2bPassword', formData.password);
    }

    const loginAttempt = await login(formData);

    if (loginAttempt.verified) {
      setAlert({ variant: 'success', message: 'Welcome back Neil' });
      setTimeout(() => {
        navigate('/admin/portal');
      }, 3100);
    } else {
      setAlert({ variant: 'danger', message: 'Go home Crosby' });
      setTimeout(() => setAlert({ variant: '', message: '' }), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderInputs(loginInputs(formData), e =>
        inputHandler(e, formData, setFormData)
      )}
      <Grid.Col>
        <div className='mb-8 flex flex-row-reverse justify-end items-center'>
          <label htmlFor='remember'>Don't Be Denied</label>
          <Form.Check
            ref={radioRef}
            name='remember'
            defaultChecked={checkIfRemembered('2bEmail') ? true : false}
          />
        </div>
      </Grid.Col>
      <div className='flex justify-end'>
        <Form.Button variant='outline-dark' type='submit'>
          Login
        </Form.Button>
      </div>
    </form>
  );
};

export default LoginForm;
