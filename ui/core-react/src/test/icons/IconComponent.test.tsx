/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { render, waitFor } from "@testing-library/react";
import * as React from "react";
import { ConditionalIconItem } from "../../core-react/icons/ConditionalIconItem";
import type { IconSpec } from "../../core-react/icons/IconComponent";
import { Icon } from "../../core-react/icons/IconComponent";
import TestUtils from "../TestUtils";

describe("IconComponent", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiCore();
  });

  it("Should return null from undefined iconSpec", () => {
    const { container } = render(<Icon />);
    expect(container.firstChild).to.be.null;
  });

  it("should render with ReactNode", () => {
    const { container } = render(<Icon iconSpec={<span>Test</span>} />);
    const span = container.querySelector("span");
    expect(span).not.to.be.null;
  });

  it("should handle correctly with icon conditional value empty string", () => {
    const spec = new ConditionalStringValue(() => "", []);
    const { container } = render(<Icon iconSpec={spec} />);
    const iconContainer = container.querySelector(".core-svg-icon");
    expect(iconContainer).not.to.be.null;
    expect(iconContainer?.childElementCount).toEqual(0);
  });

  it("should render correctly with icon class string", () => {
    const { container } = render(<Icon iconSpec="icon-developer" />);
    const iconClassName = container.querySelector(".icon-developer");
    expect(iconClassName).not.to.be.null;
  });

  it("should render correctly with no web svg iconSpec - legacy", () => {
    const { container } = render(<Icon iconSpec="webSvg:test.svg" />);
    const webComponent = container.querySelector("svg-loader");
    expect(webComponent).not.to.be.null;
    expect(webComponent!.getAttribute("src")).to.be.eq("test.svg");
  });

  it("should render correctly with no web svg iconSpec", () => {
    const { container } = render(<Icon iconSpec="test.svg" />);
    const webComponent = container.querySelector("svg-loader");
    expect(webComponent).not.to.be.null;
    expect(webComponent!.getAttribute("src")).to.be.eq("test.svg");
  });

  it("should render base64 data uri web svg iconSpec", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${expectedPath}"/></svg>`
    ).toString("base64")}`;
    const { container } = render(<Icon iconSpec={dataUri} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should render base64 data uri web svg iconSpec - with legacy prefix", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml;base64,${Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${expectedPath}"/></svg>`
    ).toString("base64")}`;
    const { container } = render(<Icon iconSpec={`webSvg:${dataUri}`} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should render data uri web svg iconSpec", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${expectedPath}"/></svg>`
    )}`;
    const { container } = render(<Icon iconSpec={dataUri} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should render data uri web svg iconSpec - with legacy prefix", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="${expectedPath}"/></svg>`
    )}`;
    const { container } = render(<Icon iconSpec={`webSvg:${dataUri}`} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should render data uri web svg iconSpec with minimum encoding", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Cpath%20d='${expectedPath}'/%3E%3C/svg%3E`;
    const { container } = render(<Icon iconSpec={dataUri} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should render data uri web svg iconSpec with minimum encoding - with legacy prefix", async () => {
    const expectedPath = "M7,1v6H1v2h6v6h2V9h6V7H9V1H7z";
    const dataUri = `data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2016%2016'%3E%3Cpath%20d='${expectedPath}'/%3E%3C/svg%3E`;
    const { container } = render(<Icon iconSpec={`webSvg:${dataUri}`} />);
    await waitFor(() =>
      expect(container.querySelector("svg-loader")?.innerHTML).to.contain(
        expectedPath
      )
    );
  });

  it("should return value from a ConditionalIconItem", () => {
    const iconSpec1: IconSpec = "icon1.svg";
    const icon1Getter = (): IconSpec => iconSpec1;
    const syncEventIds = ["sync-id-one", "sync-id-two", "sync-id-THREE"];

    const sut = new ConditionalIconItem(icon1Getter, syncEventIds);
    const { container } = render(<Icon iconSpec={sut} />);
    const iconItem = container.firstElementChild;
    const iconName = iconItem?.firstChild?.nodeValue;
    expect(iconName).to.not.be.null;
    expect(iconName).to.contain("icon1.svg");
  });
});
