import React from 'react';

const NavCollapse = ({ navExpand, setNavExpand }) => {
  const animation = (translate, rotate) => ({
    transform: `${
      navExpand ? `translatex(3.5px)` : `translatey(${translate})`
    } rotate(${navExpand ? rotate : '0'})`,
    transition: '300ms all ease-in-out',
  });
  const clickHandler = e => {
    !navExpand ? setNavExpand(true) : setNavExpand(false);
  };

  return (
    <div
      className='relative z-10 flex items-center justify-center w-8 h-8'
      aria-controls='basic-navbar-nav'
      onClick={clickHandler}
    >
      <div className='h-full w-full cursor-pointer'>
        <div
          className={`absolute block w-full h-px top-0 left-0 bottom-0 m-auto bg-gray-200 ${
            navExpand && 'bg-gray-900'
          }`}
          style={animation('-5.5px', '-135deg')}
        />
        <div
          className={`absolute block w-full h-px top-0 left-0 bottom-0 m-auto bg-gray-200 transition-all ${
            navExpand && 'bg-gray-900'
          }`}
          style={animation('5.5px', '135deg')}
        />
      </div>
    </div>
  );
};

export default NavCollapse;
