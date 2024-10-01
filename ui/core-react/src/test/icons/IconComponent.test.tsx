/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { ConditionalStringValue } from "@itwin/appui-abstract";
import { render, waitFor } from "@testing-library/react";
import * as React from "react";
import { ConditionalIconItem, Icon } from "../../core-react.js";
import TestUtils from "../TestUtils.js";

describe("IconComponent", () => {
  beforeEach(async () => {
    await TestUtils.initializeUiCore();
  });

  it("Should return null from undefined iconSpec", () => {
    const { container } = render(<Icon />);
    expect(container.firstChild).toEqual(null);
  });

  it("should render with ReactNode", () => {
    const { container } = render(<Icon iconSpec={<span>Test</span>} />);
    const span = container.querySelector("span");
    expect(span).toBeTruthy();
  });

  it("should handle correctly with icon conditional value empty string", () => {
    const spec = new ConditionalStringValue(() => "", []);
    const { container } = render(<Icon iconSpec={spec} />);
    const iconContainer = container.querySelector(".icon");
    expect(iconContainer).toBeTruthy();
  });

  it("should render correctly with icon class string", () => {
    const { container } = render(<Icon iconSpec="icon-developer" />);
    const iconClassName = container.querySelector(".icon-developer");
    expect(iconClassName).toBeTruthy();
  });

  it("should render correctly with no web svg iconSpec - legacy", () => {
    const { container } = render(<Icon iconSpec="webSvg:test.svg" />);
    const webComponent = container.querySelector("svg-loader");
    expect(webComponent).toBeTruthy();
    expect(webComponent!.getAttribute("src")).toEqual("test.svg");
  });

  it("should render correctly with no web svg iconSpec", () => {
    const { container } = render(<Icon iconSpec="test.svg" />);
    const webComponent = container.querySelector("svg-loader");
    expect(webComponent).toBeTruthy();
    expect(webComponent!.getAttribute("src")).toEqual("test.svg");
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

  it("should return a ReactNode from a ConditionalIconItem", () => {
    const sut = new ConditionalIconItem(() => <>Test Icon</>, ["event1"]);
    const { getByText } = render(<Icon iconSpec={sut} />);
    getByText("Test Icon");
  });

  it("should return value from a nested conditional", () => {
    const item1 = new ConditionalIconItem(() => <>Test Icon</>, ["event1"]);
    const item2 = new ConditionalIconItem(() => item1, ["event1"]);
    const { getByText } = render(<Icon iconSpec={item2} />);
    getByText("Test Icon");
  });
});
