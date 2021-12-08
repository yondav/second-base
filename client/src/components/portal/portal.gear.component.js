import React, { useContext, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import { DataContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';

import TabWrapper from './portal.tabWrapper.component';

const Gear = ({ setEdit }) => {
  const {
    state: {
      data: { gear },
    },
  } = useContext(DataContext);

  const handleEdit = () => setEdit('gear');

  useEffect(
    () =>
      console.log(
        Object.keys(gear).filter(key => !key.includes('_') && key !== 'name')
      ),
    []
  );
  return (
    <div></div>
    // <TabWrapper title='Gear' handleEdit={handleEdit}>
    //   <Accordion>
    //     {Object.keys(gear)
    //       .filter(key => !key.includes('_') && key !== 'name')
    //       .map((item, i) => (
    //         <AccordionItem key={i} eventKey={i}>
    //           <AccordionHeader>{toTitle(item)}</AccordionHeader>
    //           <Accordion.Body>
    //             {/* {gear[item].map(g => (

    //             ))} */}
    //           </Accordion.Body>
    //         </AccordionItem>
    //       ))}
    //   </Accordion>
    // </TabWrapper>
  );
};

export default Gear;
