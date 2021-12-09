import styled from 'styled-components';
// import tw from 'tailwind.macro';

export const Container = styled.div.attrs({
  className: 'p-4 grid grid-cols-12',
})``;

export const Col = ({ sm, md, lg, children }) => {
  const renderClasses = () => {
    let classes = ['py-3', 'px-4', 'col-span-12'];
    if (sm) classes.push(`col-span-${sm}`);
    if (md) classes.push(`md:col-span-${md}`);
    if (lg) classes.push(`lg:col-span-${lg}`);

    return classes.join(' ');
  };

  return <div className={renderClasses()}>{children}</div>;
};
