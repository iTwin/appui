/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import type { JSCodeshift, Collection } from "jscodeshift";

function getFirstNode(j: JSCodeshift, root: Collection) {
  return root.find(j.Program).get("body", 0).node;
}

// https://github.com/facebook/jscodeshift/blob/main/recipes/retain-first-comment.md
export default function retainFirstComment(j: JSCodeshift, root: Collection, transform: () => void) {
  const initialFirstNode = getFirstNode(j, root);
  const { comments } = initialFirstNode;

  transform();

  // If the first node has been modified or deleted, reattach the comments
  const firstNode = getFirstNode(j, root);
  if (initialFirstNode !== firstNode) {
    firstNode.comments = comments;
  }
}
