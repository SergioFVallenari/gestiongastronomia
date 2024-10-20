import React from 'react';
import { Box, Text, Icon, Heading } from '../elements/index.ts';

interface IFloatCard {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  variant: string;
  digit: string;
  title: string;
  icon: string;
  style?: React.CSSProperties;
}

const FloatCard: React.FC<IFloatCard> = ({ onClick, variant, digit, title, icon, style }) => {
  return (
    <Box className={`mc-float-card ${variant}`} onClick={onClick} style={style}>
      <Heading>{digit}</Heading>
      <Text>{title}</Text>
      <Icon>{icon}</Icon>
    </Box>
  );
};

export default FloatCard;
