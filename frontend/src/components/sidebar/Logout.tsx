import React from 'react';
import { Box, Anchor } from '../elements';
// const { REACT_APP_FRONT_VERSION } = process.env;

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
  return (
    <>
      <Box className='mc-sidebar-logout text-center'>
        <Anchor onClick={onClick} icon={data?.icon} text={data?.text} href={href} className='mc-btn primary sm' />
      </Box>
      <p className='text-end'>
        <small className='mc-sidebar-menu-version'>v. 1.0</small>
      </p>
    </>
  );
};

export default Logout;
