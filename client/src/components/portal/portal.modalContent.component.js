import React from 'react';
import { ProfileForm } from '../forms';

const ModalContent = ({ edit, setEdit, state }) => {
  const editContent = () => {
    switch (edit) {
      case 'profile':
        return <ProfileForm state={state} setEdit={setEdit} />;
      default:
        break;
    }
  };
  return editContent();
};

export default ModalContent;
