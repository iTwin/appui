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
  GeometricElementProps,
  JsonGeometryStream,
  PlacementProps,
} from "@itwin/core-common";
import {
  AccuDrawHintBuilder,
  BeButton,
  BeButtonEvent,
  LengthDescription,
  Viewport,
} from "@itwin/core-frontend";
import { Arc3d, Point3d, YawPitchRollAngles } from "@itwin/core-geometry";
import { Id64String } from "@itwin/core-bentley";
import {
  DialogItem,
  DialogProperty,
  DialogPropertySyncItem,
  PropertyDescriptionHelper,
} from "@itwin/appui-abstract";

/** Tool to test dynamic graphics and tool settings.
 * Will not insert an element, but will show a circle at the point clicked.
 */
class CreateCircleToolBase extends CreateElementWithDynamicsTool {
  public static override toolId = "CreateCircle";
  private _point?: Point3d;
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
    return this.useRadiusProperty.value;
  }

  private _radiusProperty: DialogProperty<number> | undefined;
  public get radiusProperty() {
    if (!this._radiusProperty)
      this._radiusProperty = new DialogProperty<number>(
        new LengthDescription("radius", "Radius"),
        1,
        undefined
      );
    return this._radiusProperty;
  }

  public get radius(): number {
    return this.radiusProperty.value;
  }

  public override get targetCategory(): Id64String {
    if (!this.briefcase) {
      for (const category of this.targetView?.view.categorySelector
        .categories ?? []) {
        return category;
      }
    }
    return super.targetCategory;
  }

  public override get targetModelId(): Id64String {
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

  protected override getPlacementProps(): PlacementProps | undefined {
    const vp = this.targetView;
    if (!vp || !this._point) {
      return undefined;
    }

    const origin = this._point;
    const angles = new YawPitchRollAngles();
    const matrix = AccuDrawHintBuilder.getCurrentRotation(vp, true, true);
    ElementGeometry.Builder.placementAnglesFromPoints(
      [this._point],
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

  protected override getElementProps(
    placement: PlacementProps
  ): GeometricElementProps | undefined {
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
    if (!isDynamics) {
      this._point = ev.point.clone();
    }

    if (!this._point) return;
    this._current = Arc3d.createXY(this._point, this.radius);
  }

  protected override isComplete(ev: BeButtonEvent): boolean {
    return ev.button === BeButton.Reset && !!this._point;
  }

  protected override async cancelPoint(ev: BeButtonEvent): Promise<boolean> {
    if (this.isComplete(ev)) {
      await this.createElement();
    }
    return true;
  }

  public override async onRestartTool(): Promise<void> {
    const tool = new CreateCircleTool();
    if (!(await tool.run())) return this.exitTool();
  }

  public override supplyToolSettingsProperties(): DialogItem[] | undefined {
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
    if (!this.changeToolSettingPropertyValue(updatedValue)) return false;
    return true;
  }

  protected override getToolSettingPropertyLocked(
    property: DialogProperty<any>
  ): DialogProperty<any> | undefined {
    if (property === this.useRadiusProperty) return this.radiusProperty;
    return undefined;
  }
}

export const CreateCircleTool = ToolUtilities.defineIcon(
  CreateCircleToolBase,
  <SvgCircle />
);
