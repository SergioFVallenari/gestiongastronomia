import React from 'react';

interface IHeading {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<IHeading> = ({ as, children, className }) => {
  const Component = as || 'h4';
  return <Component className={className}>{children}</Component>;
};

export default Heading;
