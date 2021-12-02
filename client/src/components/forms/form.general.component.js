import React, { useState, useContext } from 'react';
import { Form, Col, Tabs, Tab } from 'react-bootstrap';
import {
  FormWrapper,
  ImageUploader,
  inputHandler,
  generalInputs,
  addressInputs,
  renderInputs,
  ServiceGroup,
} from './formComponents';
import { DataContext } from '../../context/context.data';
import useDataContext from '../../hooks/useDataContext';
import { toTitle } from '../../utils/helperFuncs';

const GeneralForm = ({ setEdit }) => {
  const {
    state: {
      data: {
        studio: { images, email, address, services },
      },
    },
  } = useContext(DataContext);
  const {
    updateGeneral,
    addImage,
    updateImage,
    addService,
    updateService,
    deleteService,
  } = useDataContext();

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
  const [serviceList, setServiceList] = useState(
    [...services] || [{ name: '', description: '' }]
  );

  const tabs = [
    { page: 'home', state: homeImages, setter: setHomeImages },
    { page: 'about', state: aboutImages, setter: setAboutImages },
    { page: 'gear', state: gearImages, setter: setGearImages },
    { page: 'artists', state: artistsImages, setter: setArtistsImages },
    { page: 'booking', state: bookingImages, setter: setBookingImages },
  ];

  const serviceHandler = async () => {
    let newServices = serviceList.filter(service => !service._id);
    let existingServices = serviceList
      .filter(service => service._id)
      .filter(serv =>
        serviceList.find(
          s => s.name !== serv.name || s.description !== serv.description
        )
      );

    if (newServices.length) await addService(newServices);
    if (existingServices.length) await updateService(existingServices);
  };

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

  const handleSubmit = async e => {
    e.preventDefault();

    await serviceHandler();
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
    <FormWrapper
      handleSubmit={handleSubmit}
      setEdit={setEdit}
      headerEdit='Update General Info'
      alert={alert}
    >
      {renderInputs(generalInputs(formData), e =>
        inputHandler(e, formData, setFormData)
      )}
      <h4 className='mb-4'>Address</h4>
      {renderInputs(addressInputs(formData), e =>
        inputHandler(e, formData, setFormData)
      )}
      <Col>
        <Form.Label>Images</Form.Label>
        <Form.Text> (select a page)</Form.Text>
        <div className='img-tab-container'>
          <Tabs defaultActiveKey='home' className='my-2 admin-tab img-tab'>
            {tabs.map(tab => (
              <Tab eventKey={tab.page} title={toTitle(tab.page)} key={tab.page}>
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
      <h4 className='mb-4'>Services</h4>
      {serviceList.map((serv, i) => (
        <ServiceGroup
          key={i}
          service={serv}
          serviceList={serviceList}
          setServiceList={setServiceList}
          index={i}
          deleteService={deleteService}
        />
      ))}
    </FormWrapper>
  );
};

export default GeneralForm;
