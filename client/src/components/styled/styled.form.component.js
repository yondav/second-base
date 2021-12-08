import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Group = styled.div.attrs({
  className: 'mb-8',
})`
  ${props =>
    props.check && tw`mb-8 flex flex-row-reverse justify-end items-center`}
`;

export const Label = styled.label`
  ${props => props.group && tw`mb-3`}
`;

export const Input = styled.input.attrs({
  className:
    'p-3 block w-full text-gray-800 bg-gray-100 rounded-lg focus:shadow-lg',
})`
  transition: 300ms all ease-in-out;

  &:focus-visible {
    outline: none;
  }
`;

export const Check = styled.input.attrs({
  type: 'checkbox',
  className: 'mb-0 mr-3',
})`
  &:focus-visible {
    outline: none;
  }
`;

export const Button = styled.button.attrs({
  className:
    'cursor-pointer text-gray-800 border border-gray-800 px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white hover:shadow-lg focus:bg-gray-800 focus:text-white focus:shadow-lg',
})`
  transition: 300ms all ease-in-out;

  &:focus-visible {
    outline: none;
  }
`;
