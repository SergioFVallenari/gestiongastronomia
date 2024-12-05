import React from 'react';
import { Link } from 'react-router-dom';
import { SvgIconComponent } from '@mui/icons-material'; 
import { Divider } from '@mui/material';

interface IBadge {
  variant: string;
  text: string;
}

interface IAnchor {
  hidden?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  target?: string;
  href?: string;
  icon?: SvgIconComponent;
  iconClass?: string;
  text?: string;
  badge?: IBadge;
  arrow?: SvgIconComponent;
  children?: React.ReactNode;
}

const Anchor: React.FC<IAnchor> = ({ hidden, onClick, className, target, href, icon: Icon, text, badge, arrow: Arrow, children, ...rest }) => {
  return (
    <div hidden={hidden}>
      <Link to={href || '#'} target={target} onClick={onClick} className={className} {...rest}>
        {Icon && <Icon />}
        {text && <span className='raleway-light'>{text}</span>}
        {badge && <sup className={badge.variant}>{badge.text}</sup>}
        {Arrow && <Arrow fontSize="small" />} 
        {children}
      </Link>
      {
        text !== 'cerrar sesión' &&
      <Divider sx={{m:2}} component='li'/>
      }
    </div>
  );
};

export default Anchor;
