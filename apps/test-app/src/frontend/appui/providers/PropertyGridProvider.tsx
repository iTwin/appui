import * as React from "react";
import {
  StagePanelLocation,
  StagePanelSection,
  UiItemsProvider,
  useActiveIModelConnection,
  WidgetState,
} from "@itwin/appui-react";
import { VirtualizedPropertyGridWithDataProvider } from "@itwin/components-react";
import { useResizeObserver } from "@itwin/core-react/internal";
import {
  IPresentationPropertyDataProvider,
  PresentationPropertyDataProvider,
  SchemaMetadataContextProvider,
  usePropertyDataProviderWithUnifiedSelection,
} from "@itwin/presentation-components";
import { getSchemaContext } from "../../SchemaContext";
import {
  IModelApp,
  NotifyMessageDetails,
  OutputMessagePriority,
  OutputMessageType,
} from "@itwin/core-frontend";

export function createPropertyGridProvider() {
  return {
    id: "appui-test-app:property-grid-provider",
    getWidgets: () => {
      return [
        {
          id: "property-grid-widget-new",
          label: "With new editors",
          content: <PropertyGrid usedEditor="new" />,
          defaultState: WidgetState.Open,
          layouts: {
            standard: {
              location: StagePanelLocation.Left,
              section: StagePanelSection.Start,
            },
          },
        },
        {
          id: "property-grid-widget-old",
          label: "With old editors",
          content: <PropertyGrid usedEditor="old" />,
          defaultState: WidgetState.Open,
          layouts: {
            standard: {
              location: StagePanelLocation.Right,
              section: StagePanelSection.Start,
            },
          },
        },
      ];
    },
  } satisfies UiItemsProvider;
}

function PropertyGrid({ usedEditor }: { usedEditor: "old" | "new" }) {
  const imodel = useActiveIModelConnection();
  const [dataProvider, setDataProvider] =
    React.useState<PresentationPropertyDataProvider>();
  React.useEffect(() => {
    if (!imodel) {
      setDataProvider(undefined);
      return;
    }

    const provider = new PresentationPropertyDataProvider({ imodel });
    setDataProvider(provider);
    return () => {
      provider.dispose();
    };
  }, [imodel]);

  if (!dataProvider) {
    return null;
  }

  return (
    <PropertyGridInternal dataProvider={dataProvider} usedEditor={usedEditor} />
  );
}

function PropertyGridInternal({
  dataProvider,
  usedEditor,
}: {
  dataProvider: IPresentationPropertyDataProvider;
  usedEditor: "old" | "new";
}) {
  const [{ width, height }, setSize] = React.useState({
    width: 0,
    height: 0,
  });
  const onResize = React.useCallback((w: number, h: number) => {
    setSize({ width: w, height: h });
  }, []);
  const ref = useResizeObserver(onResize);
  usePropertyDataProviderWithUnifiedSelection({ dataProvider });

  return (
    <SchemaMetadataContextProvider
      imodel={dataProvider.imodel}
      schemaContextProvider={getSchemaContext}
    >
      <div ref={ref} style={{ width: "100%", height: "100%" }}>
        <VirtualizedPropertyGridWithDataProvider
          height={height}
          width={width}
          dataProvider={dataProvider}
          isPropertyEditingEnabled
          onPropertyUpdated={async (args) => {
            const message = `Property updated: ${usedEditor} - ${JSON.stringify(args.newValue)}`;
            IModelApp.notifications.outputMessage(
              new NotifyMessageDetails(
                OutputMessagePriority.Info,
                message,
                undefined,
                OutputMessageType.Sticky
              )
            );
            return true;
          }}
          usedEditor={usedEditor}
        />
      </div>
    </SchemaMetadataContextProvider>
  );
}
