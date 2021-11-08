import React, { useContext } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAdminContext from '../../hooks/useAdminContext';
import { AdminContext } from '../../context/context.auth';
import { BsInstagram } from 'react-icons/bs';
import logo from '../../assets/full-width-white.svg';

const Navigation = () => {
  const { logout } = useAdminContext();
  const admin = useContext(AdminContext);

  return (
    // I think we are going to opt to do our own variation of the toggle on mobile
    <Navbar variant='dark' expand='lg'>
      <Container fluid>
        <Row xs={12} style={{ padding: '1rem 2.5rem' }}>
          <Col xs={10} lg={6}>
            <Navbar.Brand as={Link} to='/'>
              <img src={logo} alt='secondBase' style={{ width: '30%' }} />
            </Navbar.Brand>
          </Col>
          <Col xs={2} lg={6}>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='me-auto w-100 d-flex justify-content-between'>
                <Row>
                  <Col lg={8} className='d-flex'>
                    <Nav.Link as={Link} to='/about'>
                      About
                    </Nav.Link>
                    <Nav.Link as={Link} to='/gear'>
                      Gear
                    </Nav.Link>
                    <Nav.Link as={Link} to='/artists'>
                      Artists
                    </Nav.Link>
                    <Nav.Link as={Link} to='/booking'>
                      Booking
                    </Nav.Link>
                  </Col>
                  <Col lg={4} className='d-flex'>
                    {admin.state.admin ? (
                      <>
                        <Nav.Link as={Link} to='/admin/portal'>
                          Portal
                        </Nav.Link>
                        <span
                          className='nav-link'
                          style={{ cursor: 'pointer' }}
                          onClick={logout}
                        >
                          Log out
                        </span>
                      </>
                    ) : (
                      <Nav.Link
                        href='https://www.instagram.com/secondbasebk/'
                        style={{ marginLeft: '4rem' }}
                      >
                        <BsInstagram size={'1.5em'} />
                      </Nav.Link>
                    )}
                  </Col>
                </Row>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Navigation;
