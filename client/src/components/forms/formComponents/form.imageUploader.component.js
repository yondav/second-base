import React, { useState, useCallback } from 'react';
import Resizer from 'react-image-file-resizer';
import { useDropzone } from 'react-dropzone';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

import Alert from '../../alert';
import { IoIosCloudUpload } from 'react-icons/io';

import { ImageUploaderThumbnail } from './index';
import Loading from '../../loading';
import useDataContext from '../../../hooks/useDataContext';
import api from '../../../utils/api';
import { Grid, Card, Form } from '../../styled';

import '../form_styles.css';

const ImageUploader = ({
  single,
  images,
  setImages,
  label,
  type,
  subType,
  originalList,
}) => {
  const { deleteImage } = useDataContext();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(false);
  const [render, setRender] = useState(1);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    clickable: true,
    onDrop: files => handleDrop(files),
  });

  const compressFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        2000,
        2000,
        'WEBP',
        70,
        0,
        uri => resolve(uri),
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
      setImages(prev => [
        ...prev,
        { sequence: images.length + 0, photo_credit: '', url: res.data.url },
      ]);

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
          $apply: imgs => imgs.map((img, i) => ({ ...img, sequence: i })),
        })
      );
      console.log(images);
    },
    [images]
  );

  const inputHandler = (e, id) => {
    let list = images;
    let target = list.indexOf(list.find(img => img._id === id));
    list[target] = { ...list[target], photo_credit: e.target.value };

    setImages(list);
    setRender(render + 1);
  };

  const switchHandler = (e, url) => {
    let list = images;
    let target = list.indexOf(list.find(img => img.url === url));
    list[target] = { ...list[target], color: e.target.checked };

    setImages(list);
    setRender(render + 1);
  };

  const removeImage = (e, id) => {
    let exists = originalList.find(img => img._id === id);

    if (exists)
      deleteImage({ imgId: id, collection: type, subCollection: subType });

    let list = images;
    let target = list.indexOf(list.find(img => img._id === id));
    list.splice(target, 1);
  };

  const renderThumbnail = useCallback(
    (img, i) => (
      <ImageUploaderThumbnail
        key={i}
        type={type}
        img={img}
        index={i}
        moveThumbnail={moveThumbnail}
        images={images}
        inputHandler={inputHandler}
        switchHandler={switchHandler}
        removeImage={removeImage}
      />
    ),
    [images, inputHandler, switchHandler]
  );

  return (
    <Grid.Col xs={12} className='p-0'>
      <Card.Base className='mb-5'>
        {label && <Form.Label group>{label}</Form.Label>}
        {statusMessage ? (
          <Alert alert={statusMessage} />
        ) : (
          <div
            {...getRootProps({ className: 'dropzone' })}
            className='flex justify-center p-5 cursor-pointer bg-gray-150 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out'
          >
            {!loading ? (
              <>
                <Form.Input {...getInputProps()} />
                <div className='upload-square p-3 flex items-center justify-center'>
                  <div className='upload-square-content flex flex-col items-center'>
                    <IoIosCloudUpload size={'3.5em'} />
                    <h5>Drag and Drop images here</h5>
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </div>
        )}
        {images.length > 0 && (
          <Card.Body className='flex justify-center flex-wrap preview-imgs'>
            <DndProvider backend={HTML5Backend}>
              {images && images.map((img, i) => renderThumbnail(img, i))}
            </DndProvider>
          </Card.Body>
        )}
      </Card.Base>
    </Grid.Col>
  );
};

export default ImageUploader;
