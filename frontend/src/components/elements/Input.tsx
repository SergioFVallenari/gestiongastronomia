interface IInput {
  value: string;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: React.FC<IInput> = ({ value, name, type, placeholder, className, onChange, ...rest }) => {
  return <input type={type || 'text'} placeholder={placeholder} className={className} {...rest} name={name} value={value} onChange={onChange} />;
};

export default Input;
