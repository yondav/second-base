import React, { useEffect, useContext } from 'react';
import { Card, Row, Col, Container, Spinner } from 'react-bootstrap';
import { RiEditBoxLine } from 'react-icons/ri';

import { toTitle } from '../../utils/helperFuncs';
import { GlobalContext } from '../../context/context.data';

const PortalProfile = ({ setEdit }) => {
  const {
    state: {
      loading,
      data: {
        user: { first_name, last_name, email, bio, image },
      },
    },
  } = useContext(GlobalContext);

  const renderBio = () => {
    if (bio)
      document.querySelector('.profile-bio').innerHTML = JSON.parse(
        JSON.stringify(bio)
      );
  };

  const handleClick = e => setEdit('profile');

  useEffect(() => renderBio(), [bio]);

  return (
    <Card style={{ borderTopLeftRadius: 0 }}>
      {!loading ? (
        <>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <h1>Welcome Back {toTitle(first_name)}</h1>
            <RiEditBoxLine
              size='2em'
              className='pointer edit-icon'
              onClick={handleClick}
            />
          </Card.Header>
          <Card.Body>
            <Container className='py-5'>
              <Row>
                <Col xs={12} md={6}>
                  <h4>Profile</h4>
                  <div name='img' className='profile-img-container'>
                    <img
                      name='img'
                      src={
                        image && image.length
                          ? image[0].url
                          : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                      }
                      alt='profile'
                    />
                  </div>
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
              </Row>
            </Container>
          </Card.Body>
        </>
      ) : (
        <Spinner animation='border' />
      )}
    </Card>
  );
};

export default PortalProfile;
