import styled from 'styled-components';
// import tw from 'tailwind.macro';

export const H1 = styled.h1.attrs({
  className:
    'font-header font-extrabold tracking-tighter	text-5xl text-gray-900',
})``;

export const H2 = styled.h2.attrs({
  className:
    'font-header font-font-bold tracking-tighter text-4xl text-gray-900',
})``;

export const H3 = styled.h3.attrs({
  className: 'font-header font-semibold tracking-tighter	text-3xl text-gray-900',
})``;

export const H4 = styled.h4.attrs({
  className: 'font-header font-medium tracking-tighter text-4xl text-gray-900',
})``;

export const A = styled.a.attrs({
  className:
    'cursor-pointer underline italic text-blue-900 hover:text-blue-700 transition-all duration-300 ease-in-out',
})``;
