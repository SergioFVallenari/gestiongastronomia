import React from 'react';
import { Link } from 'react-router-dom';

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
  icon?: string;
  iconClass?: string;
  text?: string;
  badge?: IBadge;
  arrow?: string;
  children?: React.ReactNode;
}

const Anchor: React.FC<IAnchor> = ({ hidden, onClick, className, target, href, icon, iconClass, text, badge, arrow, children, ...rest }) => {
  return (
    <div hidden={hidden}>
      <Link to={href || '#'} target={target} onClick={onClick} className={className} {...rest}>
        {icon || iconClass ? <i className={iconClass || 'material-icons'}>{icon}</i> : <></>}
        {text && <span className='raleway-light'>{text}</span>}
        {badge && <sup className={badge.variant}>{badge.text}</sup>}
        {arrow && <small className='material-icons'>{arrow}</small>}
        {children}
      </Link>
    </div>
  );
};

export default Anchor;
