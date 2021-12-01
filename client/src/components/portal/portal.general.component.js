import React, { useContext } from 'react';
import {
  Card,
  Row,
  Col,
  Container,
  Spinner,
  Tabs,
  Tab,
  Carousel,
} from 'react-bootstrap';
import { RiEditBoxLine } from 'react-icons/ri';

import { toTitle } from '../../utils/helperFuncs';
import { DataContext } from '../../context/context.data';

const PortalGeneral = ({ setEdit }) => {
  const {
    state: {
      loading,
      data: {
        studio: { logo, images, email, address, name },
      },
    },
  } = useContext(DataContext);

  const handleClick = e => setEdit('general_info');

  return (
    <Card style={{ borderTopLeftRadius: 0 }}>
      {!loading ? (
        <>
          <Card.Header className='d-flex justify-content-between align-items-center'>
            <h1>General Info</h1>
            <RiEditBoxLine
              size='2em'
              className='pointer edit-icon'
              onClick={handleClick}
            />
          </Card.Header>
          <Card.Body>
            <Container className='py-5'>
              <Row>
                <Col xs={12} md={5} lg={6} className='mb-5'>
                  <div className='logo-container p-3 mb-3'>
                    <img src={logo} alt={name} className='w-100' />
                  </div>
                  <div className='studio-info'>
                    <div className='my-2 d-flex flex-column'>
                      <span>{name}</span>
                      <span>{email}</span>
                    </div>
                    <div className='my-2 d-flex flex-column'>
                      <span>
                        {toTitle(`${address.address}, ${address.neighborhood}`)}
                      </span>
                      <span>{`${toTitle(`${address.city}, ${address.state}`)} ${
                        address.zip_code
                      }`}</span>
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={7} lg={6}>
                  <h4>Page Images</h4>
                  <div className='img-tab-container'>
                    <Tabs
                      defaultActiveKey='home'
                      className='mt-3 admin-tab img-tab'
                    >
                      {Object.keys(images)
                        .filter(page => !page.includes('_') && page !== 'name')
                        .map((page, i) => (
                          <Tab eventKey={page} title={toTitle(page)} key={i}>
                            <Card style={{ borderTopLeftRadius: 0 }}>
                              {images[page].length ? (
                                <Carousel
                                  indicators={false}
                                  interval={null}
                                  variant='dark'
                                >
                                  {images[page]
                                    .sort((a, b) => a.sequence - b.sequence)
                                    .map(img => (
                                      <Carousel.Item
                                        key={img._id}
                                        className='portal-carousel-item'
                                      >
                                        <img
                                          className='d-block w-100 portal-carousel-img'
                                          src={img.url}
                                          alt={img._id}
                                          style={{
                                            filter: !img.color && 'saturate(0)',
                                          }}
                                        />
                                      </Carousel.Item>
                                    ))}
                                </Carousel>
                              ) : (
                                <div />
                              )}
                            </Card>
                          </Tab>
                        ))}
                    </Tabs>
                  </div>
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

export default PortalGeneral;
