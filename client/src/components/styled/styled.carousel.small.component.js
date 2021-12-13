import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Container = ({ children }) => (
  <div className='flex flex-col pb-5 bg-gray-900 rounded-lg'>
    <div>{children}</div>
  </div>
);

export const ImgContainer = styled.div.attrs({
  className: 'overflow-hidden w-full rounded-lg relative',
})`
  &:before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  & div {
    ${tw`h-full absolute top-0 left-0 flex justify-center items-center`}
  }
`;
