import React, { useEffect, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

import { DataContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';

import { PortalItem, Grid, H3 } from '../styled';

const Profile = ({ setEdit }) => {
  const {
    state: {
      data: {
        user: { first_name, last_name, email, bio, images, _id },
      },
    },
  } = useContext(DataContext);

  const renderBio = () => {
    if (bio)
      document.querySelector('.profile-bio').innerHTML = JSON.parse(
        JSON.stringify(bio)
      );
  };

  useEffect(() => renderBio(), [bio]);

  return (
    <Grid.Container>
      <Grid.Col md={4}>
        <PortalItem.Wrapper>
          <img
            name='img'
            src={
              images && images.length
                ? images[0].url
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
            alt='profile'
            className='w-full rounded-full'
          />
        </PortalItem.Wrapper>
      </Grid.Col>
      <Grid.Col md={8}>
        <div className='flex justify-end'>
          <AiOutlineEdit
            size='1.3em'
            className='cursor-pointer hover:text-blue-900 transition-all duration-300 ease-in-out'
            onClick={() => setEdit('profile')}
          />
        </div>
        <div name='info' className='flex flex-col justify-end h-full'>
          <H3 name='info'>{toTitle(`${first_name} ${last_name}`)}</H3>
          <p name='info'>{email}</p>
          <div name='bio' className='h-100 profile-bio' />
        </div>
      </Grid.Col>
      <Grid.Col>
        <h4>Bio</h4>
      </Grid.Col>
    </Grid.Container>
  );
};

export default Profile;
