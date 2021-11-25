import React, { useState, useContext } from 'react';
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
import { GlobalContext } from '../../../context/context.data';

import './portal.css';

const tabs = [
  { eventKey: 'user', title: 'Profile', component: PortalProfile },
  { eventKey: 'general_info', title: 'General', component: PortalGeneral },
  { eventKey: 'studio_gear', title: 'Gear', component: PortalProfile },
  { eventKey: 'artists', title: 'Artists', component: PortalProfile },
];

const Portal = () => {
  const [edit, setEdit] = useState(false);
  const { state } = useContext(GlobalContext);

  return (
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
  );
};

export default Portal;
