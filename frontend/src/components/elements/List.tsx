import React from 'react';

interface IList {
  children?: React.ReactNode;
  className: string;
  style?: React.CSSProperties;
}

const List: React.FC<IList> = ({ children, className, style }): JSX.Element => {
  return (
    <ul className={className} style={style}>
      {children}
    </ul>
  );
};

export default List;
