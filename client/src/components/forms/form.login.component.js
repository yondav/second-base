import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import useAdminContext from '../../hooks/useAdminContext';
import { loginInputs, inputHandler, renderInputs } from './formComponents';
import { FormCheck, FormButton } from '../styled/form';

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
      }, 1000);
    } else {
      setAlert({ variant: 'danger', message: 'Go home Crosby' });
    }

    document.querySelector('.login-status').style.display = 'block';
  };

  return (
    <Form className='login-form' onSubmit={handleSubmit}>
      {renderInputs(loginInputs(formData), e =>
        inputHandler(e, formData, setFormData)
      )}
      <FormCheck
        ref={radioRef}
        type='radio'
        label="Don't Be Denied"
        defaultChecked={checkIfRemembered('2bEmail') ? true : false}
        className='mb-5'
      />
      <div className='d-flex justify-content-end'>
        <FormButton variant='outline-dark' type='submit'>
          login
        </FormButton>
      </div>
    </Form>
  );
};

export default LoginForm;
