import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Alert, Form, Button } from 'react-bootstrap';
import { AdminContext } from '../../context/context.auth';
import useAdminContext from '../../hooks/useAdminContext';

const LoginForm = () => {
  const admin = useContext(AdminContext);
  const { login } = useAdminContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const radioRef = useRef();
  let navigate = useNavigate();
  const [statusMessage, setStatusMessage] = useState(false);
  const [invalid, setInvalid] = useState({
    email: { invalid: false, message: '' },
    password: { invalid: false, message: '' },
  });

  const handleSubmit = e => {
    e.preventDefault();

    if (!emailRef.current.value)
      setInvalid(prevState => ({
        ...prevState,
        email: { invalid: true, message: 'Must provide a valid email address' },
      }));

    if (!passwordRef.current.value)
      setInvalid(prevState => ({
        ...prevState,
        password: { invalid: true, message: 'Must provide a valid password' },
      }));

    if (radioRef.current.checked) {
      localStorage.setItem('2bEmail', emailRef.current.value);
      localStorage.setItem('2bPassword', passwordRef.current.value);
    }

    login(emailRef.current.value, passwordRef.current.value);
    document.querySelector('.login-status').style.display = 'block';
  };

  const checkIfRemembered = key => localStorage.getItem(key);

  // side effect sets statusMessage state for successful or unsuccessful login attempt
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
    <Card className='login-card'>
      <Alert
        variant={statusMessage.variant}
        className='login-status text-center'
      >
        {statusMessage.message}
      </Alert>
      <Card.Body className='d-flex justify-content-center align-items-center'>
        <Form className='login-form' onSubmit={handleSubmit}>
          <Form.Group className='mb-5'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              defaultValue={checkIfRemembered('2bEmail')}
              ref={emailRef}
            />
            {invalid.email.invalid && (
              <Form.Text className='failure-text'>
                {invalid.email.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              defaultValue={checkIfRemembered('2bPassword')}
              ref={passwordRef}
            />
            {invalid.password.invalid && (
              <Form.Text className='failure-text'>
                {invalid.password.message}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className='mb-5'>
            <Form.Check
              type='radio'
              label="Don't Be Denied"
              defaultChecked={checkIfRemembered('2bEmail') ? true : false}
              ref={radioRef}
            />
          </Form.Group>
          <Button variant='outline-dark' type='submit'>
            login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LoginForm;
