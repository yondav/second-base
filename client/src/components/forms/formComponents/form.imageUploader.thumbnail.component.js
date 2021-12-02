import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useDrag, useDrop } from 'react-dnd';
import {
  VscChromeClose,
  RiEditBoxLine,
  IoIosArrowRoundBack,
} from 'react-icons/all';
import { FormCheck } from '../../styled/form';
import { Input } from '.';

const ImageUploaderThumbnail = ({
  type,
  index,
  moveThumbnail,
  images,
  inputHandler,
  switchHandler,
  removeImage,
  img: { _id, url, color, photo_credit },
}) => {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [edit, setEdit] = useState(false);
  const [opacityState, setOpacityState] = useState(0);
  const [{ handlerId }, drop] = useDrop({
    accept: 'thumbnail',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveThumbnail(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'thumbnail',
    item: () => {
      return { _id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  useEffect(() => {
    if (edit) setOpacityState(1);
    if (hovered && !edit) setOpacityState(0.7);
    if (!hovered && !edit) setOpacityState(0);
  }, [hovered, edit]);

  return (
    <>
      {images.length > 0 && (
        <div
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
          className='d-flex flex-column justify-content-center align-items-center m-2'
        >
          <img
            src={url}
            alt={url}
            style={{ filter: !color && 'saturate(0)' }}
          />
          <div
            className='thumbnail-overlay d-flex justify-content-center align-items-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ opacity: opacityState, padding: edit && '.75rem' }}
          >
            {edit ? (
              <div className='image-form-overlay d-flex flex-column justify-content-center w-100 h-100'>
                <div className='back-container d-flex justify-content-end align-items-center h-25'>
                  <IoIosArrowRoundBack
                    size='2em'
                    className='pointer back-icon mx-2'
                    onClick={() => setEdit(false)}
                  />
                </div>
                <div
                  className='photo-form h-75 d-flex flex-column justify-content-around'
                  style={{ width: 'auto' }}
                >
                  <div
                    className='mb-3 d-flex justify-content-between align-items-start'
                    style={{ height: 'fit-content', width: '40%' }}
                  >
                    <Form.Label>{color ? 'Color' : 'B&W'}</Form.Label>
                    <FormCheck
                      type='switch'
                      id='custom-switch'
                      defaultChecked={color}
                      onClick={e => {
                        switchHandler(e, url);
                        console.log(color);
                      }}
                    />
                  </div>
                  <Input
                    // style={{ height: 'fit-content' }}
                    type='text'
                    name='photo_credit'
                    label='Photographer'
                    value={photo_credit}
                    changehandler={e => inputHandler(e, _id)}
                  />
                </div>
              </div>
            ) : (
              <>
                <VscChromeClose
                  className='pointer thumbnail-delete'
                  size='2em'
                  onClick={e => removeImage(e, _id)}
                />
                <RiEditBoxLine
                  size='2em'
                  className='pointer edit-icon'
                  onClick={() => setEdit(true)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploaderThumbnail;
