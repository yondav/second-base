import React, { Suspense } from 'react';
import pMinDelay from 'p-min-delay';

import Loading from '../loading';
import Modal from '../modal';

const ProfileForm = React.lazy(() =>
  pMinDelay(import('../forms/form.profile.component'), 3500)
);
const GeneralForm = React.lazy(() => import('../forms/form.general.component'));

const ModalContent = ({ edit, setEdit }) => {
  const handleClose = () => {
    setEdit(false);
  };

  const editContent = () => {
    switch (edit) {
      case 'profile':
        return <ProfileForm setEdit={setEdit} />;
      case 'general_info':
        return <GeneralForm setEdit={setEdit} />;
      case 'profile_photo':
        return <div>PROFILE PHOTO MODAL</div>;
      default:
        break;
    }
  };

  return (
    <Modal handleClose={handleClose}>
      <Suspense fallback={<Loading />}>{editContent()}</Suspense>
    </Modal>
  );
};

export default ModalContent;
