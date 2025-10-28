/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { WidgetContentLayout } from "@itwin/appui-react";
import { StagePanelState, UiItemsProvider } from "@itwin/appui-react";
import { Button, Text } from "@itwin/itwinui-react";
import {
  SvgPlaceholder,
} from "@itwin/itwinui-icons-react";
import { AppUiStory } from "../AppUiStory";
import { createFrontstage, createWidget } from "../Utils";

/** Props for WidgetContentLayout component itself */
interface WidgetContentLayoutProps {
  /** Show loading overlay (WidgetContentLayout prop) */
  isLoading?: boolean;
  /** Widget size provider ID (WidgetContentLayout prop) */
  widgetId?: string;
}

/** Props for WidgetContentLayout.Header component */
interface HeaderProps {
  /** Title for the header */
  title?: string;
  /** Show toggle in header */
  showToggle?: boolean;
  /** Show buttons in header */
  nbButtons?: number;
  /** Show menu in header */
   menu?: {
    title: string;
    items: { label: string; onClick: () => void }[];
  };
  /** Show icons in header */
  nbIcons?: number;
  /** Show search in header */
  showSearch?: boolean;
  /** Size of the icons */
  iconSize?: "small" | "large" | "";
}

/** Props for WidgetContentLayout.Content component */
interface ContentProps {
  /** Show blocking loading overlay for content (Content prop) */
  isContentLoading?: boolean;
  /** Show non-blocking loading indicator (Content prop) */
  isNonBlockingLoading?: boolean;
  /** Center content vertically and horizontally (Content prop) */
  centerContent?: boolean;
  /** Content type */
  contentType?: "short" | "long" | "custom";
}

/** Props for WidgetContentLayout.Footer component */
interface FooterProps {
  /** Show footer section */
  showFooter?: boolean;
}

/** Combined props for the story */
interface WidgetContentLayoutStoryProps
  extends WidgetContentLayoutProps,
    HeaderProps,
    ContentProps,
    FooterProps {}

/**
 * Showcases the WidgetContentLayout component with its Header, Content, and Footer sections.
 * The WidgetContentLayout provides a flexible layout structure for widgets with optional header controls,
 * scrollable content area, and footer actions.
 */
export function WidgetContentLayoutStory(props: WidgetContentLayoutStoryProps) {
  const [_searchValue, setSearchValue] = React.useState("");
  const [isToggled, setIsToggled] = React.useState(false);

  const icons: { icon: React.ReactNode; label: string; onClick: () => void }[] | undefined = props.nbIcons && props.nbIcons > 0
    ? Array.from({ length: props.nbIcons }, (_, i) => {
        return {
          icon: <SvgPlaceholder />,
          label: `Icon ${i + 1}`,
          onClick: () => console.log(`Icon ${i + 1} clicked`),
        };
      })
    : undefined;

  const buttons = props.nbButtons && props.nbButtons > 0
    ? Array.from({ length: props.nbButtons }, (_, i) => {
        return (
          <Button
            key={`button-${i}`}
            startIcon={<SvgPlaceholder />}
          >
            {`Button ${i + 1}`}
          </Button>
        );
      })
    : undefined;

  const toggle = props.showToggle ?  {
    label: "Toggle",
    checked: isToggled,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setIsToggled(e.target.checked)
  } : undefined;

  const onSearch = props.showSearch
    ? (value: string) => {
        setSearchValue(value);
        console.log("Search:", value);
      }
    : undefined;

  const widgetContent = (
    <WidgetContentLayout isLoading={props.isLoading} id={props.widgetId}>
      {(!!icons || !!buttons || !!props.menu || !!toggle || !!onSearch || !!props.title) && (
        <WidgetContentLayout.Header
          title={props.title}
          toggle={toggle}
          buttons={buttons}
          menu={props.menu}
          icons={icons}
          onSearch={onSearch}
          iconSize={props.iconSize === "" ? undefined : props.iconSize}
        />
      )}
      <WidgetContentLayout.Content
        isLoading={props.isContentLoading}
        isNonBlockingLoading={props.isNonBlockingLoading}
        centerContent={props.centerContent}
      >
        {props.contentType === "short" && <ShortContent />}
        {props.contentType === "long" && <LongContent />}
        {props.contentType === "custom" && <CustomContent />}
        {!props.contentType && <DefaultContent />}
      </WidgetContentLayout.Content>
      {props.showFooter && (
        <WidgetContentLayout.Footer>
          <Button>Cancel</Button>
          <Button styleType="cta">Apply</Button>
        </WidgetContentLayout.Footer>
      )}
    </WidgetContentLayout>
  );

  const provider: UiItemsProvider = {
    id: "widget-layout-provider",
    getWidgets: () => [
      createWidget(1, {
        content: widgetContent,
        label: "Widget Layout Demo",
      }),
    ],
  };

  return (
    <AppUiStory
      itemProviders={[provider]}
      frontstages={[
        createFrontstage({
          leftPanelProps: {
            defaultState: StagePanelState.Open,
            pinned: true,
          },
        }),
      ]}
    />
  );
}

function DefaultContent() {
  return (
    <div>
      <Text variant="subheading">Default Content</Text>
      <p>This is the default content area of the widget.</p>
      <p>It can contain any React components or elements.</p>
    </div>
  );
}

function ShortContent() {
  return (
    <div>
      <Text variant="subheading">Short Content</Text>
      <p>This is a short content example that doesn't require scrolling.</p>
    </div>
  );
}

function LongContent() {
  return (
    <div>
      <Text variant="subheading">Long Content</Text>
      {Array.from({ length: 50 }, (_, i) => (
        <p key={i}>
          This is paragraph {i + 1} of the long content. The content area is
          scrollable when it exceeds the available height.
        </p>
      ))}
    </div>
  );
}

function CustomContent() {
  return (
    <>
      <div
        style={{
          padding: "1rem",
          background: "#f0f0f0",
          borderRadius: "4px",
          color: "black"
        }}
      >
        <Text variant="leading">Custom Section 1</Text>
        <p>Custom content with styled sections.</p>
      </div>
      <div
        style={{
          padding: "1rem",
          background: "#e0e0e0",
          borderRadius: "4px",
          color: "black"
        }}
      >
        <Text variant="leading">Custom Section 2</Text>
        <p>Another custom section with different styling.</p>
      </div>
      <div
        style={{
          padding: "1rem",
          background: "#d0d0d0",
          borderRadius: "4px",
          color: "black"
        }}
      >
        <Text variant="leading">Custom Section 3</Text>
        <p>More custom content to demonstrate flexibility.</p>
      </div>
    </>
  );
}
