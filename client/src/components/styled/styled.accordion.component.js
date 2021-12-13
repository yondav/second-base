import styled from 'styled-components';
import tw from 'tailwind.macro';
import { IoIosArrowDown } from 'react-icons/io';
import { AnimatePresence, motion } from 'framer-motion';
import { fade, growHeight } from '../../utils/framer';

export const Base = styled.section.attrs({
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

const Button = ({ title, setActive, active }) => (
  <button onClick={() => setActive(!active)}>
    <span>{title}</span>
    <IoIosArrowDown
      style={{
        transform: active && 'rotate(180deg)',
        transition: '300ms all ease-in-out',
      }}
    />
  </button>
);

export const Section = ({ title, setActive, active, children }) => (
  <article className='accordion-section'>
    <Button title={title} active={active} setActive={setActive} />

    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ ...fade.hidden, ...growHeight.hidden }}
          animate={{ ...fade.visible(1), ...growHeight.visible }}
          exit={{ ...fade.hidden, ...growHeight.hidden }}
          transition={{ ...fade.transition(0.3), delay: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </article>
);
