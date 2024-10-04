/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Tree
 */

import "./ExpansionToggle.scss";
import classnames from "classnames";
import * as React from "react";
import type { CommonProps } from "../utils/Props.js";
import { Icon } from "../icons/IconComponent.js";
import { SvgChevronRight } from "@itwin/itwinui-icons-react";
import { useTranslation } from "../l10n/useTranslation.js";

/* eslint-disable @typescript-eslint/no-deprecated */

/** Properties for the [[ExpansionToggle]] component
 * @public
 * @deprecated in 4.15.0. Props of deprecated {@link ExpansionToggle} component.
 */
export interface ExpansionToggleProps extends CommonProps {
  isExpanded?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  ["data-testid"]?: string;
}

/** ExpansionToggle React component used by the [[TreeNode]] component to show collapsed or expanded state
 * @public
 * @deprecated in 4.15.0. Use {@link https://itwinui.bentley.com/docs/tree iTwinUI Tree} instead.
 */
export function ExpansionToggle(props: ExpansionToggleProps) {
  const { translate } = useTranslation();
  const className = classnames(
    "core-tree-expansionToggle",
    props.isExpanded && "is-expanded",
    props.className
  );
  const label = translate(props.isExpanded ? "tree.collapse" : "tree.expand");

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onMouseDown={(e) => e.stopPropagation()}
      onClick={props.onClick}
      className={className}
      style={props.style}
      data-testid={props["data-testid"]}
      role="button"
      tabIndex={-1}
      aria-label={label}
    >
      <Icon className="toggle icon" iconSpec={<SvgChevronRight />} />
    </div>
  );
}
