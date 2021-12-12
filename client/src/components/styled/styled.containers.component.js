import styled from 'styled-components';
import tw from 'tailwind.macro';

export const AppWrapper = styled.div.attrs({
  className:
    'absolute bottom-0 w-full bg-gray-100 p-2 text-gray-800 font-primary font-light',
})`
  & a {
    transition: 300ms all ease-in-out;
  }
`;

export const PortalItem = {
  Wrapper: styled.div.attrs({
    className: 'relative flex justify-center rounded-lg overflow-hidden',
  })``,

  Overlay: styled.div.attrs({
    className:
      'absolute top-0 right-0 w-full h-full opacity-25 hover:bg-gray-600',
  })`
    transition: 300ms all ease-in-out;
  `,
};

export const ImgContainer = styled.div.attrs({
  className: 'overflow-hidden w-full rounded-lg',
})`
  ${props => props.square && tw`relative`}
  ${props =>
    props.square &&
    `
&:before {
  content: '';
  display: block;
  padding-top: 100%;
}

& img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: 300ms all ease-in-out;
}`}

${props => props.circle && tw`rounded-full`}
`;
