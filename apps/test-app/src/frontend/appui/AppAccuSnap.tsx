/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { AccuSnap, SnapMode } from "@itwin/core-frontend";
import { create } from "zustand";

export const useAccuSnapStore = create<SnapMode>(
  () => SnapMode.NearestKeypoint
);

export class AppAccuSnap extends AccuSnap {
  public override getActiveSnapModes(): SnapMode[] {
    const snaps: SnapMode[] = [];

    const snapMode = useAccuSnapStore.getState();
    if ((snapMode & SnapMode.Bisector) === (SnapMode.Bisector as number))
      snaps.push(SnapMode.Bisector);
    if ((snapMode & SnapMode.Center) === (SnapMode.Center as number))
      snaps.push(SnapMode.Center);
    if (
      (snapMode & SnapMode.Intersection) ===
      (SnapMode.Intersection as number)
    )
      snaps.push(SnapMode.Intersection);
    if ((snapMode & SnapMode.MidPoint) === (SnapMode.MidPoint as number))
      snaps.push(SnapMode.MidPoint);
    if ((snapMode & SnapMode.Nearest) === (SnapMode.Nearest as number))
      snaps.push(SnapMode.Nearest);
    if (
      (snapMode & SnapMode.NearestKeypoint) ===
      (SnapMode.NearestKeypoint as number)
    )
      snaps.push(SnapMode.NearestKeypoint);
    if ((snapMode & SnapMode.Origin) === (SnapMode.Origin as number))
      snaps.push(SnapMode.Origin);
    if (
      (snapMode & SnapMode.PerpendicularPoint) ===
      (SnapMode.PerpendicularPoint as number)
    )
      snaps.push(SnapMode.PerpendicularPoint);
    if (
      (snapMode & SnapMode.TangentPoint) ===
      (SnapMode.TangentPoint as number)
    )
      snaps.push(SnapMode.TangentPoint);
    return snaps;
  }
}
