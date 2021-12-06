import React, { useState, useEffect, useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Tabs, Tab, Modal, Card } from 'react-bootstrap';
import { DataContext } from '../../../context/context.data';
import useAdminContext from '../../../hooks/useAdminContext';
import {
  ModalContent,
  PortalProfile,
  PortalGeneral,
  PortalGear,
} from '../../../components/portal';
import Loading from '../../../components/loading';
import { Column } from '../../../components/styled/general';

import './portal.css';

const tabs = [
  { eventKey: 'user', title: 'Profile', component: PortalProfile },
  { eventKey: 'general_info', title: 'General', component: PortalGeneral },
  { eventKey: 'gear', title: 'Gear', component: PortalGear },
  { eventKey: 'artists', title: 'Artists', component: PortalProfile },
];

const Portal = () => {
  const { verifyToken } = useAdminContext();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { state } = useContext(DataContext);

  useEffect(() => {
    verifyToken().then(res => {
      if (!res.verified) navigate('/login');
    });
  }, [edit]);

  return (
    <>
      {state.data.user.first_name ? (
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
              <Column>
                <Tabs defaultActiveKey='user' className='mt-5 admin-tab'>
                  {tabs.map((tab, i) => (
                    <Tab eventKey={tab.eventKey} title={tab.title} key={i}>
                      {React.createElement(tab.component, { setEdit })}
                    </Tab>
                  ))}
                </Tabs>
              </Column>
            </Row>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Portal;
