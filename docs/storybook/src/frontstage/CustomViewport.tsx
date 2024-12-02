/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from "react";
import type * as THREE from "three";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import {
  FrontstageUtilities,
  StagePanelLocation,
  StagePanelSection,
  StageUsage,
  StandardContentLayouts,
  ToolbarItemUtilities,
  ToolbarOrientation,
  ToolbarUsage,
  UiItemsProvider,
} from "@itwin/appui-react";
import { create } from "zustand";
import { Button } from "@itwin/itwinui-react";
import { SvgScale } from "@itwin/itwinui-icons-react";

const useThreeStore = create<{
  boxes: {
    scaled: boolean;
  }[];
}>(() => ({
  boxes: [],
}));

function Box(props: ThreeElements["mesh"] & { scaled: boolean }) {
  const ref = React.useRef<THREE.Mesh>(null!);
  const [hovered, hover] = React.useState(false);
  useFrame((state, delta) => (ref.current.rotation.x += delta));
  return (
    <mesh
      {...props}
      ref={ref}
      scale={props.scaled ? 1.5 : 1}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

export function CustomViewport() {
  const store = useThreeStore();
  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      {store.boxes.map((box, index) => {
        const x = 2 * index;
        return <Box position={[x, 0, 0]} scaled={box.scaled} />;
      })}
    </Canvas>
  );
}

export function createThreeFrontstage() {
  return FrontstageUtilities.createStandardFrontstage({
    id: createThreeFrontstage.id,
    usage: StageUsage.General,
    // TODO: tool settings uses IModelApp APIs
    hideToolSettings: true,
    contentGroupProps: {
      id: "three-content",
      layout: StandardContentLayouts.singleView,
      contents: [
        {
          id: "three-viewport",
          classId: "",
          content: <CustomViewport />,
        },
      ],
    },
  });
}
createThreeFrontstage.id = "three-frontstage";

export function createThreeProvider() {
  return {
    id: "three-items",
    getToolbarItems: () => [
      ToolbarItemUtilities.createActionItem({
        id: "scale-box",
        label: "Scale random box",
        icon: <SvgScale />,
        execute: () => {
          useThreeStore.setState((state) => {
            const boxToScale = Math.floor(Math.random() * state.boxes.length);
            return {
              boxes: state.boxes.map((box, index) => {
                if (index === boxToScale) {
                  return { ...box, scaled: !box.scaled };
                }
                return box;
              }),
            };
          });
        },
        layouts: {
          standard: {
            orientation: ToolbarOrientation.Horizontal,
            usage: ToolbarUsage.ContentManipulation,
          },
        },
      }),
    ],
    getWidgets: () => [
      {
        id: "w1",
        label: "Three.js boxes",
        content: (
          <>
            <Button
              onClick={() => {
                useThreeStore.setState((state) => ({
                  boxes: [
                    ...state.boxes,
                    { id: Math.random().toString(), scaled: false },
                  ],
                }));
              }}
            >
              Add box
            </Button>
          </>
        ),
        layouts: {
          standard: {
            location: StagePanelLocation.Right,
            section: StagePanelSection.Start,
          },
        },
      },
    ],
  } satisfies UiItemsProvider;
}
