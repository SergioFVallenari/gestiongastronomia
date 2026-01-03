import React from 'react';
import MenuItem from './MenuItem';
import { List, Menu, Heading } from '../elements';

interface IMultipleMenu {
  data: {
    title: string;
    menu: {
      href: string;
      icon: string;
      text: string;
      hide?: boolean;
      submenu?: {
        href: string;
        text: string;
      }[];
    }[];
  }[];
}

const MultipleMenu: React.FC<IMultipleMenu> = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <Menu key={index} className='mc-sidebar-menu'>
          <Heading as='h5' className='mc-sidebar-menu-title'>
            {item.title}
          </Heading>
          <List className='mc-sidebar-menu-list'>
            {item.menu.map((menuItem, idx) => (
              <MenuItem key={idx} item={menuItem} />
            ))}
          </List>
        </Menu>
      ))}
    </>
  );
};

export default MultipleMenu;
