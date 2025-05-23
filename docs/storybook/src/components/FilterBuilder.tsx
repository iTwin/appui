/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { PropertyValueFormat } from "@itwin/appui-abstract";
import { UiFramework } from "@itwin/appui-react";
import {
  PropertyFilterBuilderProps,
  PropertyFilterBuilderRenderer,
  PropertyFilterBuilderRuleValue,
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
  "properties" | "initialFilter"
> & {
  editorSystem: "new" | "legacy";
};

function FilterBuilderComponent({
  initialFilter,
  editorSystem,
  ...props
}: FilterBuilderComponentProps) {
  const { rootGroup, actions, buildFilter } = usePropertyFilterBuilder({
    initialFilter,
    ruleValidator: ({ value }) => {
      if (
        value?.valueFormat === PropertyValueFormat.Primitive &&
        value.value === "invalid"
      ) {
        return "Invalid Value";
      }
      return undefined;
    },
  });

  React.useEffect(() => {
    console.log(buildFilter());
  }, [buildFilter]);

  return (
    <div style={{ padding: "10px" }}>
      <PropertyFilterBuilderRenderer
        {...props}
        actions={actions}
        rootGroup={rootGroup}
        ruleValueRenderer={React.useCallback(
          (valueProps) => (
            <PropertyFilterBuilderRuleValue
              {...valueProps}
              editorSystem={editorSystem}
            />
          ),
          [editorSystem]
        )}
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
