import React, { useState, useEffect, useContext } from 'react';
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

const ProfileForm = ({ state, setEdit }) => {
  const { updateUser } = useContext(GlobalContext);
  const { getResetToken, passwordReset } = useAdminContext();
  const {
    data: {
      user: { first_name, last_name, email, bio, image, _id },
    },
  } = state;

  const [resetToken, setResetToken] = useState(null);
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
    image,
  });

  const [images, setImages] = useState(formData.image ? [formData.image] : []);

  const inputHandler = e => {
    let obj = formData;
    obj[e.target.getAttribute('name')] = e.target.value;
    setFormData(obj);
  };

  const handleSubmit = e => {
    e.preventDefault();
    updateUser(_id, formData);
    setTimeout(() => setEdit(false), 1500);
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

  useEffect(
    () => setFormData(prev => ({ ...prev, image: images[0].url })),
    [images]
  );

  return (
    <Card>
      <FormHeader method='put' edit='Update Profile' />
      <Card.Body>
        <Container>
          <Form className='my-5' onSubmit={handleSubmit}>
            <Row>
              <Input
                label='First Name'
                type='text'
                name='first_name'
                changehandler={inputHandler}
                value={formData.first_name}
                xs={12}
                md={6}
              />
              <Input
                label='Last Name'
                type='text'
                name='last_name'
                changehandler={inputHandler}
                value={formData.last_name}
                xs={12}
                md={6}
              />
              <Input
                label='Email'
                type='email'
                name='email'
                changehandler={inputHandler}
                value={formData.email}
                xs={12}
                md={6}
              />
              <Col xs={12} md={6} className='d-flex align-items-center mb-5'>
                {!resetToken ? (
                  <span
                    className='nav-link pointer'
                    onClick={handleResetRequest}
                  >
                    <em>
                      <u>Change Password</u>
                    </em>
                  </span>
                ) : (
                  <Container>
                    <Row>
                      {resetPassword.response && (
                        <Alert variant={resetPassword.response.variant}>
                          {resetPassword.response.message}
                        </Alert>
                      )}
                      <Input
                        label='New Password'
                        type='password'
                        name='new_password'
                        changehandler={passwordInputHandler}
                        xs={12}
                      />
                      <Input
                        label='Confirm Password'
                        type='password'
                        name='confirm_password'
                        changehandler={passwordInputHandler}
                        xs={12}
                      />
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
                single={true}
                images={images}
                setImages={setImages}
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
