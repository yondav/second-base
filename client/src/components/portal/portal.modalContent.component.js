import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
// import { ProfileForm, GeneralForm } from '../forms';
const ProfileForm = React.lazy(() => import('../forms/form.profile.component'));
const GeneralForm = React.lazy(() => import('../forms/form.general.component'));

const ModalContent = ({ edit, setEdit }) => {
  const editContent = () => {
    switch (edit) {
      case 'profile':
        return <ProfileForm setEdit={setEdit} />;
      case 'general_info':
        return <GeneralForm setEdit={setEdit} />;
      default:
        break;
    }
  };
  return (
    <Suspense
      fallback={
        <div
          style={{ height: '100vh', width: '100vw' }}
          className='w-100 d-flex justify-content-center align-items-center'
        >
          <Spinner animation='border' />
        </div>
      }
    >
      {editContent()}
    </Suspense>
  );
};

export default ModalContent;
