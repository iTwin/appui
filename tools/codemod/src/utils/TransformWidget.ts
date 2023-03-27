import { JSCodeshift, ASTPath, JSXElement, MemberExpression, ObjectExpression, ObjectProperty, Collection } from "jscodeshift";
import { ObjectExpressionCollection, useObjectExpression } from "./ObjectExpression";
import { ConfigExpression, getObjectProperty, jsxElementToUniFormat, uniFormatToObjectExpression } from "./TransformUtils";

export function transformWidget(j: JSCodeshift, widget: ASTPath<JSXElement>): ConfigExpression { // TODO: registerMethod
  const uni = jsxElementToUniFormat(j, widget);
  const widgetObj = uniFormatToObjectExpression(j, uni);

  // Add ---------------------------
  // labelKey <- labelKey
  // tooltipKey <- tooltipKey
  // preferredPanelSize <- preferredPanelSize
  // id <- id
  // allowedPanels <- allowedPanelTargets
  // badge <- badgeType
  // canPopout <- canPopout
  // canFloat <- isFloatingStateSupported / isFloatingStateWindowResizable, floatingContainerId, defaultFloatingPosition, defaultFloatingSize, hideWithUiWhenFloating
  // defaultState <- defaultState
  // content <- element
  // icon <- iconSpec
  // label <- label
  // priority <- priority
  // tooltip <- tooltip

  // Ignore ------------------------
  // onWidgetStateChanged
  // saveTransientState
  // restoreTransientState
  // internalData
  // applicationData
  // control
  // isFreeform
  // isToolSettings
  // isStatusBar
  // fillZone
  // syncEventIds
  // stateFunc

  replaceWidgetObjectExpression(j, j(widgetObj));
  return { ...widgetObj, configName: uni.name };
}

export function replaceWidgetObjectExpression(j: JSCodeshift, widget: Collection<ObjectExpression>) {
  useObjectExpression(j);
  const objectToProperties = new Map<ASTPath<ObjectExpression>, ObjectProperty[]>();
  (widget as ObjectExpressionCollection)
    .removeProperty("key", (_path, property) => {
      const idProp = getObjectProperty(j, _path.node, "id");
      if (idProp === undefined && property.type === "ObjectProperty") {
        const newIdProp = j.objectProperty(j.identifier("id"), property.value);
        _path.node.properties.push(newIdProp);
      }
    })
    .removeProperty("onWidgetStateChanged")
    .removeProperty("saveTransientState")
    .removeProperty("restoreTransientState")
    .removeProperty("internalData")
    .removeProperty("applicationData")
    .removeProperty("control")
    .removeProperty("isFreeform")
    .removeProperty("isToolSettings")
    .removeProperty("isStatusBar")
    .removeProperty("fillZone")
    .removeProperty("syncEventIds")
    .removeProperty("stateFunc")
    .renameProperty("iconSpec", "icon")
    .renameProperty("isFloatingStateSupported", "canFloat")
    .renameProperty("badgeType", "badge")
    .renameProperty("element", "content")
    .renameProperty("allowedPanelTargets", "allowedPanels", (_path, property) => {
      if (property.type !== "ObjectProperty")
        return;

      const allowedPanelsExpr = property.value;
      if (allowedPanelsExpr.type !== "ArrayExpression")
        return;

      const newElements: MemberExpression[] = [];
      j(allowedPanelsExpr).find(j.Literal).forEach((literal) => {
        const value = literal.value.value;
        switch (value) {
          case "left":
          case "right":
          case "bottom":
          case "top": {
            const capitalized = value.charAt(0).toUpperCase() + value.slice(1);
            newElements.push(j.memberExpression(j.identifier("StagePanelLocation"), j.identifier(capitalized)));
            break;
          }
        }
      });
      allowedPanelsExpr.elements = newElements;
      // TODO: add `StagePanelLocation` to import declaration.
    })
    .removeProperty("isFloatingStateWindowResizable", handleCanFloatProperty(j, objectToProperties, "isResizable"))
    .removeProperty("floatingContainerId", handleCanFloatProperty(j, objectToProperties, "containerId"))
    .removeProperty("defaultFloatingPosition", handleCanFloatProperty(j, objectToProperties, "defaultPosition"))
    .removeProperty("defaultFloatingSize", handleCanFloatProperty(j, objectToProperties, "defaultSize"))
    .removeProperty("hideWithUiWhenFloating", handleCanFloatProperty(j, objectToProperties, "hideWithUi"));

  objectToProperties.forEach((properties, objectExpression) => {
    if (properties.length === 0)
      return;
    const canFloat = objectExpression.value.properties.find((property) => {
      if (property.type === "ObjectProperty" && property.key.type === "Identifier" && property.key.name === "canFloat")
        return true;
      return false;
    }) as ObjectProperty | undefined;

    if (!canFloat) {
      const newCanFloat = j.objectProperty(j.identifier("canFloat"), j.objectExpression(properties));
      objectExpression.value.properties.push(newCanFloat);
      return;
    }

    if (canFloat.value.type === "BooleanLiteral" && canFloat.value.value === false)
      return;
    canFloat.value = j.objectExpression(properties);
  });
}

function handleCanFloatProperty(j: JSCodeshift, objectToProperties: Map<ASTPath<ObjectExpression>, ObjectProperty[]>, canFloatProperty: string): Parameters<ObjectExpressionCollection["removeProperty"]>[1] {
  return (path, property) => {
    let objectProperties = objectToProperties.get(path);
    if (!objectProperties) {
      objectProperties = [];
      objectToProperties.set(path, objectProperties);
    }

    if (property.type === "ObjectProperty") {
      const newProperty = j.objectProperty(j.identifier(canFloatProperty), property.value);
      objectProperties.push(newProperty);
    }
  };
}