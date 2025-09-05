import type { ReactNode } from "react";

interface IMenuProps {
  children: ReactNode;
  gap?: string;
  className?: string;
}
function Menu({ gap = "gap-2", className = "", ...props }: IMenuProps) {
  return (
    <ul className={`flex flex-col ${gap} ${className}`}>{props.children}</ul>
  );
}

export default Menu;
