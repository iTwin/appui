/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import "./ComponentExamples.scss";
import * as React from "react";
import { CommonProps, VerticalTabs } from "@itwin/core-react";
import {
  BackstageItemUtilities,
  ColorTheme,
  CursorPopupManager,
  MessageManager,
  ModalFrontstageInfo,
  UiFramework,
} from "@itwin/appui-react";
import { ToggleSwitch } from "@itwin/itwinui-react";
import { ComponentExamplesProvider } from "../providers/ComponentExamplesProvider";

export interface ComponentExampleCategory {
  title: string;
  examples: ComponentExampleProps[];
}

/** Modal frontstage displaying component examples.
 */
export class ComponentExamplesModalFrontstage implements ModalFrontstageInfo {
  public static stageId = "appui-test-app:componentExamplesStage";
  public title: string = UiFramework.localization.getLocalizedString(
    "SampleApp:componentExamplesStage.examples"
  );
  public categories: ComponentExampleCategory[] = [
    ...ComponentExamplesProvider.categories,
  ];
  public get content(): React.ReactNode {
    MessageManager.maxDisplayedStickyMessages = 6;
    return <ComponentExamplesPage categories={this.categories} />;
  }
  public static getBackstageActionItem(
    groupPriority: number,
    itemPriority: number
  ) {
    return BackstageItemUtilities.createActionItem(
      ComponentExamplesModalFrontstage.stageId,
      groupPriority,
      itemPriority,
      () =>
        UiFramework.frontstages.openModalFrontstage(
          new ComponentExamplesModalFrontstage()
        ),
      "Component Examples"
    );
  }
}

interface ComponentExamplesPageProps {
  categories: ComponentExampleCategory[];
  hideThemeOption?: boolean;
}

/** ComponentExamplesPage displaying the component examples.
 */
export const ComponentExamplesPage: React.FC<ComponentExamplesPageProps> = (
  props: ComponentExamplesPageProps
) => {
  const themeTitle: string = UiFramework.localization.getLocalizedString(
    "SampleApp:componentExamplesStage.themeTitle"
  );
  const themeDescription: string = UiFramework.localization.getLocalizedString(
    "SampleApp:componentExamplesStage.themeDescription"
  );
  const showThemeOption = !!!props.hideThemeOption;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [colorTheme, setColorTheme] = React.useState(() =>
    UiFramework.getColorTheme()
  );

  const onThemeChange = () => {
    const theme = isLightTheme() ? ColorTheme.Dark : ColorTheme.Light;
    UiFramework.setColorTheme(theme);
    setColorTheme(theme);
  };

  const isLightTheme = (): boolean => {
    return colorTheme === ColorTheme.Light;
  };

  const isChecked = isLightTheme();
  const darkLabel = UiFramework.localization.getLocalizedString(
    "SampleApp:settingsStage.dark"
  );
  const lightLabel = UiFramework.localization.getLocalizedString(
    "SampleApp:settingsStage.light"
  );

  const handleActivateTab = (index: number) => {
    setActiveIndex(index);
    CursorPopupManager.clearPopups();
  };

  React.useEffect(() => {
    // TODO: quick fix to display footer popup over a modal frontstage.
    const style = document.createElement("style");
    style.textContent = `.nz-footer-popup {
      z-index: 16000;
    }`;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="component-examples">
      <div className="component-examples-categories">
        <VerticalTabs
          labels={props.categories.map(
            (category: ComponentExampleCategory) => category.title
          )}
          activeIndex={activeIndex}
          onActivateTab={handleActivateTab}
        />
      </div>
      <div className="component-examples-items">
        {showThemeOption && (
          <>
            <ComponentExample
              title={themeTitle}
              description={themeDescription}
              content={
                <>
                  {darkLabel}
                  &nbsp;
                  <ToggleSwitch checked={isChecked} onChange={onThemeChange} />
                  &nbsp;
                  {lightLabel}
                </>
              }
            />
            <hr className="component-examples-items-separator" />
          </>
        )}
        {props.categories[activeIndex].examples.map(
          (exampleProps: ComponentExampleProps, index: number) => {
            const { title, description, content, ...otherProps } = exampleProps;
            return (
              <ComponentExample
                key={index.toString()}
                title={title}
                description={description}
                content={content}
                {...otherProps}
              />
            );
          }
        )}
      </div>
      {/* eslint-disable-next-line deprecation/deprecation */}
    </div>
  );
};

/** Properties for the Component Example component */
export interface ComponentExampleProps extends CommonProps {
  title: string;
  description?: string;
  content: React.ReactNode;
}

/** Component Example component */
export const ComponentExample: React.FC<ComponentExampleProps> = (
  props: ComponentExampleProps
) => {
  const { title, description, content } = props;
  return (
    <div className="component-examples-item">
      <div className="panel left-panel">
        <span className="title">{title}</span>
        {description && <span className="description">{description}</span>}
      </div>
      <div className="panel right-panel">{content}</div>
    </div>
  );
};
