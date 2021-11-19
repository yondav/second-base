import React, { useEffect } from 'react';
import useAdminContext from '../../../hooks/useAdminContext';
import {
  GearForm,
  ArtistForm,
  ProjectForm,
  ServiceForm,
  UserForm,
} from '../../../components/forms';
import { RichTextBio } from '../../../components/forms/formComponents';

const Portal = () => {
  const { getAdmin } = useAdminContext();
  const { res } = getAdmin();

  useEffect(() => console.log(res));
  return (
    <div>
      {/* <GearForm />
      <ArtistForm />
      <ProjectForm />
      <ServiceForm />
      <RichTextBio /> */}
      <UserForm />
    </div>
  );
};

export default Portal;
