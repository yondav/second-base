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
import { GlobalContext } from '../../context/context.data';

const PortalGeneral = ({ setEdit }) => {
  const {
    state: {
      loading,
      data: {
        studio: { logo, images, email, address, name },
      },
    },
  } = useContext(GlobalContext);
  // const {
  //   data: {
  //     studio: { logo, images, email, address, name },
  //   },
  // } = state;

  const handleClick = e => setEdit('general_info');

  return (
    <Card style={{ borderTopLeftRadius: 0 }}>
      {/* {name ? (
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
                <Col xs={12} md={6} className='mb-5'>
                  <h4>Logo</h4>
                  <div className='logo-container p-3 mb-3'>
                    <img src={logo} alt={name} className='w-100' />
                  </div>
                </Col>
                <Col xs={12} md={6}>
                  <div className='studio-info d-flex flex-column'>
                    <h4>Info</h4>
                    <p>{name}</p>
                    <p>{email}</p>
                    <span>
                      {toTitle(`${address.address}, ${address.neighborhood}`)}
                    </span>
                    <span>{`${toTitle(`${address.city}, ${address.state}`)} ${
                      address.zip_code
                    }`}</span>
                  </div>
                </Col>
                <Col xs={12}>
                  <h4>Page Images</h4>
                  <Tabs defaultActiveKey='home' className='mt-3 admin-tab'>
                    {images.map(arr => (
                      <Tab
                        eventKey={arr.page}
                        title={toTitle(arr.page)}
                        key={arr.page}
                      >
                        <Card style={{ borderTopLeftRadius: 0 }}>
                          <Carousel>
                            {arr.images.map((img, i) => (
                              <Carousel.Item key={i}>
                                <img
                                  className='d-block w-100'
                                  src={img}
                                  alt={`${arr.page}, ${i + 1}`}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </Card>
                      </Tab>
                    ))}
                  </Tabs>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </>
      ) : (
        <Spinner animation='border' />
      )} */}
    </Card>
  );
};

export default PortalGeneral;
