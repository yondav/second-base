import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsInstagram } from 'react-icons/bs';
import logo from '../../assets/full-width-white.svg';

const Navigation = () => {
  return (
    // I think we are going to opt to do our own variation of the toggle on mobile
    <Navbar variant='dark' expand='lg'>
      <Container fluid>
        <Row xs={12} style={{ padding: '1rem 2.5rem' }}>
          <Col xs={10} lg={7}>
            <Navbar.Brand href='#home'>
              <img src={logo} alt='secondBase' style={{ width: '30%' }} />
            </Navbar.Brand>
          </Col>
          <Col xs={2} lg={5}>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto'>
                <Nav.Link href='#home'>About</Nav.Link>
                <Nav.Link href='#link'>Gear</Nav.Link>
                <Nav.Link href='#link'>Artists</Nav.Link>
                <Nav.Link href='#link'>Booking</Nav.Link>
                <Nav.Link href='#link' style={{ marginLeft: '7rem' }}>
                  <BsInstagram size={'1.5em'} />
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Navigation;
