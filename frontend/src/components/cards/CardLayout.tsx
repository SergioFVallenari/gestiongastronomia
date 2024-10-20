import React from 'react';
import Box from '../elements/Box.tsx';

interface ICardLayout {
  className?: string;
  children: React.ReactNode;
}

const CardLayout: React.FC<ICardLayout> = ({ className, children }) => {
  return <Box className={`mc-card ${className ? className : ''}`}> {children}</Box>;
};

export default CardLayout;
