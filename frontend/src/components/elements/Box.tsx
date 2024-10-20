import React from 'react';

interface IBox {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hidden?: boolean | string;
}

const Box: React.FC<IBox> = ({ onClick, as, children, className, style, hidden = false }) => {
  const Component = as || 'div';
  return (
    <Component hidden={Boolean(hidden)} style={{ ...style }} className={className} onClick={onClick}>
      {' '}
      {children}
    </Component>
  );
};

export default Box;
