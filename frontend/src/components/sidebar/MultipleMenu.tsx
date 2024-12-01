import React from 'react';
import MenuItem from './MenuItem';
import { List, Menu, Heading } from '../elements';
// const { REACT_APP_TEXTO } = process.env;

interface IMultipleMenu {
  data: {
    title: string;
    menu: {
      href: string;
      icon: string;
      text: string;
      hide?: boolean;
    }[];
  }[];
}

const MultipleMenu: React.FC<IMultipleMenu> = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <Menu key={index} className='mc-sidebar-menu'>
          {/* <span className='position-absolute end-0 translate-middle badge rounded-pill bg-secondary'>Hola</span> */}
          {/* <h4 className='d-flex justify-content-center aling-items-center'>Panel de control</h4> */}
          <Heading as='h5' className='mc-sidebar-menu-title'>
            {item.title}
          </Heading>
          <List className='mc-sidebar-menu-list'>
            {item.menu.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
          </List>
        </Menu>
      ))}
    </>
  );
};

export default MultipleMenu;
