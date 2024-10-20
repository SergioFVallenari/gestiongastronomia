import React from 'react';

interface ISection {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  children: React.ReactNode;
  className: string;
}

const Section: React.FC<ISection> = ({ as, children, className }) => {
  const Component = as || 'section';
  return <Component className={className}>{children}</Component>;
};

export default Section;
