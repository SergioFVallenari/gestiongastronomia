import React from 'react';
import Icon from './elements/Icon.tsx';
import { Dropdown } from 'react-bootstrap';
import DropdownMenu from './DropdownMenu.tsx';
import { SvgIconComponent } from '@mui/icons-material';

interface IDostMenu {
  dots: string;
  dropdown: {
    icon: SvgIconComponent;
    text: string;
    path: string; // Asegúrate de que 'path' esté presente
  }[];
  onClick: (path: string) => void;
}

const DotsMenu: React.FC<IDostMenu> = ({ dots, dropdown, onClick }) => {
  return (
    <Dropdown bsPrefix='mc-dropdown'>
      <Dropdown.Toggle bsPrefix='mc-dropdown-toggle'>
        <Icon type={dots} />
      </Dropdown.Toggle>
      <DropdownMenu className='mc-dropdown-paper' dropdown={dropdown} onClick={onClick} />
    </Dropdown>
  );
};

export default DotsMenu;
