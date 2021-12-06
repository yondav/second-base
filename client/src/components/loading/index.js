import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
  return (
    <div
      style={{ height: '100vh', width: '100vw' }}
      className='w-100 d-flex justify-content-center align-items-center'
    >
      <Spinner animation='border' />
    </div>
  );
};

export default Loading;
