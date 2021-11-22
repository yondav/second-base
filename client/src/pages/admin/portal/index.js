import React, { useState, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Modal,
  Spinner,
} from 'react-bootstrap';
import { PortalProfile, ModalContent } from '../../../components/portal';
import { GlobalContext } from '../../../context/context.data';

import './portal.css';

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
          <ModalContent edit={edit} setEdit={setEdit} state={state} />
        </Modal>
      )}
      <Container fluid>
        <Row>
          <Col>
            <Tabs
              defaultActiveKey='user'
              id='uncontrolled-tab-example'
              className='mt-5 admin-tab'
            >
              <Tab eventKey='user' title='Profile'>
                {!state.loading ? (
                  <PortalProfile state={state} setEdit={setEdit} />
                ) : (
                  <Spinner animation='border' />
                )}
              </Tab>
              <Tab eventKey='general_info' title='General'></Tab>
              <Tab eventKey='studio_gear' title='Gear'></Tab>
              <Tab eventKey='artists' title='Artists'></Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Portal;
