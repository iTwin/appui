/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { CreateElementWithDynamicsTool } from "@itwin/editor-frontend";
import { ToolUtilities } from "@itwin/imodel-components-react";
import { SvgCircle } from "@itwin/itwinui-icons-react";
import {
  Code,
  ElementGeometry,
  FlatBufferGeometryStream,
  JsonGeometryStream,
  PlacementProps,
} from "@itwin/core-common";
import {
  AccuDrawHintBuilder,
  BeButton,
  BeButtonEvent,
  IModelApp,
  LengthDescription,
  Viewport,
} from "@itwin/core-frontend";
import { Arc3d, Point3d, YawPitchRollAngles } from "@itwin/core-geometry";
import {
  DialogProperty,
  DialogPropertySyncItem,
  PropertyDescriptionHelper,
} from "@itwin/appui-abstract";

/** Tool to test dynamic graphics and tool settings.
 * Will not insert an element, but will show a circle at the point clicked.
 */
class CreateCircleToolBase extends CreateElementWithDynamicsTool {
  public static override toolId = "CreateCircle";
  private _points: Point3d[] = [];
  private _current?: Arc3d;

  private _useRadiusProperty: DialogProperty<boolean> | undefined;
  public get useRadiusProperty() {
    if (!this._useRadiusProperty)
      this._useRadiusProperty = new DialogProperty(
        PropertyDescriptionHelper.buildLockPropertyDescription("useRadius"),
        false
      );
    return this._useRadiusProperty;
  }

  public get useRadius() {
    if (this._useEnteredRadius) return true;
    return this.useRadiusProperty.value;
  }

  private _radiusProperty: DialogProperty<number> | undefined;
  public get radiusProperty() {
    if (!this._radiusProperty) {
      this._radiusProperty = new DialogProperty(
        new LengthDescription("radius", "Radius"),
        1
      );
    }

    return this._radiusProperty;
  }

  public get radius() {
    return this.radiusProperty.value;
  }

  // This is set to true when the user enters a radius value in the tool settings and is reset on mouse motion.
  private _useEnteredRadius = false;

  public override get targetCategory() {
    if (!this.briefcase) {
      for (const category of this.targetView?.view.categorySelector
        .categories ?? []) {
        return category;
      }
    }
    return super.targetCategory;
  }

  public override get targetModelId() {
    if (!this.briefcase) return "";
    return super.targetModelId;
  }

  public override isCompatibleViewport(
    vp: Viewport | undefined,
    isSelectedViewChange: boolean
  ) {
    const iModel = vp?.iModel;
    if (iModel && !iModel.isBriefcaseConnection()) {
      this.targetView = vp;
      return true;
    }

    return super.isCompatibleViewport(vp, isSelectedViewChange);
  }

  protected override getPlacementProps() {
    const vp = this.targetView;
    if (!vp || this._points.length === 0) {
      return undefined;
    }

    const origin = this._points[0];
    const angles = new YawPitchRollAngles();
    const matrix = AccuDrawHintBuilder.getCurrentRotation(vp, true, true);
    ElementGeometry.Builder.placementAnglesFromPoints(
      [origin],
      matrix?.getColumn(2),
      angles
    );
    return { origin, angles };
  }

  protected override getGeometryProps(
    placement: PlacementProps
  ): JsonGeometryStream | FlatBufferGeometryStream | undefined {
    if (!this._current) {
      return undefined;
    }

    const builder = new ElementGeometry.Builder();
    builder.setLocalToWorldFromPlacement(placement);
    if (!builder.appendGeometryQuery(this._current)) {
      return undefined;
    }

    return { format: "flatbuffer", data: builder.entries };
  }

  protected override getElementProps(placement: PlacementProps) {
    return {
      classFullName: "Generic:PhysicalObject",
      model: this.targetModelId,
      category: this.targetCategory,
      code: Code.createEmpty(),
      placement,
    };
  }

  public override async updateElementData(
    ev: BeButtonEvent,
    isDynamics: boolean
  ) {
    // TODO: lock -> mouse move -> unlock should use last radius.
    // This is simulated to generate graphics. Use entered radius until the mouse moves.
    if (!simulated) {
      this._useEnteredRadius = false;
    }

    if (!isDynamics) {
      if (this.useRadius) {
        this._points = [ev.point.clone()];
      } else {
        this._points.push(ev.point.clone());
      }
    }

    if (this._points.length === 0) return;

    const center = this._points[0];
    const edge = this._points[1] ?? ev.point;

    const radius = this.useRadius
      ? this.radius
      : Math.max(1, center.distance(edge));

    if (radius !== this.radius) {
      this.radiusProperty.value = radius;
      this.syncToolSettingsProperties([this.radiusProperty.syncItem]);
    }

    this._current = Arc3d.createXY(center, radius);
  }

  protected override isComplete(ev: BeButtonEvent) {
    if (this.useRadius) {
      return ev.button === BeButton.Reset && this._points.length > 0;
    }

    return ev.button === BeButton.Reset && this._points.length > 1;
  }

  protected override async cancelPoint(ev: BeButtonEvent) {
    if (this.isComplete(ev)) {
      await this.createElement();
    }
    return true;
  }

  public override async onRestartTool() {
    const tool = new CreateCircleTool();
    if (!(await tool.run())) return this.exitTool();
  }

  public override supplyToolSettingsProperties() {
    this.initializeToolSettingPropertyValues([
      this.useRadiusProperty,
      this.radiusProperty,
    ]);

    const useRadiusLock = this.useRadiusProperty.toDialogItem({
      rowPriority: 0,
      columnIndex: 0,
    });
    return [
      this.radiusProperty.toDialogItem(
        { rowPriority: 0, columnIndex: 0 },
        useRadiusLock
      ),
    ];
  }

  public override async applyToolSettingPropertyChange(
    updatedValue: DialogPropertySyncItem
  ): Promise<boolean> {
    if (updatedValue.propertyName === this.radiusProperty.name) {
      this._useEnteredRadius = true;
    }

    if (!this.changeToolSettingPropertyValue(updatedValue)) return false;
    return true;
  }

  /** @internal */
  protected override syncToolSettingPropertyValue(
    property: DialogProperty<any>
  ) {
    // Avoid syncing the lock and disabled states: https://github.com/iTwin/itwinjs-core/blob/74603f8bd278e03a1dae74e827b51bb6f0880f85/core/frontend/src/tools/Tool.ts#L791
    this.syncToolSettingsProperties([property.syncItem]);
  }

  protected override getToolSettingPropertyLocked(
    property: DialogProperty<any>
  ): DialogProperty<any> | undefined {
    if (property === this.useRadiusProperty) return this.radiusProperty;
    return undefined;
  }

  public override async run(...args: any[]) {
    determineSimulatedEvent();
    return super.run(...args);
  }
}

// Workaround to determine if the motion event is simulated.
let simulated = false;
let isDetermined = false;
function determineSimulatedEvent() {
  if (isDetermined) return;

  isDetermined = true;
  const simulateMotionEvent = IModelApp.toolAdmin.simulateMotionEvent;
  IModelApp.toolAdmin.simulateMotionEvent = (...args) => {
    simulated = true;
    simulateMotionEvent.bind(IModelApp.toolAdmin)(...args);
    simulated = false;
  };
}

export const CreateCircleTool = ToolUtilities.defineIcon(
  CreateCircleToolBase,
  <SvgCircle />
);
