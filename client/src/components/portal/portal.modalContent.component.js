import React from 'react';
import { ProfileForm, GeneralForm } from '../forms';

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
  return editContent();
};

export default ModalContent;
