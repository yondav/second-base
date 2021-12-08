import styled from 'styled-components';
// import tw from 'tailwind.macro';

export const AppWrapper = styled.div.attrs({
  className: 'absolute bottom-0 w-full bg-gray-100 p-2 text-gray-800',
})`
  & a {
    transition: 300ms all ease-in-out;
  }
`;

export const ImgContainer = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
`;

// export const Accordion = styled.section.attrs({
//   className: 'w-full flex flex-col justify-start items-center',
// })`
//   & .accordion-section {
//     ${tw`w-full p-4 flex flex-col`}

//     & button {
//       ${tw`p-4 text-xl flex justify-between items-center rounded-md hover:bg-gray-100 hover:shadow-lg focus:outline-none`}
//       transition: 300ms all ease-in-out;

//       &:focus-visible {
//         outline: none;
//       }
//     }
//   }
// `;

// const AccordionButton = ({ title, setActive, active }) => (
//   <button onClick={() => (!active ? setActive(true) : setActive(false))}>
//     <span>{title}</span>
//     <IoIosArrowDown
//       style={{
//         transform: active && 'rotate(180deg)',
//         transition: '300ms all ease-in-out',
//       }}
//     />
//   </button>
// );

// export const AccordionSection = ({ title, setActive, active, children }) => (
//   <article className='accordion-section'>
//     <AccordionButton title={title} active={active} setActive={setActive} />
//     <AnimatePresence>
//       {active && (
//         <motion.div
//           initial={{ height: 0, opacity: 0 }}
//           animate={{ height: 'auto', opacity: 1 }}
//           exit={{ height: 0 }}
//           transition={{ duration: 0.3, delay: 0.1, ease: 'easeInOut' }}
//         >
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   </article>
// );
