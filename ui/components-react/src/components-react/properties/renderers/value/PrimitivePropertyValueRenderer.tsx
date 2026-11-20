/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Properties
 */

import * as React from "react";
import type { LinkElementsInfo, PropertyRecord } from "@itwin/appui-abstract";
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { useAsyncValue } from "../../../common/UseAsyncValue.js";
import { PropertyGridCommons } from "../../../propertygrid/component/PropertyGridCommons.js";
import { LinksRenderer } from "../../LinkHandler.js";
import type {
  IPropertyValueRenderer,
  PropertyValueRendererContext,
} from "../../ValueRendererManager.js";
import { convertRecordToString } from "./Common.js";

import type { LinkRendererLinks } from "../../LinkHandler.js";

/** Default Primitive Property Renderer
 * @public
 */
export class PrimitivePropertyValueRenderer implements IPropertyValueRenderer {
  /** Checks if the renderer can handle given property */
  public canRender(record: PropertyRecord) {
    return record.value.valueFormat === PropertyValueFormat.Primitive;
  }

  /** Method that returns a JSX representation of PropertyRecord */
  public render(
    record: PropertyRecord,
    context?: PropertyValueRendererContext
  ) {
    return (
      <PrimitivePropertyValueRendererImpl
        record={record}
        context={context}
        stringValueCalculator={convertRecordToString}
      />
    );
  }
}

/** @internal */
interface PrimitivePropertyValueRendererImplProps {
  record: PropertyRecord;
  stringValueCalculator: (record: PropertyRecord) => string | Promise<string>;
  context?: PropertyValueRendererContext;
  linksHandler?: LinkRendererLinks;
}

/** @internal */
export function PrimitivePropertyValueRendererImpl(
  props: PrimitivePropertyValueRendererImplProps
) {
  const { element } = useRenderedStringValue(
    props.record,
    props.stringValueCalculator,
    props.context,
    props.linksHandler
  );
  return <span style={props.context?.style}>{element}</span>;
}

/**
 * Default link handler used for handling records,
 * which did not have any specified LinkElementsInfo.
 *
 * Default matcher matches all URLs using regex.
 * Default onClick causes the link to be rendered as a button when used in a `LinksRenderer`.
 * @public
 */
export const DEFAULT_LINKS_HANDLER: LinkElementsInfo = {
  matcher: PropertyGridCommons.getLinks,
  onClick: () => {},
};

/** Same as DEFAULT_LINKS_HANDLER but omits onClick so that only URLs are rendered as links by default. */
const NEW_LINKS_HANDLER: LinkRendererLinks = {
  matcher: PropertyGridCommons.getLinks,
};

/** @internal */
export function useRenderedStringValue(
  record: PropertyRecord,
  stringValueCalculator: (record: PropertyRecord) => string | Promise<string>,
  context?: PropertyValueRendererContext,
  linksHandler?: LinkRendererLinks
): { stringValue?: string; element: React.ReactNode } {
  const calculatedValue = React.useMemo(
    (): string | Promise<string> => stringValueCalculator(record),
    [record, stringValueCalculator]
  );
  const stringValue = useAsyncValue(calculatedValue);
  const el =
    stringValue === undefined ? (
      context?.defaultValue
    ) : (
      <LinksRenderer
        value={stringValue}
        links={record.links ?? linksHandler ?? NEW_LINKS_HANDLER}
        highlighter={context?.textHighlighter}
      />
    );
  return { stringValue, element: el };
}
