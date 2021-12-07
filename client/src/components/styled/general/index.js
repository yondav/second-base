import styled from 'styled-components';
import tw from 'tailwind.macro';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
// import { Accordion } from 'react-bootstrap';

export const Card = styled.div.attrs({
  className: `relative flex flex-col bg-white m-auto py-10 container rounded-md w-full overflow-hidden`,
})`
  ${props => props.login && tw`sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4`}
  ${props =>
    props.login &&
    `top: 50%;
    transform: translateY(-50%);`}
  
  & header {
    ${tw`bg-gray-200 absolute top-0 w-full p-5`}

    & h1 {
      ${tw`text-2xl`}
    }
  }

  & .card-body {
    ${tw`p-4 pt-8 overflow-scroll`}
  }
`;

export const CardBody = ({ children }) => (
  <div className='card-body'>{children}</div>
);

export const CardHeader = ({ children }) => <header>{children}</header>;

export const ImgContainer = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
`;

export const Accordion = styled.section.attrs({
  className: 'w-full flex flex-col justify-start items-center',
})`
  & .accordion-section {
    ${tw`w-full p-4 flex flex-col`}

    & button {
      ${tw`p-4 text-xl flex justify-between items-center rounded-md hover:bg-gray-100 hover:shadow-lg focus:outline-none`}
      transition: 300ms all ease-in-out;

      &:focus-visible {
        outline: none;
      }
    }
  }
`;

const AccordionButton = ({ title, setActive, active }) => (
  <button onClick={() => (!active ? setActive(true) : setActive(false))}>
    <span>{title}</span>
    <IoIosArrowDown
      style={{
        transform: active && 'rotate(180deg)',
        transition: '300ms all ease-in-out',
      }}
    />
  </button>
);

export const AccordionSection = ({ title, setActive, active, children }) => (
  <article className='accordion-section'>
    <AccordionButton title={title} active={active} setActive={setActive} />
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </article>
);
