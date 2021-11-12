import React from 'react';

const NavCollapse = ({ navExpand, setNavExpand }) => {
  const clickHandler = e => {
    const top = document.querySelector('.top-bun');
    const bottom = document.querySelector('.bottom-bun');

    !top.classList.contains('top-bun-active')
      ? top.classList.add('top-bun-active')
      : top.classList.remove('top-bun-active');

    !bottom.classList.contains('bottom-bun-active')
      ? bottom.classList.add('bottom-bun-active')
      : bottom.classList.remove('bottom-bun-active');

    !navExpand ? setNavExpand(true) : setNavExpand(false);
  };

  return (
    <div
      className='burger-container'
      aria-controls='basic-navbar-nav'
      onClick={clickHandler}
    >
      <div className='burger-inner'>
        <div className='top-bun' />
        <div className='bottom-bun' />
      </div>
    </div>
  );
};

export default NavCollapse;
