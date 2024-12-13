import React from 'react';
import { Anchor, Button } from './elements/index.ts';
import { Dropdown } from 'react-bootstrap';
import { SvgIconComponent } from '@mui/icons-material';

interface IDropdownMenu {
  dropdown: IDropdown[];
  onClick: any;
  className?: string; 
}

interface IDropdown {
  icon: SvgIconComponent;
  text: string;
  path: string;
}

const DropdownMenu: React.FC<IDropdownMenu> = ({ dropdown, onClick }) => {
  return (
    <Dropdown.Menu align='end' className='mc-dropdown-paper'>
      {dropdown.map((item, index) => (item.path ? <Anchor key={index} href={item.path} icon={item.icon} text={item.text} onClick={onClick} className='mc-dropdown-menu' /> : <Button key={index} icon={''} text={item.text} onClick={onClick} className='mc-dropdown-menu' />))}
    </Dropdown.Menu>
  );
};

export default DropdownMenu;
