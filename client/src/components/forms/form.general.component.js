import React, { useState, useContext } from 'react';
import {
  Card,
  Alert,
  Form,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { DataContext } from '../../context/context.data';
import useDataContext from '../../hooks/useDataContext';
import { toTitle } from '../../utils/helperFuncs';
import {
  FormHeader,
  ButtonGroup,
  ImageUploader,
  Input,
} from './formComponents';

const GeneralForm = ({ setEdit }) => {
  const {
    state: {
      data: {
        studio: { images, email, address },
      },
    },
  } = useContext(DataContext);
  const { updateGeneral, addImage, updateImage } = useDataContext();

  const [alert, setAlert] = useState();
  const [formData, setFormData] = useState({
    email,
    address: { ...address },
  });
  const [homeImages, setHomeImages] = useState([...images.home]);
  const [aboutImages, setAboutImages] = useState([...images.about]);
  const [gearImages, setGearImages] = useState([...images.gear]);
  const [artistsImages, setArtistsImages] = useState([...images.artists]);
  const [bookingImages, setBookingImages] = useState([...images.booking]);

  const tabs = [
    { page: 'home', state: homeImages, setter: setHomeImages },
    { page: 'about', state: aboutImages, setter: setAboutImages },
    { page: 'gear', state: gearImages, setter: setGearImages },
    { page: 'artists', state: artistsImages, setter: setArtistsImages },
    { page: 'booking', state: bookingImages, setter: setBookingImages },
  ];

  const generalInputs = [
    { label: 'Email', type: 'email', name: 'email', value: formData.email },
  ];

  const addressInputs = [
    {
      label: 'Street Address',
      type: 'text',
      name: 'address-address',
      value: formData.address.address,
    },
    {
      label: 'Neighborhood',
      type: 'text',
      name: 'address-neighborhood',
      value: formData.address.neighborhood,
      xs: 6,
      md: 3,
    },
    {
      label: 'City',
      type: 'text',
      name: 'address-city',
      value: formData.address.city,
      xs: 6,
      md: 3,
    },
    {
      label: 'State',
      type: 'text',
      name: 'address-state',
      value: formData.address.state,
      xs: 6,
      md: 3,
    },
    {
      label: 'Zip Code',
      type: 'number',
      name: 'address-zip_code',
      value: formData.address.zip_code,
      xs: 6,
      md: 3,
    },
  ];

  const inputHandler = e => {
    let obj = formData;
    let name = e.target.getAttribute('name');

    if (name.includes('-')) {
      let arr = name.split('-');
      obj[arr[0]][arr[1]] = e.target.value;
    } else {
      obj[name] = e.target.value;
    }

    setFormData(obj);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const imageHandler = async () =>
      tabs.forEach(async tab => {
        let newImgs = tab.state.filter(img => !img._id);
        let existingImgs = tab.state
          .filter(img => img._id)
          .filter(image =>
            images[tab.page].find(
              img =>
                img.color !== image.color ||
                img.photo_credit !== image.photo_credit ||
                img.sequence !== image.sequence
            )
          );

        if (newImgs.length) {
          await addImage({
            imgs: newImgs,
            collection: 'studio',
            subCollection: tab.page,
            parentId: images._id,
          });
        }

        if (existingImgs.length) {
          await updateImage({
            imgs: existingImgs,
            collection: 'studio',
            subCollection: tab.page,
          });
        }
      });

    await imageHandler();
    const res = await updateGeneral(formData);

    if (res) {
      setAlert({ message: 'General info updated', variant: 'success' });
      setTimeout(() => setEdit(false), 1500);
    } else {
      setAlert({
        message: 'General Info was not updated. Bad request.',
        variant: 'danger',
      });
    }
  };

  return (
    <Card>
      <FormHeader method='put' edit='Update General Info' />
      <Card.Body>
        <Container>
          <Form className='my-5' onSubmit={handleSubmit}>
            <Row>
              {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
              {generalInputs.map((input, i) => (
                <Input
                  key={i}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  changehandler={inputHandler}
                  value={input.value}
                  xs={12}
                  md={6}
                />
              ))}
              <Form.Label>Address</Form.Label>
              {addressInputs.map((input, i) => (
                <Input
                  key={i}
                  label={input.label}
                  type={input.type}
                  name={input.name}
                  changehandler={inputHandler}
                  value={input.value}
                  xs={input.xs || 12}
                  md={input.md || 12}
                />
              ))}
              <Col>
                <Form.Label>Images</Form.Label>
                <Form.Text> (select a page)</Form.Text>
                <div className='img-tab-container'>
                  <Tabs
                    defaultActiveKey='home'
                    className='my-2 admin-tab img-tab'
                  >
                    {tabs.map(tab => (
                      <Tab
                        eventKey={tab.page}
                        title={toTitle(tab.page)}
                        key={tab.page}
                      >
                        <ImageUploader
                          type='studio'
                          subType={tab.page}
                          originalList={images[tab.page]}
                          images={tab.state}
                          setImages={tab.setter}
                        />
                      </Tab>
                    ))}
                  </Tabs>
                </div>
              </Col>
            </Row>
            <ButtonGroup
              handleCancel={() => setEdit(false)}
              handleSubmit={handleSubmit}
            />
          </Form>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default GeneralForm;
