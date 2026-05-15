import { r as reactExports, I as IconButton, j as jsxRuntimeExports, R as React, av as useDemoIModel, T as ThemeProvider } from "./iframe-D6etZYKx.js";
import { bq as RpcManager, br as RpcRoutingToken, bs as BentleyCloudRpcProtocol, bt as RpcConfiguration, bu as RpcRequest, bv as RpcRequestEvent, bw as NotificationManager, U as UiFramework, M as MessageManager, T as ToolAssistance, bx as ActivityMessageEndReason, by as PointerMessage, bz as ElementTooltip, bA as ToolAdmin, i as IModelApp, bB as Divider, bC as ContentGroup, bD as BlankConnection, bE as Range3d, bF as Cartographic, bG as SpatialViewState, a3 as ColorDef, bH as CheckpointConnection, bI as ViewCreator3d, Y as FrameworkAccuDraw, bJ as IModelReadRpcInterface, bK as IModelTileRpcInterface, bL as SnapshotIModelRpcInterface, t as UiItemsManager, au as ProgressLinear, ar as Provider_default, as as ThemeManager, f as ConfigurableUiContent } from "./appui-react-DQPnIqIU.js";
import { T as Title3, f as Subtitle2, D as Description2, h as Primary, C as Controls3 } from "./blocks-C98UqoJ1.js";
import { K as Key_enumExports, I as ITwinError, S as StandardTypeNames, c as PropertyEditorParamTypes, d as StandardEditorNames, f as PropertyValueFormat, n as PropertyRecord } from "./Key.enum-DxiaZ4K2.js";
import { S as StandardContentLayouts, c as createFrontstage } from "./Utils-WX8e-cwd.js";
import { F as Flex, T as Text, D as DropdownMenu, M as MenuItem, b9 as EditorContainer, ba as PropertyRecordEditor } from "./components-react-CcAoSHHf.js";
class BentleyCloudRpcConfiguration extends RpcConfiguration {
  /** Access-Control header values for backend servers that serve frontends using BentleyCloudRpcProtocol. */
  static accessControl = {
    allowOrigin: "*",
    allowMethods: "POST, GET, OPTIONS",
    allowHeaders: "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, X-Correlation-Id, X-Session-Id, X-Application-Id, X-Application-Version, X-User-Id, X-Protocol-Version"
  };
}
class BentleyCloudRpcManager extends RpcManager {
  /** @beta Initializes BentleyCloudRpcManager for the frontend of an application. */
  static initializeClient(params, interfaces, routing = RpcRoutingToken.default) {
    return BentleyCloudRpcManager.performInitialization(params, interfaces, routing);
  }
  /** @beta Initializes BentleyCloudRpcManager for the backend of an application. */
  static initializeImpl(params, interfaces) {
    return BentleyCloudRpcManager.performInitialization(params, interfaces);
  }
  static performInitialization(params, interfaces, routing = RpcRoutingToken.default) {
    const protocol = class extends (params.protocol || BentleyCloudRpcProtocol) {
      pathPrefix = params.uriPrefix || "";
      info = params.info;
    };
    const config = class extends BentleyCloudRpcConfiguration {
      interfaces = () => interfaces;
      protocol = new protocol(this);
      routing = routing;
    };
    for (const def of interfaces) {
      RpcConfiguration.assignWithRouting(def, routing, config);
    }
    const instance = RpcConfiguration.obtain(config);
    if (params.pathPrefix) {
      instance.protocol.pathPrefix = params.pathPrefix;
    }
    RpcConfiguration.initializeInterfaces(instance);
    if (params.pendingRequestListener) {
      const listener = params.pendingRequestListener;
      RpcRequest.events.addListener((type, request) => {
        if (type === RpcRequestEvent.PendingUpdateReceived && request.protocol === instance.protocol) {
          listener(type, request);
        }
      });
    }
    return instance;
  }
}
const SvgDetails = (props) => {
  return reactExports.createElement(
    "svg",
    { viewBox: "0 0 16 16", width: "1rem", height: "1rem", fill: "var(--iui-color-icon-muted, currentColor)", ...props },
    reactExports.createElement("path", { d: "M13 0H3a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V1a1 1 0 00-1-1zM5 13H4v-1h1zm0-3H4V9h1zm0-3H4V6h1zm0-3H4V3h1zm7 9H7v-1h5zm0-3H7V9h5zm0-3H7V6h5zm0-3H7V3h5z" })
  );
};
class AppNotificationManager extends NotificationManager {
  /** Output a prompt, given an i18n key.
   */
  outputPromptByKey(key) {
    this.outputPrompt(UiFramework.translate(key));
  }
  /** Output a prompt to the user. A 'prompt' indicates an action the user should take to proceed.
   */
  outputPrompt(prompt) {
    MessageManager.outputPrompt(prompt);
    const mainInstruction = ToolAssistance.createInstruction("", prompt);
    const instructions = ToolAssistance.createInstructions(mainInstruction);
    MessageManager.setToolAssistance(instructions);
  }
  /** Output a message and/or alert to the user. */
  outputMessage(message) {
    MessageManager.outputMessage(message);
  }
  /** Output a MessageBox and wait for response from the user.
   * @param mbType       The MessageBox type.
   * @param message      The message to display.
   * @param icon         The MessageBox icon type.
   * @return the response from the user.
   */
  async openMessageBox(mbType, message, icon) {
    return MessageManager.openMessageBox(mbType, message, icon);
  }
  /**
   * Set up for activity messages.
   * @param details  The activity message details.
   * @return true if the message was displayed, false if an invalid priority is specified.
   */
  setupActivityMessage(details) {
    return MessageManager.setupActivityMessageDetails(details);
  }
  /**
   * Output an activity message to the user.
   * @param messageText      The message text.
   * @param percentComplete  The percentage of completion.
   * @return true if the message was displayed, false if the message could not be displayed.
   */
  outputActivityMessage(messageText, percentComplete) {
    return MessageManager.setupActivityMessageValues(messageText, percentComplete);
  }
  /**
   * End an activity message.
   * @param reason       Reason for the end of the Activity Message.
   * @return true if the message was ended successfully, false if the activityMessage could not be ended.
   */
  endActivityMessage(reason) {
    let result = false;
    switch (reason) {
      case ActivityMessageEndReason.Completed:
        result = MessageManager.endActivityMessage(true);
        break;
      case ActivityMessageEndReason.Cancelled:
        result = MessageManager.endActivityMessage(false);
        break;
    }
    return result;
  }
  /** Update message position created with [[OutputMessageType.Pointer]].
   * @param displayPoint        Point at which to display the Pointer type message.
   * @param relativePosition    Position relative to displayPoint at which to display the Pointer type message.
   */
  updatePointerMessage(displayPoint, relativePosition) {
    PointerMessage.updateMessage(displayPoint, relativePosition);
  }
  /** Hides the Pointer message. */
  closePointerMessage() {
    PointerMessage.hideMessage();
  }
  /** Return true if _showTooltip has an implementation and will display a tooltip. */
  get isToolTipSupported() {
    return true;
  }
  /** Return true if the tooltip is currently open. */
  get isToolTipOpen() {
    return ElementTooltip.isTooltipVisible;
  }
  /** Clear the ToolTip if it is currently open. If not open, does nothing. */
  clearToolTip() {
    if (this.isToolTipOpen)
      ElementTooltip.hideTooltip();
  }
  /** Show a ToolTip window.
   * @param el       The HTMLElement that anchors the toolTip.
   * @param message  The message to display inside the ToolTip
   * @param pt       An optional location, relative to the origin of el, for the ToolTip. If undefined, center of el.
   * @param options  Options that supply additional information about how the ToolTip should function.
   */
  _showToolTip(el, message, pt, options) {
    ElementTooltip.showTooltip(el, message, pt, options);
  }
  /** Hide a InputField message. */
  closeInputFieldMessage() {
    MessageManager.hideInputFieldMessage();
  }
  /** Setup tool assistance instructions for a tool. The instructions include the main instruction, which includes the current prompt.
   * @param instructions The tool assistance instructions.
   * @public
   */
  setToolAssistance(instructions) {
    MessageManager.outputPrompt(instructions ? instructions.mainInstruction.text : "");
    MessageManager.setToolAssistance(instructions);
  }
}
class FrameworkToolAdmin extends ToolAdmin {
  async processShortcutKey(e, wentDown) {
    if (!wentDown)
      return false;
    if (UiFramework.isContextMenuOpen)
      return false;
    if (e.key === Key_enumExports.Key.Escape.valueOf())
      return false;
    if (isElement(e.target) && isEditable(e.target))
      return false;
    UiFramework.keyboardShortcuts.processKey(e.key, e.altKey, e.ctrlKey, e.shiftKey);
    return true;
  }
}
function isElement(target) {
  return target instanceof Element;
}
const editableTags = ["input", "textarea", "select"];
function isEditable(element) {
  const tagName = element.tagName.toLowerCase();
  if (editableTags.includes(tagName))
    return true;
  if (element instanceof HTMLElement && element.isContentEditable)
    return true;
  return false;
}
var IModelState;
(function(IModelState2) {
  IModelState2["NotInitialized"] = "notInitialized";
  IModelState2["Initialized"] = "initialized";
})(IModelState || (IModelState = {}));
var ContainerTypes;
(function(ContainerTypes2) {
  ContainerTypes2[ContainerTypes2["None"] = 0] = "None";
  ContainerTypes2[ContainerTypes2["SchemaSync"] = 1] = "SchemaSync";
  ContainerTypes2[ContainerTypes2["CodeStore"] = 2] = "CodeStore";
  ContainerTypes2[ContainerTypes2["ViewStore"] = 4] = "ViewStore";
})(ContainerTypes || (ContainerTypes = {}));
var ChangesetState;
(function(ChangesetState2) {
  ChangesetState2["WaitingForFile"] = "waitingForFile";
  ChangesetState2["FileUploaded"] = "fileUploaded";
})(ChangesetState || (ChangesetState = {}));
var ContainingChanges;
(function(ContainingChanges2) {
  ContainingChanges2[ContainingChanges2["Regular"] = 0] = "Regular";
  ContainingChanges2[ContainingChanges2["Schema"] = 1] = "Schema";
  ContainingChanges2[ContainingChanges2["Definition"] = 2] = "Definition";
  ContainingChanges2[ContainingChanges2["SpatialData"] = 4] = "SpatialData";
  ContainingChanges2[ContainingChanges2["SheetsAndDrawings"] = 8] = "SheetsAndDrawings";
  ContainingChanges2[ContainingChanges2["ViewsAndModels"] = 16] = "ViewsAndModels";
  ContainingChanges2[ContainingChanges2["GlobalProperties"] = 32] = "GlobalProperties";
  ContainingChanges2[ContainingChanges2["SchemaSync"] = 64] = "SchemaSync";
})(ContainingChanges || (ContainingChanges = {}));
var ChangesetGroupState;
(function(ChangesetGroupState2) {
  ChangesetGroupState2["InProgress"] = "inProgress";
  ChangesetGroupState2["Completed"] = "completed";
  ChangesetGroupState2["TimedOut"] = "timedOut";
  ChangesetGroupState2["ForciblyClosed"] = "forciblyClosed";
})(ChangesetGroupState || (ChangesetGroupState = {}));
var NamedVersionState;
(function(NamedVersionState2) {
  NamedVersionState2["Visible"] = "visible";
  NamedVersionState2["Hidden"] = "hidden";
})(NamedVersionState || (NamedVersionState = {}));
var CheckpointState;
(function(CheckpointState2) {
  CheckpointState2["Successful"] = "successful";
  CheckpointState2["Scheduled"] = "scheduled";
  CheckpointState2["Failed"] = "failed";
  CheckpointState2["NotGenerated"] = "notGenerated";
})(CheckpointState || (CheckpointState = {}));
var ThumbnailSize;
(function(ThumbnailSize2) {
  ThumbnailSize2["Small"] = "small";
  ThumbnailSize2["Large"] = "large";
})(ThumbnailSize || (ThumbnailSize = {}));
var IModelPermission;
(function(IModelPermission2) {
  IModelPermission2["WebView"] = "imodels_webview";
  IModelPermission2["Read"] = "imodels_read";
  IModelPermission2["Write"] = "imodels_write";
  IModelPermission2["Manage"] = "imodels_manage";
  IModelPermission2["Delete"] = "imodels-delete";
})(IModelPermission || (IModelPermission = {}));
var IModelCreationState;
(function(IModelCreationState2) {
  IModelCreationState2["Successful"] = "successful";
  IModelCreationState2["WaitingForFile"] = "waitingForFile";
  IModelCreationState2["Scheduled"] = "scheduled";
  IModelCreationState2["Failed"] = "failed";
  IModelCreationState2["MainIModelIsMissingFederationGuids"] = "mainIModelIsMissingFederationGuids";
})(IModelCreationState || (IModelCreationState = {}));
async function* flatten(pagedIterator) {
  for await (const entityChunk of pagedIterator)
    for (const entity of entityChunk)
      yield entity;
}
async function toArray$1(iterator2) {
  const result = [];
  for await (const entity of iterator2)
    result.push(entity);
  return result;
}
async function take(iterator2, entityCount) {
  const result = [];
  for await (const entity of iterator2) {
    result.push(entity);
    if (result.length === entityCount)
      break;
  }
  return result;
}
var ContentType;
(function(ContentType2) {
  ContentType2["Json"] = "application/json";
  ContentType2["Png"] = "image/png";
  ContentType2["Jpeg"] = "image/jpeg";
})(ContentType || (ContentType = {}));
var OrderByOperator;
(function(OrderByOperator2) {
  OrderByOperator2["Ascending"] = "asc";
  OrderByOperator2["Descending"] = "desc";
})(OrderByOperator || (OrderByOperator = {}));
var PreferReturn;
(function(PreferReturn2) {
  PreferReturn2["Minimal"] = "minimal";
  PreferReturn2["Representation"] = "representation";
})(PreferReturn || (PreferReturn = {}));
const IModelsErrorScope = "imodels-clients";
var IModelsErrorCode;
(function(IModelsErrorCode2) {
  IModelsErrorCode2["AnotherUserPushing"] = "AnotherUserPushing";
  IModelsErrorCode2["BaselineFileInitializationFailed"] = "BaselineFileInitializationFailed";
  IModelsErrorCode2["BaselineFileInitializationTimedOut"] = "BaselineFileInitializationTimedOut";
  IModelsErrorCode2["BaselineFileNotFound"] = "BaselineFileNotFound";
  IModelsErrorCode2["BriefcaseNotFound"] = "BriefcaseNotFound";
  IModelsErrorCode2["CannotAcquire"] = "CannotAcquire";
  IModelsErrorCode2["ChangesetDownloadFailed"] = "ChangesetDownloadFailed";
  IModelsErrorCode2["ChangesetExists"] = "ChangesetExists";
  IModelsErrorCode2["ChangesetExtendedDataNotFound"] = "ChangesetExtendedDataNotFound";
  IModelsErrorCode2["ChangesetGroupNotFound"] = "ChangesetGroupNotFound";
  IModelsErrorCode2["ChangesetNotFound"] = "ChangesetNotFound";
  IModelsErrorCode2["CheckpointNotFound"] = "CheckpointNotFound";
  IModelsErrorCode2["ClonedIModelInitializationFailed"] = "ClonedIModelInitializationFailed";
  IModelsErrorCode2["ClonedIModelInitializationTimedOut"] = "ClonedIModelInitializationTimedOut";
  IModelsErrorCode2["ConflictWithAnotherUser"] = "ConflictWithAnotherUser";
  IModelsErrorCode2["DataConflict"] = "DataConflict";
  IModelsErrorCode2["DownloadAborted"] = "DownloadAborted";
  IModelsErrorCode2["DownloadCancelled"] = "DownloadCancelled";
  IModelsErrorCode2["EmptyIModelInitializationFailed"] = "EmptyIModelInitializationFailed";
  IModelsErrorCode2["FileNotFound"] = "FileNotFound";
  IModelsErrorCode2["IModelExists"] = "iModelExists";
  IModelsErrorCode2["IModelForkInitializationFailed"] = "IModelForkInitializationFailed";
  IModelsErrorCode2["IModelForkInitializationTimedOut"] = "IModelForkInitializationTimedOut";
  IModelsErrorCode2["IModelFromTemplateInitializationFailed"] = "IModelFromTemplateInitializationFailed";
  IModelsErrorCode2["IModelFromTemplateInitializationTimedOut"] = "IModelFromTemplateInitializationTimedOut";
  IModelsErrorCode2["IModelNotFound"] = "iModelNotFound";
  IModelsErrorCode2["InsufficientPermissions"] = "InsufficientPermissions";
  IModelsErrorCode2["InvalidChange"] = "InvalidChange";
  IModelsErrorCode2["InvalidHeaderValue"] = "InvalidHeaderValue";
  IModelsErrorCode2["InvalidIModelGCSCreationMode"] = "InvalidIModelGCSCreationMode";
  IModelsErrorCode2["InvalidIModelsRequest"] = "InvalidiModelsRequest";
  IModelsErrorCode2["InvalidRequestBody"] = "InvalidRequestBody";
  IModelsErrorCode2["InvalidThumbnailFormat"] = "InvalidThumbnailFormat";
  IModelsErrorCode2["InvalidValue"] = "InvalidValue";
  IModelsErrorCode2["ITwinNotFound"] = "iTwinNotFound";
  IModelsErrorCode2["LockNotFound"] = "LockNotFound";
  IModelsErrorCode2["LockOwnedByAnotherBriefcase"] = "LockOwnedByAnotherBriefcase";
  IModelsErrorCode2["MainIModelIsMissingFederationGuids"] = "MainIModelIsMissingFederationGuids";
  IModelsErrorCode2["MaximumNumberOfBriefcasesPerUser"] = "MaximumNumberOfBriefcasesPerUser";
  IModelsErrorCode2["MaximumNumberOfBriefcasesPerUserPerMinute"] = "MaximumNumberOfBriefcasesPerUserPerMinute";
  IModelsErrorCode2["MissingRequestBody"] = "MissingRequestBody";
  IModelsErrorCode2["MissingRequiredHeader"] = "MissingRequiredHeader";
  IModelsErrorCode2["MissingRequiredParameter"] = "MissingRequiredParameter";
  IModelsErrorCode2["MissingRequiredProperty"] = "MissingRequiredProperty";
  IModelsErrorCode2["MutuallyExclusiveParametersProvided"] = "MutuallyExclusiveParametersProvided";
  IModelsErrorCode2["MutuallyExclusivePropertiesProvided"] = "MutuallyExclusivePropertiesProvided";
  IModelsErrorCode2["NamedVersionNotFound"] = "NamedVersionNotFound";
  IModelsErrorCode2["NamedVersionOnChangesetExists"] = "NamedVersionOnChangesetExists";
  IModelsErrorCode2["NewerChangesExist"] = "NewerChangesExist";
  IModelsErrorCode2["RateLimitExceeded"] = "RateLimitExceeded";
  IModelsErrorCode2["RequestTooLarge"] = "RequestTooLarge";
  IModelsErrorCode2["ResourceQuotaExceeded"] = "ResourceQuotaExceeded";
  IModelsErrorCode2["StorageTypeNotSupported"] = "StorageTypeNotSupported";
  IModelsErrorCode2["TooManyRequests"] = "TooManyRequests";
  IModelsErrorCode2["Unauthorized"] = "Unauthorized";
  IModelsErrorCode2["Unknown"] = "Unknown";
  IModelsErrorCode2["Unrecognized"] = "Unrecognized";
  IModelsErrorCode2["UserNotFound"] = "UserNotFound";
  IModelsErrorCode2["VersionExists"] = "NamedVersionExists";
})(IModelsErrorCode || (IModelsErrorCode = {}));
function isIModelsApiError(error) {
  const errorCode = error?.code;
  return errorCode !== void 0 && typeof errorCode === "string";
}
class EntityPageListIterator {
  _entityPages;
  constructor(pageQueryFunc) {
    this._entityPages = this.queryPages(pageQueryFunc);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async next() {
    return this._entityPages.next();
  }
  async *queryPages(pageQueryFunc) {
    let nextPageQueryFunc = pageQueryFunc;
    while (nextPageQueryFunc) {
      const entityPage = await nextPageQueryFunc();
      nextPageQueryFunc = entityPage.next;
      yield entityPage.entities;
    }
  }
}
class EntityListIteratorImpl {
  _entityPages;
  _entities;
  constructor(pageQueryFunc) {
    this._entityPages = new EntityPageListIterator(pageQueryFunc);
    this._entities = flatten(this._entityPages);
  }
  [Symbol.asyncIterator]() {
    return this;
  }
  async next() {
    return this._entities.next();
  }
  byPage() {
    return this._entityPages;
  }
}
class IModelsErrorBaseImpl extends Error {
  code;
  originalError;
  constructor(params) {
    super();
    this.name = this.code = params.code;
    this.message = params.message;
    this.originalError = params.originalError;
  }
}
class IModelsErrorImpl extends IModelsErrorBaseImpl {
  details;
  statusCode;
  constructor(params) {
    super(params);
    this.details = params.details;
    this.statusCode = params.statusCode;
  }
}
class IModelsErrorParser {
  static _defaultErrorMessage = "Unknown error occurred";
  static _defaultUnauthorizedMessage = "Authorization failed";
  static parse(response, originalError) {
    if (!response.body)
      return IModelsErrorParser.createUnrecognizedError(response, originalError);
    if (response.statusCode === 401)
      return IModelsErrorParser.createUnauthorizedError(response, originalError);
    const errorFromApi = response.body;
    const errorCode = IModelsErrorParser.parseCode(errorFromApi?.error?.code);
    if (errorCode === IModelsErrorCode.Unrecognized)
      return IModelsErrorParser.createUnrecognizedError(response, originalError);
    const errorDetails = IModelsErrorParser.parseDetails(errorFromApi.error?.details);
    const errorMessage = IModelsErrorParser.parseAndFormatMessage(errorFromApi?.error?.message, errorDetails);
    return new IModelsErrorImpl({
      code: errorCode,
      statusCode: response.statusCode,
      originalError,
      message: errorMessage,
      details: errorDetails
    });
  }
  static parseCode(errorCode) {
    if (!errorCode)
      return IModelsErrorCode.Unrecognized;
    const adjustedErrorCode = IModelsErrorParser.adjustErrorCodeCaseToMatchEnum(errorCode);
    let parsedCode = IModelsErrorCode[adjustedErrorCode];
    if (!parsedCode)
      parsedCode = IModelsErrorCode.Unrecognized;
    return parsedCode;
  }
  static adjustErrorCodeCaseToMatchEnum(errorCode) {
    return errorCode.replace("iModel", "IModel").replace("iTwin", "ITwin");
  }
  static parseDetails(details) {
    if (!details)
      return void 0;
    return details.map((unparsedDetail) => {
      return { ...unparsedDetail, code: this.parseCode(unparsedDetail.code) };
    });
  }
  static parseAndFormatMessage(message, errorDetails) {
    let result = message ?? IModelsErrorParser._defaultErrorMessage;
    if (!errorDetails || errorDetails.length === 0)
      return result;
    result += " Details:\n";
    for (let i = 0; i < errorDetails.length; i++) {
      result += `${i + 1}. ${errorDetails[i].code}: ${errorDetails[i].message}`;
      if (errorDetails[i].target)
        result += ` Target: ${errorDetails[i].target}.`;
      result += "\n";
    }
    return result;
  }
  static createUnrecognizedError(response, originalError) {
    return new IModelsErrorImpl({
      code: IModelsErrorCode.Unrecognized,
      statusCode: response.statusCode,
      originalError,
      message: `${IModelsErrorParser._defaultErrorMessage}.
Original error message: ${originalError.message},
original error code: ${originalError.code},
response status code: ${response.statusCode},
response body: ${JSON.stringify(response.body)}`,
      details: void 0
    });
  }
  static createUnauthorizedError(response, originalError) {
    const errorMessage = response.body?.error?.message ?? response.body?.message ?? IModelsErrorParser._defaultUnauthorizedMessage;
    return new IModelsErrorImpl({
      code: IModelsErrorCode.Unauthorized,
      statusCode: response.statusCode,
      originalError,
      message: errorMessage,
      details: void 0
    });
  }
}
let Constants$1 = class Constants {
  static api = {
    baseUrl: "https://api.bentley.com/imodels",
    version: "itwin-platform.v2"
  };
  static headers = {
    accept: "Accept",
    authorization: "Authorization",
    contentType: "Content-Type",
    prefer: "Prefer",
    location: "Location"
  };
  static time = {
    sleepPeriodInMs: 1e3,
    iModelInitializationTimeOutInMs: 5 * 60 * 1e3
  };
  static httpStatusCodes = {
    internalServerError: 500
  };
  static retryPolicy = {
    maxRetries: 3,
    baseDelayInMs: 300,
    delayFactor: 3
  };
};
class OperationsBase {
  _options;
  constructor(_options) {
    this._options = _options;
  }
  async sendGetRequest(params) {
    const urlAndHeaders = {
      url: params.url,
      headers: await this.formHeaders(params)
    };
    if (params.responseType === ContentType.Png)
      return this.executeRequest(async () => this._options.restClient.sendGetRequest({
        responseType: ContentType.Png,
        ...urlAndHeaders
      }));
    const responseType = params.responseType ?? ContentType.Json;
    return this.executeRequest(async () => this._options.restClient.sendGetRequest({
      responseType,
      ...urlAndHeaders
    }));
  }
  async sendPostRequest(params) {
    return this.executeRequest(async () => this._options.restClient.sendPostRequest({
      url: params.url,
      body: {
        contentType: ContentType.Json,
        content: params.body
      },
      headers: await this.formHeaders({
        ...params,
        contentType: ContentType.Json
      })
    }));
  }
  async sendPutRequest(params) {
    const body = params.contentType ? {
      contentType: params.contentType,
      content: params.body
    } : void 0;
    return this.executeRequest(async () => this._options.restClient.sendPutRequest({
      url: params.url,
      body,
      headers: await this.formHeaders({
        ...params,
        contentType: params.contentType
      })
    }));
  }
  async sendPatchRequest(params) {
    return this.executeRequest(async () => this._options.restClient.sendPatchRequest({
      url: params.url,
      body: {
        contentType: ContentType.Json,
        content: params.body
      },
      headers: await this.formHeaders({
        ...params,
        contentType: ContentType.Json
      })
    }));
  }
  async sendDeleteRequest(params) {
    return this.executeRequest(async () => this._options.restClient.sendDeleteRequest({
      url: params.url,
      headers: await this.formHeaders(params)
    }));
  }
  async getEntityCollectionPage(params) {
    const response = await this.executeRequest(async () => this.sendGetRequest(params));
    return {
      entities: params.entityCollectionAccessor(response),
      next: response.body._links.next ? async () => this.getEntityCollectionPage({
        ...params,
        url: response.body._links.next.href
      }) : void 0
    };
  }
  async executeRequest(requestFunc) {
    try {
      const response = await requestFunc();
      return response;
    } catch (error) {
      if (error instanceof IModelsErrorBaseImpl)
        throw error;
      const parsedError = this._options.parseErrorFunc(
        { statusCode: error.response?.status, body: error.response?.data },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        error
      );
      throw parsedError;
    }
  }
  resolveHeaderValue(headerOrHeaderFactory) {
    if (typeof headerOrHeaderFactory === "function")
      return headerOrHeaderFactory();
    return headerOrHeaderFactory;
  }
  addOrUpdateHeaders(existingHeaders, additionalHeaders) {
    if (!additionalHeaders)
      return;
    for (const headerName in additionalHeaders) {
      if (Object.prototype.hasOwnProperty.call(additionalHeaders, headerName)) {
        const headerValue = this.resolveHeaderValue(additionalHeaders[headerName]);
        if (typeof headerValue === "string")
          existingHeaders[headerName] = headerValue;
        else
          delete existingHeaders[headerName];
      }
    }
  }
  async formHeaders(params) {
    const headers = {};
    const authorizationInfo = await params.authorization();
    headers[Constants$1.headers.authorization] = `${authorizationInfo.scheme} ${authorizationInfo.token}`;
    headers[Constants$1.headers.accept] = `application/vnd.bentley.${this._options.api.version}+json`;
    if (params.preferReturn)
      headers[Constants$1.headers.prefer] = `return=${params.preferReturn}`;
    if (params.contentType)
      headers[Constants$1.headers.contentType] = params.contentType;
    this.addOrUpdateHeaders(headers, this._options.headers);
    this.addOrUpdateHeaders(headers, params.headers);
    return headers;
  }
}
var UtilityFunctions;
(function(UtilityFunctions2) {
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  UtilityFunctions2.sleep = sleep;
  async function waitForCondition(params) {
    const sleepPeriodInMs = Constants$1.time.sleepPeriodInMs;
    const timeOutInMs = params.timeOutInMs ?? Constants$1.time.iModelInitializationTimeOutInMs;
    for (let retries = Math.ceil(timeOutInMs / sleepPeriodInMs); retries > 0; --retries) {
      const isTargetStateReached = await params.conditionToSatisfy();
      if (isTargetStateReached)
        return;
      await sleep(sleepPeriodInMs);
    }
    const timeoutError = params.timeoutErrorFactory();
    throw timeoutError;
  }
  UtilityFunctions2.waitForCondition = waitForCondition;
})(UtilityFunctions || (UtilityFunctions = {}));
class AxiosResponseHeadersAdapter {
  _response;
  constructor(response) {
    this._response = response;
  }
  get(headerName) {
    if (this._response.headers.get instanceof Function)
      return this._response.headers.get(headerName);
    return this._response.headers[headerName.toLowerCase()];
  }
  getAll() {
    return this._response.headers;
  }
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction$1 = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isEmptyObject = (val) => {
  if (!isObject(val) || isBuffer(val)) {
    return false;
  }
  try {
    return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
  } catch (e) {
    return false;
  }
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isReactNativeBlob = (value) => {
  return !!(value && typeof value.uri !== "undefined");
};
const isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction$1(val.pipe);
function getGlobal() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  return {};
}
const G = getGlobal();
const FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
const isFormData = (thing) => {
  if (!thing) return false;
  if (FormDataCtor && thing instanceof FormDataCtor) return true;
  const proto = getPrototypeOf(thing);
  if (!proto || proto === Object.prototype) return false;
  if (!isFunction$1(thing.append)) return false;
  const kind = kindOf(thing);
  return kind === "formdata" || // detect form-data instance
  kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = [
  "ReadableStream",
  "Request",
  "Response",
  "Headers"
].map(kindOfTest);
const trim = (str) => {
  return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
};
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    if (isBuffer(obj)) {
      return;
    }
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  if (isBuffer(obj)) {
    return null;
  }
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge(...objs) {
  const { caseless, skipUndefined } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return;
    }
    const targetKey = caseless && findKey(result, key) || key;
    const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
    if (isPlainObject(existing) && isPlainObject(val)) {
      result[targetKey] = merge(existing, val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else if (!skipUndefined || !isUndefined(val)) {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l = objs.length; i < l; i++) {
    objs[i] && forEach(objs[i], assignValue);
  }
  return result;
}
const extend = (a, b, thisArg, { allOwnKeys } = {}) => {
  forEach(
    b,
    (val, key) => {
      if (thisArg && isFunction$1(val)) {
        Object.defineProperty(a, key, {
          // Null-proto descriptor so a polluted Object.prototype.get cannot
          // hijack defineProperty's accessor-vs-data resolution.
          __proto__: null,
          value: bind(val, thisArg),
          writable: true,
          enumerable: true,
          configurable: true
        });
      } else {
        Object.defineProperty(a, key, {
          __proto__: null,
          value: val,
          writable: true,
          enumerable: true,
          configurable: true
        });
      }
    },
    { allOwnKeys }
  );
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  Object.defineProperty(constructor.prototype, "constructor", {
    __proto__: null,
    value: constructor,
    writable: true,
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(constructor, "super", {
    __proto__: null,
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
    return p1.toUpperCase() + p2;
  });
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction$1(obj) && ["arguments", "caller", "callee"].includes(name)) {
      return false;
    }
    const value = obj[name];
    if (!isFunction$1(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (isBuffer(source)) {
        return source;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener(
      "message",
      ({ source, data }) => {
        if (source === _global && data === token) {
          callbacks.length && callbacks.shift()();
        }
      },
      false
    );
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isEmptyObject,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isReactNativeBlob,
  isReactNative,
  isBlob,
  isRegExp,
  isFunction: isFunction$1,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = /* @__PURE__ */ Symbol("internals");
const INVALID_HEADER_VALUE_CHARS_RE = /[^\x09\x20-\x7E\x80-\xFF]/g;
function trimSPorHTAB(str) {
  let start = 0;
  let end = str.length;
  while (start < end) {
    const code = str.charCodeAt(start);
    if (code !== 9 && code !== 32) {
      break;
    }
    start += 1;
  }
  while (end > start) {
    const code = str.charCodeAt(end - 1);
    if (code !== 9 && code !== 32) {
      break;
    }
    end -= 1;
  }
  return start === 0 && end === str.length ? str : str.slice(start, end);
}
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function sanitizeHeaderValue(str) {
  return trimSPorHTAB(str.replace(INVALID_HEADER_VALUE_CHARS_RE, ""));
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization"
]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
const REDACTED = "[REDACTED ****]";
function hasOwnOrPrototypeToJSON(source) {
  if (utils$1.hasOwnProp(source, "toJSON")) {
    return true;
  }
  let prototype2 = Object.getPrototypeOf(source);
  while (prototype2 && prototype2 !== Object.prototype) {
    if (utils$1.hasOwnProp(prototype2, "toJSON")) {
      return true;
    }
    prototype2 = Object.getPrototypeOf(prototype2);
  }
  return false;
}
function redactConfig(config, redactKeys) {
  const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
  const seen = [];
  const visit = (source) => {
    if (source === null || typeof source !== "object") return source;
    if (utils$1.isBuffer(source)) return source;
    if (seen.indexOf(source) !== -1) return void 0;
    if (source instanceof AxiosHeaders$1) {
      source = source.toJSON();
    }
    seen.push(source);
    let result;
    if (utils$1.isArray(source)) {
      result = [];
      source.forEach((v, i) => {
        const reducedValue = visit(v);
        if (!utils$1.isUndefined(reducedValue)) {
          result[i] = reducedValue;
        }
      });
    } else {
      if (!utils$1.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
        seen.pop();
        return source;
      }
      result = /* @__PURE__ */ Object.create(null);
      for (const [key, value] of Object.entries(source)) {
        const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
        if (!utils$1.isUndefined(reducedValue)) {
          result[key] = reducedValue;
        }
      }
    }
    seen.pop();
    return result;
  };
  return visit(config);
}
let AxiosError$1 = class AxiosError extends Error {
  static from(error, code, config, request, response, customProps) {
    const axiosError = new AxiosError(error.message, code || error.code, config, request, response);
    axiosError.cause = error;
    axiosError.name = error.name;
    if (error.status != null && axiosError.status == null) {
      axiosError.status = error.status;
    }
    customProps && Object.assign(axiosError, customProps);
    return axiosError;
  }
  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [config] The config.
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   *
   * @returns {Error} The created error.
   */
  constructor(message, code, config, request, response) {
    super(message);
    Object.defineProperty(this, "message", {
      // Null-proto descriptor so a polluted Object.prototype.get cannot turn
      // this data descriptor into an accessor descriptor on the way in.
      __proto__: null,
      value: message,
      enumerable: true,
      writable: true,
      configurable: true
    });
    this.name = "AxiosError";
    this.isAxiosError = true;
    code && (this.code = code);
    config && (this.config = config);
    request && (this.request = request);
    if (response) {
      this.response = response;
      this.status = response.status;
    }
  }
  toJSON() {
    const config = this.config;
    const redactKeys = config && utils$1.hasOwnProp(config, "redact") ? config.redact : void 0;
    const serializedConfig = utils$1.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils$1.toJSONObject(config);
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: serializedConfig,
      code: this.code,
      status: this.status
    };
  }
};
AxiosError$1.ERR_BAD_OPTION_VALUE = "ERR_BAD_OPTION_VALUE";
AxiosError$1.ERR_BAD_OPTION = "ERR_BAD_OPTION";
AxiosError$1.ECONNABORTED = "ECONNABORTED";
AxiosError$1.ETIMEDOUT = "ETIMEDOUT";
AxiosError$1.ECONNREFUSED = "ECONNREFUSED";
AxiosError$1.ERR_NETWORK = "ERR_NETWORK";
AxiosError$1.ERR_FR_TOO_MANY_REDIRECTS = "ERR_FR_TOO_MANY_REDIRECTS";
AxiosError$1.ERR_DEPRECATED = "ERR_DEPRECATED";
AxiosError$1.ERR_BAD_RESPONSE = "ERR_BAD_RESPONSE";
AxiosError$1.ERR_BAD_REQUEST = "ERR_BAD_REQUEST";
AxiosError$1.ERR_CANCELED = "ERR_CANCELED";
AxiosError$1.ERR_NOT_SUPPORT = "ERR_NOT_SUPPORT";
AxiosError$1.ERR_INVALID_URL = "ERR_INVALID_URL";
AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED = "ERR_FORM_DATA_DEPTH_EXCEEDED";
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(
    options,
    {
      metaTokens: true,
      dots: false,
      indexes: false
    },
    false,
    function defined(option, source) {
      return !utils$1.isUndefined(source[option]);
    }
  );
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (utils$1.isBoolean(value)) {
      return value.toString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (utils$1.isReactNative(formData) && utils$1.isReactNativeBlob(value)) {
      formData.append(renderKey(path, key, dots), convertValue(value));
      return false;
    }
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path, depth = 0) {
    if (utils$1.isUndefined(value)) return;
    if (depth > maxDepth) {
      throw new AxiosError$1(
        "Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth,
        AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED
      );
    }
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers);
      if (result === true) {
        build(el, path ? path.concat(key) : [key], depth + 1);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  const _options = utils$1.isFunction(options) ? {
    serialize: options
  } : options;
  const serializeFn = _options && _options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, _options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   * @param {Object} options The options for the interceptor, synchronous and runWhen
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false,
  legacyInterceptorReqResOrdering: true
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), {
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    },
    ...options
  });
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = utils$1.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
const own = (obj, key) => obj != null && utils$1.hasOwnProp(obj, key) ? obj[key] : void 0;
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== "SyntaxError") {
        throw e;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function transformRequest(data, headers) {
      const contentType = headers.getContentType() || "";
      const hasJSONContentType = contentType.indexOf("application/json") > -1;
      const isObjectPayload = utils$1.isObject(data);
      if (isObjectPayload && utils$1.isHTMLForm(data)) {
        data = new FormData(data);
      }
      const isFormData2 = utils$1.isFormData(data);
      if (isFormData2) {
        return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
      }
      if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (utils$1.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils$1.isURLSearchParams(data)) {
        headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
        return data.toString();
      }
      let isFileList2;
      if (isObjectPayload) {
        const formSerializer = own(this, "formSerializer");
        if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
          return toURLEncodedForm(data, formSerializer).toString();
        }
        if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
          const env = own(this, "env");
          const _FormData = env && env.FormData;
          return toFormData$1(
            isFileList2 ? { "files[]": data } : data,
            _FormData && new _FormData(),
            formSerializer
          );
        }
      }
      if (isObjectPayload || hasJSONContentType) {
        headers.setContentType("application/json", false);
        return stringifySafely(data);
      }
      return data;
    }
  ],
  transformResponse: [
    function transformResponse(data) {
      const transitional2 = own(this, "transitional") || defaults.transitional;
      const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
      const responseType = own(this, "responseType");
      const JSONRequested = responseType === "json";
      if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
        return data;
      }
      if (data && utils$1.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
        const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
        const strictJSONParsing = !silentJSONParsing && JSONRequested;
        try {
          return JSON.parse(data, own(this, "parseReviver"));
        } catch (e) {
          if (strictJSONParsing) {
            if (e.name === "SyntaxError") {
              throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
            }
            throw e;
          }
        }
      }
      return data;
    }
  ],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query"], (method) => {
  defaults.headers[method] = {};
});
function transformData(fns, response) {
  const config = this || defaults;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
let CanceledError$1 = class CanceledError extends AxiosError$1 {
  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  constructor(message, config, request) {
    super(message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config, request);
    this.name = "CanceledError";
    this.__CANCEL__ = true;
  }
};
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE,
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn(...args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e) => {
    const rawLoaded = e.loaded;
    const total = e.lengthComputable ? e.total : void 0;
    const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
    const progressBytes = Math.max(0, loaded - bytesNotified);
    const rate = _speedometer(progressBytes);
    bytesNotified = Math.max(bytesNotified, loaded);
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total ? (total - loaded) / rate : void 0,
      event: e,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [
    (loaded) => throttled[0]({
      lengthComputable,
      total,
      loaded
    }),
    throttled[1]
  ];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure, sameSite) {
      if (typeof document === "undefined") return;
      const cookie = [`${name}=${encodeURIComponent(value)}`];
      if (utils$1.isNumber(expires)) {
        cookie.push(`expires=${new Date(expires).toUTCString()}`);
      }
      if (utils$1.isString(path)) {
        cookie.push(`path=${path}`);
      }
      if (utils$1.isString(domain)) {
        cookie.push(`domain=${domain}`);
      }
      if (secure === true) {
        cookie.push("secure");
      }
      if (utils$1.isString(sameSite)) {
        cookie.push(`SameSite=${sameSite}`);
      }
      document.cookie = cookie.join("; ");
    },
    read(name) {
      if (typeof document === "undefined") return null;
      const cookies2 = document.cookie.split(";");
      for (let i = 0; i < cookies2.length; i++) {
        const cookie = cookies2[i].replace(/^\s+/, "");
        const eq = cookie.indexOf("=");
        if (eq !== -1 && cookie.slice(0, eq) === name) {
          return decodeURIComponent(cookie.slice(eq + 1));
        }
      }
      return null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  if (typeof url !== "string") {
    return false;
  }
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config = /* @__PURE__ */ Object.create(null);
  Object.defineProperty(config, "hasOwnProperty", {
    // Null-proto descriptor so a polluted Object.prototype.get cannot turn
    // this data descriptor into an accessor descriptor on the way in.
    __proto__: null,
    value: Object.prototype.hasOwnProperty,
    enumerable: false,
    writable: true,
    configurable: true
  });
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b, prop, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, prop, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a, prop, caseless);
    }
  }
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    }
  }
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(void 0, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b, prop) {
    if (utils$1.hasOwnProp(config2, prop)) {
      return getMergedValue(a, b);
    } else if (utils$1.hasOwnProp(config1, prop)) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    allowedSocketPaths: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
  };
  utils$1.forEach(Object.keys({ ...config1, ...config2 }), function computeConfigValue(prop) {
    if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
    const merge2 = utils$1.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
    const a = utils$1.hasOwnProp(config1, prop) ? config1[prop] : void 0;
    const b = utils$1.hasOwnProp(config2, prop) ? config2[prop] : void 0;
    const configValue = merge2(a, b, prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
function setFormDataHeaders(headers, formHeaders, policy) {
  if (policy !== "content-only") {
    headers.set(formHeaders);
    return;
  }
  Object.entries(formHeaders).forEach(([key, val]) => {
    if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) {
      headers.set(key, val);
    }
  });
}
const encodeUTF8 = (str) => encodeURIComponent(str).replace(
  /%([0-9A-F]{2})/gi,
  (_, hex) => String.fromCharCode(parseInt(hex, 16))
);
const resolveConfig = (config) => {
  const newConfig = mergeConfig$1({}, config);
  const own2 = (key) => utils$1.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
  const data = own2("data");
  let withXSRFToken = own2("withXSRFToken");
  const xsrfHeaderName = own2("xsrfHeaderName");
  const xsrfCookieName = own2("xsrfCookieName");
  let headers = own2("headers");
  const auth = own2("auth");
  const baseURL = own2("baseURL");
  const allowAbsoluteUrls = own2("allowAbsoluteUrls");
  const url = own2("url");
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(
    buildFullPath(baseURL, url, allowAbsoluteUrls),
    config.params,
    config.paramsSerializer
  );
  if (auth) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth.username || "") + ":" + (auth.password ? encodeUTF8(auth.password) : ""))
    );
  }
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if (utils$1.isFunction(data.getHeaders)) {
      setFormDataHeaders(headers, data.getHeaders(), own2("formDataHeaderPolicy"));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    if (utils$1.isFunction(withXSRFToken)) {
      withXSRFToken = withXSRFToken(newConfig);
    }
    const shouldSendXSRF = withXSRFToken === true || withXSRFToken == null && isURLSameOrigin(newConfig.url);
    if (shouldSendXSRF) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(
        function _resolve(value) {
          resolve(value);
          done();
        },
        function _reject(err) {
          reject(err);
          done();
        },
        response
      );
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
      done();
      request = null;
    };
    request.onerror = function handleError(event) {
      const msg = event && event.message ? event.message : "Network Error";
      const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
      err.event = event || null;
      reject(err);
      done();
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(
        new AxiosError$1(
          timeoutErrorMessage,
          transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
          config,
          request
        )
      );
      done();
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
        request.abort();
        done();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && !platform.protocols.includes(protocol)) {
      reject(
        new AxiosError$1(
          "Unsupported protocol " + protocol + ":",
          AxiosError$1.ERR_BAD_REQUEST,
          config
        )
      );
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(
          err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err)
        );
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e);
    }
  };
  return new ReadableStream(
    {
      async pull(controller) {
        try {
          const { done: done2, value } = await iterator2.next();
          if (done2) {
            _onFinish();
            controller.close();
            return;
          }
          let len = value.byteLength;
          if (onProgress) {
            let loadedBytes = bytes += len;
            onProgress(loadedBytes);
          }
          controller.enqueue(new Uint8Array(value));
        } catch (err) {
          _onFinish(err);
          throw err;
        }
      },
      cancel(reason) {
        _onFinish(reason);
        return iterator2.return();
      }
    },
    {
      highWaterMark: 2
    }
  );
};
function estimateDataURLDecodedBytes(url) {
  if (!url || typeof url !== "string") return 0;
  if (!url.startsWith("data:")) return 0;
  const comma = url.indexOf(",");
  if (comma < 0) return 0;
  const meta = url.slice(5, comma);
  const body = url.slice(comma + 1);
  const isBase64 = /;base64/i.test(meta);
  if (isBase64) {
    let effectiveLen = body.length;
    const len = body.length;
    for (let i = 0; i < len; i++) {
      if (body.charCodeAt(i) === 37 && i + 2 < len) {
        const a = body.charCodeAt(i + 1);
        const b = body.charCodeAt(i + 2);
        const isHex = (a >= 48 && a <= 57 || a >= 65 && a <= 70 || a >= 97 && a <= 102) && (b >= 48 && b <= 57 || b >= 65 && b <= 70 || b >= 97 && b <= 102);
        if (isHex) {
          effectiveLen -= 2;
          i += 2;
        }
      }
    }
    let pad = 0;
    let idx = len - 1;
    const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && // '%'
    body.charCodeAt(j - 1) === 51 && // '3'
    (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
    if (idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
        idx--;
      } else if (tailIsPct3D(idx)) {
        pad++;
        idx -= 3;
      }
    }
    if (pad === 1 && idx >= 0) {
      if (body.charCodeAt(idx) === 61) {
        pad++;
      } else if (tailIsPct3D(idx)) {
        pad++;
      }
    }
    const groups = Math.floor(effectiveLen / 4);
    const bytes2 = groups * 3 - (pad || 0);
    return bytes2 > 0 ? bytes2 : 0;
  }
  if (typeof Buffer !== "undefined" && typeof Buffer.byteLength === "function") {
    return Buffer.byteLength(body, "utf8");
  }
  let bytes = 0;
  for (let i = 0, len = body.length; i < len; i++) {
    const c = body.charCodeAt(i);
    if (c < 128) {
      bytes += 1;
    } else if (c < 2048) {
      bytes += 2;
    } else if (c >= 55296 && c <= 56319 && i + 1 < len) {
      const next = body.charCodeAt(i + 1);
      if (next >= 56320 && next <= 57343) {
        bytes += 4;
        i++;
      } else {
        bytes += 3;
      }
    } else {
      bytes += 3;
    }
  }
  return bytes;
}
const VERSION$1 = "1.16.0";
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const { isFunction } = utils$1;
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e) {
    return false;
  }
};
const factory = (env) => {
  const globalObject = utils$1.global ?? globalThis;
  const { ReadableStream: ReadableStream2, TextEncoder } = globalObject;
  env = utils$1.merge.call(
    {
      skipUndefined: true
    },
    {
      Request: globalObject.Request,
      Response: globalObject.Response
    },
    env
  );
  const { fetch: envFetch, Request, Response } = env;
  const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
  const isRequestSupported = isFunction(Request);
  const isResponseSupported = isFunction(Response);
  if (!isFetchSupported) {
    return false;
  }
  const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream2);
  const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
  const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
    let duplexAccessed = false;
    const request = new Request(platform.origin, {
      body: new ReadableStream2(),
      method: "POST",
      get duplex() {
        duplexAccessed = true;
        return "half";
      }
    });
    const hasContentType = request.headers.has("Content-Type");
    if (request.body != null) {
      request.body.cancel();
    }
    return duplexAccessed && !hasContentType;
  });
  const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
  const resolvers = {
    stream: supportsResponseStream && ((res) => res.body)
  };
  isFetchSupported && (() => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
      !resolvers[type] && (resolvers[type] = (res, config) => {
        let method = res && res[type];
        if (method) {
          return method.call(res);
        }
        throw new AxiosError$1(
          `Response type '${type}' is not supported`,
          AxiosError$1.ERR_NOT_SUPPORT,
          config
        );
      });
    });
  })();
  const getBodyLength = async (body) => {
    if (body == null) {
      return 0;
    }
    if (utils$1.isBlob(body)) {
      return body.size;
    }
    if (utils$1.isSpecCompliantForm(body)) {
      const _request = new Request(platform.origin, {
        method: "POST",
        body
      });
      return (await _request.arrayBuffer()).byteLength;
    }
    if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
      return body.byteLength;
    }
    if (utils$1.isURLSearchParams(body)) {
      body = body + "";
    }
    if (utils$1.isString(body)) {
      return (await encodeText(body)).byteLength;
    }
  };
  const resolveBodyLength = async (headers, body) => {
    const length = utils$1.toFiniteNumber(headers.getContentLength());
    return length == null ? getBodyLength(body) : length;
  };
  return async (config) => {
    let {
      url,
      method,
      data,
      signal,
      cancelToken,
      timeout,
      onDownloadProgress,
      onUploadProgress,
      responseType,
      headers,
      withCredentials = "same-origin",
      fetchOptions,
      maxContentLength,
      maxBodyLength
    } = resolveConfig(config);
    const hasMaxContentLength = utils$1.isNumber(maxContentLength) && maxContentLength > -1;
    const hasMaxBodyLength = utils$1.isNumber(maxBodyLength) && maxBodyLength > -1;
    let _fetch = envFetch || fetch;
    responseType = responseType ? (responseType + "").toLowerCase() : "text";
    let composedSignal = composeSignals(
      [signal, cancelToken && cancelToken.toAbortSignal()],
      timeout
    );
    let request = null;
    const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
      composedSignal.unsubscribe();
    });
    let requestContentLength;
    try {
      if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
        const estimated = estimateDataURLDecodedBytes(url);
        if (estimated > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      if (hasMaxBodyLength && method !== "get" && method !== "head") {
        const outboundLength = await resolveBodyLength(headers, data);
        if (typeof outboundLength === "number" && isFinite(outboundLength) && outboundLength > maxBodyLength) {
          throw new AxiosError$1(
            "Request body larger than maxBodyLength limit",
            AxiosError$1.ERR_BAD_REQUEST,
            config,
            request
          );
        }
      }
      if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
        let _request = new Request(url, {
          method: "POST",
          body: data,
          duplex: "half"
        });
        let contentTypeHeader;
        if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
          headers.setContentType(contentTypeHeader);
        }
        if (_request.body) {
          const [onProgress, flush] = progressEventDecorator(
            requestContentLength,
            progressEventReducer(asyncDecorator(onUploadProgress))
          );
          data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
        }
      }
      if (!utils$1.isString(withCredentials)) {
        withCredentials = withCredentials ? "include" : "omit";
      }
      const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
      if (utils$1.isFormData(data)) {
        const contentType = headers.getContentType();
        if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) {
          headers.delete("content-type");
        }
      }
      headers.set("User-Agent", "axios/" + VERSION$1, false);
      const resolvedOptions = {
        ...fetchOptions,
        signal: composedSignal,
        method: method.toUpperCase(),
        headers: headers.normalize().toJSON(),
        body: data,
        duplex: "half",
        credentials: isCredentialsSupported ? withCredentials : void 0
      };
      request = isRequestSupported && new Request(url, resolvedOptions);
      let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
      if (hasMaxContentLength) {
        const declaredLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        if (declaredLength != null && declaredLength > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
      if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
        const options = {};
        ["status", "statusText", "headers"].forEach((prop) => {
          options[prop] = response[prop];
        });
        const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
        const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
          responseContentLength,
          progressEventReducer(asyncDecorator(onDownloadProgress), true)
        ) || [];
        let bytesRead = 0;
        const onChunkProgress = (loadedBytes) => {
          if (hasMaxContentLength) {
            bytesRead = loadedBytes;
            if (bytesRead > maxContentLength) {
              throw new AxiosError$1(
                "maxContentLength size of " + maxContentLength + " exceeded",
                AxiosError$1.ERR_BAD_RESPONSE,
                config,
                request
              );
            }
          }
          onProgress && onProgress(loadedBytes);
        };
        response = new Response(
          trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
            flush && flush();
            unsubscribe && unsubscribe();
          }),
          options
        );
      }
      responseType = responseType || "text";
      let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](
        response,
        config
      );
      if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
        let materializedSize;
        if (responseData != null) {
          if (typeof responseData.byteLength === "number") {
            materializedSize = responseData.byteLength;
          } else if (typeof responseData.size === "number") {
            materializedSize = responseData.size;
          } else if (typeof responseData === "string") {
            materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
          }
        }
        if (typeof materializedSize === "number" && materializedSize > maxContentLength) {
          throw new AxiosError$1(
            "maxContentLength size of " + maxContentLength + " exceeded",
            AxiosError$1.ERR_BAD_RESPONSE,
            config,
            request
          );
        }
      }
      !isStreamResponse && unsubscribe && unsubscribe();
      return await new Promise((resolve, reject) => {
        settle(resolve, reject, {
          data: responseData,
          headers: AxiosHeaders$1.from(response.headers),
          status: response.status,
          statusText: response.statusText,
          config,
          request
        });
      });
    } catch (err) {
      unsubscribe && unsubscribe();
      if (composedSignal && composedSignal.aborted && composedSignal.reason instanceof AxiosError$1) {
        const canceledError = composedSignal.reason;
        canceledError.config = config;
        request && (canceledError.request = request);
        err !== canceledError && (canceledError.cause = err);
        throw canceledError;
      }
      if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
        throw Object.assign(
          new AxiosError$1(
            "Network Error",
            AxiosError$1.ERR_NETWORK,
            config,
            request,
            err && err.response
          ),
          {
            cause: err.cause || err
          }
        );
      }
      throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
    }
  };
};
const seedCache = /* @__PURE__ */ new Map();
const getFetch = (config) => {
  let env = config && config.env || {};
  const { fetch: fetch2, Request, Response } = env;
  const seeds = [Request, Response, fetch2];
  let len = seeds.length, i = len, seed, target, map = seedCache;
  while (i--) {
    seed = seeds[i];
    target = map.get(seed);
    target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
    map = target;
  }
  return target;
};
getFetch();
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: {
    get: getFetch
  }
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { __proto__: null, value });
    } catch (e) {
    }
    Object.defineProperty(fn, "adapterName", { __proto__: null, value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
function getAdapter$1(adapters2, config) {
  adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
  const { length } = adapters2;
  let nameOrAdapter;
  let adapter;
  const rejectedReasons = {};
  for (let i = 0; i < length; i++) {
    nameOrAdapter = adapters2[i];
    let id;
    adapter = nameOrAdapter;
    if (!isResolvedHandle(nameOrAdapter)) {
      adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
      if (adapter === void 0) {
        throw new AxiosError$1(`Unknown adapter '${id}'`);
      }
    }
    if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
      break;
    }
    rejectedReasons[id || "#" + i] = adapter;
  }
  if (!adapter) {
    const reasons = Object.entries(rejectedReasons).map(
      ([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build")
    );
    let s = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
    throw new AxiosError$1(
      `There is no suitable adapter to dispatch the request ` + s,
      "ERR_NOT_SUPPORT"
    );
  }
  return adapter;
}
const adapters = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: getAdapter$1,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError$1(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(config, config.transformRequest);
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);
  return adapter(config).then(
    function onAdapterResolution(response) {
      throwIfCancellationRequested(config);
      config.response = response;
      try {
        response.data = transformData.call(config, config.transformResponse, response);
      } finally {
        delete config.response;
      }
      response.headers = AxiosHeaders$1.from(response.headers);
      return response;
    },
    function onAdapterRejection(reason) {
      if (!isCancel$1(reason)) {
        throwIfCancellationRequested(config);
        if (reason && reason.response) {
          config.response = reason.response;
          try {
            reason.response.data = transformData.call(
              config,
              config.transformResponse,
              reason.response
            );
          } finally {
            delete config.response;
          }
          reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
        }
      }
      return Promise.reject(reason);
    }
  );
}
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1(
          "option " + opt + " must be " + result,
          AxiosError$1.ERR_BAD_OPTION_VALUE
        );
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = (() => {
          if (!dummy.stack) {
            return "";
          }
          const firstNewlineIndex = dummy.stack.indexOf("\n");
          return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
        })();
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack) {
            const firstNewlineIndex = stack.indexOf("\n");
            const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
            const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
            if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) {
              err.stack += "\n" + stack;
            }
          }
        } catch (e) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig$1(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(
        transitional2,
        {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean),
          legacyInterceptorReqResOrdering: validators.transitional(validators.boolean)
        },
        false
      );
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(
          paramsSerializer,
          {
            encode: validators.function,
            serialize: validators.function
          },
          true
        );
      }
    }
    if (config.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config.allowAbsoluteUrls = true;
    }
    validator.assertOptions(
      config,
      {
        baseUrl: validators.spelling("baseURL"),
        withXsrfToken: validators.spelling("withXSRFToken")
      },
      true
    );
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(headers.common, headers[config.method]);
    headers && utils$1.forEach(["delete", "get", "head", "post", "put", "patch", "query", "common"], (method) => {
      delete headers[method];
    });
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      const transitional3 = config.transitional || transitionalDefaults;
      const legacyInterceptorReqResOrdering = transitional3 && transitional3.legacyInterceptorReqResOrdering;
      if (legacyInterceptorReqResOrdering) {
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      } else {
        requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      }
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift(...requestInterceptorChain);
      chain.push(...responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig$1(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config) {
    return this.request(
      mergeConfig$1(config || {}, {
        method,
        url,
        data: (config || {}).data
      })
    );
  };
});
utils$1.forEach(["post", "put", "patch", "query"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(
        mergeConfig$1(config || {}, {
          method,
          headers: isForm ? {
            "Content-Type": "multipart/form-data"
          } : {},
          url,
          data
        })
      );
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  if (method !== "query") {
    Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
  }
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create2(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError: AxiosError2,
  CanceledError: CanceledError2,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig,
  create
} = axios;
class AxiosRestClient {
  static retryCountUpperBound = 10;
  _retryPolicy;
  constructor(retryPolicy) {
    this._retryPolicy = retryPolicy;
  }
  async sendGetRequest(params) {
    const requestConfig = {
      headers: params.headers
    };
    if (params.responseType === ContentType.Png) {
      requestConfig.responseType = "arraybuffer";
      const response = await this.executeRequest(async () => axios.get(params.url, requestConfig));
      const data = response.body;
      if (data instanceof ArrayBuffer)
        return { ...response, body: new Uint8Array(data) };
      return response;
    }
    return this.executeRequest(async () => axios.get(params.url, requestConfig));
  }
  async sendPostRequest(params) {
    const requestConfig = {
      headers: params.headers
    };
    return this.executeRequest(async () => axios.post(params.url, params.body.content ?? {}, requestConfig));
  }
  async sendPutRequest(params) {
    const requestConfig = {
      headers: params.headers
    };
    return this.executeRequest(async () => axios.put(params.url, params.body?.content, requestConfig));
  }
  async sendPatchRequest(params) {
    const requestConfig = {
      headers: params.headers
    };
    return this.executeRequest(async () => axios.patch(params.url, params.body.content ?? {}, requestConfig));
  }
  async sendDeleteRequest(params) {
    const requestConfig = {
      headers: params.headers
    };
    return this.executeRequest(async () => axios.delete(params.url, requestConfig));
  }
  async executeRequest(requestFunc) {
    const response = await this.executeWithRetry(requestFunc);
    return {
      body: response.data,
      headers: new AxiosResponseHeadersAdapter(response)
    };
  }
  async executeWithRetry(requestFunc) {
    let retriesInvoked = 0;
    for (; ; ) {
      try {
        return await requestFunc();
      } catch (error) {
        if (this._retryPolicy === null || retriesInvoked >= this._retryPolicy.maxRetries || retriesInvoked >= AxiosRestClient.retryCountUpperBound || !await this._retryPolicy.shouldRetry({ retriesInvoked, error })) {
          throw error;
        }
        const sleepDurationInMs = this._retryPolicy.getSleepDurationInMs({
          retriesInvoked: retriesInvoked++
        });
        if (sleepDurationInMs > 0) {
          await UtilityFunctions.sleep(sleepDurationInMs);
        }
      }
    }
  }
}
class AxiosRetryPolicy {
  _backoffAlgorithm;
  constructor(params) {
    this.maxRetries = params.maxRetries;
    this._backoffAlgorithm = params.backoffAlgorithm;
  }
  maxRetries;
  shouldRetry(params) {
    if (isAxiosError(params.error) && params.error.response?.status != null) {
      return params.error.response.status >= Constants$1.httpStatusCodes.internalServerError;
    }
    return true;
  }
  getSleepDurationInMs(params) {
    return this._backoffAlgorithm.getSleepDurationInMs(params.retriesInvoked);
  }
}
class ExponentialBackoffAlgorithm {
  _baseDelayInMs;
  _factor;
  constructor(params) {
    this._baseDelayInMs = params.baseDelayInMs;
    this._factor = params.factor;
  }
  getSleepDurationInMs(attempt) {
    return Math.pow(this._factor, attempt) * this._baseDelayInMs;
  }
}
async function getUser(authorization, userOperations, urlFormatter, userLink, headers) {
  if (!userLink)
    return void 0;
  const { iModelId, userId } = urlFormatter.parseUserUrl(userLink);
  return userOperations.getSingle({
    authorization,
    iModelId,
    userId,
    headers
  });
}
function assertStringHeaderValue(headerName, headerValue) {
  const isString2 = typeof headerValue === "string" || headerValue instanceof String;
  if (!isString2)
    throw new Error(`Assertion failed: header's ${headerName} value is not a string.`);
}
function assertLink(link) {
  if (!link || !link.href)
    throw new Error("Assertion failed: link is falsy.");
}
class IModelOperations extends OperationsBase {
  _iModelsClient;
  constructor(options, _iModelsClient) {
    super(options);
    this._iModelsClient = _iModelsClient;
  }
  /**
   * Gets iModels for a specific iTwin. This method returns iModels in their minimal representation. The returned iterator
   * internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-itwin-imodels/ Get iTwin iModels}
   * operation from iModels API.
   * @param {GetIModelListParams} params parameters for this operation. See {@link GetIModelListParams}.
   * @returns {EntityListIterator<MinimalIModel>} iterator for iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.iModels,
      headers: params.headers
    }));
  }
  /**
   * Gets iModels for a specific iTwin. This method returns iModels in their full representation. The returned iterator
   * internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-itwin-imodels/ Get iTwin iModels}
   * operation from iModels API.
   * @param {GetIModelListParams} params parameters for this operation. See {@link GetIModelListParams}.
   * @returns {EntityListIterator<IModel>} iterator for iModel list. See {@link EntityListIterator}, {@link IModel}.
   */
  getRepresentationList(params) {
    const entityCollectionAccessor = (response) => {
      const iModels = response.body.iModels;
      const mappedIModels = iModels.map((iModel) => this.appendRelatedEntityCallbacks(params.authorization, iModel, params.headers));
      return mappedIModels;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single iModel by its id. This method returns an iModel in its full representation. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-details/ Get iModel} operation from iModels API.
   * @param {GetSingleIModelParams} params parameters for this operation. See {@link GetSingleIModelParams}.
   * @returns {Promise<iModel>} an iModel with specified id. See {@link IModel}.
   */
  async getSingle(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, response.body.iModel, params.headers);
    return result;
  }
  /**
   * Creates an empty iModel with specified properties. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel/ Create iModel} operation from iModels API.
   * @param {CreateEmptyIModelParams} params parameters for this operation. See {@link CreateEmptyIModelParams}.
   * @returns {Promise<iModel>} newly created iModel. See {@link IModel}.
   */
  async createEmpty(params) {
    const createIModelBody = this.getCreateEmptyIModelRequestBody(params.iModelProperties);
    if (createIModelBody.geographicCoordinateSystem && createIModelBody.creationMode !== "empty") {
      throw new IModelsErrorImpl({
        code: IModelsErrorCode.InvalidIModelGCSCreationMode,
        message: "For empty iModels, GeographicCoordinateSystem can only be set when creationMode is 'empty'.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      });
    }
    let createdIModel = await this.sendIModelPostRequest(params.authorization, createIModelBody, params.headers);
    if (createdIModel.state === IModelState.NotInitialized) {
      await this.waitForEmptyIModelInitialization({
        authorization: params.authorization,
        headers: params.headers,
        iModelId: createdIModel.id,
        timeOutInMs: params.timeOutInMs
      });
      createdIModel = await this.getSingle({
        authorization: params.authorization,
        iModelId: createdIModel.id
      });
    }
    const result = this.appendRelatedEntityCallbacks(params.authorization, createdIModel, params.headers);
    return result;
  }
  /**
   * Creates an iModel from a template. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel/ Create iModel} operation from iModels API.
   * It uses the `template` request body property to specify the source iModel which will be used as a template. Internally
   * this method creates the iModel instance and then repeatedly queries the iModel state until the iModel is initialized.
   * The execution of this method can take up to several minutes due to waiting for initialization to complete.
   * @param {CreateIModelFromTemplateParams} params parameters for this operation. See {@link CreateIModelFromTemplateParams}.
   * @returns {Promise<iModel>} newly created iModel. See {@link IModel}.
   * @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.IModelFromTemplateInitializationFailed} if
   * iModel initialization failed or did not complete in time. See {@link IModelsErrorCode}.
   */
  async createFromTemplate(params) {
    const createIModelBody = this.getCreateIModelFromTemplateRequestBody(params.iModelProperties);
    const createdIModel = await this.sendIModelPostRequest(params.authorization, createIModelBody, params.headers);
    await this.waitForTemplatedIModelInitialization({
      authorization: params.authorization,
      iModelId: createdIModel.id,
      headers: params.headers,
      timeOutInMs: params.timeOutInMs
    });
    return this.getSingle({
      authorization: params.authorization,
      iModelId: createdIModel.id,
      headers: params.headers
    });
  }
  /**
   * Clones the specified iModel. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/clone-imodel/ Clone iModel} operation from iModels API.
   * Internally this method clones the iModel and then repeatedly queries the new iModel's state until it is initialized.
   * The execution of this method can take up to several minutes due to waiting for initialization to complete.
   * @param {CloneIModelParams} params parameters for this operation. See {@link CloneIModelParams}.
   * @returns {Promise<IModel>} newly created iModel. See {@link IModel}.
   * @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.ClonedIModelInitializationFailed} if
   * iModel initialization failed or {@link IModelsErrorCode.ClonedIModelInitializationTimedOut} if operation did not complete in time.
   * See {@link IModelsErrorCode}.
   */
  async clone(params) {
    const cloneIModelBody = this.getCloneIModelRequestBody(params.iModelProperties);
    const cloneIModelResponse = await this.sendPostRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getCloneIModelUrl({
        iModelId: params.iModelId
      }),
      body: cloneIModelBody,
      headers: params.headers
    });
    const locationHeaderValue = cloneIModelResponse.headers.get(Constants$1.headers.location);
    assertStringHeaderValue(Constants$1.headers.location, locationHeaderValue);
    const { iModelId: clonedIModelId } = this._options.urlFormatter.parseIModelUrl(locationHeaderValue);
    await this.waitForClonedIModelInitialization({
      authorization: params.authorization,
      iModelId: clonedIModelId,
      headers: params.headers,
      timeOutInMs: params.timeOutInMs
    });
    return this.getSingle({
      authorization: params.authorization,
      iModelId: clonedIModelId
    });
  }
  /**
   * Forks the specified iModel. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/fork-imodel/ Fork iModel} operation from iModels API.
   * Internally this method forks the iModel and then repeatedly queries the new iModel's creation state until it is succeeded.
   * The execution of this method can take up to several minutes due to waiting for initialization to complete.
   * @param {ForkIModelParams} params parameters for this operation. See {@link ForkIModelParams}.
   * @returns {Promise<IModel>} newly created iModel. See {@link IModel}.
   * @throws an error that implements `iModelsError` interface with code {@link IModelsErrorCode.IModelForkInitializationFailed} if
   * iModel initialization failed, {@link IModelsErrorCode.IModelForkInitializationTimedOut} if operation did not complete in time or
   * {@link IModelsErrorCode.MainIModelIsMissingFederationGuids} if the iModel from which user is attempting to create a fork does not
   * have {@link https://www.itwinjs.org/bis/guide/fundamentals/federationguids/ FederationGuid} property set on all its elements.
   * See {@link IModelsErrorCode}.
   */
  async fork(params) {
    const forkIModelBody = this.getForkIModelRequestBody(params.iModelProperties);
    const forkIModelResponse = await this.sendPostRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getForkIModelUrl({
        iModelId: params.iModelId
      }),
      body: forkIModelBody,
      headers: params.headers
    });
    const locationHeaderValue = forkIModelResponse.headers.get(Constants$1.headers.location);
    assertStringHeaderValue(Constants$1.headers.location, locationHeaderValue);
    const { iModelId: forkIModelId } = this._options.urlFormatter.parseIModelUrl(locationHeaderValue);
    await this.waitForIModelForkInitialization({
      authorization: params.authorization,
      iModelId: forkIModelId,
      headers: params.headers,
      timeOutInMs: params.timeOutInMs
    });
    return this.getSingle({
      authorization: params.authorization,
      iModelId: forkIModelId
    });
  }
  /**
   * Updates iModel properties. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/update-imodel/ Update iModel} operation from iModels API.
   * @param {UpdateIModelParams} params parameters for this operation. See {@link UpdateIModelParams}.
   * @returns {Promise<IModel>} updated iModel. See {@link IModel}.
   */
  async update(params) {
    const updateIModelBody = this.getUpdateIModelRequestBody(params.iModelProperties);
    const updateIModelResponse = await this.sendPatchRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleIModelUrl({
        iModelId: params.iModelId
      }),
      body: updateIModelBody,
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, updateIModelResponse.body.iModel, params.headers);
    return result;
  }
  /**
   * Deletes an iModel with specified id. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/delete-imodel/ Delete iModel}
   * operation from iModels API.
   * @param {DeleteIModelParams} params parameters for this operation. See {@link DeleteIModelParams}.
   * @returns {Promise<void>} a promise that resolves after operation completes.
   */
  async delete(params) {
    await this.sendDeleteRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
  }
  appendRelatedEntityCallbacks(authorization, iModel, headers) {
    const getCreator = async () => this.getCreator(authorization, iModel._links.creator?.href, headers);
    const result = {
      ...iModel,
      getCreator
    };
    return result;
  }
  getCreateEmptyIModelRequestBody(iModelProperties) {
    const result = {
      iTwinId: iModelProperties.iTwinId,
      name: iModelProperties.name,
      description: iModelProperties.description,
      extent: iModelProperties.extent,
      containersEnabled: iModelProperties.containersEnabled,
      creationMode: iModelProperties.creationMode,
      geographicCoordinateSystem: iModelProperties.geographicCoordinateSystem
    };
    return result;
  }
  async sendIModelPostRequest(authorization, createIModelBody, headers) {
    const createIModelResponse = await this.sendPostRequest({
      authorization,
      url: this._options.urlFormatter.getCreateIModelUrl(),
      body: createIModelBody,
      headers
    });
    return createIModelResponse.body.iModel;
  }
  async getCreator(authorization, creatorLink, headers) {
    if (!creatorLink)
      return void 0;
    const { iModelId, userId } = this._options.urlFormatter.parseUserUrl(creatorLink);
    return this._iModelsClient.users.getSingle({
      authorization,
      iModelId,
      userId,
      headers
    });
  }
  getCreateIModelFromTemplateRequestBody(iModelProperties) {
    const emptyIModelParams = this.getCreateEmptyIModelRequestBody(iModelProperties);
    return {
      ...emptyIModelParams,
      template: {
        iModelId: iModelProperties.template.iModelId,
        changesetId: iModelProperties.template.changesetId
      }
    };
  }
  getCloneIModelRequestBody(iModelProperties) {
    return {
      iTwinId: iModelProperties.iTwinId,
      name: iModelProperties.name,
      description: iModelProperties.description,
      changesetId: iModelProperties.changesetId,
      changesetIndex: iModelProperties.changesetIndex,
      containersEnabled: iModelProperties.containersEnabled
    };
  }
  getForkIModelRequestBody(iModelProperties) {
    return {
      iTwinId: iModelProperties.iTwinId,
      name: iModelProperties.name,
      description: iModelProperties.description,
      changesetId: iModelProperties.changesetId,
      changesetIndex: iModelProperties.changesetIndex,
      preserveHistory: iModelProperties.preserveHistory,
      containersEnabled: iModelProperties.containersEnabled
    };
  }
  getUpdateIModelRequestBody(iModelProperties) {
    return {
      name: iModelProperties.name,
      description: iModelProperties.description,
      extent: iModelProperties.extent
    };
  }
  async isIModelInitialized(params) {
    const { state } = await this._iModelsClient.operations.getCreateIModelDetails({
      authorization: params.authorization,
      iModelId: params.iModelId,
      headers: params.headers
    });
    if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful)
      throw new IModelsErrorImpl({
        code: params.errorCodeOnFailure,
        message: `iModel initialization failed with state '${state}'`,
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      });
    return state === IModelCreationState.Successful;
  }
  async isIModelForkInitialized(params) {
    const { state } = await this._iModelsClient.operations.getCreateIModelDetails({
      authorization: params.authorization,
      iModelId: params.iModelId,
      headers: params.headers
    });
    if (state === IModelCreationState.MainIModelIsMissingFederationGuids)
      throw new IModelsErrorImpl({
        code: IModelsErrorCode.MainIModelIsMissingFederationGuids,
        message: "iModel fork initialization failed because some elements in the main iModel do not have FederationGuid property set.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      });
    if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful)
      throw new IModelsErrorImpl({
        code: IModelsErrorCode.IModelForkInitializationFailed,
        message: `iModel fork initialization failed with state '${state}'`,
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      });
    return state === IModelCreationState.Successful;
  }
  async waitForEmptyIModelInitialization(params) {
    return UtilityFunctions.waitForCondition({
      conditionToSatisfy: async () => this.isIModelInitialized({
        authorization: params.authorization,
        iModelId: params.iModelId,
        errorCodeOnFailure: IModelsErrorCode.EmptyIModelInitializationFailed,
        headers: params.headers
      }),
      timeoutErrorFactory: () => new IModelsErrorImpl({
        code: IModelsErrorCode.EmptyIModelInitializationFailed,
        message: "Timed out waiting for empty iModel initialization.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      }),
      timeOutInMs: params.timeOutInMs
    });
  }
  async waitForTemplatedIModelInitialization(params) {
    return UtilityFunctions.waitForCondition({
      conditionToSatisfy: async () => this.isIModelInitialized({
        authorization: params.authorization,
        iModelId: params.iModelId,
        errorCodeOnFailure: IModelsErrorCode.IModelFromTemplateInitializationFailed,
        headers: params.headers
      }),
      timeoutErrorFactory: () => new IModelsErrorImpl({
        code: IModelsErrorCode.IModelFromTemplateInitializationTimedOut,
        message: "Timed out waiting for Baseline File initialization.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      }),
      timeOutInMs: params.timeOutInMs
    });
  }
  async waitForClonedIModelInitialization(params) {
    return UtilityFunctions.waitForCondition({
      conditionToSatisfy: async () => this.isIModelInitialized({
        authorization: params.authorization,
        iModelId: params.iModelId,
        errorCodeOnFailure: IModelsErrorCode.ClonedIModelInitializationFailed,
        headers: params.headers
      }),
      timeoutErrorFactory: () => new IModelsErrorImpl({
        code: IModelsErrorCode.ClonedIModelInitializationTimedOut,
        message: "Timed out waiting for Cloned iModel initialization.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      }),
      timeOutInMs: params.timeOutInMs
    });
  }
  async waitForIModelForkInitialization(params) {
    return UtilityFunctions.waitForCondition({
      conditionToSatisfy: async () => this.isIModelForkInitialized({
        authorization: params.authorization,
        iModelId: params.iModelId,
        headers: params.headers
      }),
      timeoutErrorFactory: () => new IModelsErrorImpl({
        code: IModelsErrorCode.IModelForkInitializationTimedOut,
        message: "Timed out waiting for iModel fork initialization.",
        originalError: void 0,
        statusCode: void 0,
        details: void 0
      }),
      timeOutInMs: params.timeOutInMs
    });
  }
}
class BriefcaseOperations extends OperationsBase {
  _iModelsClient;
  constructor(options, _iModelsClient) {
    super(options);
    this._iModelsClient = _iModelsClient;
  }
  /**
   * Gets Briefcases of a specific iModel. This method returns Briefcases in their minimal representation. The returned iterator
   * internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcases/ Get iModel Briefcases}
   * operation from iModels API.
   * @param {GetBriefcaseListParams} params parameters for this operation. See {@link GetBriefcaseListParams}.
   * @returns {EntityListIterator<MinimalBriefcase>} iterator for Briefcase list. See {@link EntityListIterator},
   * {@link MinimalBriefcase}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getBriefcaseListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.briefcases,
      headers: params.headers
    }));
  }
  /**
   * Gets Briefcases of a specific iModel. This method returns Briefcases in their full representation. The returned iterator
   * internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcases/ Get iModel Briefcases}
   * operation from iModels API.
   * @param {GetBriefcaseListParams} params parameters for this operation. See {@link GetBriefcaseListParams}.
   * @returns {EntityListIterator<Briefcase>} iterator for Briefcase list. See {@link EntityListIterator}, {@link Briefcase}.
   */
  getRepresentationList(params) {
    const entityCollectionAccessor = (response) => {
      const briefcases = response.body.briefcases;
      const mappedBriefcases = briefcases.map((briefcase) => this.appendRelatedEntityCallbacks(params.authorization, briefcase, params.headers));
      return mappedBriefcases;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getBriefcaseListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single Briefcase by its id. This method returns a Briefcase in its full representation. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-briefcase-details/ Get iModel Briefcase}
   * operation from iModels API.
   * @param {GetSingleBriefcaseParams} params parameters for this operation. See {@link GetSingleBriefcaseParams}.
   * @returns {Promise<Briefcase>} an Briefcase with specified id. See {@link iModel}.
   */
  async getSingle(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleBriefcaseUrl({
        iModelId: params.iModelId,
        briefcaseId: params.briefcaseId
      }),
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, response.body.briefcase, params.headers);
    return result;
  }
  appendRelatedEntityCallbacks(authorization, briefcase, headers) {
    const getOwner = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, briefcase._links.owner?.href, headers);
    const checkpointLink = briefcase._links.checkpoint;
    assertLink(checkpointLink);
    const getCheckpoint = async () => {
      const response = await this.sendGetRequest({
        authorization,
        url: checkpointLink.href,
        headers
      });
      return response.body.checkpoint;
    };
    const result = {
      ...briefcase,
      getOwner,
      getCheckpoint
    };
    return result;
  }
}
class ChangesetOperations extends OperationsBase {
  _iModelsClient;
  constructor(options, _iModelsClient) {
    super(options);
    this._iModelsClient = _iModelsClient;
  }
  /**
   * Gets Changesets for a specific iModel. This method returns Changesets in their minimal representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets/ Get iModel Changesets}
   * operation from iModels API.
   * @param {GetChangesetListParams} params parameters for this operation. See {@link GetChangesetListParams}.
   * @returns {EntityListIterator<MinimalChangeset>} iterator for Changeset list. See {@link EntityListIterator},
   * {@link MinimalChangeset}.
   */
  getMinimalList(params) {
    const entityCollectionAccessor = (response) => {
      const changesets = response.body.changesets;
      const mappedChangesets = changesets.map((changeset) => this.appendRelatedMinimalEntityCallbacks(params.authorization, changeset, params.headers));
      return mappedChangesets;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getChangesetListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets Changesets for a specific iModel. This method returns Changesets in their full representation. The returned
   * iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets/ Get iModel Changesets}
   * operation from iModels API.
   * @param {GetChangesetListParams} params parameters for this operation. See {@link GetChangesetListParams}.
   * @returns {EntityListIterator<Changeset>} iterator for Changeset list. See {@link EntityListIterator},
   * {@link Changeset}.
   */
  getRepresentationList(params) {
    const entityCollectionAccessor = (response) => {
      const changesets = response.body.changesets;
      const mappedChangesets = changesets.map((changeset) => this.appendRelatedEntityCallbacks(params.authorization, changeset, params.headers));
      return mappedChangesets;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getChangesetListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single Changeset identified by either index or id. This method returns a Changeset in its full representation.
   * Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-details/ Get iModel Changeset}
   * operation from iModels API.
   * @param {GetSingleChangesetParams} params parameters for this operation. See {@link GetSingleChangesetParams}.
   * @returns {Promise<Changeset>} a Changeset with specified id or index. See {@link Changeset}.
   */
  async getSingle(params) {
    const changeset = await this.querySingleInternal(params);
    return changeset;
  }
  async querySingleInternal(params) {
    const { authorization, iModelId, headers, ...changesetIdOrIndex } = params;
    const response = await this.sendGetRequest({
      authorization,
      url: this._options.urlFormatter.getSingleChangesetUrl({
        iModelId,
        ...changesetIdOrIndex
      }),
      headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, response.body.changeset, params.headers);
    return result;
  }
  appendRelatedMinimalEntityCallbacks(authorization, changeset, headers) {
    const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changeset._links.creator?.href, headers);
    const result = {
      ...changeset,
      getCreator
    };
    return result;
  }
  appendRelatedEntityCallbacks(authorization, changeset, headers) {
    const getNamedVersion = async () => this.getNamedVersion(authorization, changeset._links.namedVersion?.href, headers);
    const getCurrentOrPrecedingCheckpoint = async () => this.getCurrentOrPrecedingCheckpoint(authorization, changeset._links.currentOrPrecedingCheckpoint?.href, headers);
    const changesetWithMinimalCallbacks = this.appendRelatedMinimalEntityCallbacks(authorization, changeset, headers);
    const result = {
      ...changesetWithMinimalCallbacks,
      getNamedVersion,
      getCurrentOrPrecedingCheckpoint
    };
    return result;
  }
  async getNamedVersion(authorization, namedVersionLink, headers) {
    if (!namedVersionLink)
      return void 0;
    const { iModelId, namedVersionId } = this._options.urlFormatter.parseNamedVersionUrl(namedVersionLink);
    return this._iModelsClient.namedVersions.getSingle({
      authorization,
      iModelId,
      namedVersionId,
      headers
    });
  }
  async getCurrentOrPrecedingCheckpoint(authorization, currentOrPrecedingCheckpointLink, headers) {
    if (!currentOrPrecedingCheckpointLink)
      return void 0;
    const entityIds = this._options.urlFormatter.parseCheckpointUrl(currentOrPrecedingCheckpointLink);
    return this._iModelsClient.checkpoints.getSingle({
      authorization,
      ...entityIds,
      headers
    });
  }
}
class ChangesetExtendedDataOperations extends OperationsBase {
  constructor(options) {
    super(options);
  }
  /**
   * Gets Changesets Extended Data for a specific iModel. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changesets-extended-data/ Get iModel Changesets Extended Data}
   * operation from iModels API.
   * @param {GetChangesetExtendedDataListParams} params parameters for this operation. See {@link GetChangesetExtendedDataListParams}.
   * @returns {EntityListIterator<ChangesetExtendedData>} iterator for Changeset Extended Data list. See {@link EntityListIterator}.
   */
  getList(params) {
    const entityCollectionAccessor = (response) => {
      const apiResponse = response.body.extendedData;
      const mappedChangesetExtendedData = apiResponse.map((extendedData) => this.convertToChangesetExtendedData(extendedData));
      return mappedChangesetExtendedData;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getChangesetExtendedDataListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single Changeset Extended Data identified by either Changeset index or id. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-extended-data-details/ Get iModel Changeset Extended Data}
   * operation from iModels API.
   * @param {GetSingleChangesetExtendedDataParams} params parameters for this operation. See {@link GetSingleChangesetExtendedDataParams}.
   * @returns {Promise<ChangesetExtendedData>} a Changeset Extended Data with the specified changeset id or index. See {@link ChangesetExtendedData}.
   */
  async getSingle(params) {
    const { authorization, iModelId, headers, ...changesetIdOrIndex } = params;
    const response = await this.sendGetRequest({
      authorization,
      url: this._options.urlFormatter.getSingleChangesetExtendedDataUrl({
        iModelId,
        ...changesetIdOrIndex
      }),
      headers
    });
    return this.convertToChangesetExtendedData(response.body.extendedData);
  }
  convertToChangesetExtendedData(changesetExtendedDataApiResponse) {
    return {
      changesetId: changesetExtendedDataApiResponse.changesetId,
      changesetIndex: changesetExtendedDataApiResponse.changesetIndex,
      data: this.convertBase64StringToObject(changesetExtendedDataApiResponse.data)
    };
  }
  convertBase64StringToObject(input) {
    if (typeof window !== "undefined") {
      const binString = atob(input);
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      return JSON.parse(new TextDecoder().decode(bytes));
    } else {
      const decodedString = Buffer.from(input, "base64").toString("utf8");
      return JSON.parse(decodedString);
    }
  }
}
class ChangesetGroupOperations extends OperationsBase {
  _iModelsClient;
  constructor(options, _iModelsClient) {
    super(options);
    this._iModelsClient = _iModelsClient;
  }
  /**
   * Gets Changeset Groups for a specific iModel. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-groups/ Get iModel Changeset Groups}
   * operation from iModels API.
   * @param {GetChangesetGroupListParams} params parameters for this operation. See {@link GetChangesetGroupListParams}.
   * @returns {EntityListIterator<ChangesetGroup>} iterator for Changeset Group list, which internally queries entities in pages.
   * See {@link EntityListIterator}, {@link ChangesetGroup}.
   */
  getList(params) {
    const entityCollectionAccessor = (response) => {
      const changesetGroups = response.body.changesetGroups;
      const mappedChangesetGroups = changesetGroups.map((changesetGroup) => this.appendRelatedEntityCallbacks(params.authorization, changesetGroup, params.headers));
      return mappedChangesetGroups;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getChangesetGroupListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single Changeset Group identified by id. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-changeset-group-details/ Get iModel Changeset Group}
   * operation from iModels API.
   * @param {GetSingleChangesetGroupParams} params parameters for this operation. See {@link GetSingleChangesetGroupParams}.
   * @returns {Promise<ChangesetGroup>} a Changeset Group with the specified id. See {@link ChangesetGroup}.
   */
  async getSingle(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleChangesetGroupUrl({
        iModelId: params.iModelId,
        changesetGroupId: params.changesetGroupId
      }),
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, response.body.changesetGroup, params.headers);
    return result;
  }
  appendRelatedEntityCallbacks(authorization, changesetGroup, headers) {
    const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changesetGroup._links.creator?.href, headers);
    const result = {
      ...changesetGroup,
      getCreator
    };
    return result;
  }
}
class NamedVersionOperations extends OperationsBase {
  _iModelsClient;
  constructor(options, _iModelsClient) {
    super(options);
    this._iModelsClient = _iModelsClient;
  }
  /**
   * Gets Named Versions of a specific iModel. This method returns Named Versions in their minimal representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-versions/ Get iModel Named Versions}
   * operation from iModels API.
   * @param {GetNamedVersionListParams} params parameters for this operation. See {@link GetNamedVersionListParams}.
   * @returns {EntityListIterator<MinimalNamedVersion>} iterator for Named Version list. See {@link EntityListIterator},
   * {@link MinimalNamedVersion}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getNamedVersionListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.namedVersions,
      headers: params.headers
    }));
  }
  /**
   * Gets Named Versions of a specific iModel. This method returns Named Versions in their full representation. The
   * returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-versions/
   * Get iModel Named Versions} operation from iModels API.
   * @param {GetNamedVersionListParams} params parameters for this operation. See {@link GetNamedVersionListParams}.
   * @returns {EntityListIterator<NamedVersion>} iterator for Named Version list. See {@link EntityListIterator},
   * {@link NamedVersion}.
   */
  getRepresentationList(params) {
    const entityCollectionAccessor = (response) => {
      const namedVersions = response.body.namedVersions;
      const mappedNamedVersions = namedVersions.map((namedVersion) => this.appendRelatedEntityCallbacks(params.authorization, namedVersion, params.headers));
      return mappedNamedVersions;
    };
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getNamedVersionListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor,
      headers: params.headers
    }));
  }
  /**
   * Gets a single Named Version by its id. This method returns a Named Version in its full representation. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-named-version-details/
   * Get iModel Named Version} operation from iModels API.
   * @param {GetSingleNamedVersionParams} params parameters for this operation. See {@link GetSingleNamedVersionParams}.
   * @returns {Promise<NamedVersion>} a Named Version with specified id. See {@link NamedVersion}.
   */
  async getSingle(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleNamedVersionUrl({
        iModelId: params.iModelId,
        namedVersionId: params.namedVersionId
      }),
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, response.body.namedVersion, params.headers);
    return result;
  }
  /**
   * Creates a Named Version with specified properties. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel-named-version/
   * Create iModel Named Version} operation from iModels API.
   * @param {CreateNamedVersionParams} params parameters for this operation. See {@link CreateNamedVersionParams}.
   * @returns {Promise<NamedVersion>} newly created Named Version. See {@link NamedVersion}.
   */
  async create(params) {
    const createNamedVersionBody = this.getCreateNamedVersionRequestBody(params.namedVersionProperties);
    const createNamedVersionResponse = await this.sendPostRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getNamedVersionListUrl({
        iModelId: params.iModelId
      }),
      body: createNamedVersionBody,
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, createNamedVersionResponse.body.namedVersion, params.headers);
    return result;
  }
  /**
   * Updates Named Version with specified properties. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/update-imodel-named-version/
   * Update iModel Named Version} operation from iModels API.
   * @param {UpdateNamedVersionParams} params parameters for this operation. See {@link UpdateNamedVersionParams}.
   * @returns {Promise<NamedVersion>} updated Named Version. See {@link NamedVersion}.
   */
  async update(params) {
    const updateNamedVersionBody = this.getUpdateNamedVersionRequestBody(params.namedVersionProperties);
    const updateNamedVersionResponse = await this.sendPatchRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleNamedVersionUrl({
        iModelId: params.iModelId,
        namedVersionId: params.namedVersionId
      }),
      body: updateNamedVersionBody,
      headers: params.headers
    });
    const result = this.appendRelatedEntityCallbacks(params.authorization, updateNamedVersionResponse.body.namedVersion, params.headers);
    return result;
  }
  getCreateNamedVersionRequestBody(namedVersionProperties) {
    return {
      name: namedVersionProperties.name,
      description: namedVersionProperties.description,
      changesetId: namedVersionProperties.changesetId
    };
  }
  getUpdateNamedVersionRequestBody(namedVersionProperties) {
    return {
      name: namedVersionProperties.name,
      description: namedVersionProperties.description,
      state: namedVersionProperties.state
    };
  }
  appendRelatedEntityCallbacks(authorization, namedVersion, headers) {
    const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, namedVersion._links.creator?.href, headers);
    const getChangeset = async () => this.getChangeset(authorization, namedVersion._links.changeset?.href, headers);
    const result = {
      ...namedVersion,
      getCreator,
      getChangeset
    };
    return result;
  }
  async getChangeset(authorization, changesetLink, headers) {
    if (!changesetLink)
      return void 0;
    const entityIds = this._options.urlFormatter.parseChangesetUrl(changesetLink);
    return this._iModelsClient.changesets.getSingle({
      authorization,
      ...entityIds,
      headers
    });
  }
}
class CheckpointOperations extends OperationsBase {
  /**
   * Gets a single Checkpoint generated either on a specific Changeset or for a specific Named Version. This method
   * returns a Checkpoint in its full representation. Wraps
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-changeset-checkpoint/ Get Changeset Checkpoint},
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-named-version-checkpoint/ Get Named Version Checkpoint} and
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-briefcase-checkpoint/ Get Briefcase Checkpoint}
   * operations from iModels API.
   * @param {GetSingleCheckpointParams} params parameters for this operation. See {@link GetSingleCheckpointParams}.
   * @returns {Promise<Checkpoint>} a Checkpoint for the specified parent entity. See {@link Checkpoint}.
   */
  async getSingle(params) {
    const { authorization, iModelId, headers, ...parentEntityId } = params;
    const response = await this.sendGetRequest({
      authorization,
      url: this._options.urlFormatter.getCheckpointUrl({
        iModelId,
        ...parentEntityId
      }),
      headers
    });
    return response.body.checkpoint;
  }
  /**
   * Reschedules failed Named Version Checkpoint. This method
   * returns a Checkpoint in its full representation. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/update-named-version-checkpoint/
   * Update Named Version Checkpoint} operation from iModels API.
   * @param {GetSingleNamedVersionParams} params parameters for this operation. See {@link GetSingleNamedVersionParams}.
   * @returns {Promise<Checkpoint>} a Checkpoint for the specified parent entity. See {@link Checkpoint}.
   */
  async updateNamedVersionCheckpoint(params) {
    const response = await this.sendPutRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getCheckpointUrl({
        iModelId: params.iModelId,
        namedVersionId: params.namedVersionId
      }),
      headers: params.headers,
      body: new Uint8Array()
    });
    return response.body.checkpoint;
  }
}
class ThumbnailOperations extends OperationsBase {
  /**
   * Downloads a thumbnail for a specific iModel. The Thumbnail returned is either a default one or a custom
   * uploaded one. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-thumbnail/ Download iModel Thumbnail}
   * operation from iModels API.
   * @param {DownloadThumbnailParams} params parameters for this operation. See {@link DownloadThumbnailParams}.
   * @returns {Promise<Thumbnail>} downloaded Thumbnail. See {@link Thumbnail}. The method returns the data in binary
   * form which can then be consumed depending on the environment.
   * @example
   * Save data to local file (Node.js):
   * ```
   *  const thumbnail: Thumbnail = await iModelsClient.thumbnails.download({ ... });
   *  await fs.promises.writeFile("thumbnail.png", Buffer.from(thumbnail.data.buffer), "binary");
   * ```
   */
  async download(params) {
    const urlParams = {
      ...params.urlParams,
      size: params.urlParams?.size ?? ThumbnailSize.Small
    };
    const url = this._options.urlFormatter.getThumbnailUrl({
      iModelId: params.iModelId,
      urlParams
    });
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url,
      responseType: ContentType.Png,
      headers: params.headers
    });
    return {
      size: urlParams.size,
      imageType: ContentType.Png,
      image: response.body
    };
  }
  /**
   * Uploads a custom iModel Thumbnail. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/upload-imodel-thumbnail/ Upload iModel Thumbnail}
   * operation from iModels API.
   * @param {UploadThumbnailParams} params parameters for this operation. See {@link UploadThumbnailParams}.
   * @returns {Promise<void>} a promise that resolves after operation completes.
   */
  async upload(params) {
    const url = this._options.urlFormatter.getThumbnailUrl({
      iModelId: params.iModelId
    });
    await this.sendPutRequest({
      authorization: params.authorization,
      url,
      contentType: params.thumbnailProperties.imageType,
      body: params.thumbnailProperties.image,
      headers: params.headers
    });
  }
}
class UserOperations extends OperationsBase {
  /** Gets Users who have ever been connected to the iModel specified by the iModel id. This method returns Users in
   * their minimal representation. The returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-users/ Get iModel Users}
   * operation from iModels API.
   * @param {GetUserListParams} params parameters for this operation. See {@link GetUserListParams}.
   * @returns {EntityListIterator<MinimalUser>} iterator for User list. See {@link EntityListIterator}, {@link MinimalUser}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getUserListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.users,
      headers: params.headers
    }));
  }
  /**
   * Gets Users who have ever been connected to the iModel specified by the iModel id. This method returns Users in their
   * full representation. The returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-users/ Get iModel Users}
   * operation from iModels API.
   * @param {GetUserListParams} params parameters for this operation. See {@link GetUserListParams}.
   * @returns {EntityListIterator<User>} iterator for User list. See {@link EntityListIterator}, {@link User}.
   */
  getRepresentationList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getUserListUrl({
        iModelId: params.iModelId,
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor: (response) => response.body.users,
      headers: params.headers
    }));
  }
  /**
   * Gets a single User by its id. This method returns a User in its full representation. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-user-details/ Get iModel User}
   * operation from iModels API.
   * @param {GetSingleUserParams} params parameters for this operation. See {@link GetSingleUserParams}.
   * @returns {Promise<User>} a User with specified id. See {@link User}.
   */
  async getSingle(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getSingleUserUrl({
        iModelId: params.iModelId,
        userId: params.userId
      }),
      headers: params.headers
    });
    return response.body.user;
  }
}
class UserPermissionOperations extends OperationsBase {
  /**
   * Retrieves Permissions the current user has for the specified iModel. The current user is determined based on
   * passed authorization information. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-imodel-user-permissions/ Get iModel User Permissions}
   * operation from iModels API. iModels Permissions may be configured on a iTwin level or an iModel level.
   * This operation will return Permissions configured for this specific iModel or iTwin Permissions if iModel
   * Permissions are not configured.
   * @param {GetUserPermissionsParams} params parameters for this operation. See {@link GetUserPermissionsParams}.
   * @returns {Promise<UserPermissions>} User Permissions. See {@link UserPermissions}.
   */
  async get(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getUserPermissionsUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
    return response.body;
  }
}
class OperationOperations extends OperationsBase {
  constructor(options) {
    super(options);
  }
  /**
   * Returns the information about iModel creation process. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-create-imodel-operation-details/ Get Create iModel Operation Details}
   * operation from iModels API.
   * @param {GetCreateIModelOperationDetailsParams} params parameters for this operation. See {@link GetCreateIModelOperationDetailsParams}.
   * @returns {Promise<CreateIModelOperationDetails>} iModel creation details. See {@link CreateIModelOperationDetails}.
   */
  async getCreateIModelDetails(params) {
    const response = await this.sendGetRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getCreateIModelOperationDetailsUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
    return response.body.createOperation;
  }
}
class FavoriteIModelOperations extends OperationsBase {
  /**
   * Gets favorite iModels for a specific iTwin. This method returns iModels in their minimal representation. The returned iterator
   * internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-favorite-imodels/ Get My Favorite iTwin iModels}
   * operation from iModels API.
   * @param {GetFavoriteIModelListParams} params parameters for this operation. See {@link GetFavoriteIModelListParams}.
   * @returns {EntityListIterator<MinimalIModel>} iterator for favorite iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getFavoriteIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.iModels,
      headers: params.headers
    }));
  }
  /**
   * Gets favorite iModels for a specific iTwin. This method returns iModels in their full representation. The returned iterator
   * internally queries entities in pages. Wraps the {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-favorite-imodels/ Get My Favorite iTwin iModels}
   * operation from iModels API.
   * @param {GetFavoriteIModelListParams} params parameters for this operation. See {@link GetFavoriteIModelListParams}.
   * @returns {EntityListIterator<IModel>} iterator for favorite iModel list. See {@link EntityListIterator}, {@link IModel}.
   */
  getRepresentationList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getFavoriteIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor: (response) => response.body.iModels,
      headers: params.headers
    }));
  }
  /**
   * Adds an iModel to the calling user's favorites list. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/add-imodel-to-my-favorites/ Add iModel to My Favorites}
   * operation from iModels API.
   * @param {AddIModelToFavoritesParams} params parameters for this operation. See {@link AddIModelToFavoritesParams}.
   * @returns {Promise<void>}
   */
  async add(params) {
    await this.sendPutRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getFavoriteIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers,
      body: new Uint8Array()
    });
  }
  /**
   * Removes an iModel from the calling user's favorites list. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/remove-imodel-from-my-favorites/ Remove iModel from My Favorites}
   * operation from iModels API.
   * @param {RemoveIModelFromFavoritesParams} params parameters for this operation. See {@link RemoveIModelFromFavoritesParams}.
   * @returns {Promise<void>}
   */
  async remove(params) {
    await this.sendDeleteRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getFavoriteIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
  }
}
class RecentIModelOperations extends OperationsBase {
  /**
   * Gets recently used iModels for a specific iTwin. A user can only have 25 recently used iModels.
   * They are returned in order with the most recently used iModel first in the list. This method returns iModels in their minimal representation.
   * The returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-recently-used-imodels/ Get My Recently Used iTwin iModels}
   * operation from iModels API.
   * @param {GetRecentIModelListParams} params parameters for this operation. See {@link GetRecentIModelListParams}.
   * @returns {EntityListIterator<MinimalIModel>} iterator for recent iModel list. See {@link EntityListIterator}, {@link MinimalIModel}.
   */
  getMinimalList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRecentIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Minimal,
      entityCollectionAccessor: (response) => response.body.iModels,
      headers: params.headers
    }));
  }
  /**
   * Gets recently used iModels for a specific iTwin. A user can only have 25 recently used iModels.
   * They are returned in order with the most recently used iModel first in the list. This method returns iModels in their full representation.
   * The returned iterator internally queries entities in pages. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/get-my-recently-used-imodels/ Get My Recently Used iTwin iModels}
   * operation from iModels API.
   * @param {GetRecentIModelListParams} params parameters for this operation. See {@link GetRecentIModelListParams}.
   * @returns {EntityListIterator<IModel>} iterator for recent iModel list. See {@link EntityListIterator}, {@link IModel}.
   */
  getRepresentationList(params) {
    return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRecentIModelListUrl({
        urlParams: params.urlParams
      }),
      preferReturn: PreferReturn.Representation,
      entityCollectionAccessor: (response) => response.body.iModels,
      headers: params.headers
    }));
  }
  /**
   * Adds an iModel to the calling user's recently used iModels list. No more than 25 iModels are
   * stored in the recently used list. Older ones are removed to make room for new ones. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/add-imodel-to-my-recents/ Add iModel to My Recents}
   * operation from iModels API.
   * @param {AddIModelToRecentsParams} params parameters for this operation. See {@link AddIModelToRecentsParams}.
   * @returns {Promise<void>}
   */
  async add(params) {
    await this.sendPostRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRecentIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers,
      body: void 0
    });
  }
  /**
   * Removes an iModel from the calling user's recents list. Wraps the
   * {@link https://developer.bentley.com/apis/imodels-v2/operations/remove-imodel-from-my-recents/ Remove iModel from My Recents}
   * operation from iModels API.
   * @param {RemoveIModelFromRecentsParams} params parameters for this operation. See {@link RemoveIModelFromRecentsParams}.
   * @returns {Promise<void>}
   */
  async remove(params) {
    await this.sendDeleteRequest({
      authorization: params.authorization,
      url: this._options.urlFormatter.getRecentIModelUrl({
        iModelId: params.iModelId
      }),
      headers: params.headers
    });
  }
}
var IModelOrderByProperty;
(function(IModelOrderByProperty2) {
  IModelOrderByProperty2["Name"] = "name";
  IModelOrderByProperty2["CreatedDateTime"] = "createdDateTime";
})(IModelOrderByProperty || (IModelOrderByProperty = {}));
var BriefcaseOrderByProperty;
(function(BriefcaseOrderByProperty2) {
  BriefcaseOrderByProperty2["AcquiredDateTime"] = "acquiredDateTime";
})(BriefcaseOrderByProperty || (BriefcaseOrderByProperty = {}));
var ChangesetOrderByProperty;
(function(ChangesetOrderByProperty2) {
  ChangesetOrderByProperty2["Index"] = "index";
})(ChangesetOrderByProperty || (ChangesetOrderByProperty = {}));
var NamedVersionOrderByProperty;
(function(NamedVersionOrderByProperty2) {
  NamedVersionOrderByProperty2["ChangesetIndex"] = "changesetIndex";
  NamedVersionOrderByProperty2["CreatedDateTime"] = "createdDateTime";
})(NamedVersionOrderByProperty || (NamedVersionOrderByProperty = {}));
var UserOrderByProperty;
(function(UserOrderByProperty2) {
  UserOrderByProperty2["GivenName"] = "givenName";
  UserOrderByProperty2["Surname"] = "surname";
})(UserOrderByProperty || (UserOrderByProperty = {}));
class IModelsApiUrlFormatter {
  baseUrl;
  _regexIgnoreCaseOption = "i";
  _groupNames = {
    iModelId: "iModelId",
    changesetIdOrIndex: "changesetIdOrIndex",
    namedVersionId: "namedVersionId",
    userId: "userId"
  };
  _numericRegex = new RegExp("^\\d+$");
  _changesetUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/changesets/(?<${this._groupNames.changesetIdOrIndex}>[^/]*)`, this._regexIgnoreCaseOption);
  _checkpointUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/changesets/(?<${this._groupNames.changesetIdOrIndex}>.*)/checkpoint`, this._regexIgnoreCaseOption);
  _namedVersionUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/namedversions/(?<${this._groupNames.namedVersionId}>[^/]*)`, this._regexIgnoreCaseOption);
  _userUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>.*)/users/(?<${this._groupNames.userId}>[^/]*)`, this._regexIgnoreCaseOption);
  _iModelUrlRegex = new RegExp(`/iModels/(?<${this._groupNames.iModelId}>[^/]*)`, this._regexIgnoreCaseOption);
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getCreateIModelUrl() {
    return this.baseUrl;
  }
  getCloneIModelUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/clone`;
  }
  getForkIModelUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/fork`;
  }
  getSingleIModelUrl(params) {
    return `${this.baseUrl}/${params.iModelId}`;
  }
  getIModelListUrl(params) {
    return `${this.baseUrl}${this.formQueryString({ ...params.urlParams })}`;
  }
  getSingleBriefcaseUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/briefcases/${params.briefcaseId}`;
  }
  getBriefcaseListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/briefcases${this.formQueryString({ ...params.urlParams })}`;
  }
  getSingleChangesetUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesets/${params.changesetId ?? params.changesetIndex}`;
  }
  getChangesetListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesets${this.formQueryString({ ...params.urlParams })}`;
  }
  getSingleChangesetExtendedDataUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesets/${params.changesetId ?? params.changesetIndex}/extendeddata`;
  }
  getChangesetExtendedDataListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesets/extendeddata${this.formQueryString({ ...params.urlParams })}`;
  }
  getSingleChangesetGroupUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesetgroups/${params.changesetGroupId}`;
  }
  getChangesetGroupListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/changesetgroups${this.formQueryString({ ...params.urlParams })}`;
  }
  parseChangesetUrl(url) {
    const matchedGroups = this._changesetUrlRegex.exec(url).groups;
    return {
      iModelId: matchedGroups[this._groupNames.iModelId],
      ...this.parseChangesetIdOrIndex(matchedGroups[this._groupNames.changesetIdOrIndex])
    };
  }
  getSingleNamedVersionUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/namedversions/${params.namedVersionId}`;
  }
  getNamedVersionListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/namedversions${this.formQueryString({ ...params.urlParams })}`;
  }
  getCheckpointUrl(params) {
    let parentEntityUrlPath;
    if (params.namedVersionId)
      parentEntityUrlPath = `namedversions/${params.namedVersionId}`;
    else if (params.changesetId || params.changesetIndex != null)
      parentEntityUrlPath = `changesets/${params.changesetId ?? params.changesetIndex}`;
    else
      parentEntityUrlPath = "briefcases";
    return `${this.baseUrl}/${params.iModelId}/${parentEntityUrlPath}/checkpoint`;
  }
  getThumbnailUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/thumbnail${this.formQueryString({
      ...params.urlParams
    })}`;
  }
  getUserListUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/users${this.formQueryString({
      ...params.urlParams
    })}`;
  }
  getSingleUserUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/users/${params.userId}`;
  }
  getUserPermissionsUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/permissions`;
  }
  getFavoriteIModelListUrl(params) {
    return `${this.baseUrl}/favorites${this.formQueryString({
      ...params.urlParams
    })}`;
  }
  getFavoriteIModelUrl(params) {
    return `${this.baseUrl}/favorites/${params.iModelId}`;
  }
  getRecentIModelListUrl(params) {
    return `${this.baseUrl}/recents${this.formQueryString({
      ...params.urlParams
    })}`;
  }
  getRecentIModelUrl(params) {
    return `${this.baseUrl}/recents/${params.iModelId}`;
  }
  getCreateIModelOperationDetailsUrl(params) {
    return `${this.baseUrl}/${params.iModelId}/operations/create`;
  }
  parseCheckpointUrl(url) {
    const matchedGroups = this._checkpointUrlRegex.exec(url).groups;
    return {
      iModelId: matchedGroups[this._groupNames.iModelId],
      ...this.parseChangesetIdOrIndex(matchedGroups[this._groupNames.changesetIdOrIndex])
    };
  }
  parseNamedVersionUrl(url) {
    const matchedGroups = this._namedVersionUrlRegex.exec(url).groups;
    return {
      iModelId: matchedGroups[this._groupNames.iModelId],
      namedVersionId: matchedGroups[this._groupNames.namedVersionId]
    };
  }
  parseUserUrl(url) {
    const matchedGroups = this._userUrlRegex.exec(url).groups;
    return {
      iModelId: matchedGroups[this._groupNames.iModelId],
      userId: matchedGroups[this._groupNames.userId]
    };
  }
  parseIModelUrl(url) {
    const matchedGroups = this._iModelUrlRegex.exec(url).groups;
    return {
      iModelId: matchedGroups[this._groupNames.iModelId]
    };
  }
  formQueryString(urlParameters) {
    let queryString = "";
    for (const urlParameterKey in urlParameters) {
      if (!Object.prototype.hasOwnProperty.call(urlParameters, urlParameterKey))
        continue;
      const urlParameterValue = urlParameters[urlParameterKey];
      if (!this.shouldAppendToUrl(urlParameterValue))
        continue;
      queryString = this.appendToQueryString(queryString, urlParameterKey, urlParameterValue);
    }
    return queryString;
  }
  /**
   * API could return Changeset urls that either contain id or index since both are valid identifiers
   * so here we handle both scenarios. We assume if the value contains only digits and is shorter than 40
   * symbols it is a numeric index, otherwise, it is a string id.
   */
  parseChangesetIdOrIndex(changesetIdOrIndex) {
    const containsOnlyDigits = this._numericRegex.test(changesetIdOrIndex);
    if (containsOnlyDigits && changesetIdOrIndex.length < 40)
      return {
        changesetIndex: parseInt(changesetIdOrIndex, 10)
      };
    return {
      changesetId: changesetIdOrIndex
    };
  }
  shouldAppendToUrl(urlParameterValue) {
    if (urlParameterValue === null || urlParameterValue === void 0)
      return false;
    if (typeof urlParameterValue === "string" && !urlParameterValue.trim())
      return false;
    return true;
  }
  appendToQueryString(existingQueryString, parameterKey, parameterValue) {
    const separator = existingQueryString.length === 0 ? "?" : "&";
    return `${existingQueryString}${separator}${parameterKey}=${this.stringify(parameterValue)}`;
  }
  stringify(urlParameterValue) {
    if (this.isSingleOrderBy(urlParameterValue)) {
      return this.stringifyOrderByParameterValue([urlParameterValue]);
    } else if (this.isMultipleOrderBy(urlParameterValue)) {
      return this.stringifyOrderByParameterValue(urlParameterValue);
    }
    return urlParameterValue.toString();
  }
  isSingleOrderBy(parameterValue) {
    return parameterValue.property !== void 0;
  }
  isMultipleOrderBy(parameterValue) {
    return parameterValue?.[0]?.property !== void 0;
  }
  stringifyOrderByParameterValue(orderByCriteria) {
    let result = "";
    for (let i = 0; i < orderByCriteria.length; i++) {
      if (i !== 0)
        result += ",";
      const criterion = orderByCriteria[i];
      result += criterion.property;
      if (criterion.operator !== void 0)
        result += ` ${criterion.operator}`;
    }
    return result;
  }
}
class IModelsClient {
  _operationsOptions;
  /**
   * Class constructor.
   * @param {iModelsClientOptions} options client options. If `options` are `undefined` or if some of the properties
   * are `undefined` the client uses defaults. See {@link iModelsClientOptions}.
   */
  constructor(options) {
    const filledIModelsClientOptions = IModelsClient.fillManagementClientConfiguration(options);
    this._operationsOptions = {
      ...filledIModelsClientOptions,
      parseErrorFunc: (response, originalError) => IModelsErrorParser.parse(response, originalError),
      urlFormatter: new IModelsApiUrlFormatter(filledIModelsClientOptions.api.baseUrl)
    };
  }
  /** iModel operations. See {@link iModelOperations}. */
  get iModels() {
    return new IModelOperations(this._operationsOptions, this);
  }
  /** Briefcase operations. See {@link BriefcaseOperations}. */
  get briefcases() {
    return new BriefcaseOperations(this._operationsOptions, this);
  }
  /** Changeset operations. See {@link ChangesetOperations}. */
  get changesets() {
    return new ChangesetOperations(this._operationsOptions, this);
  }
  /** Changeset Extended Data operations. See {@link ChangesetExtendedDataOperations}. */
  get changesetExtendedData() {
    return new ChangesetExtendedDataOperations(this._operationsOptions);
  }
  /** Changeset Group operations. See {@link ChangesetGroupOperations}. */
  get changesetGroups() {
    return new ChangesetGroupOperations(this._operationsOptions, this);
  }
  /** Named version operations. See {@link NamedVersionOperations}. */
  get namedVersions() {
    return new NamedVersionOperations(this._operationsOptions, this);
  }
  /** Checkpoint operations. See {@link CheckpointOperations}. */
  get checkpoints() {
    return new CheckpointOperations(this._operationsOptions);
  }
  /** Thumbnail operations. See {@link ThumbnailOperations}. */
  get thumbnails() {
    return new ThumbnailOperations(this._operationsOptions);
  }
  /** User operations. See {@link UserOperations}. */
  get users() {
    return new UserOperations(this._operationsOptions);
  }
  /** User Permission operations. See {@link UserPermissionOperations}. */
  get userPermissions() {
    return new UserPermissionOperations(this._operationsOptions);
  }
  /** Operation operations. See {@link OperationOperations}. */
  get operations() {
    return new OperationOperations(this._operationsOptions);
  }
  /** Favorite iModel operations. See {@link FavoriteIModelOperations}. */
  get favoriteIModels() {
    return new FavoriteIModelOperations(this._operationsOptions);
  }
  /** Recent iModel operations. See {@link RecentIModelOperations}. */
  get recentIModels() {
    return new RecentIModelOperations(this._operationsOptions);
  }
  static fillManagementClientConfiguration(options) {
    const retryPolicy = options?.retryPolicy ?? new AxiosRetryPolicy({
      maxRetries: Constants$1.retryPolicy.maxRetries,
      backoffAlgorithm: new ExponentialBackoffAlgorithm({
        baseDelayInMs: Constants$1.retryPolicy.baseDelayInMs,
        factor: Constants$1.retryPolicy.delayFactor
      })
    });
    return {
      api: this.fillApiConfiguration(options?.api),
      restClient: options?.restClient ?? new AxiosRestClient(retryPolicy),
      headers: options?.headers ?? {},
      retryPolicy
    };
  }
  static fillApiConfiguration(apiOptions) {
    return {
      baseUrl: apiOptions?.baseUrl ?? Constants$1.api.baseUrl,
      version: apiOptions?.version ?? Constants$1.api.version
    };
  }
}
class AccessTokenAdapter {
  static toAuthorization(accessToken) {
    const splitAccessToken = accessToken.split(" ");
    if (splitAccessToken.length !== 2)
      ITwinError.throwError({
        iTwinErrorId: {
          key: IModelsErrorCode.InvalidIModelsRequest,
          scope: IModelsErrorScope
        },
        message: "Unsupported access token format"
      });
    return {
      scheme: splitAccessToken[0],
      token: splitAccessToken[1]
    };
  }
  static toAuthorizationCallback(accessToken) {
    if (typeof accessToken === "function") {
      return async () => {
        const token = await accessToken();
        return AccessTokenAdapter.toAuthorization(token);
      };
    } else {
      return () => Promise.resolve(AccessTokenAdapter.toAuthorization(accessToken));
    }
  }
}
class ErrorAdapter {
  static toITwinError(error, operationName) {
    if (!isIModelsApiError(error))
      return error;
    if (error.code === IModelsErrorCode.Unrecognized)
      return error;
    if (ErrorAdapter.isAPIAuthError(error.code))
      return error;
    if (ErrorAdapter.isIncorrectAPIUsageError(error.code))
      return error;
    if (ErrorAdapter.isAPIErrorWithoutCorrespondingStatus(error.code))
      return error;
    if (error.code === IModelsErrorCode.InvalidIModelsRequest)
      return ErrorAdapter.adaptInvalidRequestErrorIfPossible(error);
    let errorCode = ErrorAdapter.tryMapGenericErrorCode(error.code, operationName);
    if (!errorCode)
      errorCode = ErrorAdapter.mapErrorCode(error.code);
    if ("conflictingLocks" in error)
      return ITwinError.create({
        iTwinErrorId: {
          key: errorCode,
          scope: IModelsErrorScope
        },
        message: error.message,
        conflictingLocks: error.conflictingLocks
      });
    return ITwinError.create({
      iTwinErrorId: { key: errorCode, scope: IModelsErrorScope },
      message: error.message
    });
  }
  static isAPIAuthError(apiErrorCode) {
    switch (apiErrorCode) {
      case IModelsErrorCode.Unauthorized:
      case IModelsErrorCode.InsufficientPermissions:
        return true;
      default:
        return false;
    }
  }
  static isIncorrectAPIUsageError(apiErrorCode) {
    switch (apiErrorCode) {
      case IModelsErrorCode.TooManyRequests:
      case IModelsErrorCode.RequestTooLarge:
      case IModelsErrorCode.InvalidValue:
      case IModelsErrorCode.InvalidHeaderValue:
      case IModelsErrorCode.InvalidRequestBody:
      case IModelsErrorCode.InvalidThumbnailFormat:
      case IModelsErrorCode.MutuallyExclusivePropertiesProvided:
      case IModelsErrorCode.MutuallyExclusiveParametersProvided:
      case IModelsErrorCode.MissingRequestBody:
      case IModelsErrorCode.MissingRequiredProperty:
      case IModelsErrorCode.MissingRequiredParameter:
      case IModelsErrorCode.MissingRequiredHeader:
      case IModelsErrorCode.InvalidChange:
      // returned when, for example, user attempts to complete Baseline file upload while it is not in progress
      case IModelsErrorCode.DataConflict:
        return true;
      default:
        return false;
    }
  }
  static isAPIErrorWithoutCorrespondingStatus(apiErrorCode) {
    switch (apiErrorCode) {
      case IModelsErrorCode.NamedVersionNotFound:
      case IModelsErrorCode.UserNotFound:
      case IModelsErrorCode.ChangesetGroupNotFound:
      case IModelsErrorCode.BaselineFileNotFound:
      case IModelsErrorCode.BaselineFileInitializationFailed:
      case IModelsErrorCode.IModelFromTemplateInitializationFailed:
      case IModelsErrorCode.EmptyIModelInitializationFailed:
      case IModelsErrorCode.ClonedIModelInitializationFailed:
      case IModelsErrorCode.ChangesetDownloadFailed:
        return true;
      default:
        return false;
    }
  }
  static adaptInvalidRequestErrorIfPossible(originalError) {
    if (!originalError.details)
      return originalError;
    for (const errorDetail of originalError.details)
      if (errorDetail.innerError?.code === IModelsErrorCode.MaximumNumberOfBriefcasesPerUser)
        return ITwinError.create({
          iTwinErrorId: {
            key: IModelsErrorCode.MaximumNumberOfBriefcasesPerUser,
            scope: IModelsErrorScope
          },
          message: originalError.message
        });
    return originalError;
  }
  static tryMapGenericErrorCode(apiErrorCode, operationName) {
    if (!operationName)
      return;
    if (apiErrorCode === IModelsErrorCode.RateLimitExceeded && operationName === "acquireBriefcase")
      return IModelsErrorCode.MaximumNumberOfBriefcasesPerUserPerMinute;
    if (apiErrorCode === IModelsErrorCode.DownloadAborted && operationName === "downloadChangesets")
      return IModelsErrorCode.DownloadCancelled;
    if (apiErrorCode === IModelsErrorCode.ConflictWithAnotherUser) {
      if (operationName === "createChangeset")
        return IModelsErrorCode.AnotherUserPushing;
      else if (operationName === "updateLocks")
        return IModelsErrorCode.LockOwnedByAnotherBriefcase;
    }
    return void 0;
  }
  static mapErrorCode(apiErrorCode) {
    switch (apiErrorCode) {
      case IModelsErrorCode.Unknown:
      case IModelsErrorCode.ITwinNotFound:
      case IModelsErrorCode.IModelNotFound:
      case IModelsErrorCode.ChangesetNotFound:
      case IModelsErrorCode.BriefcaseNotFound:
      case IModelsErrorCode.FileNotFound:
      case IModelsErrorCode.CheckpointNotFound:
      case IModelsErrorCode.LockNotFound:
      case IModelsErrorCode.IModelExists:
      case IModelsErrorCode.VersionExists:
      case IModelsErrorCode.ChangesetExists:
      case IModelsErrorCode.NamedVersionOnChangesetExists:
      case IModelsErrorCode.NewerChangesExist:
      case IModelsErrorCode.BaselineFileInitializationTimedOut:
      case IModelsErrorCode.IModelFromTemplateInitializationTimedOut:
      case IModelsErrorCode.ClonedIModelInitializationTimedOut:
        return apiErrorCode;
      default:
        return IModelsErrorCode.Unknown;
    }
  }
}
async function handleAPIErrors(func, operationName) {
  try {
    const result = await func();
    return result;
  } catch (error) {
    throw ErrorAdapter.toITwinError(error, operationName);
  }
}
async function getLatestMinimalChangesetIfExists(iModelsClient, iModelScopedOperationParams) {
  return getLatestChangeset((getChangesetListParams) => iModelsClient.changesets.getMinimalList(getChangesetListParams), iModelScopedOperationParams);
}
async function getNamedVersionChangeset(iModelsClient, iModelScopedOperationParams, versionName) {
  const getNamedVersionListParams = {
    ...iModelScopedOperationParams,
    urlParams: {
      name: versionName
    }
  };
  const namedVersionsIterator = iModelsClient.namedVersions.getMinimalList(getNamedVersionListParams);
  const namedVersions = await handleAPIErrors(async () => toArray$1(namedVersionsIterator));
  if (namedVersions.length === 0 || !namedVersions[0].changesetId)
    ITwinError.throwError({
      iTwinErrorId: {
        key: IModelsErrorCode.NamedVersionNotFound,
        scope: IModelsErrorScope
      },
      message: `Named version ${versionName} not found`
    });
  return {
    id: namedVersions[0].changesetId,
    index: namedVersions[0].changesetIndex
  };
}
async function getLatestChangeset(changesetQueryFunc, iModelScopedOperationParams) {
  const getChangesetListParams = {
    ...iModelScopedOperationParams,
    urlParams: {
      $top: 1,
      $orderBy: {
        property: ChangesetOrderByProperty.Index,
        operator: OrderByOperator.Descending
      }
    }
  };
  const changesetsIterator = changesetQueryFunc(getChangesetListParams);
  const changesets = await handleAPIErrors(async () => take(changesetsIterator, 1));
  if (changesets.length === 0)
    return void 0;
  return changesets[0];
}
class Constants2 {
  static ChangeSet0 = {
    id: "",
    changesType: 0,
    description: "initialChangeset",
    parentId: "",
    briefcaseId: 0,
    pushDate: "",
    userCreated: "",
    index: 0,
    size: 0
  };
}
class FrontendIModelsAccess {
  _emptyChangeset = {
    index: Constants2.ChangeSet0.index,
    id: Constants2.ChangeSet0.id
  };
  _iModelsClient;
  constructor(iModelsClient) {
    this._iModelsClient = iModelsClient instanceof IModelsClient ? iModelsClient : new IModelsClient(iModelsClient);
  }
  get iModelsClient() {
    return this._iModelsClient;
  }
  async getChangesetFromId(arg) {
    const getSingleChangesetParams = {
      ...this.getIModelScopedOperationParams(arg),
      changesetId: arg.changeSetId
    };
    const changeset = await handleAPIErrors(async () => this._iModelsClient.changesets.getSingle(getSingleChangesetParams));
    if (!changeset)
      ITwinError.throwError({
        iTwinErrorId: {
          key: IModelsErrorCode.ChangesetNotFound,
          scope: IModelsErrorScope
        },
        message: `Changeset ${arg.changeSetId} not found`
      });
    return { index: changeset.index, id: changeset.id };
  }
  async getLatestChangeset(arg) {
    const latestChangeset = await getLatestMinimalChangesetIfExists(this._iModelsClient, this.getIModelScopedOperationParams(arg));
    if (!latestChangeset)
      return this._emptyChangeset;
    return { index: latestChangeset.index, id: latestChangeset.id };
  }
  async getChangesetFromVersion(arg) {
    const version = arg.version;
    if (version.isFirst)
      return this._emptyChangeset;
    const namedVersionChangesetId = version.getAsOfChangeSet();
    if (namedVersionChangesetId)
      return this.getChangesetFromId({
        ...arg,
        changeSetId: namedVersionChangesetId
      });
    const namedVersionName = version.getName();
    if (namedVersionName)
      return this.getChangesetFromNamedVersion({
        ...arg,
        versionName: namedVersionName
      });
    return this.getLatestChangeset(arg);
  }
  async getChangesetFromNamedVersion(arg) {
    if (!arg.versionName)
      return this.getChangesetFromLatestNamedVersion(arg);
    return getNamedVersionChangeset(this._iModelsClient, this.getIModelScopedOperationParams(arg), arg.versionName);
  }
  getIModelScopedOperationParams(arg) {
    const authorizationCallback = arg.accessToken ? () => Promise.resolve(AccessTokenAdapter.toAuthorization(arg.accessToken)) : AccessTokenAdapter.toAuthorizationCallback(() => IModelApp.getAccessToken());
    return {
      authorization: authorizationCallback,
      iModelId: arg.iModelId
    };
  }
  async getChangesetFromLatestNamedVersion(arg) {
    const getNamedVersionListParams = {
      ...this.getIModelScopedOperationParams(arg),
      urlParams: {
        $top: 1,
        $orderBy: {
          property: NamedVersionOrderByProperty.ChangesetIndex,
          operator: OrderByOperator.Descending
        }
      }
    };
    const namedVersionsIterator = this._iModelsClient.namedVersions.getMinimalList(getNamedVersionListParams);
    const namedVersions = await handleAPIErrors(async () => take(namedVersionsIterator, 1));
    if (namedVersions.length === 0 || !namedVersions[0].changesetIndex || !namedVersions[0].changesetId)
      ITwinError.throwError({
        iTwinErrorId: {
          key: IModelsErrorCode.NamedVersionNotFound,
          scope: IModelsErrorScope
        },
        message: "No named versions found"
      });
    return {
      index: namedVersions[0].changesetIndex,
      id: namedVersions[0].changesetId
    };
  }
}
var ColorOptions;
(function(ColorOptions2) {
  ColorOptions2[ColorOptions2["Red"] = 0] = "Red";
  ColorOptions2[ColorOptions2["White"] = 1] = "White";
  ColorOptions2[ColorOptions2["Blue"] = 2] = "Blue";
  ColorOptions2[ColorOptions2["Yellow"] = 3] = "Yellow";
  ColorOptions2[ColorOptions2["Orange"] = 4] = "Orange";
})(ColorOptions || (ColorOptions = {}));
var ToolOptions;
(function(ToolOptions2) {
  ToolOptions2[ToolOptions2["Red"] = 0] = "Red";
  ToolOptions2[ToolOptions2["White"] = 1] = "White";
  ToolOptions2[ToolOptions2["Blue"] = 2] = "Blue";
  ToolOptions2[ToolOptions2["Yellow"] = 3] = "Yellow";
  ToolOptions2[ToolOptions2["Green"] = 4] = "Green";
  ToolOptions2[ToolOptions2["Pink"] = 5] = "Pink";
})(ToolOptions || (ToolOptions = {}));
var StateOptions;
(function(StateOptions2) {
  StateOptions2[StateOptions2["None"] = 0] = "None";
  StateOptions2[StateOptions2["Alabama"] = 1] = "Alabama";
  StateOptions2[StateOptions2["California"] = 2] = "California";
  StateOptions2[StateOptions2["Pennsylvania"] = 3] = "Pennsylvania";
  StateOptions2[StateOptions2["NewYork"] = 4] = "NewYork";
})(StateOptions || (StateOptions = {}));
[
  { state: StateOptions.None, cities: [] },
  {
    state: StateOptions.Alabama,
    cities: ["Birmingham", "Montgomery", "Huntsville", "Mobile"]
  },
  {
    state: StateOptions.California,
    cities: ["Los Angeles", "San Diego", "San Jose", "San Francisco"]
  },
  {
    state: StateOptions.Pennsylvania,
    cities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie"]
  },
  {
    state: StateOptions.NewYork,
    cities: ["New York", "Buffalo", "Rochester", "Yonkers"]
  }
];
const availableSizes = ["default"];
function createPropertyRecord(type, value, editor) {
  return new PropertyRecord({
    valueFormat: PropertyValueFormat.Primitive,
    value
  }, {
    typename: type,
    name: "",
    displayLabel: "",
    editor: typeof editor === "string" ? { name: editor } : editor
  });
}
function createEnumProperty(editor) {
  const record = createPropertyRecord(StandardTypeNames.Enum, "red", editor);
  record.property.enum = {
    choices: [
      { label: "Yellow", value: "yellow" },
      { label: "Red", value: "red" },
      { label: "Green", value: "green" }
    ],
    isStrict: false
  };
  return record;
}
const customFormattedNumberParams = {
  type: PropertyEditorParamTypes.CustomFormattedNumber,
  formatFunction: (numberValue) => numberValue.toFixed(2),
  parseFunction: (stringValue) => ({
    value: Number.parseFloat(stringValue)
  })
};
const inputEditorSizeParams = {
  type: PropertyEditorParamTypes.InputEditorSize,
  size: 5,
  maxLength: 5
};
const propertyRecords = [
  createPropertyRecord(StandardTypeNames.String, "hi"),
  createPropertyRecord(StandardTypeNames.String, "hi", {
    name: StandardEditorNames.MultiLine,
    params: [
      {
        type: PropertyEditorParamTypes.MultilineText,
        rows: 5
      }
    ]
  }),
  // BROKEN!
  // createPropertyRecord(Type.String, "icon-app-2", {
  //   name: Editor.IconPicker,
  //   params: [
  //     {
  //       type: EditorParam.IconListData,
  //       iconValue: "icon-app-2",
  //       numColumns: 2,
  //       iconValues: ["icon-app-1", "icon-app-2", "icon-apps-itwin"],
  //     } as IconListEditorParams,
  //   ],
  // }),
  createPropertyRecord(StandardTypeNames.DateTime, new Date(2018, 0, 1)),
  createPropertyRecord(StandardTypeNames.ShortDate, new Date(2018, 0, 1)),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.Slider,
    params: [
      {
        type: PropertyEditorParamTypes.Slider,
        minimum: 0,
        maximum: 10
      }
    ]
  }),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.NumberCustom,
    params: [customFormattedNumberParams]
  }),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.NumberCustom,
    params: [
      customFormattedNumberParams,
      {
        type: PropertyEditorParamTypes.Icon,
        definition: { iconSpec: "icon-placeholder" }
      }
    ]
  }),
  createPropertyRecord(StandardTypeNames.Number, 1, StandardEditorNames.NumericInput),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.NumericInput,
    params: [inputEditorSizeParams]
  }),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.NumericInput,
    params: [
      {
        type: PropertyEditorParamTypes.Range,
        minimum: 0,
        maximum: 10,
        step: 0.5,
        precision: 1
      }
    ]
  }),
  createPropertyRecord(StandardTypeNames.Number, 1, {
    name: StandardEditorNames.NumericInput,
    params: [
      inputEditorSizeParams,
      {
        type: PropertyEditorParamTypes.Range,
        minimum: 0,
        maximum: 10,
        step: 0.25,
        precision: 2
      }
    ]
  }),
  createPropertyRecord(StandardTypeNames.Boolean, true),
  createPropertyRecord(StandardTypeNames.Boolean, true, StandardEditorNames.Toggle),
  createPropertyRecord(StandardTypeNames.Boolean, true, {
    name: "image-check-box",
    params: [
      {
        type: PropertyEditorParamTypes.CheckBoxImages,
        imageOff: "icon-visibility-hide-2",
        imageOn: "icon-visibility"
      }
    ]
  }),
  createEnumProperty(),
  createEnumProperty(StandardEditorNames.EnumButtonGroup),
  createEnumProperty({
    name: StandardEditorNames.EnumButtonGroup,
    params: [
      {
        type: PropertyEditorParamTypes.ButtonGroupData,
        buttons: [
          {
            iconSpec: "icon-app-1"
          },
          {
            iconSpec: "icon-app-2"
          },
          {
            iconSpec: "icon-apps-itwin"
          }
        ]
      }
    ]
  })
];
function EditorExampleComponent() {
  return reactExports.createElement(Flex, { flexDirection: "column", alignItems: "flex-start", gap: "m", style: { width: "100%" } }, propertyRecords.map((record, index) => {
    const editorKey = createEditorKey(record);
    const editorId = editorKey.replace(/[^A-Za-z]/g, "");
    return reactExports.createElement(
      Flex,
      { key: index, flexDirection: "column" },
      reactExports.createElement(
        Flex,
        { flexDirection: "row", gap: "xl" },
        reactExports.createElement(
          Flex.Item,
          { id: `Legacy${editorId}`, alignSelf: "flex-start", style: { width: "300px" } },
          reactExports.createElement(OldEditorRenderer, { record })
        ),
        reactExports.createElement(Divider, { orientation: "vertical" }),
        reactExports.createElement(
          Flex.Item,
          { id: `New${editorId}`, alignSelf: "flex-end", style: { width: "300px" } },
          reactExports.createElement(NewEditorRenderer, { record })
        )
      ),
      reactExports.createElement(
        Flex.Item,
        { alignSelf: "flex-start" },
        reactExports.createElement(
          Text,
          { variant: "small", isMuted: true },
          editorKey,
          record.property.editor && reactExports.createElement(
            DropdownMenu,
            { menuItems: (close) => [
              reactExports.createElement(
                MenuItem,
                { key: 1, onClick: close },
                reactExports.createElement(Text, { variant: "leading" }, "Editor config:"),
                reactExports.createElement("code", { style: { whiteSpace: "pre", display: "block" } }, JSON.stringify(record.property.editor, void 0, 2))
              )
            ] },
            reactExports.createElement(
              IconButton,
              { styleType: "borderless", size: "small" },
              reactExports.createElement(SvgDetails, null)
            )
          )
        )
      )
    );
  }));
}
function OldEditorRenderer({ record }) {
  return reactExports.createElement(Flex, { flexDirection: "row", flexWrap: "nowrap", alignItems: "flex-end" }, availableSizes.map((localSize) => reactExports.createElement(
    Flex.Item,
    { key: localSize },
    reactExports.createElement(EditorContainer, { propertyRecord: record, onCommit: () => void 0, onCancel: () => void 0 })
  )));
}
function NewEditorRenderer({ record }) {
  return reactExports.createElement(Flex, { flexDirection: "row", flexWrap: "nowrap", alignItems: "flex-end" }, availableSizes.map((localSize) => reactExports.createElement(
    Flex.Item,
    { key: localSize },
    reactExports.createElement(PropertyRecordEditor, {
      propertyRecord: record,
      onCommit: () => void 0,
      onCancel: () => void 0,
      editorSystem: "new",
      size: "small"
      // size={localSize}
    })
  )));
}
function createEditorKey(record) {
  return `${PropertyValueFormat[record.value.valueFormat]}:${record.property.typename}:${record.property.editor?.name ?? "Default"}[${record.property.editor?.params?.map((p) => p.type).join(",") ?? ""}]`.replace("[]", "");
}
const createTreeNodeItem = (id, parentId) => {
  return {
    id,
    parentId,
    label: PropertyRecord.fromString(id, id)
  };
};
const createHierarchy = (rootNodeCount, childrenNodeCount) => {
  const hierarchy = /* @__PURE__ */ new Map();
  const rootNodes = [];
  for (let i = 0; i < rootNodeCount; i++) {
    rootNodes[i] = createTreeNodeItem(`Node ${i.toString()}`);
    const nodes = [];
    if (i !== 1) {
      for (let x = 0; x < childrenNodeCount; x++) {
        nodes[x] = createTreeNodeItem(`Node ${i.toString()}-${x.toString()}`, rootNodes[i].id);
        const innerNodes = [];
        if (x !== 1) {
          for (let y = 0; y < 3; y++) {
            innerNodes[y] = createTreeNodeItem(`Node ${i}-${x}-${y}`, rootNodes[i].id);
          }
          nodes[x].children = innerNodes;
        }
      }
      rootNodes[i].children = nodes;
      hierarchy.set(rootNodes[i].id, nodes);
    }
  }
  hierarchy.set(void 0, rootNodes);
  return hierarchy;
};
createHierarchy(3, 3);
({
  contentGroup: new ContentGroup({
    id: "content-group",
    layout: StandardContentLayouts.singleView,
    contents: [
      {
        id: "content",
        classId: "",
        content: reactExports.createElement("h1", null, "Custom Content")
      }
    ]
  })
});
reactExports.createContext({
  activeId: void 0,
  setActiveId: () => {
  }
});
reactExports.createContext(void 0);
UiFramework.frontstages;
function createBlankConnection() {
  return BlankConnection.create({
    name: "Exton PA",
    location: Cartographic.fromDegrees({
      longitude: -75.686694,
      latitude: 40.065757,
      height: 0
    }),
    extents: new Range3d(-1e3, -1e3, -100, 1e3, 1e3, 100)
  });
}
function createBlankViewState(iModel) {
  const ext = iModel.projectExtents;
  const viewState = SpatialViewState.createBlank(iModel, ext.low, ext.high.minus(ext.low));
  viewState.setAllow3dManipulations(true);
  viewState.displayStyle.backgroundColor = ColorDef.white;
  updateViewFlags(viewState);
  IModelApp.viewManager.onViewOpen.addOnce((vp) => {
    if (vp.view.hasSameCoordinates(viewState)) {
      vp.applyViewState(viewState);
    }
  });
  return viewState;
}
function updateViewFlags(viewState) {
  viewState.viewFlags = viewState.viewFlags.copy({
    acsTriad: true,
    grid: true
  });
  return viewState;
}
async function openDemoIModel(demoIModel) {
  let iModelConnection;
  let viewState;
  if (demoIModel === "blank") {
    iModelConnection = createBlankConnection();
    viewState = createBlankViewState(iModelConnection);
  } else {
    iModelConnection = await CheckpointConnection.openRemote(
      demoIModel.iTwinId,
      demoIModel.iModelId
    );
    const viewCreator = new ViewCreator3d(iModelConnection);
    viewState = await viewCreator.createDefaultView();
  }
  UiFramework.setIModelConnection(iModelConnection, true);
  UiFramework.setDefaultViewState(viewState, true);
}
function AppUiStory(props) {
  const demoIModel = useStoryDemoIModel(props);
  const [initialized, setInitialized] = React.useState(false);
  React.useEffect(() => {
    let ignore = false;
    const startup = async () => {
      await IModelApp.startup({
        accuDraw: new FrameworkAccuDraw(),
        toolAdmin: new FrameworkToolAdmin(),
        hubAccess: new FrontendIModelsAccess({
          api: {
            baseUrl: "https://api.bentley.com/imodels"
          }
        }),
        authorizationClient: new DemoAuthClient(),
        notifications: new AppNotificationManager()
      });
      await UiFramework.initialize(void 0);
      await IModelApp.quantityFormatter.setActiveUnitSystem("metric");
      BentleyCloudRpcManager.initializeClient(
        {
          info: {
            title: "visualization",
            version: "v4.0"
          },
          pathPrefix: "https://api.bentley.com/imodeljs"
        },
        [
          IModelReadRpcInterface,
          IModelTileRpcInterface,
          SnapshotIModelRpcInterface
        ]
      );
      demoIModel && await openDemoIModel(demoIModel);
      await props.onInitialize?.();
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.register(provider);
      }
      const frontstages = getFrontstages(props.frontstages);
      for (const frontstage of frontstages) {
        UiFramework.frontstages.addFrontstage(frontstage);
      }
      if (ignore) return;
      setInitialized(true);
    };
    const shutdown = async () => {
      await UiFramework.getIModelConnection()?.close();
      await UiFramework.frontstages.setActiveFrontstageDef(void 0);
      UiFramework.frontstages.clearFrontstageProviders();
      for (const provider of props.itemProviders ?? []) {
        UiItemsManager.unregister(provider.id);
      }
      UiFramework.terminate();
      await IModelApp.shutdown();
    };
    const cleanup = appInitializer.initialize(startup, shutdown);
    return () => {
      ignore = true;
      setInitialized(false);
      cleanup();
    };
  }, [props, demoIModel]);
  if (!initialized) return /* @__PURE__ */ jsxRuntimeExports.jsx(Initializer, {});
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Initialized, { ...props });
}
function Initialized(props) {
  const { frontstages: frontstagesGetter, onFrontstageActivated } = props;
  React.useEffect(() => {
    let ignore = false;
    const frontstages = getFrontstages(frontstagesGetter);
    const frontstage = frontstages[0];
    (async function() {
      if (!frontstage) return;
      await UiFramework.frontstages.setActiveFrontstage(frontstage.id);
      if (ignore) return;
      onFrontstageActivated?.();
    })();
    return () => {
      ignore = true;
    };
  }, [frontstagesGetter, onFrontstageActivated]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Provider_default, { store: UiFramework.store, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ThemeManager, { children: [
    props.children,
    !props.displayChildrenOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfigurableUiContent,
      {
        style: {
          height: props.layout === "fullscreen" ? "100vh" : "calc(100vh - 2rem)"
        },
        appBackstage: props.appBackstage,
        widgetIcon: true
      }
    )
  ] }) }) });
}
function Initializer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLinear, { indeterminate: true, labels: ["Getting things ready!"] }) });
}
function Page() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title3, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Subtitle2, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Description2, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Primary, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Controls3, {})
  ] });
}
function getFrontstages(frontstages) {
  if (!frontstages) return [createFrontstage()];
  if (Array.isArray(frontstages)) return frontstages;
  return frontstages();
}
class DemoAuthClient {
  accessToken = void 0;
  async getAccessToken() {
    this.accessToken ??= (async () => {
      const response = await fetch(
        "https://connect-itwinjscodesandbox.bentley.com/api/userToken"
      );
      const result = await response.json();
      setTimeout(
        () => this.accessToken = void 0,
        new Date(result._expiresAt).getTime() - (/* @__PURE__ */ new Date()).getTime() - 5e3
      );
      return `Bearer ${result._jwt}`;
    })();
    return this.accessToken;
  }
}
const appInitializer = /* @__PURE__ */ (() => {
  let latestStartup;
  let initializer;
  return {
    initialize: (startup, shutdown) => {
      latestStartup = startup;
      let ignore = false;
      void (async () => {
        if (initializer) {
          await initializer.cleanup();
        }
        if (ignore) return;
        if (startup !== latestStartup) return;
        let shutdownPromise;
        initializer = {
          cleanup: async () => {
            if (shutdownPromise) {
              await shutdownPromise;
              return;
            }
            await startupPromise;
            shutdownPromise = shutdown();
            await shutdownPromise;
          },
          startup
        };
        const startupPromise = startup();
        await startupPromise;
      })();
      return () => {
        ignore = true;
        if (initializer?.startup !== startup) return;
        void initializer.cleanup();
      };
    }
  };
})();
function useStoryDemoIModel(props) {
  const demoIModel = useDemoIModel();
  if (!props.demoIModel) return void 0;
  if (props.demoIModel === true) {
    return demoIModel;
  }
  return demoIModel ?? props.demoIModel?.default;
}
AppUiStory.__docgenInfo = { "description": "", "methods": [], "displayName": "AppUiStory", "props": { "appBackstage": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "children": { "required": false, "tsType": { "name": "ReactReactNode", "raw": "React.ReactNode" }, "description": "" }, "demoIModel": { "required": false, "tsType": { "name": "union", "raw": "boolean | { default: DemoIModel }", "elements": [{ "name": "boolean" }, { "name": "signature", "type": "object", "raw": "{ default: DemoIModel }", "signature": { "properties": [{ "key": "default", "value": { "name": "union", "raw": 'RemoteIModel | "blank"', "elements": [{ "name": "RemoteIModel" }, { "name": "literal", "value": '"blank"' }], "required": true } }] } }] }, "description": "" }, "frontstages": { "required": false, "tsType": { "name": "union", "raw": "Frontstage[] | (() => Frontstage[])", "elements": [{ "name": "Array", "elements": [{ "name": "Frontstage" }], "raw": "Frontstage[]" }, { "name": "unknown" }] }, "description": "" }, "itemProviders": { "required": false, "tsType": { "name": "Array", "elements": [{ "name": "UiItemsProvider" }], "raw": "UiItemsProvider[]" }, "description": "" }, "layout": { "required": false, "tsType": { "name": "literal", "value": '"fullscreen"' }, "description": "" }, "onInitialize": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => Promise<void>", "signature": { "arguments": [], "return": { "name": "Promise", "elements": [{ "name": "void" }], "raw": "Promise<void>" } } }, "description": "" }, "onFrontstageActivated": { "required": false, "tsType": { "name": "signature", "type": "function", "raw": "() => void", "signature": { "arguments": [], "return": { "name": "void" } } }, "description": "" }, "displayChildrenOnly": { "required": false, "tsType": { "name": "boolean" }, "description": "Only display provided children, otherwise, add ConfigurableUIContent component below children. Defaults to false;" } } };
Page.__docgenInfo = { "description": "", "methods": [], "displayName": "Page" };
export {
  AppUiStory as A,
  EditorExampleComponent as E,
  Page as P
};
