/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { UiItemsProvider } from "@itwin/appui-react";
import { SvgPlaceholder, SvgSettings } from "@itwin/itwinui-icons-react";
import { Stepper } from "@itwin/itwinui-react";

export const widgetProvider: UiItemsProvider = {
  id: "widget-provider",
  provideWidgets: (_stageid, _stageUsage) => {
    return [
      {
        id: "configure",
        content: <ConfigureWidget />,
        label: "Portfolio Configuration",
        icon: <SvgSettings />,
      },
      {
        id: "home",
        content: <b>Home content</b>,
        label: "Home widget",
        icon: <SvgPlaceholder />,
      },
      {
        id: "assets",
        content: <b>Assets content</b>,
        label: "Assets widget",
        icon: <SvgPlaceholder />,
      },
      {
        id: "documents",
        content: <b>Documents content</b>,
        label: "Documents widget",
        icon: <SvgPlaceholder />,
      },
    ];
  },
};

function ConfigureWidget() {
  const [currentStep, setCurrentStep] = React.useState(2);
  return (
    <Stepper
      currentStep={currentStep}
      steps={[
        { name: "First Step" },
        { name: "Second Step" },
        { name: "Third Step" },
        { name: "Last Step" },
      ]}
      onStepClick={(index) => {
        setCurrentStep(index);
      }}
    />
  );
}
