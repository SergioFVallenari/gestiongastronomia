import React from 'react';

interface IDivideTitle {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  className: string;
  title: string;
  children?: React.ReactNode;
}

const DivideTitle: React.FC<IDivideTitle> = ({ as, className, title, children }) => {
  const Component = as || 'h6';
  return <Component className={`mc-divide-title ${className ? className : ''}`}>{title || children || 'divide title'}</Component>;
};

export default DivideTitle;
