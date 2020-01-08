/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { expect } from "chai";
import { render } from "@testing-library/react";

import { UiError } from "@bentley/ui-abstract";

import { LoadedBinaryImage } from "../../ui-components/common/IImageLoader";
import { ImageRenderer } from "../../ui-components/common/ImageRenderer";

describe("ImageRenderer", () => {
  const imageRenderer = new ImageRenderer();
  const svg = `
    <?xml version="1.0" encoding="UTF-8" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="480" height="543.03003" viewBox="0 0 257.002 297.5" xml:space="preserve">
      <g transform="matrix(0.8526811,0,0,0.8526811,18.930632,21.913299)">
        <polygon points="8.003,218.496 0,222.998 0,74.497 8.003,78.999 8.003,218.496 "/>
      </g>
    </svg>
  `;

  const hex = "89504e470d0a1a0a0000000d49484452000000080000000808020000004b6d29dc000000097048597300002e2300002e230178a53f76000000434944415408d7858dc109804010c4b26213c1fe4b93edc2f171277e3c9c67481858ac0088bea8fbe11a2e8c468206d887657956034766bbad3e66d1f4703bedfff9e76ec62115e8243cfe640000000049454e44ae426082";
  const hexBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAQ0lEQVQI14WNwQmAQBDEsmITwf5Lk+3C8XEnfjycZ0gYWKwAiL6o++EaLoxGggbYh2V5VgNHZrutPmbR9HA77f/5527GIRXoJDz+ZAAAAABJRU5ErkJggg==";

  describe("render", () => {
    it("renders binary", () => {
      const image = imageRenderer.render({ sourceType: "binary", fileFormat: "png", value: hex } as LoadedBinaryImage);

      const imageRender = render(<>{image}</>);

      const imgElement = imageRender.container.children[0] as HTMLImageElement;

      expect(imgElement.tagName).to.equal("IMG");
      expect(imgElement.src).to.equal(`data:image/png;base64,${hexBase64}`);
    });

    it("renders svg", () => {
      const image = imageRenderer.render({ sourceType: "svg", value: svg });

      const imageRender = render(<>{image}</>);

      expect(imageRender.container.innerHTML).to.matchSnapshot();
    });

    it("renders url", () => {
      const image = imageRenderer.render({ sourceType: "url", value: "some-image.png" });

      const imageRender = render(<>{image}</>);

      const imgElement = imageRender.container.children[0] as HTMLImageElement;
      expect(imgElement.tagName).to.equal("IMG");
      expect(imgElement.src).to.equal("some-image.png");
    });

    it("renders core-icon", () => {
      const image = imageRenderer.render({ sourceType: "core-icon", value: "icon-placeholder" });

      const imageRender = render(<>{image}</>);

      expect(imageRender.container.querySelector(".icon-placeholder")).to.not.be.null;
    });

    it("throws when provided image source is not supported", () => {
      expect(() => imageRenderer.render({ sourceType: "random-type" } as any)).to.throw(UiError);
    });
  });

});
