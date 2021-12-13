import React, { useState } from 'react';
import Swipe from 'react-easy-swipe';

import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Carousel } from '../styled';
import { carouselSlide } from '../../utils/framer';

const Slider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transition, setTransition] = useState();

  const nextSlide = () => {
    setTransition('next');
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const prevSlide = () => {
    setTransition('prev');
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <Carousel.Container>
      <Carousel.ImgContainer>
        <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
          <AnimatePresence>
            {images.map(
              (img, i) =>
                i === currentSlide && (
                  <motion.img
                    initial={carouselSlide(transition).hidden}
                    animate={carouselSlide(transition).animate}
                    exit={carouselSlide(transition).exit}
                    src={img.url}
                    alt={img.sequence}
                    key={i}
                    className=''
                  />
                )
            )}
          </AnimatePresence>
        </Swipe>
      </Carousel.ImgContainer>
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
    </Carousel.Container>
  );
};

export default Slider;
