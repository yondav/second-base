import styled from 'styled-components';
import tw from 'tailwind.macro';

export const Group = styled.div.attrs({
  className: 'mb-8',
})`
  ${props =>
    props.check && tw`mb-8 flex flex-row-reverse justify-end items-center`}
`;

export const Label = styled.label`
  ${props => props.group && tw`inline-block mb-5`}
`;

export const Input = styled.input.attrs({
  className:
    'p-3 block w-full text-gray-800 bg-gray-150 rounded-lg focus:shadow-lg transition-all duration-300 ease-in-out',
})`
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

export const RichText = {
  Toolbar: styled.div.attrs({
    className: 'p-3 bg-gray-150 border-gray-150 flex',
  })``,

  Button: styled.button.attrs({
    className:
      'm-0.5 h-8 w-8 border rounded hover:border-0 hover:outline-none hover:shadow-lg focus:border-0 focus:outline-none focus:shadow-lg transition-all duration-300 ease-in-out',
  })`
    &:focus-visible {
      border: none;
      outline: none;
      box-shadow: var(--shadow);
    }
  `,
};

export const Button = styled.button.attrs({
  className:
    'cursor-pointer text-gray-850 border border-gray-850 px-3 py-2 rounded-md hover:bg-gray-850 hover:text-gray-50 hover:shadow-lg focus:bg-gray-850 focus:text-gray-50 focus:shadow-lg transition-all duration-300 ease-in-out',
})`
  ${props => props.cancel && tw`text-red-800 border-red-800 hover:bg-red-800`}

  ${props =>
    props.submit &&
    tw`text-green-800 border-green-800 shadow-lg hover:bg-green-800`}

  &:focus-visible {
    outline: none;
  }
`;
