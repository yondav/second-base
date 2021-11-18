import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useAdminContext from '../../hooks/useAdminContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import { AdminContext } from '../../context/context.auth';
import { BsInstagram } from 'react-icons/bs';
import logo from '../../assets/full-width-white.svg';
import NavCollapse from '../navCollapse';
import NavExpand from '../navExpand';

import './navigation.css';

const Navigation = () => {
  const { isDesktop } = useMediaQuery();
  const { logout } = useAdminContext();
  const admin = useContext(AdminContext);
  const [navExpand, setNavExpand] = useState(false);

  useEffect(() => {
    const nav = document.querySelector('nav');
    const navLink = document.querySelectorAll('.nav-link');

    if (navExpand) {
      nav.classList.add('expanded-nav');
      navLink.forEach(link => link.classList.add('expanded-nav-link'));
    } else {
      nav.classList.remove('expanded-nav');
      setTimeout(() => {
        navLink.forEach(link => link.classList.remove('expanded-nav-link'));
      }, 1000);
    }
  }, [navExpand]);

  return (
    // I think we are going to opt to do our own variation of the toggle on mobile
    <Navbar variant='dark' expand='lg'>
      <Container fluid style={{ width: 'auto' }}>
        <Row xs={12} style={{ padding: '1rem 2.5rem' }}>
          <Col xs={11} lg={6}>
            <Navbar.Brand as={Link} to='/'>
              <img src={logo} alt='secondBase' style={{ width: '30%' }} />
            </Navbar.Brand>
          </Col>
          <Col xs={1} lg={6}>
            {!isDesktop && (
              <NavCollapse navExpand={navExpand} setNavExpand={setNavExpand} />
            )}
            <Navbar.Collapse>
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
                        <span className='nav-link pointer' onClick={logout}>
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
      <AnimatePresence>{navExpand && <NavExpand />}</AnimatePresence>
    </Navbar>
  );
};

export default Navigation;
