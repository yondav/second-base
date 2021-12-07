import styled from 'styled-components';
// import tw from 'tailwind.macro';

export const AppWrapper = styled.div.attrs({
  className: 'absolute bottom-0 w-full bg-gray-100 p-2 text-gray-800',
})`
  & a {
    transition: 300ms all ease-in-out;
  }
`;

export const Grid = styled.div.attrs({
  className: 'p-4 grid grid-cols-12 gap-8',
})``;

export const Column = ({ sm, md, lg, children }) => {
  const renderClasses = () => {
    let classes = ['py-0', 'px-4'];
    if (!sm && !md && !lg) classes.push('col-span-12');
    if (sm) classes.push(`col-span-${sm}`);
    if (md) classes.push(`md:col-span-${md}`);
    if (lg) classes.push(`lg:col-span-${lg}`);

    return classes.join(' ');
  };

  return <div className={renderClasses()}>{children}</div>;
};
