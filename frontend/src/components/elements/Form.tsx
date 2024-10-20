import React from 'react';

interface IForm {
  children: React.ReactNode;
  className: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<IForm> = ({ children, className, onSubmit }): JSX.Element => {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
