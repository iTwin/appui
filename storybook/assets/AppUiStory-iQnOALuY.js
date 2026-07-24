import { a as __exportAll, i as __esmMin, s as __toESM } from "./preload-helper-C_PogYeJ.js";
import { t as require_react } from "./react-6GvqukgS.js";
import { c as Primary, d as Title3, f as init_blocks, i as Description2, r as Controls3, u as Subtitle2 } from "./blocks-1rJJ86v1.js";
import { t as require_jsx_runtime } from "./jsx-runtime-CLJh2LsN.js";
import { Ct as Text, Dt as IconButton, T as MenuItem, Xt as init_DemoIModel, Zt as useDemoIModel, _ as Flex, a as Divider, h as ProgressLinear, ht as DropdownMenu, i as init_esm$3, jt as ThemeProvider, qt as require_classnames } from "./iframe-DrBiZGmV.js";
import { A as BackstageAppButton, An as IModelApp, G as DefaultViewOverlay, Ht as ContentGroupProvider, Kn as BlankConnection, Ln as SpatialViewState, M as FrontstageUtilities, Nt as StageUsage, Ot as LocalStateStorage, P as ViewToolWidgetComposer, Sn as ViewCreator3d, U as IModelViewportControl, Vt as ContentGroup, Wt as UiItemsManager, Y as StageContentLayout, Z as ContentControl, _n as ViewportComponent, _r as init_core_geometry, _t as ThemeManager, ar as IModelTileRpcInterface, b as Provider_default, br as Range3d, dr as Cartographic, er as init_core_common, gn as init_imodel_components_react, n as FrameworkToolAdmin, pr as ColorDef, q as StandardContentLayouts, rr as SnapshotIModelRpcInterface, rt as FrameworkAccuDraw, sr as IModelReadRpcInterface, st as UiFramework, t as init_appui_react, tr as BentleyCloudRpcManager, w as AppNotificationManager, wn as CheckpointConnection, x as init_react_redux, xn as init_core_frontend, yt as ConfigurableUiContent } from "./appui-react-CpKk3CrH.js";
import { Dn as ITwinError, I as PropertyValueFormat, P as PropertyRecord, R as StandardTypeNames, V as PropertyEditorParamTypes, X as init_core_bentley, hn as BeEvent, m as StandardEditorNames, r as init_appui_abstract, t as require_Key_enum } from "./Key.enum-DhBIjxOv.js";
import { Gt as init_internal$1, Vr as init_esm$4, bn as init_core_react, gt as EditorContainer, io as SvgDetails, mt as PropertyRecordEditor, t as init_components_react } from "./components-react-DigDa1CF.js";
import { i as init_Utils, t as createFrontstage } from "./Utils-BkeALKzH.js";
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/IModelInterfaces.js
var IModelState, ContainerTypes;
var init_IModelInterfaces = __esmMin((() => {
	(function(IModelState) {
		/**
		* Not initialized iModel. iModel is not yet initialized and the server-side background initialization
		* process is still running. Initialization could take several minutes.
		*/
		IModelState["NotInitialized"] = "notInitialized";
		/** Initialized iModel. It means that iModel initialization has completed and iModel is ready to use. */
		IModelState["Initialized"] = "initialized";
	})(IModelState || (IModelState = {}));
	(function(ContainerTypes) {
		ContainerTypes[ContainerTypes["None"] = 0] = "None";
		ContainerTypes[ContainerTypes["SchemaSync"] = 1] = "SchemaSync";
		ContainerTypes[ContainerTypes["CodeStore"] = 2] = "CodeStore";
		ContainerTypes[ContainerTypes["ViewStore"] = 4] = "ViewStore";
	})(ContainerTypes || (ContainerTypes = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/BriefcaseInterfaces.js
var init_BriefcaseInterfaces = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ChangesetInterfaces.js
var ChangesetState, ContainingChanges;
var init_ChangesetInterfaces = __esmMin((() => {
	(function(ChangesetState) {
		/** Changeset instance is created but file is not uploaded. The Changeset creation is not complete. */
		ChangesetState["WaitingForFile"] = "waitingForFile";
		/** The Changeset file is uploaded and creation is complete. */
		ChangesetState["FileUploaded"] = "fileUploaded";
	})(ChangesetState || (ChangesetState = {}));
	(function(ContainingChanges) {
		ContainingChanges[ContainingChanges["Regular"] = 0] = "Regular";
		ContainingChanges[ContainingChanges["Schema"] = 1] = "Schema";
		ContainingChanges[ContainingChanges["Definition"] = 2] = "Definition";
		ContainingChanges[ContainingChanges["SpatialData"] = 4] = "SpatialData";
		ContainingChanges[ContainingChanges["SheetsAndDrawings"] = 8] = "SheetsAndDrawings";
		ContainingChanges[ContainingChanges["ViewsAndModels"] = 16] = "ViewsAndModels";
		ContainingChanges[ContainingChanges["GlobalProperties"] = 32] = "GlobalProperties";
		ContainingChanges[ContainingChanges["SchemaSync"] = 64] = "SchemaSync";
	})(ContainingChanges || (ContainingChanges = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ChangesetExtendedDataInterfaces.js
var init_ChangesetExtendedDataInterfaces = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ChangesetGroupInterfaces.js
var ChangesetGroupState;
var init_ChangesetGroupInterfaces = __esmMin((() => {
	(function(ChangesetGroupState) {
		/** Changeset Group is in progress and Changesets can be pushed to it. */
		ChangesetGroupState["InProgress"] = "inProgress";
		/** Changeset Group is closed and Changesets cannot be pushed to it anymore. */
		ChangesetGroupState["Completed"] = "completed";
		/** Changeset Group was not completed within the specified timeout period so it was closed by the service. */
		ChangesetGroupState["TimedOut"] = "timedOut";
		/** Changeset group was forcibly closed before cloning to the target iModel. */
		ChangesetGroupState["ForciblyClosed"] = "forciblyClosed";
	})(ChangesetGroupState || (ChangesetGroupState = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/NamedVersionInterfaces.js
var NamedVersionState;
var init_NamedVersionInterfaces = __esmMin((() => {
	(function(NamedVersionState) {
		/** Visible. Named Version should be present in displayed Named Version lists. */
		NamedVersionState["Visible"] = "visible";
		/** Hidden. Named Version is intended to be hidden in displayed Named Version lists. */
		NamedVersionState["Hidden"] = "hidden";
	})(NamedVersionState || (NamedVersionState = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/CheckpointInterfaces.js
var CheckpointState;
var init_CheckpointInterfaces = __esmMin((() => {
	(function(CheckpointState) {
		/** Checkpoint generation completed successfully. */
		CheckpointState["Successful"] = "successful";
		/** Checkpoint generation is not yet complete, the background job is scheduled. */
		CheckpointState["Scheduled"] = "scheduled";
		/** Checkpoint generation failed. */
		CheckpointState["Failed"] = "failed";
		/** Checkpoint is not generated and the background job is not scheduled. */
		CheckpointState["NotGenerated"] = "notGenerated";
	})(CheckpointState || (CheckpointState = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/ThumbnailInterfaces.js
var ThumbnailSize;
var init_ThumbnailInterfaces = __esmMin((() => {
	(function(ThumbnailSize) {
		/** A small Thumbnail is a 400x250 PNG image. */
		ThumbnailSize["Small"] = "small";
		/** A large Thumbnail is a 800x500 PNG image. */
		ThumbnailSize["Large"] = "large";
	})(ThumbnailSize || (ThumbnailSize = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/UserInterfaces.js
var init_UserInterfaces = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/UserPermissionInterfaces.js
var IModelPermission;
var init_UserPermissionInterfaces = __esmMin((() => {
	(function(IModelPermission) {
		/** Allows to view iModel in web browser, but does not allow to get its local copy and view in desktop app. */
		IModelPermission["WebView"] = "imodels_webview";
		/** Allows to open and view an iModel only in read-only state. */
		IModelPermission["Read"] = "imodels_read";
		/**
		* Allows to make changes to an iModel. Allows to create and modify Named Versions. Allows to create mapping
		* between PW connection and iModel to facilitate connectors.
		*/
		IModelPermission["Write"] = "imodels_write";
		/**
		* Allows to create an iModel. Allows to configure access per iModel. Allows to manage Locks or local copies
		* for the entire iModel. This Permission is both iModel and iTwin level Permission, but Create iModel operation
		* requires that user has `imodels_manage` Permission on the iTwin level. Use
		* {@link https://developer.bentley.com/apis/access-control/operations/get-itwin-permissions/ Access Control API}
		* to check if user can create an iModel on a given iTwin.
		*/
		IModelPermission["Manage"] = "imodels_manage";
		/**
		* Allows to delete an iModel. This Permission is only available on the iTwin level. Use
		* {@link https://developer.bentley.com/apis/access-control/operations/get-itwin-permissions/ Access Control API}
		* to check if user can delete iModels on a given iTwin. */
		IModelPermission["Delete"] = "imodels-delete";
	})(IModelPermission || (IModelPermission = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/apiEntities/OperationInterfaces.js
var IModelCreationState;
var init_OperationInterfaces = __esmMin((() => {
	(function(IModelCreationState) {
		/** iModel creation process completed successfully. */
		IModelCreationState["Successful"] = "successful";
		/** iModel is being created from a Baseline File and the file upload to file storage has not been completed yet. */
		IModelCreationState["WaitingForFile"] = "waitingForFile";
		/** iModel creation process is scheduled or in progress. */
		IModelCreationState["Scheduled"] = "scheduled";
		/** iModel creation process failed. */
		IModelCreationState["Failed"] = "failed";
		/** iModel fork creation failed because some elements in the main iModel do not have FederationGuid property set. */
		IModelCreationState["MainIModelIsMissingFederationGuids"] = "mainIModelIsMissingFederationGuids";
	})(IModelCreationState || (IModelCreationState = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/iterators/EntityListIterator.js
var init_EntityListIterator = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/iterators/IteratorUtilFunctions.js
/**
* Transforms an iterator of entity pages into an iterator of entities.
* @param {AsyncIterableIterator<TEntity[]>} pagedIterator iterator of entity pages.
* @returns {AsyncIterableIterator<TEntity>} iterator of entities.
*/
async function* flatten(pagedIterator) {
	for await (const entityChunk of pagedIterator) for (const entity of entityChunk) yield entity;
}
/**
* Loads all entities from an iterator into an array.
* @param {AsyncIterableIterator<TEntity>} iterator entity iterator.
* @returns {Promise<TEntity[]>} entity array.
*/
async function toArray$1(iterator) {
	const result = [];
	for await (const entity of iterator) result.push(entity);
	return result;
}
/**
* Loads top n entities from an iterator into an array.
* @param {AsyncIterableIterator<TSource>} iterator source entity iterator.
* @param {number} entityCount number of entities to load.
* @returns {Promise<TEntity[]>} entity array that contains a number of top elements specified. If iterator contains
* less items than specified in `entityCount` length of the array will be less than `entityCount`. If
* iterator contains no entities the array will be empty.
*/
async function take(iterator, entityCount) {
	const result = [];
	for await (const entity of iterator) {
		result.push(entity);
		if (result.length === entityCount) break;
	}
	return result;
}
var init_IteratorUtilFunctions = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/RestClient.js
var ContentType;
var init_RestClient = __esmMin((() => {
	(function(ContentType) {
		ContentType["Json"] = "application/json";
		ContentType["Png"] = "image/png";
		ContentType["Jpeg"] = "image/jpeg";
	})(ContentType || (ContentType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/CommonInterfaces.js
var OrderByOperator, PreferReturn;
var init_CommonInterfaces = __esmMin((() => {
	(function(OrderByOperator) {
		/** Ascending. Entities will be returned in ascending order. */
		OrderByOperator["Ascending"] = "asc";
		/** Descending. Entities will be returned in descending order. */
		OrderByOperator["Descending"] = "desc";
	})(OrderByOperator || (OrderByOperator = {}));
	(function(PreferReturn) {
		/** Instructs the server to return minimal entity representation. */
		PreferReturn["Minimal"] = "minimal";
		/** Instructs the server to return full entity representation. */
		PreferReturn["Representation"] = "representation";
	})(PreferReturn || (PreferReturn = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/UtilityTypes.js
var init_UtilityTypes$1 = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/IModelsErrorInterfaces.js
function isIModelsApiError(error) {
	const errorCode = error?.code;
	return errorCode !== void 0 && typeof errorCode === "string";
}
var IModelsErrorScope, IModelsErrorCode;
var init_IModelsErrorInterfaces = __esmMin((() => {
	IModelsErrorScope = "imodels-clients";
	(function(IModelsErrorCode) {
		IModelsErrorCode["AnotherUserPushing"] = "AnotherUserPushing";
		IModelsErrorCode["BaselineFileInitializationFailed"] = "BaselineFileInitializationFailed";
		IModelsErrorCode["BaselineFileInitializationTimedOut"] = "BaselineFileInitializationTimedOut";
		IModelsErrorCode["BaselineFileNotFound"] = "BaselineFileNotFound";
		IModelsErrorCode["BriefcaseNotFound"] = "BriefcaseNotFound";
		IModelsErrorCode["CannotAcquire"] = "CannotAcquire";
		IModelsErrorCode["ChangesetDownloadFailed"] = "ChangesetDownloadFailed";
		IModelsErrorCode["ChangesetExists"] = "ChangesetExists";
		IModelsErrorCode["ChangesetExtendedDataNotFound"] = "ChangesetExtendedDataNotFound";
		IModelsErrorCode["ChangesetGroupNotFound"] = "ChangesetGroupNotFound";
		IModelsErrorCode["ChangesetNotFound"] = "ChangesetNotFound";
		IModelsErrorCode["CheckpointNotFound"] = "CheckpointNotFound";
		IModelsErrorCode["ClonedIModelInitializationFailed"] = "ClonedIModelInitializationFailed";
		IModelsErrorCode["ClonedIModelInitializationTimedOut"] = "ClonedIModelInitializationTimedOut";
		IModelsErrorCode["ConflictWithAnotherUser"] = "ConflictWithAnotherUser";
		IModelsErrorCode["DataConflict"] = "DataConflict";
		IModelsErrorCode["DownloadAborted"] = "DownloadAborted";
		IModelsErrorCode["DownloadCancelled"] = "DownloadCancelled";
		IModelsErrorCode["EmptyIModelInitializationFailed"] = "EmptyIModelInitializationFailed";
		IModelsErrorCode["FileNotFound"] = "FileNotFound";
		IModelsErrorCode["IModelExists"] = "iModelExists";
		IModelsErrorCode["IModelForkInitializationFailed"] = "IModelForkInitializationFailed";
		IModelsErrorCode["IModelForkInitializationTimedOut"] = "IModelForkInitializationTimedOut";
		IModelsErrorCode["IModelFromTemplateInitializationFailed"] = "IModelFromTemplateInitializationFailed";
		IModelsErrorCode["IModelFromTemplateInitializationTimedOut"] = "IModelFromTemplateInitializationTimedOut";
		IModelsErrorCode["IModelNotFound"] = "iModelNotFound";
		IModelsErrorCode["InsufficientPermissions"] = "InsufficientPermissions";
		IModelsErrorCode["InvalidChange"] = "InvalidChange";
		IModelsErrorCode["InvalidHeaderValue"] = "InvalidHeaderValue";
		IModelsErrorCode["InvalidIModelGCSCreationMode"] = "InvalidIModelGCSCreationMode";
		IModelsErrorCode["InvalidIModelsRequest"] = "InvalidiModelsRequest";
		IModelsErrorCode["InvalidRequestBody"] = "InvalidRequestBody";
		IModelsErrorCode["InvalidThumbnailFormat"] = "InvalidThumbnailFormat";
		IModelsErrorCode["InvalidValue"] = "InvalidValue";
		IModelsErrorCode["ITwinNotFound"] = "iTwinNotFound";
		IModelsErrorCode["LockNotFound"] = "LockNotFound";
		IModelsErrorCode["LockOwnedByAnotherBriefcase"] = "LockOwnedByAnotherBriefcase";
		IModelsErrorCode["MainIModelIsMissingFederationGuids"] = "MainIModelIsMissingFederationGuids";
		IModelsErrorCode["MaximumNumberOfBriefcasesPerUser"] = "MaximumNumberOfBriefcasesPerUser";
		IModelsErrorCode["MaximumNumberOfBriefcasesPerUserPerMinute"] = "MaximumNumberOfBriefcasesPerUserPerMinute";
		IModelsErrorCode["MissingRequestBody"] = "MissingRequestBody";
		IModelsErrorCode["MissingRequiredHeader"] = "MissingRequiredHeader";
		IModelsErrorCode["MissingRequiredParameter"] = "MissingRequiredParameter";
		IModelsErrorCode["MissingRequiredProperty"] = "MissingRequiredProperty";
		IModelsErrorCode["MutuallyExclusiveParametersProvided"] = "MutuallyExclusiveParametersProvided";
		IModelsErrorCode["MutuallyExclusivePropertiesProvided"] = "MutuallyExclusivePropertiesProvided";
		IModelsErrorCode["NamedVersionNotFound"] = "NamedVersionNotFound";
		IModelsErrorCode["NamedVersionOnChangesetExists"] = "NamedVersionOnChangesetExists";
		IModelsErrorCode["NewerChangesExist"] = "NewerChangesExist";
		IModelsErrorCode["RateLimitExceeded"] = "RateLimitExceeded";
		IModelsErrorCode["RequestTooLarge"] = "RequestTooLarge";
		IModelsErrorCode["ResourceQuotaExceeded"] = "ResourceQuotaExceeded";
		IModelsErrorCode["StorageTypeNotSupported"] = "StorageTypeNotSupported";
		IModelsErrorCode["TooManyRequests"] = "TooManyRequests";
		IModelsErrorCode["Unauthorized"] = "Unauthorized";
		IModelsErrorCode["Unknown"] = "Unknown";
		IModelsErrorCode["Unrecognized"] = "Unrecognized";
		IModelsErrorCode["UserNotFound"] = "UserNotFound";
		IModelsErrorCode["VersionExists"] = "NamedVersionExists";
	})(IModelsErrorCode || (IModelsErrorCode = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/HttpRequestRetryPolicy.js
var init_HttpRequestRetryPolicy = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/types/index.js
var init_types = __esmMin((() => {
	init_IModelInterfaces();
	init_BriefcaseInterfaces();
	init_ChangesetInterfaces();
	init_ChangesetExtendedDataInterfaces();
	init_ChangesetGroupInterfaces();
	init_NamedVersionInterfaces();
	init_CheckpointInterfaces();
	init_ThumbnailInterfaces();
	init_UserInterfaces();
	init_UserPermissionInterfaces();
	init_OperationInterfaces();
	init_EntityListIterator();
	init_IteratorUtilFunctions();
	init_RestClient();
	init_CommonInterfaces();
	init_UtilityTypes$1();
	init_IModelsErrorInterfaces();
	init_HttpRequestRetryPolicy();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/iterators/EntityPageListIterator.js
var EntityPageListIterator;
var init_EntityPageListIterator = __esmMin((() => {
	EntityPageListIterator = class {
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/iterators/EntityListIteratorImpl.js
var EntityListIteratorImpl;
var init_EntityListIteratorImpl = __esmMin((() => {
	init_types();
	init_EntityPageListIterator();
	EntityListIteratorImpl = class {
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/ApiResponseInterfaces.js
var init_ApiResponseInterfaces = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/IModelsErrorParser.js
var IModelsErrorBaseImpl, IModelsErrorImpl, IModelsErrorParser;
var init_IModelsErrorParser = __esmMin((() => {
	init_types();
	IModelsErrorBaseImpl = class extends Error {
		code;
		originalError;
		constructor(params) {
			super();
			this.name = this.code = params.code;
			this.message = params.message;
			this.originalError = params.originalError;
		}
	};
	IModelsErrorImpl = class extends IModelsErrorBaseImpl {
		details;
		statusCode;
		constructor(params) {
			super(params);
			this.details = params.details;
			this.statusCode = params.statusCode;
		}
	};
	IModelsErrorParser = class IModelsErrorParser {
		static _defaultErrorMessage = "Unknown error occurred";
		static _defaultUnauthorizedMessage = "Authorization failed";
		static parse(response, originalError) {
			if (!response.body) return IModelsErrorParser.createUnrecognizedError(response, originalError);
			if (response.statusCode === 401) return IModelsErrorParser.createUnauthorizedError(response, originalError);
			const errorFromApi = response.body;
			const errorCode = IModelsErrorParser.parseCode(errorFromApi?.error?.code);
			if (errorCode === IModelsErrorCode.Unrecognized) return IModelsErrorParser.createUnrecognizedError(response, originalError);
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
			if (!errorCode) return IModelsErrorCode.Unrecognized;
			let parsedCode = IModelsErrorCode[IModelsErrorParser.adjustErrorCodeCaseToMatchEnum(errorCode)];
			if (!parsedCode) parsedCode = IModelsErrorCode.Unrecognized;
			return parsedCode;
		}
		static adjustErrorCodeCaseToMatchEnum(errorCode) {
			return errorCode.replace("iModel", "IModel").replace("iTwin", "ITwin");
		}
		static parseDetails(details) {
			if (!details) return void 0;
			return details.map((unparsedDetail) => {
				return {
					...unparsedDetail,
					code: this.parseCode(unparsedDetail.code)
				};
			});
		}
		static parseAndFormatMessage(message, errorDetails) {
			let result = message ?? IModelsErrorParser._defaultErrorMessage;
			if (!errorDetails || errorDetails.length === 0) return result;
			result += " Details:\n";
			for (let i = 0; i < errorDetails.length; i++) {
				result += `${i + 1}. ${errorDetails[i].code}: ${errorDetails[i].message}`;
				if (errorDetails[i].target) result += ` Target: ${errorDetails[i].target}.`;
				result += "\n";
			}
			return result;
		}
		static createUnrecognizedError(response, originalError) {
			return new IModelsErrorImpl({
				code: IModelsErrorCode.Unrecognized,
				statusCode: response.statusCode,
				originalError,
				message: `${IModelsErrorParser._defaultErrorMessage}.\nOriginal error message: ${originalError.message},\noriginal error code: ${originalError.code},\nresponse status code: ${response.statusCode},\nresponse body: ${JSON.stringify(response.body)}`,
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/Constants.js
var Constants$1;
var init_Constants$1 = __esmMin((() => {
	Constants$1 = class {
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
			iModelInitializationTimeOutInMs: 300 * 1e3
		};
		static httpStatusCodes = { internalServerError: 500 };
		static retryPolicy = {
			maxRetries: 3,
			baseDelayInMs: 300,
			delayFactor: 3
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/OperationsBase.js
var OperationsBase;
var init_OperationsBase = __esmMin((() => {
	init_Constants$1();
	init_types();
	init_IModelsErrorParser();
	OperationsBase = class {
		_options;
		constructor(_options) {
			this._options = _options;
		}
		async sendGetRequest(params) {
			const urlAndHeaders = {
				url: params.url,
				headers: await this.formHeaders(params)
			};
			if (params.responseType === ContentType.Png) return this.executeRequest(async () => this._options.restClient.sendGetRequest({
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
				return await requestFunc();
			} catch (error) {
				if (error instanceof IModelsErrorBaseImpl) throw error;
				throw this._options.parseErrorFunc({
					statusCode: error.response?.status,
					body: error.response?.data
				}, error);
			}
		}
		resolveHeaderValue(headerOrHeaderFactory) {
			if (typeof headerOrHeaderFactory === "function") return headerOrHeaderFactory();
			return headerOrHeaderFactory;
		}
		addOrUpdateHeaders(existingHeaders, additionalHeaders) {
			if (!additionalHeaders) return;
			for (const headerName in additionalHeaders) if (Object.prototype.hasOwnProperty.call(additionalHeaders, headerName)) {
				const headerValue = this.resolveHeaderValue(additionalHeaders[headerName]);
				if (typeof headerValue === "string") existingHeaders[headerName] = headerValue;
				else delete existingHeaders[headerName];
			}
		}
		async formHeaders(params) {
			const headers = {};
			const authorizationInfo = await params.authorization();
			headers[Constants$1.headers.authorization] = `${authorizationInfo.scheme} ${authorizationInfo.token}`;
			headers[Constants$1.headers.accept] = `application/vnd.bentley.${this._options.api.version}+json`;
			if (params.preferReturn) headers[Constants$1.headers.prefer] = `return=${params.preferReturn}`;
			if (params.contentType) headers[Constants$1.headers.contentType] = params.contentType;
			this.addOrUpdateHeaders(headers, this._options.headers);
			this.addOrUpdateHeaders(headers, params.headers);
			return headers;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/UtilityTypes.js
var init_UtilityTypes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/UtilityFunctions.js
var UtilityFunctions;
var init_UtilityFunctions = __esmMin((() => {
	init_Constants$1();
	(function(UtilityFunctions) {
		async function sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
		UtilityFunctions.sleep = sleep;
		async function waitForCondition(params) {
			const sleepPeriodInMs = Constants$1.time.sleepPeriodInMs;
			const timeOutInMs = params.timeOutInMs ?? Constants$1.time.iModelInitializationTimeOutInMs;
			for (let retries = Math.ceil(timeOutInMs / sleepPeriodInMs); retries > 0; --retries) {
				if (await params.conditionToSatisfy()) return;
				await sleep(sleepPeriodInMs);
			}
			throw params.timeoutErrorFactory();
		}
		UtilityFunctions.waitForCondition = waitForCondition;
	})(UtilityFunctions || (UtilityFunctions = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/internal/index.js
var init_internal = __esmMin((() => {
	init_EntityListIteratorImpl();
	init_EntityPageListIterator();
	init_ApiResponseInterfaces();
	init_IModelsErrorParser();
	init_OperationsBase();
	init_UtilityTypes();
	init_UtilityFunctions();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosResponseHeadersAdapter.js
var AxiosResponseHeadersAdapter;
var init_AxiosResponseHeadersAdapter = __esmMin((() => {
	AxiosResponseHeadersAdapter = class {
		_response;
		constructor(response) {
			this._response = response;
		}
		get(headerName) {
			if (this._response.headers.get instanceof Function) return this._response.headers.get(headerName);
			return this._response.headers[headerName.toLowerCase()];
		}
		getAll() {
			return this._response.headers;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/bind.js
/**
* Create a bound version of a function with a specified `this` context
*
* @param {Function} fn - The function to bind
* @param {*} thisArg - The value to be passed as the `this` parameter
* @returns {Function} A new function that will call the original function with the specified `this` context
*/
function bind(fn, thisArg) {
	return function wrap() {
		return fn.apply(thisArg, arguments);
	};
}
var init_bind = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/utils.js
/**
* Determine if a value is a Buffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a Buffer, otherwise false
*/
function isBuffer(val) {
	return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
/**
* Determine if a value is a view on an ArrayBuffer
*
* @param {*} val The value to test
*
* @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
*/
function isArrayBufferView(val) {
	let result;
	if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) result = ArrayBuffer.isView(val);
	else result = val && val.buffer && isArrayBuffer(val.buffer);
	return result;
}
/**
* Determine if a value is a FormData
*
* @param {*} thing The value to test
*
* @returns {boolean} True if value is an FormData, otherwise false
*/
function getGlobal() {
	if (typeof globalThis !== "undefined") return globalThis;
	if (typeof self !== "undefined") return self;
	if (typeof window !== "undefined") return window;
	if (typeof global !== "undefined") return global;
	return {};
}
/**
* Iterate over an Array or an Object invoking a function for each item.
*
* If `obj` is an Array callback will be called passing
* the value, index, and complete array for each item.
*
* If 'obj' is an Object callback will be called passing
* the value, key, and complete object for each property.
*
* @param {Object|Array<unknown>} obj The object to iterate
* @param {Function} fn The callback to invoke for each item
*
* @param {Object} [options]
* @param {Boolean} [options.allOwnKeys = false]
* @returns {any}
*/
function forEach(obj, fn, { allOwnKeys = false } = {}) {
	if (obj === null || typeof obj === "undefined") return;
	let i;
	let l;
	if (typeof obj !== "object") obj = [obj];
	if (isArray(obj)) for (i = 0, l = obj.length; i < l; i++) fn.call(null, obj[i], i, obj);
	else {
		if (isBuffer(obj)) return;
		const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			fn.call(null, obj[key], key, obj);
		}
	}
}
/**
* Finds a key in an object, case-insensitive, returning the actual key name.
* Returns null if the object is a Buffer or if no match is found.
*
* @param {Object} obj - The object to search.
* @param {string} key - The key to find (case-insensitive).
* @returns {?string} The actual key name if found, otherwise null.
*/
function findKey(obj, key) {
	if (isBuffer(obj)) return null;
	key = key.toLowerCase();
	const keys = Object.keys(obj);
	let i = keys.length;
	let _key;
	while (i-- > 0) {
		_key = keys[i];
		if (key === _key.toLowerCase()) return _key;
	}
	return null;
}
/**
* Accepts varargs expecting each argument to be an object, then
* immutably merges the properties of each object and returns result.
*
* When multiple objects contain the same key the later object in
* the arguments list will take precedence.
*
* Example:
*
* ```js
* const result = merge({foo: 123}, {foo: 456});
* console.log(result.foo); // outputs 456
* ```
*
* @param {Object} obj1 Object to merge
*
* @returns {Object} Result of all merge properties
*/
function merge(...objs) {
	const { caseless, skipUndefined } = isContextDefined(this) && this || {};
	const result = {};
	const assignValue = (val, key) => {
		if (key === "__proto__" || key === "constructor" || key === "prototype") return;
		const targetKey = caseless && typeof key === "string" && findKey(result, key) || key;
		const existing = hasOwnProperty(result, targetKey) ? result[targetKey] : void 0;
		if (isPlainObject(existing) && isPlainObject(val)) result[targetKey] = merge(existing, val);
		else if (isPlainObject(val)) result[targetKey] = merge({}, val);
		else if (isArray(val)) result[targetKey] = val.slice();
		else if (!skipUndefined || !isUndefined(val)) result[targetKey] = val;
	};
	for (let i = 0, l = objs.length; i < l; i++) {
		const source = objs[i];
		if (!source || isBuffer(source)) continue;
		forEach(source, assignValue);
		if (typeof source !== "object" || isArray(source)) continue;
		const symbols = Object.getOwnPropertySymbols(source);
		for (let j = 0; j < symbols.length; j++) {
			const symbol = symbols[j];
			if (propertyIsEnumerable.call(source, symbol)) assignValue(source[symbol], symbol);
		}
	}
	return result;
}
/**
* If the thing is a FormData object, return true, otherwise return false.
*
* @param {unknown} thing - The thing to check.
*
* @returns {boolean}
*/
function isSpecCompliantForm(thing) {
	return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
var toString, getPrototypeOf, iterator, toStringTag, hasOwnProperty, hasOwnInPrototypeChain, getSafeProp, kindOf, kindOfTest, typeOfTest, isArray, isUndefined, isArrayBuffer, isString, isFunction$1, isNumber, isObject, isBoolean, isPlainObject, isEmptyObject, isDate, isFile, isReactNativeBlob, isReactNative, isBlob, isFileList, isStream, G, FormDataCtor, isFormData, isURLSearchParams, isReadableStream, isRequest, isResponse, isHeaders, trim, _global, isContextDefined, extend, stripBOM, inherits, toFlatObject, endsWith, toArray, isTypedArray, forEachEntry, matchAll, isHTMLForm, toCamelCase, propertyIsEnumerable, isRegExp, reduceDescriptors, freezeMethods, toObjectSet, noop, toFiniteNumber, toJSONObject, isAsyncFn, isThenable, _setImmediate, asap, isIterable, isSafeIterable, utils_default;
var init_utils$1 = __esmMin((() => {
	init_bind();
	({toString} = Object.prototype);
	({getPrototypeOf} = Object);
	({iterator, toStringTag} = Symbol);
	hasOwnProperty = (({ hasOwnProperty }) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);
	hasOwnInPrototypeChain = (thing, prop) => {
		let obj = thing;
		const seen = [];
		while (obj != null && obj !== Object.prototype) {
			if (seen.indexOf(obj) !== -1) return false;
			seen.push(obj);
			if (hasOwnProperty(obj, prop)) return true;
			obj = getPrototypeOf(obj);
		}
		return false;
	};
	getSafeProp = (obj, prop) => obj != null && hasOwnInPrototypeChain(obj, prop) ? obj[prop] : void 0;
	kindOf = ((cache) => (thing) => {
		const str = toString.call(thing);
		return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
	})(Object.create(null));
	kindOfTest = (type) => {
		type = type.toLowerCase();
		return (thing) => kindOf(thing) === type;
	};
	typeOfTest = (type) => (thing) => typeof thing === type;
	({isArray} = Array);
	isUndefined = typeOfTest("undefined");
	isArrayBuffer = kindOfTest("ArrayBuffer");
	isString = typeOfTest("string");
	isFunction$1 = typeOfTest("function");
	isNumber = typeOfTest("number");
	isObject = (thing) => thing !== null && typeof thing === "object";
	isBoolean = (thing) => thing === true || thing === false;
	isPlainObject = (val) => {
		if (!isObject(val)) return false;
		const prototype = getPrototypeOf(val);
		return (prototype === null || prototype === Object.prototype || getPrototypeOf(prototype) === null) && !hasOwnInPrototypeChain(val, toStringTag) && !hasOwnInPrototypeChain(val, iterator);
	};
	isEmptyObject = (val) => {
		if (!isObject(val) || isBuffer(val)) return false;
		try {
			return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
		} catch (e) {
			return false;
		}
	};
	isDate = kindOfTest("Date");
	isFile = kindOfTest("File");
	isReactNativeBlob = (value) => {
		return !!(value && typeof value.uri !== "undefined");
	};
	isReactNative = (formData) => formData && typeof formData.getParts !== "undefined";
	isBlob = kindOfTest("Blob");
	isFileList = kindOfTest("FileList");
	isStream = (val) => isObject(val) && isFunction$1(val.pipe);
	G = getGlobal();
	FormDataCtor = typeof G.FormData !== "undefined" ? G.FormData : void 0;
	isFormData = (thing) => {
		if (!thing) return false;
		if (FormDataCtor && thing instanceof FormDataCtor) return true;
		const proto = getPrototypeOf(thing);
		if (!proto || proto === Object.prototype) return false;
		if (!isFunction$1(thing.append)) return false;
		const kind = kindOf(thing);
		return kind === "formdata" || kind === "object" && isFunction$1(thing.toString) && thing.toString() === "[object FormData]";
	};
	isURLSearchParams = kindOfTest("URLSearchParams");
	[isReadableStream, isRequest, isResponse, isHeaders] = [
		"ReadableStream",
		"Request",
		"Response",
		"Headers"
	].map(kindOfTest);
	trim = (str) => {
		return str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
	};
	_global = (() => {
		if (typeof globalThis !== "undefined") return globalThis;
		return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
	})();
	isContextDefined = (context) => !isUndefined(context) && context !== _global;
	extend = (a, b, thisArg, { allOwnKeys } = {}) => {
		forEach(b, (val, key) => {
			if (thisArg && isFunction$1(val)) Object.defineProperty(a, key, {
				__proto__: null,
				value: bind(val, thisArg),
				writable: true,
				enumerable: true,
				configurable: true
			});
			else Object.defineProperty(a, key, {
				__proto__: null,
				value: val,
				writable: true,
				enumerable: true,
				configurable: true
			});
		}, { allOwnKeys });
		return a;
	};
	stripBOM = (content) => {
		if (content.charCodeAt(0) === 65279) content = content.slice(1);
		return content;
	};
	inherits = (constructor, superConstructor, props, descriptors) => {
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
	toFlatObject = (sourceObj, destObj, filter, propFilter) => {
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
			sourceObj = filter !== false && getPrototypeOf(sourceObj);
		} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
		return destObj;
	};
	endsWith = (str, searchString, position) => {
		str = String(str);
		if (position === void 0 || position > str.length) position = str.length;
		position -= searchString.length;
		const lastIndex = str.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};
	toArray = (thing) => {
		if (!thing) return null;
		if (isArray(thing)) return thing;
		let i = thing.length;
		if (!isNumber(i)) return null;
		const arr = new Array(i);
		while (i-- > 0) arr[i] = thing[i];
		return arr;
	};
	isTypedArray = ((TypedArray) => {
		return (thing) => {
			return TypedArray && thing instanceof TypedArray;
		};
	})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
	forEachEntry = (obj, fn) => {
		const _iterator = (obj && obj[iterator]).call(obj);
		let result;
		while ((result = _iterator.next()) && !result.done) {
			const pair = result.value;
			fn.call(obj, pair[0], pair[1]);
		}
	};
	matchAll = (regExp, str) => {
		let matches;
		const arr = [];
		while ((matches = regExp.exec(str)) !== null) arr.push(matches);
		return arr;
	};
	isHTMLForm = kindOfTest("HTMLFormElement");
	toCamelCase = (str) => {
		return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function replacer(m, p1, p2) {
			return p1.toUpperCase() + p2;
		});
	};
	({propertyIsEnumerable} = Object.prototype);
	isRegExp = kindOfTest("RegExp");
	reduceDescriptors = (obj, reducer) => {
		const descriptors = Object.getOwnPropertyDescriptors(obj);
		const reducedDescriptors = {};
		forEach(descriptors, (descriptor, name) => {
			let ret;
			if ((ret = reducer(descriptor, name, obj)) !== false) reducedDescriptors[name] = ret || descriptor;
		});
		Object.defineProperties(obj, reducedDescriptors);
	};
	freezeMethods = (obj) => {
		reduceDescriptors(obj, (descriptor, name) => {
			if (isFunction$1(obj) && [
				"arguments",
				"caller",
				"callee"
			].includes(name)) return false;
			const value = obj[name];
			if (!isFunction$1(value)) return;
			descriptor.enumerable = false;
			if ("writable" in descriptor) {
				descriptor.writable = false;
				return;
			}
			if (!descriptor.set) descriptor.set = () => {
				throw Error("Can not rewrite read-only method '" + name + "'");
			};
		});
	};
	toObjectSet = (arrayOrString, delimiter) => {
		const obj = {};
		const define = (arr) => {
			arr.forEach((value) => {
				obj[value] = true;
			});
		};
		isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
		return obj;
	};
	noop = () => {};
	toFiniteNumber = (value, defaultValue) => {
		return value != null && Number.isFinite(value = +value) ? value : defaultValue;
	};
	toJSONObject = (obj) => {
		const visited = /* @__PURE__ */ new WeakSet();
		const visit = (source) => {
			if (isObject(source)) {
				if (visited.has(source)) return;
				if (isBuffer(source)) return source;
				if (!("toJSON" in source)) {
					visited.add(source);
					const target = isArray(source) ? [] : {};
					forEach(source, (value, key) => {
						const reducedValue = visit(value);
						!isUndefined(reducedValue) && (target[key] = reducedValue);
					});
					visited.delete(source);
					return target;
				}
			}
			return source;
		};
		return visit(obj);
	};
	isAsyncFn = kindOfTest("AsyncFunction");
	isThenable = (thing) => thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);
	_setImmediate = ((setImmediateSupported, postMessageSupported) => {
		if (setImmediateSupported) return setImmediate;
		return postMessageSupported ? ((token, callbacks) => {
			_global.addEventListener("message", ({ source, data }) => {
				if (source === _global && data === token) callbacks.length && callbacks.shift()();
			}, false);
			return (cb) => {
				callbacks.push(cb);
				_global.postMessage(token, "*");
			};
		})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
	})(typeof setImmediate === "function", isFunction$1(_global.postMessage));
	asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
	isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);
	isSafeIterable = (thing) => thing != null && hasOwnInPrototypeChain(thing, iterator) && isIterable(thing);
	utils_default = {
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
		hasOwnInPrototypeChain,
		getSafeProp,
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
		isIterable,
		isSafeIterable
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseHeaders.js
var ignoreDuplicateOf, parseHeaders_default;
var init_parseHeaders = __esmMin((() => {
	init_utils$1();
	ignoreDuplicateOf = utils_default.toObjectSet([
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
	parseHeaders_default = (rawHeaders) => {
		const parsed = {};
		let key;
		let val;
		let i;
		rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
			i = line.indexOf(":");
			key = line.substring(0, i).trim().toLowerCase();
			val = line.substring(i + 1).trim();
			if (!key || parsed[key] && ignoreDuplicateOf[key]) return;
			if (key === "set-cookie") if (parsed[key]) parsed[key].push(val);
			else parsed[key] = [val];
			else parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
		});
		return parsed;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/sanitizeHeaderValue.js
function trimSPorHTAB(str) {
	let start = 0;
	let end = str.length;
	while (start < end) {
		const code = str.charCodeAt(start);
		if (code !== 9 && code !== 32) break;
		start += 1;
	}
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 9 && code !== 32) break;
		end -= 1;
	}
	return start === 0 && end === str.length ? str : str.slice(start, end);
}
function sanitizeValue(value, invalidChars) {
	if (utils_default.isArray(value)) return value.map((item) => sanitizeValue(item, invalidChars));
	return trimSPorHTAB(String(value).replace(invalidChars, ""));
}
function toByteStringHeaderObject(headers) {
	const byteStringHeaders = Object.create(null);
	utils_default.forEach(headers.toJSON(), (value, header) => {
		byteStringHeaders[header] = sanitizeByteStringHeaderValue(value);
	});
	return byteStringHeaders;
}
var INVALID_UNICODE_HEADER_VALUE_CHARS, INVALID_BYTE_STRING_HEADER_VALUE_CHARS, sanitizeHeaderValue, sanitizeByteStringHeaderValue;
var init_sanitizeHeaderValue = __esmMin((() => {
	init_utils$1();
	INVALID_UNICODE_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[\\u0000-\\u0008\\u000a-\\u001f\\u007f]+", "g");
	INVALID_BYTE_STRING_HEADER_VALUE_CHARS = /* @__PURE__ */ new RegExp("[^\\u0009\\u0020-\\u007e\\u0080-\\u00ff]+", "g");
	sanitizeHeaderValue = (value) => sanitizeValue(value, INVALID_UNICODE_HEADER_VALUE_CHARS);
	sanitizeByteStringHeaderValue = (value) => sanitizeValue(value, INVALID_BYTE_STRING_HEADER_VALUE_CHARS);
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosHeaders.js
function normalizeHeader(header) {
	return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
	if (value === false || value == null) return value;
	return utils_default.isArray(value) ? value.map(normalizeValue) : sanitizeHeaderValue(String(value));
}
function parseTokens(str) {
	const tokens = Object.create(null);
	const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
	let match;
	while (match = tokensRE.exec(str)) tokens[match[1]] = match[2];
	return tokens;
}
function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
	if (utils_default.isFunction(filter)) return filter.call(this, value, header);
	if (isHeaderNameFilter) value = header;
	if (!utils_default.isString(value)) return;
	if (utils_default.isString(filter)) return value.indexOf(filter) !== -1;
	if (utils_default.isRegExp(filter)) return filter.test(value);
}
function formatHeader(header) {
	return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
		return char.toUpperCase() + str;
	});
}
function buildAccessors(obj, header) {
	const accessorName = utils_default.toCamelCase(" " + header);
	[
		"get",
		"set",
		"has"
	].forEach((methodName) => {
		Object.defineProperty(obj, methodName + accessorName, {
			__proto__: null,
			value: function(arg1, arg2, arg3) {
				return this[methodName].call(this, header, arg1, arg2, arg3);
			},
			configurable: true
		});
	});
}
var $internals, isValidHeaderName, AxiosHeaders$1;
var init_AxiosHeaders = __esmMin((() => {
	init_utils$1();
	init_parseHeaders();
	init_sanitizeHeaderValue();
	$internals = Symbol("internals");
	isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
	AxiosHeaders$1 = class {
		constructor(headers) {
			headers && this.set(headers);
		}
		set(header, valueOrRewrite, rewrite) {
			const self = this;
			function setHeader(_value, _header, _rewrite) {
				const lHeader = normalizeHeader(_header);
				if (!lHeader) return;
				const key = utils_default.findKey(self, lHeader);
				if (!key || self[key] === void 0 || _rewrite === true || _rewrite === void 0 && self[key] !== false) self[key || _header] = normalizeValue(_value);
			}
			const setHeaders = (headers, _rewrite) => utils_default.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
			if (utils_default.isPlainObject(header) || header instanceof this.constructor) setHeaders(header, valueOrRewrite);
			else if (utils_default.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) setHeaders(parseHeaders_default(header), valueOrRewrite);
			else if (utils_default.isObject(header) && utils_default.isSafeIterable(header)) {
				let obj = Object.create(null), dest, key;
				for (const entry of header) {
					if (!utils_default.isArray(entry)) throw new TypeError("Object iterator must return a key-value pair");
					key = entry[0];
					if (utils_default.hasOwnProp(obj, key)) {
						dest = obj[key];
						obj[key] = utils_default.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]];
					} else obj[key] = entry[1];
				}
				setHeaders(obj, valueOrRewrite);
			} else header != null && setHeader(valueOrRewrite, header, rewrite);
			return this;
		}
		get(header, parser) {
			header = normalizeHeader(header);
			if (header) {
				const key = utils_default.findKey(this, header);
				if (key) {
					const value = this[key];
					if (!parser) return value;
					if (parser === true) return parseTokens(value);
					if (utils_default.isFunction(parser)) return parser.call(this, value, key);
					if (utils_default.isRegExp(parser)) return parser.exec(value);
					throw new TypeError("parser must be boolean|regexp|function");
				}
			}
		}
		has(header, matcher) {
			header = normalizeHeader(header);
			if (header) {
				const key = utils_default.findKey(this, header);
				return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
			}
			return false;
		}
		delete(header, matcher) {
			const self = this;
			let deleted = false;
			function deleteHeader(_header) {
				_header = normalizeHeader(_header);
				if (_header) {
					const key = utils_default.findKey(self, _header);
					if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
						delete self[key];
						deleted = true;
					}
				}
			}
			if (utils_default.isArray(header)) header.forEach(deleteHeader);
			else deleteHeader(header);
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
			const self = this;
			const headers = {};
			utils_default.forEach(this, (value, header) => {
				const key = utils_default.findKey(headers, header);
				if (key) {
					self[key] = normalizeValue(value);
					delete self[header];
					return;
				}
				const normalized = format ? formatHeader(header) : String(header).trim();
				if (normalized !== header) delete self[header];
				self[normalized] = normalizeValue(value);
				headers[normalized] = true;
			});
			return this;
		}
		concat(...targets) {
			return this.constructor.concat(this, ...targets);
		}
		toJSON(asStrings) {
			const obj = Object.create(null);
			utils_default.forEach(this, (value, header) => {
				value != null && value !== false && (obj[header] = asStrings && utils_default.isArray(value) ? value.join(", ") : value);
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
			const accessors = (this[$internals] = this[$internals] = { accessors: {} }).accessors;
			const prototype = this.prototype;
			function defineAccessor(_header) {
				const lHeader = normalizeHeader(_header);
				if (!accessors[lHeader]) {
					buildAccessors(prototype, _header);
					accessors[lHeader] = true;
				}
			}
			utils_default.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
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
	utils_default.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
		let mapped = key[0].toUpperCase() + key.slice(1);
		return {
			get: () => value,
			set(headerValue) {
				this[mapped] = headerValue;
			}
		};
	});
	utils_default.freezeMethods(AxiosHeaders$1);
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/AxiosError.js
function hasOwnOrPrototypeToJSON(source) {
	if (utils_default.hasOwnProp(source, "toJSON")) return true;
	let prototype = Object.getPrototypeOf(source);
	while (prototype && prototype !== Object.prototype) {
		if (utils_default.hasOwnProp(prototype, "toJSON")) return true;
		prototype = Object.getPrototypeOf(prototype);
	}
	return false;
}
function redactConfig(config, redactKeys) {
	const lowerKeys = new Set(redactKeys.map((k) => String(k).toLowerCase()));
	const seen = [];
	const visit = (source) => {
		if (source === null || typeof source !== "object") return source;
		if (utils_default.isBuffer(source)) return source;
		if (seen.indexOf(source) !== -1) return void 0;
		if (source instanceof AxiosHeaders$1) source = source.toJSON();
		seen.push(source);
		let result;
		if (utils_default.isArray(source)) {
			result = [];
			source.forEach((v, i) => {
				const reducedValue = visit(v);
				if (!utils_default.isUndefined(reducedValue)) result[i] = reducedValue;
			});
		} else {
			if (!utils_default.isPlainObject(source) && hasOwnOrPrototypeToJSON(source)) {
				seen.pop();
				return source;
			}
			result = Object.create(null);
			for (const [key, value] of Object.entries(source)) {
				const reducedValue = lowerKeys.has(key.toLowerCase()) ? REDACTED : visit(value);
				if (!utils_default.isUndefined(reducedValue)) result[key] = reducedValue;
			}
		}
		seen.pop();
		return result;
	};
	return visit(config);
}
var REDACTED, AxiosError$1;
var init_AxiosError = __esmMin((() => {
	init_utils$1();
	init_AxiosHeaders();
	REDACTED = "[REDACTED ****]";
	AxiosError$1 = class AxiosError$1 extends Error {
		static from(error, code, config, request, response, customProps) {
			const axiosError = new AxiosError$1(error.message, code || error.code, config, request, response);
			Object.defineProperty(axiosError, "cause", {
				__proto__: null,
				value: error,
				writable: true,
				enumerable: false,
				configurable: true
			});
			axiosError.name = error.name;
			if (error.status != null && axiosError.status == null) axiosError.status = error.status;
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
			const redactKeys = config && utils_default.hasOwnProp(config, "redact") ? config.redact : void 0;
			const serializedConfig = utils_default.isArray(redactKeys) && redactKeys.length > 0 ? redactConfig(config, redactKeys) : utils_default.toJSONObject(config);
			return {
				message: this.message,
				name: this.name,
				description: this.description,
				number: this.number,
				fileName: this.fileName,
				lineNumber: this.lineNumber,
				columnNumber: this.columnNumber,
				stack: this.stack,
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
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/null.js
var init_null = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toFormData.js
/**
* Determines if the given thing is a array or js object.
*
* @param {string} thing - The object or array to be visited.
*
* @returns {boolean}
*/
function isVisitable(thing) {
	return utils_default.isPlainObject(thing) || utils_default.isArray(thing);
}
/**
* It removes the brackets from the end of a string
*
* @param {string} key - The key of the parameter.
*
* @returns {string} the key without the brackets.
*/
function removeBrackets(key) {
	return utils_default.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
/**
* It takes a path, a key, and a boolean, and returns a string
*
* @param {string} path - The path to the current key.
* @param {string} key - The key of the current object being iterated over.
* @param {string} dots - If true, the key will be rendered with dots instead of brackets.
*
* @returns {string} The path to the current key.
*/
function renderKey(path, key, dots) {
	if (!path) return key;
	return path.concat(key).map(function each(token, i) {
		token = removeBrackets(token);
		return !dots && i ? "[" + token + "]" : token;
	}).join(dots ? "." : "");
}
/**
* If the array is an array and none of its elements are visitable, then it's a flat array.
*
* @param {Array<any>} arr - The array to check
*
* @returns {boolean}
*/
function isFlatArray(arr) {
	return utils_default.isArray(arr) && !arr.some(isVisitable);
}
/**
* Convert a data object to FormData
*
* @param {Object} obj
* @param {?Object} [formData]
* @param {?Object} [options]
* @param {Function} [options.visitor]
* @param {Boolean} [options.metaTokens = true]
* @param {Boolean} [options.dots = false]
* @param {?Boolean} [options.indexes = false]
*
* @returns {Object}
**/
/**
* It converts an object into a FormData object
*
* @param {Object<any, any>} obj - The object to convert to form data.
* @param {string} formData - The FormData object to append to.
* @param {Object<string, any>} options
*
* @returns
*/
function toFormData$1(obj, formData, options) {
	if (!utils_default.isObject(obj)) throw new TypeError("target must be an object");
	formData = formData || new FormData();
	options = utils_default.toFlatObject(options, {
		metaTokens: true,
		dots: false,
		indexes: false
	}, false, function defined(option, source) {
		return !utils_default.isUndefined(source[option]);
	});
	const metaTokens = options.metaTokens;
	const visitor = options.visitor || defaultVisitor;
	const dots = options.dots;
	const indexes = options.indexes;
	const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
	const maxDepth = options.maxDepth === void 0 ? 100 : options.maxDepth;
	const useBlob = _Blob && utils_default.isSpecCompliantForm(formData);
	const stack = [];
	if (!utils_default.isFunction(visitor)) throw new TypeError("visitor must be a function");
	function convertValue(value) {
		if (value === null) return "";
		if (utils_default.isDate(value)) return value.toISOString();
		if (utils_default.isBoolean(value)) return value.toString();
		if (!useBlob && utils_default.isBlob(value)) throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
		if (utils_default.isArrayBuffer(value) || utils_default.isTypedArray(value)) {
			if (useBlob && typeof _Blob === "function") return new _Blob([value]);
			if (typeof Buffer !== "undefined") return Buffer.from(value);
			throw new AxiosError$1("Blob is not supported. Use a Buffer instead.", AxiosError$1.ERR_NOT_SUPPORT);
		}
		return value;
	}
	function throwIfMaxDepthExceeded(depth) {
		if (depth > maxDepth) throw new AxiosError$1("Object is too deeply nested (" + depth + " levels). Max depth: " + maxDepth, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
	}
	function stringifyWithDepthLimit(value, depth) {
		if (maxDepth === Infinity) return JSON.stringify(value);
		const ancestors = [];
		return JSON.stringify(value, function limitDepth(_key, currentValue) {
			if (!utils_default.isObject(currentValue)) return currentValue;
			while (ancestors.length && ancestors[ancestors.length - 1] !== this) ancestors.pop();
			ancestors.push(currentValue);
			throwIfMaxDepthExceeded(depth + ancestors.length - 1);
			return currentValue;
		});
	}
	/**
	* Default visitor.
	*
	* @param {*} value
	* @param {String|Number} key
	* @param {Array<String|Number>} path
	* @this {FormData}
	*
	* @returns {boolean} return true to visit the each prop of the value recursively
	*/
	function defaultVisitor(value, key, path) {
		let arr = value;
		if (utils_default.isReactNative(formData) && utils_default.isReactNativeBlob(value)) {
			formData.append(renderKey(path, key, dots), convertValue(value));
			return false;
		}
		if (value && !path && typeof value === "object") {
			if (utils_default.endsWith(key, "{}")) {
				key = metaTokens ? key : key.slice(0, -2);
				value = stringifyWithDepthLimit(value, 1);
			} else if (utils_default.isArray(value) && isFlatArray(value) || (utils_default.isFileList(value) || utils_default.endsWith(key, "[]")) && (arr = utils_default.toArray(value))) {
				key = removeBrackets(key);
				arr.forEach(function each(el, index) {
					!(utils_default.isUndefined(el) || el === null) && formData.append(indexes === true ? renderKey([key], index, dots) : indexes === null ? key : key + "[]", convertValue(el));
				});
				return false;
			}
		}
		if (isVisitable(value)) return true;
		formData.append(renderKey(path, key, dots), convertValue(value));
		return false;
	}
	const exposedHelpers = Object.assign(predicates, {
		defaultVisitor,
		convertValue,
		isVisitable
	});
	function build(value, path, depth = 0) {
		if (utils_default.isUndefined(value)) return;
		throwIfMaxDepthExceeded(depth);
		if (stack.indexOf(value) !== -1) throw new Error("Circular reference detected in " + path.join("."));
		stack.push(value);
		utils_default.forEach(value, function each(el, key) {
			if ((!(utils_default.isUndefined(el) || el === null) && visitor.call(formData, el, utils_default.isString(key) ? key.trim() : key, path, exposedHelpers)) === true) build(el, path ? path.concat(key) : [key], depth + 1);
		});
		stack.pop();
	}
	if (!utils_default.isObject(obj)) throw new TypeError("data must be an object");
	build(obj);
	return formData;
}
var predicates;
var init_toFormData = __esmMin((() => {
	init_utils$1();
	init_AxiosError();
	init_null();
	predicates = utils_default.toFlatObject(utils_default, {}, null, function filter(prop) {
		return /^is[A-Z]/.test(prop);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/AxiosURLSearchParams.js
/**
* It encodes a string by replacing all characters that are not in the unreserved set with
* their percent-encoded equivalents
*
* @param {string} str - The string to encode.
*
* @returns {string} The encoded string.
*/
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
/**
* It takes a params object and converts it to a FormData object
*
* @param {Object<string, any>} params - The parameters to be converted to a FormData object.
* @param {Object<string, any>} options - The options object passed to the Axios constructor.
*
* @returns {void}
*/
function AxiosURLSearchParams(params, options) {
	this._pairs = [];
	params && toFormData$1(params, this, options);
}
var prototype;
var init_AxiosURLSearchParams = __esmMin((() => {
	init_toFormData();
	prototype = AxiosURLSearchParams.prototype;
	prototype.append = function append(name, value) {
		this._pairs.push([name, value]);
	};
	prototype.toString = function toString(encoder) {
		const _encode = encoder ? (value) => encoder.call(this, value, encode$1) : encode$1;
		return this._pairs.map(function each(pair) {
			return _encode(pair[0]) + "=" + _encode(pair[1]);
		}, "").join("&");
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/buildURL.js
/**
* It replaces URL-encoded forms of `:`, `$`, `,`, and spaces with
* their plain counterparts (`:`, `$`, `,`, `+`).
*
* @param {string} val The value to be encoded.
*
* @returns {string} The encoded value.
*/
function encode(val) {
	return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
/**
* Build a URL by appending params to the end
*
* @param {string} url The base of the url (e.g., http://www.google.com)
* @param {object} [params] The params to be appended
* @param {?(object|Function)} options
*
* @returns {string} The formatted url
*/
function buildURL(url, params, options) {
	if (!params) return url;
	url = url || "";
	const _options = utils_default.isFunction(options) ? { serialize: options } : options;
	const _encode = utils_default.getSafeProp(_options, "encode") || encode;
	const serializeFn = utils_default.getSafeProp(_options, "serialize");
	let serializedParams;
	if (serializeFn) serializedParams = serializeFn(params, _options);
	else serializedParams = utils_default.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, _options).toString(_encode);
	if (serializedParams) {
		const hashmarkIndex = url.indexOf("#");
		if (hashmarkIndex !== -1) url = url.slice(0, hashmarkIndex);
		url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
	}
	return url;
}
var init_buildURL = __esmMin((() => {
	init_utils$1();
	init_AxiosURLSearchParams();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/InterceptorManager.js
var InterceptorManager;
var init_InterceptorManager = __esmMin((() => {
	init_utils$1();
	InterceptorManager = class {
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
			if (this.handlers[id]) this.handlers[id] = null;
		}
		/**
		* Clear all interceptors from the stack
		*
		* @returns {void}
		*/
		clear() {
			if (this.handlers) this.handlers = [];
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
			utils_default.forEach(this.handlers, function forEachHandler(h) {
				if (h !== null) fn(h);
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/transitional.js
var transitional_default;
var init_transitional = __esmMin((() => {
	transitional_default = {
		silentJSONParsing: true,
		forcedJSONParsing: true,
		clarifyTimeoutError: false,
		legacyInterceptorReqResOrdering: true,
		advertiseZstdAcceptEncoding: false,
		validateStatusUndefinedResolves: true
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/URLSearchParams.js
var URLSearchParams_default;
var init_URLSearchParams = __esmMin((() => {
	init_AxiosURLSearchParams();
	URLSearchParams_default = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/FormData.js
var FormData_default;
var init_FormData = __esmMin((() => {
	FormData_default = typeof FormData !== "undefined" ? FormData : null;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/classes/Blob.js
var Blob_default;
var init_Blob = __esmMin((() => {
	Blob_default = typeof Blob !== "undefined" ? Blob : null;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/browser/index.js
var browser_default;
var init_browser = __esmMin((() => {
	init_URLSearchParams();
	init_FormData();
	init_Blob();
	browser_default = {
		isBrowser: true,
		classes: {
			URLSearchParams: URLSearchParams_default,
			FormData: FormData_default,
			Blob: Blob_default
		},
		protocols: [
			"http",
			"https",
			"file",
			"blob",
			"url",
			"data"
		]
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/common/utils.js
var utils_exports = /* @__PURE__ */ __exportAll({
	hasBrowserEnv: () => hasBrowserEnv,
	hasStandardBrowserEnv: () => hasStandardBrowserEnv,
	hasStandardBrowserWebWorkerEnv: () => hasStandardBrowserWebWorkerEnv,
	navigator: () => _navigator,
	origin: () => origin
});
var hasBrowserEnv, _navigator, hasStandardBrowserEnv, hasStandardBrowserWebWorkerEnv, origin;
var init_utils = __esmMin((() => {
	hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
	_navigator = typeof navigator === "object" && navigator || void 0;
	hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || [
		"ReactNative",
		"NativeScript",
		"NS"
	].indexOf(_navigator.product) < 0);
	hasStandardBrowserWebWorkerEnv = (() => {
		return typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
	})();
	origin = hasBrowserEnv && window.location.href || "http://localhost";
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/platform/index.js
var platform_default;
var init_platform = __esmMin((() => {
	init_browser();
	init_utils();
	platform_default = {
		...utils_exports,
		...browser_default
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/toURLEncodedForm.js
function toURLEncodedForm(data, options) {
	return toFormData$1(data, new platform_default.classes.URLSearchParams(), {
		visitor: function(value, key, path, helpers) {
			if (platform_default.isNode && utils_default.isBuffer(value)) {
				this.append(key, value.toString("base64"));
				return false;
			}
			return helpers.defaultVisitor.apply(this, arguments);
		},
		...options
	});
}
var init_toURLEncodedForm = __esmMin((() => {
	init_utils$1();
	init_toFormData();
	init_platform();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/formDataToJSON.js
function throwIfDepthExceeded(index) {
	if (index > MAX_DEPTH) throw new AxiosError$1("FormData field is too deeply nested (" + index + " levels). Max depth: " + MAX_DEPTH, AxiosError$1.ERR_FORM_DATA_DEPTH_EXCEEDED);
}
/**
* It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
*
* @param {string} name - The name of the property to get.
*
* @returns An array of strings.
*/
function parsePropPath(name) {
	const path = [];
	const pattern = /\w+|\[(\w*)]/g;
	let match;
	while ((match = pattern.exec(name)) !== null) {
		throwIfDepthExceeded(path.length);
		path.push(match[0] === "[]" ? "" : match[1] || match[0]);
	}
	return path;
}
/**
* Convert an array to an object.
*
* @param {Array<any>} arr - The array to convert to an object.
*
* @returns An object with the same keys and values as the array.
*/
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
/**
* It takes a FormData object and returns a JavaScript object
*
* @param {string} formData The FormData object to convert to JSON.
*
* @returns {Object<string, any> | null} The converted object.
*/
function formDataToJSON(formData) {
	function buildPath(path, value, target, index) {
		throwIfDepthExceeded(index);
		let name = path[index++];
		if (name === "__proto__") return true;
		const isNumericKey = Number.isFinite(+name);
		const isLast = index >= path.length;
		name = !name && utils_default.isArray(target) ? target.length : name;
		if (isLast) {
			if (utils_default.hasOwnProp(target, name)) target[name] = utils_default.isArray(target[name]) ? target[name].concat(value) : [target[name], value];
			else target[name] = value;
			return !isNumericKey;
		}
		if (!utils_default.hasOwnProp(target, name) || !utils_default.isObject(target[name])) target[name] = [];
		if (buildPath(path, value, target[name], index) && utils_default.isArray(target[name])) target[name] = arrayToObject(target[name]);
		return !isNumericKey;
	}
	if (utils_default.isFormData(formData) && utils_default.isFunction(formData.entries)) {
		const obj = {};
		utils_default.forEachEntry(formData, (name, value) => {
			buildPath(parsePropPath(name), value, obj, 0);
		});
		return obj;
	}
	return null;
}
var MAX_DEPTH;
var init_formDataToJSON = __esmMin((() => {
	init_utils$1();
	init_AxiosError();
	init_toFormData();
	MAX_DEPTH = 100;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/defaults/index.js
/**
* It takes a string, tries to parse it, and if it fails, it returns the stringified version
* of the input
*
* @param {any} rawValue - The value to be stringified.
* @param {Function} parser - A function that parses a string into a JavaScript object.
* @param {Function} encoder - A function that takes a value and returns a string.
*
* @returns {string} A stringified version of the rawValue.
*/
function stringifySafely(rawValue, parser, encoder) {
	if (utils_default.isString(rawValue)) try {
		(parser || JSON.parse)(rawValue);
		return utils_default.trim(rawValue);
	} catch (e) {
		if (e.name !== "SyntaxError") throw e;
	}
	return (encoder || JSON.stringify)(rawValue);
}
var own, defaults;
var init_defaults = __esmMin((() => {
	init_utils$1();
	init_AxiosError();
	init_transitional();
	init_toFormData();
	init_toURLEncodedForm();
	init_platform();
	init_formDataToJSON();
	own = (obj, key) => obj != null && utils_default.hasOwnProp(obj, key) ? obj[key] : void 0;
	defaults = {
		transitional: transitional_default,
		adapter: [
			"xhr",
			"http",
			"fetch"
		],
		transformRequest: [function transformRequest(data, headers) {
			const contentType = headers.getContentType() || "";
			const hasJSONContentType = contentType.indexOf("application/json") > -1;
			const isObjectPayload = utils_default.isObject(data);
			if (isObjectPayload && utils_default.isHTMLForm(data)) data = new FormData(data);
			if (utils_default.isFormData(data)) return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
			if (utils_default.isArrayBuffer(data) || utils_default.isBuffer(data) || utils_default.isStream(data) || utils_default.isFile(data) || utils_default.isBlob(data) || utils_default.isReadableStream(data)) return data;
			if (utils_default.isArrayBufferView(data)) return data.buffer;
			if (utils_default.isURLSearchParams(data)) {
				headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
				return data.toString();
			}
			let isFileList;
			if (isObjectPayload) {
				const formSerializer = own(this, "formSerializer");
				if (contentType.indexOf("application/x-www-form-urlencoded") > -1) return toURLEncodedForm(data, formSerializer).toString();
				if ((isFileList = utils_default.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
					const env = own(this, "env");
					const _FormData = env && env.FormData;
					return toFormData$1(isFileList ? { "files[]": data } : data, _FormData && new _FormData(), formSerializer);
				}
			}
			if (isObjectPayload || hasJSONContentType) {
				headers.setContentType("application/json", false);
				return stringifySafely(data);
			}
			return data;
		}],
		transformResponse: [function transformResponse(data) {
			const transitional = own(this, "transitional") || defaults.transitional;
			const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
			const responseType = own(this, "responseType");
			const JSONRequested = responseType === "json";
			if (utils_default.isResponse(data) || utils_default.isReadableStream(data)) return data;
			if (data && utils_default.isString(data) && (forcedJSONParsing && !responseType || JSONRequested)) {
				const strictJSONParsing = !(transitional && transitional.silentJSONParsing) && JSONRequested;
				try {
					return JSON.parse(data, own(this, "parseReviver"));
				} catch (e) {
					if (strictJSONParsing) {
						if (e.name === "SyntaxError") throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, own(this, "response"));
						throw e;
					}
				}
			}
			return data;
		}],
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
			FormData: platform_default.classes.FormData,
			Blob: platform_default.classes.Blob
		},
		validateStatus: function validateStatus(status) {
			return status >= 200 && status < 300;
		},
		headers: { common: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": void 0
		} }
	};
	utils_default.forEach([
		"delete",
		"get",
		"head",
		"post",
		"put",
		"patch",
		"query"
	], (method) => {
		defaults.headers[method] = {};
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/transformData.js
/**
* Transform the data for a request or a response
*
* @param {Array|Function} fns A single function or Array of functions
* @param {?Object} response The response object
*
* @returns {*} The resulting transformed data
*/
function transformData(fns, response) {
	const config = this || defaults;
	const context = response || config;
	const headers = AxiosHeaders$1.from(context.headers);
	let data = context.data;
	utils_default.forEach(fns, function transform(fn) {
		data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
	});
	headers.normalize();
	return data;
}
var init_transformData = __esmMin((() => {
	init_utils$1();
	init_defaults();
	init_AxiosHeaders();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/isCancel.js
function isCancel$1(value) {
	return !!(value && value.__CANCEL__);
}
var init_isCancel = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CanceledError.js
var CanceledError$1;
var init_CanceledError = __esmMin((() => {
	init_AxiosError();
	CanceledError$1 = class extends AxiosError$1 {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/settle.js
/**
* Resolve or reject a Promise based on response status.
*
* @param {Function} resolve A function that resolves the promise.
* @param {Function} reject A function that rejects the promise.
* @param {object} response The response.
*
* @returns {object} The response.
*/
function settle(resolve, reject, response) {
	const validateStatus = response.config.validateStatus;
	if (!response.status || !validateStatus || validateStatus(response.status)) resolve(response);
	else reject(new AxiosError$1("Request failed with status code " + response.status, response.status >= 400 && response.status < 500 ? AxiosError$1.ERR_BAD_REQUEST : AxiosError$1.ERR_BAD_RESPONSE, response.config, response.request, response));
}
var init_settle = __esmMin((() => {
	init_AxiosError();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/parseProtocol.js
function parseProtocol(url) {
	const match = /^([-+\w]{1,25}):(?:\/\/)?/.exec(url);
	return match && match[1] || "";
}
var init_parseProtocol = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/speedometer.js
/**
* Calculate data maxRate
* @param {Number} [samplesCount= 10]
* @param {Number} [min= 1000]
* @returns {Function}
*/
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
		if (!firstSampleTS) firstSampleTS = now;
		bytes[head] = chunkLength;
		timestamps[head] = now;
		let i = tail;
		let bytesCount = 0;
		while (i !== head) {
			bytesCount += bytes[i++];
			i = i % samplesCount;
		}
		head = (head + 1) % samplesCount;
		if (head === tail) tail = (tail + 1) % samplesCount;
		if (now - firstSampleTS < min) return;
		const passed = startedAt && now - startedAt;
		return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
	};
}
var init_speedometer = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/throttle.js
/**
* Throttle decorator
* @param {Function} fn
* @param {Number} freq
* @return {Function}
*/
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
		if (passed >= threshold) invoke(args, now);
		else {
			lastArgs = args;
			if (!timer) timer = setTimeout(() => {
				timer = null;
				invoke(lastArgs);
			}, threshold - passed);
		}
	};
	const flush = () => lastArgs && invoke(lastArgs);
	return [throttled, flush];
}
var init_throttle = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/progressEventReducer.js
var progressEventReducer, progressEventDecorator, asyncDecorator;
var init_progressEventReducer = __esmMin((() => {
	init_speedometer();
	init_throttle();
	init_utils$1();
	progressEventReducer = (listener, isDownloadStream, freq = 3) => {
		let bytesNotified = 0;
		const _speedometer = speedometer(50, 250);
		return throttle((e) => {
			if (!e || typeof e.loaded !== "number") return;
			const rawLoaded = e.loaded;
			const total = e.lengthComputable ? e.total : void 0;
			const loaded = total != null ? Math.min(rawLoaded, total) : rawLoaded;
			const progressBytes = Math.max(0, loaded - bytesNotified);
			const rate = _speedometer(progressBytes);
			bytesNotified = Math.max(bytesNotified, loaded);
			listener({
				loaded,
				total,
				progress: total ? loaded / total : void 0,
				bytes: progressBytes,
				rate: rate ? rate : void 0,
				estimated: rate && total ? (total - loaded) / rate : void 0,
				event: e,
				lengthComputable: total != null,
				[isDownloadStream ? "download" : "upload"]: true
			});
		}, freq);
	};
	progressEventDecorator = (total, throttled) => {
		const lengthComputable = total != null;
		return [(loaded) => throttled[0]({
			lengthComputable,
			total,
			loaded
		}), throttled[1]];
	};
	asyncDecorator = (fn) => (...args) => utils_default.asap(() => fn(...args));
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isURLSameOrigin.js
var isURLSameOrigin_default;
var init_isURLSameOrigin = __esmMin((() => {
	init_platform();
	isURLSameOrigin_default = platform_default.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
		url = new URL(url, platform_default.origin);
		return origin.protocol === url.protocol && origin.host === url.host && (isMSIE || origin.port === url.port);
	})(new URL(platform_default.origin), platform_default.navigator && /(msie|trident)/i.test(platform_default.navigator.userAgent)) : () => true;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/cookies.js
var cookies_default;
var init_cookies = __esmMin((() => {
	init_utils$1();
	init_platform();
	cookies_default = platform_default.hasStandardBrowserEnv ? {
		write(name, value, expires, path, domain, secure, sameSite) {
			if (typeof document === "undefined") return;
			const cookie = [`${name}=${encodeURIComponent(value)}`];
			if (utils_default.isNumber(expires)) cookie.push(`expires=${new Date(expires).toUTCString()}`);
			if (utils_default.isString(path)) cookie.push(`path=${path}`);
			if (utils_default.isString(domain)) cookie.push(`domain=${domain}`);
			if (secure === true) cookie.push("secure");
			if (utils_default.isString(sameSite)) cookie.push(`SameSite=${sameSite}`);
			document.cookie = cookie.join("; ");
		},
		read(name) {
			if (typeof document === "undefined") return null;
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				const cookie = cookies[i].replace(/^\s+/, "");
				const eq = cookie.indexOf("=");
				if (eq !== -1 && cookie.slice(0, eq) === name) try {
					return decodeURIComponent(cookie.slice(eq + 1));
				} catch (e) {
					return cookie.slice(eq + 1);
				}
			}
			return null;
		},
		remove(name) {
			this.write(name, "", Date.now() - 864e5, "/");
		}
	} : {
		write() {},
		read() {
			return null;
		},
		remove() {}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAbsoluteURL.js
/**
* Determines whether the specified URL is absolute
*
* @param {string} url The URL to test
*
* @returns {boolean} True if the specified URL is absolute, otherwise false
*/
function isAbsoluteURL(url) {
	if (typeof url !== "string") return false;
	return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
var init_isAbsoluteURL = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/combineURLs.js
/**
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
*
* @returns {string} The combined URL
*/
function combineURLs(baseURL, relativeURL) {
	return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
var init_combineURLs = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/buildFullPath.js
function stripLeadingC0ControlOrSpace(url) {
	let i = 0;
	while (i < url.length && url.charCodeAt(i) <= 32) i++;
	return url.slice(i);
}
function normalizeURLForProtocolCheck(url) {
	return stripLeadingC0ControlOrSpace(url).replace(httpProtocolControlCharacters, "");
}
function assertValidHttpProtocolURL(url, config) {
	if (typeof url === "string" && malformedHttpProtocol.test(normalizeURLForProtocolCheck(url))) throw new AxiosError$1("Invalid URL: missing \"//\" after protocol", AxiosError$1.ERR_INVALID_URL, config);
}
/**
* Creates a new URL by combining the baseURL with the requestedURL,
* only when the requestedURL is not already an absolute URL.
* If the requestURL is absolute, this function returns the requestedURL untouched.
*
* @param {string} baseURL The base URL
* @param {string} requestedURL Absolute or relative URL to combine
*
* @returns {string} The combined full path
*/
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls, config) {
	assertValidHttpProtocolURL(requestedURL, config);
	let isRelativeUrl = !isAbsoluteURL(requestedURL);
	if (baseURL && (isRelativeUrl || allowAbsoluteUrls === false)) {
		assertValidHttpProtocolURL(baseURL, config);
		return combineURLs(baseURL, requestedURL);
	}
	return requestedURL;
}
var malformedHttpProtocol, httpProtocolControlCharacters;
var init_buildFullPath = __esmMin((() => {
	init_AxiosError();
	init_isAbsoluteURL();
	init_combineURLs();
	malformedHttpProtocol = /^https?:(?!\/\/)/i;
	httpProtocolControlCharacters = /[\t\n\r]/g;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/mergeConfig.js
/**
* Config-specific merge-function which creates a new config-object
* by merging two configuration objects together.
*
* @param {Object} config1
* @param {Object} config2
*
* @returns {Object} New object resulting from merging config2 to config1
*/
function mergeConfig$1(config1, config2) {
	config1 = config1 || {};
	config2 = config2 || {};
	const config = Object.create(null);
	Object.defineProperty(config, "hasOwnProperty", {
		__proto__: null,
		value: Object.prototype.hasOwnProperty,
		enumerable: false,
		writable: true,
		configurable: true
	});
	function getMergedValue(target, source, prop, caseless) {
		if (utils_default.isPlainObject(target) && utils_default.isPlainObject(source)) return utils_default.merge.call({ caseless }, target, source);
		else if (utils_default.isPlainObject(source)) return utils_default.merge({}, source);
		else if (utils_default.isArray(source)) return source.slice();
		return source;
	}
	function mergeDeepProperties(a, b, prop, caseless) {
		if (!utils_default.isUndefined(b)) return getMergedValue(a, b, prop, caseless);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a, prop, caseless);
	}
	function valueFromConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
	}
	function defaultToConfig2(a, b) {
		if (!utils_default.isUndefined(b)) return getMergedValue(void 0, b);
		else if (!utils_default.isUndefined(a)) return getMergedValue(void 0, a);
	}
	function getMergedTransitionalOption(prop) {
		const transitional2 = utils_default.hasOwnProp(config2, "transitional") ? config2.transitional : void 0;
		if (!utils_default.isUndefined(transitional2)) if (utils_default.isPlainObject(transitional2)) {
			if (utils_default.hasOwnProp(transitional2, prop)) return transitional2[prop];
		} else return;
		const transitional1 = utils_default.hasOwnProp(config1, "transitional") ? config1.transitional : void 0;
		if (utils_default.isPlainObject(transitional1) && utils_default.hasOwnProp(transitional1, prop)) return transitional1[prop];
	}
	function mergeDirectKeys(a, b, prop) {
		if (utils_default.hasOwnProp(config2, prop)) return getMergedValue(a, b);
		else if (utils_default.hasOwnProp(config1, prop)) return getMergedValue(void 0, a);
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
	utils_default.forEach(Object.keys({
		...config1,
		...config2
	}), function computeConfigValue(prop) {
		if (prop === "__proto__" || prop === "constructor" || prop === "prototype") return;
		const merge = utils_default.hasOwnProp(mergeMap, prop) ? mergeMap[prop] : mergeDeepProperties;
		const configValue = merge(utils_default.hasOwnProp(config1, prop) ? config1[prop] : void 0, utils_default.hasOwnProp(config2, prop) ? config2[prop] : void 0, prop);
		utils_default.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
	});
	if (utils_default.hasOwnProp(config2, "validateStatus") && utils_default.isUndefined(config2.validateStatus) && getMergedTransitionalOption("validateStatusUndefinedResolves") === false) if (utils_default.hasOwnProp(config1, "validateStatus")) config.validateStatus = getMergedValue(void 0, config1.validateStatus);
	else delete config.validateStatus;
	return config;
}
var headersToObject;
var init_mergeConfig = __esmMin((() => {
	init_utils$1();
	init_AxiosHeaders();
	headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/resolveConfig.js
function setFormDataHeaders(headers, formHeaders, policy) {
	if (policy !== "content-only") {
		headers.set(formHeaders);
		return;
	}
	Object.entries(formHeaders || {}).forEach(([key, val]) => {
		if (FORM_DATA_CONTENT_HEADERS.includes(key.toLowerCase())) headers.set(key, val);
	});
}
function resolveConfig(config) {
	const newConfig = mergeConfig$1({}, config);
	const own = (key) => utils_default.hasOwnProp(newConfig, key) ? newConfig[key] : void 0;
	const data = own("data");
	let withXSRFToken = own("withXSRFToken");
	const xsrfHeaderName = own("xsrfHeaderName");
	const xsrfCookieName = own("xsrfCookieName");
	let headers = own("headers");
	const auth = own("auth");
	const baseURL = own("baseURL");
	const allowAbsoluteUrls = own("allowAbsoluteUrls");
	const url = own("url");
	newConfig.headers = headers = AxiosHeaders$1.from(headers);
	newConfig.url = buildURL(buildFullPath(baseURL, url, allowAbsoluteUrls, newConfig), own("params"), own("paramsSerializer"));
	if (auth) {
		const username = utils_default.getSafeProp(auth, "username") || "";
		const password = utils_default.getSafeProp(auth, "password") || "";
		try {
			headers.set("Authorization", "Basic " + btoa(username + ":" + (password ? encodeUTF8$1(password) : "")));
		} catch (e) {
			throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_OPTION_VALUE, config);
		}
	}
	if (utils_default.isFormData(data)) {
		if (platform_default.hasStandardBrowserEnv || platform_default.hasStandardBrowserWebWorkerEnv || utils_default.isReactNative(data)) headers.setContentType(void 0);
		else if (utils_default.isFunction(data.getHeaders)) setFormDataHeaders(headers, data.getHeaders(), own("formDataHeaderPolicy"));
	}
	if (platform_default.hasStandardBrowserEnv) {
		if (utils_default.isFunction(withXSRFToken)) withXSRFToken = withXSRFToken(newConfig);
		if (withXSRFToken === true || withXSRFToken == null && isURLSameOrigin_default(newConfig.url)) {
			const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies_default.read(xsrfCookieName);
			if (xsrfValue) headers.set(xsrfHeaderName, xsrfValue);
		}
	}
	return newConfig;
}
var FORM_DATA_CONTENT_HEADERS, encodeUTF8$1;
var init_resolveConfig = __esmMin((() => {
	init_platform();
	init_utils$1();
	init_AxiosError();
	init_isURLSameOrigin();
	init_cookies();
	init_buildFullPath();
	init_mergeConfig();
	init_AxiosHeaders();
	init_buildURL();
	FORM_DATA_CONTENT_HEADERS = ["content-type", "content-length"];
	encodeUTF8$1 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/xhr.js
var isXHRAdapterSupported, xhr_default;
var init_xhr = __esmMin((() => {
	init_utils$1();
	init_settle();
	init_transitional();
	init_AxiosError();
	init_CanceledError();
	init_parseProtocol();
	init_platform();
	init_AxiosHeaders();
	init_progressEventReducer();
	init_resolveConfig();
	init_sanitizeHeaderValue();
	isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
	xhr_default = isXHRAdapterSupported && function(config) {
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
				if (!request) return;
				const responseHeaders = AxiosHeaders$1.from("getAllResponseHeaders" in request && request.getAllResponseHeaders());
				settle(function _resolve(value) {
					resolve(value);
					done();
				}, function _reject(err) {
					reject(err);
					done();
				}, {
					data: !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response,
					status: request.status,
					statusText: request.statusText,
					headers: responseHeaders,
					config,
					request
				});
				request = null;
			}
			if ("onloadend" in request) request.onloadend = onloadend;
			else request.onreadystatechange = function handleLoad() {
				if (!request || request.readyState !== 4) return;
				if (request.status === 0 && !(request.responseURL && request.responseURL.startsWith("file:"))) return;
				setTimeout(onloadend);
			};
			request.onabort = function handleAbort() {
				if (!request) return;
				reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config, request));
				done();
				request = null;
			};
			request.onerror = function handleError(event) {
				const err = new AxiosError$1(event && event.message ? event.message : "Network Error", AxiosError$1.ERR_NETWORK, config, request);
				err.event = event || null;
				reject(err);
				done();
				request = null;
			};
			request.ontimeout = function handleTimeout() {
				let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
				const transitional = _config.transitional || transitional_default;
				if (_config.timeoutErrorMessage) timeoutErrorMessage = _config.timeoutErrorMessage;
				reject(new AxiosError$1(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED, config, request));
				done();
				request = null;
			};
			requestData === void 0 && requestHeaders.setContentType(null);
			if ("setRequestHeader" in request) utils_default.forEach(toByteStringHeaderObject(requestHeaders), function setRequestHeader(val, key) {
				request.setRequestHeader(key, val);
			});
			if (!utils_default.isUndefined(_config.withCredentials)) request.withCredentials = !!_config.withCredentials;
			if (responseType && responseType !== "json") request.responseType = _config.responseType;
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
					if (!request) return;
					reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
					request.abort();
					done();
					request = null;
				};
				_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
				if (_config.signal) _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
			}
			const protocol = parseProtocol(_config.url);
			if (protocol && !platform_default.protocols.includes(protocol)) {
				reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config));
				done();
				return;
			}
			request.send(requestData || null);
		});
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/composeSignals.js
var composeSignals;
var init_composeSignals = __esmMin((() => {
	init_CanceledError();
	init_AxiosError();
	init_utils$1();
	composeSignals = (signals, timeout) => {
		signals = signals ? signals.filter(Boolean) : [];
		if (!timeout && !signals.length) return;
		const controller = new AbortController();
		let aborted = false;
		const onabort = function(reason) {
			if (!aborted) {
				aborted = true;
				unsubscribe();
				const err = reason instanceof Error ? reason : this.reason;
				controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
			}
		};
		let timer = timeout && setTimeout(() => {
			timer = null;
			onabort(new AxiosError$1(`timeout of ${timeout}ms exceeded`, AxiosError$1.ETIMEDOUT));
		}, timeout);
		const unsubscribe = () => {
			if (!signals) return;
			timer && clearTimeout(timer);
			timer = null;
			signals.forEach((signal) => {
				signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener("abort", onabort);
			});
			signals = null;
		};
		signals.forEach((signal) => signal.addEventListener("abort", onabort, { once: true }));
		const { signal } = controller;
		signal.unsubscribe = () => utils_default.asap(unsubscribe);
		return signal;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/trackStream.js
var streamChunk, readBytes, readStream, trackStream;
var init_trackStream = __esmMin((() => {
	streamChunk = function* (chunk, chunkSize) {
		let len = chunk.byteLength;
		if (!chunkSize || len < chunkSize) {
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
	readBytes = async function* (iterable, chunkSize) {
		for await (const chunk of readStream(iterable)) yield* streamChunk(chunk, chunkSize);
	};
	readStream = async function* (stream) {
		if (stream[Symbol.asyncIterator]) {
			yield* stream;
			return;
		}
		const reader = stream.getReader();
		try {
			for (;;) {
				const { done, value } = await reader.read();
				if (done) break;
				yield value;
			}
		} finally {
			await reader.cancel();
		}
	};
	trackStream = (stream, chunkSize, onProgress, onFinish) => {
		const iterator = readBytes(stream, chunkSize);
		let bytes = 0;
		let done;
		let _onFinish = (e) => {
			if (!done) {
				done = true;
				onFinish && onFinish(e);
			}
		};
		return new ReadableStream({
			async pull(controller) {
				try {
					const { done, value } = await iterator.next();
					if (done) {
						_onFinish();
						controller.close();
						return;
					}
					let len = value.byteLength;
					if (onProgress) onProgress(bytes += len);
					controller.enqueue(new Uint8Array(value));
				} catch (err) {
					_onFinish(err);
					throw err;
				}
			},
			cancel(reason) {
				_onFinish(reason);
				return iterator.return();
			}
		}, { highWaterMark: 2 });
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/estimateDataURLDecodedBytes.js
function estimateDataURLDecodedBytes(url) {
	if (!url || typeof url !== "string") return 0;
	if (!url.startsWith("data:")) return 0;
	const comma = url.indexOf(",");
	if (comma < 0) return 0;
	const meta = url.slice(5, comma);
	const body = url.slice(comma + 1);
	if (/;base64/i.test(meta)) {
		let effectiveLen = body.length;
		const len = body.length;
		for (let i = 0; i < len; i++) if (body.charCodeAt(i) === 37 && i + 2 < len) {
			const a = body.charCodeAt(i + 1);
			const b = body.charCodeAt(i + 2);
			if (isHexDigit(a) && isHexDigit(b)) {
				effectiveLen -= 2;
				i += 2;
			}
		}
		let pad = 0;
		let idx = len - 1;
		const tailIsPct3D = (j) => j >= 2 && body.charCodeAt(j - 2) === 37 && body.charCodeAt(j - 1) === 51 && (body.charCodeAt(j) === 68 || body.charCodeAt(j) === 100);
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
			if (body.charCodeAt(idx) === 61) pad++;
			else if (tailIsPct3D(idx)) pad++;
		}
		const bytes = Math.floor(effectiveLen / 4) * 3 - (pad || 0);
		return bytes > 0 ? bytes : 0;
	}
	let bytes = 0;
	for (let i = 0, len = body.length; i < len; i++) {
		const c = body.charCodeAt(i);
		if (c === 37 && isPercentEncodedByte(body, i, len)) {
			bytes += 1;
			i += 2;
		} else if (c < 128) bytes += 1;
		else if (c < 2048) bytes += 2;
		else if (c >= 55296 && c <= 56319 && i + 1 < len) {
			const next = body.charCodeAt(i + 1);
			if (next >= 56320 && next <= 57343) {
				bytes += 4;
				i++;
			} else bytes += 3;
		} else bytes += 3;
	}
	return bytes;
}
var isHexDigit, isPercentEncodedByte;
var init_estimateDataURLDecodedBytes = __esmMin((() => {
	isHexDigit = (charCode) => charCode >= 48 && charCode <= 57 || charCode >= 65 && charCode <= 70 || charCode >= 97 && charCode <= 102;
	isPercentEncodedByte = (str, i, len) => i + 2 < len && isHexDigit(str.charCodeAt(i + 1)) && isHexDigit(str.charCodeAt(i + 2));
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/env/data.js
var VERSION$1;
var init_data = __esmMin((() => {
	VERSION$1 = "1.18.1";
})), DEFAULT_CHUNK_SIZE, isFunction, encodeUTF8, decodeURIComponentSafe, test, maybeWithAuthCredentials, factory, seedCache, getFetch;
var init_fetch = __esmMin((() => {
	init_platform();
	init_utils$1();
	init_AxiosError();
	init_composeSignals();
	init_trackStream();
	init_AxiosHeaders();
	init_progressEventReducer();
	init_resolveConfig();
	init_settle();
	init_estimateDataURLDecodedBytes();
	init_data();
	init_sanitizeHeaderValue();
	DEFAULT_CHUNK_SIZE = 64 * 1024;
	({isFunction} = utils_default);
	encodeUTF8 = (str) => encodeURIComponent(str).replace(/%([0-9A-F]{2})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
	decodeURIComponentSafe = (value) => {
		if (!utils_default.isString(value)) return value;
		try {
			return decodeURIComponent(value);
		} catch (error) {
			return value;
		}
	};
	test = (fn, ...args) => {
		try {
			return !!fn(...args);
		} catch (e) {
			return false;
		}
	};
	maybeWithAuthCredentials = (url) => {
		const protocolIndex = url.indexOf("://");
		let urlToCheck = url;
		if (protocolIndex !== -1) urlToCheck = urlToCheck.slice(protocolIndex + 3);
		return urlToCheck.includes("@") || urlToCheck.includes(":");
	};
	factory = (env) => {
		const globalObject = utils_default.global !== void 0 && utils_default.global !== null ? utils_default.global : globalThis;
		const { ReadableStream, TextEncoder } = globalObject;
		env = utils_default.merge.call({ skipUndefined: true }, {
			Request: globalObject.Request,
			Response: globalObject.Response
		}, env);
		const { fetch: envFetch, Request, Response } = env;
		const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === "function";
		const isRequestSupported = isFunction(Request);
		const isResponseSupported = isFunction(Response);
		if (!isFetchSupported) return false;
		const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream);
		const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Request(str).arrayBuffer()));
		const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
			let duplexAccessed = false;
			const request = new Request(platform_default.origin, {
				body: new ReadableStream(),
				method: "POST",
				get duplex() {
					duplexAccessed = true;
					return "half";
				}
			});
			const hasContentType = request.headers.has("Content-Type");
			if (request.body != null) request.body.cancel();
			return duplexAccessed && !hasContentType;
		});
		const supportsResponseStream = isResponseSupported && isReadableStreamSupported && test(() => utils_default.isReadableStream(new Response("").body));
		const resolvers = { stream: supportsResponseStream && ((res) => res.body) };
		isFetchSupported && (() => {
			[
				"text",
				"arrayBuffer",
				"blob",
				"formData",
				"stream"
			].forEach((type) => {
				!resolvers[type] && (resolvers[type] = (res, config) => {
					let method = res && res[type];
					if (method) return method.call(res);
					throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
				});
			});
		})();
		const getBodyLength = async (body) => {
			if (body == null) return 0;
			if (utils_default.isBlob(body)) return body.size;
			if (utils_default.isSpecCompliantForm(body)) return (await new Request(platform_default.origin, {
				method: "POST",
				body
			}).arrayBuffer()).byteLength;
			if (utils_default.isArrayBufferView(body) || utils_default.isArrayBuffer(body)) return body.byteLength;
			if (utils_default.isURLSearchParams(body)) body = body + "";
			if (utils_default.isString(body)) return (await encodeText(body)).byteLength;
		};
		const resolveBodyLength = async (headers, body) => {
			const length = utils_default.toFiniteNumber(headers.getContentLength());
			return length == null ? getBodyLength(body) : length;
		};
		return async (config) => {
			let { url, method, data, signal, cancelToken, timeout, onDownloadProgress, onUploadProgress, responseType, headers, withCredentials = "same-origin", fetchOptions, maxContentLength, maxBodyLength } = resolveConfig(config);
			const hasMaxContentLength = utils_default.isNumber(maxContentLength) && maxContentLength > -1;
			const hasMaxBodyLength = utils_default.isNumber(maxBodyLength) && maxBodyLength > -1;
			const own = (key) => utils_default.hasOwnProp(config, key) ? config[key] : void 0;
			let _fetch = envFetch || fetch;
			responseType = responseType ? (responseType + "").toLowerCase() : "text";
			let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
			let request = null;
			const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
				composedSignal.unsubscribe();
			});
			let requestContentLength;
			let pendingBodyError = null;
			const maxBodyLengthError = () => new AxiosError$1("Request body larger than maxBodyLength limit", AxiosError$1.ERR_BAD_REQUEST, config, request);
			try {
				let auth = void 0;
				const configAuth = own("auth");
				if (configAuth) auth = {
					username: utils_default.getSafeProp(configAuth, "username") || "",
					password: utils_default.getSafeProp(configAuth, "password") || ""
				};
				if (maybeWithAuthCredentials(url)) {
					const parsedURL = new URL(url, platform_default.origin);
					if (!auth && (parsedURL.username || parsedURL.password)) auth = {
						username: decodeURIComponentSafe(parsedURL.username),
						password: decodeURIComponentSafe(parsedURL.password)
					};
					if (parsedURL.username || parsedURL.password) {
						parsedURL.username = "";
						parsedURL.password = "";
						url = parsedURL.href;
					}
				}
				if (auth) {
					headers.delete("authorization");
					headers.set("Authorization", "Basic " + btoa(encodeUTF8((auth.username || "") + ":" + (auth.password || ""))));
				}
				if (hasMaxContentLength && typeof url === "string" && url.startsWith("data:")) {
					if (estimateDataURLDecodedBytes(url) > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
				}
				if (hasMaxBodyLength && method !== "get" && method !== "head") {
					const outboundLength = await getBodyLength(data);
					if (typeof outboundLength === "number" && isFinite(outboundLength)) {
						requestContentLength = outboundLength;
						if (outboundLength > maxBodyLength) throw maxBodyLengthError();
					}
				}
				const mustEnforceStreamBody = hasMaxBodyLength && (utils_default.isReadableStream(data) || utils_default.isStream(data));
				const trackRequestStream = (stream, onProgress, flush) => trackStream(stream, DEFAULT_CHUNK_SIZE, (loadedBytes) => {
					if (hasMaxBodyLength && loadedBytes > maxBodyLength) throw pendingBodyError = maxBodyLengthError();
					onProgress && onProgress(loadedBytes);
				}, flush);
				if (supportsRequestStream && method !== "get" && method !== "head" && (onUploadProgress || mustEnforceStreamBody)) {
					requestContentLength = requestContentLength == null ? await resolveBodyLength(headers, data) : requestContentLength;
					if (requestContentLength !== 0 || mustEnforceStreamBody) {
						let _request = new Request(url, {
							method: "POST",
							body: data,
							duplex: "half"
						});
						let contentTypeHeader;
						if (utils_default.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) headers.setContentType(contentTypeHeader);
						if (_request.body) {
							const [onProgress, flush] = onUploadProgress && progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress))) || [];
							data = trackRequestStream(_request.body, onProgress, flush);
						}
					}
				} else if (mustEnforceStreamBody && !isRequestSupported && isReadableStreamSupported && method !== "get" && method !== "head") data = trackRequestStream(data);
				else if (mustEnforceStreamBody && isRequestSupported && !supportsRequestStream && method !== "get" && method !== "head") throw new AxiosError$1("Stream request bodies are not supported by the current fetch implementation", AxiosError$1.ERR_NOT_SUPPORT, config, request);
				if (!utils_default.isString(withCredentials)) withCredentials = withCredentials ? "include" : "omit";
				const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;
				if (utils_default.isFormData(data)) {
					const contentType = headers.getContentType();
					if (contentType && /^multipart\/form-data/i.test(contentType) && !/boundary=/i.test(contentType)) headers.delete("content-type");
				}
				headers.set("User-Agent", "axios/" + VERSION$1, false);
				const resolvedOptions = {
					...fetchOptions,
					signal: composedSignal,
					method: method.toUpperCase(),
					headers: toByteStringHeaderObject(headers.normalize()),
					body: data,
					duplex: "half",
					credentials: isCredentialsSupported ? withCredentials : void 0
				};
				request = isRequestSupported && new Request(url, resolvedOptions);
				let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));
				const responseHeaders = AxiosHeaders$1.from(response.headers);
				if (hasMaxContentLength) {
					const declaredLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
					if (declaredLength != null && declaredLength > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
				}
				const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
				if (supportsResponseStream && response.body && (onDownloadProgress || hasMaxContentLength || isStreamResponse && unsubscribe)) {
					const options = {};
					[
						"status",
						"statusText",
						"headers"
					].forEach((prop) => {
						options[prop] = response[prop];
					});
					const responseContentLength = utils_default.toFiniteNumber(responseHeaders.getContentLength());
					const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
					let bytesRead = 0;
					const onChunkProgress = (loadedBytes) => {
						if (hasMaxContentLength) {
							bytesRead = loadedBytes;
							if (bytesRead > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
						}
						onProgress && onProgress(loadedBytes);
					};
					response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onChunkProgress, () => {
						flush && flush();
						unsubscribe && unsubscribe();
					}), options);
				}
				responseType = responseType || "text";
				let responseData = await resolvers[utils_default.findKey(resolvers, responseType) || "text"](response, config);
				if (hasMaxContentLength && !supportsResponseStream && !isStreamResponse) {
					let materializedSize;
					if (responseData != null) {
						if (typeof responseData.byteLength === "number") materializedSize = responseData.byteLength;
						else if (typeof responseData.size === "number") materializedSize = responseData.size;
						else if (typeof responseData === "string") materializedSize = typeof TextEncoder === "function" ? new TextEncoder().encode(responseData).byteLength : responseData.length;
					}
					if (typeof materializedSize === "number" && materializedSize > maxContentLength) throw new AxiosError$1("maxContentLength size of " + maxContentLength + " exceeded", AxiosError$1.ERR_BAD_RESPONSE, config, request);
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
					if (err !== canceledError) Object.defineProperty(canceledError, "cause", {
						__proto__: null,
						value: err,
						writable: true,
						enumerable: false,
						configurable: true
					});
					throw canceledError;
				}
				if (pendingBodyError) {
					request && !pendingBodyError.request && (pendingBodyError.request = request);
					throw pendingBodyError;
				}
				if (err instanceof AxiosError$1) {
					request && !err.request && (err.request = request);
					throw err;
				}
				if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
					const networkError = new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config, request, err && err.response);
					Object.defineProperty(networkError, "cause", {
						__proto__: null,
						value: err.cause || err,
						writable: true,
						enumerable: false,
						configurable: true
					});
					throw networkError;
				}
				throw AxiosError$1.from(err, err && err.code, config, request, err && err.response);
			}
		};
	};
	seedCache = /* @__PURE__ */ new Map();
	getFetch = (config) => {
		let env = config && config.env || {};
		const { fetch, Request, Response } = env;
		const seeds = [
			Request,
			Response,
			fetch
		];
		let i = seeds.length, seed, target, map = seedCache;
		while (i--) {
			seed = seeds[i];
			target = map.get(seed);
			target === void 0 && map.set(seed, target = i ? /* @__PURE__ */ new Map() : factory(env));
			map = target;
		}
		return target;
	};
	getFetch();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/adapters/adapters.js
/**
* Get the first suitable adapter from the provided list.
* Tries each adapter in order until a supported one is found.
* Throws an AxiosError if no adapter is suitable.
*
* @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
* @param {Object} config - Axios request configuration
* @throws {AxiosError} If no suitable adapter is available
* @returns {Function} The resolved adapter function
*/
function getAdapter$1(adapters, config) {
	adapters = utils_default.isArray(adapters) ? adapters : [adapters];
	const { length } = adapters;
	let nameOrAdapter;
	let adapter;
	const rejectedReasons = {};
	for (let i = 0; i < length; i++) {
		nameOrAdapter = adapters[i];
		let id;
		adapter = nameOrAdapter;
		if (!isResolvedHandle(nameOrAdapter)) {
			adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
			if (adapter === void 0) throw new AxiosError$1(`Unknown adapter '${id}'`);
		}
		if (adapter && (utils_default.isFunction(adapter) || (adapter = adapter.get(config)))) break;
		rejectedReasons[id || "#" + i] = adapter;
	}
	if (!adapter) {
		const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? "is not supported by the environment" : "is not available in the build"));
		throw new AxiosError$1(`There is no suitable adapter to dispatch the request ` + (length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified"), AxiosError$1.ERR_NOT_SUPPORT);
	}
	return adapter;
}
var knownAdapters, renderReason, isResolvedHandle, adapters_default;
var init_adapters = __esmMin((() => {
	init_utils$1();
	init_null();
	init_xhr();
	init_fetch();
	init_AxiosError();
	knownAdapters = {
		http: null,
		xhr: xhr_default,
		fetch: { get: getFetch }
	};
	utils_default.forEach(knownAdapters, (fn, value) => {
		if (fn) {
			try {
				Object.defineProperty(fn, "name", {
					__proto__: null,
					value
				});
			} catch (e) {}
			Object.defineProperty(fn, "adapterName", {
				__proto__: null,
				value
			});
		}
	});
	renderReason = (reason) => `- ${reason}`;
	isResolvedHandle = (adapter) => utils_default.isFunction(adapter) || adapter === null || adapter === false;
	adapters_default = {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/dispatchRequest.js
/**
* Throws a `CanceledError` if cancellation has been requested.
*
* @param {Object} config The config that is to be used for the request
*
* @returns {void}
*/
function throwIfCancellationRequested(config) {
	if (config.cancelToken) config.cancelToken.throwIfRequested();
	if (config.signal && config.signal.aborted) throw new CanceledError$1(null, config);
}
/**
* Dispatch a request to the server using the configured adapter.
*
* @param {object} config The config that is to be used for the request
*
* @returns {Promise} The Promise to be fulfilled
*/
function dispatchRequest(config) {
	throwIfCancellationRequested(config);
	config.headers = AxiosHeaders$1.from(config.headers);
	config.data = transformData.call(config, config.transformRequest);
	if ([
		"post",
		"put",
		"patch"
	].indexOf(config.method) !== -1) config.headers.setContentType("application/x-www-form-urlencoded", false);
	return adapters_default.getAdapter(config.adapter || defaults.adapter, config)(config).then(function onAdapterResolution(response) {
		throwIfCancellationRequested(config);
		config.response = response;
		try {
			response.data = transformData.call(config, config.transformResponse, response);
		} finally {
			delete config.response;
		}
		response.headers = AxiosHeaders$1.from(response.headers);
		return response;
	}, function onAdapterRejection(reason) {
		if (!isCancel$1(reason)) {
			throwIfCancellationRequested(config);
			if (reason && reason.response) {
				config.response = reason.response;
				try {
					reason.response.data = transformData.call(config, config.transformResponse, reason.response);
				} finally {
					delete config.response;
				}
				reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
			}
		}
		return Promise.reject(reason);
	});
}
var init_dispatchRequest = __esmMin((() => {
	init_transformData();
	init_isCancel();
	init_defaults();
	init_CanceledError();
	init_AxiosHeaders();
	init_adapters();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/validator.js
/**
* Assert object's properties type
*
* @param {object} options
* @param {object} schema
* @param {boolean?} allowUnknown
*
* @returns {object}
*/
function assertOptions(options, schema, allowUnknown) {
	if (typeof options !== "object" || options === null) throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
	const keys = Object.keys(options);
	let i = keys.length;
	while (i-- > 0) {
		const opt = keys[i];
		const validator = Object.prototype.hasOwnProperty.call(schema, opt) ? schema[opt] : void 0;
		if (validator) {
			const value = options[opt];
			const result = value === void 0 || validator(value, opt, options);
			if (result !== true) throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
			continue;
		}
		if (allowUnknown !== true) throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
	}
}
var validators$1, deprecatedWarnings, validator_default;
var init_validator = __esmMin((() => {
	init_data();
	init_AxiosError();
	validators$1 = {};
	[
		"object",
		"boolean",
		"number",
		"function",
		"string",
		"symbol"
	].forEach((type, i) => {
		validators$1[type] = function validator(thing) {
			return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
		};
	});
	deprecatedWarnings = {};
	/**
	* Transitional option validator
	*
	* @param {function|boolean?} validator - set to false if the transitional option has been removed
	* @param {string?} version - deprecated version / removed since version
	* @param {string?} message - some message with additional info
	*
	* @returns {function}
	*/
	validators$1.transitional = function transitional(validator, version, message) {
		function formatMessage(opt, desc) {
			return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
		}
		return (value, opt, opts) => {
			if (validator === false) throw new AxiosError$1(formatMessage(opt, " has been removed" + (version ? " in " + version : "")), AxiosError$1.ERR_DEPRECATED);
			if (version && !deprecatedWarnings[opt]) {
				deprecatedWarnings[opt] = true;
				console.warn(formatMessage(opt, " has been deprecated since v" + version + " and will be removed in the near future"));
			}
			return validator ? validator(value, opt, opts) : true;
		};
	};
	validators$1.spelling = function spelling(correctSpelling) {
		return (value, opt) => {
			console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
			return true;
		};
	};
	validator_default = {
		assertOptions,
		validators: validators$1
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/core/Axios.js
var validators, Axios$1;
var init_Axios = __esmMin((() => {
	init_utils$1();
	init_buildURL();
	init_InterceptorManager();
	init_dispatchRequest();
	init_mergeConfig();
	init_buildFullPath();
	init_validator();
	init_AxiosHeaders();
	init_transitional();
	validators = validator_default.validators;
	Axios$1 = class {
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
					Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = /* @__PURE__ */ new Error();
					const stack = (() => {
						if (!dummy.stack) return "";
						const firstNewlineIndex = dummy.stack.indexOf("\n");
						return firstNewlineIndex === -1 ? "" : dummy.stack.slice(firstNewlineIndex + 1);
					})();
					try {
						if (!err.stack) err.stack = stack;
						else if (stack) {
							const firstNewlineIndex = stack.indexOf("\n");
							const secondNewlineIndex = firstNewlineIndex === -1 ? -1 : stack.indexOf("\n", firstNewlineIndex + 1);
							const stackWithoutTwoTopLines = secondNewlineIndex === -1 ? "" : stack.slice(secondNewlineIndex + 1);
							if (!String(err.stack).endsWith(stackWithoutTwoTopLines)) err.stack += "\n" + stack;
						}
					} catch (e) {}
				}
				throw err;
			}
		}
		_request(configOrUrl, config) {
			if (typeof configOrUrl === "string") {
				config = config || {};
				config.url = configOrUrl;
			} else config = configOrUrl || {};
			config = mergeConfig$1(this.defaults, config);
			const { transitional, paramsSerializer, headers } = config;
			if (transitional !== void 0) validator_default.assertOptions(transitional, {
				silentJSONParsing: validators.transitional(validators.boolean),
				forcedJSONParsing: validators.transitional(validators.boolean),
				clarifyTimeoutError: validators.transitional(validators.boolean),
				legacyInterceptorReqResOrdering: validators.transitional(validators.boolean),
				advertiseZstdAcceptEncoding: validators.transitional(validators.boolean),
				validateStatusUndefinedResolves: validators.transitional(validators.boolean)
			}, false);
			if (paramsSerializer != null) if (utils_default.isFunction(paramsSerializer)) config.paramsSerializer = { serialize: paramsSerializer };
			else validator_default.assertOptions(paramsSerializer, {
				encode: validators.function,
				serialize: validators.function
			}, true);
			if (config.allowAbsoluteUrls !== void 0) {} else if (this.defaults.allowAbsoluteUrls !== void 0) config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
			else config.allowAbsoluteUrls = true;
			validator_default.assertOptions(config, {
				baseUrl: validators.spelling("baseURL"),
				withXsrfToken: validators.spelling("withXSRFToken")
			}, true);
			config.method = (config.method || this.defaults.method || "get").toLowerCase();
			let contextHeaders = headers && utils_default.merge(headers.common, headers[config.method]);
			headers && utils_default.forEach([
				"delete",
				"get",
				"head",
				"post",
				"put",
				"patch",
				"query",
				"common"
			], (method) => {
				delete headers[method];
			});
			config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
			const requestInterceptorChain = [];
			let synchronousRequestInterceptors = true;
			this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
				if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) return;
				synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
				const transitional = config.transitional || transitional_default;
				if (transitional && transitional.legacyInterceptorReqResOrdering) requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
				else requestInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
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
				while (i < len) promise = promise.then(chain[i++], chain[i++]);
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
			while (i < len) promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
			return promise;
		}
		getUri(config) {
			config = mergeConfig$1(this.defaults, config);
			return buildURL(buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls, config), config.params, config.paramsSerializer);
		}
	};
	utils_default.forEach([
		"delete",
		"get",
		"head",
		"options"
	], function forEachMethodNoData(method) {
		Axios$1.prototype[method] = function(url, config) {
			return this.request(mergeConfig$1(config || {}, {
				method,
				url,
				data: config && utils_default.hasOwnProp(config, "data") ? config.data : void 0
			}));
		};
	});
	utils_default.forEach([
		"post",
		"put",
		"patch",
		"query"
	], function forEachMethodWithData(method) {
		function generateHTTPMethod(isForm) {
			return function httpMethod(url, data, config) {
				return this.request(mergeConfig$1(config || {}, {
					method,
					headers: isForm ? { "Content-Type": "multipart/form-data" } : {},
					url,
					data
				}));
			};
		}
		Axios$1.prototype[method] = generateHTTPMethod();
		if (method !== "query") Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/cancel/CancelToken.js
var CancelToken$1;
var init_CancelToken = __esmMin((() => {
	init_CanceledError();
	CancelToken$1 = class CancelToken$1 {
		constructor(executor) {
			if (typeof executor !== "function") throw new TypeError("executor must be a function.");
			let resolvePromise;
			this.promise = new Promise(function promiseExecutor(resolve) {
				resolvePromise = resolve;
			});
			const token = this;
			this.promise.then((cancel) => {
				if (!token._listeners) return;
				let i = token._listeners.length;
				while (i-- > 0) token._listeners[i](cancel);
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
				if (token.reason) return;
				token.reason = new CanceledError$1(message, config, request);
				resolvePromise(token.reason);
			});
		}
		/**
		* Throws a `CanceledError` if cancellation has been requested.
		*/
		throwIfRequested() {
			if (this.reason) throw this.reason;
		}
		/**
		* Subscribe to the cancel signal
		*/
		subscribe(listener) {
			if (this.reason) {
				listener(this.reason);
				return;
			}
			if (this._listeners) this._listeners.push(listener);
			else this._listeners = [listener];
		}
		/**
		* Unsubscribe from the cancel signal
		*/
		unsubscribe(listener) {
			if (!this._listeners) return;
			const index = this._listeners.indexOf(listener);
			if (index !== -1) this._listeners.splice(index, 1);
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
			return {
				token: new CancelToken$1(function executor(c) {
					cancel = c;
				}),
				cancel
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/spread.js
/**
* Syntactic sugar for invoking a function and expanding an array for arguments.
*
* Common use case would be to use `Function.prototype.apply`.
*
*  ```js
*  function f(x, y, z) {}
*  const args = [1, 2, 3];
*  f.apply(null, args);
*  ```
*
* With `spread` this example can be re-written.
*
*  ```js
*  spread(function(x, y, z) {})([1, 2, 3]);
*  ```
*
* @param {Function} callback
*
* @returns {Function}
*/
function spread$1(callback) {
	return function wrap(arr) {
		return callback.apply(null, arr);
	};
}
var init_spread = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/isAxiosError.js
/**
* Determines whether the payload is an error thrown by Axios
*
* @param {*} payload The value to test
*
* @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
*/
function isAxiosError$1(payload) {
	return utils_default.isObject(payload) && payload.isAxiosError === true;
}
var init_isAxiosError = __esmMin((() => {
	init_utils$1();
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/helpers/HttpStatusCode.js
var HttpStatusCode$1;
var init_HttpStatusCode = __esmMin((() => {
	HttpStatusCode$1 = {
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
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/lib/axios.js
/**
* Create an instance of Axios
*
* @param {Object} defaultConfig The default config for the instance
*
* @returns {Axios} A new instance of Axios
*/
function createInstance(defaultConfig) {
	const context = new Axios$1(defaultConfig);
	const instance = bind(Axios$1.prototype.request, context);
	utils_default.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
	utils_default.extend(instance, context, null, { allOwnKeys: true });
	instance.create = function create(instanceConfig) {
		return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
	};
	return instance;
}
var axios;
var init_axios$2 = __esmMin((() => {
	init_utils$1();
	init_bind();
	init_Axios();
	init_mergeConfig();
	init_defaults();
	init_formDataToJSON();
	init_CanceledError();
	init_CancelToken();
	init_isCancel();
	init_data();
	init_toFormData();
	init_AxiosError();
	init_spread();
	init_isAxiosError();
	init_AxiosHeaders();
	init_adapters();
	init_HttpStatusCode();
	axios = createInstance(defaults);
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
	axios.formToJSON = (thing) => formDataToJSON(utils_default.isHTMLForm(thing) ? new FormData(thing) : thing);
	axios.getAdapter = adapters_default.getAdapter;
	axios.HttpStatusCode = HttpStatusCode$1;
	axios.default = axios;
}));
//#endregion
//#region ../../node_modules/.pnpm/axios@1.18.1/node_modules/axios/index.js
var Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create;
var init_axios$1 = __esmMin((() => {
	init_axios$2();
	({Axios, AxiosError, CanceledError, isCancel, CancelToken, VERSION, all, Cancel, isAxiosError, spread, toFormData, AxiosHeaders, HttpStatusCode, formToJSON, getAdapter, mergeConfig, create} = axios);
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosRestClient.js
var AxiosRestClient;
var init_AxiosRestClient = __esmMin((() => {
	init_axios$1();
	init_internal();
	init_RestClient();
	init_AxiosResponseHeadersAdapter();
	AxiosRestClient = class AxiosRestClient {
		static retryCountUpperBound = 10;
		_retryPolicy;
		constructor(retryPolicy) {
			this._retryPolicy = retryPolicy;
		}
		async sendGetRequest(params) {
			const requestConfig = { headers: params.headers };
			if (params.responseType === ContentType.Png) {
				requestConfig.responseType = "arraybuffer";
				const response = await this.executeRequest(async () => axios.get(params.url, requestConfig));
				const data = response.body;
				if (data instanceof ArrayBuffer) return {
					...response,
					body: new Uint8Array(data)
				};
				return response;
			}
			return this.executeRequest(async () => axios.get(params.url, requestConfig));
		}
		async sendPostRequest(params) {
			const requestConfig = { headers: params.headers };
			return this.executeRequest(async () => axios.post(params.url, params.body.content ?? {}, requestConfig));
		}
		async sendPutRequest(params) {
			const requestConfig = { headers: params.headers };
			return this.executeRequest(async () => axios.put(params.url, params.body?.content, requestConfig));
		}
		async sendPatchRequest(params) {
			const requestConfig = { headers: params.headers };
			return this.executeRequest(async () => axios.patch(params.url, params.body.content ?? {}, requestConfig));
		}
		async sendDeleteRequest(params) {
			const requestConfig = { headers: params.headers };
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
			for (;;) try {
				return await requestFunc();
			} catch (error) {
				if (this._retryPolicy === null || retriesInvoked >= this._retryPolicy.maxRetries || retriesInvoked >= AxiosRestClient.retryCountUpperBound || !await this._retryPolicy.shouldRetry({
					retriesInvoked,
					error
				})) throw error;
				const sleepDurationInMs = this._retryPolicy.getSleepDurationInMs({ retriesInvoked: retriesInvoked++ });
				if (sleepDurationInMs > 0) await UtilityFunctions.sleep(sleepDurationInMs);
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/AxiosRetryPolicy.js
var AxiosRetryPolicy;
var init_AxiosRetryPolicy = __esmMin((() => {
	init_axios$1();
	init_Constants$1();
	AxiosRetryPolicy = class {
		_backoffAlgorithm;
		constructor(params) {
			this.maxRetries = params.maxRetries;
			this._backoffAlgorithm = params.backoffAlgorithm;
		}
		maxRetries;
		shouldRetry(params) {
			if (isAxiosError(params.error) && params.error.response?.status != null) return params.error.response.status >= Constants$1.httpStatusCodes.internalServerError;
			return true;
		}
		getSleepDurationInMs(params) {
			return this._backoffAlgorithm.getSleepDurationInMs(params.retriesInvoked);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/ExponentialBackoffAlgorithm.js
var ExponentialBackoffAlgorithm;
var init_ExponentialBackoffAlgorithm = __esmMin((() => {
	ExponentialBackoffAlgorithm = class {
		_baseDelayInMs;
		_factor;
		constructor(params) {
			this._baseDelayInMs = params.baseDelayInMs;
			this._factor = params.factor;
		}
		getSleepDurationInMs(attempt) {
			return Math.pow(this._factor, attempt) * this._baseDelayInMs;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/base/axios/index.js
var init_axios = __esmMin((() => {
	init_AxiosResponseHeadersAdapter();
	init_AxiosRestClient();
	init_AxiosRetryPolicy();
	init_ExponentialBackoffAlgorithm();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/SharedFunctions.js
async function getUser(authorization, userOperations, urlFormatter, userLink, headers) {
	if (!userLink) return void 0;
	const { iModelId, userId } = urlFormatter.parseUserUrl(userLink);
	return userOperations.getSingle({
		authorization,
		iModelId,
		userId,
		headers
	});
}
function assertStringHeaderValue(headerName, headerValue) {
	if (!(typeof headerValue === "string" || headerValue instanceof String)) throw new Error(`Assertion failed: header's ${headerName} value is not a string.`);
}
function assertLink(link) {
	if (!link || !link.href) throw new Error("Assertion failed: link is falsy.");
}
var init_SharedFunctions = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/IModelOperations.js
var IModelOperations;
var init_IModelOperations = __esmMin((() => {
	init_internal();
	init_types();
	init_Constants$1();
	init_SharedFunctions();
	IModelOperations = class extends OperationsBase {
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
				url: this._options.urlFormatter.getIModelListUrl({ urlParams: params.urlParams }),
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
				return response.body.iModels.map((iModel) => this.appendRelatedEntityCallbacks(params.authorization, iModel, params.headers));
			};
			return new EntityListIteratorImpl(async () => this.getEntityCollectionPage({
				authorization: params.authorization,
				url: this._options.urlFormatter.getIModelListUrl({ urlParams: params.urlParams }),
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
				url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
				headers: params.headers
			});
			return this.appendRelatedEntityCallbacks(params.authorization, response.body.iModel, params.headers);
		}
		/**
		* Creates an empty iModel with specified properties. Wraps the
		* {@link https://developer.bentley.com/apis/imodels-v2/operations/create-imodel/ Create iModel} operation from iModels API.
		* @param {CreateEmptyIModelParams} params parameters for this operation. See {@link CreateEmptyIModelParams}.
		* @returns {Promise<iModel>} newly created iModel. See {@link IModel}.
		*/
		async createEmpty(params) {
			const createIModelBody = this.getCreateEmptyIModelRequestBody(params.iModelProperties);
			if (createIModelBody.geographicCoordinateSystem && createIModelBody.creationMode !== "empty") throw new IModelsErrorImpl({
				code: IModelsErrorCode.InvalidIModelGCSCreationMode,
				message: "For empty iModels, GeographicCoordinateSystem can only be set when creationMode is 'empty'.",
				originalError: void 0,
				statusCode: void 0,
				details: void 0
			});
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
			return this.appendRelatedEntityCallbacks(params.authorization, createdIModel, params.headers);
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
			const locationHeaderValue = (await this.sendPostRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getCloneIModelUrl({ iModelId: params.iModelId }),
				body: cloneIModelBody,
				headers: params.headers
			})).headers.get(Constants$1.headers.location);
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
			const locationHeaderValue = (await this.sendPostRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getForkIModelUrl({ iModelId: params.iModelId }),
				body: forkIModelBody,
				headers: params.headers
			})).headers.get(Constants$1.headers.location);
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
				url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
				body: updateIModelBody,
				headers: params.headers
			});
			return this.appendRelatedEntityCallbacks(params.authorization, updateIModelResponse.body.iModel, params.headers);
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
				url: this._options.urlFormatter.getSingleIModelUrl({ iModelId: params.iModelId }),
				headers: params.headers
			});
		}
		appendRelatedEntityCallbacks(authorization, iModel, headers) {
			const getCreator = async () => this.getCreator(authorization, iModel._links.creator?.href, headers);
			return {
				...iModel,
				getCreator
			};
		}
		getCreateEmptyIModelRequestBody(iModelProperties) {
			return {
				iTwinId: iModelProperties.iTwinId,
				name: iModelProperties.name,
				description: iModelProperties.description,
				extent: iModelProperties.extent,
				containersEnabled: iModelProperties.containersEnabled,
				creationMode: iModelProperties.creationMode,
				geographicCoordinateSystem: iModelProperties.geographicCoordinateSystem
			};
		}
		async sendIModelPostRequest(authorization, createIModelBody, headers) {
			return (await this.sendPostRequest({
				authorization,
				url: this._options.urlFormatter.getCreateIModelUrl(),
				body: createIModelBody,
				headers
			})).body.iModel;
		}
		async getCreator(authorization, creatorLink, headers) {
			if (!creatorLink) return void 0;
			const { iModelId, userId } = this._options.urlFormatter.parseUserUrl(creatorLink);
			return this._iModelsClient.users.getSingle({
				authorization,
				iModelId,
				userId,
				headers
			});
		}
		getCreateIModelFromTemplateRequestBody(iModelProperties) {
			return {
				...this.getCreateEmptyIModelRequestBody(iModelProperties),
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
			if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful) throw new IModelsErrorImpl({
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
			if (state === IModelCreationState.MainIModelIsMissingFederationGuids) throw new IModelsErrorImpl({
				code: IModelsErrorCode.MainIModelIsMissingFederationGuids,
				message: "iModel fork initialization failed because some elements in the main iModel do not have FederationGuid property set.",
				originalError: void 0,
				statusCode: void 0,
				details: void 0
			});
			if (state !== IModelCreationState.Scheduled && state !== IModelCreationState.WaitingForFile && state !== IModelCreationState.Successful) throw new IModelsErrorImpl({
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/BriefcaseOperations.js
var BriefcaseOperations;
var init_BriefcaseOperations = __esmMin((() => {
	init_internal();
	init_types();
	init_SharedFunctions();
	BriefcaseOperations = class extends OperationsBase {
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
				return response.body.briefcases.map((briefcase) => this.appendRelatedEntityCallbacks(params.authorization, briefcase, params.headers));
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
			return this.appendRelatedEntityCallbacks(params.authorization, response.body.briefcase, params.headers);
		}
		appendRelatedEntityCallbacks(authorization, briefcase, headers) {
			const getOwner = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, briefcase._links.owner?.href, headers);
			const checkpointLink = briefcase._links.checkpoint;
			assertLink(checkpointLink);
			const getCheckpoint = async () => {
				return (await this.sendGetRequest({
					authorization,
					url: checkpointLink.href,
					headers
				})).body.checkpoint;
			};
			return {
				...briefcase,
				getOwner,
				getCheckpoint
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/ChangesetOperations.js
var ChangesetOperations;
var init_ChangesetOperations = __esmMin((() => {
	init_internal();
	init_types();
	init_SharedFunctions();
	ChangesetOperations = class extends OperationsBase {
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
				return response.body.changesets.map((changeset) => this.appendRelatedMinimalEntityCallbacks(params.authorization, changeset, params.headers));
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
				return response.body.changesets.map((changeset) => this.appendRelatedEntityCallbacks(params.authorization, changeset, params.headers));
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
			return await this.querySingleInternal(params);
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
			return this.appendRelatedEntityCallbacks(params.authorization, response.body.changeset, params.headers);
		}
		appendRelatedMinimalEntityCallbacks(authorization, changeset, headers) {
			const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changeset._links.creator?.href, headers);
			return {
				...changeset,
				getCreator
			};
		}
		appendRelatedEntityCallbacks(authorization, changeset, headers) {
			const getNamedVersion = async () => this.getNamedVersion(authorization, changeset._links.namedVersion?.href, headers);
			const getCurrentOrPrecedingCheckpoint = async () => this.getCurrentOrPrecedingCheckpoint(authorization, changeset._links.currentOrPrecedingCheckpoint?.href, headers);
			return {
				...this.appendRelatedMinimalEntityCallbacks(authorization, changeset, headers),
				getNamedVersion,
				getCurrentOrPrecedingCheckpoint
			};
		}
		async getNamedVersion(authorization, namedVersionLink, headers) {
			if (!namedVersionLink) return void 0;
			const { iModelId, namedVersionId } = this._options.urlFormatter.parseNamedVersionUrl(namedVersionLink);
			return this._iModelsClient.namedVersions.getSingle({
				authorization,
				iModelId,
				namedVersionId,
				headers
			});
		}
		async getCurrentOrPrecedingCheckpoint(authorization, currentOrPrecedingCheckpointLink, headers) {
			if (!currentOrPrecedingCheckpointLink) return void 0;
			const entityIds = this._options.urlFormatter.parseCheckpointUrl(currentOrPrecedingCheckpointLink);
			return this._iModelsClient.checkpoints.getSingle({
				authorization,
				...entityIds,
				headers
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-extended-data/ChangesetExtendedDataOperations.js
var ChangesetExtendedDataOperations;
var init_ChangesetExtendedDataOperations = __esmMin((() => {
	init_internal();
	ChangesetExtendedDataOperations = class extends OperationsBase {
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
				return response.body.extendedData.map((extendedData) => this.convertToChangesetExtendedData(extendedData));
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-group/ChangesetGroupOperations.js
var ChangesetGroupOperations;
var init_ChangesetGroupOperations = __esmMin((() => {
	init_internal();
	init_SharedFunctions();
	ChangesetGroupOperations = class extends OperationsBase {
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
				return response.body.changesetGroups.map((changesetGroup) => this.appendRelatedEntityCallbacks(params.authorization, changesetGroup, params.headers));
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
			return this.appendRelatedEntityCallbacks(params.authorization, response.body.changesetGroup, params.headers);
		}
		appendRelatedEntityCallbacks(authorization, changesetGroup, headers) {
			const getCreator = async () => getUser(authorization, this._iModelsClient.users, this._options.urlFormatter, changesetGroup._links.creator?.href, headers);
			return {
				...changesetGroup,
				getCreator
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/NamedVersionOperations.js
var NamedVersionOperations;
var init_NamedVersionOperations = __esmMin((() => {
	init_internal();
	init_types();
	init_SharedFunctions();
	NamedVersionOperations = class extends OperationsBase {
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
				return response.body.namedVersions.map((namedVersion) => this.appendRelatedEntityCallbacks(params.authorization, namedVersion, params.headers));
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
			return this.appendRelatedEntityCallbacks(params.authorization, response.body.namedVersion, params.headers);
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
				url: this._options.urlFormatter.getNamedVersionListUrl({ iModelId: params.iModelId }),
				body: createNamedVersionBody,
				headers: params.headers
			});
			return this.appendRelatedEntityCallbacks(params.authorization, createNamedVersionResponse.body.namedVersion, params.headers);
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
			return this.appendRelatedEntityCallbacks(params.authorization, updateNamedVersionResponse.body.namedVersion, params.headers);
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
			return {
				...namedVersion,
				getCreator,
				getChangeset
			};
		}
		async getChangeset(authorization, changesetLink, headers) {
			if (!changesetLink) return void 0;
			const entityIds = this._options.urlFormatter.parseChangesetUrl(changesetLink);
			return this._iModelsClient.changesets.getSingle({
				authorization,
				...entityIds,
				headers
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/checkpoint/CheckpointOperations.js
var CheckpointOperations;
var init_CheckpointOperations = __esmMin((() => {
	init_internal();
	CheckpointOperations = class extends OperationsBase {
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
			return (await this.sendGetRequest({
				authorization,
				url: this._options.urlFormatter.getCheckpointUrl({
					iModelId,
					...parentEntityId
				}),
				headers
			})).body.checkpoint;
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
			return (await this.sendPutRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getCheckpointUrl({
					iModelId: params.iModelId,
					namedVersionId: params.namedVersionId
				}),
				headers: params.headers,
				body: /* @__PURE__ */ new Uint8Array()
			})).body.checkpoint;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/thumbnail/ThumbnailOperations.js
var ThumbnailOperations;
var init_ThumbnailOperations = __esmMin((() => {
	init_internal();
	init_types();
	ThumbnailOperations = class extends OperationsBase {
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
			const url = this._options.urlFormatter.getThumbnailUrl({ iModelId: params.iModelId });
			await this.sendPutRequest({
				authorization: params.authorization,
				url,
				contentType: params.thumbnailProperties.imageType,
				body: params.thumbnailProperties.image,
				headers: params.headers
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/UserOperations.js
var UserOperations;
var init_UserOperations = __esmMin((() => {
	init_internal();
	init_types();
	UserOperations = class extends OperationsBase {
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
			return (await this.sendGetRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getSingleUserUrl({
					iModelId: params.iModelId,
					userId: params.userId
				}),
				headers: params.headers
			})).body.user;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user-permission/UserPermissionOperations.js
var UserPermissionOperations;
var init_UserPermissionOperations = __esmMin((() => {
	init_internal();
	UserPermissionOperations = class extends OperationsBase {
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
			return (await this.sendGetRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getUserPermissionsUrl({ iModelId: params.iModelId }),
				headers: params.headers
			})).body;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/operation/OperationOperations.js
var OperationOperations;
var init_OperationOperations = __esmMin((() => {
	init_internal();
	OperationOperations = class extends OperationsBase {
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
			return (await this.sendGetRequest({
				authorization: params.authorization,
				url: this._options.urlFormatter.getCreateIModelOperationDetailsUrl({ iModelId: params.iModelId }),
				headers: params.headers
			})).body.createOperation;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/favorite-imodel/FavoriteIModelOperations.js
var FavoriteIModelOperations;
var init_FavoriteIModelOperations = __esmMin((() => {
	init_internal();
	init_types();
	FavoriteIModelOperations = class extends OperationsBase {
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
				url: this._options.urlFormatter.getFavoriteIModelListUrl({ urlParams: params.urlParams }),
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
				url: this._options.urlFormatter.getFavoriteIModelListUrl({ urlParams: params.urlParams }),
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
				url: this._options.urlFormatter.getFavoriteIModelUrl({ iModelId: params.iModelId }),
				headers: params.headers,
				body: /* @__PURE__ */ new Uint8Array()
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
				url: this._options.urlFormatter.getFavoriteIModelUrl({ iModelId: params.iModelId }),
				headers: params.headers
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/recent-imodel/RecentIModelOperations.js
var RecentIModelOperations;
var init_RecentIModelOperations = __esmMin((() => {
	init_internal();
	init_types();
	RecentIModelOperations = class extends OperationsBase {
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
				url: this._options.urlFormatter.getRecentIModelListUrl({ urlParams: params.urlParams }),
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
				url: this._options.urlFormatter.getRecentIModelListUrl({ urlParams: params.urlParams }),
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
				url: this._options.urlFormatter.getRecentIModelUrl({ iModelId: params.iModelId }),
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
				url: this._options.urlFormatter.getRecentIModelUrl({ iModelId: params.iModelId }),
				headers: params.headers
			});
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/OperationExports.js
var init_OperationExports = __esmMin((() => {
	init_IModelOperations();
	init_BriefcaseOperations();
	init_ChangesetOperations();
	init_ChangesetExtendedDataOperations();
	init_ChangesetGroupOperations();
	init_NamedVersionOperations();
	init_CheckpointOperations();
	init_ThumbnailOperations();
	init_UserOperations();
	init_UserPermissionOperations();
	init_OperationOperations();
	init_FavoriteIModelOperations();
	init_RecentIModelOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/IModelOperationParams.js
var IModelOrderByProperty;
var init_IModelOperationParams = __esmMin((() => {
	(function(IModelOrderByProperty) {
		IModelOrderByProperty["Name"] = "name";
		IModelOrderByProperty["CreatedDateTime"] = "createdDateTime";
	})(IModelOrderByProperty || (IModelOrderByProperty = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/BriefcaseOperationParams.js
var BriefcaseOrderByProperty;
var init_BriefcaseOperationParams = __esmMin((() => {
	(function(BriefcaseOrderByProperty) {
		BriefcaseOrderByProperty["AcquiredDateTime"] = "acquiredDateTime";
	})(BriefcaseOrderByProperty || (BriefcaseOrderByProperty = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/ChangesetOperationParams.js
var ChangesetOrderByProperty;
var init_ChangesetOperationParams = __esmMin((() => {
	(function(ChangesetOrderByProperty) {
		ChangesetOrderByProperty["Index"] = "index";
	})(ChangesetOrderByProperty || (ChangesetOrderByProperty = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-extended-data/ChangesetExtendedDataOperationParams.js
var init_ChangesetExtendedDataOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-group/ChangesetGroupOperationParams.js
var init_ChangesetGroupOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/NamedVersionOperationParams.js
var NamedVersionOrderByProperty;
var init_NamedVersionOperationParams = __esmMin((() => {
	(function(NamedVersionOrderByProperty) {
		NamedVersionOrderByProperty["ChangesetIndex"] = "changesetIndex";
		NamedVersionOrderByProperty["CreatedDateTime"] = "createdDateTime";
	})(NamedVersionOrderByProperty || (NamedVersionOrderByProperty = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/checkpoint/CheckpointOperationParams.js
var init_CheckpointOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/thumbnail/ThumbnailOperationParams.js
var init_ThumbnailOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/UserOperationParams.js
var UserOrderByProperty;
var init_UserOperationParams = __esmMin((() => {
	(function(UserOrderByProperty) {
		UserOrderByProperty["GivenName"] = "givenName";
		UserOrderByProperty["Surname"] = "surname";
	})(UserOrderByProperty || (UserOrderByProperty = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user-permission/UserPermissionOperationParams.js
var init_UserPermissionOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/operation/OperationParams.js
var init_OperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/favorite-imodel/FavoriteIModelOperationParams.js
var init_FavoriteIModelOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/recent-imodel/RecentIModelOperationParams.js
var init_RecentIModelOperationParams = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/OperationParamExports.js
var init_OperationParamExports = __esmMin((() => {
	init_IModelOperationParams();
	init_BriefcaseOperationParams();
	init_ChangesetOperationParams();
	init_ChangesetExtendedDataOperationParams();
	init_ChangesetGroupOperationParams();
	init_NamedVersionOperationParams();
	init_CheckpointOperationParams();
	init_ThumbnailOperationParams();
	init_UserOperationParams();
	init_UserPermissionOperationParams();
	init_OperationParams();
	init_FavoriteIModelOperationParams();
	init_RecentIModelOperationParams();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/OperationOptions.js
var init_OperationOptions = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/IModelsApiUrlFormatter.js
var IModelsApiUrlFormatter;
var init_IModelsApiUrlFormatter = __esmMin((() => {
	IModelsApiUrlFormatter = class {
		baseUrl;
		_regexIgnoreCaseOption = "i";
		_groupNames = {
			iModelId: "iModelId",
			changesetIdOrIndex: "changesetIdOrIndex",
			namedVersionId: "namedVersionId",
			userId: "userId"
		};
		_numericRegex = /* @__PURE__ */ new RegExp("^\\d+$");
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
			if (params.namedVersionId) parentEntityUrlPath = `namedversions/${params.namedVersionId}`;
			else if (params.changesetId || params.changesetIndex != null) parentEntityUrlPath = `changesets/${params.changesetId ?? params.changesetIndex}`;
			else parentEntityUrlPath = "briefcases";
			return `${this.baseUrl}/${params.iModelId}/${parentEntityUrlPath}/checkpoint`;
		}
		getThumbnailUrl(params) {
			return `${this.baseUrl}/${params.iModelId}/thumbnail${this.formQueryString({ ...params.urlParams })}`;
		}
		getUserListUrl(params) {
			return `${this.baseUrl}/${params.iModelId}/users${this.formQueryString({ ...params.urlParams })}`;
		}
		getSingleUserUrl(params) {
			return `${this.baseUrl}/${params.iModelId}/users/${params.userId}`;
		}
		getUserPermissionsUrl(params) {
			return `${this.baseUrl}/${params.iModelId}/permissions`;
		}
		getFavoriteIModelListUrl(params) {
			return `${this.baseUrl}/favorites${this.formQueryString({ ...params.urlParams })}`;
		}
		getFavoriteIModelUrl(params) {
			return `${this.baseUrl}/favorites/${params.iModelId}`;
		}
		getRecentIModelListUrl(params) {
			return `${this.baseUrl}/recents${this.formQueryString({ ...params.urlParams })}`;
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
			return { iModelId: this._iModelUrlRegex.exec(url).groups[this._groupNames.iModelId] };
		}
		formQueryString(urlParameters) {
			let queryString = "";
			for (const urlParameterKey in urlParameters) {
				if (!Object.prototype.hasOwnProperty.call(urlParameters, urlParameterKey)) continue;
				const urlParameterValue = urlParameters[urlParameterKey];
				if (!this.shouldAppendToUrl(urlParameterValue)) continue;
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
			if (this._numericRegex.test(changesetIdOrIndex) && changesetIdOrIndex.length < 40) return { changesetIndex: parseInt(changesetIdOrIndex, 10) };
			return { changesetId: changesetIdOrIndex };
		}
		shouldAppendToUrl(urlParameterValue) {
			if (urlParameterValue === null || urlParameterValue === void 0) return false;
			if (typeof urlParameterValue === "string" && !urlParameterValue.trim()) return false;
			return true;
		}
		appendToQueryString(existingQueryString, parameterKey, parameterValue) {
			return `${existingQueryString}${existingQueryString.length === 0 ? "?" : "&"}${parameterKey}=${this.stringify(parameterValue)}`;
		}
		stringify(urlParameterValue) {
			if (this.isSingleOrderBy(urlParameterValue)) return this.stringifyOrderByParameterValue([urlParameterValue]);
			else if (this.isMultipleOrderBy(urlParameterValue)) return this.stringifyOrderByParameterValue(urlParameterValue);
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
				if (i !== 0) result += ",";
				const criterion = orderByCriteria[i];
				result += criterion.property;
				if (criterion.operator !== void 0) result += ` ${criterion.operator}`;
			}
			return result;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/briefcase/index.js
var init_briefcase = __esmMin((() => {
	init_BriefcaseOperationParams();
	init_BriefcaseOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset/index.js
var init_changeset = __esmMin((() => {
	init_ChangesetOperationParams();
	init_ChangesetOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-extended-data/index.js
var init_changeset_extended_data = __esmMin((() => {
	init_ChangesetExtendedDataOperationParams();
	init_ChangesetExtendedDataOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/changeset-group/index.js
var init_changeset_group = __esmMin((() => {
	init_ChangesetGroupOperationParams();
	init_ChangesetGroupOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/checkpoint/index.js
var init_checkpoint = __esmMin((() => {
	init_CheckpointOperationParams();
	init_CheckpointOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/favorite-imodel/index.js
var init_favorite_imodel = __esmMin((() => {
	init_FavoriteIModelOperationParams();
	init_FavoriteIModelOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/imodel/index.js
var init_imodel = __esmMin((() => {
	init_IModelOperationParams();
	init_IModelOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/named-version/index.js
var init_named_version = __esmMin((() => {
	init_NamedVersionOperationParams();
	init_NamedVersionOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/operation/index.js
var init_operation = __esmMin((() => {
	init_OperationParams();
	init_OperationOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/recent-imodel/index.js
var init_recent_imodel = __esmMin((() => {
	init_RecentIModelOperationParams();
	init_RecentIModelOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/thumbnail/index.js
var init_thumbnail = __esmMin((() => {
	init_ThumbnailOperationParams();
	init_ThumbnailOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user/index.js
var init_user = __esmMin((() => {
	init_UserOperationParams();
	init_UserOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/user-permission/index.js
var init_user_permission = __esmMin((() => {
	init_UserPermissionOperationParams();
	init_UserPermissionOperations();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/operations/index.js
var init_operations = __esmMin((() => {
	init_OperationExports();
	init_OperationParamExports();
	init_OperationOptions();
	init_IModelsApiUrlFormatter();
	init_SharedFunctions();
	init_briefcase();
	init_changeset();
	init_changeset_extended_data();
	init_changeset_group();
	init_checkpoint();
	init_favorite_imodel();
	init_imodel();
	init_named_version();
	init_operation();
	init_recent_imodel();
	init_thumbnail();
	init_user();
	init_user_permission();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/IModelsClient.js
var IModelsClient;
var init_IModelsClient = __esmMin((() => {
	init_axios();
	init_internal();
	init_Constants$1();
	init_operations();
	init_ChangesetExtendedDataOperations();
	init_ChangesetGroupOperations();
	init_CheckpointOperations();
	init_IModelsApiUrlFormatter();
	IModelsClient = class IModelsClient {
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-client-management/lib/esm/index.js
var init_esm$2 = __esmMin((() => {
	init_types();
	init_internal();
	init_axios();
	init_operations();
	init_Constants$1();
	init_IModelsClient();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/AccessTokenAdapter.js
var AccessTokenAdapter;
var init_AccessTokenAdapter = __esmMin((() => {
	init_core_bentley();
	init_esm$2();
	AccessTokenAdapter = class AccessTokenAdapter {
		static toAuthorization(accessToken) {
			const splitAccessToken = accessToken.split(" ");
			if (splitAccessToken.length !== 2) ITwinError.throwError({
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
			if (typeof accessToken === "function") return async () => {
				const token = await accessToken();
				return AccessTokenAdapter.toAuthorization(token);
			};
			else return () => Promise.resolve(AccessTokenAdapter.toAuthorization(accessToken));
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ErrorAdapter.js
var ErrorAdapter;
var init_ErrorAdapter = __esmMin((() => {
	init_core_bentley();
	init_esm$2();
	ErrorAdapter = class ErrorAdapter {
		static toITwinError(error, operationName) {
			if (!isIModelsApiError(error)) return error;
			if (error.code === IModelsErrorCode.Unrecognized) return error;
			if (ErrorAdapter.isAPIAuthError(error.code)) return error;
			if (ErrorAdapter.isIncorrectAPIUsageError(error.code)) return error;
			if (ErrorAdapter.isAPIErrorWithoutCorrespondingStatus(error.code)) return error;
			if (error.code === IModelsErrorCode.InvalidIModelsRequest) return ErrorAdapter.adaptInvalidRequestErrorIfPossible(error);
			let errorCode = ErrorAdapter.tryMapGenericErrorCode(error.code, operationName);
			if (!errorCode) errorCode = ErrorAdapter.mapErrorCode(error.code);
			if ("conflictingLocks" in error) return ITwinError.create({
				iTwinErrorId: {
					key: errorCode,
					scope: IModelsErrorScope
				},
				message: error.message,
				conflictingLocks: error.conflictingLocks
			});
			return ITwinError.create({
				iTwinErrorId: {
					key: errorCode,
					scope: IModelsErrorScope
				},
				message: error.message
			});
		}
		static isAPIAuthError(apiErrorCode) {
			switch (apiErrorCode) {
				case IModelsErrorCode.Unauthorized:
				case IModelsErrorCode.InsufficientPermissions: return true;
				default: return false;
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
				case IModelsErrorCode.DataConflict: return true;
				default: return false;
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
				case IModelsErrorCode.ChangesetDownloadFailed: return true;
				default: return false;
			}
		}
		static adaptInvalidRequestErrorIfPossible(originalError) {
			if (!originalError.details) return originalError;
			for (const errorDetail of originalError.details) if (errorDetail.innerError?.code === IModelsErrorCode.MaximumNumberOfBriefcasesPerUser) return ITwinError.create({
				iTwinErrorId: {
					key: IModelsErrorCode.MaximumNumberOfBriefcasesPerUser,
					scope: IModelsErrorScope
				},
				message: originalError.message
			});
			return originalError;
		}
		static tryMapGenericErrorCode(apiErrorCode, operationName) {
			if (!operationName) return;
			if (apiErrorCode === IModelsErrorCode.RateLimitExceeded && operationName === "acquireBriefcase") return IModelsErrorCode.MaximumNumberOfBriefcasesPerUserPerMinute;
			if (apiErrorCode === IModelsErrorCode.DownloadAborted && operationName === "downloadChangesets") return IModelsErrorCode.DownloadCancelled;
			if (apiErrorCode === IModelsErrorCode.ConflictWithAnotherUser) {
				if (operationName === "createChangeset") return IModelsErrorCode.AnotherUserPushing;
				else if (operationName === "updateLocks") return IModelsErrorCode.LockOwnedByAnotherBriefcase;
			}
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
				case IModelsErrorCode.ClonedIModelInitializationTimedOut: return apiErrorCode;
				default: return IModelsErrorCode.Unknown;
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ErrorHandlingFunctions.js
async function handleAPIErrors(func, operationName) {
	try {
		return await func();
	} catch (error) {
		throw ErrorAdapter.toITwinError(error, operationName);
	}
}
var init_ErrorHandlingFunctions = __esmMin((() => {
	init_ErrorAdapter();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/ChangesetFunctions.js
async function getLatestMinimalChangesetIfExists(iModelsClient, iModelScopedOperationParams) {
	return getLatestChangeset((getChangesetListParams) => iModelsClient.changesets.getMinimalList(getChangesetListParams), iModelScopedOperationParams);
}
async function getNamedVersionChangeset(iModelsClient, iModelScopedOperationParams, versionName) {
	const getNamedVersionListParams = {
		...iModelScopedOperationParams,
		urlParams: { name: versionName }
	};
	const namedVersionsIterator = iModelsClient.namedVersions.getMinimalList(getNamedVersionListParams);
	const namedVersions = await handleAPIErrors(async () => toArray$1(namedVersionsIterator));
	if (namedVersions.length === 0 || !namedVersions[0].changesetId) ITwinError.throwError({
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
	const changesetsIterator = changesetQueryFunc({
		...iModelScopedOperationParams,
		urlParams: {
			$top: 1,
			$orderBy: {
				property: ChangesetOrderByProperty.Index,
				operator: OrderByOperator.Descending
			}
		}
	});
	const changesets = await handleAPIErrors(async () => take(changesetsIterator, 1));
	if (changesets.length === 0) return void 0;
	return changesets[0];
}
var init_ChangesetFunctions = __esmMin((() => {
	init_core_bentley();
	init_esm$2();
	init_ErrorHandlingFunctions();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/Constants.js
var Constants;
var init_Constants = __esmMin((() => {
	Constants = class {
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/IModelsClientsErrorInterfaces.js
var init_IModelsClientsErrorInterfaces = __esmMin((() => {
	init_core_bentley();
	init_esm$2();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-common@6.1.0_@itwin+core-bentley@5.8.1_@itwin+imodels-client-management@6.1.0/node_modules/@itwin/imodels-access-common/lib/esm/index.js
var init_esm$1 = __esmMin((() => {
	init_AccessTokenAdapter();
	init_ChangesetFunctions();
	init_Constants();
	init_ErrorAdapter();
	init_ErrorHandlingFunctions();
	init_IModelsClientsErrorInterfaces();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-frontend@6.1.0_@itwin+core-bentley@5.8.1_@itwin+core-frontend@5.8_6ec6a8c5b6bc5d83687d1fe789c5aae3/node_modules/@itwin/imodels-access-frontend/lib/esm/FrontendIModelsAccess.js
var FrontendIModelsAccess;
var init_FrontendIModelsAccess = __esmMin((() => {
	init_core_bentley();
	init_core_frontend();
	init_esm$1();
	init_esm$2();
	FrontendIModelsAccess = class {
		_emptyChangeset = {
			index: Constants.ChangeSet0.index,
			id: Constants.ChangeSet0.id
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
			if (!changeset) ITwinError.throwError({
				iTwinErrorId: {
					key: IModelsErrorCode.ChangesetNotFound,
					scope: IModelsErrorScope
				},
				message: `Changeset ${arg.changeSetId} not found`
			});
			return {
				index: changeset.index,
				id: changeset.id
			};
		}
		async getLatestChangeset(arg) {
			const latestChangeset = await getLatestMinimalChangesetIfExists(this._iModelsClient, this.getIModelScopedOperationParams(arg));
			if (!latestChangeset) return this._emptyChangeset;
			return {
				index: latestChangeset.index,
				id: latestChangeset.id
			};
		}
		async getChangesetFromVersion(arg) {
			const version = arg.version;
			if (version.isFirst) return this._emptyChangeset;
			const namedVersionChangesetId = version.getAsOfChangeSet();
			if (namedVersionChangesetId) return this.getChangesetFromId({
				...arg,
				changeSetId: namedVersionChangesetId
			});
			const namedVersionName = version.getName();
			if (namedVersionName) return this.getChangesetFromNamedVersion({
				...arg,
				versionName: namedVersionName
			});
			return this.getLatestChangeset(arg);
		}
		async getChangesetFromNamedVersion(arg) {
			if (!arg.versionName) return this.getChangesetFromLatestNamedVersion(arg);
			return getNamedVersionChangeset(this._iModelsClient, this.getIModelScopedOperationParams(arg), arg.versionName);
		}
		getIModelScopedOperationParams(arg) {
			return {
				authorization: arg.accessToken ? () => Promise.resolve(AccessTokenAdapter.toAuthorization(arg.accessToken)) : AccessTokenAdapter.toAuthorizationCallback(() => IModelApp.getAccessToken()),
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
			if (namedVersions.length === 0 || !namedVersions[0].changesetIndex || !namedVersions[0].changesetId) ITwinError.throwError({
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
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+imodels-access-frontend@6.1.0_@itwin+core-bentley@5.8.1_@itwin+core-frontend@5.8_6ec6a8c5b6bc5d83687d1fe789c5aae3/node_modules/@itwin/imodels-access-frontend/lib/esm/index.js
var init_esm = __esmMin((() => {
	init_FrontendIModelsAccess();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/ViewportContent.js
function ViewportContent({ contentId, imodel, viewState, renderViewOverlay }) {
	let [iModel] = import_react$48.useState(UiFramework.getIModelConnection());
	const [defaultViewState] = import_react$48.useState(UiFramework.getDefaultViewState());
	const [viewport, setViewport] = import_react$48.useState(void 0);
	const viewportRef = import_react$48.useRef(void 0);
	import_react$48.useEffect(() => {
		return IModelApp.viewManager.onSelectedViewportChanged.addListener((selectedViewport) => {
			if (!viewportRef.current) return;
			if (selectedViewport.current === viewportRef.current) return;
			if (UiFramework.content.getActiveId() !== contentId) return;
			IModelApp.viewManager.setSelectedView(viewportRef.current);
		});
	}, [contentId, viewport]);
	iModel = imodel ?? iModel;
	viewState = viewState ?? defaultViewState;
	if (!iModel) return null;
	return import_react$48.createElement(import_react$48.Fragment, null, import_react$48.createElement(ViewportComponent, {
		viewState,
		imodel: iModel,
		viewportRef: (v) => {
			viewportRef.current = v;
			setViewport(v);
		}
	}), import_react$48.createElement(ViewOverlayRenderer, {
		viewport,
		renderViewOverlay
	}));
}
function ViewOverlayRenderer({ viewport, renderViewOverlay }) {
	if (!viewport) return null;
	if (renderViewOverlay) return renderViewOverlay(viewport);
	return import_react$48.createElement(DefaultViewOverlay, {
		viewport,
		analysisTimeline: true,
		solarTimeline: true,
		scheduleAnimation: true
	});
}
var import_react$48;
var init_ViewportContent = __esmMin((() => {
	import_react$48 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_core_frontend();
	init_imodel_components_react();
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/ContentLayoutTools.js
function getIModelSpecificKey(inKey, iModelConnection) {
	return `[${iModelConnection?.iModelId ?? "unknownImodel"}]${inKey}`;
}
async function getSavedViewLayoutProps(activeFrontstageId, iModelConnection) {
	const result = await new LocalStateStorage().getSetting("ContentGroupLayout", getIModelSpecificKey(activeFrontstageId, iModelConnection));
	if (!result.setting) return void 0;
	return result.setting;
}
var init_ContentLayoutTools = __esmMin((() => {
	require_react();
	init_appui_abstract();
	init_appui_react();
	init_core_frontend();
	init_esm$4();
	init_ViewportContent();
}));
//#endregion
//#region ../../apps/test-providers/lib/AppUiTestProviders.js
var init_AppUiTestProviders = __esmMin((() => {
	init_core_frontend();
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/GenericLocateTool.js
var init_GenericLocateTool = __esmMin((() => {
	init_core_frontend();
	init_appui_react();
	init_appui_abstract();
	init_AppUiTestProviders();
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/InspectUiItemInfoTool.js
var init_InspectUiItemInfoTool = __esmMin((() => {
	init_core_frontend();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/TestUiProviderDialog.js
var ColorOptions;
var init_TestUiProviderDialog = __esmMin((() => {
	init_core_common();
	init_core_frontend();
	init_appui_abstract();
	(function(ColorOptions) {
		ColorOptions[ColorOptions["Red"] = 0] = "Red";
		ColorOptions[ColorOptions["White"] = 1] = "White";
		ColorOptions[ColorOptions["Blue"] = 2] = "Blue";
		ColorOptions[ColorOptions["Yellow"] = 3] = "Yellow";
		ColorOptions[ColorOptions["Orange"] = 4] = "Orange";
	})(ColorOptions || (ColorOptions = {}));
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/OpenAbstractModalDialogTool.js
var init_OpenAbstractModalDialogTool = __esmMin((() => {
	init_core_frontend();
	init_TestUiProviderDialog();
	init_AppUiTestProviders();
	init_appui_react();
}));
var init_useTranslation = __esmMin((() => {
	require_react();
	init_AppUiTestProviders();
}));
var init_SampleModalDialog = __esmMin((() => {
	require_react();
	init_appui_react();
	init_useTranslation();
}));
var init_OpenCustomDialogTool = __esmMin((() => {
	require_react();
	init_core_frontend();
	init_SampleModalDialog();
	init_AppUiTestProviders();
	init_appui_react();
}));
var init_ViewDefinitionSelector = __esmMin((() => {
	require_react();
}));
var init_ViewsTable = __esmMin((() => {
	require_react();
	init_appui_react();
	init_ViewDefinitionSelector();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/PopoutDialog.scss
var init_PopoutDialog$1 = __esmMin((() => {}));
var init_PopoutDialog = __esmMin((() => {
	require_react();
	init_ViewsTable();
	init_PopoutDialog$1();
}));
var init_OpenPopoutDialogTool = __esmMin((() => {
	require_react();
	init_core_frontend();
	init_appui_abstract();
	init_appui_react();
	init_PopoutDialog();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/PopupTestView.scss
var init_PopupTestView$1 = __esmMin((() => {}));
var init_PopupTestView = __esmMin((() => {
	require_react();
	init_appui_react();
	init_PopupTestView$1();
	init_ViewDefinitionSelector();
}));
var init_OpenPopoutViewTool = __esmMin((() => {
	init_appui_abstract();
	init_appui_react();
	init_core_frontend();
	require_react();
	init_PopupTestView();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SynchronizedFloatingViewComponent.scss
var init_SynchronizedFloatingViewComponent$1 = __esmMin((() => {}));
var init_SynchronizedFloatingViewComponent = __esmMin((() => {
	init_SynchronizedFloatingViewComponent$1();
	require_react();
	init_appui_react();
	init_imodel_components_react();
	init_ViewDefinitionSelector();
}));
var init_OpenSynchronizedViewTool = __esmMin((() => {
	init_appui_react();
	init_core_frontend();
	require_react();
	init_SynchronizedFloatingViewComponent();
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/RegisterUiProviderTool.js
var init_RegisterUiProviderTool = __esmMin((() => {
	init_appui_react();
	init_core_frontend();
})), ToolOptions;
var init_SampleTool = __esmMin((() => {
	require_react();
	init_core_frontend();
	init_appui_abstract();
	init_core_bentley();
	init_core_common();
	init_appui_react();
	init_AppUiTestProviders();
	init_esm$4();
	(function(ToolOptions) {
		ToolOptions[ToolOptions["Red"] = 0] = "Red";
		ToolOptions[ToolOptions["White"] = 1] = "White";
		ToolOptions[ToolOptions["Blue"] = 2] = "Blue";
		ToolOptions[ToolOptions["Yellow"] = 3] = "Yellow";
		ToolOptions[ToolOptions["Green"] = 4] = "Green";
		ToolOptions[ToolOptions["Pink"] = 5] = "Pink";
	})(ToolOptions || (ToolOptions = {}));
})), StateOptions;
var init_ToolWithDynamicSettings = __esmMin((() => {
	init_core_frontend();
	init_AppUiTestProviders();
	(function(StateOptions) {
		StateOptions[StateOptions["None"] = 0] = "None";
		StateOptions[StateOptions["Alabama"] = 1] = "Alabama";
		StateOptions[StateOptions["California"] = 2] = "California";
		StateOptions[StateOptions["Pennsylvania"] = 3] = "Pennsylvania";
		StateOptions[StateOptions["NewYork"] = 4] = "NewYork";
	})(StateOptions || (StateOptions = {}));
	StateOptions.None, StateOptions.Alabama, StateOptions.California, StateOptions.Pennsylvania, StateOptions.NewYork;
}));
//#endregion
//#region ../../apps/test-providers/lib/tools/UiLayoutTools.js
var init_UiLayoutTools = __esmMin((() => {
	init_appui_react();
	init_core_frontend();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/buttons/ViewSelectorPanel.scss
var init_ViewSelectorPanel$1 = __esmMin((() => {}));
var init_ViewSelectorPanel = __esmMin((() => {
	init_ViewSelectorPanel$1();
	require_react();
	init_appui_react();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/components/EditorExampleComponent.js
/** Create a property record to test, allowing editors to be defined. */
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
/** Create Enum typed property record, with filled "yellow", "red", "green" choices.  */
function createEnumProperty(editor) {
	const record = createPropertyRecord(StandardTypeNames.Enum, "red", editor);
	record.property.enum = {
		choices: [
			{
				label: "Yellow",
				value: "yellow"
			},
			{
				label: "Red",
				value: "red"
			},
			{
				label: "Green",
				value: "green"
			}
		],
		isStrict: false
	};
	return record;
}
/** Component that display at least 1 of each variety of editors registered by default in Components-react. */
function EditorExampleComponent() {
	return import_react$33.createElement(Flex, {
		flexDirection: "column",
		alignItems: "flex-start",
		gap: "m",
		style: { width: "100%" }
	}, propertyRecords.map((record, index) => {
		const editorKey = createEditorKey(record);
		const editorId = editorKey.replace(/[^A-Za-z]/g, "");
		return import_react$33.createElement(Flex, {
			key: index,
			flexDirection: "column"
		}, import_react$33.createElement(Flex, {
			flexDirection: "row",
			gap: "xl"
		}, import_react$33.createElement(Flex.Item, {
			id: `Legacy${editorId}`,
			alignSelf: "flex-start",
			style: { width: "300px" }
		}, import_react$33.createElement(OldEditorRenderer, { record })), import_react$33.createElement(Divider, { orientation: "vertical" }), import_react$33.createElement(Flex.Item, {
			id: `New${editorId}`,
			alignSelf: "flex-end",
			style: { width: "300px" }
		}, import_react$33.createElement(NewEditorRenderer, { record }))), import_react$33.createElement(Flex.Item, { alignSelf: "flex-start" }, import_react$33.createElement(Text, {
			variant: "small",
			isMuted: true
		}, editorKey, record.property.editor && import_react$33.createElement(DropdownMenu, { menuItems: (close) => [import_react$33.createElement(MenuItem, {
			key: 1,
			onClick: close
		}, import_react$33.createElement(Text, { variant: "leading" }, "Editor config:"), import_react$33.createElement("code", { style: {
			whiteSpace: "pre",
			display: "block"
		} }, JSON.stringify(record.property.editor, void 0, 2)))] }, import_react$33.createElement(IconButton, {
			styleType: "borderless",
			size: "small"
		}, import_react$33.createElement(SvgDetails, null))))));
	}));
}
function OldEditorRenderer({ record }) {
	return import_react$33.createElement(Flex, {
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-end"
	}, availableSizes.map((localSize) => import_react$33.createElement(Flex.Item, { key: localSize }, import_react$33.createElement(EditorContainer, {
		propertyRecord: record,
		onCommit: () => void 0,
		onCancel: () => void 0
	}))));
}
function NewEditorRenderer({ record }) {
	return import_react$33.createElement(Flex, {
		flexDirection: "row",
		flexWrap: "nowrap",
		alignItems: "flex-end"
	}, availableSizes.map((localSize) => import_react$33.createElement(Flex.Item, { key: localSize }, import_react$33.createElement(PropertyRecordEditor, {
		propertyRecord: record,
		onCommit: () => void 0,
		onCancel: () => void 0,
		editorSystem: "new",
		size: "small"
	}))));
}
function createEditorKey(record) {
	return `${PropertyValueFormat[record.value.valueFormat]}:${record.property.typename}:${record.property.editor?.name ?? "Default"}[${record.property.editor?.params?.map((p) => p.type).join(",") ?? ""}]`.replace("[]", "");
}
var import_react$33, availableSizes, customFormattedNumberParams, inputEditorSizeParams, propertyRecords;
var init_EditorExampleComponent = __esmMin((() => {
	import_react$33 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_abstract();
	init_components_react();
	init_esm$3();
	init_esm$4();
	availableSizes = ["default"];
	customFormattedNumberParams = {
		type: PropertyEditorParamTypes.CustomFormattedNumber,
		formatFunction: (numberValue) => numberValue.toFixed(2),
		parseFunction: (stringValue) => ({ value: Number.parseFloat(stringValue) })
	};
	inputEditorSizeParams = {
		type: PropertyEditorParamTypes.InputEditorSize,
		size: 5,
		maxLength: 5
	};
	propertyRecords = [
		createPropertyRecord(StandardTypeNames.String, "hi"),
		createPropertyRecord(StandardTypeNames.String, "hi", {
			name: StandardEditorNames.MultiLine,
			params: [{
				type: PropertyEditorParamTypes.MultilineText,
				rows: 5
			}]
		}),
		createPropertyRecord(StandardTypeNames.DateTime, new Date(2018, 0, 1)),
		createPropertyRecord(StandardTypeNames.ShortDate, new Date(2018, 0, 1)),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.Slider,
			params: [{
				type: PropertyEditorParamTypes.Slider,
				minimum: 0,
				maximum: 10
			}]
		}),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.NumberCustom,
			params: [customFormattedNumberParams]
		}),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.NumberCustom,
			params: [customFormattedNumberParams, {
				type: PropertyEditorParamTypes.Icon,
				definition: { iconSpec: "icon-placeholder" }
			}]
		}),
		createPropertyRecord(StandardTypeNames.Number, 1, StandardEditorNames.NumericInput),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.NumericInput,
			params: [inputEditorSizeParams]
		}),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.NumericInput,
			params: [{
				type: PropertyEditorParamTypes.Range,
				minimum: 0,
				maximum: 10,
				step: .5,
				precision: 1
			}]
		}),
		createPropertyRecord(StandardTypeNames.Number, 1, {
			name: StandardEditorNames.NumericInput,
			params: [inputEditorSizeParams, {
				type: PropertyEditorParamTypes.Range,
				minimum: 0,
				maximum: 10,
				step: .25,
				precision: 2
			}]
		}),
		createPropertyRecord(StandardTypeNames.Boolean, true),
		createPropertyRecord(StandardTypeNames.Boolean, true, StandardEditorNames.Toggle),
		createPropertyRecord(StandardTypeNames.Boolean, true, {
			name: "image-check-box",
			params: [{
				type: PropertyEditorParamTypes.CheckBoxImages,
				imageOff: "icon-visibility-hide-2",
				imageOn: "icon-visibility"
			}]
		}),
		createEnumProperty(),
		createEnumProperty(StandardEditorNames.EnumButtonGroup),
		createEnumProperty({
			name: StandardEditorNames.EnumButtonGroup,
			params: [{
				type: PropertyEditorParamTypes.ButtonGroupData,
				buttons: [
					{ iconSpec: "icon-app-1" },
					{ iconSpec: "icon-app-2" },
					{ iconSpec: "icon-apps-itwin" }
				]
			}]
		})
	];
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/components/LanguageSelect.scss
var init_LanguageSelect$1 = __esmMin((() => {}));
var init_LanguageSelect = __esmMin((() => {
	require_react();
	init_useTranslation();
	init_LanguageSelect$1();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/ComponentExamples.scss
var init_ComponentExamples$1 = __esmMin((() => {})), createTreeNodeItem, createHierarchy;
var init_TreeWidget = __esmMin((() => {
	require_react();
	init_components_react();
	init_appui_abstract();
	createTreeNodeItem = (id, parentId) => {
		return {
			id,
			parentId,
			label: PropertyRecord.fromString(id, id)
		};
	};
	createHierarchy = (rootNodeCount, childrenNodeCount) => {
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
						for (let y = 0; y < 3; y++) innerNodes[y] = createTreeNodeItem(`Node ${i}-${x}-${y}`, rootNodes[i].id);
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
}));
var init_PropertyGridWidget = __esmMin((() => {
	require_react();
	init_appui_abstract();
	init_components_react();
}));
var init_ComponentExamplesProvider = __esmMin((() => {
	require_react();
	init_internal$1();
	init_appui_react();
	init_core_frontend();
	init_appui_abstract();
	init_TreeWidget();
	init_imodel_components_react();
	init_EditorExampleComponent();
	init_PropertyGridWidget();
}));
var init_ComponentExamples = __esmMin((() => {
	init_ComponentExamples$1();
	require_react();
	init_core_react();
	init_appui_react();
	init_ComponentExamplesProvider();
	init_AppUiTestProviders();
	init_useTranslation();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/ContentLayoutFrontstage.js
function createContentLayoutFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createContentLayoutFrontstage.stageId,
		contentGroupProps: contentGroupProvider,
		cornerButton: import_react$27.createElement(BackstageAppButton, { icon: "icon-bentley-systems" }),
		usage: StageUsage.General
	});
}
var import_react$27, ContentLayoutStageContentGroupProvider, contentGroupProvider;
var init_ContentLayoutFrontstage = __esmMin((() => {
	import_react$27 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_ContentLayoutTools();
	init_ViewportContent();
	ContentLayoutStageContentGroupProvider = class extends ContentGroupProvider {
		async contentGroup(config) {
			const primaryViewState = UiFramework.getDefaultViewState()?.clone();
			if (primaryViewState) primaryViewState.description = "imodel-view-primary";
			const id = "primaryContent";
			const defaultContent = new ContentGroup({
				id: "content-layout-stage-frontstage-main-content-group",
				layout: StandardContentLayouts.singleView,
				contents: [{
					id,
					classId: "",
					content: import_react$27.createElement(ViewportContent, {
						contentId: id,
						renderViewOverlay: () => void 0,
						viewState: primaryViewState
					})
				}]
			});
			const iModelConnection = UiFramework.getIModelConnection();
			if (!iModelConnection) return defaultContent;
			const savedViewLayoutProps = await getSavedViewLayoutProps(config.id, iModelConnection);
			if (!savedViewLayoutProps) return defaultContent;
			const viewStates = await StageContentLayout.viewStatesFromProps(iModelConnection, savedViewLayoutProps);
			if (viewStates.length > 0) {
				const defaultViewState = viewStates[0];
				if (defaultViewState) UiFramework.setDefaultViewState(defaultViewState);
			}
			return new ContentGroup({
				...savedViewLayoutProps.contentGroupProps,
				contents: savedViewLayoutProps.contentGroupProps.contents.map((content, index) => {
					const viewState = viewStates[index];
					return {
						...content,
						content: import_react$27.createElement(ViewportContent, {
							viewState,
							renderViewOverlay: () => void 0
						})
					};
				})
			});
		}
	};
	contentGroupProvider = new ContentLayoutStageContentGroupProvider();
	createContentLayoutFrontstage.stageId = "content-layout";
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/content/SampleContentControl.scss
var init_SampleContentControl$1 = __esmMin((() => {}));
//#endregion
//#region ../../apps/test-providers/lib/ui/content/SampleContentControl.js
var import_react$26, SampleContentControl;
var init_SampleContentControl = __esmMin((() => {
	import_react$26 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_SampleContentControl$1();
	init_esm$3();
	SampleContentControl = class extends ContentControl {
		constructor(info, options) {
			super(info, options);
			this.reactNode = import_react$26.createElement("div", { className: "test-content-container" }, import_react$26.createElement(Flex, { justifyContent: "center" }, "Hello World!"));
		}
	};
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/useActiveContentId.js
function useActiveContentId() {
	const [activeId, setActiveId] = import_react$25.useState(UiFramework.content.getActiveId());
	import_react$25.useEffect(() => {
		return UiFramework.content.onActiveContentChangedEvent.addListener((args) => {
			setActiveId(args.id);
		});
	}, []);
	return activeId;
}
var import_react$25;
var init_useActiveContentId = __esmMin((() => {
	import_react$25 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/CustomContentFrontstage.js
function CustomViewToolWidgetComposer() {
	const hideNavigationAid = useActiveContentId() === "sample-content";
	return import_react$24.createElement(ViewToolWidgetComposer, { hideNavigationAid });
}
function createCustomContentFrontstage() {
	const frontstage = FrontstageUtilities.createStandardFrontstage({
		id: createCustomContentFrontstage.stageId,
		usage: StageUsage.General,
		contentGroupProps: {
			id: "content-group",
			layout: {
				...StandardContentLayouts.twoHorizontalSplit,
				horizontalSplit: {
					...StandardContentLayouts.twoHorizontalSplit.horizontalSplit,
					minSizeBottom: 100,
					percentage: .8
				}
			},
			contents: [{
				id: "primary-content",
				classId: IModelViewportControl,
				applicationData: {
					viewState: UiFramework.getDefaultViewState,
					iModelConnection: UiFramework.getIModelConnection,
					featureOptions: { defaultViewOverlay: {
						enableScheduleAnimationViewOverlay: true,
						enableAnalysisTimelineViewOverlay: true,
						enableSolarTimelineViewOverlay: true
					} }
				}
			}, {
				id: "sample-content",
				classId: SampleContentControl,
				renderActiveStrip: false
			}]
		},
		cornerButton: import_react$24.createElement(BackstageAppButton, null)
	});
	return {
		...frontstage,
		viewNavigation: {
			...frontstage.viewNavigation,
			content: import_react$24.createElement(CustomViewToolWidgetComposer, null)
		}
	};
}
var import_react$24;
var init_CustomContentFrontstage = __esmMin((() => {
	import_react$24 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_SampleContentControl();
	init_useActiveContentId();
	createCustomContentFrontstage.stageId = "custom-content";
})), import_react$23;
var init_CustomFrontstageProvider = __esmMin((() => {
	import_react$23 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	new ContentGroup({
		id: "content-group",
		layout: StandardContentLayouts.singleView,
		contents: [{
			id: "content",
			classId: "",
			content: import_react$23.createElement("h1", null, "Custom Content")
		}]
	});
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/PopoutWindowsFrontstage.js
function createPopoutWindowsFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createPopoutWindowsFrontstage.stageId,
		usage: StageUsage.General,
		contentGroupProps: {
			id: "popout-windows-stage-frontstage-main-content-group",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "primaryContent",
				classId: "",
				content: import_react$22.createElement(ViewportContent, null)
			}]
		},
		cornerButton: import_react$22.createElement(BackstageAppButton, { icon: "icon-bentley-systems" })
	});
}
var import_react$22;
var init_PopoutWindowsFrontstage = __esmMin((() => {
	import_react$22 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_ViewportContent();
	createPopoutWindowsFrontstage.stageId = "appui-test-providers:PopoutWindowsFrontstage";
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/registerCustomFrontstage.js
var init_registerCustomFrontstage = __esmMin((() => {
	init_appui_react();
	init_CustomFrontstageProvider();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/frontstages/SynchronizedViewportFrontstage.js
function createSynchronizedViewportFrontstage() {
	return FrontstageUtilities.createStandardFrontstage({
		id: createSynchronizedViewportFrontstage.stageId,
		contentGroupProps: {
			id: "synchronized-floating-viewport-stage-frontstage-main-content-group",
			layout: StandardContentLayouts.singleView,
			contents: [{
				id: "primaryContent",
				classId: "",
				content: import_react$21.createElement(ViewportContent, null)
			}]
		},
		cornerButton: import_react$21.createElement(BackstageAppButton, { icon: "icon-bentley-systems" }),
		usage: StageUsage.General
	});
}
var import_react$21;
var init_SynchronizedViewportFrontstage = __esmMin((() => {
	import_react$21 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_ViewportContent();
	createSynchronizedViewportFrontstage.stageId = "appui-test-providers:SynchronizedViewport";
}));
var init_UnitsField = __esmMin((() => {
	require_react();
	init_esm$4();
	init_core_frontend();
	init_appui_react();
}));
var init_AbstractUiItemsProvider = __esmMin((() => {
	require_react();
	init_appui_react();
	init_SampleTool();
	init_AppUiTestProviders();
	init_OpenAbstractModalDialogTool();
	init_ToolWithDynamicSettings();
	init_UnitsField();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/statusfields/DisplayStyleField.scss
var init_DisplayStyleField$1 = __esmMin((() => {}));
var init_DisplayStyleField = __esmMin((() => {
	init_DisplayStyleField$1();
	require_classnames();
	require_react();
	init_core_frontend();
	init_useTranslation();
}));
var init_ControlViewportWidget = __esmMin((() => {
	require_react();
	init_appui_react();
	init_core_bentley();
	init_ViewDefinitionSelector();
}));
var init_ViewportWidget = __esmMin((() => {
	require_react();
	init_appui_react();
	init_imodel_components_react();
})), import_react$15;
var init_WidgetContentProvider = __esmMin((() => {
	import_react$15 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	import_react$15.createContext({
		activeId: void 0,
		setActiveId: () => {}
	});
}));
var init_ContentLayoutStageUiItemsProvider = __esmMin((() => {
	require_react();
	init_appui_react();
	init_ContentLayoutTools();
	init_AppUiTestProviders();
	init_ViewSelectorPanel();
	init_DisplayStyleField();
	init_core_frontend();
	init_ControlViewportWidget();
	init_ViewportWidget();
	init_WidgetContentProvider();
	init_ContentLayoutFrontstage();
	init_useActiveContentId();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SampleModelessDialog.scss
var init_SampleModelessDialog$1 = __esmMin((() => {})), import_react$13;
var init_SampleModelessDialog = __esmMin((() => {
	import_react$13 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_core_frontend();
	init_appui_react();
	init_esm$3();
	init_SampleModelessDialog$1();
	import_react$13.Component;
}));
var init_SelectedElementDataWidget = __esmMin((() => {
	init_appui_react();
	require_react();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/dialogs/SampleNonModalDialog.scss
var init_SampleNonModalDialog$1 = __esmMin((() => {}));
var init_SampleNonModalDialog = __esmMin((() => {
	require_react();
	init_core_frontend();
	init_appui_react();
	init_SampleNonModalDialog$1();
}));
//#endregion
//#region ../../apps/test-providers/lib/store.js
function createStore() {
	const state = initialState;
	const onChanged = new BeEvent();
	return {
		state,
		onChanged,
		setHideCustomDialogButton: (hide) => {
			state.hideCustomDialogButton = hide;
			onChanged.raiseEvent();
		},
		setShowCustomViewOverlay: (show) => {
			state.showCustomViewOverlay = show;
			onChanged.raiseEvent();
		},
		setAllow3dManipulations: (allow) => {
			state.allow3dManipulations = allow;
			onChanged.raiseEvent();
		}
	};
}
var initialState;
var init_store = __esmMin((() => {
	init_core_bentley();
	initialState = {
		hideCustomDialogButton: false,
		showCustomViewOverlay: false,
		allow3dManipulations: true
	};
	createStore();
}));
var init_CustomContentStageUiProvider = __esmMin((() => {
	require_react();
	init_appui_abstract();
	init_appui_react();
	init_core_frontend();
	init_AppUiTestProviders();
	init_OpenCustomDialogTool();
	init_SampleModelessDialog();
	init_SelectedElementDataWidget();
	init_esm$4();
	init_SampleNonModalDialog();
	init_CustomContentFrontstage();
	init_store();
}));
var init_ViewAttributesWidget = __esmMin((() => {
	require_react();
	init_appui_react();
	init_core_common();
	init_core_frontend();
}));
var init_LogLifecycleWidget = __esmMin((() => {
	require_react();
	init_appui_react();
}));
var init_FloatingWidgetsUiItemsProvider = __esmMin((() => {
	require_react();
	init_ViewAttributesWidget();
	init_appui_react();
	init_LogLifecycleWidget();
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/InspectUiItemInfoToolProvider.js
var init_InspectUiItemInfoToolProvider = __esmMin((() => {
	init_appui_react();
	init_InspectUiItemInfoTool();
}));
var init_MessageUiItemsProvider = __esmMin((() => {
	require_react();
	init_appui_react();
	init_core_bentley();
	init_core_frontend();
	init_esm$4();
}));
var init_PopoutWindowsProvider = __esmMin((() => {
	require_react();
	init_appui_react();
	init_AppUiTestProviders();
	init_ViewSelectorPanel();
	init_PopoutWindowsFrontstage();
	init_DisplayStyleField();
	init_OpenPopoutViewTool();
	init_OpenPopoutDialogTool();
	init_ViewAttributesWidget();
})), import_react$4;
var init_PreviewFeaturesToggleProvider = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react(), 1);
	init_appui_react();
	init_esm$4();
	import_react$4.createContext(void 0);
}));
//#endregion
//#region ../../apps/test-providers/lib/ui/providers/SynchronizedViewportProvider.js
var init_SynchronizedViewportProvider = __esmMin((() => {
	init_appui_react();
	init_OpenSynchronizedViewTool();
	init_SynchronizedViewportFrontstage();
	init_AppUiTestProviders();
	init_ViewSelectorPanel();
}));
var init_UpdatedUiItemsProvider = __esmMin((() => {
	require_react();
	init_appui_react();
	init_esm$4();
}));
var init_LayoutWidget = __esmMin((() => {
	require_react();
	require_Key_enum();
	init_core_frontend();
	init_appui_react();
	init_core_react();
	UiFramework.frontstages;
}));
var init_UseWidgetHookWidget = __esmMin((() => {
	require_react();
	init_appui_react();
}));
//#endregion
//#region ../../apps/test-providers/lib/createBlankConnection.js
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
		if (vp.view.hasSameCoordinates(viewState)) vp.applyViewState(viewState);
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
var init_createBlankConnection = __esmMin((() => {
	init_core_common();
	init_core_frontend();
	init_core_geometry();
}));
//#endregion
//#region ../../apps/test-providers/lib/appui-test-providers.js
var init_appui_test_providers = __esmMin((() => {
	init_ContentLayoutTools();
	init_GenericLocateTool();
	init_InspectUiItemInfoTool();
	init_OpenAbstractModalDialogTool();
	init_OpenCustomDialogTool();
	init_OpenPopoutDialogTool();
	init_OpenPopoutViewTool();
	init_OpenSynchronizedViewTool();
	init_RegisterUiProviderTool();
	init_SampleTool();
	init_ToolWithDynamicSettings();
	init_UiLayoutTools();
	init_ViewSelectorPanel();
	init_EditorExampleComponent();
	init_LanguageSelect();
	init_SampleModalDialog();
	init_ComponentExamples();
	init_ContentLayoutFrontstage();
	init_CustomContentFrontstage();
	init_CustomFrontstageProvider();
	init_PopoutWindowsFrontstage();
	init_registerCustomFrontstage();
	init_SynchronizedViewportFrontstage();
	init_AbstractUiItemsProvider();
	init_ContentLayoutStageUiItemsProvider();
	init_CustomContentStageUiProvider();
	init_FloatingWidgetsUiItemsProvider();
	init_InspectUiItemInfoToolProvider();
	init_MessageUiItemsProvider();
	init_PopoutWindowsProvider();
	init_PreviewFeaturesToggleProvider();
	init_SynchronizedViewportProvider();
	init_UpdatedUiItemsProvider();
	init_WidgetContentProvider();
	init_LayoutWidget();
	init_LogLifecycleWidget();
	init_UseWidgetHookWidget();
	init_useActiveContentId();
	init_ViewportContent();
	init_AppUiTestProviders();
	init_createBlankConnection();
	init_store();
}));
//#endregion
//#region src/openDemoIModel.ts
async function openDemoIModel(demoIModel) {
	let iModelConnection;
	let viewState;
	if (demoIModel === "blank") {
		iModelConnection = createBlankConnection();
		viewState = createBlankViewState(iModelConnection);
	} else {
		iModelConnection = await CheckpointConnection.openRemote(demoIModel.iTwinId, demoIModel.iModelId);
		viewState = await new ViewCreator3d(iModelConnection).createDefaultView();
	}
	UiFramework.setIModelConnection(iModelConnection, true);
	UiFramework.setDefaultViewState(viewState, true);
}
var init_openDemoIModel = __esmMin((() => {
	init_appui_react();
	init_appui_test_providers();
	init_core_frontend();
}));
//#endregion
//#region src/AppUiStory.tsx
function AppUiStory(props) {
	const demoIModel = useStoryDemoIModel(props);
	const [initialized, setInitialized] = import_react.useState(false);
	import_react.useEffect(() => {
		let ignore = false;
		const startup = async () => {
			await IModelApp.startup({
				accuDraw: new FrameworkAccuDraw(),
				toolAdmin: new FrameworkToolAdmin(),
				hubAccess: new FrontendIModelsAccess({ api: { baseUrl: "https://api.bentley.com/imodels" } }),
				authorizationClient: new DemoAuthClient(),
				notifications: new AppNotificationManager()
			});
			await UiFramework.initialize(void 0);
			await IModelApp.quantityFormatter.setActiveUnitSystem("metric");
			BentleyCloudRpcManager.initializeClient({
				info: {
					title: "visualization",
					version: "v4.0"
				},
				pathPrefix: "https://api.bentley.com/imodeljs"
			}, [
				IModelReadRpcInterface,
				IModelTileRpcInterface,
				SnapshotIModelRpcInterface
			]);
			demoIModel && await openDemoIModel(demoIModel);
			await props.onInitialize?.();
			for (const provider of props.itemProviders ?? []) UiItemsManager.register(provider);
			const frontstages = getFrontstages(props.frontstages);
			for (const frontstage of frontstages) UiFramework.frontstages.addFrontstage(frontstage);
			if (ignore) return;
			setInitialized(true);
		};
		const shutdown = async () => {
			await UiFramework.getIModelConnection()?.close();
			await UiFramework.frontstages.setActiveFrontstageDef(void 0);
			UiFramework.frontstages.clearFrontstageProviders();
			for (const provider of props.itemProviders ?? []) UiItemsManager.unregister(provider.id);
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
	if (!initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initializer, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Initialized, { ...props });
}
function Initialized(props) {
	const { frontstages: frontstagesGetter, onFrontstageActivated } = props;
	import_react.useEffect(() => {
		let ignore = false;
		const frontstage = getFrontstages(frontstagesGetter)[0];
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider_default, {
		store: UiFramework.store,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ThemeManager, { children: [props.children, !props.displayChildrenOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigurableUiContent, {
			style: { height: props.layout === "fullscreen" ? "100vh" : "calc(100vh - 2rem)" },
			appBackstage: props.appBackstage,
			widgetIcon: true,
			renderModalFrontstage: props.renderModalFrontstage
		})] })
	}) });
}
function Initializer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressLinear, {
		indeterminate: true,
		labels: ["Getting things ready!"]
	}) });
}
function Page() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title3, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle2, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primary, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Controls3, {})
	] });
}
function getFrontstages(frontstages) {
	if (!frontstages) return [createFrontstage()];
	if (Array.isArray(frontstages)) return frontstages;
	return frontstages();
}
function useStoryDemoIModel(props) {
	const demoIModel = useDemoIModel();
	if (!props.demoIModel) return void 0;
	if (props.demoIModel === true) return demoIModel;
	return demoIModel ?? props.demoIModel?.default;
}
var import_react, import_jsx_runtime, DemoAuthClient, appInitializer;
var init_AppUiStory = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react(), 1);
	init_react_redux();
	init_blocks();
	init_appui_react();
	init_core_common();
	init_core_frontend();
	init_esm();
	init_esm$3();
	init_Utils();
	init_DemoIModel();
	init_openDemoIModel();
	import_jsx_runtime = require_jsx_runtime();
	DemoAuthClient = class {
		accessToken = void 0;
		async getAccessToken() {
			this.accessToken ??= (async () => {
				const result = await (await fetch("https://connect-itwinjscodesandbox.bentley.com/api/userToken")).json();
				setTimeout(() => this.accessToken = void 0, new Date(result._expiresAt).getTime() - (/* @__PURE__ */ new Date()).getTime() - 5e3);
				return `Bearer ${result._jwt}`;
			})();
			return this.accessToken;
		}
	};
	appInitializer = (() => {
		let latestStartup;
		let initializer;
		return { initialize: (startup, shutdown) => {
			latestStartup = startup;
			let ignore = false;
			(async () => {
				if (initializer) await initializer.cleanup();
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
				initializer.cleanup();
			};
		} };
	})();
	AppUiStory.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "AppUiStory",
		"props": {
			"children": {
				"required": false,
				"tsType": {
					"name": "ReactReactNode",
					"raw": "React.ReactNode"
				},
				"description": ""
			},
			"demoIModel": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "boolean | { default: DemoIModel }",
					"elements": [{ "name": "boolean" }, {
						"name": "signature",
						"type": "object",
						"raw": "{ default: DemoIModel }",
						"signature": { "properties": [{
							"key": "default",
							"value": {
								"name": "union",
								"raw": "RemoteIModel | \"blank\"",
								"elements": [{ "name": "RemoteIModel" }, {
									"name": "literal",
									"value": "\"blank\""
								}],
								"required": true
							}
						}] }
					}]
				},
				"description": ""
			},
			"frontstages": {
				"required": false,
				"tsType": {
					"name": "union",
					"raw": "Frontstage[] | (() => Frontstage[])",
					"elements": [{
						"name": "Array",
						"elements": [{ "name": "Frontstage" }],
						"raw": "Frontstage[]"
					}, { "name": "unknown" }]
				},
				"description": ""
			},
			"itemProviders": {
				"required": false,
				"tsType": {
					"name": "Array",
					"elements": [{ "name": "UiItemsProvider" }],
					"raw": "UiItemsProvider[]"
				},
				"description": ""
			},
			"layout": {
				"required": false,
				"tsType": {
					"name": "literal",
					"value": "\"fullscreen\""
				},
				"description": ""
			},
			"onInitialize": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => Promise<void>",
					"signature": {
						"arguments": [],
						"return": {
							"name": "Promise",
							"elements": [{ "name": "void" }],
							"raw": "Promise<void>"
						}
					}
				},
				"description": ""
			},
			"onFrontstageActivated": {
				"required": false,
				"tsType": {
					"name": "signature",
					"type": "function",
					"raw": "() => void",
					"signature": {
						"arguments": [],
						"return": { "name": "void" }
					}
				},
				"description": ""
			},
			"displayChildrenOnly": {
				"required": false,
				"tsType": { "name": "boolean" },
				"description": "Only display provided children, otherwise, add ConfigurableUIContent component below children. Defaults to false;"
			}
		},
		"composes": ["Pick"]
	};
	Page.__docgenInfo = {
		"description": "",
		"methods": [],
		"displayName": "Page"
	};
}));
//#endregion
export { EditorExampleComponent as a, init_ViewportContent as c, init_appui_test_providers as i, Page as n, init_EditorExampleComponent as o, init_AppUiStory as r, ViewportContent as s, AppUiStory as t };
