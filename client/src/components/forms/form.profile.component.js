import React, { useState, useContext } from 'react';
import { DataContext } from '../../context/context.data';
import useDataContext from '../../hooks/useDataContext';
import useAdminContext from '../../hooks/useAdminContext';

import Alert from '../alert';
import { Grid, A } from '../styled';
import {
  FormWrapper,
  ButtonGroup,
  ImageUploader,
  RichText,
  inputHandler,
  passwordInputHandler,
  profileInputs,
  passwordInputs,
  renderInputs,
} from './formComponents';

const ProfileForm = ({ setEdit }) => {
  const {
    state: {
      data: {
        user: { first_name, last_name, email, bio, images, _id },
      },
    },
  } = useContext(DataContext);
  const { updateUser, addImage, updateImage } = useDataContext();

  const { getResetToken, passwordReset } = useAdminContext();
  const [alert, setAlert] = useState();
  const [resetToken, setResetToken] = useState(null);
  const [imgs, setImgs] = useState([...images]);
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

  const handleSubmit = async e => {
    e.preventDefault();

    let newImgs = imgs.filter(img => !img._id);
    let existingImgs = imgs.filter(img => img._id);

    if (newImgs)
      await addImage({
        imgs: newImgs,
        collection: 'user',
        parentId: _id,
      });

    if (existingImgs)
      await updateImage({
        imgs: existingImgs,
        collection: 'user',
      });

    const res = await updateUser(_id, formData);

    if (res) {
      setAlert({ message: 'Profile updated', variant: 'success' });
      setTimeout(() => setEdit(false), 3000);
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
    }, 3000);
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      setEdit={setEdit}
      headerEdit='Update Profile'
      alert={alert}
    >
      {renderInputs(profileInputs(formData), e =>
        inputHandler(e, formData, setFormData)
      )}
      <Grid.Col md={6}>
        {!resetToken ? (
          <div className='flex items-center h-full'>
            <A onClick={handleResetRequest}>Change Password</A>
          </div>
        ) : (
          <Grid.Container>
            {resetPassword.response ? (
              <Grid.Col>
                <Alert alert={resetPassword.response} />
              </Grid.Col>
            ) : (
              <>
                {renderInputs(passwordInputs(), e =>
                  passwordInputHandler(e, resetPassword, setResetPassword)
                )}
                <Grid.Col>
                  <ButtonGroup
                    handleCancel={() => setResetToken(null)}
                    handleSubmit={handlePasswordSubmission}
                  />
                </Grid.Col>
              </>
            )}
          </Grid.Container>
        )}
      </Grid.Col>
      <RichText setFormData={setFormData} value={bio} name='bio' />
      <ImageUploader
        type='user'
        single={true}
        originalList={images}
        images={imgs}
        setImages={setImgs}
        label='Photo'
      />
    </FormWrapper>
  );
};

export default ProfileForm;
