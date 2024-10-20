import React from 'react';
import { Box, Input, Select, Option, Icon } from '../elements';

interface IIconField {
  value?: string;
  name?: string;
  classes: string;
  icon: string;
  option?: {
    value: string;
    dias: string;
  }[];
  activeOption?: boolean;
  type: string;
  placeholder: string;
  onChangeInput?: React.ChangeEventHandler<HTMLInputElement>;
  onChangeSelect?: React.ChangeEventHandler<HTMLSelectElement>;
  className?: string;
}

const IconField: React.FC<IIconField> = ({ value = '', name = '', classes, icon, option, activeOption, type, placeholder, onChangeInput, onChangeSelect, ...rest }) => {
  const [visible] = React.useState(false);
  return (
    <Box className={`mc-icon-field ${classes || 'w-md h-sm white'}`}>
      <Icon type={icon || 'account_circle'} />
      {type ? (
        <>
          <Input type={visible ? 'text' : type || 'text'} placeholder={type ? placeholder || 'Type here...' : ''} name={name} value={value} onChange={onChangeInput || (() => {})} {...rest} />
          {/*           {passwordVisible && (
            <Button
              type="button"
              className="material-icons"
              onClick={() => setVisible(!visible)}
            >
              {visible ? "visibility_off" : "visibility"}
            </Button>
          )} */}
        </>
      ) : (
        <Select {...rest} onChange={onChangeSelect || (() => {})}>
          <Option>{activeOption || 'Selecciona opcion'}</Option>
          {option?.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.dias}
            </Option>
          ))}
        </Select>
      )}
    </Box>
  );
};

export default IconField;
