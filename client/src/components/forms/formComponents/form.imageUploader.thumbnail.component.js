import React, { useRef, useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { VscChromeClose } from 'react-icons/vsc';
import { GlobalContext } from '../../../context/context.data';

const ImageUploaderThumbnail = ({
  type,
  index,
  moveThumbnail,
  images,
  img: { _id, url },
}) => {
  const { deleteImage } = useContext(GlobalContext);
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
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

  return (
    <>
      {images.length > 0 && (
        <div
          ref={ref}
          style={{ opacity }}
          data-handler-id={handlerId}
          className='d-flex flex-column justify-content-center align-items-center m-2'
        >
          <div
            className='thumbnail-overlay d-flex justify-content-center align-items-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ opacity: hovered && 0.7 }}
          >
            <VscChromeClose
              className='pointer thumbnail-delete'
              size='2em'
              onClick={() => deleteImage(_id, type)}
            />
          </div>
          <img src={url} alt={url} />
          {/* {imageForm && <div>IMAGE FORM</div>} */}
        </div>
      )}
    </>
  );
};

export default ImageUploaderThumbnail;
