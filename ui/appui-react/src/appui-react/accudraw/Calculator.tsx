/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module AccuDraw
 */

import "./Calculator.scss";
import classnames from "classnames";
import * as React from "react";
import { Key } from "ts-key-enum";
import type { OnCancelFunc, OnNumberCommitFunc } from "@itwin/appui-abstract";
import type { CommonProps } from "@itwin/core-react";
import { Icon, IconInput } from "@itwin/core-react";
import { Button, Input } from "@itwin/itwinui-react";
import { CalculatorEngine, CalculatorOperator } from "./CalculatorEngine.js";
import { SquareButton } from "./SquareButton.js";
import { SvgCheckmark, SvgRemove } from "@itwin/itwinui-icons-react";
import { SvgBackspace } from "../icons/SvgBackspace.js";

type SquareButtonProps = React.ComponentProps<typeof SquareButton>;

/** @public */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export interface CalculatorProps extends CommonProps {
  /** Initial value */
  initialValue?: number;
  /** Icon to display beside the calculated result */
  resultIcon?: React.ReactNode;
  /** A function to be run when the OK button is clicked */
  onOk?: OnNumberCommitFunc;
  /** A function to be run when the Cancel button is clicked */
  onCancel?: OnCancelFunc;

  /** @internal Calculator state machine. */
  engine: CalculatorEngine;
}

interface CalculatorState {
  displayValue: string;
}

/** @public */
export class Calculator extends React.PureComponent<
  CalculatorProps,
  CalculatorState
> {
  private _mainDiv = React.createRef<HTMLDivElement>();
  private _equalsClicked = false;

  public static readonly defaultProps: Pick<CalculatorProps, "engine"> = {
    engine: new CalculatorEngine(),
  };

  constructor(props: CalculatorProps) {
    super(props);

    let displayValue = "0";
    if (this.props.initialValue)
      displayValue = this.props.engine.processValue(
        this.props.initialValue.toString()
      );

    this.state = {
      displayValue,
    };
  }

  private _onValueButtonClick = (keyChar: string) => {
    const displayValue = this.props.engine.processValue(keyChar);
    this._mainDivFocus();
    this.setState({ displayValue });
  };

  private _onOperatorButtonClick = (operator: CalculatorOperator) => {
    if (operator === CalculatorOperator.Clear && this._equalsClicked)
      operator = CalculatorOperator.ClearAll;

    const displayValue = this.props.engine.processOperator(operator);
    this._mainDivFocus();
    this.setState({ displayValue });

    if (operator === CalculatorOperator.Equals) this._equalsClicked = true;
    else if (operator === CalculatorOperator.ClearAll)
      this._equalsClicked = false;
  };

  private _handleOk = (_event: React.MouseEvent): void => {
    this._ok();
  };

  private _ok() {
    if (this.props.onOk) {
      this.props.onOk(this.props.engine.result);
    }
    this._clearAll();
  }

  private _handleCancel = (_event: React.MouseEvent): void => {
    this._cancel();
  };

  private _cancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this._clearAll();
  }

  private _clearAll() {
    this.props.engine.clearAll();
    this._equalsClicked = false;
  }

  public override componentDidMount() {
    this._mainDivFocus();
  }

  private _mainDivFocus() {
    if (this._mainDiv.current) this._mainDiv.current.focus();
  }

  public override render() {
    const { className, resultIcon, onOk, onCancel, initialValue, ...props } =
      this.props;

    const classNames = classnames("uifw-calculator", className);

    const topSection = resultIcon ? (
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      <IconInput
        containerClassName="uifw-calculator-top-input"
        value={this.state.displayValue}
        readOnly={true}
        icon={resultIcon}
      />
    ) : (
      <Input value={this.state.displayValue} readOnly={true} size="small" />
    );

    return (
      // The event handler is only being used to capture bubbled events
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        {...props}
        ref={this._mainDiv}
        tabIndex={-1}
        className={classNames}
        onKeyDown={this._handleKeyDown}
      >
        <div className="uifw-calculator-top">{topSection}</div>
        <CalculatorKeyPad
          onValueClick={this._onValueButtonClick}
          onOperatorClick={this._onOperatorButtonClick}
        />
        <div className="uifw-calculator-bottom-buttons">
          <Button
            className={classnames(
              "uifw-calculator-large-button",
              "uifw-calculator-ok-button"
            )}
            styleType="cta"
            onClick={this._handleOk}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={<SvgCheckmark />} />
          </Button>
          <Button
            className={classnames(
              "uifw-calculator-large-button",
              "uifw-calculator-cancel-button"
            )}
            onClick={this._handleCancel}
          >
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={<SvgRemove />} />
          </Button>
        </div>
      </div>
    );
  }

  private _handleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ): void => {
    switch (event.key) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this._onValueButtonClick(event.key);
        break;
      case "a":
      case "A":
        this._onOperatorButtonClick(CalculatorOperator.ClearAll);
        break;
      case "c":
      case "C":
      case Key.Clear.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Clear);
        break;
      case Key.Escape.valueOf():
        this._cancel();
        break;
      case Key.Backspace.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Backspace);
        break;
      case "/":
      case Key.Divide.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Divide);
        break;
      case "*":
      case Key.Multiply.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Multiply);
        break;
      case "-":
      case Key.Subtract.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Subtract);
        break;
      case "+":
      case Key.Add.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Add);
        break;
      case ".":
      case Key.Decimal.valueOf():
        this._onOperatorButtonClick(CalculatorOperator.Decimal);
        break;
      case "=":
        this._onOperatorButtonClick(CalculatorOperator.Equals);
        break;
      case Key.Enter.valueOf():
        if (!this._equalsClicked)
          this._onOperatorButtonClick(CalculatorOperator.Equals);
        this._ok();
        break;
    }
  };
}

// eslint-disable-next-line @typescript-eslint/no-deprecated
interface CalculatorKeyPadProps extends CommonProps {
  /** A function to be run when a value is clicked */
  onValueClick: (key: string) => void;
  /** A function to be run when a value is clicked */
  onOperatorClick: (operator: CalculatorOperator) => void;
}

class CalculatorKeyPad extends React.PureComponent<CalculatorKeyPadProps> {
  public override render() {
    return (
      <div className={classnames("uifw-calculator-button-grid")}>
        <OperatorButton
          operator={CalculatorOperator.ClearAll}
          onClick={this.props.onOperatorClick}
        >
          AC
        </OperatorButton>
        <OperatorButton
          operator={CalculatorOperator.Clear}
          onClick={this.props.onOperatorClick}
        >
          C
        </OperatorButton>
        <OperatorButton
          operator={CalculatorOperator.Backspace}
          onClick={this.props.onOperatorClick}
        >
          <div className="uifw-calculator-button-svg">
            {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
            <Icon iconSpec={<SvgBackspace />} />
          </div>
        </OperatorButton>
        <OperatorButton
          operator={CalculatorOperator.Divide}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &divide;
        </OperatorButton>

        <ValueButton keyChar="7" onClick={this.props.onValueClick} />
        <ValueButton keyChar="8" onClick={this.props.onValueClick} />
        <ValueButton keyChar="9" onClick={this.props.onValueClick} />
        <OperatorButton
          operator={CalculatorOperator.Multiply}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &times;
        </OperatorButton>

        <ValueButton keyChar="4" onClick={this.props.onValueClick} />
        <ValueButton keyChar="5" onClick={this.props.onValueClick} />
        <ValueButton keyChar="6" onClick={this.props.onValueClick} />
        <OperatorButton
          operator={CalculatorOperator.Subtract}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &minus;
        </OperatorButton>

        <ValueButton keyChar="1" onClick={this.props.onValueClick} />
        <ValueButton keyChar="2" onClick={this.props.onValueClick} />
        <ValueButton keyChar="3" onClick={this.props.onValueClick} />
        <OperatorButton
          operator={CalculatorOperator.Add}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &#43;
        </OperatorButton>

        <ValueButton keyChar="0" onClick={this.props.onValueClick} />
        <OperatorButton
          operator={CalculatorOperator.NegPos}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &plusmn;
        </OperatorButton>
        <OperatorButton
          operator={CalculatorOperator.Decimal}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          .
        </OperatorButton>
        <OperatorButton
          operator={CalculatorOperator.Equals}
          onClick={this.props.onOperatorClick}
          className="uifw-calculator-large-font"
        >
          &#61;
        </OperatorButton>
        <span />
      </div>
    );
  }
}

interface ValueButtonProps extends Omit<SquareButtonProps, "onClick"> {
  /** Key to display */
  keyChar: string;
  /** A function to be run when the element is clicked */
  onClick: (key: string) => void;
}

class ValueButton extends React.PureComponent<ValueButtonProps> {
  private _handleOnClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.props.onClick(this.props.keyChar);
  };

  public override render() {
    const { className, keyChar, onClick, ...props } = this.props;

    const itemClassNames = classnames("uifw-calculator-item", className);

    return (
      <SquareButton
        {...props}
        className={itemClassNames}
        onClick={this._handleOnClick}
      >
        {keyChar}
      </SquareButton>
    );
  }
}

interface OperatorButtonProps extends Omit<SquareButtonProps, "onClick"> {
  /** Key to display */
  operator: CalculatorOperator;
  /** A function to be run when the element is clicked */
  onClick: (operator: CalculatorOperator) => void;
}

class OperatorButton extends React.PureComponent<OperatorButtonProps> {
  private _handleOnClick = (
    _event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    this.props.onClick(this.props.operator);
  };

  public override render() {
    const { className, children, operator, onClick, ...props } = this.props;

    const itemClassNames = classnames("uifw-calculator-item", className);

    return (
      <SquareButton
        {...props}
        className={itemClassNames}
        onClick={this._handleOnClick}
      >
        {children}
      </SquareButton>
    );
  }
}
