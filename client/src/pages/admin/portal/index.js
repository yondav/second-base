import React from 'react';
import {
  GearForm,
  ArtistForm,
  ProjectForm,
  ServiceForm,
} from '../../../components/forms';

const Portal = () => {
  return (
    <div>
      <GearForm />
      <ArtistForm />
      <ProjectForm />
      <ServiceForm />
    </div>
  );
};

export default Portal;
