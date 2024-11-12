interface IButton {
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLElement>;
  className: string;
  icon?: string;
  iconClass?: string;
  text?: string;
  badge?: {
    variant: string;
    text: string;
  };
  arrow?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  role?: string;
  databstoggle?: string;
  href?: string;
  arialabelledby?: string;
  tabIndex?: number;
  hidden?: boolean;
}

const Button: React.FC<IButton> = ({
  type,
  onClick,
  className,
  icon,
  iconClass,
  text,
  badge,
  arrow,
  children,
  disabled,
  role,
  databstoggle,
  href,
  arialabelledby,
  tabIndex,
  hidden,
}) => {
  if (href) {
    return (
      <a href={href} className={className} role={role} data-bs-toggle={databstoggle} aria-labelledby={arialabelledby} tabIndex={tabIndex} hidden={hidden}>
        {icon || iconClass ? <i className={iconClass || 'material-icons'}>{icon}</i> : <></>}
        {text && <span>{text}</span>}
        {badge && <sup className={badge.variant}>{badge.text}</sup>}
        {arrow && <small className='material-icons'>{arrow}</small>}
        {children}
      </a>
    );
  }

  return (
    <button disabled={disabled} type={type || 'button'} onClick={onClick} className={className} role={role} data-bs-toggle={databstoggle} aria-labelledby={arialabelledby} tabIndex={tabIndex} hidden={hidden}>
      {icon || iconClass ? <i className={iconClass || 'material-icons'}>{icon}</i> : <></>}
      {text && <span>{text}</span>}
      {badge && <sup className={badge.variant}>{badge.text}</sup>}
      {arrow && <small className='material-icons'>{arrow}</small>}
      {children}
    </button>
  );
};

export default Button;