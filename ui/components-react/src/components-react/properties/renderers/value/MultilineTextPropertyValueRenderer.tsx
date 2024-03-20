/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { assert } from "@itwin/core-bentley";
import type { PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager";
import { useRenderedStringValue } from "./PrimitivePropertyValueRenderer";
import classnames from "classnames";
import { convertRecordToString } from "./Common";
import { useTranslation } from "../../../useTranslation";

/** @internal */
export class MultilineTextPropertyValueRenderer
  implements IPropertyValueRenderer
{
  public canRender(record: PropertyRecord): boolean {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }

  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ): React.ReactNode {
    return (
      <MultilineTextPropertyValueRendererImpl
        record={record}
        context={context}
      />
    );
  }
}

interface MultilineTextPropertyValueRendererImplProps {
  record: PropertyRecord;
  context?: PropertyValueRendererContext;
  children?: never;
}

const MultilineTextPropertyValueRendererImpl: React.FC<
  MultilineTextPropertyValueRendererImplProps
> = (props) => {
  const { stringValue, element } = useRenderedStringValue(
    props.record,
    convertRecordToString,
    props.context
  );
  return (
    <MultilineTextRenderer
      style={props.context?.style}
      stringValue={stringValue}
      isExpanded={props.context?.isExpanded}
      onExpansionToggled={props.context?.onExpansionToggled}
      onHeightChanged={props.context?.onHeightChanged}
    >
      {element}
    </MultilineTextRenderer>
  );
};

interface MultilineTextRendererProps {
  stringValue?: string;
  isExpanded?: boolean;
  onExpansionToggled?: () => void;
  onHeightChanged?: (newHeight: number) => void;
  style?: React.CSSProperties;
  /** Content */
  children?: React.ReactNode;
}

/** @internal */
export const MultilineTextRenderer: React.FC<MultilineTextRendererProps> = (
  props
) => {
  const { translate } = useTranslation();
  const spanRef = useRef<HTMLSpanElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const previousHeightRef = useRef(0);
  const [contentOverflows, setContentOverflows] = useState<boolean>(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    assert(divRef.current !== null && spanRef.current !== null);

    setContentOverflows(
      spanRef.current.clientWidth < spanRef.current.scrollWidth
    );

    const currentHeight = Math.max(divRef.current.offsetHeight, 27);
    if (currentHeight !== previousHeightRef.current) {
      props.onHeightChanged?.(currentHeight);
      previousHeightRef.current = currentHeight;
    }
  });

  const handleExpansionToggleClick = (event: React.MouseEvent) => {
    props.onExpansionToggled?.();
    event.stopPropagation();
  };

  // In order to always trigger onMouseLeave event on PropertyView, collapse button must remain mounted at all times.
  // https://github.com/facebook/react/issues/6807
  return (
    <div ref={divRef} className="multiline">
      <span
        ref={spanRef}
        className={classnames("content", { expanded: props.isExpanded })}
        style={props.style}
        title={props.isExpanded ? undefined : props.stringValue}
      >
        {props.children}
        <button
          className="expand-toggle"
          style={{ display: props.isExpanded ? "inline-block" : "none" }}
          onClick={handleExpansionToggleClick}
        >
          {translate("property.collapse")}
        </button>
      </span>
      {contentOverflows && !props.isExpanded && (
        <button className="expand-toggle" onClick={handleExpansionToggleClick}>
          {translate("property.expand")}
        </button>
      )}
    </div>
  );
};
