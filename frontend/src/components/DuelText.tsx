import React from 'react';
import { Box, Text, Heading } from './elements/index.ts';
import { recorte } from '../helpers/index.ts';

interface IDuelText {
  size?: string;
  title: string;
  descrip: string;
  timesTamp?: string;
  className?: string;
}

const DuelText: React.FC<IDuelText> = ({ size, title, descrip, timesTamp, className }) => {
  return (
    <Box className={`mc-duel-text ${size ? size : 'md'}`}>
      <Heading className={`mc-duel-text-title ${className}`}>
        {recorte(title)}
        {timesTamp && <Text as='small'>{timesTamp}</Text>}
      </Heading>
      <Text className={`mc-duel-text-descrip raleway-light ${className}`}>{recorte(descrip)}</Text>
    </Box>
  );
};
export default DuelText;
