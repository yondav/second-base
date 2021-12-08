import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataContext } from '../../../context/context.data';
import useAdminContext from '../../../hooks/useAdminContext';
import { toTitle } from '../../../utils/helperFuncs';

import Loading from '../../../components/loading';
import * as portal from '../../../components/portal';
import { Card, Accordion } from '../../../components/styled';

import './portal.css';

const pages = [
  { title: 'profile', component: portal.Profile },
  { title: 'studio', component: portal.Studio },
  { title: 'gear', component: portal.Gear },
  { title: 'artists', component: portal.Profile },
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
            <h1>Welcome back {toTitle(state.data.user.first_name)}</h1>
          </Card.Header>
          <Card.Body>
            <Accordion.Base>
              {pages.map(page => (
                <Accordion.Section
                  key={page.title}
                  title={toTitle(page.title)}
                  active={active.includes(page.title)}
                  setActive={() => activeSetter(page.title)}
                >
                  {React.createElement(page.component, { setEdit })}
                </Accordion.Section>
              ))}
            </Accordion.Base>
          </Card.Body>
        </>
      )}
    </Card.Base>
  );
};

export default Portal;
