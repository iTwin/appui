/*---------------------------------------------------------------------------------------------
* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
* See LICENSE.md in the project root for license terms and full copyright notice.
*--------------------------------------------------------------------------------------------*/
import * as faker from "faker";
import * as moq from "typemoq";
import { BeEvent, Id64, Id64String } from "@itwin/core-bentley";
import { InstanceId, InstanceKey, RegisteredRuleset, Ruleset, SelectionScope, VariableValue } from "@itwin/presentation-common";
import {
  IModelContentChangeEventArgs, IModelHierarchyChangeEventArgs, PresentationManager, RulesetManager, RulesetVariablesManager,
} from "@itwin/presentation-frontend";

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
