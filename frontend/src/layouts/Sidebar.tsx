import { MultipleMenu, Logout } from '../components/sidebar';
import { DrawerContext } from '../context/Drawer';
import Section from '../components/elements/Section';
import data from '../data/master/sidebar.json';
import useGetComplexObject from '../hooks/useGetComplexObject';

interface IDrawerContextType {
  drawer: boolean;
  toggleDrawer: () => void;
}

const Sidebar = (): JSX.Element => {
  const { drawer } = useGetComplexObject<IDrawerContextType>(DrawerContext);
  function cerrarSesion() {
    localStorage.clear();
  }
  return (
    <Section as='aside' className={`mc-sidebar thin-scrolling ${drawer ? 'active' : ''}`}>
      <MultipleMenu data={data?.navs} />
      <Logout data={data?.button} onClick={cerrarSesion} href={'/'}/>
    </Section>
  );
};

export default Sidebar;
