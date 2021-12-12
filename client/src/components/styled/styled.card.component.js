import styled from 'styled-components';
import tw from 'tailwind.macro';
import { motion } from 'framer-motion';

export const Base = styled(motion.div).attrs({
  className: `relative flex flex-col bg-gray-50 m-auto py-10 container rounded-md w-full overflow-hidden`,
})`
  ${props => props.login && tw`sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4`}
  ${props =>
    props.login &&
    `top: 50%;
    transform: translateY(-50%);`}

  ${props =>
    props.modal &&
    tw`w-full md:w-11/12 lg:w-3/4 mx-auto rounded-lg shadow-lg z-50 overflow-y-auto`}
  
  ${props =>
    props.dialogue &&
    tw`w-full sm:w-4/5 md:w-2/3 lg:w-1/2 p-3 shadow-lg rounded-lg md:ml-24 focus:border focus:border-gray-150`}
  
  ${props =>
    props.img &&
    `& .card-body {
    ${tw`flex justify-center flex-wrap`}
  }`}

  & header {
    ${tw`bg-gray-100 absolute top-0 w-full p-5 border-b border-gray-250`}

    & h1 {
      ${tw`text-2xl`}
    }
  }

  & .card-body {
    ${tw`p-4 pt-8 overflow-scroll`}
  }
`;

export const Header = ({ children }) => (
  <header className='flex justify-between items-center'>{children}</header>
);

export const Body = ({ children }) => (
  <div className='card-body'>{children}</div>
);
