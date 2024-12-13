import React from 'react';
import DotsMenu from '../DotsMenu.tsx';
import { Box, Heading, Anchor } from '../elements/index.ts';
import { SvgIconComponent } from '@mui/icons-material';

interface IDostMenu {
  dots: string;
  dropdown: {
    icon: SvgIconComponent;
    text: string;
    path: string;
  }[];
  onClick?: (path: string) => void;
}
interface IButton {
  path: string;
  icon: SvgIconComponent;
  text: string;
}
interface ICardHeader {
  title: string;
  dotsMenu?: IDostMenu;
  button?: IButton;
  onClick: (path: string) => void;
  className?: string;
}
const CardHeader: React.FC<ICardHeader> = ({ title, dotsMenu, button, onClick, className }): JSX.Element => {
  return (
    <Box className='mc-card-header'>
      {title && (
        <Heading as='h4' className={`mc-card-title ${className}`}>
          {title}
        </Heading>
      )}
      {dotsMenu && <DotsMenu dots={dotsMenu.dots} dropdown={dotsMenu.dropdown} onClick={onClick} />}
      {button && <Anchor className='mc-btn' href={button.path} icon={button.icon} text={button.text} />}
    </Box>
  );
};

export default CardHeader;
