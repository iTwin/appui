/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Orientation } from "@itwin/core-react";
import { CustomizablePropertyRenderer } from "../../../components-react/properties/renderers/CustomizablePropertyRenderer";
import TestUtils, { selectorMatches, styleMatch } from "../../TestUtils";
import { render, screen } from "@testing-library/react";

describe("CustomizablePropertyRenderer", () => {
  it("renders properly", () => {
    render(
      <CustomizablePropertyRenderer
        orientation={Orientation.Horizontal}
        propertyRecord={TestUtils.createPrimitiveStringProperty(
          "Label",
          "Model"
        )}
      />
    );
    expect(screen.getByTitle("Label")).to.exist;
  });

  it("renders without an offset when orientation is vertical", () => {
    render(
      <CustomizablePropertyRenderer
        orientation={Orientation.Vertical}
        propertyRecord={TestUtils.createPrimitiveStringProperty(
          "Label",
          "Model"
        )}
      />
    );

    expect(screen.getByTitle("Label").parentElement)
      .satisfy(selectorMatches(".components-primitive-property-label-renderer"))
      .satisfy(styleMatch({ paddingLeft: "0px" }));
  });
});
