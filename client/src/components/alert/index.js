import React from 'react';
import { motion } from 'framer-motion';
import { drawPath, swivelCard } from '../../utils/framer';

const Alert = ({ alert: { variant, message } }) => {
  const renderIcon = () => {
    return (
      <div
        className={`mx-auto mb-3 flex items-center justify-center h-1/2 w-1/2 rounded-full p-4 ${
          variant === 'success' ? 'bg-green-100' : 'bg-red-100'
        }`}
      >
        <svg
          className={`h-full w-full ${
            variant === 'success' ? 'text-green-600' : 'text-red-600'
          }`}
          fill='none'
          stroke='currentColor'
          viewBox='0 0 1024 1024'
          xmlns='http://www.w3.org/2000/svg'
        >
          <motion.path
            initial={drawPath().hidden}
            animate={drawPath().visible}
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='10'
            d={
              variant === 'success'
                ? 'M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z'
                : 'M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z'
            }
          ></motion.path>
        </svg>
      </div>
    );
  };

  return (
    <motion.div
      className='mx-auto w-full rounded-md bg-gray-50'
      initial={swivelCard.hidden}
      animate={swivelCard.visible}
      transition={swivelCard.transition(0.5)}
    >
      <div className='text-center'>
        {renderIcon()}
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          {message}
        </h3>
      </div>
    </motion.div>
  );
};

export default Alert;
