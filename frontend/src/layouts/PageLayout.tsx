import React from 'react';
import Main from './Mian';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import { DrawerProvider } from '../context/Drawer';

interface IPageLayout {
  label?: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<IPageLayout> = ({ label, children }) => {
  const location = useLocation();

  return (
    <DrawerProvider>
      <Header label={label ? label: ''} />
      <Sidebar />
      <Main>
        <>
          {children}
          {location.pathname !== '/message' ? <Footer /> : ''}
        </>
      </Main>
    </DrawerProvider>
  );
};

export default PageLayout;
