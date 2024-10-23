/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Logger } from "@itwin/core-bentley";
import { UiFramework } from "../UiFramework.js";

/** Copies the CSS style sheets from source document into the target document.
 * @internal
 */
export async function copyStyles(
  targetDoc: Document,
  sourceDoc: Document = document
) {
  const promises: Array<Promise<void>> = [];
  const styleSheets = Array.from(sourceDoc.styleSheets);
  styleSheets.forEach(({ ownerNode }) => {
    // Copy `link` and `style` elements.
    if (!ownerNode) return;
    const clonedNode = targetDoc.importNode(ownerNode, true);
    if (
      clonedNode instanceof
        (targetDoc.defaultView?.HTMLLinkElement ?? HTMLLinkElement) &&
      clonedNode.href
    ) {
      promises.push(
        new Promise((resolve) => {
          clonedNode.onload = () => {
            resolve();
          };
          clonedNode.onerror = () => {
            Logger.logError(
              UiFramework.loggerCategory("copyStyles"),
              `Failed to load external resource`,
              {
                href: clonedNode.href,
              }
            );
            resolve();
          };
        })
      );
    }
    targetDoc.head.appendChild(clonedNode);
  });

  const adoptedStyleSheets = Array.from(sourceDoc.adoptedStyleSheets ?? []);
  adoptedStyleSheets.forEach((styleSheet) => {
    // Adopted stylesheet have no ownerNode and can't be shared between multiple documents.
    if (!targetDoc.defaultView) return;
    const newStyleSheet = new targetDoc.defaultView.CSSStyleSheet();
    promises.push(
      newStyleSheet.replace(stringifyStyleSheet(styleSheet)).then(() => {})
    );
    targetDoc.adoptedStyleSheets.push(newStyleSheet);
  });

  // Copy sprites.
  const svgSymbolParent = sourceDoc.getElementById("__SVG_SPRITE_NODE__");
  if (svgSymbolParent) {
    targetDoc.body.appendChild(svgSymbolParent.cloneNode(true));
  }

  return Promise.all(promises).then(() => {});
}

function stringifyStyleSheet(stylesheet: CSSStyleSheet) {
  return Array.from(stylesheet.cssRules)
    .map((rule) => rule.cssText)
    .join("\n");
}
