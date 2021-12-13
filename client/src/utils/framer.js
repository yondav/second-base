// svg draw path animation - alert and loading
export const drawPath = repeat => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: repeat ? 0 : 1,
        type: 'spring',
        duration: repeat ? 3 : 1.5,
        bounce: 0,
        repeat: repeat && Infinity,
      },
      opacity: {
        delay: repeat ? 0 : 1,
        duration: 0.01,
        repeat: repeat && Infinity,
      },
    },
  },
});

// swivel animation - alert and expanded nav
export const swivelCard = {
  hidden: { opacity: 0, rotateY: -180 },
  visible: { opacity: 1, rotateY: 0 },
  transition: duration => ({ duration, ease: 'easeInOut' }),
};

// fade animation - modal overlay, accordian section
export const fade = {
  hidden: { opacity: 0 },
  visible: opacity => ({ opacity }),
  transition: duration => ({ duration, ease: 'easeInOut' }),
};

// grow from 0 height to element height - modal, accordian section
export const growHeight = {
  hidden: { height: 0 },
  visible: { height: 'auto' },
  transition: duration => ({ duration, ease: 'easeInOut' }),
};

// slider for carousel
export const carouselSlide = direction => {
  let hidden = x => ({ opacity: 0, x });
  let exit = x => ({
    oopacity: 1,
    x,
    transition: { duration: 0.4, ease: 'easeInOut' },
  });
  let animate = {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: 0.35, ease: 'easeInOut' },
  };

  return direction === 'next'
    ? { hidden: hidden('30%'), animate, exit: exit('-150%') }
    : { hidden: hidden('-30%'), animate, exit: exit('150%') };
};
