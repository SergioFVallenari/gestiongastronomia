import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { DuelText, RoundAvatar } from '..';
import { Anchor } from '../elements';

interface IProfileDropdown {
  name: string;
  username: string;
  image: string;
  dropdown: IDropdown[];
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

import { SvgIconComponent } from '@mui/icons-material';

interface IDropdown {
  icon: SvgIconComponent;
  text: string;
  path: string;
}

const ProfileDropdown: React.FC<IProfileDropdown> = ({ name, username, image, dropdown, onClick }) => {
  return (
    <Dropdown className='mc-header-user'>
      <Dropdown.Toggle className='mc-dropdown-toggle'>
        <RoundAvatar src={image} alt='avatar' size='xs' />
        <DuelText title={name} descrip={username} size='xs' />
      </Dropdown.Toggle>
      <Dropdown.Menu align='end' className='mc-dropdown-paper'>
        {dropdown.map((item, index) => (
          <Anchor key={index} icon={item.icon} text={item.text} href={item.path} onClick={item.path === '/' ? onClick : () => {}} className={item.text === 'lock' ? 'mc-dropdown-menu red' : 'mc-dropdown-menu'} />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
