import React from 'react';

interface IText {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
}

const Text: React.FC<IText> = ({ as, style, children, className }) => {
  const Component = as || 'p';
  return (
    <Component className={className} style={style}>
      {children}
    </Component>
  );
};
export default Text;
