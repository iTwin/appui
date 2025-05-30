/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module Common
 */

import * as React from "react";
import type { WebFontIconProps } from "@itwin/core-react";
import { Icon, WebFontIcon } from "@itwin/core-react";
import { UiComponents } from "../UiComponents.js";
import type {
  Image,
  ImageFileFormat,
  LoadedBinaryImage,
  LoadedImage,
} from "./IImageLoader.js";
import { UiError } from "@itwin/appui-abstract";

/** A class that renders images from data provided by an image loader
 * @internal
 */
export class ImageRenderer {
  private static _svgCache: Map<string, string> = new Map();

  private hexToBase64(hexstring: string) {
    const match = hexstring.match(/\w{2}/g);
    if (!match) return "";

    return window.btoa(
      match
        .map((a) => {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join("")
    );
  }

  /** Render raw binary image */
  private renderBinary(data: string, format: ImageFileFormat) {
    // Convert binary to base64
    const dataAsBase64 = this.hexToBase64(data);
    return <img src={`data:image/${format};base64,${dataAsBase64}`} alt="" />;
  }

  private isSvg(input: string): boolean {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "application/xml");

    const errorNode = doc.querySelector("parsererror");
    if (errorNode) {
      return false;
    }

    const rootNode = doc.documentElement.nodeName.toLowerCase();
    return "svg" === rootNode;
  }

  private convertSvgToDataUri(svg: string) {
    if (!this.isSvg(svg)) {
      return "";
    }

    const svgAsBase64 = window.btoa(svg);
    return `data:image/svg+xml;base64,${svgAsBase64}`;
  }

  /** Render svg string into JSX */
  private renderSvg(svg: string) {
    let svgAsDataUri = ImageRenderer._svgCache.get(svg);
    if (undefined === svgAsDataUri) {
      svgAsDataUri = this.convertSvgToDataUri(svg.trim());
      ImageRenderer._svgCache.set(svg, svgAsDataUri);
    }

    return (
      <div>
        {/* eslint-disable-next-line @typescript-eslint/no-deprecated */}
        <Icon iconSpec={svgAsDataUri} />
      </div>
    );
  }

  /** Render image from an url */
  private renderUrl(url: string) {
    return <img src={url} alt="" />;
  }

  /** Render image as core-react icon */
  private renderCoreIcon(iconName: string) {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <WebFontIcon iconName={iconName} />;
  }

  /** Replaces the escaped instances of "\:" with ":" */
  private normalizeEscapedIconString(escapedIconString: string) {
    return escapedIconString.replace(/\\:/g, ":");
  }

  /**
   * Extract class and name from icon name, if the name follows format "{className}:{fontName}".
   * className and fontName can be escaped using \ if : is needed.
   */
  private extractIconClassAndName(
    iconName: string
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): Pick<WebFontIconProps, "iconClassName" | "iconName"> {
    const matches = iconName.match(/(\\.|[^:])+/g);
    if (!matches || matches.length !== 2)
      return {
        iconClassName: undefined,
        iconName,
      };

    return {
      iconClassName: this.normalizeEscapedIconString(matches[0]),
      iconName: this.normalizeEscapedIconString(matches[1]),
    };
  }

  /**
   * Render image as provided webfont icon.
   * Defaults to core-react icon if iconName does not contain className.
   */
  private renderWebfontIcon(iconName: string) {
    const iconInfo = this.extractIconClassAndName(iconName);
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return <WebFontIcon {...iconInfo} />;
  }

  /** Render image from data provided by an image loader */
  public render(loadedImage: Image): React.ReactNode {
    switch (loadedImage.sourceType) {
      case "binary":
        const image = loadedImage as LoadedBinaryImage;
        return this.renderBinary(image.value, image.fileFormat);

      case "url":
        return this.renderUrl((loadedImage as LoadedImage).value);

      case "svg":
        return this.renderSvg((loadedImage as LoadedImage).value);

      case "core-icon":
        return this.renderCoreIcon((loadedImage as LoadedImage).value);

      case "webfont-icon":
        return this.renderWebfontIcon((loadedImage as LoadedImage).value);

      default:
        const unhandledSourceType: never = loadedImage.sourceType; // Compile time check that all cases are handled
        // eslint-disable-next-line @typescript-eslint/no-deprecated
        throw new UiError(
          UiComponents.loggerCategory("ImageRenderer"),
          `Can't handle sourceType: "${String(unhandledSourceType)}"`
        );
    }
  }
}
