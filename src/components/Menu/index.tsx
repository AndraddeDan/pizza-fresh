import React from "react";
import { RoutePath } from "types/routes";
import { ReactComponent as Logout } from "assets/icons/logout.svg";
import logo from "assets/imgs/logo.png";
import { NavItem } from "./types";
import * as S from "./style";

interface MenuProps {
  active: RoutePath;
  navItems: NavItem[];
  onNavigate: (data: RoutePath) => void;
  onLogout: () => void;
}

const Menu: React.FC<MenuProps> = ({
  active,
  onNavigate,
  navItems,
  onLogout,
}) => {
  return (
    <S.Menu>
      <nav>
        <S.MenuLogo>
          <img src={logo} alt="Logo" />
        </S.MenuLogo>

        {navItems.map((item, index) => (
          <S.MenuItem key={`MenuItem-${index}`} active={item.path === active}>
            <S.MenuItemButton
              active={item.path === active}
              onClick={() => onNavigate(item.path)}
            >
              {item.icon}
            </S.MenuItemButton>
          </S.MenuItem>
        ))}
      </nav>

      <S.MenuItemLogout onClick={onLogout}>
        <Logout />
      </S.MenuItemLogout>
    </S.Menu>
  );
};

export default Menu;
