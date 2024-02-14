/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type { Decorator } from "@storybook/react";

export namespace Storybook {
  export interface MenuItem {
    value: string;
    title: string;
    left?: string;
    right?: string;
    icon?: string;
  }
}

const getDemoIModel = (name: string): DemoIModel | undefined => {
  if (name === "blank") {
    return "blank";
  }
  const model = remoteIModels.find((model) => model.name === name);
  return model;
};

const DemoIModelContext = React.createContext<DemoIModel | undefined>(
  undefined
);

export const withDemoIModel: Decorator = (Story, context) => {
  const demoIModel = getDemoIModel(context.globals.iModel);
  return (
    <DemoIModelContext.Provider value={demoIModel}>
      <Story />
    </DemoIModelContext.Provider>
  );
};

export function useDemoIModel() {
  return React.useContext(DemoIModelContext);
}

export interface RemoteIModel {
  name: string;
  label: string;
  iTwinId: string;
  iModelId: string;
}

export type DemoIModel = RemoteIModel | "blank";

export const remoteIModels: RemoteIModel[] = [
  {
    name: "metrostation",
    label: "Metrostation",
    iTwinId: "402f1a92-c7b1-4012-b787-7fa45e2e7fe4",
    iModelId: "b55dec38-d9b7-4029-9b9c-6b899151328f",
  },
  {
    name: "coffsHarborDemo",
    label: "Coffs Harbor Road",
    iTwinId: "c5d4dd3a-597a-4c88-918c-f1aa3588312f",
    iModelId: "11977591-6a15-4f0e-aa10-1c6afb066bc7",
  },
  {
    name: "retailBuilding",
    label: "Retail Building",
    iTwinId: "998b4696-a672-4f85-bea1-8e35e0852452",
    iModelId: "97a67f36-8efa-499c-a6ed-a8e07f38a410",
  },
  {
    name: "bayTownProcessPlant",
    label: "Bay Town Process Plant",
    iTwinId: "b27dc251-0e53-4a36-9a38-182fc309be07",
    iModelId: "f30566da-8fdf-4cba-b09a-fd39f5397ae6",
  },
  {
    name: "house",
    label: "House",
    iTwinId: "6b9d3c0b-1217-4cf8-a1c0-afcade43e66a",
    iModelId: "6be3a56d-b93b-4a3c-a41e-06398083905d",
  },
  {
    name: "philadelphia",
    label: "Philadelphia",
    iTwinId: "402f1a92-c7b1-4012-b787-7fa45e2e7fe4",
    iModelId: "f815bddf-c448-47c6-84d1-94762d85b645",
  },
  {
    name: "stadium",
    label: "Stadium",
    iTwinId: "656dd74d-8798-4aa4-8d13-6e6458789639",
    iModelId: "881c9ca0-34ff-4875-ae63-2dd8ac015c27",
  },
  {
    name: "transformedStadium",
    label: "Transformed Stadium",
    iTwinId: "58262a3d-bbc8-45d0-adbc-13a4623c180f",
    iModelId: "67cf8408-8f3f-4a3a-bde1-a991a422e909",
  },
  {
    name: "extonCampus",
    label: "Exton Campus",
    iTwinId: "5b4ebd22-d94b-456b-8bd8-d59563de9acd",
    iModelId: "d992e912-7f6f-4bd6-9781-4ecf2891b17a",
  },
  {
    name: "villa",
    label: "Villa",
    iTwinId: "532629d2-d25e-4a00-9fb7-c401b6cacf84",
    iModelId: "62d521ca-0b45-4a65-9f48-9fc9b5e87100",
  },
];

export const demoIModelGlobalType = {
  description: "Global iModel for components",
  defaultValue: undefined,
  toolbar: {
    title: "Demo iModel",
    icon: "doclist",
    items: [
      {
        title: "Reset",
        type: "reset",
      },
      {
        title: "Blank iModel",
        value: "blank",
      },
      ...remoteIModels.map<Storybook.MenuItem>((model) => ({
        title: model.label,
        value: model.name,
      })),
    ],
    dynamicTitle: true,
  },
};
