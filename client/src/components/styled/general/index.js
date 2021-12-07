import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Accordion } from 'react-bootstrap';

export const AppWrapper = styled.div.attrs({
  className: 'w-full h-screen bg-gray-100 p-2 text-gray-800',
})`
  & a {
    transition: 300ms all ease-in-out;
  }
`;

export const Card = styled.div.attrs({
  className: `relative flex flex-col bg-white m-auto py-10 container rounded-md w-full`,
})`
  ${props => props.login && tw`sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/4`}
  ${props =>
    props.login &&
    `top: 50%;
    transform: translateY(-50%);`}
  
  & .card-body {
    ${tw`p-4`}
  }
`;

export const CardBody = ({ children }) => (
  <div className='card-body'>{children}</div>
);

export const AccordionItem = styled(Accordion)`
  &:focus {
    border-color: transparent;
    outline: none;
  }

  &:focus-visible {
    border-color: transparent;
    outline: none;
  }
`;

export const AccordionHeader = styled(Accordion.Header)`
  .accordion-button {
    padding: 1rem 0.75rem;
    border-radius: var(--radius);

    &:focus {
      border-color: transparent;
      background-color: none;
      box-shadow: none;
      color: currentColor;
      box-shadow: var(--shadow);
      outline: none;
    }

    &:focus-visible {
      border-color: transparent;
      background-color: none;
      box-shadow: none;
      color: currentColor;
      box-shadow: var(--shadow);
      outline: none;
    }

    &:not(.collapsed) {
      color: currentColor;
      box-shadow: var(--shadow);
    }

    &:not(.collapsed)::after {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23212529'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
    }
  }
`;

export const Column = styled.div.attrs({
  className: 'auto-cols-auto py-0 px-4',
})``;

export const ImgContainer = styled.div`
  border-radius: var(--radius);
  overflow: hidden;
`;
