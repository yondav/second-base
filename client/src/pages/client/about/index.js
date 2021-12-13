import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../../context/context.data';
import Slider from '../../../components/slider';

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
          <Slider images={images} />
        </div>
      )}
    </>
  );
};

export default About;
