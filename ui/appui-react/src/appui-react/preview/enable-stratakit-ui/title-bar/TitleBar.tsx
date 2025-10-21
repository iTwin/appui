import * as React from "react";
import classnames from "classnames";

import "./TitleBar.scss";
import { Text } from "@stratakit/bricks";

interface TitleBarProps {
  children?: React.ReactNode;
  title: string;
  classNames?: string;
  style?: React.CSSProperties;
}

/**
 * Title bar for stratakit.
 */
export function TitleBar({
  classNames,
  style,
  title,
  children,
}: TitleBarProps) {
  const className = classnames("sk-footer-dialog-titleBar", classNames);
  return (
    <div className={className} style={style}>
      <Text variant="body-lg" render={<span />} className="sk-title">
        {title}
      </Text>
      {children}
    </div>
  );
}
