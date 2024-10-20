interface IOption {
  children: React.ReactNode;
  value?: string | number;
  key?: number;
}

const Option: React.FC<IOption> = ({ children, value, key = 0 }) => {
  return (
    <option key={key} value={value?.toString()}>
      {children}
    </option>
  );
};

export default Option;
