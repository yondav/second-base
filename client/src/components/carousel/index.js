import React, { useState } from 'react';
import Swipe from 'react-easy-swipe';

import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ImgContainer } from '../styled';
import { fade } from '../../utils/framer';

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const prevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className='flex flex-col pb-5 bg-gray-900 rounded-lg'>
      <div>
        <ImgContainer square>
          <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
            <AnimatePresence>
              {images.map(
                (img, i) =>
                  i === currentSlide && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{
                        ...fade.visible(1),
                        transition: { ...fade.transition(0.15), delay: 0.1 },
                      }}
                      exit={{
                        ...fade.hidden,
                        transition: fade.transition(0.15),
                      }}
                      src={img.url}
                      alt={img.sequence}
                      key={i}
                      className=''
                    />
                  )
              )}
            </AnimatePresence>
          </Swipe>
        </ImgContainer>
      </div>
      <div className='w-full flex justify-center items-center'>
        <AiOutlineLeft
          onClick={prevSlide}
          size='1.5em'
          className='cursor-pointer hover:text-gray-50 transition-all duration-300 ease-in-out'
        />
        <AiOutlineRight
          onClick={nextSlide}
          size='1.5em'
          className='cursor-pointer hover:text-gray-50 transition-all duration-300 ease-in-out'
        />
      </div>
    </div>
  );
};

export default Carousel;
