import React from 'react';
import { Box, Anchor } from '../elements';
import { Logout as LogoutIcon } from '@mui/icons-material';
// const { REACT_APP_FRONT_VERSION } = process.env;

import { SvgIconComponent } from '@mui/icons-material';

const iconMapping : { [key: string]: SvgIconComponent } = {
lock: LogoutIcon,
};

interface ILogout {
  data: {
    icon: string;
    path: string;
    text: string;
  };
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  href: string;
}

const Logout: React.FC<ILogout> = ({ data, onClick, href }) => {
  const Icon = iconMapping[data.icon];
  return (
    <>
      <Box className='mc-sidebar-logout text-center'>
        <Anchor onClick={onClick} icon={Icon} text={data?.text} href={href} className='mc-btn' />
      </Box>
      {/* <p className='text-end'>
        <small className='mc-sidebar-menu-version'>v. 1.0</small>
      </p> */}
    </>
  );
};

export default Logout;
