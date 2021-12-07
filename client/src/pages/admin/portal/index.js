import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../../context/context.data';
import useAdminContext from '../../../hooks/useAdminContext';
import {
  ModalContent,
  PortalProfile,
  PortalGeneral,
  PortalGear,
} from '../../../components/portal';
import Loading from '../../../components/loading';
import {
  Card,
  CardHeader,
  CardBody,
  Accordion,
  AccordionSection,
} from '../../../components/styled';
import { toTitle } from '../../../utils/helperFuncs';

import './portal.css';

const pages = [
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

  const [active, setActive] = useState(['user']);

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
    <Card>
      {!state.data.user.first_name ? (
        <Loading />
      ) : (
        <>
          <CardHeader>
            <h1>Welcome back {toTitle(state.data.user.first_name)}</h1>
          </CardHeader>
          <CardBody>
            <Accordion>
              {pages.map(page => (
                <AccordionSection
                  key={page.title}
                  title={page.title}
                  active={active.includes(page.eventKey)}
                  setActive={() => activeSetter(page.eventKey)}
                >
                  {React.createElement(page.component, { setEdit })}
                </AccordionSection>
              ))}
            </Accordion>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export default Portal;
