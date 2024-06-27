/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** @packageDocumentation
 * @module ContentView
 */

// cSpell:ignore contentlayout

import "./ContentLayout.scss";
import classnames from "classnames";
import * as React from "react";
import { SplitPane } from "./split-pane/SplitPane";
import type { CommonProps } from "@itwin/core-react";
import { Orientation } from "@itwin/core-react";
import type { ContentGroup } from "./ContentGroup";
import type {
  ContentLayoutProps,
  LayoutFragmentProps,
  LayoutHorizontalSplitProps,
  LayoutSplitPropsBase,
  LayoutVerticalSplitProps,
} from "@itwin/appui-abstract";
import { UiEvent } from "@itwin/appui-abstract";
import { useActiveFrontstageDef } from "../frontstage/FrontstageDef";
import { UiFramework } from "../UiFramework";
import { ContentOverlay } from "./ContentOverlay";

/** Properties for [[ContentWrapper]] */
// eslint-disable-next-line deprecation/deprecation
interface ContentWrapperProps extends CommonProps {
  content: React.ReactNode;
}

/** ContentWrapper React component.
 * @internal
 */
export function ContentWrapper(props: ContentWrapperProps) {
  const { content } = props;
  const activeFrontstageDef = useActiveFrontstageDef();
  const [isActive, setIsActive] = React.useState(() => {
    // eslint-disable-next-line deprecation/deprecation
    return content === UiFramework.content.getActive();
  });

  const contentControlKey = (
    contentControl: React.ReactNode
  ): string | undefined => {
    let controlId: string | undefined;
    if (contentControl && (contentControl as React.ReactElement<any>).key) {
      const key = (contentControl as React.ReactElement<any>).key as string;
      // key has format `${contentProps.id}::${this.groupId}` which is stored as unique id
      controlId = key.split("::", 1)[0];
    }
    return controlId;
  };

  const [hasMultipleContents, setHasMultipleContents] = React.useState(
    () =>
      (activeFrontstageDef &&
        !!activeFrontstageDef.floatingContentControls?.length) ||
      // eslint-disable-next-line deprecation/deprecation
      (activeFrontstageDef?.contentGroup?.getContentControls().length ?? 0) > 1
  );

  React.useEffect(() => {
    // eslint-disable-next-line deprecation/deprecation
    setIsActive(content === UiFramework.content.getActive());
  }, [content]);

  React.useEffect(() => {
    return UiFramework.content.onActiveContentChangedEvent.addListener(
      (args) => {
        // eslint-disable-next-line deprecation/deprecation
        const contentIsIdentical = content === args.activeContent;
        if (contentIsIdentical) {
          setIsActive(contentIsIdentical);
        } else {
          const contentId = contentControlKey(content);
          // eslint-disable-next-line deprecation/deprecation
          const activeContentId = contentControlKey(args.activeContent);
          setIsActive(!!contentId && contentId === activeContentId);
        }

        setHasMultipleContents(
          (activeFrontstageDef &&
            !!activeFrontstageDef.floatingContentControls?.length) ||
            // eslint-disable-next-line deprecation/deprecation
            (activeFrontstageDef?.contentGroup?.contentPropsList.length ?? 0) >
              1
        );
      }
    );
  }, [activeFrontstageDef, content]);

  const handleMouseDown = React.useCallback(() => {
    // eslint-disable-next-line deprecation/deprecation
    UiFramework.content.setActive(content);
    setIsActive(true);
  }, [content]);

  React.useEffect(() => {
    const onAvailableContentChanged = () => {
      setHasMultipleContents(
        (activeFrontstageDef &&
          !!activeFrontstageDef.floatingContentControls?.length) ||
          // eslint-disable-next-line deprecation/deprecation
          (activeFrontstageDef?.contentGroup?.getContentControls().length ??
            0) > 1
      );
    };
    return UiFramework.content.onAvailableContentChangedEvent.addListener(
      onAvailableContentChanged
    );
  }, [activeFrontstageDef]);

  const active = isActive && hasMultipleContents;
  return (
    <ContentOverlay
      className={classnames("uifw-contentlayout-wrapper", props.className)}
      style={props.style}
      active={active}
      onMouseDown={handleMouseDown}
      onMouseMove={UiFramework.visibility.handleContentMouseMove}
      role="presentation"
    >
      {content}
    </ContentOverlay>
  );
}

/** Properties for the [[SplitContainer]] component */
// eslint-disable-next-line deprecation/deprecation
interface SplitContainerProps extends CommonProps {
  contentA: React.ReactNode;
  contentB: React.ReactNode;
  orientation: Orientation;
  percentage: number;
  resizable: boolean;
  minSizeTopLeft: number;
  minSizeBottomRight: number;
  splitterStateId?: string;
  onSplitterChange?: (size: number, percentage: number) => void;
}

/** Split Container class.
 */
class SplitContainer extends React.Component<SplitContainerProps> {
  private _containerDiv: HTMLDivElement | null = null;

  constructor(props: SplitContainerProps) {
    super(props);
  }

  private _onSplitterChange = (size: number): void => {
    let percentage = 0;

    if (this._containerDiv && size > 0) {
      if (this.props.orientation === Orientation.Horizontal) {
        const height = this._containerDiv.getBoundingClientRect().height;
        if (height > 0) percentage = size / height;
      } else {
        const width = this._containerDiv.getBoundingClientRect().width;
        if (width > 0) percentage = size / width;
      }

      if (this.props.onSplitterChange)
        this.props.onSplitterChange(size, percentage);
    }
  };

  public override render(): React.ReactNode {
    const orientation =
      this.props.orientation === Orientation.Horizontal
        ? "horizontal"
        : "vertical";
    const defaultSize = `${(this.props.percentage * 100).toString()}%`;
    const minSizeTopLeft = this.props.minSizeTopLeft;
    const minSizeBottomRight = -this.props.minSizeBottomRight;

    return (
      <div
        ref={(e) => {
          this._containerDiv = e;
        }}
        className={classnames(
          "uifw-contentlayout-full-size",
          this.props.className
        )}
        style={this.props.style}
      >
        <SplitPane
          split={orientation}
          minSize={minSizeTopLeft}
          maxSize={minSizeBottomRight}
          defaultSize={defaultSize}
          onChange={this._onSplitterChange}
          allowResize={this.props.resizable}
        >
          {this.props.contentA}
          {this.props.contentB}
        </SplitPane>
      </div>
    );
  }
}

/** Properties for [[SingleContentContainer]] component
 */
// eslint-disable-next-line deprecation/deprecation
interface SingleContentProps extends CommonProps {
  content: React.ReactNode;
}

/** Single Content Container class. */
class SingleContentContainer extends React.Component<SingleContentProps> {
  public override render(): React.ReactNode {
    return (
      <div
        className={classnames(
          "uifw-contentlayout-full-size",
          this.props.className
        )}
        style={this.props.style}
        data-testid="single-content-container"
        onMouseMove={UiFramework.visibility.handleContentMouseMove}
      >
        <ContentWrapper
          content={this.props.content}
          style={{ height: "100%", position: "relative" }}
        />
      </div>
    );
  }
}

/** Common interface for HorizontalSplit and VerticalSplit. */
interface LayoutSplit {
  createContentContainer(
    contentNodes: React.ReactNode[],
    resizable: boolean
  ): React.ReactNode;
  isLocked: boolean;
}

/** Minimum split size  */
const MIN_SPLIT_SIZE = 6;

/** Base Split class.
 */
class BaseSplit {
  public defaultPercentage: number;
  public stateId: string = "";
  public isLocked: boolean = false;

  constructor(props: LayoutSplitPropsBase) {
    this.defaultPercentage = props.percentage;

    if (props.id) this.stateId = props.id;

    if (props.lock) this.isLocked = props.lock;
  }
}

/** Horizontal Split class.
 */
class HorizontalSplit extends BaseSplit implements LayoutSplit {
  private _topIndex: number = -1;
  private _bottomIndex: number = -1;
  private _topSplit?: LayoutSplit;
  private _bottomSplit?: LayoutSplit;
  private _props: LayoutHorizontalSplitProps;
  private _minSizeTop: number = MIN_SPLIT_SIZE;
  private _minSizeBottom: number = MIN_SPLIT_SIZE;

  constructor(props: LayoutHorizontalSplitProps) {
    super(props);

    this._props = props;

    if (typeof props.top === "number") {
      this._topIndex = props.top;
    } else {
      this._topSplit = ContentLayoutDef.createSplit(props.top);
    }

    if (typeof props.bottom === "number") {
      this._bottomIndex = props.bottom;
    } else {
      this._bottomSplit = ContentLayoutDef.createSplit(props.bottom);
    }

    if (props.minSizeTop)
      this._minSizeTop = Math.max(props.minSizeTop, MIN_SPLIT_SIZE);

    if (props.minSizeBottom)
      this._minSizeBottom = Math.max(props.minSizeBottom, MIN_SPLIT_SIZE);
  }

  private _handleSplitterChange = (_size: number, percentage: number): void => {
    this._props.percentage = percentage;
  };

  public createContentContainer(
    contentNodes: React.ReactNode[],
    resizable: boolean
  ): React.ReactNode {
    if (this.isLocked) resizable = false;

    const topContent = !this._topSplit ? (
      <ContentWrapper content={contentNodes[this._topIndex]} />
    ) : (
      this._topSplit.createContentContainer(contentNodes, resizable)
    );
    const bottomContent = !this._bottomSplit ? (
      <ContentWrapper content={contentNodes[this._bottomIndex]} />
    ) : (
      this._bottomSplit.createContentContainer(contentNodes, resizable)
    );

    return (
      <SplitContainer
        contentA={topContent}
        contentB={bottomContent}
        orientation={Orientation.Horizontal}
        percentage={this.defaultPercentage}
        resizable={resizable}
        minSizeTopLeft={this._minSizeTop}
        minSizeBottomRight={this._minSizeBottom}
        splitterStateId={this.stateId}
        onSplitterChange={this._handleSplitterChange}
      />
    );
  }
}

/** Vertical Split class.
 */
class VerticalSplit extends BaseSplit implements LayoutSplit {
  private _leftIndex: number = -1;
  private _rightIndex: number = -1;
  private _leftSplit?: LayoutSplit;
  private _rightSplit?: LayoutSplit;
  private _props: LayoutVerticalSplitProps;
  private _minSizeLeft: number = MIN_SPLIT_SIZE;
  private _minSizeRight: number = MIN_SPLIT_SIZE;

  constructor(props: LayoutVerticalSplitProps) {
    super(props);

    this._props = props;

    if (typeof props.left === "number") {
      this._leftIndex = props.left;
    } else {
      this._leftSplit = ContentLayoutDef.createSplit(props.left);
    }

    if (typeof props.right === "number") {
      this._rightIndex = props.right;
    } else {
      this._rightSplit = ContentLayoutDef.createSplit(props.right);
    }

    if (props.minSizeLeft)
      this._minSizeLeft = Math.max(props.minSizeLeft, MIN_SPLIT_SIZE);

    if (props.minSizeRight)
      this._minSizeRight = Math.max(props.minSizeRight, MIN_SPLIT_SIZE);
  }

  private _handleSplitterChange = (_size: number, percentage: number): void => {
    this._props.percentage = percentage;
  };

  public createContentContainer(
    contentNodes: React.ReactNode[],
    resizable: boolean
  ): React.ReactNode {
    if (this.isLocked) resizable = false;

    const leftContent = !this._leftSplit ? (
      <ContentWrapper content={contentNodes[this._leftIndex]} />
    ) : (
      this._leftSplit.createContentContainer(contentNodes, resizable)
    );
    const rightContent = !this._rightSplit ? (
      <ContentWrapper content={contentNodes[this._rightIndex]} />
    ) : (
      this._rightSplit.createContentContainer(contentNodes, resizable)
    );

    return (
      <SplitContainer
        contentA={leftContent}
        contentB={rightContent}
        orientation={Orientation.Vertical}
        percentage={this.defaultPercentage}
        resizable={resizable}
        minSizeTopLeft={this._minSizeLeft}
        minSizeBottomRight={this._minSizeRight}
        splitterStateId={this.stateId}
        onSplitterChange={this._handleSplitterChange}
      />
    );
  }
}

/** Content Layout Definition class.
 * @public
 */
export class ContentLayoutDef {
  private _layoutProps: ContentLayoutProps;
  private _rootSplit?: LayoutSplit;

  /** ID for this Content Layout */
  public id: string = "";
  /** Description of the layout. */
  public description: string = "";
  constructor(layoutProps: ContentLayoutProps) {
    this._layoutProps = layoutProps;
    this.id = layoutProps.id;
    if (layoutProps.description !== undefined)
      this.description = layoutProps.description;
  }

  /** @deprecated in 4.15.0. Used internally. */
  public get rootSplit(): LayoutSplit | undefined {
    return this._rootSplit;
  }

  /** Creates [[ContentLayoutProps]] for JSON purposes
   * @public
   */
  public toJSON(): ContentLayoutProps {
    return this._layoutProps;
  }

  /** Fill a layout container with React nodes for each content view.
   * @deprecated in 4.15.0. Used internally.
   */
  public fillLayoutContainer(
    contentNodes: React.ReactNode[],
    resizable: boolean
  ): React.ReactNode | undefined {
    this._rootSplit = ContentLayoutDef.createSplit(this._layoutProps);

    // eslint-disable-next-line deprecation/deprecation
    if (this.rootSplit) {
      // eslint-disable-next-line deprecation/deprecation
      return this.rootSplit.createContentContainer(contentNodes, resizable);
    }

    if (contentNodes.length > 0)
      return <SingleContentContainer content={contentNodes[0]} />;

    return undefined;
  }

  /** Gets the indexes of content views used in this Content Layout. */
  public getUsedContentIndexes(): number[] {
    let allContentIndexes: number[] = [];

    if (!this._layoutProps.horizontalSplit && !this._layoutProps.verticalSplit)
      allContentIndexes.push(0);
    else {
      allContentIndexes = allContentIndexes.concat(
        this.getHorizontalSplitContentIndexes(this._layoutProps.horizontalSplit)
      );
      allContentIndexes = allContentIndexes.concat(
        this.getVerticalSplitContentIndexes(this._layoutProps.verticalSplit)
      );
    }

    const uniqueContentIndexes = [...new Set(allContentIndexes)];

    return uniqueContentIndexes;
  }

  private getHorizontalSplitContentIndexes(
    splitProps?: LayoutHorizontalSplitProps
  ): number[] {
    let contentIndexes: number[] = [];

    if (!splitProps) return contentIndexes;

    if (typeof splitProps.top === "number") contentIndexes.push(splitProps.top);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.top.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.top.verticalSplit)
      );
    }

    if (typeof splitProps.bottom === "number")
      contentIndexes.push(splitProps.bottom);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.bottom.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.bottom.verticalSplit)
      );
    }

    return contentIndexes;
  }

  private getVerticalSplitContentIndexes(
    splitProps?: LayoutVerticalSplitProps
  ): number[] {
    let contentIndexes: number[] = [];

    if (!splitProps) return contentIndexes;

    if (typeof splitProps.left === "number")
      contentIndexes.push(splitProps.left);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.left.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.left.verticalSplit)
      );
    }

    if (typeof splitProps.right === "number")
      contentIndexes.push(splitProps.right);
    else {
      contentIndexes = contentIndexes.concat(
        this.getHorizontalSplitContentIndexes(splitProps.right.horizontalSplit)
      );
      contentIndexes = contentIndexes.concat(
        this.getVerticalSplitContentIndexes(splitProps.right.verticalSplit)
      );
    }

    return contentIndexes;
  }

  /** @internal */
  public static createSplit(
    fragmentDef: LayoutFragmentProps
  ): LayoutSplit | undefined {
    if (fragmentDef.horizontalSplit) {
      return new HorizontalSplit(fragmentDef.horizontalSplit);
    } else if (fragmentDef.verticalSplit) {
      return new VerticalSplit(fragmentDef.verticalSplit);
    }

    return undefined;
  }
}

/** Content Layout Activated Event Args class.
 * @public
 * @deprecated in 4.13.0. Event args are inferred from a listener. If explicit type is needed use a type helper.
 */
export interface ContentLayoutActivatedEventArgs {
  contentLayout: ContentLayoutDef;
  contentGroup: ContentGroup;
}

/** Content Layout Activated Event class.
 * @public
 * @deprecated in 4.13.0. This class should not be used by applications to instantiate objects.
 */
// eslint-disable-next-line deprecation/deprecation
export class ContentLayoutActivatedEvent extends UiEvent<ContentLayoutActivatedEventArgs> {}

/** Properties for the [[ContentLayout]] React component.
 * @public
 */
// eslint-disable-next-line deprecation/deprecation
export interface ContentLayoutComponentProps extends CommonProps {
  contentLayout: ContentLayoutDef;
  contentGroup: ContentGroup;
}

/** Content Layout React component.
 * @public
 */
export function ContentLayout(props: ContentLayoutComponentProps) {
  const [contentLayoutDef, setContentLayoutDef] =
    React.useState<ContentLayoutDef>(props.contentLayout);
  const [contentGroupId, setContentGroupId] = React.useState<
    ContentGroup["id"]
  >(props.contentGroup.groupId);
  const [contentNodes, setContentNodes] = React.useState<React.ReactNode[]>(
    () => {
      // eslint-disable-next-line deprecation/deprecation
      return props.contentGroup.getContentNodes();
    }
  );

  React.useEffect(() => {
    return UiFramework.frontstages.onContentLayoutActivatedEvent.addListener(
      (args) => {
        setContentLayoutDef(args.contentLayout);
        setContentGroupId(args.contentGroup.groupId);
        // eslint-disable-next-line deprecation/deprecation
        setContentNodes(args.contentGroup.getContentNodes());
      }
    );
  }, []);

  // eslint-disable-next-line deprecation/deprecation
  const contentContainer = contentLayoutDef.fillLayoutContainer(
    contentNodes,
    true
  );
  if (contentContainer) {
    return (
      <div
        id="uifw-contentlayout-div"
        className={props.className}
        style={props.style}
        key={`${contentGroupId}-${contentLayoutDef.id}`}
        onMouseDown={() => {
          UiFramework.content.setMouseDown(true);
        }}
        onMouseUp={() => {
          UiFramework.content.setMouseDown(false);
        }}
        role="presentation"
      >
        {contentContainer}
      </div>
    );
  }

  return null;
}
