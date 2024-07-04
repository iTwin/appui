/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useActiveFrontstageDef, useActiveViewport } from "@itwin/appui-react";
import { ViewFlagProps, ViewFlags } from "@itwin/core-common";
import { IModelApp, Viewport } from "@itwin/core-frontend";
import { ToggleSwitch } from "@itwin/itwinui-react";

export function useWidgetDef(id: string) {
  const frontstageDef = useActiveFrontstageDef();
  return frontstageDef?.findWidgetDef(id);
}

export function ToggleCameraItem() {
  const activeViewport = useActiveViewport();
  const [cameraOn, setCameraOn] = React.useState(activeViewport?.isCameraOn);

  React.useEffect(() => {
    return activeViewport?.onChangeView.addListener((vp) => {
      setCameraOn(vp.isCameraOn);
    });
  }, [activeViewport]);

  const onToggleCamera = React.useCallback(async () => {
    if (activeViewport) {
      await IModelApp.tools.run("View.ToggleCamera", activeViewport);
      setCameraOn(activeViewport.isCameraOn);
    }
  }, [activeViewport]);

  return (
    <ToggleSwitch
      key={"toggleCamera"}
      label={"Camera"}
      labelPosition={"right"}
      onChange={onToggleCamera}
      checked={cameraOn}
    />
  );
}

interface ViewFlagItemProps {
  flagName: string;
}

export function ViewFlagItem({ flagName }: ViewFlagItemProps) {
  const activeViewport = useActiveViewport();

  const flagValue = React.useCallback((name: string, vp?: Viewport) => {
    const props: ViewFlagProps | undefined = vp?.viewFlags.toJSON();
    return (props as any)?.[name] ?? false;
  }, []);

  const [value, setValue] = React.useState(flagValue(flagName, activeViewport));

  React.useEffect(() => {
    return activeViewport?.onChangeView.addListener((vp) => {
      const props: ViewFlagProps = vp.viewFlags.toJSON();
      (props as any)[flagName] =
        (props as any)[flagName] === undefined
          ? false
          : (props as any)[flagName];
      const viewFlags = ViewFlags.fromJSON(props);
      vp.viewFlags = viewFlags;
      setValue(
        (props as any)[flagName] === undefined
          ? false
          : (props as any)[flagName]
      );
    });
  }, [activeViewport, flagName]);

  const onViewFlagChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      if (activeViewport) {
        const props: ViewFlagProps = activeViewport.viewFlags.toJSON();
        (props as any)[flagName] =
          (props as any)[flagName] === undefined
            ? checked
            : !(props as any)[flagName];
        const viewFlags = ViewFlags.fromJSON(props);
        activeViewport.viewFlags = viewFlags;
        setValue(
          (props as any)[flagName] === undefined
            ? false
            : (props as any)[flagName]
        );
      }
    },
    [activeViewport, flagName]
  );

  const stylizedName = React.useCallback((name: string) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.replace(/([A-Z])/g, " $1").trim();
    return name;
  }, []);

  return (
    <ToggleSwitch
      key={flagName}
      label={stylizedName(flagName)}
      labelPosition={"right"}
      onChange={onViewFlagChanged}
      checked={value}
    />
  );
}

export function ViewAttributesWidgetComponent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        overflowY: "auto",
      }}
    >
      <ViewFlagItem flagName="acs" />
      <ToggleCameraItem />
      <ViewFlagItem flagName="noConstruct" />
      <ViewFlagItem flagName="hidEdges" />
      <ViewFlagItem flagName="monochrome" />
      <ViewFlagItem flagName="visEdges" />
      <ViewFlagItem flagName="ambientOcclusion" />
      <ViewFlagItem flagName="shadows" />
      <ViewFlagItem flagName="backgroundMap" />
    </div>
  );
}
