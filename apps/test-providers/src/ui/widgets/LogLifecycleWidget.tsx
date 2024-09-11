/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { useTransientState } from "@itwin/appui-react";

export function LogLifecycleWidget({ id }: { id: string }) {
  React.useEffect(() => {
    console.log(`Widget ${id} mount`); // eslint-disable-line no-console
    return () => {
      console.log(`Widget ${id} unmount`); // eslint-disable-line no-console
    };
  }, [id]);
  useTransientState(
    () => {
      console.log(`Widget ${id} save transient state`); // eslint-disable-line no-console
    },
    () => {
      console.log(`Widget ${id} restore transient state`); // eslint-disable-line no-console
    }
  );
  return <div>Widget {id} content</div>;
}
