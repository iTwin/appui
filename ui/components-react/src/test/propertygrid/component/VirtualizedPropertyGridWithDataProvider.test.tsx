/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as faker from "faker";
import * as React from "react";
import { VariableSizeList } from "react-window";
import * as moq from "typemoq";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { Orientation } from "@itwin/core-react";
import {
  act,
  fireEvent,
  getByTitle,
  render,
  renderHook,
  waitFor,
  within,
} from "@testing-library/react";
import type { HighlightingComponentProps } from "../../../components-react/common/HighlightingComponentProps";
import type { VirtualizedPropertyGridWithDataProviderProps } from "../../../components-react/propertygrid/component/VirtualizedPropertyGridWithDataProvider";
import { VirtualizedPropertyGridWithDataProvider } from "../../../components-react/propertygrid/component/VirtualizedPropertyGridWithDataProvider";
import { FilteredType } from "../../../components-react/propertygrid/dataproviders/filterers/PropertyDataFiltererBase";
import * as FlatPropertyRendererExports from "../../../components-react/propertygrid/internal/flat-properties/FlatPropertyRenderer";
import { PropertyCategoryRendererManager } from "../../../components-react/propertygrid/PropertyCategoryRendererManager";
import type {
  IPropertyDataProvider,
  PropertyCategory,
  PropertyData,
} from "../../../components-react/propertygrid/PropertyDataProvider";
import { PropertyDataChangeEvent } from "../../../components-react/propertygrid/PropertyDataProvider";
import { SimplePropertyDataProvider } from "../../../components-react/propertygrid/SimplePropertyDataProvider";
import { ResolvablePromise } from "../../test-helpers/misc";
import TestUtils from "../../TestUtils";
import { useVirtualizedPropertyGridLayoutStorage } from "../../../components-react/propertygrid/component/VirtualizedPropertyGrid";
import * as useElementsScrollStorageModule from "../../../components-react/common/UseElementsScrollStorage";

describe("VirtualizedPropertyGridWithDataProvider", () => {
  const categories: PropertyCategory[] = [
    { name: "Group_1", label: "Group 1", expand: true },
    { name: "Group_2", label: "Group 2", expand: false },
  ];
  const records: PropertyRecord[] = [
    TestUtils.createPrimitiveStringProperty("CADID1", "0000 0005 00E0 02D8"),
    TestUtils.createPrimitiveStringProperty("CADID2", "0000 0005 00E0 02D8"),
  ];
  let dataProvider: IPropertyDataProvider;
  let defaultProps: VirtualizedPropertyGridWithDataProviderProps;

  beforeEach(() => {
    const evt = new PropertyDataChangeEvent();
    dataProvider = {
      onDataChanged: evt,
      getData: async (): Promise<PropertyData> => ({
        label: PropertyRecord.fromString(faker.random.word()),
        description: faker.random.words(),
        categories,
        records: {
          Group_1: [records[0]],
          Group_2: [records[1]],
        },
      }),
    };
    defaultProps = {
      dataProvider,
      orientation: Orientation.Horizontal,
      width: 500,
      height: 1200,
    };
  });

  describe("rendering", () => {
    it("renders correctly horizontally", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Horizontal}
          isOrientationFixed={true}
        />
      );

      await waitFor(
        () =>
          expect(
            container.querySelector(".components-property-record--horizontal")
          ).to.be.not.null
      );
    });

    it("renders correctly vertically", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Vertical}
          isOrientationFixed={true}
        />
      );

      await waitFor(
        () =>
          expect(
            container.querySelector(".components-property-record--vertical")
          ).to.be.not.null
      );
    });

    it("renders horizontally by default", async () => {
      const { container, findByText } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={undefined}
          isOrientationFixed={true}
        />
      );

      await findByText("Group 1");
      expect(
        container.querySelector(".components-property-record--horizontal")
      ).toBeTruthy();
    });

    it("renders loader on subsequent selections that take longer to load", async () => {
      const { container, findByText } = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );

      // assert that initial property grid is loaded
      await waitFor(async () => findByText("Group 1"));
      await waitFor(
        async () =>
          expect(container.querySelector(".virtualized-grid-node")).to.be.not
            .null
      );

      // stub getData with a method that can be manually resolved
      const getDataResult = new ResolvablePromise<PropertyData>();
      dataProvider.getData = async () => getDataResult;

      dataProvider.onDataChanged.raiseEvent();

      // do not resolve the getData promise until the loader is displayed
      await waitFor(
        async () =>
          expect(
            container.querySelector(
              ".components-virtualized-property-grid-loader"
            )
          ).to.be.not.null
      );
    });

    it("renders PropertyCategoryBlocks correctly", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );

      await waitFor(() => {
        const categoryBlocks = container.querySelectorAll(
          ".virtualized-grid-node-category"
        );
        expect(categoryBlocks.length, "Wrong amount of categories").toEqual(2);

        expect(categoryBlocks[0].textContent).toEqual("Group 1");
        expect(categoryBlocks[1].textContent).toEqual("Group 2");
      });
    });

    it("renders nested property categories", async () => {
      const parentCategory: PropertyCategory = {
        name: "ParentCategory",
        label: "Parent",
        expand: true,
      };
      const childCategory: PropertyCategory = {
        name: "ChildCategory",
        label: "Child",
        expand: true,
      };
      parentCategory.childCategories = [childCategory];
      dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async (): Promise<PropertyData> => ({
          label: PropertyRecord.fromString(faker.random.word()),
          description: faker.random.words(),
          categories: [parentCategory],
          records: {
            [childCategory.name]: [
              TestUtils.createPrimitiveStringProperty("test", "Test", "Test"),
            ],
          },
        }),
      };

      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={dataProvider}
        />
      );
      await waitFor(() => {
        const categoryBlocks = container.querySelectorAll(
          ".virtualized-grid-node-category"
        );
        expect(categoryBlocks.length, "Wrong amount of categories").toEqual(2);
      });
    });

    it("renders PropertyCategoryBlock as collapsed when it gets clicked", async () => {
      const component = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );
      const { container } = component;

      await waitFor(() => {
        const categoryChild = container.querySelector(
          '.virtualized-grid-node span[title="CADID1"]'
        );
        expect(categoryChild, "Category child is not rendered").toBeTruthy();
      });

      const categoryBlocks = Array.from<HTMLElement>(
        container.querySelectorAll(".virtualized-grid-node-category")
      ).map((el) => within(el).getByRole("button"));
      expect(categoryBlocks.length, "Wrong amount of categories").toEqual(2);
      const categoryBlock = categoryBlocks[0];

      fireEvent.click(categoryBlock);

      await waitFor(() => {
        const categoryChild = container.querySelector(
          '.virtualized-grid-node span[title="CADID1"]'
        );
        expect(categoryChild, "Category child rendered").toEqual(null);
      });
    });

    it("keeps the collapsed state of PropertyCategoryBlock when non-nested data is refreshed", async () => {
      const rootCategory1: PropertyCategory = {
        name: "RootCategory1",
        label: "Root1",
        expand: true,
      };
      const childCategory1: PropertyCategory = {
        name: "ChildCategory1",
        label: "Child",
        expand: true,
      };
      rootCategory1.childCategories = [childCategory1];
      const rootCategory2: PropertyCategory = {
        name: "RootCategory2",
        label: "Root2",
        expand: false,
      };
      const childCategory2: PropertyCategory = {
        name: "ChildCategory2",
        label: "Child",
        expand: true,
      };
      rootCategory2.childCategories = [childCategory2];
      dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async (): Promise<PropertyData> => ({
          label: PropertyRecord.fromString(faker.random.word()),
          description: faker.random.words(),
          categories: [rootCategory1, rootCategory2],
          records: {
            [rootCategory1.name]: [
              TestUtils.createPrimitiveStringProperty(
                "rootCategory1Property",
                "Test",
                "Test"
              ),
            ],
            [childCategory1.name]: [
              TestUtils.createPrimitiveStringProperty(
                "childCategory1Property",
                "Test",
                "Test"
              ),
            ],
            [rootCategory2.name]: [
              TestUtils.createPrimitiveStringProperty(
                "rootCategory2Property",
                "Test",
                "Test"
              ),
            ],
            [childCategory2.name]: [
              TestUtils.createPrimitiveStringProperty(
                "childCategory2Property",
                "Test",
                "Test"
              ),
            ],
          },
          reusePropertyDataState: true,
        }),
      };

      const { findByText, getByText, queryByText } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={dataProvider}
        />
      );

      await findByText("Root1");

      expect(getByText("rootCategory1Property")).toBeTruthy();
      expect(getByText("childCategory1Property")).toBeTruthy();
      expect(queryByText("rootCategory2Property")).toEqual(null);
      expect(queryByText("childCategory2Property")).toEqual(null);

      fireEvent.click(getByText("Root1"));
      fireEvent.click(getByText("Root2"));

      expect(queryByText("rootCategory1Property")).toEqual(null);
      expect(queryByText("childCategory1Property")).toEqual(null);
      expect(getByText("rootCategory2Property")).toBeTruthy();
      expect(getByText("childCategory2Property")).toBeTruthy();

      // Refresh PropertyGrid data.
      act(() => dataProvider.onDataChanged.raiseEvent());
      // await waitFor();

      expect(queryByText("rootCategory1Property")).toEqual(null);
      expect(queryByText("childCategory1Property")).toEqual(null);
      expect(getByText("rootCategory2Property")).toBeTruthy();
      expect(getByText("childCategory2Property")).toBeTruthy();
    });

    it("keeps the collapsed state of PropertyCategoryBlock when nested data is refreshed", async () => {
      const rootCategory1: PropertyCategory = {
        name: "RootCategory1",
        label: "Root1",
        expand: true,
      };
      const childCategory1: PropertyCategory = {
        name: "ChildCategory1",
        label: "Child1",
        expand: false,
      };
      rootCategory1.childCategories = [childCategory1];
      const rootCategory2: PropertyCategory = {
        name: "RootCategory2",
        label: "Root2",
        expand: true,
      };
      const childCategory2: PropertyCategory = {
        name: "ChildCategory2",
        label: "Child2",
        expand: true,
      };
      rootCategory2.childCategories = [childCategory2];
      dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async (): Promise<PropertyData> => ({
          label: PropertyRecord.fromString(faker.random.word()),
          description: faker.random.words(),
          categories: [rootCategory1, rootCategory2],
          records: {
            [rootCategory1.name]: [
              TestUtils.createPrimitiveStringProperty(
                "rootCategory1Property",
                "Test",
                "Test"
              ),
            ],
            [childCategory1.name]: [
              TestUtils.createPrimitiveStringProperty(
                "childCategory1Property",
                "Test",
                "Test"
              ),
            ],
            [rootCategory2.name]: [
              TestUtils.createPrimitiveStringProperty(
                "rootCategory2Property",
                "Test",
                "Test"
              ),
            ],
            [childCategory2.name]: [
              TestUtils.createPrimitiveStringProperty(
                "childCategory2Property",
                "Test",
                "Test"
              ),
            ],
          },
          reusePropertyDataState: true,
        }),
      };

      const { findByText, getByText, queryByText } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={dataProvider}
        />
      );

      await findByText("Root1");

      expect(queryByText("childCategory1Property")).toEqual(null);
      expect(getByText("childCategory2Property")).toBeTruthy();

      fireEvent.click(getByText("Child1"));
      fireEvent.click(getByText("Child2"));

      expect(getByText("childCategory1Property")).toBeTruthy();
      expect(queryByText("childCategory2Property")).toEqual(null);

      // Refresh PropertyGrid data.
      act(() => dataProvider.onDataChanged.raiseEvent());
      // await waitFor();

      expect(getByText("childCategory1Property")).toBeTruthy();
      expect(queryByText("childCategory2Property")).toEqual(null);
    });

    it("rerenders if data if the provider changes", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );

      dataProvider.getData = async (): Promise<PropertyData> => ({
        label: PropertyRecord.fromString(faker.random.word()),
        description: faker.random.words(),
        categories: [
          ...categories,
          { name: "Group_3", label: "Group 3", expand: false },
        ],
        records: {
          Group_1: [records[0]],
          Group_2: [records[1]],
          Group_3: [],
        },
      });
      dataProvider.onDataChanged.raiseEvent();

      await waitFor(() => {
        const categoryBlocks = container.querySelectorAll(
          ".virtualized-grid-node-category"
        );
        expect(categoryBlocks.length).toEqual(3);
      });
    });

    it("doesn't rerender on intermediate data changes", async () => {
      const data: PropertyData = {
        label: PropertyRecord.fromString(faker.random.word()),
        categories: [
          { label: faker.random.word(), name: "test", expand: true },
        ],
        records: {
          test: [
            new PropertyRecord(
              {
                valueFormat: PropertyValueFormat.Primitive,
                displayValue: faker.random.word(),
              },
              {
                typename: faker.database.type(),
                name: faker.random.word(),
                displayLabel: faker.random.word(),
              }
            ),
          ],
        },
      };
      const dataPromise = new ResolvablePromise<PropertyData>();
      const dataFake = vi.fn(() => dataPromise);
      dataProvider.getData = dataFake;

      // first render
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );
      await waitForPropertyGridLoad(container);

      expect(dataFake).toHaveBeenCalledOnce();

      // simulate multiple onDataChanged calls
      for (let i = 1; i <= 10; ++i) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        dataProvider.onDataChanged.raiseEvent();
      }

      // resolve the data promise
      await dataPromise.resolve(data);

      // expect data to be requested two more times.
      // Since the first request is already resolved, it should call once for initial change and once for the last change,
      // but not for intermediate ones
      expect(dataFake).toHaveBeenCalledTimes(3);
    });

    it("changes orientation when props change", async () => {
      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Horizontal}
          isOrientationFixed={true}
        />
      );

      await waitFor(
        () =>
          expect(
            container.querySelector(".components-property-record--horizontal")
          ).to.be.not.null
      );

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Vertical}
          isOrientationFixed={true}
        />
      );

      expect(
        container.querySelector(".components-property-record--vertical")
      ).toBeTruthy();
    });

    it("changes fixed orientation when `orientation` prop changes", async () => {
      const { container, rerender, findByText } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          width={500}
          height={1200}
          orientation={Orientation.Horizontal}
          isOrientationFixed={true}
        />
      );
      await findByText("Group 1");
      expect(
        container.querySelector(".components-property-record--horizontal")
      ).toBeTruthy();

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          width={500}
          height={1200}
          orientation={Orientation.Vertical}
          isOrientationFixed={true}
        />
      );
      expect(
        container.querySelector(".components-property-record--vertical")
      ).toBeTruthy();
    });

    it("changes orientation when `width` prop changes", async () => {
      const { container, rerender, findByText } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          horizontalOrientationMinWidth={500}
          width={500}
          height={1200}
        />
      );
      await findByText("Group 1");
      expect(
        container.querySelector(".components-property-record--horizontal")
      ).toBeTruthy();

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          horizontalOrientationMinWidth={500}
          width={499}
          height={1200}
        />
      );
      expect(
        container.querySelector(".components-property-record--vertical")
      ).toBeTruthy();
    });

    it("doesn't change orientation when props change if not necessary", async () => {
      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Horizontal}
          isOrientationFixed={true}
        />
      );

      await waitFor(
        () =>
          expect(
            container.querySelector(".components-property-record--horizontal")
          ).to.be.not.null
      );

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          orientation={Orientation.Horizontal}
          isOrientationFixed={false}
        />
      );
      expect(
        container.querySelector(".components-property-record--horizontal")
      ).toBeTruthy();
    });

    it("chooses correct orientation on first render if undefined", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          horizontalOrientationMinWidth={500}
          orientation={undefined}
          isOrientationFixed={false}
          width={499}
        />
      );

      await waitFor(
        () =>
          expect(
            container.querySelector(".components-property-record--vertical")
          ).to.be.not.null
      );
    });

    describe("custom category renderers", () => {
      interface SetupDataProviderArgs {
        expandCustomCategory: boolean;
      }

      function setupDataProvider(
        customCategoryName: string,
        { expandCustomCategory }: SetupDataProviderArgs
      ): IPropertyDataProvider {
        const rootCategory1: PropertyCategory = {
          name: customCategoryName,
          label: customCategoryName,
          expand: expandCustomCategory,
          renderer: { name: "test_renderer" },
        };
        return {
          onDataChanged: new PropertyDataChangeEvent(),
          getData: async (): Promise<PropertyData> => ({
            label: PropertyRecord.fromString("test_label"),
            description: "test_description",
            categories: [rootCategory1],
            records: {
              [rootCategory1.name]: [
                TestUtils.createPrimitiveStringProperty(
                  "rootCategory1Property",
                  "Test",
                  "Test"
                ),
              ],
            },
            reusePropertyDataState: true,
          }),
        };
      }

      beforeEach(() => {
        PropertyCategoryRendererManager.defaultManager.addRenderer(
          "test_renderer",
          // eslint-disable-next-line react/display-name
          () => () => <>Custom renderer</>
        );
      });

      afterEach(() => {
        PropertyCategoryRendererManager.defaultManager.removeRenderer(
          "test_renderer"
        );
      });

      it("uses custom category renderer when category specifies one", async () => {
        dataProvider = setupDataProvider("test_category", {
          expandCustomCategory: true,
        });
        const { findByText } = render(
          <VirtualizedPropertyGridWithDataProvider
            {...defaultProps}
            dataProvider={dataProvider}
          />
        );
        expect(await findByText("Custom renderer")).toBeTruthy();
      });

      it("uses property category renderer manager from props when available", async () => {
        dataProvider = setupDataProvider("test_category", {
          expandCustomCategory: true,
        });
        const rendererManager = new PropertyCategoryRendererManager();
        // eslint-disable-next-line react/display-name
        rendererManager.addRenderer("test_renderer", () => () => (
          <>Test renderer from props</>
        ));
        const { findByText } = render(
          <VirtualizedPropertyGridWithDataProvider
            {...defaultProps}
            dataProvider={dataProvider}
            propertyCategoryRendererManager={rendererManager}
          />
        );
        expect(await findByText("Test renderer from props")).toBeTruthy();
      });

      it("updates node height on expansion", async () => {
        vi.spyOn(
          HTMLElement.prototype,
          "getBoundingClientRect"
        ).mockImplementation(() => ({ height: 500 } as DOMRect));
        dataProvider = setupDataProvider("test_category", {
          expandCustomCategory: false,
        });

        const component = render(
          <VirtualizedPropertyGridWithDataProvider
            {...defaultProps}
            dataProvider={dataProvider}
          />
        );

        const category = await component.findByText("test_category");
        expect(component.queryByText("Custom renderer")).toEqual(null);

        const node = component.baseElement.querySelector(
          ".virtualized-grid-node"
        ) as HTMLElement;
        expect(node.style.height).toEqual("42px");

        fireEvent.click(category);

        component.getByText("Custom renderer");
        expect(node.style.height).toEqual("542px");
      });

      it("updates node height on collapse", async () => {
        vi.spyOn(
          HTMLElement.prototype,
          "getBoundingClientRect"
        ).mockImplementation(() => ({ height: 500 } as DOMRect));
        dataProvider = setupDataProvider("test_category", {
          expandCustomCategory: true,
        });

        const { baseElement, findByText } = render(
          <VirtualizedPropertyGridWithDataProvider
            {...defaultProps}
            dataProvider={dataProvider}
          />
        );

        const category = await findByText("test_category");
        const node = baseElement.querySelector(
          ".virtualized-grid-node"
        ) as HTMLElement;
        expect(node.style.height).toEqual("542px");

        fireEvent.click(category);
        expect(node.style.height).toEqual("42px");
      });
    });
  });

  describe("dynamic node heights", () => {
    const StubComponent: React.FC<
      FlatPropertyRendererExports.FlatPropertyRendererProps
    > = (props) => {
      React.useLayoutEffect(() => props.onHeightChanged!(15));
      return <>Stub Component</>;
    };

    beforeEach(() => {
      const rootCategory: PropertyCategory = {
        name: "root",
        label: "Root Category",
        expand: true,
      };

      defaultProps.dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async () => ({
          label: PropertyRecord.fromString("Test Label"),
          description: faker.random.words(),
          categories: [rootCategory],
          records: {
            [rootCategory.name]: [
              TestUtils.createMultilineTextPropertyRecord(
                TestUtils.createPrimitiveStringProperty("testProperty", "test")
              ),
            ],
          },
        }),
      };

      vi.spyOn(
        FlatPropertyRendererExports,
        "FlatPropertyRenderer"
      ).mockImplementation(StubComponent);
    });

    it("reacts to node height change", async () => {
      const { findByText, baseElement } = render(
        <VirtualizedPropertyGridWithDataProvider {...defaultProps} />
      );
      await findByText("Stub Component");

      const node = baseElement.querySelectorAll(
        ".virtualized-grid-node"
      )[1] as HTMLElement;
      expect(node.style.height).toEqual("15px");
    });
  });

  describe("property selection", () => {
    it("calls onPropertySelectionChanged when property gets clicked and selection is enabled", async () => {
      const onPropertySelectionChanged = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
          onPropertySelectionChanged={onPropertySelectionChanged}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      expect(onPropertySelectionChanged).not.toBeCalled();

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      const clickableComponent = clickableComponents[0];
      fireEvent.click(clickableComponent);

      expect(onPropertySelectionChanged).toHaveBeenCalled();
    });

    it("deselects if clicked a 2nd time", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(0);

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);
      const clickableComponent = clickableComponents[0];
      fireEvent.click(clickableComponent);

      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(1);

      fireEvent.click(clickableComponent);

      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(0);
    });

    it("does not call onPropertySelectionChanged when property gets clicked and selection is disabled", async () => {
      const onPropertySelectionChanged = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={false}
          onPropertySelectionChanged={onPropertySelectionChanged}
          isOrientationFixed={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components-property-record--horizontal")
            .length
        ).to.be.greaterThan(0)
      );

      const renderedRecords = container.querySelectorAll(
        ".components-property-record--horizontal"
      );
      expect(renderedRecords.length).to.be.greaterThan(0);

      fireEvent.click(renderedRecords[0]);

      expect(onPropertySelectionChanged).not.toBeCalled();
    });

    it("calls onPropertySelectionChanged when property gets right clicked and right click selection is enabled", async () => {
      const onPropertySelectionChanged = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
          isPropertySelectionOnRightClickEnabled={true}
          onPropertySelectionChanged={onPropertySelectionChanged}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      fireEvent.contextMenu(clickableComponents[0]);

      expect(onPropertySelectionChanged).toHaveBeenCalled();
    });

    it("calls onPropertySelectionChanged once when property gets right clicked after left clicked and both left and right click selections are enabled", async () => {
      const onPropertySelectionChanged = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionOnRightClickEnabled={true}
          isPropertySelectionEnabled={true}
          onPropertySelectionChanged={onPropertySelectionChanged}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      const clickableComponent = clickableComponents[0];

      fireEvent.click(clickableComponent);
      fireEvent.contextMenu(clickableComponent);

      expect(onPropertySelectionChanged).toHaveBeenCalledTimes(2);
    });

    it("does not deselect if right clicked a 2nd time", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
          isPropertySelectionOnRightClickEnabled={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);
      const clickableComponent = clickableComponents[0];

      fireEvent.contextMenu(clickableComponent);
      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(1);

      fireEvent.contextMenu(clickableComponent);
      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(1);
    });

    it("deselects if left clicked after right clicked", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
          isPropertySelectionOnRightClickEnabled={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);
      const clickableComponent = clickableComponents[0];

      fireEvent.contextMenu(clickableComponent);
      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(1);

      fireEvent.click(clickableComponent);
      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(0);
    });

    it("does not call onPropertySelectionChanged when property gets right clicked and selection is disabled", async () => {
      const onPropertySelectionChanged = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true}
          isPropertySelectionOnRightClickEnabled={false}
          onPropertySelectionChanged={onPropertySelectionChanged}
          isOrientationFixed={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      fireEvent.contextMenu(clickableComponents[0]);

      expect(onPropertySelectionChanged).not.toBeCalled();
    });
  });

  describe("property hover", () => {
    it("enables property hovering", async () => {
      const { findByText, getByRole } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertyHoverEnabled={true}
        />
      );

      await findByText("Group 1");
      expect([...getByRole("presentation").classList.values()]).to.contain(
        "components--hoverable"
      );
    });
  });

  describe("property editing", () => {
    it("starts editor on click & commits on Enter", async () => {
      const spy = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertyEditingEnabled={true}
          onPropertyUpdated={spy}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      fireEvent.click(clickableComponents[0]);

      const cellEditors = container.querySelectorAll(
        "input.components-cell-editor"
      );
      expect(cellEditors.length).toEqual(1);

      fireEvent.keyDown(cellEditors[0], { key: "Enter" });

      await waitForPropertyGridLoad(container);

      await waitFor(() => expect(spy).toHaveBeenCalledOnce());
    });

    it("does not start editor on click if not selected yet", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true} // when this is true, user must click once to select then again to edit
          isPropertyEditingEnabled={true}
        />
      );

      await waitFor(() =>
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0)
      );

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);

      fireEvent.click(clickableComponents[0]);

      expect(
        container.querySelectorAll(".components-cell-editor").length
      ).toEqual(0);
    });

    it("starts editor on click if clicked before to select", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isPropertySelectionEnabled={true} // when this is true, user must click once to select then again to edit
          isPropertyEditingEnabled={true}
        />
      );

      await waitFor(() => {
        expect(
          container.querySelectorAll(".components--clickable").length
        ).to.be.greaterThan(0);
      });

      const clickableComponents = container.querySelectorAll(
        ".components--clickable"
      );
      expect(clickableComponents.length).to.be.greaterThan(0);
      fireEvent.click(clickableComponents[0]);

      expect(
        container.querySelectorAll(".components--selected").length
      ).toEqual(1);

      fireEvent.click(clickableComponents[0]);

      const cellEditors = container.querySelectorAll(
        "input.components-cell-editor"
      );
      expect(cellEditors.length).toEqual(1);

      const inputNode = cellEditors[0];
      fireEvent.keyDown(inputNode, { key: "Escape" });

      await waitForPropertyGridLoad(container);

      expect(
        container.querySelectorAll(".components-cell-editor").length,
        "Cell editor did not disappear after pressing Escape"
      ).toEqual(0);
    });
  });

  describe("context menu", () => {
    it("calls onPropertyContextMenu callback when right clicked on a property", async () => {
      const callback = vi.fn();
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          onPropertyContextMenu={callback}
          isOrientationFixed={true}
        />
      );

      await waitFor(() => {
        const clickableComponents = container.querySelectorAll(
          ".components-property-record--horizontal"
        );
        expect(clickableComponents.length).to.be.greaterThan(0);
        fireEvent.contextMenu(clickableComponents[0]);
      });

      expect(callback).toHaveBeenCalledOnce();
      expect(callback.mock.calls[0][0].propertyRecord).to.deep.eq(records[0]);
    });
  });

  describe("Nested border tests", () => {
    it("Wraps simple content in nested borders correctly", async () => {
      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          isOrientationFixed={true}
        />
      );

      await waitFor(() => {
        const clickableComponents = container.querySelectorAll(
          ".virtualized-grid-node-content-wrapper-item"
        );
        expect(clickableComponents.length).toEqual(3);

        expect(
          clickableComponents[0].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[1].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle.nested-border-bottom > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[2].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
      });
    });

    it("Wraps nested content in nested borders correctly", async () => {
      const parentCategory: PropertyCategory = {
        name: "ParentCategory",
        label: "Parent",
        expand: true,
      };
      const childCategory1: PropertyCategory = {
        name: "ChildCategory1",
        label: "Child",
        expand: true,
      };
      const childCategory2: PropertyCategory = {
        name: "ChildCategory2",
        label: "Child",
        expand: true,
      };
      parentCategory.childCategories = [childCategory1, childCategory2];
      dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async (): Promise<PropertyData> => ({
          label: PropertyRecord.fromString(faker.random.word()),
          description: faker.random.words(),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: [
              TestUtils.createArrayProperty(
                "testArray",
                [
                  TestUtils.createPrimitiveStringProperty(
                    "test1",
                    "Test",
                    "Test"
                  ),
                  TestUtils.createPrimitiveStringProperty(
                    "test2",
                    "Test",
                    "Test"
                  ),
                  TestUtils.createPrimitiveStringProperty(
                    "test3",
                    "Test",
                    "Test"
                  ),
                ],
                true
              ),
            ],
            [childCategory1.name]: [
              TestUtils.createPrimitiveStringProperty("test4", "Test", "Test"),
              TestUtils.createStructProperty(
                "testStruct",
                {
                  test5: TestUtils.createPrimitiveStringProperty(
                    "test5",
                    "Test",
                    "Test"
                  ),
                  test6: TestUtils.createPrimitiveStringProperty(
                    "test6",
                    "Test",
                    "Test"
                  ),
                  test7: TestUtils.createPrimitiveStringProperty(
                    "test7",
                    "Test",
                    "Test"
                  ),
                },
                true
              ),
            ],
            [childCategory2.name]: [],
          },
        }),
      };

      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={dataProvider}
          isOrientationFixed={true}
        />
      );

      await waitFor(() => {
        const clickableComponents = container.querySelectorAll(
          ".virtualized-grid-node"
        );
        expect(clickableComponents.length).toEqual(12);

        expect(
          clickableComponents[0].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .virtualized-grid-node-category"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[1].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[2].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[3].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[4].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();

        expect(
          clickableComponents[5].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .virtualized-grid-node-category"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[6].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[7].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[8].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[9].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .nested-border-middle > .virtualized-grid-node-content"
          )
        ).toBeTruthy();
        expect(
          clickableComponents[10].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle > .nested-border-middle.nested-border-bottom > .virtualized-grid-node-content"
          )
        ).toBeTruthy();

        expect(
          clickableComponents[11].querySelector(
            ".virtualized-grid-node-content-wrapper-item > .nested-border-middle.nested-border-bottom > .virtualized-grid-node-category"
          )
        ).toBeTruthy();
      });
    });
  });

  describe("Should virtualize property rendering", () => {
    it("Should render less than provided data, when provided 1000 records", async () => {
      const parentCategory: PropertyCategory = {
        name: "ParentCategory",
        label: "Parent",
        expand: true,
      };
      dataProvider = {
        onDataChanged: new PropertyDataChangeEvent(),
        getData: async (): Promise<PropertyData> => ({
          label: PropertyRecord.fromString(faker.random.word()),
          description: faker.random.words(),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 1000 }).map(
              (_, index) =>
                TestUtils.createPrimitiveStringProperty(
                  `test${index}`,
                  "Test",
                  "Test"
                )
            ),
          },
        }),
      };

      const { container } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={dataProvider}
          isOrientationFixed={true}
        />
      );

      await waitFor(() =>
        expect(container.querySelectorAll(".virtualized-grid-node").length)
          .to.be.greaterThan(0)
          .to.be.lessThan(1000)
      );
    });
  });

  it("handles onDataChanged event subscriptions when mounting, changing props and unmounting", () => {
    const evt1 = new PropertyDataChangeEvent();
    const providerMock1 = moq.Mock.ofType<IPropertyDataProvider>();
    providerMock1
      .setup(async (x) => x.getData())
      .returns(async () => ({
        label: PropertyRecord.fromString(""),
        categories: [],
        records: {},
      }));
    providerMock1.setup((x) => x.onDataChanged).returns(() => evt1);

    const evt2 = new PropertyDataChangeEvent();
    const providerMock2 = moq.Mock.ofType<IPropertyDataProvider>();
    providerMock2
      .setup(async (x) => x.getData())
      .returns(async () => ({
        label: PropertyRecord.fromString(""),
        categories: [],
        records: {},
      }));
    providerMock2.setup((x) => x.onDataChanged).returns(() => evt2);

    const { rerender, unmount } = render(
      <VirtualizedPropertyGridWithDataProvider
        {...defaultProps}
        dataProvider={providerMock1.object}
      />
    );
    expect(
      evt1.numberOfListeners,
      "listener should be added when component is mounted"
    ).toEqual(1);

    rerender(
      <VirtualizedPropertyGridWithDataProvider
        {...defaultProps}
        dataProvider={providerMock1.object}
      />
    );
    expect(
      evt1.numberOfListeners,
      "additional listener should not be added when data provider doesn't change"
    ).toEqual(1);

    rerender(
      <VirtualizedPropertyGridWithDataProvider
        {...defaultProps}
        dataProvider={providerMock2.object}
      />
    );
    expect(
      evt1.numberOfListeners,
      "listener should be removed when data provider is not used anymore"
    ).toEqual(0);
    expect(
      evt2.numberOfListeners,
      "listener should be added when data provider changes"
    ).toEqual(1);

    unmount();
    expect(
      evt2.numberOfListeners,
      "listener should be removed when component is unmounted"
    ).toEqual(0);
  });

  describe("Should handle scrolling to item", () => {
    const parentCategory: PropertyCategory = {
      name: "ParentCategory",
      label: "Parent",
      expand: true,
    };
    const highlightValue: HighlightingComponentProps & {
      filteredTypes: FilteredType[];
    } = {
      highlightedText: "test",
      activeHighlight: {
        highlightedItemIdentifier: "test2",
        highlightIndex: 0,
      },
      filteredTypes: [FilteredType.Value],
    };
    const highlightCategory: HighlightingComponentProps & {
      filteredTypes: FilteredType[];
    } = {
      highlightedText: "PARENT",
      activeHighlight: {
        highlightedItemIdentifier: "ParentCategory",
        highlightIndex: 0,
      },
      filteredTypes: [FilteredType.Category],
    };
    const highlightLabel: HighlightingComponentProps & {
      filteredTypes: FilteredType[];
    } = {
      highlightedText: "test",
      activeHighlight: {
        highlightedItemIdentifier: "test2",
        highlightIndex: 0,
      },
      filteredTypes: [FilteredType.Label],
    };
    const highlight1: HighlightingComponentProps & {
      filteredTypes?: FilteredType[];
    } = {
      highlightedText: "Test",
      activeHighlight: {
        highlightedItemIdentifier: "testtest",
        highlightIndex: 0,
      },
    };

    it("scrolls to highlighted value when highlight is updated", async () => {
      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 10 }).map((_, index) =>
              TestUtils.createPrimitiveStringProperty(
                `test${index}`,
                "Test",
                "Test"
              )
            ),
          },
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight1}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlightValue}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      expect(scrollToItemFake).toHaveBeenCalledWith(3);
    });

    it("scrolls to highlighted category when highlight is updated", async () => {
      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 10 }).map((_, index) =>
              TestUtils.createPrimitiveStringProperty(
                `test${index}`,
                "Test",
                "Test"
              )
            ),
          },
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight1}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlightCategory}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      expect(scrollToItemFake).toHaveBeenCalledWith(0);
    });

    it("scrolls to highlighted label when highlight is updated", async () => {
      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 10 }).map((_, index) =>
              TestUtils.createPrimitiveStringProperty(
                `test${index}`,
                "Test",
                "Test"
              )
            ),
          },
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight1}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlightLabel}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      expect(scrollToItemFake).toHaveBeenCalledWith(3);
    });

    it("doesn't scroll to item when activeMatch is not provided", async () => {
      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 10 }).map((_, index) =>
              TestUtils.createPrimitiveStringProperty(
                `test${index}`,
                "Test",
                "Test"
              )
            ),
          },
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight1}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={{ highlightedText: "test" }}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });
      expect(scrollToItemFake).not.toBeCalled();

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });
      expect(scrollToItemFake).not.toBeCalled();
    });

    it("doesn't scroll to item when there are no items in the grid", async () => {
      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [],
          records: {},
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlightValue}
        />
      );
      await waitFor(() =>
        container.querySelector(".components-virtualized-property-grid")
      );

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
        />
      );
      await waitFor(() =>
        container.querySelector(".components-virtualized-property-grid")
      );

      expect(scrollToItemFake).not.toBeCalled();
    });

    it("doesn't scroll to item if there is no matching item in the grid", async () => {
      const highlight3 = {
        highlightedText: "test",
        activeHighlight: {
          highlightedItemIdentifier: "falseTest2",
          highlightIndex: 0,
        },
        filteredTypes: [FilteredType.Value],
      };

      const providerMock = moq.Mock.ofType<IPropertyDataProvider>();
      providerMock
        .setup(async (x) => x.getData())
        .returns(async () => ({
          label: PropertyRecord.fromString(""),
          categories: [parentCategory],
          records: {
            [parentCategory.name]: Array.from({ length: 10 }).map((_, index) =>
              TestUtils.createPrimitiveStringProperty(
                `test${index}`,
                "Test",
                "Test"
              )
            ),
          },
        }));
      const evt = new PropertyDataChangeEvent();
      providerMock.setup((x) => x.onDataChanged).returns(() => evt);

      const scrollToItemFake = vi.fn();
      vi.spyOn(VariableSizeList.prototype, "scrollToItem").mockImplementation(
        scrollToItemFake
      );

      const { container, rerender } = render(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight1}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });

      rerender(
        <VirtualizedPropertyGridWithDataProvider
          {...defaultProps}
          dataProvider={providerMock.object}
          highlight={highlight3}
        />
      );
      await waitFor(() => getByTitle(container, "test9"), { container });
      expect(scrollToItemFake).not.toBeCalled();
    });
  });

  it("renders action buttons", async () => {
    const { queryByText } = render(
      <VirtualizedPropertyGridWithDataProvider
        {...defaultProps}
        actionButtonRenderers={[() => <div>Test Button</div>]}
        actionButtonWidth={30}
      />
    );

    await waitFor(() => expect(queryByText("Test Button")).to.not.be.null);
  });
});

describe("Learning Snippets", () => {
  describe("VirtualizedPropertyGridWithDataProvider", () => {
    it("renders with `SimplePropertyDataProvider`", async () => {
      // __PUBLISH_EXTRACT_START__ AppUI.VirtualizedPropertyGridWithDataProvider.UsageExample
      function MyPropertiesComponent() {
        // the component gets completely re-rendered, losing all its internal state, when data provider changes,
        // so we have to make it doesn't change unnecessarily
        const [dataProvider] = React.useState<IPropertyDataProvider>(() => {
          const provider = new SimplePropertyDataProvider();
          provider.addCategory({
            name: "my-category",
            label: "My Category",
            expand: true,
          });
          provider.addProperty(
            PropertyRecord.fromString("123", "My Property"),
            0
          );
          return provider;
        });

        // width and height should generally we computed using ResizeObserver API or one of its derivatives
        const [width] = React.useState(400);
        const [height] = React.useState(600);

        return (
          <VirtualizedPropertyGridWithDataProvider
            dataProvider={dataProvider}
            width={width}
            height={height}
          />
        );
      }
      // __PUBLISH_EXTRACT_END__
      const { getByText } = render(<MyPropertiesComponent />);
      await waitFor(() => getByText("My Property"));
    });
  });
});

describe("useVirtualizedPropertyGridLayoutStorage", () => {
  it("invokes `useElementsScrollStorage`", () => {
    const stub = vi.spyOn(
      useElementsScrollStorageModule,
      "useElementsScrollStorage"
    );
    renderHook(() => useVirtualizedPropertyGridLayoutStorage());

    expect(stub).toHaveBeenCalledWith("ReactWindow__VariableSizeList");
  });
});

async function waitForPropertyGridLoad(container: HTMLElement): Promise<void> {
  await waitFor(() => {
    container.querySelector(".components-virtualized-property-grid-loader") ===
      null;
  });
}
