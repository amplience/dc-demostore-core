import React, { FC } from "react";
import s from "./ComponentFrame.module.css";
import clsx from "clsx";

interface Props {
  className?: string;
  menu?: React.ReactElement;
  children?: React.ReactNode;
  OverlayProps?: {
    className?: string;
  };
  MenuProps?: {
    className?: string;
  };
}

const ComponentFrame: FC<Props> = ({
  children,
  menu,
  className,
  MenuProps,
  OverlayProps,
}) => {
  return (
    <div className={clsx(s.root, className)}>
      <div className={s.content}>{children}</div>
      <div className={clsx(s.overlay, OverlayProps?.className)}>
        <div className={clsx(s.menu, MenuProps?.className)}>{menu}</div>
      </div>
    </div>
  );
};

export default ComponentFrame;
