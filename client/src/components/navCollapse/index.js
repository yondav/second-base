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
      className='nav-collapse'
      aria-controls='basic-navbar-nav'
      onClick={clickHandler}
    >
      <div className='h-full w-full cursor-pointer'>
        <div
          className={`top-bun ${navExpand ? 'bg-gray-900' : 'bg-gray-300'}`}
          style={animation('-5.5px', '-135deg')}
        />
        <div
          className={`bottom-bun ${navExpand ? 'bg-gray-900' : 'bg-gray-300'}`}
          style={animation('5.5px', '135deg')}
        />
      </div>
    </div>
  );
};

export default NavCollapse;
