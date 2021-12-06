import React, { useEffect, useContext } from 'react';

import { DataContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';

import TabWrapper from './portal.tabWrapper.component';
import { ImgContainer, Column } from '../styled/general';

import useMediaQuery from '../../hooks/useMediaQuery';

const PortalProfile = ({ setEdit }) => {
  const { isTablet, isMobile, isDesktop } = useMediaQuery();
  const {
    state: {
      data: {
        user: { first_name, last_name, email, bio, images },
      },
    },
  } = useContext(DataContext);

  const renderBio = () => {
    if (bio)
      document.querySelector('.profile-bio').innerHTML = JSON.parse(
        JSON.stringify(bio)
      );
  };

  const handleEdit = () => setEdit('profile');

  useEffect(() => renderBio(), [bio]);

  return (
    <TabWrapper
      title={`Welcome Back ${toTitle(first_name)}`}
      handleEdit={handleEdit}
    >
      <Column xs={12} md={6}>
        <ImgContainer>
          <img
            name='img'
            src={
              images && images.length
                ? images[0].url
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
            alt='profile'
            style={{
              width: isTablet ? '80%' : '100%',
              borderRadius: 'var(--radius)',
            }}
          />
        </ImgContainer>
        <div
          name='info'
          className='profile-info d-flex flex-column justify-content-between mt-3'
        >
          <h3 name='info'>{toTitle(`${first_name} ${last_name}`)}</h3>
          <p name='info'>{email}</p>
        </div>
      </Column>
      <Column xs={12} md={6}>
        <h4>Bio</h4>
        <div name='bio' className='h-100 profile-bio' />
      </Column>
    </TabWrapper>
  );
};

export default PortalProfile;
