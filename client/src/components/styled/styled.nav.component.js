import styled from 'styled-components';
import tw from 'tailwind.macro';
import { motion } from 'framer-motion';
import { swivelCard } from '../../utils/framer';

export const Bar = styled.nav.attrs({
  className:
    'absolute top-0 left-0 w-screen flex justify-between items-center	py-6 px-8 bg-gray-900 font-primary font-light',
})`
  & .dt-links {
    ${tw`flex justify-around items-center`}

    & a {
      ${tw`text-sm no-underline text-gray-300 whitespace-no-wrap hover:text-gray-100`}
      transition: 300ms all ease-in-out;
    }
  }

  & .exp-links {
    ${tw`absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-100 z-10`}

    & a {
      ${tw`text-4xl text-gray-800 hover:text-gray-950 my-5`}
      transition: 300ms all ease-in-out;
    }
  }

  & .nav-collapse {
    ${tw`relative z-20 flex items-center justify-center w-8 h-8`}

    & .top-bun {
      ${tw`absolute block w-full h-px top-0 left-0 bottom-0 m-auto`}
    }

    & .bottom-bun {
      ${tw`absolute block w-full h-px top-0 left-0 bottom-0 m-auto`}
    }
  }
`;

export const Collapse = ({ expand, setter, animation }) => (
  <div className='nav-collapse' onClick={setter}>
    <div className='h-full w-full cursor-pointer'>
      <div
        className={`top-bun ${expand ? 'bg-gray-900' : 'bg-gray-300'}`}
        style={animation('-5.5px', '-135deg')}
      />
      <div
        className={`bottom-bun ${expand ? 'bg-gray-900' : 'bg-gray-300'}`}
        style={animation('5.5px', '135deg')}
      />
    </div>
  </div>
);

export const Links = ({ stacked, children }) =>
  stacked ? (
    <motion.div
      initial={swivelCard.hidden}
      animate={swivelCard.visible}
      exit={swivelCard.hidden}
      transition={swivelCard.transition(1)}
      className='exp-links'
    >
      <div className='w-full relative flex flex-col items-center'>
        {children}
      </div>
    </motion.div>
  ) : (
    <div className='dt-links' style={{ flexBasis: '50%' }}>
      {children}
    </div>
  );
