import React from 'react';

interface IItem {
  className: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLLIElement>;
}

const Item: React.FC<IItem> = ({ className, children, onClick }) => {
  return (
    <li className={className} onClick={onClick}>
      {children}
    </li>
  );
};

export default Item;
