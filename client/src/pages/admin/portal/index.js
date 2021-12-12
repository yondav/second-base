import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { DataContext } from '../../../context/context.data';
import useAdminContext from '../../../hooks/useAdminContext';
import { toTitle, bodyToggle } from '../../../utils/helperFuncs';

import Loading from '../../../components/loading';
import * as Admin from '../../../components/portal';
import { Card, Accordion, H3 } from '../../../components/styled';

import './portal.css';

const pages = [
  { title: 'profile', component: Admin.Profile },
  { title: 'studio', component: Admin.Studio },
  { title: 'gear', component: Admin.Gear },
  { title: 'artists', component: Admin.Profile },
];

const Portal = () => {
  const { verifyToken } = useAdminContext();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const { state } = useContext(DataContext);

  const [active, setActive] = useState(['profile']);

  const activeSetter = eventKey => {
    let list = [...active];
    let isActive = list.find(key => key === eventKey);

    isActive ? list.splice(list.indexOf(isActive), 1) : list.push(eventKey);

    setActive(list);
  };

  useEffect(() => {
    bodyToggle(edit);
    verifyToken().then(res => {
      if (!res.verified) navigate('/login');
    });
  }, [edit]);

  return (
    <Card.Base>
      {!state.data.user.first_name ? (
        <Loading />
      ) : (
        <>
          <Card.Header>
            <H3>Welcome back {toTitle(state.data.user.first_name)}</H3>
          </Card.Header>
          <Card.Body>
            <Accordion.Base>
              {pages.map(pg => (
                <Accordion.Section
                  key={pg.title}
                  param={pg.title}
                  title={toTitle(pg.title)}
                  active={active.includes(pg.title)}
                  setActive={() => activeSetter(pg.title)}
                >
                  {React.createElement(pg.component, { setEdit })}
                </Accordion.Section>
              ))}
            </Accordion.Base>
          </Card.Body>
          <AnimatePresence>
            {edit && <Admin.ModalContent edit={edit} setEdit={setEdit} />}
          </AnimatePresence>
        </>
      )}
    </Card.Base>
  );
};

export default Portal;
