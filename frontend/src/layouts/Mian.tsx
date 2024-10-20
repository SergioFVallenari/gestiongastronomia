import React from 'react';
import useGetComplexObject from '../hooks/useGetComplexObject';
import { DrawerContext } from '../context/Drawer';
import Box from '../components/elements/Box';

interface IMain {
  children: React.ReactNode;
}
interface IDrawerContextType {
  drawer: boolean;
  toggleDrawer: () => void;
}

const Main: React.FC<IMain> = ({ children }) => {
  const { drawer } = useGetComplexObject<IDrawerContextType>(DrawerContext);
  return (
    <Box as='main' className={`mc-main ${drawer ? 'active' : ''}`}>
      {children}
    </Box>
  );
};

export default Main;
