import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { VscAdd, VscRemove } from 'react-icons/vsc';
import { Input, TextArea } from './index';

const ServiceGroup = ({
  service,
  serviceList,
  setServiceList,
  index,
  deleteService,
}) => {
  const [addDescription, setAddDescription] = useState(false);
  const handleInputChange = (e, i) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[i][name] = value;
    setServiceList(list);
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
      <Col xs={10}>
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
            <Col xs={4}>
              <span
                className='nav-link pointer mt-5'
                onClick={() => setAddDescription(true)}
                style={{ textDecoration: 'underline', fontStyle: 'italic' }}
              >
                Add Description
              </span>
            </Col>
          )}
          {addDescription && (
            <TextArea
              label='Description'
              name='description'
              rows={3}
              xs={12}
              onChange={e => handleInputChange(e, index)}
            />
          )}
        </Row>
      </Col>
      <Col xs={2}>
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
      </Col>
    </>
  );
};

export default ServiceGroup;
