import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { Card } from '../styled';
import { fade, growHeight } from '../../utils/framer';

const Modal = ({ children, handleClose }) => {
  return (
    <article className='modal fixed w-full h-full top-0 left-0 flex items-center justify-center overflow-y-scroll'>
      <motion.div
        initial={fade.hidden}
        animate={fade.visible(0.4)}
        exit={fade.hidden}
        transition={fade.transition(0.5)}
        className='modal-overlay fixed w-full h-full bg-gray-900'
        onClick={handleClose}
      />
      <Card.Base
        modal
        initial={growHeight.hidden}
        animate={growHeight.visible}
        exit={growHeight.hidden}
        transition={growHeight.transition(0.5)}
        className='modal-container'
      >
        <Card.Header>
          <div
            className='flex justify-end w-full cursor-pointer z-50'
            onClick={handleClose}
          >
            <AiOutlineClose size='1.2em' />
          </div>
        </Card.Header>
        <Card.Body>{children}</Card.Body>
      </Card.Base>
    </article>
  );
};

export default Modal;
