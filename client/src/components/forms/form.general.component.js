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
import {
  FormHeader,
  ButtonGroup,
  ImageUploader,
  inputHandler,
  generalInputs,
  addressInputs,
  renderInputs,
} from './formComponents';
import { DataContext } from '../../context/context.data';
import useDataContext from '../../hooks/useDataContext';
import { toTitle } from '../../utils/helperFuncs';

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
              {renderInputs(generalInputs(formData), e =>
                inputHandler(e, formData, setFormData)
              )}
              <Form.Label>Address</Form.Label>
              {renderInputs(addressInputs(formData), e =>
                inputHandler(e, formData, setFormData)
              )}
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
