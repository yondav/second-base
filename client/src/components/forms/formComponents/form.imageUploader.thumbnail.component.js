import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { VscChromeClose } from 'react-icons/vsc';

const ImageUploaderThumbnail = ({
  index,
  id,
  url,
  moveThumbnail,
  images,
  setImages,
}) => {
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
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const removeThumbnail = () => {
    let list = [...images];
    let targetImg = list.indexOf(list.find(img => img.asset_id === id));

    if (index > -1) {
      list.splice(targetImg, 1);
    }

    setImages(list);
  };

  return (
    <div
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className='d-flex justify-content-center m-2'
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
          onClick={removeThumbnail}
        />
      </div>
      <img src={url} alt={url} />
    </div>
  );
};

export default ImageUploaderThumbnail;
