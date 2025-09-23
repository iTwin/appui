import { useEffect, useRef } from "react";

/**
 * Hook to get the position of a referenced element.
 */
export function usePosition(refElement: React.RefObject<HTMLElement>) {
  const position = useRef<{ left: number; top: number }>({ left: 0, top: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updatePosition() {
      if (refElement.current) {
        const currentPositionOfButton = refElement.current.getBoundingClientRect();
        position.current = { left: currentPositionOfButton.left, top: currentPositionOfButton.bottom };
      }
    }
    updatePosition();
  }, [refElement]);

  return { ref, position };
}
