/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useEffect, useRef } from "react";

/**
 * Hook to get the position of a referenced element.
 */
export function usePosition(refElement: React.RefObject<HTMLElement>) {
  const position = useRef<{ left: number; bottom: number }>({
    left: 0,
    bottom: 0,
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      if (refElement.current) {
        const currentPositionOfButton =
          refElement.current.getBoundingClientRect();
        position.current = {
          left: currentPositionOfButton.left,
          bottom: currentPositionOfButton.bottom,
        };
      }
    }

    window.addEventListener("resize", updatePosition);
    updatePosition();

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [refElement]);

  return { ref, position };
}
