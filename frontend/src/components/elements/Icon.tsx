import React from 'react';

interface IIcon {
  as?: keyof JSX.IntrinsicElements | React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  type?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEvent<HTMLDivElement>;
}

const Icon: React.FC<IIcon> = ({ as, className, style, type, children, onClick }) => {
  const Component = as || 'i';
  return (
    <Component onClick={onClick} style={style} className={className ? className : 'material-icons'}>
      {type || children}
    </Component>
  );
};

export default Icon;
