import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../../context/context.data';
import Carousel from '../../../components/carousel';

const About = () => {
  const [loaded, setLoaded] = useState(false);
  const {
    state: {
      data: {
        user: { images },
      },
    },
  } = useContext(DataContext);

  useEffect(() => images && setLoaded(true), [images]);
  return (
    <>
      {loaded && (
        <div className='w-1/2'>
          <Carousel images={images} />
        </div>
      )}
    </>
  );
};

export default About;
