import React, { useState, useContext, useEffect } from 'react';
import { Card, Col, Tabs, Tab, Carousel } from 'react-bootstrap';
import { RiArrowDropDownFill } from 'react-icons/ri';

import { toTitle } from '../../utils/helperFuncs';
import { DataContext } from '../../context/context.data';
import TabWrapper from './portal.tabWrapper.component';
import { ImgContainer } from '../styled/general';

const PortalGeneral = ({ setEdit }) => {
  const {
    state: {
      data: {
        studio: { logo, images, email, address, name, services },
      },
    },
  } = useContext(DataContext);
  const [showServices, setShowServices] = useState(false);

  const handleServices = e =>
    !showServices ? setShowServices(true) : setShowServices(false);

  const handleEdit = e => setEdit('general_info');

  useEffect(() => console.log(services), []);
  return (
    <TabWrapper title='General Info' handleEdit={handleEdit}>
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
        <div
          className='d-flex align-items-center my-3 pointer'
          onClick={handleServices}
        >
          <h4 className='m-0'>Services</h4>
          <RiArrowDropDownFill size='2em' />
        </div>
        {showServices && (
          <ul>
            {services.map(serv => (
              <li key={serv._id}>
                <div className='my-2 d-flex flex-column'>
                  <span>{serv.name}</span>
                  {serv.description && (
                    <span
                      style={{
                        fontSize: '.95em',
                        marginLeft: '.8rem',
                      }}
                    >
                      <em>{serv.description}</em>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Col>
      <Col xs={12} md={7} lg={6}>
        <h4>Page Images</h4>
        <ImgContainer className='w-100'>
          <Tabs defaultActiveKey='home' className='mt-3 admin-tab img-tab'>
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
        </ImgContainer>
      </Col>
    </TabWrapper>
  );
};

export default PortalGeneral;
