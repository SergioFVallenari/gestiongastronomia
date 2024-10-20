import React from 'react';
import { List, Item, Anchor} from '../elements';
import { useLocation } from 'react-router-dom';

interface IMenuItem {
  item: {
    href: string;
    icon: string;
    text: string;
    hide?: boolean;
    submenu?: {
      href: string;
      text: string;
    }[];
    badge?: {
      variant: string;
      text: string;
    };
  };
}

const MenuItem: React.FC<IMenuItem> = ({ item }) => {
  const location = useLocation();
  const activar = location.pathname.split('/')[1].toLowerCase();
  function changeText(text: string) {
    switch (text) {
      case 'cuenta corriente':
        return 'ccorriente';
      case 'venta consignacion':
        return 'ventaconsignacion';
      default:
        return text;
    }
  }
  return (
    <Item className={`mc-sidebar-menu-item ${activar === changeText(item.text) ? 'active' : ''}`}>
      {item.submenu ? (
        <>
          <List className='mc-sidebar-dropdown-list'>
            {item.submenu.map((item, index) => (
              <Item key={index} className='mc-sidebar-dropdown-item'>
                <Anchor href={item.href} className='mc-sidebar-dropdown-link'>
                  {item.text}
                </Anchor>
              </Item>
            ))}
          </List>
        </>
      ) : (
        <Anchor hidden={item.hide} href={item.href} icon={item.icon} text={item.text} badge={item.badge} className='mc-sidebar-menu-btn' />
      )}
    </Item>
  );
};

export default MenuItem;
