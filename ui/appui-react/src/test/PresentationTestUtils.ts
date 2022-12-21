/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as faker from "faker";
import * as moq from "typemoq";
import type { ECInstancesNodeKey, InstanceId, InstanceKey, NodeKey, RegisteredRuleset, Ruleset, SelectionScope, VariableValue } from "@itwin/presentation-common";
import { StandardNodeTypes } from "@itwin/presentation-common";
import type { DelayLoadedTreeNodeItem } from "@itwin/components-react";
import type { PrimitiveValue, PropertyDescription} from "@itwin/appui-abstract";
import { PropertyRecord, PropertyValueFormat } from "@itwin/appui-abstract";
import { PRESENTATION_TREE_NODE_KEY } from "@itwin/presentation-components";
import type { Id64String } from "@itwin/core-bentley";
import { BeEvent, Id64 } from "@itwin/core-bentley";
import type { IModelContentChangeEventArgs, IModelHierarchyChangeEventArgs, PresentationManager, RulesetManager, RulesetVariablesManager } from "@itwin/presentation-frontend";

const deepEqual = require("deep-equal"); // eslint-disable-line @typescript-eslint/no-var-requires

function nullable<T>(generator: () => T): T | undefined {
  if (faker.random.boolean())
    return undefined;
  return generator();
}

/**
 * @internal Used for testing only.
 */
export const createRandomSelectionScope = (): SelectionScope => ({
  id: faker.random.uuid(),
  label: faker.random.word(),
  description: nullable(() => faker.random.words()),
});

/**
 * @internal Used for testing only.
 */
export const createRandomId = (): Id64String => {
  return Id64.fromLocalAndBriefcaseIds(faker.random.number(), faker.random.number());
};

/**
 * @internal Used for testing only.
 */
const createRandomECInstanceId = (): InstanceId => {
  return createRandomId();
};

/**
 * @internal Used for testing only.
 */
export const createRandomECInstanceKey = (): InstanceKey => {
  return {
    className: faker.random.word(),
    id: createRandomECInstanceId(),
  };
};

/**
 * @internal Used for testing only.
 */
const createRandomECInstancesNodeKey = (instanceKeys?: InstanceKey[]): ECInstancesNodeKey => {
  instanceKeys = instanceKeys ?? [createRandomECInstanceKey(), createRandomECInstanceKey()];
  return {
    type: StandardNodeTypes.ECInstancesNode,
    version: 2,
    pathFromRoot: [faker.random.uuid(), faker.random.uuid()],
    instanceKeys,
  };
};

/**
 * @internal Used for testing only.
 */
export const createRandomTreeNodeItem = (key?: NodeKey, parentId?: string): DelayLoadedTreeNodeItem => {
  const node = {
    id: faker.random.uuid(),
    parentId,
    label: PropertyRecord.fromString(faker.random.word()),
    description: faker.random.words(),
    hasChildren: faker.random.boolean(),
  };
  (node as any)[PRESENTATION_TREE_NODE_KEY] = key ? key : createRandomECInstancesNodeKey();
  return node;
};

/**
 * @internal Used for testing only.
 */
export const createRandomPropertyRecord = (): PropertyRecord => {
  const value: PrimitiveValue = {
    valueFormat: PropertyValueFormat.Primitive,
    value: faker.random.word(),
    displayValue: faker.random.words(),
  };
  const descr: PropertyDescription = {
    typename: "string",
    name: faker.random.word(),
    displayLabel: faker.random.word(),
  };
  return new PropertyRecord(value, descr);
};

/**
 * @internal Used for testing only. typemoq matcher for deep equality
 */
export const deepEquals = <T>(expected: T) => {
  return moq.It.is((actual: T) => deepEqual(actual, expected));
};

/**
 * @internal Used for testing only.
 */
export const mockPresentationManager = () => {
  const onRulesetModified = new BeEvent<(curr: RegisteredRuleset, prev: Ruleset) => void>();
  const rulesetManagerMock = moq.Mock.ofType<RulesetManager>();
  rulesetManagerMock.setup((x) => x.onRulesetModified).returns(() => onRulesetModified);

  const onRulesetVariableChanged = new BeEvent<(variableId: string, prevValue: VariableValue, currValue: VariableValue) => void>();
  const rulesetVariablesManagerMock = moq.Mock.ofType<RulesetVariablesManager>();
  rulesetVariablesManagerMock.setup((x) => x.onVariableChanged).returns(() => onRulesetVariableChanged);

  const onIModelHierarchyChanged = new BeEvent<(args: IModelHierarchyChangeEventArgs) => void>();
  const onIModelContentChanged = new BeEvent<(args: IModelContentChangeEventArgs) => void>();
  const presentationManagerMock = moq.Mock.ofType<PresentationManager>();
  presentationManagerMock.setup((x) => x.onIModelHierarchyChanged).returns(() => onIModelHierarchyChanged);
  presentationManagerMock.setup((x) => x.onIModelContentChanged).returns(() => onIModelContentChanged);
  presentationManagerMock.setup((x) => x.rulesets()).returns(() => rulesetManagerMock.object);
  presentationManagerMock.setup((x) => x.vars(moq.It.isAny())).returns(() => rulesetVariablesManagerMock.object);

  return {
    rulesetsManager: rulesetManagerMock,
    rulesetVariablesManager: rulesetVariablesManagerMock,
    presentationManager: presentationManagerMock,
  };
};
