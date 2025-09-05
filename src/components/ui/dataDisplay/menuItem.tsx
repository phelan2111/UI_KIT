import type { ReactNode } from "react";

interface IMenuItemProps {
  children?: ReactNode;
  renderExpandedProps?: () => ReactNode;
  onClick?: VoidFunction;
  className?: string;
}
function MenuItem({ className = "", ...props }: IMenuItemProps) {
  return (
    <li aria-hidden onClick={props.onClick} className={`cursor-pointer`}>
      <div className={`transition-all duration-300 ${className}`}>
        {props.children}
      </div>
    </li>
  );
}

export default MenuItem;
