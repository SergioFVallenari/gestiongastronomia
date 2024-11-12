import React from 'react';
// import useGetComplexObject from '../../hooks/useGetComplexObject';
// import { CardHeader } from '../cards';
import { Dropdown } from 'react-bootstrap';
import { Icon, Box, Anchor} from '../elements';
// import { PostEureka, DeleteEureka } from '../../components-new/estructura/EurekaGeneral/EurekaGeneral';
// import { FlexitContext } from '../../context/Flexit';

interface IWidgetDropdown {
  title: string;
  icon: string;
  addClass: string;
  badge: {
    text: string;
    variant: string;
  };
  dropdown: any;
  menu?: boolean;
}

// interface INotificaciones {
//   subject: string;
//   mensaje: string;
//   diferencia: string;
//   idnotificacion: number;
// }

// interface FlexitContextType {
//   datos: any;
//   setearDatos: (datos: any) => void;
//   tokenDecifrado: (token: string) => Promise<any>;
// }

const WidgetDropdown: React.FC<IWidgetDropdown> = ({ title, icon, addClass, dropdown, menu = true }) => {
  // const { datos } = useGetComplexObject<FlexitContextType>(FlexitContext);
  // const [notificaciones, setNotificaciones] = useState<INotificaciones[]>([]);

  // async function getNotificaciones() {
  //   const notificaciones = await PostEureka('/Notificaciones', {});
  //   setNotificaciones(notificaciones.content);
  // }

  // const deleteNotificacion = (idnotificacion = undefined, idusuario = undefined): void => {
  //   let objetoNotificacion: any = { idnotificacion, idusuario };
  //   for (let key in objetoNotificacion) {
  //     if (objetoNotificacion[`${key}`] === undefined) delete objetoNotificacion[`${key}`];
  //   }
  //   DeleteEureka('/notificaciones', objetoNotificacion).then(() => getNotificaciones());
  // };

  // useEffect(() => {
  //   getNotificaciones();
  // }, []);

  return (
    <Dropdown className={addClass}>
      <Dropdown.Toggle className='mc-dropdown-toggle mc-header-icon ' title={title}>
        <Icon type={icon} />
        {/* <Text as='sup' className={badge?.variant}>
          {notificaciones?.length}
        </Text> */}
      </Dropdown.Toggle>
      {menu === true ? (
        <Dropdown.Menu align='end' className='mc-dropdown-paper'>
          <Box className='mc-header-dropdown-group'>
            {/* <CardHeader onClick={() => deleteNotificacion(undefined, datos.usuario.idusuario)} title={`${'Notificaciones'} (${notificaciones?.length})`} dotsMenu={dropdown?.dotsMenu} /> */}
            {/* <List className='mc-header-dropdown-list thin-scrolling'>
              {notificaciones?.length ? (
                notificaciones?.map((item, index) => (
                  <Item key={index} className={`mc-header-dropdown-item`}>
                    <Anchor className='mc-header-dropdown-content'>
                      <Box className='mc-header-dropdown-meta'>
                        <Heading as='h4'>
                          <Text as='cite'>{item?.subject}</Text>
                        </Heading>
                        <Text as='p'>{item?.mensaje}</Text>
                        <Text as='time'>{item?.diferencia}</Text>
                      </Box>
                    </Anchor>
                  </Item>
                ))
              ) : (
                <div className='sinOrdenes colorLetra'>Sin notificaciones</div>
              )}
            </List> */}
            <Anchor href={dropdown?.button?.path} className='mc-btn primary mc-header-dropdown-button'>
              {'Ver todas las notificaciones'}
            </Anchor>
          </Box>
        </Dropdown.Menu>
      ) : null}
    </Dropdown>
  );
};

export default WidgetDropdown;
