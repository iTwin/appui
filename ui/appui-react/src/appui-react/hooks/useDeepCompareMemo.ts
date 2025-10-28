import { useMemo, useRef } from "react";

/**
 * Performs a deep comparison between two objects to determine if they are equivalent.
 *
 * @param {any} obj1 - The first object to compare.
 * @param {any} obj2 - The second object to compare.
 * @returns {boolean} - Returns true if the objects are equivalent, otherwise false.
 */
function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

/**
 * Custom hook that returns a memoized value that only changes if the deep comparison of the value changes.
 *
 * @param {T} value - The value to be memoized.
 * @returns {T} - The memoized value.
 *
 * @example
 * ```tsx
 * import React, { useState } from "react";
 * import { useDeepCompareMemo } from "./useDeepCompareMemo";
 *
 * export const MyComponent = () => {
 *   const [data, setData] = useState({ key: 'value' });
 *   const memoizedData = useDeepCompareMemo(data);
 *
 *   return (
 *     <div>
 *       {JSON.stringify(memoizedData)}
 *     </div>
 *   );
 * };
 * ```
 */
export function useDeepCompareMemo<T>(value: T): T {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  return useMemo(() => ref.current, []);
}
