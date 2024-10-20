import React from 'react';
import { Box, Heading } from '../elements/index.ts';

interface ITabCard {
  title: string;
  children: React.ReactNode;
}

const TabCard: React.FC<ITabCard> = ({ title, children }) => {
  return (
    <Box className='mc-tab-card'>
      <Heading as='h6' className='mc-tab-card-title'>
        {title}
      </Heading>
      {children}
    </Box>
  );
};

export default TabCard;
