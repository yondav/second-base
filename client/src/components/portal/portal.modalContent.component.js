import React from 'react';
import { ProfileForm, GeneralForm } from '../forms';

const ModalContent = ({ edit, setEdit, state }) => {
  const editContent = () => {
    switch (edit) {
      case 'profile':
        return <ProfileForm state={state} setEdit={setEdit} />;
      // case 'general_info':
      //   return <GeneralForm state={state} setEdit={setEdit} />;
      default:
        break;
    }
  };
  return editContent();
};

export default ModalContent;
