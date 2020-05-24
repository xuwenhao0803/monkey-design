import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { menuItemProps } from "./menuItem";
// import {CSSTransition} from "react-transition-group";
import Transition from '../Transition/transition'
import Icon from "../Icon/icon";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;

  const context = useContext(MenuContext);
  const openedSubMenu = context.defaultOpenSubMenus as Array<string>;

  const isopend =
    index && context.mode === "vertical"
      ? openedSubMenu.includes(index)
      : false;
  const [menuOpen, setOpen] = useState(isopend);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildern = () => {
    const subMenuClasses = classNames("submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<menuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error("warning:is not allowed");
      }
    });
    return (
      // <CSSTransition in={menuOpen} timeout={300} unmountOnExit classNames="zoom-in-top" appear>
      //   <ul className={subMenuClasses}>{childrenComponent}</ul>
      // </CSSTransition>
      <Transition in={menuOpen} timeout={300}  animationName="zoom-in-buttom" >
      <ul className={subMenuClasses}>{childrenComponent}</ul>
    </Transition>
    );
  };
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildern()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
