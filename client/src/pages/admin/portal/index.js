import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Modal,
  Spinner,
  Card,
} from 'react-bootstrap';
import {
  ModalContent,
  PortalProfile,
  PortalGeneral,
} from '../../../components/portal';
import { AdminContext } from '../../../context/context.auth';
import useAdminContext from '../../../hooks/useAdminContext';
import { DataContext } from '../../../context/context.data';
import './portal.css';

const tabs = [
  { eventKey: 'user', title: 'Profile', component: PortalProfile },
  { eventKey: 'general_info', title: 'General', component: PortalGeneral },
  { eventKey: 'studio_gear', title: 'Gear', component: PortalProfile },
  { eventKey: 'artists', title: 'Artists', component: PortalProfile },
];

const Portal = () => {
  const admin = useContext(AdminContext);
  const { verifyToken } = useAdminContext();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { state } = useContext(DataContext);

  useEffect(() => {
    console.log('portal');
    verifyToken();
    if (!admin.state.admin) navigate('/login');
    console.log(admin.state);
  }, [admin.state.admin, navigate, edit]);

  return (
    <>
      {!state.loading ? (
        <>
          {edit && (
            <Modal
              centered
              show={true}
              size='xl'
              fullscreen={'lg-down'}
              onHide={() => setEdit(false)}
            >
              <Modal.Header closeButton />
              <ModalContent edit={edit} setEdit={setEdit} />
            </Modal>
          )}
          <Container fluid>
            <Row>
              <Col>
                <Tabs defaultActiveKey='user' className='mt-5 admin-tab'>
                  {tabs.map((tab, i) => (
                    <Tab eventKey={tab.eventKey} title={tab.title} key={i}>
                      {!state.loading ? (
                        React.createElement(tab.component, { setEdit })
                      ) : (
                        <Card
                          style={{ borderTopLeftRadius: 0, height: '40rem' }}
                          className='w-100 d-flex justify-content-center align-items-center'
                        >
                          <Spinner animation='border' />
                        </Card>
                      )}
                    </Tab>
                  ))}
                </Tabs>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <Spinner animation='border' />
      )}
    </>
  );
};

export default Portal;
