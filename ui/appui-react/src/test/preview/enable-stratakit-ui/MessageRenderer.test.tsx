import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MessageRenderer } from "../../../appui-react/preview/enable-stratakit-ui/status-bar-message-center/MessageRenderer.js";

describe("MessageRenderer", () => {
  it("renders string message", () => {
    render(<MessageRenderer message="Test message" />);
    expect(screen.getByText("Test message")).toBeDefined();
  });

  it("renders with custom className", () => {
    const { container } = render(
      <MessageRenderer message="Test" className="custom-class" />
    );
    const element = container.querySelector("div");
    expect((element as HTMLDivElement).className).toContain("custom-class");
  });

  it("renders inline as span when inline prop is true", () => {
    const { container } = render(<MessageRenderer message="Test" inline />);
    const element = container.querySelector("span");
    expect(element).toBeDefined();
  });

  it("renders as div by default", () => {
    const { container } = render(<MessageRenderer message="Test" />);
    const element = container.querySelector("div");
    expect(element).toBeDefined();
  });

  it("renders React node content", () => {
    const reactNode = <strong>Bold message</strong>;
    render(<MessageRenderer message={reactNode} />);
    expect(screen.getByText("Bold message")).toBeDefined();
  });

  it("renders HTMLElement with valid anchors", () => {
    const element = document.createElement("div");
    element.innerHTML =
      '<a href="https://example.com" target="_blank" rel="noopener">Link</a>';
    const { container } = render(<MessageRenderer message={element} />);
    expect(container.innerHTML).toContain('target="_blank"');
    expect(container.innerHTML).toContain('rel="noopener"');
  });

  it("sanitizes HTMLElement without valid anchor rels", () => {
    const element = document.createElement("div");
    element.innerHTML =
      '<a href="https://example.com" target="_blank">Link</a>';
    const { container } = render(<MessageRenderer message={element} />);
    expect(container.innerHTML).not.toContain('target="_blank"');
  });

  it("sanitizes malicious script content", () => {
    const element = document.createElement("div");
    element.innerHTML = '<script>alert("xss")</script>Safe content';
    const { container } = render(<MessageRenderer message={element} />);
    expect(container.innerHTML).not.toContain("<script>");
    expect(container.innerHTML).toContain("Safe content");
  });

  it("returns null for invalid message types", () => {
    const { container } = render(<MessageRenderer message={null as any} />);
    expect(container.firstChild).toBeNull();
  });

  it("handles anchor element as main element with valid rel", () => {
    const anchor = document.createElement("a");
    anchor.href = "https://example.com";
    anchor.target = "_blank";
    anchor.rel = "noopener";
    anchor.textContent = "External link";

    const { container } = render(<MessageRenderer message={anchor} />);
    expect(container.innerHTML).toContain('target="_blank"');
    expect(container.innerHTML).toContain('rel="noopener"');
  });

  it("handles anchor element as main element without valid rel", () => {
    const anchor = document.createElement("a");
    anchor.href = "https://example.com";
    anchor.target = "_blank";
    anchor.textContent = "External link";

    const { container } = render(<MessageRenderer message={anchor} />);
    expect(container.innerHTML).not.toContain('target="_blank"');
  });
});
