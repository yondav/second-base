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

    setTimeout(
      () => (!navExpand ? setNavExpand(true) : setNavExpand(false)),
      100
    );
  };

  return (
    <div
      className='burger-container'
      aria-controls='basic-navbar-nav'
      onClick={clickHandler}
    >
      <div className='burger-inner'>
        <div
          className='top-bun'
          style={{ backgroundColor: navExpand && 'var(--primary-black)' }}
        />
        <div
          className='bottom-bun'
          style={{ backgroundColor: navExpand && 'var(--primary-black)' }}
        />
      </div>
    </div>
  );
};

export default NavCollapse;
