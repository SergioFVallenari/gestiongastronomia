import React from 'react';

interface IMenu {
  children: React.ReactNode;
  className: string;
}

const Menu: React.FC<IMenu> = ({ children, className }) => {
  return <menu className={className}>{children}</menu>;
};

export default Menu;
