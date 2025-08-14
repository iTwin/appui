import { r as reactExports, B as Box, c as classnames, k as cloneElementWithRef, i as useId } from "./iframe-CxthnN3M.js";
import { L as Label, Q as StatusMessage, V as InputWithDecorations, X as InputWithIcon, Y as Select, Z as Input, _ as Textarea, $ as ComboBox } from "./appui-react-ARYPQBMf.js";
const InputGrid = reactExports.forwardRef((props, ref) => {
  let { children: childrenProp, className, labelPlacement, ...rest } = props;
  let children = useChildrenWithIds(childrenProp);
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-input-grid", className),
      "data-iui-label-placement": labelPlacement,
      ref,
      ...rest
    },
    children
  );
});
let useChildrenWithIds = (children) => {
  let { labelId, inputId, messageId } = useSetup(children);
  return reactExports.useMemo(
    () => reactExports.Children.map(children, (child) => {
      if (!reactExports.isValidElement(child)) return child;
      if (child.type === Label || "label" === child.type)
        return cloneElementWithRef(child, (child2) => ({
          ...child2.props,
          htmlFor: child2.props.htmlFor || inputId,
          id: child2.props.id || labelId
        }));
      if (child.type === StatusMessage)
        return cloneElementWithRef(child, (child2) => ({
          ...child2.props,
          id: child2.props.id || messageId
        }));
      if (isInput(child) || child.type === InputWithDecorations || child.type === InputWithIcon)
        return handleCloningInputs(child, {
          labelId,
          inputId,
          messageId
        });
      return child;
    }),
    [children, inputId, labelId, messageId]
  );
};
let useSetup = (children) => {
  let idPrefix = useId();
  let labelId;
  let inputId;
  let messageId;
  let hasLabel = false;
  let hasSelect = false;
  let findInputId = (child) => {
    var _a;
    if (!reactExports.isValidElement(child)) return;
    if (child.type === ComboBox)
      return ((_a = child.props.inputProps) == null ? void 0 : _a.id) || `${idPrefix}--input`;
    if (child.type !== Select) return child.props.id || `${idPrefix}--input`;
  };
  reactExports.Children.forEach(children, (child) => {
    if (!reactExports.isValidElement(child)) return;
    if (child.type === Label || "label" === child.type) {
      hasLabel = true;
      labelId || (labelId = child.props.id || `${idPrefix}--label`);
    }
    if (child.type === StatusMessage)
      messageId || (messageId = child.props.id || `${idPrefix}--message`);
    if (child.type === InputWithDecorations || child.type === InputWithIcon)
      reactExports.Children.forEach(child.props.children, (child2) => {
        if (isInput(child2)) inputId || (inputId = findInputId(child2));
      });
    else if (isInput(child)) inputId || (inputId = findInputId(child));
    if (child.type === Select) hasSelect = true;
  });
  return {
    labelId: hasSelect ? labelId : void 0,
    inputId: hasLabel && !hasSelect ? inputId : void 0,
    messageId
  };
};
let handleCloningInputs = (child, { labelId, inputId, messageId }) => {
  let inputProps = (props = {}) => {
    let ariaDescribedBy = [props["aria-describedby"], messageId].filter(Boolean).join(" ");
    return {
      ...props,
      ...child.type !== Select && {
        id: props.id || inputId
      },
      "aria-describedby": (ariaDescribedBy == null ? void 0 : ariaDescribedBy.trim()) || void 0
    };
  };
  let cloneInput = (child2) => {
    if (child2.type === ComboBox)
      return cloneElementWithRef(child2, (child3) => ({
        inputProps: inputProps(child3.props.inputProps)
      }));
    if (child2.type === Select)
      return cloneElementWithRef(child2, (child3) => ({
        triggerProps: {
          "aria-labelledby": labelId,
          ...inputProps(child3.props.triggerProps)
        }
      }));
    return cloneElementWithRef(child2, (child3) => inputProps(child3.props));
  };
  if (child.type === InputWithDecorations || child.type === InputWithIcon)
    return cloneElementWithRef(child, (child2) => ({
      children: reactExports.Children.map(child2.props.children, (child3) => {
        if (reactExports.isValidElement(child3) && isInput(child3))
          return cloneInput(child3);
        return child3;
      })
    }));
  return cloneInput(child);
};
let isInput = (child) => reactExports.isValidElement(child) && ("input" === child.type || "textarea" === child.type || "select" === child.type || child.type === Input || child.type === Textarea || child.type === InputWithDecorations.Input || child.type === Select || child.type === ComboBox);
const LabeledSelect = reactExports.forwardRef((props, forwardedRef) => {
  let {
    className,
    disabled = false,
    label,
    message,
    status,
    svgIcon,
    displayStyle = "default",
    style,
    required = false,
    wrapperProps,
    labelProps,
    messageContentProps,
    messageIconProps,
    ...rest
  } = props;
  return reactExports.createElement(
    InputGrid,
    {
      labelPlacement: displayStyle,
      "data-iui-status": status,
      ...wrapperProps
    },
    label && reactExports.createElement(
      Label,
      {
        as: "div",
        required,
        disabled,
        ...labelProps
      },
      label
    ),
    reactExports.createElement(Select, {
      disabled,
      className,
      style,
      required: props.native ? required : void 0,
      ...rest,
      ref: forwardedRef,
      ...{
        styleType: "default"
      }
    }),
    "string" == typeof message ? reactExports.createElement(
      StatusMessage,
      {
        status,
        startIcon: svgIcon,
        iconProps: messageIconProps,
        contentProps: messageContentProps
      },
      message
    ) : message
  );
});
export {
  LabeledSelect as L
};
