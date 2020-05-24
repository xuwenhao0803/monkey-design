import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import classnames from "classnames";
// export enum ButtonSize {
//   Large = "lg",
//   Small = "sm",
// }
// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }

export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  className?: string;
  /**设置button的禁用 */
  disabled?: boolean;
  /**设置button的类型 */
  btnType?: ButtonType;
    /**设置button的尺寸 */
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
}
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;


export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * ## BUtton header
 * ~~~js
 * import {Button} from 'monkeydesign'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    disabled,
    btnType,
    className,
    size,
    children,
    href,
    ...restProps
  } = props;

  const classes = classnames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link") {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} {...restProps} disabled={disabled}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
