/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** Copies the CSS style sheets from source document into the target document.
 * @internal
 */
export function copyStyles(
  targetDoc: Document,
  sourceDoc: Document = document
) {
  const styleSheets = Array.from(sourceDoc.styleSheets);
  styleSheets.forEach(({ ownerNode }) => {
    // Copy `link` and `style` elements.
    if (!ownerNode) return;
    const clonedNode = targetDoc.importNode(ownerNode, true);
    targetDoc.head.appendChild(clonedNode);
  });

  const adoptedStyleSheets = Array.from(sourceDoc.adoptedStyleSheets ?? []);
  adoptedStyleSheets.forEach((styleSheet) => {
    // Adopted stylesheet have no ownerNode and can't be shared between multiple documents.
    if (!targetDoc.defaultView) return;
    const newStyleSheet = new targetDoc.defaultView.CSSStyleSheet();
    Array.from(styleSheet.cssRules).forEach((rule, index) => {
      newStyleSheet.insertRule(rule.cssText, index);
    });
    targetDoc.adoptedStyleSheets.push(newStyleSheet);
  });

  // Copy sprites.
  const svgSymbolParent = sourceDoc.getElementById("__SVG_SPRITE_NODE__");
  if (svgSymbolParent) {
    targetDoc.body.appendChild(svgSymbolParent.cloneNode(true));
  }
}
