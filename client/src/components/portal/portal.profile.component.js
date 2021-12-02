import React, { useEffect, useContext } from 'react';
import Col from 'react-bootstrap/Col';

import { toTitle } from '../../utils/helperFuncs';
import { DataContext } from '../../context/context.data';
import TabWrapper from './portal.tabWrapper.component';
import { ImgContainer } from '../styled/general';

const PortalProfile = ({ setEdit }) => {
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
      <Col xs={12} md={6}>
        <h4>Profile</h4>
        <ImgContainer>
          <img
            name='img'
            className='w-100'
            src={
              images && images.length
                ? images[0].url
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
            alt='profile'
          />
        </ImgContainer>
        <div
          name='info'
          className='profile-info d-flex flex-column justify-content-between mt-3'
        >
          <h3 name='info'>{toTitle(`${first_name} ${last_name}`)}</h3>
          <p name='info'>{email}</p>
        </div>
      </Col>
      <Col xs={12} md={6}>
        <h4>Bio</h4>
        <div name='bio' className='h-100 profile-bio' />
      </Col>
    </TabWrapper>
  );
};

export default PortalProfile;
