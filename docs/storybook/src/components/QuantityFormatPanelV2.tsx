/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { IModelApp } from "@itwin/core-frontend";
import { type FormatProps } from "@itwin/core-quantity";
import { QuantityFormatPanelV2 } from "../../../../ui/imodel-components-react/src/imodel-components-react/quantityformat/v2/QuantityFormatPanelV2";

interface QuantityFormatPanelV2StoryProps {
  formatProps: FormatProps;
  initialMagnitude?: number;
}

export function QuantityFormatPanelV2Story(
  props: QuantityFormatPanelV2StoryProps
) {
  const {
    formatProps,
    initialMagnitude = 123.456789,
  } = props;

  // Create initial format definition from the provided formatProps
  const [formatDefinition, setFormatDefinition] = React.useState<FormatProps>(formatProps);

  const handleFormatChange = React.useCallback((newFormat: FormatProps) => {
    console.log("Format changed:", newFormat);
    setFormatDefinition(newFormat);
  }, []);

  // Update format definition when formatProps change
  React.useEffect(() => {
    setFormatDefinition(formatProps);
  }, [formatProps]);

  return (

      <>
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "16px",
          width: "75%",
        }}
      >
      <QuantityFormatPanelV2
        formatDefinition={formatDefinition}
        unitsProvider={IModelApp.quantityFormatter.unitsProvider}
        onFormatChange={handleFormatChange}
        initialMagnitude={initialMagnitude} />
      </div>
      <div style={{ marginTop: "20px" }}>
        <h3>Current Format Definition:</h3>
        <pre
          style={{
            background: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {JSON.stringify(formatDefinition, null, 2)}
        </pre>
      </div>
      </>
  );
}
