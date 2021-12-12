import React, { useEffect, useContext } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

import { DataContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';

import { ImgContainer, Grid, H3 } from '../styled';

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
      <Grid.Col className='py-1'>
        <div className='flex justify-end'>
          <AiOutlineEdit
            size='1.3em'
            className='cursor-pointer hover:text-blue-900 transition-all duration-300 ease-in-out'
            onClick={() => setEdit('profile')}
          />
        </div>
      </Grid.Col>
      <Grid.Col>
        <div className='flex justify-center items-center'>
          <ImgContainer square circle className='sm:w-2/3 lg:w-1/3'>
            <img
              name='img'
              src={
                images && images.length
                  ? images[0].url
                  : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
              }
              alt='profile'
              className='h-full w-auto max-w-none'
            />
          </ImgContainer>
        </div>
      </Grid.Col>
      <Grid.Col>
        <div name='info' className='flex flex-col justify-around'>
          <H3 name='info'>{toTitle(`${first_name} ${last_name}`)}</H3>
          <p name='info'>{email}</p>
          <p name='bio' className='profile-bio mt-3' />
        </div>
      </Grid.Col>
    </Grid.Container>
  );
};

export default Profile;
