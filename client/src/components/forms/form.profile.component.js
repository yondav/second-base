import React, { useState, useContext } from 'react';
import { Card, Alert, Form, Container, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../../context/context.data';
import useAdminContext from '../../hooks/useAdminContext';
import {
  FormHeader,
  ButtonGroup,
  ImageUploader,
  Input,
  RichTextBio,
} from './formComponents';

const ProfileForm = ({ setEdit }) => {
  const {
    updateUser,
    state: {
      loading,
      data: {
        user: { first_name, last_name, email, bio, image, _id },
      },
    },
  } = useContext(GlobalContext);

  const { getResetToken, passwordReset } = useAdminContext();
  const [alert, setAlert] = useState();
  const [resetToken, setResetToken] = useState(null);
  const [images, setImages] = useState(image || []);
  const [resetPassword, setResetPassword] = useState({
    new_password: '',
    confirm_password: '',
    response: null,
  });

  const [formData, setFormData] = useState({
    first_name,
    last_name,
    email,
    bio,
  });

  const profileInputs = [
    {
      label: 'First Name',
      type: 'text',
      name: 'first_name',
      value: formData.first_name,
    },
    {
      label: 'Last Name',
      type: 'text',
      name: 'last_name',
      value: formData.last_name,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: formData.email,
    },
  ];

  const passwordInputs = [
    { label: 'New Password', name: 'new_password' },
    { label: 'Confirm Password', name: 'confirm_password' },
  ];

  const inputHandler = e => {
    let obj = formData;
    obj[e.target.getAttribute('name')] = e.target.value;
    setFormData(obj);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let img;
    image === images ? (img = false) : (img = images[0]);

    const res = await updateUser(_id, formData, img);

    if (res) {
      setAlert({ message: 'Profile updated', variant: 'success' });
      setTimeout(() => setEdit(false), 1500);
    } else {
      setAlert({
        message: 'Profile was not updated. Bad request.',
        variant: 'danger',
      });
    }
  };

  const handleResetRequest = async e => {
    let resetToken = await getResetToken(email);
    setResetToken(resetToken);
  };

  const passwordInputHandler = e => {
    let obj = resetPassword;
    obj[e.target.getAttribute('name')] = e.target.value;
    setResetPassword(obj);
  };

  const handlePasswordSubmission = async e => {
    e.preventDefault();
    const { new_password, confirm_password } = resetPassword;

    if (new_password !== confirm_password) {
      setResetPassword(prev => ({
        ...prev,
        new_password: '',
        confirm_password: '',
        response: { message: "Passwords don't match", variant: 'danger' },
      }));
    } else {
      try {
        let res = await passwordReset(resetToken, new_password);

        if (res)
          setResetPassword(prev => ({
            ...prev,
            response: { message: res, variant: 'success' },
          }));
      } catch (err) {
        console.error(err);
      }
    }

    return setTimeout(() => {
      setResetToken(null);
      setResetPassword(prev => ({ ...prev, response: null }));
    }, 1500);
  };

  return (
    <Card>
      <FormHeader method='put' edit='Update Profile' />
      <Card.Body>
        <Container>
          <Form className='my-5' onSubmit={handleSubmit}>
            <Row>
              {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
              {profileInputs.map((input, i) => (
                <Input
                  key={i}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  changehandler={inputHandler}
                  value={input.value}
                  xs={12}
                  md={6}
                />
              ))}
              <Col xs={12} md={6} className='d-flex align-items-center mb-5'>
                {!resetToken ? (
                  <span
                    className='nav-link pointer'
                    onClick={handleResetRequest}
                    style={{ textDecoration: 'underline', fontStyle: 'italic' }}
                  >
                    Change Password
                  </span>
                ) : (
                  <Container>
                    <Row>
                      {resetPassword.response && (
                        <Alert variant={resetPassword.response.variant}>
                          {resetPassword.response.message}
                        </Alert>
                      )}
                      {passwordInputs.map((input, i) => (
                        <Input
                          key={i}
                          label={input.label}
                          type='password'
                          name={input.name}
                          changehandler={passwordInputHandler}
                          xs={12}
                        />
                      ))}
                    </Row>
                    <ButtonGroup
                      handleCancel={() => setResetToken(null)}
                      handleSubmit={handlePasswordSubmission}
                    />
                  </Container>
                )}
              </Col>
              <RichTextBio setFormData={setFormData} value={bio} />
              <ImageUploader
                type='user'
                single={true}
                images={images}
                setImages={setImages}
                label='Photo'
              />
              <ButtonGroup
                handleCancel={() => setEdit(false)}
                handleSubmit={handleSubmit}
              />
            </Row>
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default ProfileForm;
