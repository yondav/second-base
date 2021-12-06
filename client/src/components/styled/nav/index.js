import styled from 'styled-components';
import tw from 'tailwind.macro';

export const NavBar = styled.nav.attrs({
  className: 'flex justify-between items-center	py-6 px-8 bg-gray-900',
})`
  & .dt-links {
    ${tw`flex justify-around items-center`}

    & a {
      ${tw`text-sm font-normal no-underline text-gray-300 whitespace-no-wrap hover:text-white`}
      transition: 300ms all ease-in-out;
    }
  }

  & .exp-links {
    ${tw` absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-white`}

    & a {
      ${tw`text-4xl text-gray-800 hover:text-black my-5`}
      transition: 300ms all ease-in-out;
    }
  }
`;
