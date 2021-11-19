import React, { useState, useEffect, useCallback } from 'react';
import Resizer from 'react-image-file-resizer';
import { useDropzone } from 'react-dropzone';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { Card, Alert, Form, Spinner, Col } from 'react-bootstrap';
import { IoIosCloudUpload } from 'react-icons/io';

import { ImageUploaderThumbnail } from './index';
import api from '../../../utils/api';

const ImageUploader = ({ single }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: files => handleDrop(files),
  });

  const compressFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        2000,
        2000,
        'JPEG',
        70,
        0,
        uri => {
          resolve(uri);
        },
        'base64',
        1200,
        1200
      );
    });

  const handleDrop = files => {
    if ((single && files.length > 1) || (single && images.length >= 1)) {
      setStatusMessage({
        message: 'Max number of files is 1 for this submission',
        variant: 'danger',
      });
      return setTimeout(() => setStatusMessage(false), 3000);
    }

    setLoading(true);
    files.map(async file => {
      const compressed = await compressFile(file);

      const data = new FormData();
      data.append('file', compressed);
      data.append('upload_preset', 'secondBase');
      data.append('api_key', '935732523544471');
      data.append('cloud_name', 'yup-schlepp');

      const res = await api({
        url: 'https://api.cloudinary.com/v1_1/yup-schlepp/image/upload',
        method: 'post',
        data,
      });

      if (res) setLoading(false);
      setImages(prev => [...prev, res.data]);

      statusSetter(res.status);
    });
  };

  const statusSetter = status => {
    status === 200
      ? setStatusMessage({
          message: 'Images have been added',
          variant: 'success',
        })
      : setStatusMessage({
          message: 'Something went wrong with your upload',
          variant: 'danger',
        });

    setTimeout(() => setStatusMessage(false), 3000);
  };

  const moveThumbnail = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = images[dragIndex];
      setImages(
        update(images, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [images]
  );

  const renderThumbnail = (img, i) => {
    return (
      <ImageUploaderThumbnail
        key={img.asset_id}
        index={i}
        id={img.asset_id}
        url={img.url}
        moveThumbnail={moveThumbnail}
        images={images}
        setImages={setImages}
      />
    );
  };

  useEffect(() => console.log(images), [images]);

  return (
    <Col xs={12}>
      <Card className='mb-5'>
        {statusMessage && (
          <Alert variant={statusMessage.variant} className='text-center'>
            {statusMessage.message}
          </Alert>
        )}
        <Card.Header
          {...getRootProps({ className: 'dropzone' })}
          className='d-flex justify-content-center p-5 pointer'
        >
          {!loading ? (
            <>
              <Form.Control {...getInputProps()} />
              <div className='upload-square p-3 d-flex align-items-center justify-content-center'>
                <div className='upload-square-content d-flex flex-column align-items-center'>
                  <IoIosCloudUpload size={'3.5em'} />
                  <h5>Drag and Drop images here</h5>
                </div>
              </div>
            </>
          ) : (
            <Spinner animation='border' />
          )}
        </Card.Header>
        {images.length > 0 && (
          <Card.Body className='d-flex justify-content-center flex-wrap preview-imgs'>
            <DndProvider backend={HTML5Backend}>
              {images.map((img, i) => renderThumbnail(img, i))}
            </DndProvider>
          </Card.Body>
        )}
      </Card>
    </Col>
  );
};

export default ImageUploader;
