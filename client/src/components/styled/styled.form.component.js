import styled from 'styled-components';
import tw from 'tailwind.macro';
import { IoIosCloudUpload } from 'react-icons/io';

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
  font-weight: normal;

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

export const RichText = styled.div.attrs({
  className: '',
})`
  & .jodit-container {
    --bg-opacity: 1;
    background-color: #f5f5f4;
    background-color: rgba(245, 245, 244, var(--bg-opacity));
    border: none !important;
    border-radius: 0.5rem !important;
    transition: 300ms all ease-in-out;

    &:focus-within {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    & .jodit-toolbar__box:not(:empty) {
      --bg-opacity: 1;
      background-color: #f2f2f0;
      background-color: rgba(242, 242, 240, var(--bg-opacity));
      border-radius: 0 !important;
      border-top-left-radius: 0.5rem !important;
      border-top-right-radius: 0.5rem !important;
      border: none !important;

      & button {
        border-radius: 0.5rem !important;
        transition: 300ms all ease-in-out;

        &:hover {
          --bg-opacity: 1;
          background-color: #e9e9e5;
          background-color: rgba(233, 233, 229, var(--bg-opacity));
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
            0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        &:active {
          --bg-opacity: 1;
          background-color: #f5f5f4;
          background-color: rgba(245, 245, 244, var(--bg-opacity));
        }
      }
      & .jodit-status-bar__item-right {
        opacity: 0 !important;
      }
    }
  }
`;

export const ImgUploader = {
  Icon: () => (
    <div className='relative w-40 h-40 border-dashed border-4 rounded-lg border-gray-50 p-3 flex items-center justify-center'>
      <div className='upload-square-content flex flex-col items-center'>
        <IoIosCloudUpload size={'3.5em'} />
        <h5>Drag and Drop images here</h5>
      </div>
    </div>
  ),

  Thumbnail: styled.div.attrs({
    className: 'relative overflow-hidden w-full cursor-move rounded-lg',
  })`
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }

    & img {
      ${tw`absolute hover:shadow-lg`}
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `,
};

export const Button = styled.button.attrs({
  className:
    'cursor-pointer text-gray-850 border border-gray-850 px-3 py-2 m-1 rounded-md hover:bg-gray-850 hover:text-gray-50 hover:shadow-lg focus:bg-gray-850 focus:text-gray-50 focus:shadow-lg transition-all duration-300 ease-in-out',
})`
  ${props => props.danger && tw`text-red-800 border-red-800 hover:bg-red-800`}

  ${props =>
    props.success &&
    tw`text-green-800 border-green-800 shadow-lg hover:bg-green-800`}

  &:focus-visible {
    outline: none;
  }
`;
