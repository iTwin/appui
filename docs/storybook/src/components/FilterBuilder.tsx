/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { UiFramework } from "@itwin/appui-react";
import {
  PropertyFilterBuilderProps,
  PropertyFilterBuilderRenderer,
  usePropertyFilterBuilder,
} from "@itwin/components-react";
import { IModelApp } from "@itwin/core-frontend";
import { Button } from "@itwin/itwinui-react";
import React from "react";

export function FilterBuilderStory(props: FilterBuilderComponentProps) {
  return (
    <Initialized>
      <FilterBuilderComponent {...props} />
    </Initialized>
  );
}

type FilterBuilderComponentProps = Pick<
  PropertyFilterBuilderProps,
  "properties" | "ruleGroupDepthLimit" | "initialFilter"
>;

function FilterBuilderComponent({
  initialFilter,
  ...props
}: FilterBuilderComponentProps) {
  const { rootGroup, actions, buildFilter } = usePropertyFilterBuilder({
    initialFilter,
  });

  return (
    <div style={{ padding: "10px" }}>
      <PropertyFilterBuilderRenderer
        {...props}
        actions={actions}
        rootGroup={rootGroup}
      />
      <Button onClick={() => buildFilter()}>Validate</Button>
    </div>
  );
}

function Initialized({ children }: React.PropsWithChildren<unknown>) {
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    void (async function () {
      await IModelApp.startup();
      await UiFramework.initialize(undefined);
      setInitialized(true);
    })();
  }, []);
  if (!initialized) return null;
  return <>{children}</>;
}
