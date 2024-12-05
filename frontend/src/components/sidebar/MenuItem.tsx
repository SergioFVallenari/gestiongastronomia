import React from 'react';
import { List, Item, Anchor } from '../elements';
import { useLocation } from 'react-router-dom';
import {
  Dashboard,
  Inventory2,
  Category,
  ReceiptLong,
  Fastfood,
  AttachMoney,
} from '@mui/icons-material';

const iconMapping: { [key: string]: React.ElementType } = {
  leaderboard: Dashboard,
  inventory_2: Inventory2,
  category: Category,
  receipt_long: ReceiptLong,
  restaurant_menu: Fastfood,
  attach_money: AttachMoney,
};

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
  const Icon = iconMapping[item.icon]; // Mapea el ícono

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
        <List className='mc-sidebar-dropdown-list'>
          {item.submenu.map((submenuItem, index) => (
            <>
              <Item key={index} className='mc-sidebar-dropdown-item'>
                <Anchor href={submenuItem.href} className='mc-sidebar-dropdown-link'>
                  {submenuItem.text}
                </Anchor>
              </Item>
            </>
          ))}
        </List>
      ) : (
        <Anchor
          hidden={item.hide}
          href={item.href}
          className='mc-sidebar-menu-btn'
        >
          {Icon && <Icon fontSize="small" className="mc-sidebar-menu-icon" />}
          <span>{item.text}</span>
        </Anchor>
      )}
    </Item>
  );
};

export default MenuItem;
