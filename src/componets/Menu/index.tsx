import { FC } from "react";
import Menu, { MenuProps } from "./menu";
import SubMenu, { SubMenuProps } from "./subMenu";
import MenuItem, { menuItemProps } from "./menuItem";

export type IMenuComponent = FC<MenuProps> & {
  item: FC<menuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as IMenuComponent;
TransMenu.item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
