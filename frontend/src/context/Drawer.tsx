import { createContext, useState } from 'react';

interface IDrawerContextType {
  drawer: boolean;
  toggleDrawer: () => void;
}

interface IDrawerProvider {
  children: React.ReactNode;
}

export const DrawerContext = createContext<IDrawerContextType | null>(null);

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }) => {
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  const [drawer, setDrawer] = useState(mediaQuery.matches ? false : true);
  const toggleDrawer = () => setDrawer(!drawer);

  return <DrawerContext.Provider value={{ drawer, toggleDrawer }}>{children}</DrawerContext.Provider>;
};
