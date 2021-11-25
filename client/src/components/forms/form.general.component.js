import React, { useState, useEffect, useContext } from 'react';
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
import { GlobalContext } from '../../context/context.data';
import { toTitle } from '../../utils/helperFuncs';
import {
  FormHeader,
  ButtonGroup,
  ImageUploader,
  Input,
} from './formComponents';

const GeneralForm = ({ state, setEdit }) => {
  const { updateGeneral } = useContext(GlobalContext);
  const {
    data: {
      studio: { logo, images, email, address, name },
    },
  } = state;

  const [alert, setAlert] = useState();
  const [formData, setFormData] = useState({
    name,
    email,
    address: {
      address: address.address,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
    },
    logo,
    images,
  });
  const [logoState, setLogoState] = useState([logo]);
  const [homeImages, setHomeImages] = useState(
    images.find(obj => obj.page === 'home').images
  );
  const [aboutImages, setAboutImages] = useState(
    images.find(obj => obj.page === 'about').images
  );
  const [gearImages, setGearImages] = useState(
    images.find(obj => obj.page === 'gear').images
  );
  const [artistsImages, setArtistImages] = useState(
    images.find(obj => obj.page === 'artists').images
  );
  const [bookingImages, setBookingImages] = useState(
    images.find(obj => obj.page === 'booking').images
  );
  let imgArrTemp = images;
  const [imageArr, setImageArr] = useState();
  const addStateImgArr = (i, state, setter) => {
    imgArrTemp[i] = { ...imgArrTemp[i], state, setter };
    setImageArr(imgArrTemp);
  };

  const setLogo = img => {
    setFormData(prev => ({ ...prev, logo: img }));
  };

  const setImages = (i, arr) => {
    let images = formData.images;
    images[i] = { ...images[i], images: arr };
    setFormData(prev => ({ ...prev, images }));
  };

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

  useEffect(() => {
    setLogo(logoState[0]);
    setImages(0, homeImages);
    setImages(1, aboutImages);
    setImages(2, gearImages);
    setImages(3, artistsImages);
    setImages(4, bookingImages);
  }, [
    logoState,
    homeImages,
    aboutImages,
    gearImages,
    artistsImages,
    bookingImages,
  ]);

  useEffect(() => {
    addStateImgArr(0, homeImages, setHomeImages);
    addStateImgArr(1, aboutImages, setAboutImages);
    addStateImgArr(2, gearImages, setGearImages);
    addStateImgArr(3, artistsImages, setArtistImages);
    addStateImgArr(4, bookingImages, setBookingImages);
  }, [imgArrTemp]);

  return (
    <Card>
      <FormHeader method='put' edit='Update General Info' />
      <Card.Body>
        <Container>
          <Form className='my-5' onSubmit={handleSubmit}>
            <Row>
              {alert && <Alert variant={alert.variant}>{alert.message}</Alert>}
              <ImageUploader
                single={true}
                images={logoState}
                setImages={setLogoState}
                label='Logo'
              />
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
                <Tabs defaultActiveKey='home' className='my-2 admin-tab'>
                  {imageArr &&
                    imageArr.map(arr => (
                      <Tab
                        eventKey={arr.page}
                        title={toTitle(arr.page)}
                        key={arr.page}
                      >
                        <ImageUploader
                          images={arr.state}
                          setImages={arr.setter}
                          imageForm={true}
                        />
                      </Tab>
                    ))}
                </Tabs>
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
