import React, { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { VscChromeClose } from 'react-icons/vsc';

const ImageUploaderThumbnail = ({
  index,
  url,
  moveThumbnail,
  images,
  setImages,
  id,
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
    let list = images;
    // list.splice(list[index], 1);
    let targetImg = list.indexOf(
      list.find(img => {
        console.log('_id: ', img._id, 'id: ', id);
        return img._id === id;
      })
    );
    console.log('targetImg: ', targetImg);
    if (index > -1) {
      list.splice(targetImg, 1);
    }

    setImages(list);
  };

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
              onClick={removeThumbnail}
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
