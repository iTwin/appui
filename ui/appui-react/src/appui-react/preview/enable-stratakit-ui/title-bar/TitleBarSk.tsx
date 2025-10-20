import * as React from "react";
import classnames from "classnames";

import "./TitleBar.scss";

interface TitleBarSkProps {
  children?: React.ReactNode;
  title: string;
  classNames?: string;
  style?: React.CSSProperties;
}

/**
 * Title bar for stratakit.
 */
export function TitleBarSk({
  classNames,
  style,
  title,
  children,
}: TitleBarSkProps) {
  const className = classnames("sk-footer-dialog-titleBar", classNames);
  return (
    <div className={className} style={style}>
      <span className="sk-title">{title}</span>
      {children}
    </div>
  );
}
