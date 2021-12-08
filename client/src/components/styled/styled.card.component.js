import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Base = styled.div.attrs({
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

export const Header = ({ children }) => <header>{children}</header>;

export const Body = ({ children }) => (
  <div className='card-body'>{children}</div>
);
