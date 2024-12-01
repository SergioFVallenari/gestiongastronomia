import React, { useState } from 'react';
// import { WidgetDropdown, ProfileDropdown } from '../components/header/index.ts';
import useGetComplexObject from '../hooks/useGetComplexObject';
import { Button, Section, Box } from '../components/elements/index.ts';
import { DrawerContext } from '../context/Drawer.tsx';
import { ThemeContext } from '../context/Themes.tsx';
// import { FlexitContext } from '../context/Flexit.tsx';
import { Logo } from '../components/index.ts';
import data from '../data/master/header.json';
import src from '../images/logo-donFaustino/don-faustino2.png';
// import { useNavigate } from 'react-router-dom';
import TituloHeader from '../Views/Header/TituloHeader.tsx';
// import WidgetDropdown from '../components/header/WidgetDropdown.tsx';

interface IHeader {
  label: string;
}
// interface FlexitContextType {
//   datos: any;
//   setearDatos: (datos: any) => void;
//   tokenDecifrado: (token: string) => Promise<any>;
// }

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface IDrawerContextType {
  drawer: boolean;
  toggleDrawer: () => void;
}

const Header: React.FC<IHeader> = ({ label }) => {
  // const navigate = useNavigate();
  const { drawer, toggleDrawer } = useGetComplexObject<IDrawerContextType>(DrawerContext);
  const { theme, toggleTheme } = useGetComplexObject<ThemeContextType>(ThemeContext);
  // const { datos, tokenDecifrado, setearDatos } = useGetComplexObject<FlexitContextType>(FlexitContext);
  const [scroll] = useState('sticky');

  // const traerUsuario = useCallback(
  //   async (mandar: string): Promise<void> => {
  //     let token = await tokenDecifrado(mandar);
  //     setearDatos(token.data);
  //   },
  //   [setearDatos, tokenDecifrado]
  // );

  // function cerrarSesion(): void {
  //   localStorage.clear();
  //   navigate('/');
  // }

  // useEffect(() => {
  //   let token: string = localStorage.getItem('token') ?? '';
  //   if (!Object.keys(datos).length) traerUsuario(token);
  // }, [datos, traerUsuario]);

  /*   window.addEventListener(
    'scroll',
    () => {
      if (window.pageYOffset > 0) setScroll('sticky');
      else setScroll('fixed');
    },
    { passive: true }
  );

  document.addEventListener(
    'mousedown',
    (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setSearch('');
      }
    },
    { passive: true }
  ); */

  return (
    <Section as='header' className={`mc-header ${scroll}`}>
      <Logo src={src} alt={data?.logo.alt} name={''} href={'/'} />
      <Box className='mc-header-group'>
        <Box className='mc-header-left'>
          {/* <Button
            icon={data?.search.icon}
            className="mc-header-icon search col-2"
          // onClick={() => setSearch("show")}
          /> */}
          <Button icon={drawer ? 'menu_open' : 'menu'} className='mc-header-icon toggle col-2' onClick={toggleDrawer} />
        </Box>
        <Box className='w-100 d-sm-none d-md-block d-none d-sm-block'>
          <TituloHeader titulo={label} />
        </Box>
        <Box className='mc-header-right'>
          <Button icon={theme} onClick={toggleTheme} className={`mc-header-icon ${data.theme.addClass}`} />
          {/* <WidgetDropdown icon={data.notify.icon} title={data.notify.title} badge={data.notify.badge} addClass={data.notify.addClass} dropdown={data.notify.dropdown} /> */}
          {/* <ProfileDropdown name={`${datos?.usuario?.nombres} ${datos?.usuario?.apellidos}`} image={datos?.usuario?.imagen === '../assets/images/logo.jpg' ? 'https://cdn-icons-png.flaticon.com/512/3033/3033143.png' : datos?.usuario?.imagen} username={`${datos?.usuario?.nombres} ${datos?.usuario?.apellidos}`} dropdown={data.profile.dropdown} onClick={cerrarSesion} /> */}
        </Box>
      </Box>
    </Section>
  );
};

export default Header;
