import React from 'react';
interface ISelect {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  children: React.ReactNode;
  className: string;
}
const Select: React.FC<ISelect> = ({ onChange, children, className, ...rest }) => {
  return (
    <select className={className} onChange={onChange} {...rest}>
      {children}
    </select>
  );
};

export default Select;
