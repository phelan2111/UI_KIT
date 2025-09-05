import { Fragment, type ReactNode } from "react";

export type EmptyProps = {
  componentEmpty?: () => ReactNode;
  isEmpty: boolean;
  children: ReactNode;
};

function Empty(props: EmptyProps) {
  if (!props.isEmpty) {
    return <Fragment>{props.children}</Fragment>;
  }
  return <Fragment>{props.componentEmpty?.() ?? <>Empty...</>}</Fragment>;
}

export default Empty;
