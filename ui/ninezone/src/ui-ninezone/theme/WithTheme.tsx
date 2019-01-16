/*---------------------------------------------------------------------------------------------
* Copyright (c) 2019 Bentley Systems, Incorporated. All rights reserved.
* Licensed under the MIT License. See LICENSE.md in the project root for license terms.
*--------------------------------------------------------------------------------------------*/
/** @module Theme */

import * as React from "react";
import * as classnames from "classnames";
import { ThemeContext } from "./Context";
import { ClassNameProps } from "../utilities/Props";
import { Theme } from "./Theme";

/** Properties supplemented to components that are enhanced with [[withTheme]] HOC. */
export interface WithThemeProps {
  /** Explicit theme used by component. Takes precedence over [[ThemeContext]] */
  theme?: Theme;
}

/**
 * HOC which will supplement component with theme capabilities.
 * @note Component will be injected with class name: nz-theme-[[Theme.name]]
 */
export const withTheme = <ComponentProps extends ClassNameProps>(
  // tslint:disable-next-line:variable-name
  Component: React.ComponentType<ComponentProps>,
): React.ComponentClass<ComponentProps & WithThemeProps> => {
  return class WithTheme extends React.PureComponent<ComponentProps & WithThemeProps> {
    public getTheme(contextTheme: Theme): Theme {
      if (this.props.theme)
        return (this.props as WithThemeProps).theme!;
      return contextTheme;
    }

    public render() {
      return (
        <ThemeContext.Consumer>
          {
            ({ theme }) =>
              <Component
                {...this.props}
                className={classnames(this.props.className, `nz-theme-${this.getTheme(theme).name}`)}
              />
          }
        </ThemeContext.Consumer>
      );
    }
  };
};
