/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@itwin/itwinui-layouts-react";
import { App } from "../frontend/App";
import {
  useFeatureOverrideParams,
  useSyncFrontstageParam,
} from "../frontend/SearchParams";
import { createCesiumFrontstage } from "../frontend/appui/frontstages/CesiumFrontstage";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import "../userWorker";

export const Route = createLazyFileRoute("/cesium")({
  component: Blank,
});

function Blank() {
  useSyncFrontstageParam({
    defaultFrontstageId: createCesiumFrontstage.stageId,
  });
  const featureOverrides = useFeatureOverrideParams();
  return (
    <PageLayout.Content>
      {/* <CodeWidget /> */}
      <App featureOverrides={featureOverrides} />
    </PageLayout.Content>
  );
}

// function CodeWidget() {
//   const [editor, setEditor] =
//     React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
//   const monacoEl = React.useRef(null);

//   React.useEffect(() => {
//     if (monacoEl) {
//       setEditor((editor) => {
//         if (editor) return editor;

//         return monaco.editor.create(monacoEl.current!, {
//           value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
//             "\n"
//           ),
//           language: "typescript",
//         });
//       });
//     }

//     return () => editor?.dispose();
//   }, [monacoEl.current]);

//   return <div style={{ height: "100vh", width: "100vw" }} ref={monacoEl}></div>;
// }
