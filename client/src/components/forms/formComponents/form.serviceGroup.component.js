import React, { useState } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { VscAdd, VscRemove } from 'react-icons/vsc';
import { Grid } from '../../styled';
import { Input, TextArea } from './index';

const ServiceGroup = ({
  service,
  serviceList,
  setServiceList,
  index,
  deleteService,
}) => {
  const [addDescription, setAddDescription] = useState(
    serviceList[index].description
  );
  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[i][name] = value;
    setServiceList(list);
    console.log(serviceList);
  };

  const handleRemoveClick = i => {
    const list = [...serviceList];
    list.splice(i, 1);
    setServiceList(list);

    if (service._id) deleteService(service._id);
  };

  const handleAddClick = () => {
    setServiceList([...serviceList, { name: '', description: '' }]);
  };

  return (
    <>
      <Grid.Col xs={10}>
        <Row>
          <Input
            label='Service'
            type='text'
            name='name'
            value={serviceList[index].name}
            xs={addDescription ? 12 : 8}
            changehandler={e => handleInputChange(e, index)}
          />
          {!addDescription && (
            <Grid.Col xs={4}>
              <span
                className='nav-link pointer mt-5'
                onClick={() => setAddDescription(true)}
                style={{ textDecoration: 'underline', fontStyle: 'italic' }}
              >
                Add Description
              </span>
            </Grid.Col>
          )}
          {addDescription && (
            <TextArea
              label='Description'
              name='description'
              rows={3}
              xs={12}
              changehandler={e => handleInputChange(e, index)}
              val={serviceList[index].description}
            />
          )}
        </Row>
      </Grid.Col>
      <Grid.Col xs={2}>
        {serviceList.length !== 1 && (
          <div className='d-flex flex-column justify-content-end align-items-center mb-5 ml-1'>
            <Form.Label style={{ color: 'transparent' }}>Remove</Form.Label>
            <Button
              variant='outline-dark'
              type='button'
              onClick={() => handleRemoveClick(index)}
            >
              <VscRemove />
            </Button>
          </div>
        )}
        {serviceList.length - 1 === index && (
          <div className='d-flex flex-column justify-content-end align-items-center mb-5'>
            <Form.Label style={{ color: 'transparent' }}>Add</Form.Label>
            <Button
              variant='outline-dark'
              type='button'
              onClick={handleAddClick}
            >
              <VscAdd />
            </Button>
          </div>
        )}
      </Grid.Col>
    </>
  );
};

export default ServiceGroup;
