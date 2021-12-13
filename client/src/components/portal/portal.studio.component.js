import React, { useState, useContext, useRef, useEffect } from 'react';
import { Card, Tabs, Tab } from 'react-bootstrap';
import { RiArrowDropDownFill } from 'react-icons/ri';

import { DataContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';
import TabWrapper from './portal.tabWrapper.component';
import Slider from '../slider';
import { Grid } from '../styled';

const Studio = ({ setEdit }) => {
  const {
    state: {
      data: {
        studio: { logo, images, email, address, name, services },
      },
    },
  } = useContext(DataContext);
  const ref = useRef();
  const [logoWidth, setLogoWidth] = useState('auto');
  const [showServices, setShowServices] = useState(false);

  const handleServices = e =>
    !showServices ? setShowServices(true) : setShowServices(false);

  const handleEdit = e => setEdit('general_info');

  useEffect(() => {
    window.addEventListener('resize', () =>
      setLogoWidth(ref.current.offsetWidth)
    );
    return setLogoWidth(ref.current.offsetWidth);
  }, []);

  return (
    <Grid.Container>
      <Grid.Col>
        <div className='flex flex-col justify-center items-center '>
          <img
            ref={ref}
            src={logo}
            alt={name}
            className='bg-gray-900 rounded-lg p-5'
          />
          <div className='my-3 flex flex-col' style={{ width: logoWidth }}>
            <div className='mb-3'>
              <span>{email}</span>
            </div>
            <div className='flex flex-col justify-between'>
              <span>
                {toTitle(`${address.address}, ${address.neighborhood}`)}
              </span>
              <span>{`${toTitle(`${address.city}, ${address.state}`)} ${
                address.zip_code
              }`}</span>
            </div>
          </div>
        </div>
      </Grid.Col>
      <Grid.Col></Grid.Col>
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
      <Grid.Col xs={12} md={7} lg={6}>
        <h4>Page Images</h4>
        <div className='w-100'>
          <Tabs defaultActiveKey='home' className='mt-3 admin-tab img-tab'>
            {Object.keys(images)
              .filter(page => !page.includes('_') && page !== 'name')
              .map((page, i) => (
                <Tab eventKey={page} title={toTitle(page)} key={i}>
                  {/* <Card style={{ borderTopLeftRadius: 0 }}>
                    {images[page].length > 0 && (
                      <Carousel
                        indicators={false}
                        interval={null}
                        variant='dark'
                      >
                        {images[page]
                          .sort((a, b) => a.sequence - b.sequence)
                          .map(({ _id, url, color }) => (
                            <Carousel.Item
                              key={_id}
                              className='portal-carousel-item'
                            >
                              <img
                                className='d-block w-100'
                                src={url}
                                alt={_id}
                                style={{
                                  filter: !color && 'saturate(0)',
                                }}
                              />
                            </Carousel.Item>
                          ))}
                      </Carousel>
                    )}
                  </Card> */}
                </Tab>
              ))}
          </Tabs>
        </div>
      </Grid.Col>
    </Grid.Container>
  );
};

export default Studio;
