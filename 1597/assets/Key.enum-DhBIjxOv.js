import { a as __exportAll, i as __esmMin, r as __commonJSMin } from "./preload-helper-C_PogYeJ.js";
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/AccessToken.js
var init_AccessToken = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Assert.js
/** Asserts that a condition is `true` and - when enabled - throws an error if it is not.
* Assertions are enabled only if the build configuration defines `process.env.NODE_ENV` as `development` at build time.
*
* Assertions exist solely to assist programmers during development, in the following ways:
*  1 They allow the programmer to declare conditions that they believe cannot possibly occur. If such conditions occur, they indicate
*    a serious flaw in the programmer's logic.
*  2 They allow the programmer to assure the TypeScript compiler of the truth of some condition that the compiler cannot itself infer.
*  3 They allow the author of an API to indicate to consumers of the API a serious misuse that should be corrected during development.
*
* Assertions should **never** be used to test for conditions - however unlikely - that could be expected to occur at run-time,
* such as failing to write to a file or load a resource over the network. If the condition asserted ever fails in a production environment,
* the programmer has made a serious mistake.
*
* Note that even when assertions are disabled, calls to `assert` remain in the code and their arguments will be evaluated at run-time.
* Therefore, if your condition or message requires computation, prefer to pass it as a function to prevent it from being evaluated when assertions are disabled.
*
* @param condition The condition that is asserted to be `true`. If the condition is more complex than a simple `boolean` variable, pass it as a function to prevent it from being evaluated when assertions are disabled.
* @param message An optional description of the condition being asserted, to be included in the exception if `condition` is `false`. If the message must be computed, pass it as a function to prevent it from being evaluated when assertions are disabled. Defaults to "Programmer Error".
* @throws Error containing the specified `message` if `condition` is `false`.
* @public
*/
function assert(condition, message) {}
var init_Assert = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BeSQLite.js
var OpenMode, DbOpcode, DbResult;
var init_BeSQLite = __esmMin((() => {
	(function(OpenMode) {
		OpenMode[OpenMode["Readonly"] = 1] = "Readonly";
		OpenMode[OpenMode["ReadWrite"] = 2] = "ReadWrite";
	})(OpenMode || (OpenMode = {}));
	(function(DbOpcode) {
		/** A row was deleted. */
		DbOpcode[DbOpcode["Delete"] = 9] = "Delete";
		/** A new row was inserted. */
		DbOpcode[DbOpcode["Insert"] = 18] = "Insert";
		/** Some columns of an existing row were updated. */
		DbOpcode[DbOpcode["Update"] = 23] = "Update";
	})(DbOpcode || (DbOpcode = {}));
	(function(DbResult) {
		/** Success */
		DbResult[DbResult["BE_SQLITE_OK"] = 0] = "BE_SQLITE_OK";
		/** SQL error or missing database */
		DbResult[DbResult["BE_SQLITE_ERROR"] = 1] = "BE_SQLITE_ERROR";
		/** Internal logic error */
		DbResult[DbResult["BE_SQLITE_INTERNAL"] = 2] = "BE_SQLITE_INTERNAL";
		/** Access permission denied */
		DbResult[DbResult["BE_SQLITE_PERM"] = 3] = "BE_SQLITE_PERM";
		/** Callback routine requested an abort */
		DbResult[DbResult["BE_SQLITE_ABORT"] = 4] = "BE_SQLITE_ABORT";
		/** The database file is locked */
		DbResult[DbResult["BE_SQLITE_BUSY"] = 5] = "BE_SQLITE_BUSY";
		/** A table in the database is locked */
		DbResult[DbResult["BE_SQLITE_LOCKED"] = 6] = "BE_SQLITE_LOCKED";
		/** A malloc() failed */
		DbResult[DbResult["BE_SQLITE_NOMEM"] = 7] = "BE_SQLITE_NOMEM";
		/** Attempt to write a readonly database */
		DbResult[DbResult["BE_SQLITE_READONLY"] = 8] = "BE_SQLITE_READONLY";
		/** Operation terminated by interrupt */
		DbResult[DbResult["BE_SQLITE_INTERRUPT"] = 9] = "BE_SQLITE_INTERRUPT";
		/** Some kind of disk I/O error occurred */
		DbResult[DbResult["BE_SQLITE_IOERR"] = 10] = "BE_SQLITE_IOERR";
		/** The database disk image is malformed */
		DbResult[DbResult["BE_SQLITE_CORRUPT"] = 11] = "BE_SQLITE_CORRUPT";
		/** NOT USED. Table or record not found */
		DbResult[DbResult["BE_SQLITE_NOTFOUND"] = 12] = "BE_SQLITE_NOTFOUND";
		/** Insertion failed because database is full or write operation failed because disk is full */
		DbResult[DbResult["BE_SQLITE_FULL"] = 13] = "BE_SQLITE_FULL";
		/** Unable to open the database file */
		DbResult[DbResult["BE_SQLITE_CANTOPEN"] = 14] = "BE_SQLITE_CANTOPEN";
		/** Database lock protocol error */
		DbResult[DbResult["BE_SQLITE_PROTOCOL"] = 15] = "BE_SQLITE_PROTOCOL";
		/** Database is empty */
		DbResult[DbResult["BE_SQLITE_EMPTY"] = 16] = "BE_SQLITE_EMPTY";
		/** The database schema changed */
		DbResult[DbResult["BE_SQLITE_SCHEMA"] = 17] = "BE_SQLITE_SCHEMA";
		/** String or BLOB exceeds size limit */
		DbResult[DbResult["BE_SQLITE_TOOBIG"] = 18] = "BE_SQLITE_TOOBIG";
		/** Abort due to constraint violation. See extended error values. */
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_BASE"] = 19] = "BE_SQLITE_CONSTRAINT_BASE";
		/** Data type mismatch */
		DbResult[DbResult["BE_SQLITE_MISMATCH"] = 20] = "BE_SQLITE_MISMATCH";
		/** Library used incorrectly */
		DbResult[DbResult["BE_SQLITE_MISUSE"] = 21] = "BE_SQLITE_MISUSE";
		/** Uses OS features not supported on host */
		DbResult[DbResult["BE_SQLITE_NOLFS"] = 22] = "BE_SQLITE_NOLFS";
		/** Authorization denied */
		DbResult[DbResult["BE_SQLITE_AUTH"] = 23] = "BE_SQLITE_AUTH";
		/** Auxiliary database format error */
		DbResult[DbResult["BE_SQLITE_FORMAT"] = 24] = "BE_SQLITE_FORMAT";
		/** 2nd parameter to Bind out of range */
		DbResult[DbResult["BE_SQLITE_RANGE"] = 25] = "BE_SQLITE_RANGE";
		/** File opened that is not a database file */
		DbResult[DbResult["BE_SQLITE_NOTADB"] = 26] = "BE_SQLITE_NOTADB";
		/** Step() has another row ready */
		DbResult[DbResult["BE_SQLITE_ROW"] = 100] = "BE_SQLITE_ROW";
		/** Step() has finished executing */
		DbResult[DbResult["BE_SQLITE_DONE"] = 101] = "BE_SQLITE_DONE";
		DbResult[DbResult["BE_SQLITE_IOERR_READ"] = 266] = "BE_SQLITE_IOERR_READ";
		DbResult[DbResult["BE_SQLITE_IOERR_SHORT_READ"] = 522] = "BE_SQLITE_IOERR_SHORT_READ";
		DbResult[DbResult["BE_SQLITE_IOERR_WRITE"] = 778] = "BE_SQLITE_IOERR_WRITE";
		DbResult[DbResult["BE_SQLITE_IOERR_FSYNC"] = 1034] = "BE_SQLITE_IOERR_FSYNC";
		DbResult[DbResult["BE_SQLITE_IOERR_DIR_FSYNC"] = 1290] = "BE_SQLITE_IOERR_DIR_FSYNC";
		DbResult[DbResult["BE_SQLITE_IOERR_TRUNCATE"] = 1546] = "BE_SQLITE_IOERR_TRUNCATE";
		DbResult[DbResult["BE_SQLITE_IOERR_FSTAT"] = 1802] = "BE_SQLITE_IOERR_FSTAT";
		DbResult[DbResult["BE_SQLITE_IOERR_UNLOCK"] = 2058] = "BE_SQLITE_IOERR_UNLOCK";
		DbResult[DbResult["BE_SQLITE_IOERR_RDLOCK"] = 2314] = "BE_SQLITE_IOERR_RDLOCK";
		DbResult[DbResult["BE_SQLITE_IOERR_DELETE"] = 2570] = "BE_SQLITE_IOERR_DELETE";
		DbResult[DbResult["BE_SQLITE_IOERR_BLOCKED"] = 2826] = "BE_SQLITE_IOERR_BLOCKED";
		DbResult[DbResult["BE_SQLITE_IOERR_NOMEM"] = 3082] = "BE_SQLITE_IOERR_NOMEM";
		DbResult[DbResult["BE_SQLITE_IOERR_ACCESS"] = 3338] = "BE_SQLITE_IOERR_ACCESS";
		DbResult[DbResult["BE_SQLITE_IOERR_CHECKRESERVEDLOCK"] = 3594] = "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
		DbResult[DbResult["BE_SQLITE_IOERR_LOCK"] = 3850] = "BE_SQLITE_IOERR_LOCK";
		DbResult[DbResult["BE_SQLITE_IOERR_CLOSE"] = 4106] = "BE_SQLITE_IOERR_CLOSE";
		DbResult[DbResult["BE_SQLITE_IOERR_DIR_CLOSE"] = 4362] = "BE_SQLITE_IOERR_DIR_CLOSE";
		DbResult[DbResult["BE_SQLITE_IOERR_SHMOPEN"] = 4618] = "BE_SQLITE_IOERR_SHMOPEN";
		DbResult[DbResult["BE_SQLITE_IOERR_SHMSIZE"] = 4874] = "BE_SQLITE_IOERR_SHMSIZE";
		DbResult[DbResult["BE_SQLITE_IOERR_SHMLOCK"] = 5130] = "BE_SQLITE_IOERR_SHMLOCK";
		DbResult[DbResult["BE_SQLITE_IOERR_SHMMAP"] = 5386] = "BE_SQLITE_IOERR_SHMMAP";
		DbResult[DbResult["BE_SQLITE_IOERR_SEEK"] = 5642] = "BE_SQLITE_IOERR_SEEK";
		DbResult[DbResult["BE_SQLITE_IOERR_DELETE_NOENT"] = 5898] = "BE_SQLITE_IOERR_DELETE_NOENT";
		/** attempt to create a new file when a file by that name already exists */
		DbResult[DbResult["BE_SQLITE_ERROR_FileExists"] = 16777226] = "BE_SQLITE_ERROR_FileExists";
		/** attempt to open a BeSQLite::Db that is already in use somewhere. */
		DbResult[DbResult["BE_SQLITE_ERROR_AlreadyOpen"] = 33554442] = "BE_SQLITE_ERROR_AlreadyOpen";
		/** attempt to open a BeSQLite::Db that doesn't have a property table. */
		DbResult[DbResult["BE_SQLITE_ERROR_NoPropertyTable"] = 50331658] = "BE_SQLITE_ERROR_NoPropertyTable";
		/** the database name is not a file. */
		DbResult[DbResult["BE_SQLITE_ERROR_FileNotFound"] = 67108874] = "BE_SQLITE_ERROR_FileNotFound";
		/** there is no transaction active and the database was opened with AllowImplicitTransactions=false */
		DbResult[DbResult["BE_SQLITE_ERROR_NoTxnActive"] = 83886090] = "BE_SQLITE_ERROR_NoTxnActive";
		/** wrong BeSQLite profile version */
		DbResult[DbResult["BE_SQLITE_ERROR_BadDbProfile"] = 100663306] = "BE_SQLITE_ERROR_BadDbProfile";
		/** Profile of file could not be determined. */
		DbResult[DbResult["BE_SQLITE_ERROR_InvalidProfileVersion"] = 117440522] = "BE_SQLITE_ERROR_InvalidProfileVersion";
		/** Upgrade of profile of file failed. */
		DbResult[DbResult["BE_SQLITE_ERROR_ProfileUpgradeFailed"] = 134217738] = "BE_SQLITE_ERROR_ProfileUpgradeFailed";
		/** Profile of file is too old. Therefore file can only be opened read-only. */
		DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooOldForReadWrite"] = 150994954] = "BE_SQLITE_ERROR_ProfileTooOldForReadWrite";
		/** Profile of file is too old. Therefore file cannot be opened. */
		DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooOld"] = 167772170] = "BE_SQLITE_ERROR_ProfileTooOld";
		/** Profile of file is too new for read-write access. Therefore file can only be opened read-only. */
		DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooNewForReadWrite"] = 184549386] = "BE_SQLITE_ERROR_ProfileTooNewForReadWrite";
		/** Profile of file is too new. Therefore file cannot be opened. */
		DbResult[DbResult["BE_SQLITE_ERROR_ProfileTooNew"] = 201326602] = "BE_SQLITE_ERROR_ProfileTooNew";
		/** attempt to commit with active changetrack */
		DbResult[DbResult["BE_SQLITE_ERROR_ChangeTrackError"] = 218103818] = "BE_SQLITE_ERROR_ChangeTrackError";
		/** invalid version of the revision file is being imported */
		DbResult[DbResult["BE_SQLITE_ERROR_InvalidChangeSetVersion"] = 234881034] = "BE_SQLITE_ERROR_InvalidChangeSetVersion";
		/** The schemas found in the database need to be upgraded */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeRequired"] = 251658250] = "BE_SQLITE_ERROR_SchemaUpgradeRequired";
		/** The schemas found in the database are too new, and the application needs to be upgraded. */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaTooNew"] = 268435466] = "BE_SQLITE_ERROR_SchemaTooNew";
		/** The schemas found in the database are too old, and the DgnDb needs to be upgraded. */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaTooOld"] = 285212682] = "BE_SQLITE_ERROR_SchemaTooOld";
		/** Error acquiring a lock on the schemas before upgrade. */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaLockFailed"] = 301989898] = "BE_SQLITE_ERROR_SchemaLockFailed";
		/** Error upgrading the schemas in the database. */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeFailed"] = 318767114] = "BE_SQLITE_ERROR_SchemaUpgradeFailed";
		/** Error importing the schemas into the database. */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaImportFailed"] = 335544330] = "BE_SQLITE_ERROR_SchemaImportFailed";
		/** Error acquiring locks or codes */
		DbResult[DbResult["BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes"] = 352321546] = "BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes";
		/** Recommended that the schemas found in the database be upgraded */
		DbResult[DbResult["BE_SQLITE_ERROR_SchemaUpgradeRecommended"] = 369098762] = "BE_SQLITE_ERROR_SchemaUpgradeRecommended";
		/** schema update require data transform */
		DbResult[DbResult["BE_SQLITE_ERROR_DataTransformRequired"] = 385875978] = "BE_SQLITE_ERROR_DataTransformRequired";
		/** Db not open */
		DbResult[DbResult["BE_SQLITE_ERROR_NOTOPEN"] = 16777217] = "BE_SQLITE_ERROR_NOTOPEN";
		/** Error propagating changes during commit */
		DbResult[DbResult["BE_SQLITE_ERROR_PropagateChangesFailed"] = 33554433] = "BE_SQLITE_ERROR_PropagateChangesFailed";
		DbResult[DbResult["BE_SQLITE_LOCKED_SHAREDCACHE"] = 262] = "BE_SQLITE_LOCKED_SHAREDCACHE";
		DbResult[DbResult["BE_SQLITE_BUSY_RECOVERY"] = 261] = "BE_SQLITE_BUSY_RECOVERY";
		DbResult[DbResult["BE_SQLITE_CANTOPEN_NOTEMPDIR"] = 270] = "BE_SQLITE_CANTOPEN_NOTEMPDIR";
		DbResult[DbResult["BE_SQLITE_CANTOPEN_ISDIR"] = 526] = "BE_SQLITE_CANTOPEN_ISDIR";
		DbResult[DbResult["BE_SQLITE_CANTOPEN_FULLPATH"] = 782] = "BE_SQLITE_CANTOPEN_FULLPATH";
		DbResult[DbResult["BE_SQLITE_CORRUPT_VTAB"] = 267] = "BE_SQLITE_CORRUPT_VTAB";
		DbResult[DbResult["BE_SQLITE_READONLY_RECOVERY"] = 264] = "BE_SQLITE_READONLY_RECOVERY";
		DbResult[DbResult["BE_SQLITE_READONLY_CANTLOCK"] = 520] = "BE_SQLITE_READONLY_CANTLOCK";
		DbResult[DbResult["BE_SQLITE_READONLY_ROLLBACK"] = 776] = "BE_SQLITE_READONLY_ROLLBACK";
		DbResult[DbResult["BE_SQLITE_ABORT_ROLLBACK"] = 516] = "BE_SQLITE_ABORT_ROLLBACK";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_CHECK"] = 275] = "BE_SQLITE_CONSTRAINT_CHECK";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_COMMITHOOK"] = 531] = "BE_SQLITE_CONSTRAINT_COMMITHOOK";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_FOREIGNKEY"] = 787] = "BE_SQLITE_CONSTRAINT_FOREIGNKEY";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_FUNCTION"] = 1043] = "BE_SQLITE_CONSTRAINT_FUNCTION";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_NOTNULL"] = 1299] = "BE_SQLITE_CONSTRAINT_NOTNULL";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_PRIMARYKEY"] = 1555] = "BE_SQLITE_CONSTRAINT_PRIMARYKEY";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_TRIGGER"] = 1811] = "BE_SQLITE_CONSTRAINT_TRIGGER";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_UNIQUE"] = 2067] = "BE_SQLITE_CONSTRAINT_UNIQUE";
		DbResult[DbResult["BE_SQLITE_CONSTRAINT_VTAB"] = 2323] = "BE_SQLITE_CONSTRAINT_VTAB";
	})(DbResult || (DbResult = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/RepositoryStatus.js
var RepositoryStatus;
var init_RepositoryStatus = __esmMin((() => {
	(function(RepositoryStatus) {
		RepositoryStatus[RepositoryStatus["Success"] = 0] = "Success";
		/** The repository server did not respond to a request */
		RepositoryStatus[RepositoryStatus["ServerUnavailable"] = 86017] = "ServerUnavailable";
		/** A requested lock was already held by another briefcase */
		RepositoryStatus[RepositoryStatus["LockAlreadyHeld"] = 86018] = "LockAlreadyHeld";
		/** Failed to sync briefcase manager with server */
		RepositoryStatus[RepositoryStatus["SyncError"] = 86019] = "SyncError";
		/** Response from server not understood */
		RepositoryStatus[RepositoryStatus["InvalidResponse"] = 86020] = "InvalidResponse";
		/** An operation requires local changes to be committed or abandoned */
		RepositoryStatus[RepositoryStatus["PendingTransactions"] = 86021] = "PendingTransactions";
		/** A lock cannot be relinquished because the associated object has been modified */
		RepositoryStatus[RepositoryStatus["LockUsed"] = 86022] = "LockUsed";
		/** An operation required creation of a ChangeSet, which failed */
		RepositoryStatus[RepositoryStatus["CannotCreateChangeSet"] = 86023] = "CannotCreateChangeSet";
		/** Request to server not understood */
		RepositoryStatus[RepositoryStatus["InvalidRequest"] = 86024] = "InvalidRequest";
		/** A change set committed to the server must be integrated into the briefcase before the operation can be completed */
		RepositoryStatus[RepositoryStatus["ChangeSetRequired"] = 86025] = "ChangeSetRequired";
		/** A requested DgnCode is reserved by another briefcase or in use */
		RepositoryStatus[RepositoryStatus["CodeUnavailable"] = 86026] = "CodeUnavailable";
		/** A DgnCode cannot be released because it has not been reserved by the requesting briefcase */
		RepositoryStatus[RepositoryStatus["CodeNotReserved"] = 86027] = "CodeNotReserved";
		/** A DgnCode cannot be relinquished because it has been used locally */
		RepositoryStatus[RepositoryStatus["CodeUsed"] = 86028] = "CodeUsed";
		/** A required lock is not held by this briefcase */
		RepositoryStatus[RepositoryStatus["LockNotHeld"] = 86029] = "LockNotHeld";
		/** Repository is currently locked, no changes allowed */
		RepositoryStatus[RepositoryStatus["RepositoryIsLocked"] = 86030] = "RepositoryIsLocked";
		/** Channel write constraint violation, such as an attempt to write outside the designated channel. */
		RepositoryStatus[RepositoryStatus["ChannelConstraintViolation"] = 86031] = "ChannelConstraintViolation";
	})(RepositoryStatus || (RepositoryStatus = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/JsonUtils.js
var JsonUtils;
var init_JsonUtils = __esmMin((() => {
	(function(JsonUtils) {
		/** Get a value as a boolean.
		* @param json the input JSON object
		* @param defaultVal default value if json cannot be converted to boolean
		* @returns the value of json as a boolean, or default value
		*/
		function asBool(json, defaultVal = false) {
			return isNullOrUndefined(json) ? defaultVal : !!json;
		}
		JsonUtils.asBool = asBool;
		/** Get a value as an integer.
		* @param json the input JSON object
		* @param defaultVal default value if json cannot be converted to integer
		* @returns the value of json as an integer, or default value
		*/
		function asInt(json, defaultVal = 0) {
			return typeof json === "number" ? Math.trunc(json) : defaultVal;
		}
		JsonUtils.asInt = asInt;
		/** Get a value as a double.
		* @param json the input JSON object
		* @param defaultVal default value if json cannot be converted to double
		* @returns the value of json as a double, or default value
		*/
		function asDouble(json, defaultVal = 0) {
			return typeof json === "number" ? json : defaultVal;
		}
		JsonUtils.asDouble = asDouble;
		/** Get a value as a string.
		* @param json the input JSON object
		* @param defaultVal default value if json cannot be converted to string
		* @returns the value of json as a string, or default value
		*/
		function asString(json, defaultVal = "") {
			return isNullOrUndefined(json) ? defaultVal : json.toString();
		}
		JsonUtils.asString = asString;
		/** Get a value as an array.
		* @param json the input JSON object
		* @returns the input JSON object if it is an array, otherwise undefined
		*/
		function asArray(json) {
			return Array.isArray(json) ? json : void 0;
		}
		JsonUtils.asArray = asArray;
		/** Get a value as an object.
		* @param json the input JSON object
		* @returns the input JSON object if it is an object, otherwise undefined
		*/
		function asObject(json) {
			return "object" === typeof json ? json : void 0;
		}
		JsonUtils.asObject = asObject;
		/** Set or remove a number on a json object, given a key name, a value, and a default value. Sets `json[key] = val` if val is *not* equal to the default,
		* otherwise `delete json[key]`. This is used to omit values from JSON strings that are of known defaults.
		* @param json the JSON object to affect
		* @param key the name of the member to set or remove
		* @param val the value to set
		* @param defaultVal the default value.
		*/
		function setOrRemoveNumber(json, key, val, defaultVal) {
			if (val === defaultVal) delete json[key];
			else json[key] = val;
		}
		JsonUtils.setOrRemoveNumber = setOrRemoveNumber;
		/** Set or remove a boolean on a json object, given a key name, a value, and a default value. Sets `json[key] = val` if val is *not* equal to the default,
		* otherwise `delete json[key]`. This is used to omit values from JSON strings that are of known defaults.
		* @param json the JSON object to affect
		* @param key the name of the member to set or remove
		* @param val the value to set
		* @param defaultVal the default value.
		*/
		function setOrRemoveBoolean(json, key, val, defaultVal) {
			if (val === defaultVal) delete json[key];
			else json[key] = val;
		}
		JsonUtils.setOrRemoveBoolean = setOrRemoveBoolean;
		/** Returns `true` if `json` is a non-null object. */
		function isObject(json) {
			return json !== null && "object" === typeof json;
		}
		JsonUtils.isObject = isObject;
		/** Determine if a Javascript object is equivalent to `{}`.
		* @param json The JSON object to test.
		* @returns true if `json` is an Object with no keys.
		*/
		function isEmptyObject(json) {
			return isObject(json) && 0 === Object.keys(json).length;
		}
		JsonUtils.isEmptyObject = isEmptyObject;
		/** Determine if the input is undefined or an empty Javascript object.
		* @param json The JSON object to test.
		* @returns true if `json` is undefined or is an Object with no keys (equivalent to `{}`).
		*/
		function isEmptyObjectOrUndefined(json) {
			return void 0 === json || isEmptyObject(json);
		}
		JsonUtils.isEmptyObjectOrUndefined = isEmptyObjectOrUndefined;
		function isNullOrUndefined(json) {
			return null === json || void 0 === json;
		}
		/** Determine if the input is a non-empty Javascript object.
		* @param value The value to test.
		* @returns true if `value` is an Object with at least one key.
		*/
		function isNonEmptyObject(value) {
			return !isEmptyObjectOrUndefined(value);
		}
		JsonUtils.isNonEmptyObject = isNonEmptyObject;
		/**
		* Convert the input object into a "pure" JavaScript object, with only instances of "object" or primitives in the returned value.
		* Works recursively for object members, and over arrays entries. Calls "toJSON" on any members that implement it.
		*/
		function toObject(val) {
			if (typeof val === "boolean" || typeof val === "number" || typeof val === "string") return val;
			if (typeof val !== "object") return void 0;
			if (typeof val.toJSON !== "undefined") return toObject(val.toJSON());
			if (Array.isArray(val)) {
				const arr = new Array(val.length);
				val.forEach((el, i) => arr[i] = toObject(el));
				return arr;
			}
			const out = {};
			Object.getOwnPropertyNames(val).forEach((prop) => {
				const transformVal = toObject(val[prop]);
				if (transformVal !== void 0) out[prop] = transformVal;
			});
			return out;
		}
		JsonUtils.toObject = toObject;
	})(JsonUtils || (JsonUtils = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BentleyError.js
var ITwinError, BentleyStatus, IModelStatus, BriefcaseStatus, RpcInterfaceStatus, ChangeSetStatus, HttpStatus, IModelHubStatus, GeoServiceStatus, RealityDataStatus, BentleyError;
var init_BentleyError = __esmMin((() => {
	init_BeSQLite();
	init_RepositoryStatus();
	init_JsonUtils();
	(function(ITwinError) {
		/** Instantiate a new `ITwinError` or subtype thereof.
		* @see [[ITwinError.throwError]] to conveniently instantiate and throw the error.
		*/
		function create(args) {
			const err = new Error(args.message);
			Object.assign(err, args);
			err.name = args.iTwinErrorId.key;
			return err;
		}
		ITwinError.create = create;
		/** Instantiate and immediately throw an `ITwinError`.
		* @see [[ITwinError.create]] to instantiate an error without throwing it.
		*/
		function throwError(args) {
			throw create(args);
		}
		ITwinError.throwError = throwError;
		/**
		* Determine whether an error object was thrown by iTwin.js and has a specific scope and key.
		*
		* If the test succeeds, the type of `error` is coerced to `T`
		* @param error The error to ve verified.
		* @param scope value for `error.iTwinErrorId.scope`
		* @param key value for `error.iTwinErrorId.key`
		*/
		function isError(error, scope, key) {
			return JsonUtils.isObject(error) && "iTwinErrorId" in error && JsonUtils.isObject(error.iTwinErrorId) && error.iTwinErrorId.scope === scope && (void 0 === key || error.iTwinErrorId.key === key);
		}
		ITwinError.isError = isError;
	})(ITwinError || (ITwinError = {}));
	(function(BentleyStatus) {
		BentleyStatus[BentleyStatus["SUCCESS"] = 0] = "SUCCESS";
		BentleyStatus[BentleyStatus["ERROR"] = 32768] = "ERROR";
	})(BentleyStatus || (BentleyStatus = {}));
	(function(IModelStatus) {
		IModelStatus[IModelStatus["IMODEL_ERROR_BASE"] = 65536] = "IMODEL_ERROR_BASE";
		IModelStatus[IModelStatus["Success"] = 0] = "Success";
		IModelStatus[IModelStatus["AlreadyLoaded"] = 65537] = "AlreadyLoaded";
		IModelStatus[IModelStatus["AlreadyOpen"] = 65538] = "AlreadyOpen";
		IModelStatus[IModelStatus["BadArg"] = 65539] = "BadArg";
		IModelStatus[IModelStatus["BadElement"] = 65540] = "BadElement";
		IModelStatus[IModelStatus["BadModel"] = 65541] = "BadModel";
		IModelStatus[IModelStatus["BadRequest"] = 65542] = "BadRequest";
		IModelStatus[IModelStatus["BadSchema"] = 65543] = "BadSchema";
		IModelStatus[IModelStatus["CannotUndo"] = 65544] = "CannotUndo";
		IModelStatus[IModelStatus["CodeNotReserved"] = 65545] = "CodeNotReserved";
		IModelStatus[IModelStatus["DeletionProhibited"] = 65546] = "DeletionProhibited";
		IModelStatus[IModelStatus["DuplicateCode"] = 65547] = "DuplicateCode";
		IModelStatus[IModelStatus["DuplicateName"] = 65548] = "DuplicateName";
		IModelStatus[IModelStatus["ElementBlockedChange"] = 65549] = "ElementBlockedChange";
		IModelStatus[IModelStatus["FileAlreadyExists"] = 65550] = "FileAlreadyExists";
		IModelStatus[IModelStatus["FileNotFound"] = 65551] = "FileNotFound";
		IModelStatus[IModelStatus["FileNotLoaded"] = 65552] = "FileNotLoaded";
		IModelStatus[IModelStatus["ForeignKeyConstraint"] = 65553] = "ForeignKeyConstraint";
		IModelStatus[IModelStatus["IdExists"] = 65554] = "IdExists";
		IModelStatus[IModelStatus["InDynamicTransaction"] = 65555] = "InDynamicTransaction";
		IModelStatus[IModelStatus["InvalidCategory"] = 65556] = "InvalidCategory";
		IModelStatus[IModelStatus["InvalidCode"] = 65557] = "InvalidCode";
		IModelStatus[IModelStatus["InvalidCodeSpec"] = 65558] = "InvalidCodeSpec";
		IModelStatus[IModelStatus["InvalidId"] = 65559] = "InvalidId";
		IModelStatus[IModelStatus["InvalidName"] = 65560] = "InvalidName";
		IModelStatus[IModelStatus["InvalidParent"] = 65561] = "InvalidParent";
		IModelStatus[IModelStatus["InvalidProfileVersion"] = 65562] = "InvalidProfileVersion";
		IModelStatus[IModelStatus["IsCreatingChangeSet"] = 65563] = "IsCreatingChangeSet";
		IModelStatus[IModelStatus["LockNotHeld"] = 65564] = "LockNotHeld";
		IModelStatus[IModelStatus["Mismatch2d3d"] = 65565] = "Mismatch2d3d";
		IModelStatus[IModelStatus["MismatchGcs"] = 65566] = "MismatchGcs";
		IModelStatus[IModelStatus["MissingDomain"] = 65567] = "MissingDomain";
		IModelStatus[IModelStatus["MissingHandler"] = 65568] = "MissingHandler";
		IModelStatus[IModelStatus["MissingId"] = 65569] = "MissingId";
		IModelStatus[IModelStatus["NoGeometry"] = 65570] = "NoGeometry";
		IModelStatus[IModelStatus["NoMultiTxnOperation"] = 65571] = "NoMultiTxnOperation";
		IModelStatus[IModelStatus["NotEnabled"] = 65573] = "NotEnabled";
		IModelStatus[IModelStatus["NotFound"] = 65574] = "NotFound";
		IModelStatus[IModelStatus["NotOpen"] = 65575] = "NotOpen";
		IModelStatus[IModelStatus["NotOpenForWrite"] = 65576] = "NotOpenForWrite";
		IModelStatus[IModelStatus["NotSameUnitBase"] = 65577] = "NotSameUnitBase";
		IModelStatus[IModelStatus["NothingToRedo"] = 65578] = "NothingToRedo";
		IModelStatus[IModelStatus["NothingToUndo"] = 65579] = "NothingToUndo";
		IModelStatus[IModelStatus["ParentBlockedChange"] = 65580] = "ParentBlockedChange";
		IModelStatus[IModelStatus["ReadError"] = 65581] = "ReadError";
		IModelStatus[IModelStatus["ReadOnly"] = 65582] = "ReadOnly";
		IModelStatus[IModelStatus["ReadOnlyDomain"] = 65583] = "ReadOnlyDomain";
		IModelStatus[IModelStatus["RepositoryManagerError"] = 65584] = "RepositoryManagerError";
		IModelStatus[IModelStatus["SQLiteError"] = 65585] = "SQLiteError";
		IModelStatus[IModelStatus["TransactionActive"] = 65586] = "TransactionActive";
		IModelStatus[IModelStatus["UnitsMissing"] = 65587] = "UnitsMissing";
		IModelStatus[IModelStatus["UnknownFormat"] = 65588] = "UnknownFormat";
		IModelStatus[IModelStatus["UpgradeFailed"] = 65589] = "UpgradeFailed";
		IModelStatus[IModelStatus["ValidationFailed"] = 65590] = "ValidationFailed";
		IModelStatus[IModelStatus["VersionTooNew"] = 65591] = "VersionTooNew";
		IModelStatus[IModelStatus["VersionTooOld"] = 65592] = "VersionTooOld";
		IModelStatus[IModelStatus["ViewNotFound"] = 65593] = "ViewNotFound";
		IModelStatus[IModelStatus["WriteError"] = 65594] = "WriteError";
		IModelStatus[IModelStatus["WrongClass"] = 65595] = "WrongClass";
		IModelStatus[IModelStatus["WrongIModel"] = 65596] = "WrongIModel";
		IModelStatus[IModelStatus["WrongDomain"] = 65597] = "WrongDomain";
		IModelStatus[IModelStatus["WrongElement"] = 65598] = "WrongElement";
		IModelStatus[IModelStatus["WrongHandler"] = 65599] = "WrongHandler";
		IModelStatus[IModelStatus["WrongModel"] = 65600] = "WrongModel";
		IModelStatus[IModelStatus["ConstraintNotUnique"] = 65601] = "ConstraintNotUnique";
		IModelStatus[IModelStatus["NoGeoLocation"] = 65602] = "NoGeoLocation";
		IModelStatus[IModelStatus["ServerTimeout"] = 65603] = "ServerTimeout";
		IModelStatus[IModelStatus["NoContent"] = 65604] = "NoContent";
		IModelStatus[IModelStatus["NotRegistered"] = 65605] = "NotRegistered";
		IModelStatus[IModelStatus["FunctionNotFound"] = 65606] = "FunctionNotFound";
		IModelStatus[IModelStatus["NoActiveCommand"] = 65607] = "NoActiveCommand";
		IModelStatus[IModelStatus["Aborted"] = 65608] = "Aborted";
	})(IModelStatus || (IModelStatus = {}));
	(function(BriefcaseStatus) {
		BriefcaseStatus[BriefcaseStatus["BRIEFCASE_STATUS_BASE"] = 131072] = "BRIEFCASE_STATUS_BASE";
		BriefcaseStatus[BriefcaseStatus["CannotAcquire"] = 131072] = "CannotAcquire";
		BriefcaseStatus[BriefcaseStatus["CannotDownload"] = 131073] = "CannotDownload";
		BriefcaseStatus[BriefcaseStatus["CannotUpload"] = 131074] = "CannotUpload";
		BriefcaseStatus[BriefcaseStatus["CannotCopy"] = 131075] = "CannotCopy";
		BriefcaseStatus[BriefcaseStatus["CannotDelete"] = 131076] = "CannotDelete";
		BriefcaseStatus[BriefcaseStatus["VersionNotFound"] = 131077] = "VersionNotFound";
		BriefcaseStatus[BriefcaseStatus["CannotApplyChanges"] = 131078] = "CannotApplyChanges";
		BriefcaseStatus[BriefcaseStatus["DownloadCancelled"] = 131079] = "DownloadCancelled";
		BriefcaseStatus[BriefcaseStatus["ContainsDeletedChangeSets"] = 131080] = "ContainsDeletedChangeSets";
	})(BriefcaseStatus || (BriefcaseStatus = {}));
	(function(RpcInterfaceStatus) {
		RpcInterfaceStatus[RpcInterfaceStatus["Success"] = 0] = "Success";
		RpcInterfaceStatus[RpcInterfaceStatus["RPC_INTERFACE_ERROR_BASE"] = 135168] = "RPC_INTERFACE_ERROR_BASE";
		/** The RpcInterface implemented by the server is incompatible with the interface requested by the client. */
		RpcInterfaceStatus[RpcInterfaceStatus["IncompatibleVersion"] = 135168] = "IncompatibleVersion";
	})(RpcInterfaceStatus || (RpcInterfaceStatus = {}));
	(function(ChangeSetStatus) {
		ChangeSetStatus[ChangeSetStatus["Success"] = 0] = "Success";
		ChangeSetStatus[ChangeSetStatus["CHANGESET_ERROR_BASE"] = 90112] = "CHANGESET_ERROR_BASE";
		/** Error applying a change set when reversing or reinstating it */
		ChangeSetStatus[ChangeSetStatus["ApplyError"] = 90113] = "ApplyError";
		/** Change tracking has not been enabled. The ChangeSet API mandates this. */
		ChangeSetStatus[ChangeSetStatus["ChangeTrackingNotEnabled"] = 90114] = "ChangeTrackingNotEnabled";
		/** Contents of the change stream are corrupted and does not match the ChangeSet */
		ChangeSetStatus[ChangeSetStatus["CorruptedChangeStream"] = 90115] = "CorruptedChangeStream";
		/** File containing the changes to the change set is not found */
		ChangeSetStatus[ChangeSetStatus["FileNotFound"] = 90116] = "FileNotFound";
		/** Error writing the contents of the change set to the backing change stream file */
		ChangeSetStatus[ChangeSetStatus["FileWriteError"] = 90117] = "FileWriteError";
		/**  Cannot perform the operation since the Db has local changes */
		ChangeSetStatus[ChangeSetStatus["HasLocalChanges"] = 90118] = "HasLocalChanges";
		/**  Cannot perform the operation since current transaction has uncommitted changes */
		ChangeSetStatus[ChangeSetStatus["HasUncommittedChanges"] = 90119] = "HasUncommittedChanges";
		/**  Invalid ChangeSet Id */
		ChangeSetStatus[ChangeSetStatus["InvalidId"] = 90120] = "InvalidId";
		/**  Invalid version of the change set */
		ChangeSetStatus[ChangeSetStatus["InvalidVersion"] = 90121] = "InvalidVersion";
		/** Cannot perform the operation since system is in the middle of a dynamic transaction */
		ChangeSetStatus[ChangeSetStatus["InDynamicTransaction"] = 90122] = "InDynamicTransaction";
		/** Cannot perform operation since system is in the middle of a creating a change set */
		ChangeSetStatus[ChangeSetStatus["IsCreatingChangeSet"] = 90123] = "IsCreatingChangeSet";
		/** Cannot perform operation since the system is not creating a change set */
		ChangeSetStatus[ChangeSetStatus["IsNotCreatingChangeSet"] = 90124] = "IsNotCreatingChangeSet";
		/** Error propagating the changes after the merge */
		ChangeSetStatus[ChangeSetStatus["MergePropagationError"] = 90125] = "MergePropagationError";
		/** No change sets to merge */
		ChangeSetStatus[ChangeSetStatus["NothingToMerge"] = 90126] = "NothingToMerge";
		/** No transactions are available to create a change set */
		ChangeSetStatus[ChangeSetStatus["NoTransactions"] = 90127] = "NoTransactions";
		/** Parent change set of the Db does not match the parent id of the change set */
		ChangeSetStatus[ChangeSetStatus["ParentMismatch"] = 90128] = "ParentMismatch";
		/** Error performing a SQLite operation on the Db */
		ChangeSetStatus[ChangeSetStatus["SQLiteError"] = 90129] = "SQLiteError";
		/** ChangeSet originated in a different Db */
		ChangeSetStatus[ChangeSetStatus["WrongDgnDb"] = 90130] = "WrongDgnDb";
		/** Could not open the DgnDb to merge change set */
		ChangeSetStatus[ChangeSetStatus["CouldNotOpenDgnDb"] = 90131] = "CouldNotOpenDgnDb";
		/** Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened. */
		ChangeSetStatus[ChangeSetStatus["MergeSchemaChangesOnOpen"] = 90132] = "MergeSchemaChangesOnOpen";
		/** Cannot reverse or reinstate schema changes. */
		ChangeSetStatus[ChangeSetStatus["ReverseOrReinstateSchemaChanges"] = 90133] = "ReverseOrReinstateSchemaChanges";
		/** Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened. */
		ChangeSetStatus[ChangeSetStatus["ProcessSchemaChangesOnOpen"] = 90134] = "ProcessSchemaChangesOnOpen";
		/** Cannot merge changes into a Readonly DgnDb. */
		ChangeSetStatus[ChangeSetStatus["CannotMergeIntoReadonly"] = 90135] = "CannotMergeIntoReadonly";
		/**  Cannot merge changes into a Master DgnDb. */
		ChangeSetStatus[ChangeSetStatus["CannotMergeIntoMaster"] = 90136] = "CannotMergeIntoMaster";
		/** Cannot merge changes into a DgnDb that has reversed change sets. */
		ChangeSetStatus[ChangeSetStatus["CannotMergeIntoReversed"] = 90137] = "CannotMergeIntoReversed";
		/** ChangeSet(s) download was cancelled. */
		ChangeSetStatus[ChangeSetStatus["DownloadCancelled"] = 90138] = "DownloadCancelled";
	})(ChangeSetStatus || (ChangeSetStatus = {}));
	(function(HttpStatus) {
		/** 2xx Success */
		HttpStatus[HttpStatus["Success"] = 0] = "Success";
		/** 1xx Informational responses */
		HttpStatus[HttpStatus["Info"] = 94209] = "Info";
		/** 3xx Redirection */
		HttpStatus[HttpStatus["Redirection"] = 94210] = "Redirection";
		/** 4xx Client errors */
		HttpStatus[HttpStatus["ClientError"] = 94211] = "ClientError";
		/** 5xx Server errors */
		HttpStatus[HttpStatus["ServerError"] = 94212] = "ServerError";
	})(HttpStatus || (HttpStatus = {}));
	(function(IModelHubStatus) {
		IModelHubStatus[IModelHubStatus["Success"] = 0] = "Success";
		IModelHubStatus[IModelHubStatus["IMODELHUBERROR_BASE"] = 102400] = "IMODELHUBERROR_BASE";
		IModelHubStatus[IModelHubStatus["IMODELHUBERROR_REQUESTERRORBASE"] = 102656] = "IMODELHUBERROR_REQUESTERRORBASE";
		IModelHubStatus[IModelHubStatus["Unknown"] = 102401] = "Unknown";
		IModelHubStatus[IModelHubStatus["MissingRequiredProperties"] = 102402] = "MissingRequiredProperties";
		IModelHubStatus[IModelHubStatus["InvalidPropertiesValues"] = 102403] = "InvalidPropertiesValues";
		IModelHubStatus[IModelHubStatus["UserDoesNotHavePermission"] = 102404] = "UserDoesNotHavePermission";
		IModelHubStatus[IModelHubStatus["UserDoesNotHaveAccess"] = 102405] = "UserDoesNotHaveAccess";
		IModelHubStatus[IModelHubStatus["InvalidBriefcase"] = 102406] = "InvalidBriefcase";
		IModelHubStatus[IModelHubStatus["BriefcaseDoesNotExist"] = 102407] = "BriefcaseDoesNotExist";
		IModelHubStatus[IModelHubStatus["BriefcaseDoesNotBelongToUser"] = 102408] = "BriefcaseDoesNotBelongToUser";
		IModelHubStatus[IModelHubStatus["AnotherUserPushing"] = 102409] = "AnotherUserPushing";
		IModelHubStatus[IModelHubStatus["ChangeSetAlreadyExists"] = 102410] = "ChangeSetAlreadyExists";
		IModelHubStatus[IModelHubStatus["ChangeSetDoesNotExist"] = 102411] = "ChangeSetDoesNotExist";
		IModelHubStatus[IModelHubStatus["FileIsNotUploaded"] = 102412] = "FileIsNotUploaded";
		IModelHubStatus[IModelHubStatus["iModelIsNotInitialized"] = 102413] = "iModelIsNotInitialized";
		IModelHubStatus[IModelHubStatus["ChangeSetPointsToBadSeed"] = 102414] = "ChangeSetPointsToBadSeed";
		IModelHubStatus[IModelHubStatus["OperationFailed"] = 102415] = "OperationFailed";
		IModelHubStatus[IModelHubStatus["PullIsRequired"] = 102416] = "PullIsRequired";
		IModelHubStatus[IModelHubStatus["MaximumNumberOfBriefcasesPerUser"] = 102417] = "MaximumNumberOfBriefcasesPerUser";
		IModelHubStatus[IModelHubStatus["MaximumNumberOfBriefcasesPerUserPerMinute"] = 102418] = "MaximumNumberOfBriefcasesPerUserPerMinute";
		IModelHubStatus[IModelHubStatus["DatabaseTemporarilyLocked"] = 102419] = "DatabaseTemporarilyLocked";
		IModelHubStatus[IModelHubStatus["iModelIsLocked"] = 102420] = "iModelIsLocked";
		IModelHubStatus[IModelHubStatus["CodesExist"] = 102421] = "CodesExist";
		IModelHubStatus[IModelHubStatus["LocksExist"] = 102422] = "LocksExist";
		IModelHubStatus[IModelHubStatus["iModelAlreadyExists"] = 102423] = "iModelAlreadyExists";
		IModelHubStatus[IModelHubStatus["iModelDoesNotExist"] = 102424] = "iModelDoesNotExist";
		IModelHubStatus[IModelHubStatus["FileDoesNotExist"] = 102425] = "FileDoesNotExist";
		IModelHubStatus[IModelHubStatus["FileAlreadyExists"] = 102426] = "FileAlreadyExists";
		IModelHubStatus[IModelHubStatus["LockDoesNotExist"] = 102427] = "LockDoesNotExist";
		IModelHubStatus[IModelHubStatus["LockOwnedByAnotherBriefcase"] = 102428] = "LockOwnedByAnotherBriefcase";
		IModelHubStatus[IModelHubStatus["CodeStateInvalid"] = 102429] = "CodeStateInvalid";
		IModelHubStatus[IModelHubStatus["CodeReservedByAnotherBriefcase"] = 102430] = "CodeReservedByAnotherBriefcase";
		IModelHubStatus[IModelHubStatus["CodeDoesNotExist"] = 102431] = "CodeDoesNotExist";
		IModelHubStatus[IModelHubStatus["EventTypeDoesNotExist"] = 102432] = "EventTypeDoesNotExist";
		IModelHubStatus[IModelHubStatus["EventSubscriptionDoesNotExist"] = 102433] = "EventSubscriptionDoesNotExist";
		IModelHubStatus[IModelHubStatus["EventSubscriptionAlreadyExists"] = 102434] = "EventSubscriptionAlreadyExists";
		IModelHubStatus[IModelHubStatus["ITwinIdIsNotSpecified"] = 102435] = "ITwinIdIsNotSpecified";
		IModelHubStatus[IModelHubStatus["FailedToGetITwinPermissions"] = 102436] = "FailedToGetITwinPermissions";
		IModelHubStatus[IModelHubStatus["FailedToGetITwinMembers"] = 102437] = "FailedToGetITwinMembers";
		IModelHubStatus[IModelHubStatus["ChangeSetAlreadyHasVersion"] = 102438] = "ChangeSetAlreadyHasVersion";
		IModelHubStatus[IModelHubStatus["VersionAlreadyExists"] = 102439] = "VersionAlreadyExists";
		IModelHubStatus[IModelHubStatus["JobSchedulingFailed"] = 102440] = "JobSchedulingFailed";
		IModelHubStatus[IModelHubStatus["ConflictsAggregate"] = 102441] = "ConflictsAggregate";
		IModelHubStatus[IModelHubStatus["FailedToGetITwinById"] = 102442] = "FailedToGetITwinById";
		IModelHubStatus[IModelHubStatus["DatabaseOperationFailed"] = 102443] = "DatabaseOperationFailed";
		IModelHubStatus[IModelHubStatus["SeedFileInitializationFailed"] = 102444] = "SeedFileInitializationFailed";
		IModelHubStatus[IModelHubStatus["FailedToGetAssetPermissions"] = 102445] = "FailedToGetAssetPermissions";
		IModelHubStatus[IModelHubStatus["FailedToGetAssetMembers"] = 102446] = "FailedToGetAssetMembers";
		IModelHubStatus[IModelHubStatus["ITwinDoesNotExist"] = 102447] = "ITwinDoesNotExist";
		IModelHubStatus[IModelHubStatus["LockChunkDoesNotExist"] = 102449] = "LockChunkDoesNotExist";
		IModelHubStatus[IModelHubStatus["CheckpointAlreadyExists"] = 102450] = "CheckpointAlreadyExists";
		IModelHubStatus[IModelHubStatus["CheckpointDoesNotExist"] = 102451] = "CheckpointDoesNotExist";
		IModelHubStatus[IModelHubStatus["UndefinedArgumentError"] = 102657] = "UndefinedArgumentError";
		IModelHubStatus[IModelHubStatus["InvalidArgumentError"] = 102658] = "InvalidArgumentError";
		IModelHubStatus[IModelHubStatus["MissingDownloadUrlError"] = 102659] = "MissingDownloadUrlError";
		IModelHubStatus[IModelHubStatus["NotSupportedInBrowser"] = 102660] = "NotSupportedInBrowser";
		IModelHubStatus[IModelHubStatus["FileHandlerNotSet"] = 102661] = "FileHandlerNotSet";
		IModelHubStatus[IModelHubStatus["FileNotFound"] = 102662] = "FileNotFound";
		IModelHubStatus[IModelHubStatus["InitializationTimeout"] = 102663] = "InitializationTimeout";
	})(IModelHubStatus || (IModelHubStatus = {}));
	(function(GeoServiceStatus) {
		GeoServiceStatus[GeoServiceStatus["Success"] = 0] = "Success";
		GeoServiceStatus[GeoServiceStatus["GEOSERVICESTATUS_BASE"] = 147456] = "GEOSERVICESTATUS_BASE";
		GeoServiceStatus[GeoServiceStatus["NoGeoLocation"] = 65602] = "NoGeoLocation";
		GeoServiceStatus[GeoServiceStatus["OutOfUsefulRange"] = 147457] = "OutOfUsefulRange";
		GeoServiceStatus[GeoServiceStatus["OutOfMathematicalDomain"] = 147458] = "OutOfMathematicalDomain";
		GeoServiceStatus[GeoServiceStatus["NoDatumConverter"] = 147459] = "NoDatumConverter";
		GeoServiceStatus[GeoServiceStatus["VerticalDatumConvertError"] = 147460] = "VerticalDatumConvertError";
		GeoServiceStatus[GeoServiceStatus["CSMapError"] = 147461] = "CSMapError";
		/**
		* @deprecated in 5.0 - will not be removed until after 2026-06-13. This status is never returned.
		*/
		GeoServiceStatus[GeoServiceStatus["Pending"] = 147462] = "Pending";
	})(GeoServiceStatus || (GeoServiceStatus = {}));
	(function(RealityDataStatus) {
		RealityDataStatus[RealityDataStatus["Success"] = 0] = "Success";
		RealityDataStatus[RealityDataStatus["REALITYDATA_ERROR_BASE"] = 151552] = "REALITYDATA_ERROR_BASE";
		RealityDataStatus[RealityDataStatus["InvalidData"] = 151553] = "InvalidData";
	})(RealityDataStatus || (RealityDataStatus = {}));
	BentleyError = class BentleyError extends Error {
		errorNumber;
		static iTwinErrorScope = "bentley-error";
		_metaData;
		/**
		* @param errorNumber The a number that identifies of the problem.
		* @param message  message that describes the problem (should not be localized).
		* @param metaData metaData about the exception.
		*/
		constructor(errorNumber, message, metaData) {
			super(message);
			this.errorNumber = errorNumber;
			this.errorNumber = errorNumber;
			this._metaData = metaData;
			this.name = this._initName();
		}
		/** supply the value for iTwinErrorId  */
		get iTwinErrorId() {
			return {
				scope: BentleyError.iTwinErrorScope,
				key: this.name
			};
		}
		/** value for logging metadata */
		get loggingMetadata() {
			return this.getMetaData();
		}
		/**
		* Determine if an error object implements the `LegacyITwinErrorWithNumber` interface.
		*
		* If the test succeeds, the type of `error` is coerced to `T`
		* @note this method does *not* test that the object is an `instanceOf BentleyError`.
		* @beta
		*/
		static isError(error, errorNumber) {
			return ITwinError.isError(error, BentleyError.iTwinErrorScope) && typeof error.errorNumber === "number" && (errorNumber === void 0 || error.errorNumber === errorNumber);
		}
		/** Returns true if this BentleyError includes (optional) metadata. */
		get hasMetaData() {
			return void 0 !== this._metaData;
		}
		/** get the meta data associated with this BentleyError, if any. */
		getMetaData() {
			return BentleyError.getMetaData(this._metaData);
		}
		/** get the metadata object associated with an ExceptionMetaData, if any. */
		static getMetaData(metaData) {
			return typeof metaData === "function" ? metaData() : metaData;
		}
		/** This function returns the name of each error status. Override this method to handle more error status codes. */
		_initName() {
			return BentleyError.getErrorKey(this.errorNumber);
		}
		/** This function returns the name of each error status. */
		static getErrorKey(errorNumber) {
			switch (errorNumber) {
				case IModelStatus.AlreadyLoaded: return "Already Loaded";
				case IModelStatus.AlreadyOpen: return "Already Open";
				case IModelStatus.BadArg: return "Bad Arg";
				case IModelStatus.BadElement: return "Bad Element";
				case IModelStatus.BadModel: return "Bad Model";
				case IModelStatus.BadRequest: return "Bad Request";
				case IModelStatus.BadSchema: return "Bad Schema";
				case IModelStatus.CannotUndo: return "Can not Undo";
				case IModelStatus.CodeNotReserved: return "Code Not Reserved";
				case IModelStatus.DeletionProhibited: return "Deletion Prohibited";
				case IModelStatus.DuplicateCode: return "Duplicate Code";
				case IModelStatus.DuplicateName: return "Duplicate Name";
				case IModelStatus.ElementBlockedChange: return "Element Blocked Change";
				case IModelStatus.FileAlreadyExists: return "File Already Exists";
				case IModelStatus.FileNotFound: return "File Not Found";
				case IModelStatus.FileNotLoaded: return "File Not Loaded";
				case IModelStatus.ForeignKeyConstraint: return "ForeignKey Constraint";
				case IModelStatus.IdExists: return "Id Exists";
				case IModelStatus.InDynamicTransaction: return "InDynamicTransaction";
				case IModelStatus.InvalidCategory: return "Invalid Category";
				case IModelStatus.InvalidCode: return "Invalid Code";
				case IModelStatus.InvalidCodeSpec: return "Invalid CodeSpec";
				case IModelStatus.InvalidId: return "Invalid Id";
				case IModelStatus.InvalidName: return "Invalid Name";
				case IModelStatus.InvalidParent: return "Invalid Parent";
				case IModelStatus.InvalidProfileVersion: return "Invalid Profile Version";
				case IModelStatus.IsCreatingChangeSet: return "IsCreatingChangeSet";
				case IModelStatus.LockNotHeld: return "Lock Not Held";
				case IModelStatus.Mismatch2d3d: return "Mismatch 2d3d";
				case IModelStatus.MismatchGcs: return "Mismatch Gcs";
				case IModelStatus.MissingDomain: return "Missing Domain";
				case IModelStatus.MissingHandler: return "Missing Handler";
				case IModelStatus.MissingId: return "Missing Id";
				case IModelStatus.NoGeometry: return "No Geometry";
				case IModelStatus.NoMultiTxnOperation: return "NoMultiTxnOperation";
				case IModelStatus.NotEnabled: return "Not Enabled";
				case IModelStatus.NotFound: return "Not Found";
				case IModelStatus.NotOpen: return "Not Open";
				case IModelStatus.NotOpenForWrite: return "Not Open For Write";
				case IModelStatus.NotSameUnitBase: return "Not Same Unit Base";
				case IModelStatus.NothingToRedo: return "Nothing To Redo";
				case IModelStatus.NothingToUndo: return "Nothing To Undo";
				case IModelStatus.ParentBlockedChange: return "Parent Blocked Change";
				case IModelStatus.ReadError: return "Read Error";
				case IModelStatus.ReadOnly: return "ReadOnly";
				case IModelStatus.ReadOnlyDomain: return "ReadOnlyDomain";
				case IModelStatus.RepositoryManagerError: return "RepositoryManagerError";
				case IModelStatus.SQLiteError: return "SQLiteError";
				case IModelStatus.TransactionActive: return "Transaction Active";
				case IModelStatus.UnitsMissing: return "Units Missing";
				case IModelStatus.UnknownFormat: return "Unknown Format";
				case IModelStatus.UpgradeFailed: return "Upgrade Failed";
				case IModelStatus.ValidationFailed: return "Validation Failed";
				case IModelStatus.VersionTooNew: return "Version Too New";
				case IModelStatus.VersionTooOld: return "Version Too Old";
				case IModelStatus.ViewNotFound: return "View Not Found";
				case IModelStatus.WriteError: return "Write Error";
				case IModelStatus.WrongClass: return "Wrong Class";
				case IModelStatus.WrongIModel: return "Wrong IModel";
				case IModelStatus.WrongDomain: return "Wrong Domain";
				case IModelStatus.WrongElement: return "Wrong Element";
				case IModelStatus.WrongHandler: return "Wrong Handler";
				case IModelStatus.WrongModel: return "Wrong Model";
				case DbResult.BE_SQLITE_ERROR: return "BE_SQLITE_ERROR";
				case DbResult.BE_SQLITE_INTERNAL: return "BE_SQLITE_INTERNAL";
				case DbResult.BE_SQLITE_PERM: return "BE_SQLITE_PERM";
				case DbResult.BE_SQLITE_ABORT: return "BE_SQLITE_ABORT";
				case DbResult.BE_SQLITE_BUSY: return "Db is busy";
				case DbResult.BE_SQLITE_LOCKED: return "Db is Locked";
				case DbResult.BE_SQLITE_NOMEM: return "BE_SQLITE_NOMEM";
				case DbResult.BE_SQLITE_READONLY: return "Readonly";
				case DbResult.BE_SQLITE_INTERRUPT: return "BE_SQLITE_INTERRUPT";
				case DbResult.BE_SQLITE_IOERR: return "BE_SQLITE_IOERR";
				case DbResult.BE_SQLITE_CORRUPT: return "BE_SQLITE_CORRUPT";
				case DbResult.BE_SQLITE_NOTFOUND: return "Not Found";
				case DbResult.BE_SQLITE_FULL: return "BE_SQLITE_FULL";
				case DbResult.BE_SQLITE_CANTOPEN: return "Can't open";
				case DbResult.BE_SQLITE_PROTOCOL: return "BE_SQLITE_PROTOCOL";
				case DbResult.BE_SQLITE_EMPTY: return "BE_SQLITE_EMPTY";
				case DbResult.BE_SQLITE_SCHEMA: return "BE_SQLITE_SCHEMA";
				case DbResult.BE_SQLITE_TOOBIG: return "BE_SQLITE_TOOBIG";
				case DbResult.BE_SQLITE_MISMATCH: return "BE_SQLITE_MISMATCH";
				case DbResult.BE_SQLITE_MISUSE: return "BE_SQLITE_MISUSE";
				case DbResult.BE_SQLITE_NOLFS: return "BE_SQLITE_NOLFS";
				case DbResult.BE_SQLITE_AUTH: return "BE_SQLITE_AUTH";
				case DbResult.BE_SQLITE_FORMAT: return "BE_SQLITE_FORMAT";
				case DbResult.BE_SQLITE_RANGE: return "BE_SQLITE_RANGE";
				case DbResult.BE_SQLITE_NOTADB: return "Not a Database";
				case DbResult.BE_SQLITE_IOERR_READ: return "BE_SQLITE_IOERR_READ";
				case DbResult.BE_SQLITE_IOERR_SHORT_READ: return "BE_SQLITE_IOERR_SHORT_READ";
				case DbResult.BE_SQLITE_IOERR_WRITE: return "BE_SQLITE_IOERR_WRITE";
				case DbResult.BE_SQLITE_IOERR_FSYNC: return "BE_SQLITE_IOERR_FSYNC";
				case DbResult.BE_SQLITE_IOERR_DIR_FSYNC: return "BE_SQLITE_IOERR_DIR_FSYNC";
				case DbResult.BE_SQLITE_IOERR_TRUNCATE: return "BE_SQLITE_IOERR_TRUNCATE";
				case DbResult.BE_SQLITE_IOERR_FSTAT: return "BE_SQLITE_IOERR_FSTAT";
				case DbResult.BE_SQLITE_IOERR_UNLOCK: return "BE_SQLITE_IOERR_UNLOCK";
				case DbResult.BE_SQLITE_IOERR_RDLOCK: return "BE_SQLITE_IOERR_RDLOCK";
				case DbResult.BE_SQLITE_IOERR_DELETE: return "BE_SQLITE_IOERR_DELETE";
				case DbResult.BE_SQLITE_IOERR_BLOCKED: return "BE_SQLITE_IOERR_BLOCKED";
				case DbResult.BE_SQLITE_IOERR_NOMEM: return "BE_SQLITE_IOERR_NOMEM";
				case DbResult.BE_SQLITE_IOERR_ACCESS: return "BE_SQLITE_IOERR_ACCESS";
				case DbResult.BE_SQLITE_IOERR_CHECKRESERVEDLOCK: return "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
				case DbResult.BE_SQLITE_IOERR_LOCK: return "BE_SQLITE_IOERR_LOCK";
				case DbResult.BE_SQLITE_IOERR_CLOSE: return "BE_SQLITE_IOERR_CLOSE";
				case DbResult.BE_SQLITE_IOERR_DIR_CLOSE: return "BE_SQLITE_IOERR_DIR_CLOSE";
				case DbResult.BE_SQLITE_IOERR_SHMOPEN: return "BE_SQLITE_IOERR_SHMOPEN";
				case DbResult.BE_SQLITE_IOERR_SHMSIZE: return "BE_SQLITE_IOERR_SHMSIZE";
				case DbResult.BE_SQLITE_IOERR_SHMLOCK: return "BE_SQLITE_IOERR_SHMLOCK";
				case DbResult.BE_SQLITE_IOERR_SHMMAP: return "BE_SQLITE_IOERR_SHMMAP";
				case DbResult.BE_SQLITE_IOERR_SEEK: return "BE_SQLITE_IOERR_SEEK";
				case DbResult.BE_SQLITE_IOERR_DELETE_NOENT: return "BE_SQLITE_IOERR_DELETE_NOENT";
				case DbResult.BE_SQLITE_ERROR_DataTransformRequired: return "Schema update require to transform data";
				case DbResult.BE_SQLITE_ERROR_FileExists: return "File Exists";
				case DbResult.BE_SQLITE_ERROR_AlreadyOpen: return "Already Open";
				case DbResult.BE_SQLITE_ERROR_NoPropertyTable: return "No Property Table";
				case DbResult.BE_SQLITE_ERROR_FileNotFound: return "File Not Found";
				case DbResult.BE_SQLITE_ERROR_NoTxnActive: return "No Txn Active";
				case DbResult.BE_SQLITE_ERROR_BadDbProfile: return "Bad Db Profile";
				case DbResult.BE_SQLITE_ERROR_InvalidProfileVersion: return "Invalid Profile Version";
				case DbResult.BE_SQLITE_ERROR_ProfileUpgradeFailed: return "Profile Upgrade Failed";
				case DbResult.BE_SQLITE_ERROR_ProfileTooOldForReadWrite: return "Profile Too Old For ReadWrite";
				case DbResult.BE_SQLITE_ERROR_ProfileTooOld: return "Profile Too Old";
				case DbResult.BE_SQLITE_ERROR_ProfileTooNewForReadWrite: return "Profile Too New For ReadWrite";
				case DbResult.BE_SQLITE_ERROR_ProfileTooNew: return "Profile Too New";
				case DbResult.BE_SQLITE_ERROR_ChangeTrackError: return "ChangeTrack Error";
				case DbResult.BE_SQLITE_ERROR_InvalidChangeSetVersion: return "Invalid ChangeSet Version";
				case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRequired: return "Schema Upgrade Required";
				case DbResult.BE_SQLITE_ERROR_SchemaTooNew: return "Schema Too New";
				case DbResult.BE_SQLITE_ERROR_SchemaTooOld: return "Schema Too Old";
				case DbResult.BE_SQLITE_ERROR_SchemaLockFailed: return "Schema Lock Failed";
				case DbResult.BE_SQLITE_ERROR_SchemaUpgradeFailed: return "Schema Upgrade Failed";
				case DbResult.BE_SQLITE_ERROR_SchemaImportFailed: return "Schema Import Failed";
				case DbResult.BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes: return "Could Not Acquire Locks Or Codes";
				case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRecommended: return "Recommended that the schemas found in the database be upgraded";
				case DbResult.BE_SQLITE_LOCKED_SHAREDCACHE: return "BE_SQLITE_LOCKED_SHAREDCACHE";
				case DbResult.BE_SQLITE_BUSY_RECOVERY: return "BE_SQLITE_BUSY_RECOVERY";
				case DbResult.BE_SQLITE_CANTOPEN_NOTEMPDIR: return "SQLite No Temp Dir";
				case DbResult.BE_SQLITE_CANTOPEN_ISDIR: return "BE_SQLITE_CANTOPEN_ISDIR";
				case DbResult.BE_SQLITE_CANTOPEN_FULLPATH: return "BE_SQLITE_CANTOPEN_FULLPATH";
				case DbResult.BE_SQLITE_CORRUPT_VTAB: return "BE_SQLITE_CORRUPT_VTAB";
				case DbResult.BE_SQLITE_READONLY_RECOVERY: return "BE_SQLITE_READONLY_RECOVERY";
				case DbResult.BE_SQLITE_READONLY_CANTLOCK: return "BE_SQLITE_READONLY_CANTLOCK";
				case DbResult.BE_SQLITE_READONLY_ROLLBACK: return "BE_SQLITE_READONLY_ROLLBACK";
				case DbResult.BE_SQLITE_ABORT_ROLLBACK: return "BE_SQLITE_ABORT_ROLLBACK";
				case DbResult.BE_SQLITE_CONSTRAINT_CHECK: return "BE_SQLITE_CONSTRAINT_CHECK";
				case DbResult.BE_SQLITE_CONSTRAINT_COMMITHOOK: return "CommitHook Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_FOREIGNKEY: return "Foreign Key Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_FUNCTION: return "Function Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_NOTNULL: return "NotNull Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_PRIMARYKEY: return "Primary Key Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_TRIGGER: return "Trigger Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_UNIQUE: return "Unique Constraint Error";
				case DbResult.BE_SQLITE_CONSTRAINT_VTAB: return "VTable Constraint Error";
				case BentleyStatus.ERROR: return "Error";
				case BriefcaseStatus.CannotAcquire: return "CannotAcquire";
				case BriefcaseStatus.CannotDownload: return "CannotDownload";
				case BriefcaseStatus.CannotCopy: return "CannotCopy";
				case BriefcaseStatus.CannotDelete: return "CannotDelete";
				case BriefcaseStatus.VersionNotFound: return "VersionNotFound";
				case BriefcaseStatus.DownloadCancelled: return "DownloadCancelled";
				case BriefcaseStatus.ContainsDeletedChangeSets: return "ContainsDeletedChangeSets";
				case RpcInterfaceStatus.IncompatibleVersion: return "RpcInterfaceStatus.IncompatibleVersion";
				case ChangeSetStatus.ApplyError: return "Error applying a change set";
				case ChangeSetStatus.ChangeTrackingNotEnabled: return "Change tracking has not been enabled. The ChangeSet API mandates this";
				case ChangeSetStatus.CorruptedChangeStream: return "Contents of the change stream are corrupted and does not match the ChangeSet";
				case ChangeSetStatus.FileNotFound: return "File containing the changes was not found";
				case ChangeSetStatus.FileWriteError: return "Error writing the contents of the change set to the backing change stream file";
				case ChangeSetStatus.HasLocalChanges: return "Cannot perform the operation since the Db has local changes";
				case ChangeSetStatus.HasUncommittedChanges: return "Cannot perform the operation since current transaction has uncommitted changes";
				case ChangeSetStatus.InvalidId: return "Invalid ChangeSet Id";
				case ChangeSetStatus.InvalidVersion: return "Invalid version of the change set";
				case ChangeSetStatus.InDynamicTransaction: return "Cannot perform the operation since system is in the middle of a dynamic transaction";
				case ChangeSetStatus.IsCreatingChangeSet: return "Cannot perform operation since system is in the middle of a creating a change set";
				case ChangeSetStatus.IsNotCreatingChangeSet: return "Cannot perform operation since the system is not creating a change set";
				case ChangeSetStatus.MergePropagationError: return "Error propagating the changes after the merge";
				case ChangeSetStatus.NothingToMerge: return "No change sets to merge";
				case ChangeSetStatus.NoTransactions: return "No transactions are available to create a change set";
				case ChangeSetStatus.ParentMismatch: return "Parent change set of the Db does not match the parent id of the change set";
				case ChangeSetStatus.SQLiteError: return "Error performing a SQLite operation on the Db";
				case ChangeSetStatus.WrongDgnDb: return "ChangeSet originated in a different Db";
				case ChangeSetStatus.CouldNotOpenDgnDb: return "Could not open the DgnDb to merge change set";
				case ChangeSetStatus.MergeSchemaChangesOnOpen: return "Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
				case ChangeSetStatus.ReverseOrReinstateSchemaChanges: return "Cannot reverse or reinstate schema changes.";
				case ChangeSetStatus.ProcessSchemaChangesOnOpen: return "Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
				case ChangeSetStatus.CannotMergeIntoReadonly: return "Cannot merge changes into a Readonly DgnDb";
				case ChangeSetStatus.CannotMergeIntoMaster: return "Cannot merge changes into a Master DgnDb";
				case ChangeSetStatus.CannotMergeIntoReversed: return "Cannot merge changes into a DgnDb that has reversed change sets";
				case ChangeSetStatus.DownloadCancelled: return "ChangeSet(s) download was cancelled.";
				case RepositoryStatus.ServerUnavailable: return "ServerUnavailable";
				case RepositoryStatus.LockAlreadyHeld: return "LockAlreadyHeld";
				case RepositoryStatus.SyncError: return "SyncError";
				case RepositoryStatus.InvalidResponse: return "InvalidResponse";
				case RepositoryStatus.PendingTransactions: return "PendingTransactions";
				case RepositoryStatus.LockUsed: return "LockUsed";
				case RepositoryStatus.CannotCreateChangeSet: return "CannotCreateChangeSet";
				case RepositoryStatus.InvalidRequest: return "InvalidRequest";
				case RepositoryStatus.ChangeSetRequired: return "ChangeSetRequired";
				case RepositoryStatus.CodeUnavailable: return "CodeUnavailable";
				case RepositoryStatus.CodeNotReserved: return "CodeNotReserved";
				case RepositoryStatus.CodeUsed: return "CodeUsed";
				case RepositoryStatus.LockNotHeld: return "LockNotHeld";
				case RepositoryStatus.RepositoryIsLocked: return "RepositoryIsLocked";
				case RepositoryStatus.ChannelConstraintViolation: return "ChannelConstraintViolation";
				case HttpStatus.Info: return "HTTP Info";
				case HttpStatus.Redirection: return "HTTP Redirection";
				case HttpStatus.ClientError: return "HTTP Client error";
				case HttpStatus.ServerError: return "HTTP Server error";
				case IModelHubStatus.Unknown: return "Unknown error";
				case IModelHubStatus.MissingRequiredProperties: return "Missing required properties";
				case IModelHubStatus.InvalidPropertiesValues: return "Invalid properties values";
				case IModelHubStatus.UserDoesNotHavePermission: return "User does not have permission";
				case IModelHubStatus.UserDoesNotHaveAccess: return "User does not have access";
				case IModelHubStatus.InvalidBriefcase: return "Invalid briefcase";
				case IModelHubStatus.BriefcaseDoesNotExist: return "Briefcase does not exist";
				case IModelHubStatus.BriefcaseDoesNotBelongToUser: return "Briefcase does not belong to user";
				case IModelHubStatus.AnotherUserPushing: return "Another user pushing";
				case IModelHubStatus.ChangeSetAlreadyExists: return "ChangeSet already exists";
				case IModelHubStatus.ChangeSetDoesNotExist: return "ChangeSet does not exist";
				case IModelHubStatus.FileIsNotUploaded: return "File is not uploaded";
				case IModelHubStatus.iModelIsNotInitialized: return "iModel is not initialized";
				case IModelHubStatus.ChangeSetPointsToBadSeed: return "ChangeSet points to a bad seed file";
				case IModelHubStatus.OperationFailed: return "iModelHub operation has failed";
				case IModelHubStatus.PullIsRequired: return "Pull is required";
				case IModelHubStatus.MaximumNumberOfBriefcasesPerUser: return "Limit of briefcases per user was reached";
				case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute: return "Limit of briefcases per user per minute was reached";
				case IModelHubStatus.DatabaseTemporarilyLocked: return "Database is temporarily locked";
				case IModelHubStatus.iModelIsLocked: return "iModel is locked";
				case IModelHubStatus.CodesExist: return "Code already exists";
				case IModelHubStatus.LocksExist: return "Lock already exists";
				case IModelHubStatus.iModelAlreadyExists: return "iModel already exists";
				case IModelHubStatus.iModelDoesNotExist: return "iModel does not exist";
				case IModelHubStatus.LockDoesNotExist: return "Lock does not exist";
				case IModelHubStatus.LockChunkDoesNotExist: return "Lock chunk does not exist";
				case IModelHubStatus.LockOwnedByAnotherBriefcase: return "Lock is owned by another briefcase";
				case IModelHubStatus.CodeStateInvalid: return "Code state is invalid";
				case IModelHubStatus.CodeReservedByAnotherBriefcase: return "Code is reserved by another briefcase";
				case IModelHubStatus.CodeDoesNotExist: return "Code does not exist";
				case IModelHubStatus.FileDoesNotExist: return "File does not exist";
				case IModelHubStatus.FileAlreadyExists: return "File already exists";
				case IModelHubStatus.EventTypeDoesNotExist: return "Event type does not exist";
				case IModelHubStatus.EventSubscriptionDoesNotExist: return "Event subscription does not exist";
				case IModelHubStatus.EventSubscriptionAlreadyExists: return "Event subscription already exists";
				case IModelHubStatus.ITwinIdIsNotSpecified: return "ITwin Id is not specified";
				case IModelHubStatus.FailedToGetITwinPermissions: return "Failed to get iTwin permissions";
				case IModelHubStatus.FailedToGetITwinMembers: return "Failed to get iTwin members";
				case IModelHubStatus.FailedToGetAssetPermissions: return "Failed to get asset permissions";
				case IModelHubStatus.FailedToGetAssetMembers: return "Failed to get asset members";
				case IModelHubStatus.ChangeSetAlreadyHasVersion: return "ChangeSet already has version";
				case IModelHubStatus.VersionAlreadyExists: return "Version already exists";
				case IModelHubStatus.JobSchedulingFailed: return "Failed to schedule a background job";
				case IModelHubStatus.ConflictsAggregate: return "Codes or locks are owned by another briefcase";
				case IModelHubStatus.FailedToGetITwinById: return "Failed to query iTwin by its id";
				case IModelHubStatus.DatabaseOperationFailed: return "Database operation has failed";
				case IModelHubStatus.ITwinDoesNotExist: return "ITwin does not exist";
				case IModelHubStatus.UndefinedArgumentError: return "Undefined argument";
				case IModelHubStatus.InvalidArgumentError: return "Invalid argument";
				case IModelHubStatus.MissingDownloadUrlError: return "Missing download url";
				case IModelHubStatus.NotSupportedInBrowser: return "Not supported in browser";
				case IModelHubStatus.FileHandlerNotSet: return "File handler is not set";
				case IModelHubStatus.FileNotFound: return "File not found";
				case GeoServiceStatus.NoGeoLocation: return "No GeoLocation";
				case GeoServiceStatus.OutOfUsefulRange: return "Out of useful range";
				case GeoServiceStatus.OutOfMathematicalDomain: return "Out of mathematical domain";
				case GeoServiceStatus.NoDatumConverter: return "No datum converter";
				case GeoServiceStatus.VerticalDatumConvertError: return "Vertical datum convert error";
				case GeoServiceStatus.CSMapError: return "CSMap error";
				case GeoServiceStatus.Pending: return "Pending";
				case RealityDataStatus.InvalidData: return "Invalid or unknown data";
				case DbResult.BE_SQLITE_OK:
				case DbResult.BE_SQLITE_ROW:
				case DbResult.BE_SQLITE_DONE:
				case BentleyStatus.SUCCESS: return "Success";
				default: return `Error (${errorNumber})`;
			}
		}
		/** Use run-time type checking to safely get a useful string summary of an unknown error value, or `""` if none exists.
		* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
		* @public
		*/
		static getErrorMessage(error) {
			if (typeof error === "string") return error;
			if (error instanceof Error) return error.toString();
			if (JsonUtils.isObject(error)) {
				if (typeof error.message === "string") return error.message;
				if (typeof error.msg === "string") return error.msg;
				if (error.toString() !== "[object Object]") return error.toString();
			}
			return "";
		}
		/** Use run-time type checking to safely get the call stack of an unknown error value, if possible.
		* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
		* @public
		*/
		static getErrorStack(error) {
			if (JsonUtils.isObject(error) && typeof error.stack === "string") return error.stack;
		}
		/** Use run-time type checking to safely get the metadata with an unknown error value, if possible.
		* @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof BentleyError`
		* @see [[BentleyError.getMetaData]]
		* @public
		*/
		static getErrorMetadata(error) {
			if (JsonUtils.isObject(error) && typeof error.getMetaData === "function") {
				const metadata = error.getMetaData();
				if (typeof metadata === "object" && metadata !== null) return metadata;
			}
		}
		/** Returns a new `ErrorProps` object representing an unknown error value.  Useful for logging or wrapping/re-throwing caught errors.
		* @note Unlike `Error` objects (which lose messages and call stacks when serialized to JSON), objects
		*       returned by this are plain old JavaScript objects, and can be easily logged/serialized to JSON.
		* @public
		*/
		static getErrorProps(error) {
			const serialized = { message: BentleyError.getErrorMessage(error) };
			const stack = BentleyError.getErrorStack(error);
			if (stack) serialized.stack = stack;
			const metadata = BentleyError.getErrorMetadata(error);
			if (metadata) serialized.metadata = metadata;
			return serialized;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BentleyLoggerCategory.js
var BentleyLoggerCategory;
var init_BentleyLoggerCategory = __esmMin((() => {
	(function(BentleyLoggerCategory) {
		/** The logger category used by common classes relating to ElementProps. */
		BentleyLoggerCategory["Performance"] = "Performance";
	})(BentleyLoggerCategory || (BentleyLoggerCategory = {}));
})), LogLevel, Logger;
var init_Logger = __esmMin((() => {
	init_BeEvent();
	init_BentleyError();
	init_BentleyLoggerCategory();
	(function(LogLevel) {
		/** Tracing and debugging - low level */
		LogLevel[LogLevel["Trace"] = 0] = "Trace";
		/** Information - mid level */
		LogLevel[LogLevel["Info"] = 1] = "Info";
		/** Warnings - high level */
		LogLevel[LogLevel["Warning"] = 2] = "Warning";
		/** Errors - highest level */
		LogLevel[LogLevel["Error"] = 3] = "Error";
		/** Higher than any real logging level. This is used to turn a category off. */
		LogLevel[LogLevel["None"] = 4] = "None";
	})(LogLevel || (LogLevel = {}));
	Logger = class Logger {
		static _logError;
		static _logWarning;
		static _logInfo;
		static _logTrace;
		static _onLogLevelChanged;
		static _staticMetaData = /* @__PURE__ */ new Map();
		/** An event raised whenever [[setLevel]] or [[setLevelDefault]] is called. */
		static get onLogLevelChanged() {
			if (void 0 === Logger._onLogLevelChanged) Logger._onLogLevelChanged = new BeEvent();
			return Logger._onLogLevelChanged;
		}
		static _categoryFilter = {};
		/** Maps category names to the least severe level at which messages in that category should be displayed,
		* or `undefined` if a minimum has not been defined.
		* @see [[setLevel]] to change the minimum logging level for a category.
		*/
		static get categoryFilter() {
			return this._categoryFilter;
		}
		static _minLevel;
		/** The least severe level at which messages should be displayed by default.
		* @see [[setLevelDefault]] to change this default.
		* @see [[setLevel]] to override this default for specific categories.
		*/
		static get minLevel() {
			return this._minLevel;
		}
		/** Should the call stack be included when an exception is logged?  */
		static logExceptionCallstacks = false;
		/** Contains metadata that should be included with every logged message.
		* @beta
		*/
		static get staticMetaData() {
			return this._staticMetaData;
		}
		/** Initialize the logger streams. Should be called at application initialization time. */
		static initialize(logError, logWarning, logInfo, logTrace) {
			Logger._logError = logError;
			Logger._logWarning = logWarning;
			Logger._logInfo = logInfo;
			Logger._logTrace = logTrace;
			Logger.turnOffLevelDefault();
			Logger.turnOffCategories();
		}
		/** Initialize the logger to output to the console. */
		static initializeToConsole() {
			const logConsole = (level) => (category, message, metaData) => console.log(`${level} | ${category} | ${message} ${Logger.stringifyMetaData(metaData)}`);
			Logger.initialize(logConsole("Error"), logConsole("Warning"), logConsole("Info"), logConsole("Trace"));
		}
		/** merge the supplied metadata with all static metadata into one object */
		static getMetaData(metaData) {
			const metaObj = {};
			for (const meta of this._staticMetaData) {
				const val = BentleyError.getMetaData(meta[1]);
				if (val) Object.assign(metaObj, val);
			}
			Object.assign(metaObj, BentleyError.getMetaData(metaData));
			return metaObj;
		}
		/** stringify the metadata for a log message by merging the supplied metadata with all static metadata into one object that is then `JSON.stringify`ed. */
		static stringifyMetaData(metaData) {
			const metaObj = this.getMetaData(metaData);
			return Object.keys(metaObj).length > 0 ? JSON.stringify(metaObj) : "";
		}
		/** Set the least severe level at which messages should be displayed by default. Call setLevel to override this default setting for specific categories. */
		static setLevelDefault(minLevel) {
			this._minLevel = minLevel;
			this.onLogLevelChanged.raiseEvent();
		}
		/** Set the minimum logging level for the specified category. The minimum level is least severe level at which messages in the
		* specified category should be displayed.
		*/
		static setLevel(category, minLevel) {
			Logger._categoryFilter[category] = minLevel;
			this.onLogLevelChanged.raiseEvent();
		}
		/** Interpret a string as the name of a LogLevel */
		static parseLogLevel(str) {
			switch (str.toUpperCase()) {
				case "EXCEPTION": return LogLevel.Error;
				case "FATAL": return LogLevel.Error;
				case "ERROR": return LogLevel.Error;
				case "WARNING": return LogLevel.Warning;
				case "INFO": return LogLevel.Info;
				case "TRACE": return LogLevel.Trace;
				case "DEBUG": return LogLevel.Trace;
			}
			return LogLevel.None;
		}
		/** Set the log level for multiple categories at once. Also see [[validateProps]] */
		static configureLevels(cfg) {
			Logger.validateProps(cfg);
			if (cfg.defaultLevel !== void 0) this.setLevelDefault(Logger.parseLogLevel(cfg.defaultLevel));
			if (cfg.categoryLevels !== void 0) for (const cl of cfg.categoryLevels) this.setLevel(cl.category, Logger.parseLogLevel(cl.logLevel));
		}
		static isLogLevel(v) {
			return LogLevel.hasOwnProperty(v);
		}
		/** Check that the specified object is a valid LoggerLevelsConfig. This is useful when reading a config from a .json file. */
		static validateProps(config) {
			const validProps = ["defaultLevel", "categoryLevels"];
			for (const prop of Object.keys(config)) {
				if (!validProps.includes(prop)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig - unrecognized property: ${prop}`);
				if (prop === "defaultLevel") {
					if (!Logger.isLogLevel(config.defaultLevel)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.defaultLevel must be a LogLevel. Invalid value: ${JSON.stringify(config.defaultLevel)}`);
				} else if (prop === "categoryLevels") {
					const value = config[prop];
					if (!Array.isArray(value)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels must be an array. Invalid value: ${JSON.stringify(value)}`);
					for (const item of config[prop]) {
						if (!item.hasOwnProperty("category") || !item.hasOwnProperty("logLevel")) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item must be a LoggerCategoryAndLevel {category: logLevel:}. Invalid value: ${JSON.stringify(item)}`);
						if (!Logger.isLogLevel(item.logLevel)) throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item's logLevel property must be a LogLevel. Invalid value: ${JSON.stringify(item.logLevel)}`);
					}
				}
			}
		}
		/** Get the minimum logging level for the specified category. */
		static getLevel(category) {
			const minLevelForThisCategory = Logger.categoryFilter[category];
			if (minLevelForThisCategory !== void 0) return minLevelForThisCategory;
			const parent = category.lastIndexOf(".");
			if (parent !== -1) return Logger.getLevel(category.slice(0, parent));
			return Logger.minLevel;
		}
		/** Turns off the least severe level at which messages should be displayed by default.
		* This turns off logging for all messages for which no category minimum level is defined.
		*/
		static turnOffLevelDefault() {
			Logger._minLevel = void 0;
		}
		/** Turns off all category level filters previously defined with [[Logger.setLevel]].
		*/
		static turnOffCategories() {
			Logger._categoryFilter = {};
		}
		/** Check if messages in the specified category should be displayed at this level of severity. */
		static isEnabled(category, level) {
			const minLevel = Logger.getLevel(category);
			return minLevel !== void 0 && level >= minLevel;
		}
		static logError(category, messageOrError, metaData) {
			if (Logger._logError && Logger.isEnabled(category, LogLevel.Error)) if (typeof messageOrError === "string") Logger._logError(category, messageOrError, metaData);
			else if (BentleyError.isError(messageOrError)) Logger._logError(category, Logger.getExceptionMessage(messageOrError), () => ({
				...BentleyError.getErrorMetadata(messageOrError),
				exceptionType: messageOrError?.constructor?.name ?? "<Unknown>",
				...BentleyError.getMetaData(metaData)
			}));
			else Logger._logError(category, Logger.getExceptionMessage(messageOrError), Logger.getExceptionMetaData(messageOrError, metaData));
		}
		/**
		* Get a sting message for a given error.
		* For legacy [[BentleyError]] exceptions, this will include the error message and, optionally, the call stack.
		* For other exceptions, this will include the stringified version of the error.
		* @param error The error to get the message for
		* @returns A string message for the error
		*/
		static getExceptionMessage(error) {
			if (error === void 0) return "Error: error is undefined.";
			if (error === null) return "Error: error is null.";
			const stack = Logger.logExceptionCallstacks ? `\n${BentleyError.getErrorStack(error)}` : "";
			return BentleyError.getErrorMessage(error) + stack;
		}
		/**
		* Merged passed metaData with error properties into one LoggingMetaData, with the passed metaData taking precedence in case of conflict.
		* @param error The error to be logged as metadata
		* @param metaData Optional metadata to be merged with the error
		* @returns A function returning the merged metadata
		*/
		static getExceptionMetaData(error, metaData) {
			const exceptionType = error?.constructor?.name ?? "<Unknown>";
			if (metaData === void 0) return () => ({
				exceptionType,
				...error
			});
			return () => ({
				exceptionType,
				...error,
				...BentleyError.getMetaData(metaData)
			});
		}
		/** Log the specified exception.
		* For legacy [[BentleyError]] exceptions, the special "exceptionType" property will be added as metadata. Otherwise, all enumerable members of the exception are logged as metadata.
		* @param category  The category of the message.
		* @param err  The exception object.
		* @param log The logger output function to use - defaults to Logger.logError
		* @deprecated in 5.6 - will not be removed until after 2027-03-03. Use logError(category, error, metaData) instead, which will log exceptions in the same way but is more flexible and easier to use.
		*/
		static logException(category, err, log = (_category, message, metaData) => Logger.logError(_category, message, metaData)) {
			log(category, Logger.getExceptionMessage(err), () => {
				if (BentleyError.isError(err)) return {
					...BentleyError.getErrorMetadata(err),
					exceptionType: err?.constructor?.name ?? "<Unknown>"
				};
				return { ...err };
			});
		}
		/** Log the specified message to the **warning** stream.
		* @param category  The category of the message.
		* @param message  The message.
		* @param metaData  Optional data for the message
		*/
		static logWarning(category, message, metaData) {
			if (Logger._logWarning && Logger.isEnabled(category, LogLevel.Warning)) Logger._logWarning(category, message, metaData);
		}
		/** Log the specified message to the **info** stream.
		* @param category  The category of the message.
		* @param message  The message.
		* @param metaData  Optional data for the message
		*/
		static logInfo(category, message, metaData) {
			if (Logger._logInfo && Logger.isEnabled(category, LogLevel.Info)) Logger._logInfo(category, message, metaData);
		}
		/** Log the specified message to the **trace** stream.
		* @param category  The category of the message.
		* @param message  The message.
		* @param metaData  Optional data for the message
		*/
		static logTrace(category, message, metaData) {
			if (Logger._logTrace && Logger.isEnabled(category, LogLevel.Trace)) Logger._logTrace(category, message, metaData);
		}
	};
	(class PerfLogger {
		static _severity = LogLevel.Info;
		_operation;
		_metaData;
		_startTimeStamp;
		constructor(operation, metaData) {
			this._operation = operation;
			this._metaData = metaData;
			if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity)) {
				this._startTimeStamp = 0;
				return;
			}
			Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},START`, this._metaData);
			this._startTimeStamp = (/* @__PURE__ */ new Date()).getTime();
		}
		logMessage() {
			const endTimeStamp = (/* @__PURE__ */ new Date()).getTime();
			if (!Logger.isEnabled(BentleyLoggerCategory.Performance, PerfLogger._severity)) return;
			Logger.logInfo(BentleyLoggerCategory.Performance, `${this._operation},END`, () => {
				return {
					...this._metaData ? BentleyError.getMetaData(this._metaData) : {},
					TimeElapsed: endTimeStamp - this._startTimeStamp
				};
			});
		}
		[Symbol.dispose]() {
			this.logMessage();
		}
		/** @deprecated in 5.0 - will not be removed until after 2026-06-13. Use [Symbol.dispose] instead. */
		dispose() {
			this[Symbol.dispose]();
		}
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/UnexpectedErrors.js
var UnexpectedErrors;
var init_UnexpectedErrors = __esmMin((() => {
	init_Logger();
	UnexpectedErrors = class {
		/** handler for re-throwing exceptions directly */
		static reThrowImmediate = (e) => {
			throw e;
		};
		/** handler for re-throwing exceptions from an asynchronous interval (so the current call stack is not aborted) */
		static reThrowDeferred = (e) => setTimeout(() => {
			throw e;
		}, 0);
		/** handler for logging exception to console */
		static consoleLog = (e) => console.error(e);
		/** handler for logging exception with [[Logger]] */
		static errorLog = (e) => Logger.logError("unhandled", e);
		static _telemetry = [];
		static _handler = this.errorLog;
		constructor() {}
		/** Add a "telemetry tracker" for unexpected errors. Useful for tracking/reporting errors without changing handler.
		* @returns a method to remove the tracker
		*/
		static addTelemetry(tracker) {
			this._telemetry.push(tracker);
			return () => this._telemetry.splice(this._telemetry.indexOf(tracker), 1);
		}
		/** call this method when an unexpected error happens so the global handler can process it.
		* @param error the unexpected error
		* @param notifyTelemetry if false, don't notify telemetry trackers. Use this for exceptions from third-party code, for example.
		*/
		static handle(error, notifyTelemetry = true) {
			this._handler(error);
			if (notifyTelemetry) this._telemetry.forEach((telemetry) => {
				try {
					telemetry(error);
				} catch {}
			});
		}
		/** establish a new global *unexpected error* handler.
		* @param handler the new global handler. You may provide your own function or use one of the static members of this class.
		* The default is [[errorLog]].
		* @returns the previous handler. Useful to temporarily change the handler.
		*/
		static setHandler(handler) {
			const oldHandler = this._handler;
			this._handler = handler;
			return oldHandler;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/BeEvent.js
var BeEvent, BeUiEvent;
var init_BeEvent = __esmMin((() => {
	init_UnexpectedErrors();
	BeEvent = class {
		_listeners = [];
		_insideRaiseEvent = false;
		/** The number of listeners currently subscribed to the event. */
		get numberOfListeners() {
			return this._listeners.length;
		}
		/**
		* Registers a Listener to be executed whenever this event is raised.
		* @param listener The function to be executed when the event is raised.
		* @param scope An optional object scope to serve as the 'this' pointer when listener is invoked.
		* @returns A function that will remove this event listener.
		* @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
		*/
		addListener(listener, scope) {
			this._listeners.push({
				listener,
				scope,
				once: false
			});
			return () => this.removeListener(listener, scope);
		}
		/**
		* Registers a callback function to be executed *only once* when the event is raised.
		* @param listener The function to be executed once when the event is raised.
		* @param scope An optional object scope to serve as the `this` pointer in which the listener function will execute.
		* @returns A function that will remove this event listener.
		* @see [[BeEvent.raiseEvent]], [[BeEvent.removeListener]]
		*/
		addOnce(listener, scope) {
			this._listeners.push({
				listener,
				scope,
				once: true
			});
			return () => this.removeListener(listener, scope);
		}
		/**
		* Un-register a previously registered listener.
		* @param listener The listener to be unregistered.
		* @param  scope The scope that was originally passed to addListener.
		* @returns 'true' if the listener was removed; 'false' if the listener and scope are not registered with the event.
		* @see [[BeEvent.raiseEvent]], [[BeEvent.addListener]]
		*/
		removeListener(listener, scope) {
			const listeners = this._listeners;
			for (let i = 0; i < listeners.length; ++i) {
				const context = listeners[i];
				if (context.listener === listener && context.scope === scope) {
					if (this._insideRaiseEvent) context.listener = void 0;
					else listeners.splice(i, 1);
					return true;
				}
			}
			return false;
		}
		/**
		* Raises the event by calling each registered listener with the supplied arguments.
		* @param args This method takes any number of parameters and passes them through to the listeners.
		* @see [[BeEvent.removeListener]], [[BeEvent.addListener]]
		*/
		raiseEvent(...args) {
			this._insideRaiseEvent = true;
			const listeners = this._listeners;
			const length = listeners.length;
			let dropped = false;
			for (let i = 0; i < length; ++i) {
				const context = listeners[i];
				if (!context.listener) dropped = true;
				else {
					try {
						context.listener.apply(context.scope, args);
					} catch (e) {
						UnexpectedErrors.handle(e);
					}
					if (context.once) {
						context.listener = void 0;
						dropped = true;
					}
				}
			}
			if (dropped) this._listeners = this._listeners.filter((ctx) => ctx.listener !== void 0);
			this._insideRaiseEvent = false;
		}
		/** Determine whether this BeEvent has a specified listener registered.
		* @param listener The listener to check.
		* @param scope optional scope argument to match call to addListener
		*/
		has(listener, scope) {
			for (const ctx of this._listeners) if (ctx.listener === listener && ctx.scope === scope) return true;
			return false;
		}
		/** Clear all Listeners from this BeEvent. */
		clear() {
			this._listeners.length = 0;
		}
	};
	BeUiEvent = class extends BeEvent {
		/** Raises event with single strongly typed argument. */
		emit(args) {
			this.raiseEvent(args);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/StatusCategory.js
function lookupHttpStatusCategory(statusCode) {
	switch (statusCode) {
		case BentleyStatus.SUCCESS: return new Success();
		case BentleyStatus.ERROR: return new UnknownError();
		case IModelStatus.Success: return new Success();
		case IModelStatus.AlreadyLoaded: return new StateViolation();
		case IModelStatus.AlreadyOpen: return new StateViolation();
		case IModelStatus.BadArg: return new ValidationError();
		case IModelStatus.BadElement: return new ValidationError();
		case IModelStatus.BadModel: return new ValidationError();
		case IModelStatus.BadRequest: return new BadRequest();
		case IModelStatus.BadSchema: return new ValidationError();
		case IModelStatus.CannotUndo: return new OperationFailed();
		case IModelStatus.CodeNotReserved: return new StateViolation();
		case IModelStatus.DeletionProhibited: return new Forbidden();
		case IModelStatus.DuplicateCode: return new Conflict();
		case IModelStatus.DuplicateName: return new Conflict();
		case IModelStatus.ElementBlockedChange: return new ConstraintViolation();
		case IModelStatus.FileAlreadyExists: return new Conflict();
		case IModelStatus.FileNotFound: return new NotFound();
		case IModelStatus.FileNotLoaded: return new FileSystemError();
		case IModelStatus.ForeignKeyConstraint: return new ConstraintViolation();
		case IModelStatus.IdExists: return new Conflict();
		case IModelStatus.InDynamicTransaction: return new StateViolation();
		case IModelStatus.InvalidCategory: return new ValidationError();
		case IModelStatus.InvalidCode: return new ValidationError();
		case IModelStatus.InvalidCodeSpec: return new ValidationError();
		case IModelStatus.InvalidId: return new ValidationError();
		case IModelStatus.InvalidName: return new ValidationError();
		case IModelStatus.InvalidParent: return new Conflict();
		case IModelStatus.InvalidProfileVersion: return new InvalidData();
		case IModelStatus.IsCreatingChangeSet: return new StateViolation();
		case IModelStatus.LockNotHeld: return new Forbidden();
		case IModelStatus.Mismatch2d3d: return new ValidationError();
		case IModelStatus.MismatchGcs: return new ValidationError();
		case IModelStatus.MissingDomain: return new ValidationError();
		case IModelStatus.MissingHandler: return new ValidationError();
		case IModelStatus.MissingId: return new ValidationError();
		case IModelStatus.NoGeometry: return new NoContent();
		case IModelStatus.NoMultiTxnOperation: return new StateViolation();
		case IModelStatus.NotEnabled: return new NotEnabled();
		case IModelStatus.NotFound: return new NotFound();
		case IModelStatus.NotOpen: return new StateViolation();
		case IModelStatus.NotOpenForWrite: return new Forbidden();
		case IModelStatus.NotSameUnitBase: return new ValidationError();
		case IModelStatus.NothingToRedo: return new NothingToDo();
		case IModelStatus.NothingToUndo: return new NothingToDo();
		case IModelStatus.ParentBlockedChange: return new Forbidden();
		case IModelStatus.ReadError: return new FileSystemError();
		case IModelStatus.ReadOnly: return new ReadOnly();
		case IModelStatus.ReadOnlyDomain: return new ReadOnly();
		case IModelStatus.RepositoryManagerError: return new NetworkError();
		case IModelStatus.SQLiteError: return new InternalError();
		case IModelStatus.TransactionActive: return new StateViolation();
		case IModelStatus.UnitsMissing: return new ValidationError();
		case IModelStatus.UnknownFormat: return new InvalidData();
		case IModelStatus.UpgradeFailed: return new OperationFailed();
		case IModelStatus.ValidationFailed: return new ValidationError();
		case IModelStatus.VersionTooNew: return new VersioningViolation();
		case IModelStatus.VersionTooOld: return new VersioningViolation();
		case IModelStatus.ViewNotFound: return new NotFound();
		case IModelStatus.WriteError: return new FileSystemError();
		case IModelStatus.WrongClass: return new ValidationError();
		case IModelStatus.WrongIModel: return new ValidationError();
		case IModelStatus.WrongDomain: return new ValidationError();
		case IModelStatus.WrongElement: return new ValidationError();
		case IModelStatus.WrongHandler: return new ValidationError();
		case IModelStatus.WrongModel: return new ValidationError();
		case IModelStatus.ConstraintNotUnique: return new ConstraintViolation();
		case IModelStatus.NoGeoLocation: return new ValidationError();
		case IModelStatus.ServerTimeout: return new Timeout();
		case IModelStatus.NoContent: return new NoContent();
		case IModelStatus.NotRegistered: return new NotImplemented();
		case IModelStatus.FunctionNotFound: return new NotImplemented();
		case IModelStatus.NoActiveCommand: return new StateViolation();
		case IModelStatus.Aborted: return new Aborted();
		case BriefcaseStatus.CannotAcquire: return new OperationFailed();
		case BriefcaseStatus.CannotDownload: return new OperationFailed();
		case BriefcaseStatus.CannotUpload: return new OperationFailed();
		case BriefcaseStatus.CannotCopy: return new OperationFailed();
		case BriefcaseStatus.CannotDelete: return new OperationFailed();
		case BriefcaseStatus.VersionNotFound: return new NotFound();
		case BriefcaseStatus.CannotApplyChanges: return new OperationFailed();
		case BriefcaseStatus.DownloadCancelled: return new Cancelled();
		case BriefcaseStatus.ContainsDeletedChangeSets: return new ValidationError();
		case RpcInterfaceStatus.Success: return new Success();
		case RpcInterfaceStatus.IncompatibleVersion: return new VersioningViolation();
		case ChangeSetStatus.Success: return new Success();
		case ChangeSetStatus.ApplyError: return new OperationFailed();
		case ChangeSetStatus.ChangeTrackingNotEnabled: return new NotEnabled();
		case ChangeSetStatus.CorruptedChangeStream: return new Corruption();
		case ChangeSetStatus.FileNotFound: return new NotFound();
		case ChangeSetStatus.FileWriteError: return new FileSystemError();
		case ChangeSetStatus.HasLocalChanges: return new StateViolation();
		case ChangeSetStatus.HasUncommittedChanges: return new StateViolation();
		case ChangeSetStatus.InvalidId: return new Corruption();
		case ChangeSetStatus.InvalidVersion: return new Corruption();
		case ChangeSetStatus.InDynamicTransaction: return new StateViolation();
		case ChangeSetStatus.IsCreatingChangeSet: return new StateViolation();
		case ChangeSetStatus.IsNotCreatingChangeSet: return new StateViolation();
		case ChangeSetStatus.MergePropagationError: return new OperationFailed();
		case ChangeSetStatus.NothingToMerge: return new NothingToDo();
		case ChangeSetStatus.NoTransactions: return new OperationFailed();
		case ChangeSetStatus.ParentMismatch: return new ValidationError();
		case ChangeSetStatus.SQLiteError: return new InternalError();
		case ChangeSetStatus.WrongDgnDb: return new ValidationError();
		case ChangeSetStatus.CouldNotOpenDgnDb: return new OperationFailed();
		case ChangeSetStatus.MergeSchemaChangesOnOpen: return new BadRequest();
		case ChangeSetStatus.ReverseOrReinstateSchemaChanges: return new Conflict();
		case ChangeSetStatus.ProcessSchemaChangesOnOpen: return new BadRequest();
		case ChangeSetStatus.CannotMergeIntoReadonly: return new ValidationError();
		case ChangeSetStatus.CannotMergeIntoMaster: return new ValidationError();
		case ChangeSetStatus.CannotMergeIntoReversed: return new ValidationError();
		case RepositoryStatus.Success: return new Success();
		case RepositoryStatus.ServerUnavailable: return new NetworkError();
		case RepositoryStatus.LockAlreadyHeld: return new Conflict();
		case RepositoryStatus.SyncError: return new NetworkError();
		case RepositoryStatus.InvalidResponse: return new NetworkError();
		case RepositoryStatus.PendingTransactions: return new StateViolation();
		case RepositoryStatus.LockUsed: return new StateViolation();
		case RepositoryStatus.CannotCreateChangeSet: return new InternalError();
		case RepositoryStatus.InvalidRequest: return new NetworkError();
		case RepositoryStatus.ChangeSetRequired: return new StateViolation();
		case RepositoryStatus.CodeUnavailable: return new Conflict();
		case RepositoryStatus.CodeNotReserved: return new StateViolation();
		case RepositoryStatus.CodeUsed: return new StateViolation();
		case RepositoryStatus.LockNotHeld: return new Forbidden();
		case RepositoryStatus.RepositoryIsLocked: return new Locked();
		case RepositoryStatus.ChannelConstraintViolation: return new ConstraintViolation();
		case HttpStatus.Success: return new Success();
		case IModelHubStatus.Success: return new Success();
		case IModelHubStatus.Unknown: return new UnknownError();
		case IModelHubStatus.MissingRequiredProperties: return new ValidationError();
		case IModelHubStatus.InvalidPropertiesValues: return new ValidationError();
		case IModelHubStatus.UserDoesNotHavePermission: return new PermissionsViolation();
		case IModelHubStatus.UserDoesNotHaveAccess: return new PermissionsViolation();
		case IModelHubStatus.InvalidBriefcase: return new ValidationError();
		case IModelHubStatus.BriefcaseDoesNotExist: return new NotFound();
		case IModelHubStatus.BriefcaseDoesNotBelongToUser: return new PermissionsViolation();
		case IModelHubStatus.AnotherUserPushing: return new StateViolation();
		case IModelHubStatus.ChangeSetAlreadyExists: return new Conflict();
		case IModelHubStatus.ChangeSetDoesNotExist: return new NotFound();
		case IModelHubStatus.FileIsNotUploaded: return new StateViolation();
		case IModelHubStatus.iModelIsNotInitialized: return new StateViolation();
		case IModelHubStatus.ChangeSetPointsToBadSeed: return new InvalidData();
		case IModelHubStatus.OperationFailed: return new OperationFailed();
		case IModelHubStatus.PullIsRequired: return new StateViolation();
		case IModelHubStatus.MaximumNumberOfBriefcasesPerUser: return new Throttled();
		case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute: return new Throttled();
		case IModelHubStatus.DatabaseTemporarilyLocked: return new Locked();
		case IModelHubStatus.iModelIsLocked: return new Locked();
		case IModelHubStatus.CodesExist: return new Conflict();
		case IModelHubStatus.LocksExist: return new Conflict();
		case IModelHubStatus.iModelAlreadyExists: return new Conflict();
		case IModelHubStatus.iModelDoesNotExist: return new NotFound();
		case IModelHubStatus.FileDoesNotExist: return new NotFound();
		case IModelHubStatus.FileAlreadyExists: return new Conflict();
		case IModelHubStatus.LockDoesNotExist: return new NotFound();
		case IModelHubStatus.LockOwnedByAnotherBriefcase: return new Conflict();
		case IModelHubStatus.CodeStateInvalid: return new StateViolation();
		case IModelHubStatus.CodeReservedByAnotherBriefcase: return new Conflict();
		case IModelHubStatus.CodeDoesNotExist: return new NotFound();
		case IModelHubStatus.EventTypeDoesNotExist: return new NotFound();
		case IModelHubStatus.EventSubscriptionDoesNotExist: return new NotFound();
		case IModelHubStatus.EventSubscriptionAlreadyExists: return new StateViolation();
		case IModelHubStatus.ITwinIdIsNotSpecified: return new ValidationError();
		case IModelHubStatus.FailedToGetITwinPermissions: return new OperationFailed();
		case IModelHubStatus.FailedToGetITwinMembers: return new OperationFailed();
		case IModelHubStatus.ChangeSetAlreadyHasVersion: return new Conflict();
		case IModelHubStatus.VersionAlreadyExists: return new Conflict();
		case IModelHubStatus.JobSchedulingFailed: return new InternalError();
		case IModelHubStatus.ConflictsAggregate: return new Conflict();
		case IModelHubStatus.FailedToGetITwinById: return new OperationFailed();
		case IModelHubStatus.DatabaseOperationFailed: return new OperationFailed();
		case IModelHubStatus.SeedFileInitializationFailed: return new OperationFailed();
		case IModelHubStatus.FailedToGetAssetPermissions: return new OperationFailed();
		case IModelHubStatus.FailedToGetAssetMembers: return new OperationFailed();
		case IModelHubStatus.ITwinDoesNotExist: return new NotFound();
		case IModelHubStatus.LockChunkDoesNotExist: return new NotFound();
		case IModelHubStatus.CheckpointAlreadyExists: return new Conflict();
		case IModelHubStatus.CheckpointDoesNotExist: return new NotFound();
		case IModelHubStatus.UndefinedArgumentError: return new ValidationError();
		case IModelHubStatus.InvalidArgumentError: return new ValidationError();
		case IModelHubStatus.MissingDownloadUrlError: return new ValidationError();
		case IModelHubStatus.NotSupportedInBrowser: return new NotSupported();
		case IModelHubStatus.FileHandlerNotSet: return new NotImplemented();
		case IModelHubStatus.FileNotFound: return new NotFound();
		case IModelHubStatus.InitializationTimeout: return new Timeout();
		case GeoServiceStatus.Success: return new Success();
		case GeoServiceStatus.NoGeoLocation: return new ValidationError();
		case GeoServiceStatus.OutOfUsefulRange: return new ValidationError();
		case GeoServiceStatus.OutOfMathematicalDomain: return new ValidationError();
		case GeoServiceStatus.NoDatumConverter: return new OperationFailed();
		case GeoServiceStatus.VerticalDatumConvertError: return new OperationFailed();
		case GeoServiceStatus.CSMapError: return new InternalError();
		case GeoServiceStatus.Pending: return new Pending();
		case RealityDataStatus.Success: return new Success();
		case RealityDataStatus.InvalidData: return new InvalidData();
		default: return new UnknownError();
	}
}
var StatusCategory, SuccessCategory, ErrorCategory, HTTP, Success, Pending, NoContent, NothingToDo, BadRequest, Forbidden, PermissionsViolation, ReadOnly, NotFound, NotEnabled, NotSupported, ValidationError, Timeout, Conflict, Cancelled, ConstraintViolation, VersioningViolation, Corruption, InvalidData, OperationFailed, StateViolation, Locked, NetworkError, Throttled, FileSystemError, InternalError, UnknownError, NotImplemented, Aborted;
var init_StatusCategory = __esmMin((() => {
	init_BentleyError();
	init_RepositoryStatus();
	StatusCategory = class {
		static handlers = /* @__PURE__ */ new Set();
		static for(error) {
			for (const handler of this.handlers) {
				const category = handler(error);
				if (category) return category;
			}
			const errorNumber = error.errorNumber;
			if (typeof errorNumber === "number") return lookupHttpStatusCategory(errorNumber);
			return new UnknownError();
		}
	};
	SuccessCategory = class extends StatusCategory {
		error = false;
	};
	ErrorCategory = class extends StatusCategory {
		error = true;
	};
	(function(HTTP) {
		class OK extends SuccessCategory {
			name = "OK";
			code = 200;
		}
		HTTP.OK = OK;
		class Accepted extends SuccessCategory {
			name = "Accepted";
			code = 202;
		}
		HTTP.Accepted = Accepted;
		class NoContent extends SuccessCategory {
			name = "NoContent";
			code = 204;
		}
		HTTP.NoContent = NoContent;
		class BadRequest extends ErrorCategory {
			name = "BadRequest";
			code = 400;
		}
		HTTP.BadRequest = BadRequest;
		class Unauthorized extends ErrorCategory {
			name = "Unauthorized";
			code = 401;
		}
		HTTP.Unauthorized = Unauthorized;
		class Forbidden extends ErrorCategory {
			name = "Forbidden";
			code = 403;
		}
		HTTP.Forbidden = Forbidden;
		class NotFound extends ErrorCategory {
			name = "NotFound";
			code = 404;
		}
		HTTP.NotFound = NotFound;
		class RequestTimeout extends ErrorCategory {
			name = "RequestTimeout";
			code = 408;
		}
		HTTP.RequestTimeout = RequestTimeout;
		class Conflict extends ErrorCategory {
			name = "Conflict";
			code = 409;
		}
		HTTP.Conflict = Conflict;
		class Gone extends ErrorCategory {
			name = "Gone";
			code = 410;
		}
		HTTP.Gone = Gone;
		class PreconditionFailed extends ErrorCategory {
			name = "PreconditionFailed";
			code = 412;
		}
		HTTP.PreconditionFailed = PreconditionFailed;
		class ExpectationFailed extends ErrorCategory {
			name = "ExpectationFailed";
			code = 417;
		}
		HTTP.ExpectationFailed = ExpectationFailed;
		class MisdirectedRequest extends ErrorCategory {
			name = "MisdirectedRequest";
			code = 421;
		}
		HTTP.MisdirectedRequest = MisdirectedRequest;
		class UnprocessableEntity extends ErrorCategory {
			name = "UnprocessableEntity";
			code = 422;
		}
		HTTP.UnprocessableEntity = UnprocessableEntity;
		class UpgradeRequired extends ErrorCategory {
			name = "UpgradeRequired";
			code = 426;
		}
		HTTP.UpgradeRequired = UpgradeRequired;
		class PreconditionRequired extends ErrorCategory {
			name = "PreconditionRequired";
			code = 428;
		}
		HTTP.PreconditionRequired = PreconditionRequired;
		class TooManyRequests extends ErrorCategory {
			name = "TooManyRequests";
			code = 429;
		}
		HTTP.TooManyRequests = TooManyRequests;
		class InternalServerError extends ErrorCategory {
			name = "InternalServerError";
			code = 500;
		}
		HTTP.InternalServerError = InternalServerError;
		class NotImplemented extends ErrorCategory {
			name = "NotImplemented";
			code = 501;
		}
		HTTP.NotImplemented = NotImplemented;
	})(HTTP || (HTTP = {}));
	Success = class extends HTTP.OK {};
	Pending = class extends HTTP.Accepted {};
	NoContent = class extends HTTP.NoContent {};
	NothingToDo = class extends HTTP.NoContent {};
	BadRequest = class extends HTTP.BadRequest {};
	Forbidden = class extends HTTP.Forbidden {};
	PermissionsViolation = class extends HTTP.Forbidden {};
	ReadOnly = class extends HTTP.Forbidden {};
	NotFound = class extends HTTP.NotFound {};
	NotEnabled = class extends HTTP.UnprocessableEntity {};
	NotSupported = class extends HTTP.UnprocessableEntity {};
	ValidationError = class extends HTTP.BadRequest {};
	Timeout = class extends HTTP.RequestTimeout {};
	Conflict = class extends HTTP.Conflict {};
	Cancelled = class extends HTTP.Gone {};
	ConstraintViolation = class extends HTTP.Forbidden {};
	VersioningViolation = class extends HTTP.Forbidden {};
	Corruption = class extends HTTP.InternalServerError {};
	InvalidData = class extends HTTP.InternalServerError {};
	OperationFailed = class extends HTTP.InternalServerError {};
	StateViolation = class extends HTTP.InternalServerError {};
	Locked = class extends HTTP.Conflict {};
	NetworkError = class extends HTTP.InternalServerError {};
	Throttled = class extends HTTP.TooManyRequests {};
	FileSystemError = class extends HTTP.InternalServerError {};
	InternalError = class extends HTTP.InternalServerError {};
	UnknownError = class extends HTTP.InternalServerError {};
	NotImplemented = class extends HTTP.NotImplemented {};
	Aborted = class extends HTTP.BadRequest {};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Id.js
/** @packageDocumentation
* @module Ids
*/
function toHex(str) {
	const v = parseInt(str, 16);
	return Number.isNaN(v) ? 0 : v;
}
function isLowerCaseNonZeroHexDigit(str, index) {
	return isLowerCaseHexDigit(str, index, false);
}
function isLowerCaseHexDigit(str, index, allowZero = true) {
	const charCode = str.charCodeAt(index);
	return charCode >= (allowZero ? 48 : 49) && charCode <= 57 || charCode >= 97 && charCode <= 102;
}
function isValidHexString(id, startIndex, len) {
	if (len === 0) return false;
	if (!isLowerCaseNonZeroHexDigit(id, startIndex)) return false;
	for (let i = 1; i < len; i++) if (!isLowerCaseHexDigit(id, startIndex + i)) return false;
	return true;
}
function validateLocalId(num) {
	if (num < 0 || Math.round(num) !== num) throw new Error("Local Id must be a non-negative integer");
}
var Id64, TransientIdSequence, Guid;
var init_Id = __esmMin((() => {
	(function(Id64) {
		/** Extract the "local" Id portion of an Id64String, contained in the lower 40 bits of the 64-bit value. */
		function getLocalId(id) {
			if (isInvalid(id)) return 0;
			const len = id.length;
			const start = len > 12 ? len - 10 : 2;
			return toHex(id.slice(start));
		}
		Id64.getLocalId = getLocalId;
		/** Extract the briefcase Id portion of an Id64String, contained in the upper 24 bits of the 64-bit value. */
		function getBriefcaseId(id) {
			if (isInvalid(id)) return 0;
			const len = id.length;
			return len <= 12 ? 0 : toHex(id.slice(2, len - 10));
		}
		Id64.getBriefcaseId = getBriefcaseId;
		/** Create an Id64String from its JSON representation.
		* @param prop The JSON representation of an Id.
		* @returns A well-formed Id string.
		* @note if the input is undefined, the result is "0", indicating an invalid Id.
		* @note if the input is not undefined, the result is the same as that of [[Id64.fromString]].
		*/
		function fromJSON(prop) {
			return typeof prop === "string" ? Id64.fromString(prop) : Id64.invalid;
		}
		Id64.fromJSON = fromJSON;
		/** Given a string value, attempt to normalize it into a well-formed Id string.
		* If the input is already a well-formed Id string, it is returned unmodified.
		* Otherwise, the input is trimmed of leading and trailing whitespace, converted to lowercase, and an attempt is made to parse it as a 64-bit hexadecimal integer.
		* If parsing succeeds the normalized result is returned; otherwise the result is "0", indicating an invalid Id.
		*
		* For a description of "well-formed", see [Working with Ids]($docs/learning/common/Id64.md).
		*/
		function fromString(val) {
			if (typeof val !== "string") return Id64.invalid;
			if (Id64.isId64(val)) return val;
			val = val.toLowerCase().trim();
			const len = val.length;
			if (len < 2 || val[0] !== "0" || val[1] !== "x") return Id64.invalid;
			let low = 0;
			let high = 0;
			let start = 2;
			if (len > 12) {
				start = len - 10;
				high = toHex(val.slice(2, start));
			}
			low = toHex(val.slice(start));
			return fromLocalAndBriefcaseIds(low, high);
		}
		Id64.fromString = fromString;
		const _localIdPrefixByLocalIdLength = [
			"0000000000",
			"000000000",
			"00000000",
			"0000000",
			"000000",
			"00000",
			"0000",
			"000",
			"00",
			"0",
			""
		];
		/** Produce an Id string from a local and briefcase Id.
		* @param localId The non-zero local Id as an unsigned 40-bit integer.
		* @param briefcaseId The briefcase Id as an unsigned 24-bit integer.
		* @returns an Id64String containing the hexadecimal string representation of the unsigned 64-bit integer which would result from the
		* operation `localId | (briefcaseId << 40)`, or an invalid Id "0" if the inputs are invalid.
		*/
		function fromLocalAndBriefcaseIds(localId, briefcaseId) {
			if (typeof localId !== "number" || typeof briefcaseId !== "number") return Id64.invalid;
			localId = Math.floor(localId);
			if (0 === localId) return Id64.invalid;
			briefcaseId = Math.floor(briefcaseId);
			const lowStr = localId.toString(16);
			return `0x${briefcaseId === 0 ? lowStr : briefcaseId.toString(16) + (_localIdPrefixByLocalIdLength[lowStr.length] + lowStr)}`;
		}
		Id64.fromLocalAndBriefcaseIds = fromLocalAndBriefcaseIds;
		const scratchCharCodes = [
			48,
			120,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48,
			48
		];
		function uint4ToCharCode(uint4) {
			return uint4 + (uint4 < 10 ? 48 : 87);
		}
		function charCodeToUint4(char) {
			return char - (char >= 87 ? 87 : 48);
		}
		function substringToUint32(id, start, end) {
			let uint32 = 0;
			for (let i = start; i < end; i++) {
				const mask = charCodeToUint4(id.charCodeAt(i)) << (end - i - 1 << 2);
				uint32 = (uint32 | mask) >>> 0;
			}
			return uint32;
		}
		/** Create an Id64String from a pair of unsigned 32-bit integers.
		* @param lowBytes The lower 4 bytes of the Id
		* @param highBytes The upper 4 bytes of the Id
		* @returns an Id64String containing the hexadecimal string representation of the unsigned 64-bit integer which would result from the
		* operation `lowBytes | (highBytes << 32)`.
		* @see [[Id64.fromUint32PairObject]] if you have a [[Id64.Uint32Pair]] object.
		*/
		function fromUint32Pair(lowBytes, highBytes) {
			if (0 === (lowBytes >>> 0) + (highBytes & 255) * 4294967296) return Id64.invalid;
			const buffer = scratchCharCodes;
			let index = 2;
			for (let i = 7; i >= 0; i--) {
				const shift = i << 2;
				const uint4 = (highBytes & 15 << shift) >>> shift;
				if (index > 2 || 0 !== uint4) buffer[index++] = uint4ToCharCode(uint4);
			}
			for (let i = 7; i >= 0; i--) {
				const shift = i << 2;
				const uint4 = (lowBytes & 15 << shift) >>> shift;
				if (index > 2 || 0 !== uint4) buffer[index++] = uint4ToCharCode(uint4);
			}
			if (buffer.length !== index) buffer.length = index;
			return String.fromCharCode(...scratchCharCodes);
		}
		Id64.fromUint32Pair = fromUint32Pair;
		/** Create an Id64String from a [[Id64.Uint32Pair]].
		* @see [[Id64.fromUint32Pair]].
		*/
		function fromUint32PairObject(pair) {
			return fromUint32Pair(pair.lower, pair.upper);
		}
		Id64.fromUint32PairObject = fromUint32PairObject;
		/** Returns true if the inputs represent two halves of a valid 64-bit Id.
		* @see [[Id64.Uint32Pair]].
		*/
		function isValidUint32Pair(lowBytes, highBytes) {
			return 0 !== lowBytes || 0 !== (highBytes & 255);
		}
		Id64.isValidUint32Pair = isValidUint32Pair;
		/** Convert an Id64String to a 64-bit unsigned integer represented as a pair of unsigned 32-bit integers.
		* @param id The well-formed string representation of a 64-bit Id.
		* @param out Used as the return value if supplied; otherwise a new object is returned.
		* @returns An object containing the parsed lower and upper 32-bit integers comprising the 64-bit Id.
		*/
		function getUint32Pair(id, out) {
			if (!out) out = {
				lower: 0,
				upper: 0
			};
			out.lower = getLowerUint32(id);
			out.upper = getUpperUint32(id);
			return out;
		}
		Id64.getUint32Pair = getUint32Pair;
		/** Extract an unsigned 32-bit integer from the lower 4 bytes of an Id64String. */
		function getLowerUint32(id) {
			if (isInvalid(id)) return 0;
			const end = id.length;
			return substringToUint32(id, end > 10 ? end - 8 : 2, end);
		}
		Id64.getLowerUint32 = getLowerUint32;
		/** Extract an unsigned 32-bit integer from the upper 4 bytes of an Id64String. */
		function getUpperUint32(id) {
			const len = id.length;
			if (len <= 10 || isInvalid(id)) return 0;
			return substringToUint32(id, 2, len - 8);
		}
		Id64.getUpperUint32 = getUpperUint32;
		/** Convert an [[Id64Arg]] into an [[Id64Set]].
		*
		* This method can be used by functions that accept an Id64Arg to conveniently process the value(s). For example:
		* ```ts
		*   public addCategories(arg: Id64Arg) { Id64.toIdSet(arg).forEach((id) => this.categories.add(id)); }
		* ```
		*
		* Alternatively, to avoid allocating a new Id64Set, use [[Id64.iterable]].
		*
		* @param arg The Ids to convert to an Id64Set.
		* @param makeCopy If true, and the input is already an Id64Set, returns a deep copy of the input.
		* @returns An Id64Set containing the set of [[Id64String]]s represented by the Id64Arg.
		*/
		function toIdSet(arg, makeCopy = false) {
			if (arg instanceof Set) return makeCopy ? new Set(arg) : arg;
			const ids = /* @__PURE__ */ new Set();
			if (typeof arg === "string") ids.add(arg);
			else if (Array.isArray(arg)) arg.forEach((id) => {
				if (typeof id === "string") ids.add(id);
			});
			return ids;
		}
		Id64.toIdSet = toIdSet;
		/** Obtain iterator over the specified Ids.
		* @see [[Id64.iterable]].
		*/
		function* iterator(ids) {
			if (typeof ids === "string") yield ids;
			else for (const id of ids) yield id;
		}
		Id64.iterator = iterator;
		/** Obtain an iterable over the specified Ids. Example usage:
		* ```ts
		*  const ids = ["0x123", "0xfed"];
		*  for (const id of Id64.iterable(ids))
		*    console.log(id);
		* ```
		*/
		function iterable(ids) {
			return { [Symbol.iterator]: () => iterator(ids) };
		}
		Id64.iterable = iterable;
		/** Return the first [[Id64String]] of an [[Id64Arg]]. */
		function getFirst(arg) {
			return typeof arg === "string" ? arg : (Array.isArray(arg) ? arg[0] : arg.values().next().value) ?? Id64.invalid;
		}
		Id64.getFirst = getFirst;
		/** Return the number of [[Id64String]]s represented by an [[Id64Arg]]. */
		function sizeOf(arg) {
			return typeof arg === "string" ? 1 : Array.isArray(arg) ? arg.length : arg.size;
		}
		Id64.sizeOf = sizeOf;
		/** Returns true if the [[Id64Arg]] contains the specified Id. */
		function has(arg, id) {
			if (typeof arg === "string") return arg === id;
			if (Array.isArray(arg)) return -1 !== arg.indexOf(id);
			return arg.has(id);
		}
		Id64.has = has;
		/** The string representation of an invalid Id. */
		Id64.invalid = "0";
		/** Determine if the supplied id string represents a transient Id.
		* @param id A well-formed Id string.
		* @returns true if the Id represents a transient Id.
		* @note This method assumes the input is a well-formed Id string.
		* @see [[Id64.isTransientId64]]
		* @see [[TransientIdSequence]]
		*/
		function isTransient(id) {
			return 18 === id.length && id.startsWith("0xffffff");
		}
		Id64.isTransient = isTransient;
		/** Determine if the input is a well-formed [[Id64String]] and represents a transient Id.
		* @see [[Id64.isTransient]]
		* @see [[Id64.isId64]]
		* @see [[TransientIdSequence]]
		*/
		function isTransientId64(id) {
			return isValidId64(id) && isTransient(id);
		}
		Id64.isTransientId64 = isTransientId64;
		/** Determine if the input is a well-formed [[Id64String]].
		*
		* For a description of "well-formed", see [Working with Ids]($docs/learning/common/Id64.md).
		* @see [[Id64.isValidId64]]
		*/
		function isId64(id) {
			const len = id.length;
			if (0 === len || 18 < len) return false;
			if ("0" !== id[0]) return false;
			if (1 === len) return true;
			if (2 === len || "x" !== id[1]) return false;
			let localIdStart = 2;
			if (len > 12) {
				localIdStart = len - 10;
				if (!isValidHexString(id, 2, localIdStart - 2)) return false;
				for (let i = localIdStart; i < len; i++) if (48 !== id.charCodeAt(i)) break;
				else localIdStart++;
				if (localIdStart >= len) return false;
			}
			return isValidHexString(id, localIdStart, len - localIdStart);
		}
		Id64.isId64 = isId64;
		/** Returns true if the input is not equal to the representation of an invalid Id.
		* @note This method assumes the input is a well-formed Id string.
		* @see [[Id64.isInvalid]]
		* @see [[Id64.isValidId64]]
		*/
		function isValid(id) {
			return Id64.invalid !== id;
		}
		Id64.isValid = isValid;
		/** Returns true if the input is a well-formed [[Id64String]] representing a valid Id.
		* @see [[Id64.isValid]]
		* @see [[Id64.isId64]]
		*/
		function isValidId64(id) {
			return Id64.invalid !== id && Id64.isId64(id);
		}
		Id64.isValidId64 = isValidId64;
		/** Returns true if the input is a well-formed [[Id64String]] representing an invalid Id.
		* @see [[Id64.isValid]]
		*/
		function isInvalid(id) {
			return Id64.invalid === id;
		}
		Id64.isInvalid = isInvalid;
		/** A specialized replacement for Set<Id64String> optimized for performance-critical code which represents large sets of [[Id64]]s as pairs of
		* 32-bit integers.
		* The internal representation is a Map<number, Set<number>> where the Map key is the upper 4 bytes of the IDs and the Set elements are the lower 4 bytes of the IDs.
		* Because the upper 4 bytes store the 24-bit briefcase ID plus the upper 8 bits of the local ID, there will be a very small distribution of unique Map keys.
		* To further optimize this data type, the following assumptions are made regarding the { lower, upper } inputs, and no validation is performed to confirm them:
		*  - The inputs are unsigned 32-bit integers;
		*  - The inputs represent a valid Id64String (e.g., local ID is not zero).
		* @see [[Id64.Uint32Map]] for a similarly-optimized replacement for Map<Id64String, T>
		* @public
		*/
		class Uint32Set {
			_map = /* @__PURE__ */ new Map();
			/** Construct a new Uint32Set.
			* @param ids If supplied, all of the specified Ids will be added to the new set.
			*/
			constructor(ids) {
				if (void 0 !== ids) this.addIds(ids);
			}
			/** Return true if `this` and `other` contain the same set of Ids. */
			equals(other) {
				if (this === other) return true;
				if (this.size !== other.size) return false;
				for (const [key, thisValue] of this._map) {
					const otherValue = other._map.get(key);
					if (!otherValue || thisValue.size !== otherValue.size) return false;
					for (const value of thisValue) if (!otherValue.has(value)) return false;
				}
				return true;
			}
			/** Remove all contents of this set. */
			clear() {
				this._map.clear();
			}
			/** Add an Id to the set. */
			addId(id) {
				this.add(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
			}
			/** Add any number of Ids to the set. */
			addIds(ids) {
				for (const id of Id64.iterable(ids)) this.addId(id);
			}
			/** Returns true if the set contains the specified Id. */
			hasId(id) {
				return this.has(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
			}
			/** Add an Id to the set. */
			add(low, high) {
				let set = this._map.get(high);
				if (void 0 === set) {
					set = /* @__PURE__ */ new Set();
					this._map.set(high, set);
				}
				set.add(low);
			}
			/** Remove an Id from the set. */
			deleteId(id) {
				this.delete(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
			}
			/** Remove any number of Ids from the set. */
			deleteIds(ids) {
				for (const id of Id64.iterable(ids)) this.deleteId(id);
			}
			/** Remove an Id from the set. */
			delete(low, high) {
				const set = this._map.get(high);
				if (void 0 !== set) {
					set.delete(low);
					if (set.size === 0) this._map.delete(high);
				}
			}
			/** Returns true if the set contains the specified Id. */
			has(low, high) {
				const set = this._map.get(high);
				return void 0 !== set && set.has(low);
			}
			/** Returns true if the set contains the Id specified by `pair`. */
			hasPair(pair) {
				return this.has(pair.lower, pair.upper);
			}
			/** Returns true if the set contains no Ids. */
			get isEmpty() {
				return 0 === this._map.size;
			}
			/** Returns the number of Ids contained in the set. */
			get size() {
				let size = 0;
				for (const entry of this._map) size += entry[1].size;
				return size;
			}
			/** Populates and returns an array of all Ids contained in the set. */
			toId64Array() {
				const ids = [];
				for (const entry of this._map) for (const low of entry[1]) ids.push(Id64.fromUint32Pair(low, entry[0]));
				return ids;
			}
			/** Populates and returns a set of all Ids contained in the set. */
			toId64Set() {
				const ids = /* @__PURE__ */ new Set();
				for (const entry of this._map) for (const low of entry[1]) ids.add(Id64.fromUint32Pair(low, entry[0]));
				return ids;
			}
			/** Execute a function against each Id in this set. */
			forEach(func) {
				for (const entry of this._map) for (const lo of entry[1]) func(lo, entry[0]);
			}
		}
		Id64.Uint32Set = Uint32Set;
		/** A specialized replacement for Map<Id64String, T> optimized for performance-critical code.
		* @see [[Id64.Uint32Set]] for implementation details.
		* @public
		*/
		class Uint32Map {
			_map = /* @__PURE__ */ new Map();
			/** Remove all entries from the map. */
			clear() {
				this._map.clear();
			}
			/** Find an entry in the map by Id. */
			getById(id) {
				return this.get(Id64.getLowerUint32(id), Id64.getUpperUint32(id));
			}
			/** Set an entry in the map by Id. */
			setById(id, value) {
				this.set(Id64.getLowerUint32(id), Id64.getUpperUint32(id), value);
			}
			/** Set an entry in the map by Id components. */
			set(low, high, value) {
				let map = this._map.get(high);
				if (void 0 === map) {
					map = /* @__PURE__ */ new Map();
					this._map.set(high, map);
				}
				map.set(low, value);
			}
			/** Get an entry from the map by Id components. */
			get(low, high) {
				const map = this._map.get(high);
				return void 0 !== map ? map.get(low) : void 0;
			}
			/** Returns true if the map contains no entries. */
			get isEmpty() {
				return 0 === this._map.size;
			}
			/** Returns the number of entries in the map. */
			get size() {
				let size = 0;
				for (const entry of this._map) size += entry[1].size;
				return size;
			}
			/** Execute a function against each entry in this map. */
			forEach(func) {
				for (const outerEntry of this._map) for (const innerEntry of outerEntry[1]) func(innerEntry[0], outerEntry[0], innerEntry[1]);
			}
		}
		Id64.Uint32Map = Uint32Map;
	})(Id64 || (Id64 = {}));
	TransientIdSequence = class TransientIdSequence {
		/** The starting local Id provided to the constructor. The sequence begins at `initialLocalId + 1`. */
		initialLocalId;
		_localId;
		/** Constructor.
		* @param initialLocalId The starting local Id. The local Id of the first [[Id64String]] generated by [[getNext]] will be `initialLocalId + 1`.
		*/
		constructor(initialLocalId = 0) {
			validateLocalId(initialLocalId);
			this.initialLocalId = initialLocalId;
			this._localId = initialLocalId;
		}
		/** The maximum local Id generated by the sequence thus far. It is never less than [[initialLocalId]]. If it is equal to [[initialLocalId]], then the sequence has
		* not yet generated any Ids.
		* Each call to [[getNext]] increments this by 1 and uses it as the local Id of the generated [[Id64String]].
		*/
		get currentLocalId() {
			return this._localId;
		}
		/** Generate and return the next transient Id64String in the sequence. */
		getNext() {
			return Id64.fromLocalAndBriefcaseIds(++this._localId, 16777215);
		}
		/** Preview the transient Id64String that will be returned by the next call to [[getNext]].
		* This is primarily useful for tests.
		*/
		peekNext() {
			return Id64.fromLocalAndBriefcaseIds(this._localId + 1, 16777215);
		}
		/** Convert this sequence to its JSON representation. */
		toJSON() {
			return {
				initialLocalId: this.initialLocalId,
				currentLocalId: this.currentLocalId
			};
		}
		/** Create a sequence from its JSON representation. */
		static fromJSON(props) {
			validateLocalId(props.currentLocalId);
			const sequence = new TransientIdSequence(props.initialLocalId);
			sequence._localId = props.currentLocalId;
			return sequence;
		}
		/** Obtain the JSON representation of a new sequence that diverges from this sequence, with its [[initialLocalId]] set to this sequence's [[currentLocalId]].
		* The two sequences can generate Ids independently. Later, you can [[merge]] the sequences, resolving conflicts where the two sequences generated identical Ids.
		* This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
		*/
		fork() {
			return {
				initialLocalId: this.currentLocalId,
				currentLocalId: this.currentLocalId
			};
		}
		/** Integrate the Ids generated by a [[fork]] of this sequence. All of the Ids generated by `source` will be remapped to Ids at the end of this sequence.
		* This is chiefly useful when generating transient Ids on a [Worker](https://developer.mozilla.org/en-US/docs/Web/API/Worker).
		* @param source The JSON representation of the [[fork]]ed sequence to be merged with this one.
		* @returns a function that permits you to remap the local Ids generated by `source` into the corresponding local Ids assigned by this sequence.
		* @throws Error if `source` is not a fork of this sequence or is malformed (e.g., contains negative and/or non-integer local Ids).
		*/
		merge(source) {
			const { initialLocalId, currentLocalId } = source;
			validateLocalId(initialLocalId);
			validateLocalId(currentLocalId);
			if (initialLocalId > this.currentLocalId) throw new Error("Transient Id sequences do not intersect");
			if (initialLocalId > currentLocalId) throw new Error("Current local Id cannot be less than initial local Id");
			const delta = this.currentLocalId - initialLocalId;
			this._localId += currentLocalId - initialLocalId;
			return (sourceLocalId) => {
				if (sourceLocalId > initialLocalId && sourceLocalId <= currentLocalId) return sourceLocalId + delta;
				return sourceLocalId;
			};
		}
	};
	(function(Guid) {
		const uuidPattern = /* @__PURE__ */ new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
		/** Represents the empty Guid 00000000-0000-0000-0000-000000000000 */
		Guid.empty = "00000000-0000-0000-0000-000000000000";
		/** Determine whether the input string is "guid-like". That is, it follows the 8-4-4-4-12 pattern. This does not enforce
		*  that the string is actually in valid UUID format.
		*/
		function isGuid(value) {
			return uuidPattern.test(value);
		}
		Guid.isGuid = isGuid;
		/** Determine whether the input string is a valid V4 Guid string */
		function isV4Guid(value) {
			return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
		}
		Guid.isV4Guid = isV4Guid;
		/** Create a new V4 Guid value */
		function createValue() {
			return crypto.randomUUID();
		}
		Guid.createValue = createValue;
		/**
		* Normalize a Guid string if possible. Normalization consists of:
		* - Convert all characters to lower case
		* - Trim any leading or trailing whitespace
		* - Convert to the standard Guid format "8-4-4-4-12", repositioning the '-' characters as necessary, presuming there are exactly 32 hexadecimal digits.
		* @param value Input value that represents a Guid
		* @returns Normalized representation of the Guid string. If the normalization fails, return the *original* value unmodified (Note: it is *not* a valid Guid)
		*/
		function normalize(value) {
			const lowerValue = value.toLowerCase().trim();
			if (isGuid(lowerValue)) return lowerValue;
			const noDashValue = lowerValue.replace(/-/g, "");
			const noDashPattern = /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/;
			if (noDashPattern.test(noDashValue)) return noDashValue.replace(noDashPattern, (_match, p1, p2, p3, p4, p5) => `${p1}-${p2}-${p3}-${p4}-${p5}`);
			return value;
		}
		Guid.normalize = normalize;
	})(Guid || (Guid = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ByteStream.js
var ByteStream;
var init_ByteStream = __esmMin((() => {
	init_Assert();
	init_Id();
	ByteStream = class ByteStream {
		_view;
		_byteOffset;
		_curPos = 0;
		/** Construct a new ByteStream with the read position set to the beginning.
		* @param buffer The underlying buffer from which data is to be extracted.
		* @param subView If defined, specifies the subset of the underlying buffer's data to use.
		* This constructor is subject to two common mistakes:
		*
		* 1. Given `bytes: Uint8Array`, `new ByteStream(bytes)` will compile but at run-time will produce an error asserting that
		* the DataView constructor requires an ArrayBuffer. The correct usage is `new ByteStream(bytes.buffer)`.
		* 2. Given `bytes: Uint8Array`, `new ByteStream(bytes.buffer)` creates a stream for the entire range of bytes represented by the underlying
		* ArrayBuffer. If `bytes` represents only a **sub-range** of the underlying buffer's data, the results will be unexpected unless the optional `subView`
		* argument is supplied, with correct offset and length.
		*
		* For both of the above reasons, this constructor is private, and [[fromUint8Array]] or [[fromArrayBuffer]] should be used to create a ByteStream.
		*/
		constructor(buffer, subView) {
			if (void 0 !== subView) {
				this._view = new DataView(buffer, subView.byteOffset, subView.byteLength);
				this._byteOffset = subView.byteOffset;
			} else {
				this._view = new DataView(buffer);
				this._byteOffset = 0;
			}
		}
		/** Construct a new ByteStream for the range of bytes represented by `bytes`, which may be a subset of the range of bytes
		* represented by the underlying ArrayBuffer. The read position will be set to the beginning of the range of bytes.
		* @param bytes The Uint8Array from which data is to be extracted.
		*/
		static fromUint8Array(bytes) {
			const { byteOffset, byteLength } = bytes;
			return new ByteStream(bytes.buffer, {
				byteOffset,
				byteLength
			});
		}
		/** Construct a new ByteStream with the read position set to the beginning.
		* @param buffer The underlying buffer from which data is to be extracted.
		* @param subView If defined, specifies the subset of the underlying buffer's data to use.
		*/
		static fromArrayBuffer(buffer, subView) {
			return new ByteStream(buffer, subView);
		}
		/** The number of bytes in this stream */
		get length() {
			return this._view.byteLength;
		}
		/** The number of bytes remaining to be read, from [[curPos]] to the end of the stream. */
		get remainingLength() {
			return this.length - this.curPos;
		}
		/** Returns true if the current read position has been advanced past the end of the stream. This generally indicates that an attempt was made to read more data than is available.
		* @see [[isAtTheEnd]]
		*/
		get isPastTheEnd() {
			return this.curPos > this.length;
		}
		/** Returns true if the current read position has advanced precisely to the end of the stream, indicating all of the data has been consumed.
		* @see [[isPastTheEnd]].
		*/
		get isAtTheEnd() {
			return this.curPos === this.length;
		}
		/** The current read position as an index into the stream of bytes. */
		get curPos() {
			return this._curPos;
		}
		set curPos(pos) {
			this._curPos = pos;
			this.isPastTheEnd;
		}
		/** Adds the specified number of bytes to the current read position */
		advance(numBytes) {
			this.curPos = this.curPos + numBytes;
			return !this.isPastTheEnd;
		}
		/** Subtracts the specified number of bytes from the current read position */
		rewind(numBytes) {
			if (this.curPos - numBytes < 0) return false;
			this.curPos = this.curPos - numBytes;
			return true;
		}
		/** Resets the current read position to the beginning of the stream */
		reset() {
			this.curPos = 0;
		}
		/** Read a unsigned 8-bit integer from the current read position and advance by 1 byte. */
		readUint8() {
			return this.read(1, (view) => view.getUint8(this.curPos));
		}
		/** Read an unsigned 16-bit integer from the current read position and advance by 2 bytes. */
		readUint16() {
			return this.read(2, (view) => view.getUint16(this.curPos, true));
		}
		/** Read an unsigned 32-bit integer from the current read position and advance by 4 bytes. */
		readUint32() {
			return this.read(4, (view) => view.getUint32(this.curPos, true));
		}
		/** Read a signed 32-bit integer from the current read position and advance by 4 bytes. */
		readInt32() {
			return this.read(4, (view) => view.getInt32(this.curPos, true));
		}
		/** Read a 32-bit floating point number from the current read position and advance by 4 bytes. */
		readFloat32() {
			return this.read(4, (view) => view.getFloat32(this.curPos, true));
		}
		/** Read a 64-bit floating point number from the current read position and advance by 8 bytes. */
		readFloat64() {
			return this.read(8, (view) => view.getFloat64(this.curPos, true));
		}
		/** Read an unsigned 64-bit integer from the current read position, advance by 8 bytes, and return the 64-bit value as an Id64String. */
		readId64() {
			return Id64.fromUint32Pair(this.readUint32(), this.readUint32());
		}
		/** Read an unsigned 24-bit integer from the current read position and advance by 3 bytes. */
		readUint24() {
			return this.readUint8() | this.readUint8() << 8 | this.readUint8() << 16;
		}
		/** Read the specified number of bytes beginning at the current read position into a Uint8Array and advance by the specified number of byte.
		* @param numBytes The number of bytes to read.
		*/
		nextBytes(numBytes) {
			const bytes = new Uint8Array(this.arrayBuffer, this.curPos + this._byteOffset, numBytes);
			this.advance(numBytes);
			return bytes;
		}
		/** Read the specified number of bytes at the specified offset without changing the read position. */
		readBytes(readPos, numBytes) {
			return new Uint8Array(this.arrayBuffer, readPos + this._byteOffset, numBytes);
		}
		/** Read the specified number of unsigned 32-bit integers from the current read position and advance the read position. */
		nextUint32s(numUint32s) {
			const numBytes = numUint32s * 4;
			const uint32s = new Uint32Array(this.arrayBuffer, this.curPos + this._byteOffset, numUint32s);
			this.advance(numBytes);
			return uint32s;
		}
		/** Returns the underlying array buffer */
		get arrayBuffer() {
			return this._view.buffer;
		}
		read(numBytes, read) {
			const result = read(this._view);
			this.advance(numBytes);
			return result;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ClassUtils.js
var init_ClassUtils = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Compare.js
/** @packageDocumentation
* @module Utils
*/
/**
* An [[OrderedComparator]] for numbers that treats two numbers as equal if the absolute value of their difference is less than a specified tolerance.
* @public
*/
function compareWithTolerance(a, b, tolerance = .1) {
	if (a < b - tolerance) return -1;
	else if (a > b + tolerance) return 1;
	else return 0;
}
/** @public */
function compareNumbers(a, b) {
	return a - b;
}
/** @public */
function compareBooleans(a, b) {
	return a !== b ? a < b ? -1 : 1 : 0;
}
/** @public */
function compareStrings(a, b) {
	return a === b ? 0 : a < b ? -1 : 1;
}
/** @public */
function comparePossiblyUndefined(compareDefined, lhs, rhs) {
	if (void 0 === lhs) return void 0 === rhs ? 0 : -1;
	else if (void 0 === rhs) return 1;
	else return compareDefined(lhs, rhs);
}
/** @public */
function compareStringsOrUndefined(lhs, rhs) {
	return comparePossiblyUndefined(compareStrings, lhs, rhs);
}
/** @public */
function compareNumbersOrUndefined(lhs, rhs) {
	return comparePossiblyUndefined(compareNumbers, lhs, rhs);
}
/** @public */
function compareBooleansOrUndefined(lhs, rhs) {
	return comparePossiblyUndefined(compareBooleans, lhs, rhs);
}
/**
* Compare two simples types (number, string, boolean)
* This essentially wraps the existing type-specific comparison functions
* @beta */
function compareSimpleTypes(lhs, rhs) {
	let cmp = 0;
	cmp = compareStrings(typeof lhs, typeof rhs);
	if (cmp !== 0) return cmp;
	switch (typeof lhs) {
		case "number": return compareNumbers(lhs, rhs);
		case "string": return compareStrings(lhs, rhs);
		case "boolean": return compareBooleans(lhs, rhs);
	}
	return cmp;
}
/**
* Compare two arrays of simple types (number, string, boolean)
* @beta
*/
function compareSimpleArrays(lhs, rhs) {
	if (void 0 === lhs) return void 0 === rhs ? 0 : -1;
	else if (void 0 === rhs) return 1;
	else if (lhs.length === 0 && rhs.length === 0) return 0;
	else if (lhs.length !== rhs.length) return lhs.length - rhs.length;
	let cmp = 0;
	for (let i = 0; i < lhs.length; i++) {
		cmp = compareSimpleTypes(lhs[i], rhs[i]);
		if (cmp !== 0) break;
	}
	return cmp;
}
/** Compare two arrays of the same type `T` using the specified `compare` function to compare each pair of array elements.
* @returns 0 if the arrays have the same length and `compare` returns 0 for each pair of elements, or a non-zero value if the arrays differ in length or contents.
* @public
*/
function compareArrays(lhs, rhs, compare) {
	let diff = compareNumbers(lhs.length, rhs.length);
	if (!diff) for (let i = 0; i < lhs.length; i++) {
		diff = compare(lhs[i], rhs[i]);
		if (diff) break;
	}
	return diff;
}
var init_Compare = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OrderedId64Iterable.js
var OrderedId64Iterable;
var init_OrderedId64Iterable = __esmMin((() => {
	init_Assert();
	(function(OrderedId64Iterable) {
		/** An ordered comparison of [[Id64String]]s suitable for use with sorting routines like
		* [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) and sorted containers
		* like [[SortedArray]] and [[Dictionary]]. The comparison compares the 64-bit numerical values of the two Ids, returning a negative number if lhs < rhs,
		* a positive number if lhs > rhs, or zero if lhs == rhs.
		* The default string comparison is fine (and more efficient) when numerical ordering is not required; use this instead if you want e.g., "0x100" to be greater than "0xf".
		* @see [[OrderedId64Iterable.sortArray]] for a convenient way to sort an array of Id64Strings.
		*/
		function compare(lhs, rhs) {
			if (lhs.length !== rhs.length) return lhs.length < rhs.length ? -1 : 1;
			if (lhs !== rhs) return lhs < rhs ? -1 : 1;
			return 0;
		}
		OrderedId64Iterable.compare = compare;
		/** Sort an array of [[Id64String]]s **in-place** in ascending order by their 64-bit numerical values.
		* @see [[OrderedId64Iterable.compare]] for the comparison routine used.
		* @returns the input array.
		* @note This function returns its input for consistency with Javascript's
		* [Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method.
		* It **does not** create a **new** array.
		*/
		function sortArray(ids) {
			ids.sort((x, y) => compare(x, y));
			return ids;
		}
		OrderedId64Iterable.sortArray = sortArray;
		/** Given two ordered collections of [[Id64String]]s, determine whether they are identical sets. Duplicate Ids are ignored.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function areEqualSets(ids1, ids2) {
			const leftIter = uniqueIterator(ids1);
			const rightIter = uniqueIterator(ids2);
			let leftState = leftIter.next();
			let rightState = rightIter.next();
			while (!leftState.done && !rightState.done) {
				const left = leftState.value;
				const right = rightState.value;
				if (0 !== compare(left, right)) return false;
				leftState = leftIter.next();
				rightState = rightIter.next();
			}
			if (leftState.done && rightState.done) return true;
			return false;
		}
		OrderedId64Iterable.areEqualSets = areEqualSets;
		/** Given an ordered collection of [[Id64String]]s, determine if it contains any Ids.
		* @param ids A well-formed, ordered collection of zero or more valid Ids.
		* @returns true if the input represents an empty set of Ids. The result is unspecified if the input does not meet the criteria for the input type.
		*/
		function isEmptySet(ids) {
			if (typeof ids === "string") return "" === ids;
			return true === ids[Symbol.iterator]().next().done;
		}
		OrderedId64Iterable.isEmptySet = isEmptySet;
		/** Given an ordered collection of [[Id64String]]s possibly containing duplicates, produce an ordered collection containing no duplicates.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function unique(ids) {
			return { [Symbol.iterator]: () => uniqueIterator(ids) };
		}
		OrderedId64Iterable.unique = unique;
		/** Given an ordered collection of [[Id64String]]s possibly containing duplicates, produce an ordered iterator over the distinct Ids, eliminating duplicates.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function* uniqueIterator(ids) {
			const iter = ids[Symbol.iterator]();
			let state = iter.next();
			let prev;
			while (!state.done) {
				const id = state.value;
				state = iter.next();
				if (id !== prev) {
					prev = id;
					yield id;
				}
			}
		}
		OrderedId64Iterable.uniqueIterator = uniqueIterator;
		/** Given two ordered collections of [[Id64String]]s, produce a collection representing their union - i.e., the Ids that are present in either or both collections.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function union(ids1, ids2) {
			return { [Symbol.iterator]: () => unionIterator(ids1, ids2) };
		}
		OrderedId64Iterable.union = union;
		/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their intersection - i.e., the Ids that are present in both collections.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function intersection(ids1, ids2) {
			return { [Symbol.iterator]: () => intersectionIterator(ids1, ids2) };
		}
		OrderedId64Iterable.intersection = intersection;
		/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their difference - i.e., the Ids that are present in `ids1` but not present in `ids2`.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function difference(ids1, ids2) {
			return { [Symbol.iterator]: () => differenceIterator(ids1, ids2) };
		}
		OrderedId64Iterable.difference = difference;
		/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their union - i.e., the Ids that are present in either or both collections.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function* unionIterator(ids1, ids2) {
			const leftIter = ids1[Symbol.iterator]();
			const rightIter = ids2[Symbol.iterator]();
			let leftState = leftIter.next();
			let rightState = rightIter.next();
			let prev;
			while (!leftState.done || !rightState.done) {
				const left = leftState.done ? void 0 : leftState.value;
				const right = rightState.done ? void 0 : rightState.value;
				if (void 0 === left && void 0 === right) break;
				let next;
				if (void 0 === left) {
					next = right;
					rightState = rightIter.next();
				} else if (void 0 === right) {
					next = left;
					leftState = leftIter.next();
				} else {
					const cmp = compare(left, right);
					if (cmp <= 0) {
						next = left;
						leftState = leftIter.next();
						if (0 === cmp) rightState = rightIter.next();
					} else {
						next = right;
						rightState = rightIter.next();
					}
				}
				if (prev === next) continue;
				prev = next;
				yield next;
			}
		}
		OrderedId64Iterable.unionIterator = unionIterator;
		/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their intersection - i.e., the Ids that are present in both collections.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function* intersectionIterator(ids1, ids2) {
			const leftIter = ids1[Symbol.iterator]();
			const rightIter = ids2[Symbol.iterator]();
			let leftState = leftIter.next();
			let rightState = rightIter.next();
			let prev;
			while (!leftState.done && !rightState.done) {
				const left = leftState.value;
				leftState = leftIter.next();
				if (left === prev) continue;
				prev = left;
				let right = rightState.value;
				let cmp = compare(left, right);
				while (cmp > 0) {
					rightState = rightIter.next();
					if (rightState.done) return;
					right = rightState.value;
					cmp = compare(left, right);
				}
				if (0 === cmp) yield left;
			}
		}
		OrderedId64Iterable.intersectionIterator = intersectionIterator;
		/** Given two ordered collections of [[Id64String]]s, produce an iterator representing their difference - i.e., the Ids that are present in `ids1` but not present in `ids2`.
		* @note If the inputs are not ordered as required by [[OrderedId64Iterable]], the results are unpredictable.
		*/
		function* differenceIterator(ids1, ids2) {
			const leftIter = ids1[Symbol.iterator]();
			const rightIter = ids2[Symbol.iterator]();
			let leftState = leftIter.next();
			let rightState = rightIter.next();
			let prev;
			while (!leftState.done) {
				const left = leftState.value;
				leftState = leftIter.next();
				if (left === prev) continue;
				else if (rightState.done) {
					yield prev = left;
					continue;
				}
				let right = rightState.value;
				let cmp = compare(left, right);
				while (cmp > 0 && !rightState.done) {
					rightState = rightIter.next();
					if (rightState.done) {
						yield prev = left;
						continue;
					}
					right = rightState.value;
					cmp = compare(left, right);
				}
				if (cmp < 0) yield prev = left;
			}
		}
		OrderedId64Iterable.differenceIterator = differenceIterator;
	})(OrderedId64Iterable || (OrderedId64Iterable = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/SortedArray.js
/** @packageDocumentation
* @module Collections
*/
/**
* A [[CloneFunction]] that, given a value of type T, returns the same value.
* Useful as a default argument for functions that can alternatively accept custom logic for cloning values of object type.
* @param value The value to clone.
* @returns the input value.
* @public
*/
function shallowClone(value) {
	return value;
}
/**
* Given a sorted array, computes the position at which the specified value should be inserted into the array so that the array remains sorted.
* @param value The value whose position is to be computed.
* @param list An array of U already sorted according to the comparison criterion.
* @param compare The function used to compare the value with elements in `list`.
* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent element already exists at that index.
* @public
*/
function lowerBound(value, list, compare) {
	return lowerBoundOfEquivalent(list, (element) => compare(value, element));
}
function lowerBoundOfEquivalent(list, criterion) {
	let low = 0;
	let high = list.length;
	while (low < high) {
		const mid = Math.floor((low + high) / 2);
		const comp = criterion(list[mid]);
		if (0 === comp) return {
			index: mid,
			equal: true
		};
		else if (comp < 0) high = mid;
		else low = mid + 1;
	}
	return {
		index: low,
		equal: false
	};
}
var DuplicatePolicy, ReadonlySortedArray, SortedArray;
var init_SortedArray = __esmMin((() => {
	(function(DuplicatePolicy) {
		/** The array allows duplicate values to be inserted. All duplicate values will be adjacent in the array, but the ordering between duplicate values is unspecified.
		* @note In the presence of duplicate values, functions like [[SortedArray.indexOf]] and [[SortedArray.findEqual]] will return one of the values - exactly which one is unspecified.
		*/
		DuplicatePolicy[DuplicatePolicy["Allow"] = 0] = "Allow";
		/** Duplicate values are forbidden - when attempting to insert a value equivalent to one already present, the already-present value is retained. */
		DuplicatePolicy[DuplicatePolicy["Retain"] = 1] = "Retain";
		/** Duplicate values are forbidden - when attempting to insert a value equivalent to one already present, the already-present value is replaced by the new value.
		* This can be useful when the value type carries additional data that is not evaluated by the comparison function.
		*/
		DuplicatePolicy[DuplicatePolicy["Replace"] = 2] = "Replace";
	})(DuplicatePolicy || (DuplicatePolicy = {}));
	ReadonlySortedArray = class ReadonlySortedArray {
		_array = [];
		_compare;
		_clone;
		_duplicatePolicy;
		/**
		* Construct a new ReadonlySortedArray<T>.
		* @param compare The function used to compare elements within the array.
		* @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
		* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
		*/
		constructor(compare, duplicatePolicy = false, clone = shallowClone) {
			this._compare = compare;
			this._clone = clone;
			if (typeof duplicatePolicy === "boolean") duplicatePolicy = duplicatePolicy ? DuplicatePolicy.Allow : DuplicatePolicy.Retain;
			this._duplicatePolicy = duplicatePolicy;
		}
		/** The number of elements in the array */
		get length() {
			return this._array.length;
		}
		/** Returns true if the array contains no elements. */
		get isEmpty() {
			return 0 === this.length;
		}
		/** Returns an iterator over the contents of the array in sorted order, suitable for use in `for-of` loops. */
		[Symbol.iterator]() {
			return this._array[Symbol.iterator]();
		}
		/**
		* Looks up the index of an element comparing equal to the specified value using binary search.
		* @param value The value to search for
		* @returns the index of the first equivalent element found in the array, or -1 if no such element exists.
		*/
		indexOf(value) {
			const bound = this.lowerBound(value);
			return bound.equal ? bound.index : -1;
		}
		/**
		* Returns true if this array contains at least one value comparing equal to the specified value.
		* @param value The value to search for
		* @returns true if an equivalent element exists in the array.
		*/
		contains(value) {
			return -1 !== this.indexOf(value);
		}
		/**
		* Looks up an element comparing equal to the specified value using binary search.
		* @param value The value to search for
		* @returns the first equivalent element found in the array, or undefined if no such element exists.
		*/
		findEqual(value) {
			const index = this.indexOf(value);
			return -1 !== index ? this._array[index] : void 0;
		}
		/** Find an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
		* As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find a model by its Id,
		* use `sortedArray.findEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
		* @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if it compares as "less-than", or a positive value if it compares as "greater-than".
		* @returns The first element found that meets the criterion, or `undefined` if no elements meet the criterion.
		* @see [[indexOfEquivalent]].
		* @public
		*/
		findEquivalent(criterion) {
			const index = this.indexOfEquivalent(criterion);
			return -1 !== index ? this._array[index] : void 0;
		}
		/** Find the index of an element that compares as equivalent based on some criterion. If multiple elements are equivalent, the specific one returned is unspecified.
		* As an example, consider a `SortedArray<ModelState>` which uses `ModelState.id` as its ordering criterion. To find the index of a model by its Id,
		* use `sortedArray.indexOfEquivalent((element) => compareStrings(element.id, modelId))` where `modelId` is an [[Id64String]].
		* @param criterion A function accepting an element and returning 0 if it compares as equivalent, a negative number if the element compares as "less-than", or a positive value if the element compares as "greater-than".
		* @returns The index of the first element found that meets the criterion, or -1 if no elements meet the criterion.
		* @public
		*/
		indexOfEquivalent(criterion) {
			const bound = lowerBoundOfEquivalent(this._array, (elem) => 0 - criterion(elem));
			return bound.equal ? bound.index : -1;
		}
		/**
		* Looks up an element by its index in the array.
		* @param index The array index
		* @returns the element corresponding to that position in the array, or undefined if the supplied index exceeds the length of the array.
		*/
		get(index) {
			return index < this.length ? this._array[index] : void 0;
		}
		/** Apply a function to each element in the array, in sorted order.
		* @param func The function to be applied.
		*/
		forEach(func) {
			for (let i = 0; i < this.length; i++) func(this._array[i]);
		}
		/** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
		slice(start, end) {
			const slice = new ReadonlySortedArray(this._compare, this._duplicatePolicy, this._clone);
			slice._array = this._array.slice(start, end);
			return slice;
		}
		/**
		* Computes the position at which the specified value should be inserted to maintain sorted order.
		* @param value The value whose position is to be computed.
		* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent element already exists at that index.
		*/
		lowerBound(value) {
			return lowerBound(value, this._array, this._compare);
		}
		/** Clears the contents of the sorted array. */
		_clear() {
			this._array.length = 0;
		}
		/** Extracts the sorted array as a T[] and empties the contents of this ReadonlySortedArray.
		* @returns the contents of this ReadonlySortedArray as a T[].
		*/
		_extractArray() {
			const result = this._array;
			this._array = [];
			return result;
		}
		/**
		* Attempts to insert a new value into the array at a position determined by the ordering.
		* The behavior differs based on the array's [[DuplicatePolicy]]:
		* If duplicates are **not** permitted, then:
		*  - If an equivalent element already exists in the array:
		*    - [[DuplicatePolicy.Retain]]: nothing will be inserted and the index of the existing element will be returned.
		*    - [[DuplicatePolicy.Replace]]: the input value will overwrite the existing element at the same index and that index will be returned.
		*  - Otherwise, the element is inserted and its index is returned.
		* If duplicates **are** permitted, then:
		*  - The element will be inserted in a correct position based on the sorting criterion;
		*  - The position of the element relative to other elements comparing as equal to it is unspecified; and
		*  - The actual index of the newly-inserted element is returned.
		* If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
		* @param value The value to insert
		* @param onInsert The optional callback method to call if insertion occurs with the inserted value
		* @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
		*/
		_insert(value, onInsert) {
			const bound = this.lowerBound(value);
			if (bound.equal) switch (this._duplicatePolicy) {
				case DuplicatePolicy.Retain: return bound.index;
				case DuplicatePolicy.Replace:
					this._array[bound.index] = this._clone(value);
					if (onInsert) onInsert(value);
					return bound.index;
			}
			this._array.splice(bound.index, 0, this._clone(value));
			if (void 0 !== onInsert) onInsert(value);
			return bound.index;
		}
		/**
		* Removes the first occurrence of a value comparing equal to the specified value from the array.
		* @param value The value of the element to delete
		* @returns the index of the deleted value, or -1 if no such element exists.
		*/
		_remove(value) {
			const bound = this.lowerBound(value);
			if (bound.equal) {
				this._array.splice(bound.index, 1);
				return bound.index;
			} else return -1;
		}
	};
	SortedArray = class SortedArray extends ReadonlySortedArray {
		/**
		* Construct a new SortedArray<T>.
		* @param compare The function used to compare elements within the array.
		* @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
		* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
		*/
		constructor(compare, duplicatePolicy = false, clone = shallowClone) {
			super(compare, duplicatePolicy, clone);
		}
		/** Clears the contents of the sorted array. */
		clear() {
			this._clear();
		}
		/** Extracts the sorted array as a T[] and empties the contents of this SortedArray.
		* @returns the contents of this SortedArray as a T[].
		*/
		extractArray() {
			return this._extractArray();
		}
		/**
		* Attempts to insert a new value into the array at a position determined by the ordering.
		* The behavior differs based on whether or not duplicate elements are permitted.
		* If duplicates are **not** permitted, then:
		*  - If an equivalent element already exists in the array, nothing will be inserted and the index of the existing element will be returned.
		*  - Otherwise, the element is inserted and its index is returned.
		* If duplicates **are** permitted, then:
		*  - The element will be inserted in a correct position based on the sorting criterion;
		*  - The position of the element relative to other elements comparing as equal to it is unspecified; and
		*  - The actual index of the newly-inserted element is returned.
		* If the element is to be inserted, then the supplied value will be passed to the clone function supplied to the constructor and the result will be inserted into the array.
		* @param value The value to insert
		* @param onInsert The optional callback method to call if insertion occurs with the inserted value
		* @returns the index in the array of the newly-inserted value, or, if duplicates are not permitted and an equivalent value already exists, the index of the equivalent value.
		*/
		insert(value, onInsert) {
			return this._insert(value, onInsert);
		}
		/**
		* Removes the first occurrence of a value comparing equal to the specified value from the array.
		* @param value The value of the element to delete
		* @returns the index of the deleted value, or -1 if no such element exists.
		*/
		remove(value) {
			return this._remove(value);
		}
		/** The equivalent of [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice). */
		slice(start, end) {
			const slice = new SortedArray(this._compare, this._duplicatePolicy, this._clone);
			slice._array = this._array.slice(start, end);
			return slice;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/CompressedId64Set.js
var CompressedId64Set, OrderedId64Array, MutableCompressedId64Set;
var init_CompressedId64Set = __esmMin((() => {
	init_Assert();
	init_Id();
	init_OrderedId64Iterable();
	init_SortedArray();
	(function(CompressedId64Set) {
		function isHexDigit(ch) {
			return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70;
		}
		function compactRange(increment, length) {
			const inc = `+${increment.toString()}`;
			if (length <= 1) return inc;
			return `${inc}*${length.toString(16).toUpperCase()}`;
		}
		/** Given a set of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
		* @note Invalid Ids are ignored.
		* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
		* @see [[CompressedId64Set.compressArray]] to perform the same operation on an [[Id64Array]].
		* @see [[CompressedId64Set.decompressSet]] to perform the inverse operation.
		*/
		function compressSet(ids) {
			return sortAndCompress(ids);
		}
		CompressedId64Set.compressSet = compressSet;
		/** Create a sorted array from `ids`, then return a compact string representation of those Ids.
		* @see [[CompressedId64Set.compressIds]] if `ids` is known to already be sorted.
		*/
		function sortAndCompress(ids) {
			const arr = typeof ids === "string" ? [ids] : Array.from(ids);
			OrderedId64Iterable.sortArray(arr);
			return compressArray(arr);
		}
		CompressedId64Set.sortAndCompress = sortAndCompress;
		/** Give a **numerically-ordered** array of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
		* Duplicate Ids are included only once in the string representation.
		* @throws Error if two consecutive Ids `x` and `y` exist such that the numerical value of `x` is greater than that of `y` - i.e., the array is not properly sorted.
		* @note The array must be sorted according to the 64-bit numerical value of each Id.
		* @note Invalid Ids are ignored.
		* @see [[CompressedId64Set.decompressArray]] to perform the inverse operation.
		* @see [[OrderedId64Iterable.sortArray]] to ensure the Ids are properly sorted.
		* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
		*/
		function compressArray(ids) {
			return compressIds(ids);
		}
		CompressedId64Set.compressArray = compressArray;
		/** Give a **numerically-ordered** collection of [[Id64String]]s, produce a compact string representation. Useful when serializing potentially large sets of Ids.
		* Duplicate Ids are included only once in the string representation.
		* @throws Error if two consecutive Ids `x` and `y` exist such that the numerical value of `x` is greater than that of `y` - i.e., the collection is not properly sorted.
		* @note The collection must be sorted according to the 64-bit numerical value of each Id.
		* @note Invalid Ids are ignored.
		* @see [[CompressedId64Set.iterable]] to perform the inverse operation.
		* @see [[OrderedId64Iterable.sortArray]] or [[OrderedId64Iterable.compare]] to ensure the Ids are properly sorted.
		* @see [[CompressedId64Set.sortAndCompress]] to compress any unordered collection of Ids.
		*/
		function compressIds(ids) {
			if ("string" === typeof ids) return ids;
			let str = "";
			const prevId = new Uint64();
			const rangeIncrement = new Uint64();
			let rangeLen = 0;
			const curId = new Uint64();
			const curIncrement = new Uint64();
			for (const id of ids) {
				if (!Id64.isValidId64(id)) continue;
				curId.setFromId(id);
				curIncrement.setFromDifference(curId, prevId);
				const cmp = prevId.compare(curId);
				if (0 === cmp) continue;
				else if (cmp > 0) throw new Error("CompressedId64Set.compressArray requires a sorted array as input");
				prevId.copyFrom(curId);
				if (0 === rangeLen) {
					rangeIncrement.copyFrom(curIncrement);
					rangeLen = 1;
				} else if (curIncrement.equals(rangeIncrement)) ++rangeLen;
				else {
					str += compactRange(rangeIncrement, rangeLen);
					rangeIncrement.copyFrom(curIncrement);
					rangeLen = 1;
				}
			}
			if (0 < rangeLen) str += compactRange(rangeIncrement, rangeLen);
			return str;
		}
		CompressedId64Set.compressIds = compressIds;
		/** This exists strictly for the purposes of compressed sets of 64-bit Ids, to avoid the overhead of BigInt for handling 64-bit integers. */
		class Uint64 {
			lower;
			upper;
			static _base = 4294967296;
			static assertUint32(num) {
				Uint64._base;
			}
			assertConstraints() {
				Uint64.assertUint32(this.lower);
				Uint64.assertUint32(this.upper);
			}
			constructor(lower = 0, upper = 0) {
				this.lower = lower;
				this.upper = upper;
				this.assertConstraints();
			}
			compare(rhs) {
				const diff = this.upper - rhs.upper;
				return 0 === diff ? this.lower - rhs.lower : diff;
			}
			equals(rhs) {
				return 0 === this.compare(rhs);
			}
			isLessThan(rhs) {
				return this.compare(rhs) < 0;
			}
			isGreaterThan(rhs) {
				return this.compare(rhs) > 0;
			}
			get isZero() {
				return 0 === this.lower && 0 === this.upper;
			}
			setFromDifference(lhs, rhs) {
				rhs.isGreaterThan(lhs);
				this.lower = lhs.lower - rhs.lower;
				this.upper = lhs.upper - rhs.upper;
				if (this.lower < 0) {
					this.lower += Uint64._base;
					this.upper -= 1;
				}
			}
			add(rhs) {
				let lower = rhs.lower;
				let upper = rhs.upper;
				if (lower + this.lower >= Uint64._base) {
					lower -= Uint64._base;
					upper += 1;
				}
				this.lower += lower;
				this.upper += upper;
				this.assertConstraints();
			}
			setFromId(id) {
				Id64.getUint32Pair(id, this);
			}
			copyFrom(other) {
				this.lower = other.lower;
				this.upper = other.upper;
			}
			toString() {
				if (0 === this.upper) return this.lower.toString(16).toUpperCase();
				const upper = this.upper.toString(16);
				const lower = this.lower.toString(16).padStart(8, "0");
				lower.length;
				return `${upper}${lower}`.toUpperCase();
			}
			toId64String() {
				return Id64.fromUint32Pair(this.lower, this.upper);
			}
		}
		/** Supplies an iterator over the [[Id64String]]s in a [[CompressedId64Set]].
		* The Ids are iterated in ascending order based on their unsigned 64-bit integer values.
		*/
		function* iterator(ids) {
			if (0 === ids.length) return;
			if ("+" !== ids[0]) throw new Error("Invalid CompressedId64Set");
			let curIndex = 1;
			const curId = new Uint64();
			function parseUint32() {
				let value = 0;
				let nChars = 0;
				while (curIndex < ids.length && nChars < 8) {
					++nChars;
					const ch = ids.charCodeAt(curIndex);
					if (!isHexDigit(ch)) break;
					value <<= 4;
					value |= ch >= 65 ? ch - 65 + 10 : ch - 48;
					value = value >>> 0;
					++curIndex;
				}
				return value;
			}
			function parseUint64(uint64) {
				let lower = 0;
				let upper = 0;
				const startIndex = curIndex;
				const first = parseUint32();
				if (8 === curIndex - startIndex && curIndex + 1 < ids.length && isHexDigit(ids.charCodeAt(curIndex + 1))) {
					const secondIndex = curIndex;
					const second = parseUint32();
					const nSecondDigits = curIndex - secondIndex;
					const nDigitsToTransfer = 8 - nSecondDigits;
					upper = first >>> 4 * nDigitsToTransfer;
					lower = (second | first - (upper << 4 * nDigitsToTransfer >>> 0) << 4 * nSecondDigits >>> 0) >>> 0;
				} else lower = first;
				uint64.lower = lower;
				uint64.upper = upper;
			}
			const increment = new Uint64();
			while (curIndex < ids.length) {
				let multiplier = 1;
				parseUint64(increment);
				if (increment.isZero) throw new Error("Invalid CompressedId64Set");
				if (curIndex < ids.length) switch (ids[curIndex++]) {
					case "*":
						multiplier = parseUint32();
						if (0 === multiplier) throw new Error("Invalid CompressedId64Set");
						if (curIndex !== ids.length && ids[curIndex++] !== "+") return;
						break;
					case "+": break;
					default: throw new Error("Invalid CompressedId64Set");
				}
				for (let i = 0; i < multiplier; i++) {
					curId.add(increment);
					yield curId.toId64String();
				}
			}
		}
		CompressedId64Set.iterator = iterator;
		/** Supplies an iterable over the [[Id64String]]s in a [[CompressedId64Set]].
		* The Ids are iterated in ascending order based on their unsigned 64-bit integer values.
		*/
		function iterable(ids) {
			return { [Symbol.iterator]: () => iterator(ids) };
		}
		CompressedId64Set.iterable = iterable;
		/** Decompress the compact string representation of an [[Id64Set]] into an [[Id64Set]].
		* @param compressedIds The compact string representation.
		* @param out If supplied, the Ids will be inserted into this set rather than allocating and returning a new set.
		* @returns The set containing the decompressed Ids.
		* @throws Error if `compressedIds` is not a well-formed [[CompressedId64Set]].
		* @see [[CompressedId64Set.compressSet]] to perform the inverse operation.
		* @see [[CompressedId64Set.decompressArray]] to decompress as an [[Id64Array]] instead.
		* @see [[CompressedId64Set.iterable]] to efficiently iterate the Ids.
		*/
		function decompressSet(compressedIds, out) {
			const set = out ?? /* @__PURE__ */ new Set();
			for (const id of iterable(compressedIds)) set.add(id);
			return set;
		}
		CompressedId64Set.decompressSet = decompressSet;
		/** Decompress the compact string representation of an [[Id64Set]] into an [[Id64Array]].
		* @param compressedIds The compact string representation.
		* @param out If supplied, the Ids will be appended to this array rather than allocating and returning a new array.
		* @returns The array containing the decompressed Ids.
		* @throws Error if `compressedIds` is not a well-formed [[CompressedId64Set]].
		* @note The Ids are decompressed and appended to the array in ascending order based on their 64-bit numerical values.
		* @see [[CompressedId64Set.compressArray]] to perform the inverse operation.
		* @see [[CompressedId64Set.decompressSet]] to decompress as an [[Id64Set]] instead.
		* @see [[CompressedId64Set.iterable]] to efficiently iterate the Ids.
		*/
		function decompressArray(compressedIds, out) {
			const arr = out ?? [];
			for (const id of iterable(compressedIds)) arr.push(id);
			return arr;
		}
		CompressedId64Set.decompressArray = decompressArray;
	})(CompressedId64Set || (CompressedId64Set = {}));
	OrderedId64Array = class extends SortedArray {
		/** Construct a new, empty array. */
		constructor() {
			super((lhs, rhs) => OrderedId64Iterable.compare(lhs, rhs));
		}
		/** An iterable that iterates over the Ids in sorted order. */
		get ids() {
			return this._array;
		}
		/** The underlying array of Ids. */
		get array() {
			return this._array;
		}
	};
	MutableCompressedId64Set = class MutableCompressedId64Set {
		_ids;
		_inserted = new OrderedId64Array();
		_deleted = new OrderedId64Array();
		/** Construct a new set, optionally initialized to contain the Ids represented by `ids`. */
		constructor(ids) {
			this._ids = ids ?? "";
		}
		/** Obtain the compact string representation of the contents of this set. If any insertions or removals are pending, they will be applied and the string recomputed. */
		get ids() {
			this.updateIds();
			return this._ids;
		}
		/** Add the specified Id to the set.
		* @throws Error if `id` is not a valid [[Id64String]].
		*/
		add(id) {
			if (!Id64.isValidId64(id)) throw new Error("MutableCompressedId64Set.add: invalid Id");
			this._deleted.remove(id);
			this._inserted.insert(id);
		}
		/** Remove the specified Id from the set.
		* @throws Error if `id` is not a valid [[Id64String]].
		*/
		delete(id) {
			if (!Id64.isValidId64(id)) throw new Error("MutableCompressedId64Set.delete: invalid Id");
			this._inserted.remove(id);
			this._deleted.insert(id);
		}
		/** Remove all Ids from the set. */
		clear() {
			this._ids = "";
			this._inserted.clear();
			this._deleted.clear();
		}
		/** Remove all Ids from the set, then add the specified Ids. */
		reset(ids) {
			this.clear();
			this._ids = ids ?? "";
		}
		/** Obtain an iterator over the Ids in this set. The Ids are returned in ascending order based on their unsigned 64-bit integer values. */
		[Symbol.iterator]() {
			return CompressedId64Set.iterator(this.ids);
		}
		/** Compute a compact string representation of the union of this and another set of Ids - i.e., those Ids present in either this and/or the other set. */
		computeUnion(ids) {
			if (this.isEmpty) return CompressedId64Set.compressIds(ids);
			else if (OrderedId64Iterable.isEmptySet(ids) || this.equals(ids)) return this.ids;
			return CompressedId64Set.compressIds(OrderedId64Iterable.union(this, ids));
		}
		/** Compute a compact string representation of the intersection of this and another set of Ids - i.e., those Ids present in both this and the other set. */
		computeIntersection(ids) {
			if (this.equals(ids)) return this.ids;
			else if (this.isEmpty || OrderedId64Iterable.isEmptySet(ids)) return "";
			return CompressedId64Set.compressIds(OrderedId64Iterable.intersection(this, ids));
		}
		/** Compute a compact string representation of the difference between this and another set - i.e., those Ids present in this but not in the other set. */
		computeDifference(ids) {
			if (this.isEmpty || this.equals(ids)) return "";
			return CompressedId64Set.compressIds(OrderedId64Iterable.difference(this, ids));
		}
		/** Return true if this set contains no Ids. */
		get isEmpty() {
			return OrderedId64Iterable.isEmptySet(this.ids);
		}
		/** Return true if the set of Ids represented by `other` is identical to those in this set.
		* @note This considers only the **distinct** Ids in `other` - duplicates are ignored.
		*/
		equals(other) {
			if (other instanceof MutableCompressedId64Set) {
				if (other === this) return true;
				if (typeof other !== "string") other = other.ids;
			}
			if (typeof other === "string") return other === this.ids;
			this.updateIds();
			return OrderedId64Iterable.areEqualSets(this, other);
		}
		get _isDirty() {
			return !this._inserted.isEmpty || !this._deleted.isEmpty;
		}
		updateIds() {
			if (!this._isDirty) return;
			const difference = OrderedId64Iterable.difference(CompressedId64Set.iterable(this._ids), this._deleted.ids);
			const union = { [Symbol.iterator]: () => OrderedId64Iterable.unionIterator(difference, this._inserted.ids) };
			this._ids = CompressedId64Set.compressIds(union);
			this._inserted.clear();
			this._deleted.clear();
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Dictionary.js
var DictionaryIterator, Dictionary;
var init_Dictionary = __esmMin((() => {
	init_SortedArray();
	DictionaryIterator = class {
		_keys;
		_values;
		_curIndex = -1;
		constructor(keys, values) {
			this._keys = keys;
			this._values = values;
		}
		next() {
			if (++this._curIndex >= this._keys.length) return { done: true };
			else return {
				value: {
					key: this._keys[this._curIndex],
					value: this._values[this._curIndex]
				},
				done: false
			};
		}
	};
	Dictionary = class {
		_keys = [];
		_compareKeys;
		_cloneKey;
		_values = [];
		_cloneValue;
		/**
		* Construct a new Dictionary<K, V>.
		* @param compareKeys The function used to compare keys within the dictionary.
		* @param cloneKey The function invoked to clone a key for insertion into the dictionary. The default implementation simply returns its input.
		* @param cloneValue The function invoked to clone a value for insertion into the dictionary. The default implementation simply returns its input.
		*/
		constructor(compareKeys, cloneKey = shallowClone, cloneValue = shallowClone) {
			this._compareKeys = compareKeys;
			this._cloneKey = cloneKey;
			this._cloneValue = cloneValue;
		}
		/** The number of entries in the dictionary. */
		get size() {
			return this._keys.length;
		}
		/** Returns an iterator over the key-value pairs in the Dictionary suitable for use in `for-of` loops. Entries are returned in sorted order by key. */
		[Symbol.iterator]() {
			return new DictionaryIterator(this._keys, this._values);
		}
		/** Provides iteration over the keys in this Dictionary, in sorted order. */
		keys() {
			function* iterator(dict) {
				for (const entry of dict) yield entry.key;
			}
			return { [Symbol.iterator]: () => iterator(this) };
		}
		/** Provides iteration over the values in this Dictionary, in sorted order by the corresponding keys. */
		values() {
			function* iterator(dict) {
				for (const entry of dict) yield entry.value;
			}
			return { [Symbol.iterator]: () => iterator(this) };
		}
		/** Removes all entries from this dictionary */
		clear() {
			this._keys = [];
			this._values = [];
		}
		/**
		* Looks up a value by its key.
		* @param key The key to search for
		* @returns the value associated with the key, or undefined if the key is not present in the dictionary.
		*/
		get(key) {
			const bound = this.lowerBound(key);
			return bound.equal ? this._values[bound.index] : void 0;
		}
		/**
		* Determines if an entry exists for the specified key
		* @param key The key to search for
		* @returns true if an entry exists in this dictionary corresponding to the specified key.
		*/
		has(key) {
			return this.lowerBound(key).equal;
		}
		/**
		* Deletes a value using its key.
		* @param key The key to delete
		* @returns true if the key was found and deleted.
		*/
		delete(key) {
			const bound = this.lowerBound(key);
			if (bound.equal) {
				this._values.splice(bound.index, 1);
				this._keys.splice(bound.index, 1);
				return true;
			} else return false;
		}
		/**
		* Attempts to insert a new entry into the dictionary. If an entry with an equivalent key exists, the dictionary is unmodified.
		* If the new entry is in fact inserted, both the key and value will be cloned using the functions supplied to the dictionary's constructor.
		* @param key The key to associate with the value
		* @param value The value to associate with the key
		* @returns true if the new entry was inserted, false if an entry with an equivalent key already exists.
		*/
		insert(key, value) {
			return this.findOrInsert(key, value).inserted;
		}
		/** Obtains the value associated with the specified key, or inserts it if the specified key does not yet exist.
		* @param key The key to search for.
		* @param value The value to associate with `key` if `key` does not yet exist in the dictionary.
		* @returns The found or inserted value and a flag indicating whether the new value was inserted.
		*/
		findOrInsert(key, value) {
			const bound = this.lowerBound(key);
			if (bound.equal) return {
				value: this._values[bound.index],
				inserted: false
			};
			value = this._cloneValue(value);
			this._keys.splice(bound.index, 0, this._cloneKey(key));
			this._values.splice(bound.index, 0, this._cloneValue(value));
			return {
				value,
				inserted: true
			};
		}
		/**
		* Sets the value associated with the specified key in the dictionary.
		* If no such key already exists, this is equivalent to insert(key, value); otherwise, the existing value associated with the key is replaced.
		* In either case, the value will be cloned using the function supplied to the dictionary's constructor.
		*/
		set(key, value) {
			value = this._cloneValue(value);
			const bound = this.lowerBound(key);
			if (bound.equal) this._values[bound.index] = value;
			else {
				this._keys.splice(bound.index, 0, this._cloneKey(key));
				this._values.splice(bound.index, 0, value);
			}
		}
		/**
		* Extracts the contents of this dictionary as an array of { key, value } pairs, and empties this dictionary.
		* @returns An array of { key, value } pairs sorted by key.
		*/
		extractPairs() {
			const pairs = [];
			for (let i = 0; i < this.size; i++) pairs.push({
				key: this._keys[i],
				value: this._values[i]
			});
			this.clear();
			return pairs;
		}
		/**
		* Extracts the contents of this dictionary as a pair of { keys, values } arrays, and empties this dictionary.
		* The array of keys is sorted according to the comparison criterion.
		* The position of each value in the array of values corresponds the the position of the corresponding key in the array of keys.
		* @returns a pair of { keys, values } arrays in which key[i] corresponds to value[i] in this dictionary and the keys are in sorted order.
		*/
		extractArrays() {
			const result = {
				keys: this._keys,
				values: this._values
			};
			this.clear();
			return result;
		}
		/** Apply a function to each (key, value) pair in the dictionary, in sorted order.
		* @param func The function to be applied.
		*/
		forEach(func) {
			for (let i = 0; i < this.size; i++) func(this._keys[i], this._values[i]);
		}
		/**
		* Computes the position at which the specified key should be inserted to maintain sorted order.
		* @param key The key whose position is to be computed.
		* @returns an object with 'index' corresponding to the computed position and 'equal' set to true if an equivalent key already exists at that index.
		*/
		lowerBound(key) {
			return lowerBound(key, this._keys, this._compareKeys);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Disposable.js
function dispose(disposable) {
	if (void 0 !== disposable) if (Symbol.dispose in disposable) disposable[Symbol.dispose]();
	else disposable.dispose();
}
function disposeArray(list) {
	if (void 0 === list) return void 0;
	for (const entry of list) if (Symbol.dispose in entry) entry[Symbol.dispose]();
	else entry.dispose();
	list.length = 0;
}
var init_Disposable = __esmMin((() => {
	/** @packageDocumentation
	* @module Utils
	*/
	Symbol.dispose ??= Symbol("Symbol.dispose");
	Symbol.asyncDispose ??= Symbol("Symbol.asyncDispose");
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Expect.js
/**
* Expects that a value is defined (not undefined).
* @note Almost always, places that use this function should in the future be cleaned up to properly
* handle undefined values instead of throwing an error.
* @param value The value to check.
* @param message Optional error message to be used in thrown Error.
* @returns The original value if it is defined.
* @throws Error if the value is undefined.
* @internal
*/
function expectDefined(value, message) {
	if (value === void 0) throw new Error(message ?? "Expected value to be defined, but it was undefined.");
	return value;
}
/**
* Expects that a value is not null.
* @note Almost always, places that use this function should in the future be cleaned up to properly
* handle null values instead of throwing an error.
* @param value The value to check.
* @param message Optional error message to be used in thrown Error.
* @returns The original value if it is not null.
* @throws Error if the value is null.
* @internal
*/
function expectNotNull(value, message) {
	if (value === null) throw new Error(message ?? "Expected value to be not null, but it was null.");
	return value;
}
var init_Expect = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/IndexMap.js
var IndexedValue, IndexMap;
var init_IndexMap = __esmMin((() => {
	init_SortedArray();
	IndexedValue = class {
		value;
		index;
		constructor(value, index) {
			this.value = value;
			this.index = index;
		}
	};
	IndexMap = class {
		_array = [];
		_compareValues;
		_clone;
		_maximumSize;
		/**
		* Construct a new IndexMap<T>.
		* @param compare The function used to compare elements within the map.
		* @param maximumSize The maximum number of elements permitted in the IndexMap. The maximum index of an element is maximumSize-1.
		* @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
		*/
		constructor(compare, maximumSize = Number.MAX_SAFE_INTEGER, clone = shallowClone) {
			this._compareValues = compare;
			this._clone = clone;
			this._maximumSize = maximumSize;
		}
		/** The number of elements in the map. */
		get length() {
			return this._array.length;
		}
		/** Returns true if the maximum number of elements have been inserted. */
		get isFull() {
			return this.length >= this._maximumSize;
		}
		/** Returns true if the map contains no elements. */
		get isEmpty() {
			return 0 === this.length;
		}
		/** Removes all elements from the map. */
		clear() {
			this._array = [];
		}
		/** Attempt to insert a new value into the map.
		* If an equivalent element already exists in the map, the corresponding index is returned.
		* If the map is full, nothing is inserted and -1 is returned.
		* Otherwise:
		*  The new element is mapped to the next-available index (that is, the length of the map prior to insertion of this new element);
		*  the value is cloned using the function supplied to the IndexMap constructor;
		*  the cloned result is inserted into the map; and
		*  the index of the new element is returned.
		* @param value The value to insert
		* @param onInsert The optional callback method to call if insertion occurs with the inserted value
		* @returns the index of the equivalent element in the map, or -1 if the map is full and no equivalent element exists.
		*/
		insert(value, onInsert) {
			const bound = this.lowerBound(value);
			if (bound.equal) return this._array[bound.index].index;
			else if (this.isFull) return -1;
			const entry = new IndexedValue(this._clone(value), this._array.length);
			if (void 0 !== onInsert) onInsert(entry.value);
			this._array.splice(bound.index, 0, entry);
			return entry.index;
		}
		/**
		* Finds the index of an element equivalent to the supplied value.
		* @param value the value to find
		* @returns the index of an equivalent element in the map, or -1 if no such element exists.
		*/
		indexOf(value) {
			const bound = this.lowerBound(value);
			return bound.equal ? this._array[bound.index].index : -1;
		}
		lowerBound(value) {
			return lowerBound(value, this._array, (lhs, rhs) => this._compareValues(lhs, rhs.value));
		}
		/** Return an array of the elements in this map in which the array index of each element corresponds to the index assigned to it by the map. */
		toArray() {
			const array = [];
			for (const entry of this._array) array[entry.index] = entry.value;
			return array;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/JsonSchema.js
var init_JsonSchema = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/LRUMap.js
var init_LRUMap = __esmMin((() => {
	init_Dictionary();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ObservableSet.js
var ObservableSet;
var init_ObservableSet = __esmMin((() => {
	init_BeEvent();
	ObservableSet = class extends Set {
		/** Emitted after `item` is added to this set. */
		onAdded = new BeEvent();
		/** Emitted after `item` is deleted from this set. */
		onDeleted = new BeEvent();
		/** Emitted after this set's contents are cleared. */
		onCleared = new BeEvent();
		/** Emitted after multiple items are added to this set via [[addAll]]. */
		onBatchAdded = new BeEvent();
		/** Emitted after multiple items are deleted from this set via [[deleteAll]]. */
		onBatchDeleted = new BeEvent();
		/** Construct a new ObservableSet.
		* @param elements Optional elements with which to populate the new set.
		*/
		constructor(elements) {
			super(elements);
			this.add = (item) => {
				const prevSize = this.size;
				const ret = super.add(item);
				if (this.size !== prevSize) this.onAdded.raiseEvent(item);
				return ret;
			};
		}
		/** Invokes [Set.delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete), raising
		* the [[onDeleted]] event if the item was removed from the set.
		*/
		delete(item) {
			const ret = super.delete(item);
			if (ret) this.onDeleted.raiseEvent(item);
			return ret;
		}
		/** If this set is not already empty, invokes [Set.clear](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)
		* and raises the [[onCleared]] event.
		*/
		clear() {
			if (0 !== this.size) {
				super.clear();
				this.onCleared.raiseEvent();
			}
		}
		/** Add multiple items to the set, raising [[onBatchAdded]] only once after all items are added.
		* This is more efficient than calling [[add]] in a loop when listeners need not be notified of each individual addition.
		* @param items The items to add.
		* @returns The number of items that were actually added (i.e., were not already present).
		*/
		addAll(items) {
			const prevSize = this.size;
			for (const item of items) super.add(item);
			if (this.size !== prevSize) this.onBatchAdded.raiseEvent();
			return this.size - prevSize;
		}
		/** Delete multiple items from the set, raising [[onBatchDeleted]] only once after all items are deleted.
		* This is more efficient than calling [[delete]] in a loop when listeners need not be notified of each individual deletion.
		* @param items The items to delete.
		* @returns The number of items that were actually deleted (i.e., were present in the set).
		*/
		deleteAll(items) {
			const prevSize = this.size;
			for (const item of items) super.delete(item);
			if (this.size !== prevSize) this.onBatchDeleted.raiseEvent();
			return prevSize - this.size;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OneAtATimeAction.js
var AbandonedError, PromiseWithAbandon, OneAtATimeAction;
var init_OneAtATimeAction = __esmMin((() => {
	init_BentleyError();
	AbandonedError = class extends Error {};
	PromiseWithAbandon = class {
		_run;
		_args;
		/** Method to abandon the Promise created by [[init]] while it is outstanding. The promise will be rejected. */
		abandon;
		_resolve;
		/** Create a PromiseWithAbandon. After this call you must call [[init]] to create the underlying Promise.
		* @param _run The method that creates the underlying Promise.
		* @param _args An array of args to be passed to run when [[start]] is called.
		*/
		constructor(_run, _args) {
			this._run = _run;
			this._args = _args;
		}
		/** Create a Promise that is chained to the underlying Promise, but is connected to the abandon method. */
		async init(msg) {
			return new Promise((resolve, reject) => {
				this.abandon = (message) => reject(new AbandonedError(message ?? msg));
				this._resolve = resolve;
			});
		}
		/** Call the [[run]] method supplied to the ctor to start the underlying Promise. */
		async start() {
			try {
				this._resolve(await this._run(...this._args));
			} catch (err) {
				this.abandon(BentleyError.getErrorMessage(err));
			}
		}
	};
	OneAtATimeAction = class {
		_active;
		_pending;
		_run;
		msg;
		/** Ctor for OneAtATimePromise.
		* @param run The method that performs an action that creates the Promise.
		*/
		constructor(run, msg = "abandoned") {
			this._run = run;
			this.msg = msg;
		}
		/** Add a new request to this OneAtATimePromise. The request will only run when no other outstanding requests are active.
		* @note Callers of this method *must* handle AbandonedError rejections.
		*/
		async request(...args) {
			const entry = new PromiseWithAbandon(this._run, args);
			const promise = entry.init(this.msg);
			if (this._active !== void 0) {
				if (this._pending) this._pending.abandon();
				this._pending = entry;
			} else {
				this._active = entry;
				entry.start();
			}
			try {
				return await promise;
			} finally {
				if (this._active === entry) {
					this._active = this._pending;
					this._pending = void 0;
					if (this._active) this._active.start();
				}
			}
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/OrderedSet.js
var ReadonlyOrderedSet, OrderedSet;
var init_OrderedSet = __esmMin((() => {
	init_SortedArray();
	ReadonlyOrderedSet = class {
		_array;
		/** Construct a new ReadonlyOrderedSet<T>.
		* @param compare The function used to compare elements within the set, determining their ordering.
		* @param clone The function invoked to clone a new element for insertion into the set. The default implementation simply returns its input.
		*/
		constructor(compare, clone = shallowClone) {
			this._array = new SortedArray(compare, false, clone);
		}
		/** The number of elements in the set. */
		get size() {
			return this._array.length;
		}
		/** Returns true if `value` is present in the set. */
		has(value) {
			return -1 !== this._array.indexOf(value);
		}
		/** Iterate over the elements in sorted order (as opposed to `Set`'s iterator, which returns elements in insertion order). */
		[Symbol.iterator]() {
			return this._array[Symbol.iterator]();
		}
	};
	OrderedSet = class extends ReadonlyOrderedSet {
		/** Construct a new OrderedSet<T>.
		* @param compare The function used to compare elements within the set, determining their ordering.
		* @param clone The function invoked to clone a new element for insertion into the set. The default implementation simply returns its input.
		*/
		constructor(compare, clone = shallowClone) {
			super(compare, clone);
		}
		/** Remove all elements from the set. */
		clear() {
			this._array.clear();
		}
		/** Add the specified element to the set. Returns this set. */
		add(value) {
			this._array.insert(value);
			return this;
		}
		/** Removes the specified element from the set. Returns `true` if the element was present. */
		delete(value) {
			return -1 !== this._array.remove(value);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/partitionArray.js
/** @packageDocumentation
* @module Collections
*/
/** Partitions an array in-place according to some criterion, such that elements that fulfill the criterion are grouped in the lower
* portion of the array, and those that fail to fulfill the criterion are grouped in the upper portion of the array.
* @param array The array to be partitioned.
* @param criterion A function invoked for each element of the array, returning whether the element fulfills the criterion.
* @returns The index of the upper partition, i.e., of the first element that fails the criterion. If all elements fulfill the criterion, this is the length of the array.
* @note The relative ordering of elements within each partition is unspecified.
* Example:
* ```ts
* function isEven(n: number) { return 0 === n % 2; }
* const list = [ 1, 2, 3, 4, 5 ];
* const firstOddIndex = partitionArray(list, isEven); // firstOddIndex = 2
* // 2 and 4 now appear before 1, 3, and 5 in the list; their ordering is otherwise unspecified.
* for (let i = 0; i < list.length; i++)
*   assert(isEven(list[i]) === i < firstOddIndex);
* ```
* @public
*/
function partitionArray(array, criterion) {
	let index = 0;
	let partition = array.length;
	while (index < partition) {
		const elem = array[index];
		if (criterion(elem)) ++index;
		else {
			array[index] = array[--partition];
			array[partition] = elem;
		}
	}
	return partition;
}
var init_partitionArray = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/PriorityQueue.js
var PriorityQueue;
var init_PriorityQueue = __esmMin((() => {
	init_SortedArray();
	PriorityQueue = class {
		_array = [];
		_compare;
		_clone;
		/**
		* Constructor
		* @param compare The function used to compare values in the queue. If `compare(x, y)` returns a negative value, then x is placed before y in the queue.
		* @param clone The function used to clone a value for insertion onto the queue. The default implementation simply returns its input.
		* @note If the criterion which control the result of the `compare` function changes, then [[PriorityQueue.sort]] should be used to reorder the queue according to the new criterion.
		*/
		constructor(compare, clone = shallowClone) {
			this._compare = compare;
			this._clone = clone;
		}
		/** The number of values in the queue. */
		get length() {
			return this._array.length;
		}
		/** Returns true if the queue contains no values. */
		get isEmpty() {
			return 0 === this.length;
		}
		/** Returns an iterator over the contents of the heap suitable for use in `for-of` loops. */
		[Symbol.iterator]() {
			return this._array[Symbol.iterator]();
		}
		_swap(a, b) {
			const temp = this._array[a];
			this._array[a] = this._array[b];
			this._array[b] = temp;
		}
		_heapify(index) {
			let candidate = -1;
			while (true) {
				const right = 2 * (index + 1);
				const left = right - 1;
				if (left < this.length && this._compare(this._array[left], this._array[index]) < 0) candidate = left;
				else candidate = index;
				if (right < this.length && this._compare(this._array[right], this._array[candidate]) < 0) candidate = right;
				if (candidate !== index) {
					this._swap(candidate, index);
					index = candidate;
				} else break;
			}
		}
		/**
		* Reorders the queue. This function should only (and *always*) be called when the criteria governing the ordering of items on the queue have changed.
		* For example, a priority queue containing graphics sorted by their distance from the camera would need to be reordered when the position of the camera changes.
		*/
		sort() {
			for (let i = Math.ceil(this.length / 2); i >= 0; i--) this._heapify(i);
		}
		/**
		* Pushes a value onto the queue according to the sorting criterion.
		* @param value The value to insert
		* @returns The inserted value, cloned according to the [[CloneFunction]] supplied to this queue's constructor.
		*/
		push(value) {
			const clone = this._clone(value);
			let index = this.length;
			this._array.push(clone);
			while (index !== 0) {
				const parent = Math.floor((index - 1) / 2);
				if (this._compare(this._array[index], this._array[parent]) < 0) {
					this._swap(index, parent);
					index = parent;
				} else break;
			}
			return clone;
		}
		/** Pushes a value onto the back of the queue without making any attempt to enforce ordering.
		* After using this function, you must manually invoke sort() to ensure the queue is sorted again.
		* @param value The value to append
		* @returns The appended value, cloned according to the [[CloneFunction]] supplied to this queue's constructor.
		*/
		append(value) {
			const clone = this._clone(value);
			this._array.push(clone);
			return clone;
		}
		/** Returns the element at the front of the queue, or `undefined` if the queue is empty. */
		get front() {
			return this._peek(0);
		}
		/**
		* Removes the front-most element off of the queue and returns it.
		* @returns The front-most element, or undefined if the queue is empty.
		*/
		pop() {
			return this._pop(0);
		}
		/** Removes all values from the queue. */
		clear() {
			this._array.length = 0;
		}
		/**
		* Removes the value at the specified index from the queue and reorders the queue.
		* @param index The index of the value to remove
		* @returns the value at the specified index, or undefined if the index is out of range.
		*/
		_pop(index) {
			if (index < 0 || index >= this.length) return void 0;
			const root = this._array[index];
			this._swap(index, this.length - 1);
			this._array.length--;
			this._heapify(index);
			return root;
		}
		/**
		* Returns the value at the specified index in the queue.
		* @param index The index of the value to retrieve
		* @returns the value at the specified index, or undefined if the index is out of range.
		*/
		_peek(index) {
			if (index < 0 || index >= this.length) return void 0;
			else return this._array[index];
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/ProcessDetector.js
var ProcessDetector;
var init_ProcessDetector = __esmMin((() => {
	ProcessDetector = class {
		/** Is this a browser process?
		* @note this method will also return `true` for the frontend of Electron or Mobile apps. They *are* browser processes.
		*/
		static get isBrowserProcess() {
			return typeof window === "object" && typeof window.navigator === "object";
		}
		/** Is this a Node process?
		* @note this means "is this a backend process"? It will return `true` for all backend process, including Electron and mobile apps.
		*/
		static get isNodeProcess() {
			return typeof process === "object" && void 0 !== process.platform;
		}
		/** Is this process the frontend of an Electron app? */
		static get isElectronAppFrontend() {
			return typeof navigator === "object" && navigator.userAgent.toLowerCase().indexOf("electron") >= 0;
		}
		/** Is this process the backend of an Electron app? */
		static get isElectronAppBackend() {
			return typeof process === "object" && process.versions.hasOwnProperty("electron");
		}
		/** Is this process running in an Internet Explorer or old Microsoft Edge browser? */
		static get isIEBrowser() {
			return !!document.documentMode || !!window.StyleMedia;
		}
		/** Is this process running in a browser on an iPad?
		* @note This method will return `true` for any frontend running on an iPad, whether it is a user-launched web browser (e.g. Safari) or the frontend of a mobile app.
		*/
		static get isIPadBrowser() {
			return this.isBrowserProcess && window.navigator.platform === "iPad" || window.navigator.platform === "MacIntel" && window.navigator.maxTouchPoints > 0 && !("MSStream" in window);
		}
		/** Is this process running in a browser on an iPhone?
		* @note This method will return `true` for any frontend running on an iPhone, whether it is a user-launched web browser (e.g. Safari) or the frontend of a mobile app.
		*/
		static get isIPhoneBrowser() {
			return this.isBrowserProcess && /(iphone|ipod)/i.test(window.navigator.userAgent);
		}
		/** Is this process running in a browser on an iOS device?
		* @note This method will return `true` for any frontend running on an iOS device, whether it is a user-launched web browser (e.g. Safari) or the frontend of a mobile app.
		*/
		static get isIOSBrowser() {
			return this.isIPadBrowser || this.isIPhoneBrowser;
		}
		/** Is this process running in a browser on an Android device?
		* @note This method will return `true` for any frontend running on an Android device, whether it is a user-launched web browser (e.g. Chrome) or the frontend of a mobile app.
		*/
		static get isAndroidBrowser() {
			return this.isBrowserProcess && /android/i.test(window.navigator.userAgent);
		}
		/** Is this process running in a browser on a mobile device?
		* @note This method will return `true` for any frontend running on a mobile device, whether it is a user-launched web browser or the frontend of a mobile app.
		*/
		static get isMobileBrowser() {
			return this.isIOSBrowser || this.isAndroidBrowser;
		}
		/** Is this process running in a Chromium based browser (Chrome / new Edge / Electron front end)? */
		static get isChromium() {
			return this.isBrowserProcess && window.navigator.userAgent.indexOf("Chrome") > -1 && window.navigator.userAgent.indexOf("OP") === -1 || this.isElectronAppFrontend;
		}
		/** Is this process the frontend of an iTwin mobile application?
		* @note this indicates that this is a browser process started by an iTwin mobile application.
		* It will return `false` when running user-launched web browsers on a mobile device.
		*/
		static get isMobileAppFrontend() {
			return this.isAndroidAppFrontend || this.isIOSAppFrontend;
		}
		/** Is this process the frontend of an iOS mobile application? */
		static get isIOSAppFrontend() {
			return this.isBrowserProcess && window.location.hash.indexOf("platform=ios") !== -1;
		}
		/** Is this process the frontend of an Android mobile application? */
		static get isAndroidAppFrontend() {
			return this.isBrowserProcess && window.location.hash.indexOf("platform=android") !== -1;
		}
		/** Is this process the backend of an iOS mobile application? */
		static get isIOSAppBackend() {
			return this.isNodeProcess && process.platform === "ios";
		}
		/** Is this process the backend of an Android mobile application? */
		static get isAndroidAppBackend() {
			return this.isNodeProcess && process.platform === "android";
		}
		/**  Is this process a mobile app backend? */
		static get isMobileAppBackend() {
			return this.isIOSAppBackend || this.isAndroidAppBackend;
		}
		/** Is this process the frontend of a native (Electron or Mobile) app? */
		static get isNativeAppFrontend() {
			return this.isElectronAppFrontend || this.isMobileAppFrontend;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/StringUtils.js
/** @packageDocumentation
* @module Utils
*/
/** Given an array of bytes containing a utf-8 string, convert to a string.
* @param utf8: An array of utf-8 characters as a byte array
* @returns An equivalent string, or undefined if the array does not contain a valid utf-8 string.
* @note This function uses Javascript's TextDecoder if supported by the browser; otherwise, it
* falls back to a less efficient polyfill.
* @public
*/
function utf8ToString(utf8) {
	return new TextDecoder("utf-8").decode(utf8);
}
/** Given a base-64-encoded string, decode it into an array of bytes.
* @param base64 The base-64-encoded string.
* @returns the decoded byte array.
* @throws DOMException if the length of the input string is not a multiple of 4.
* @public
*/
function base64StringToUint8Array(base64) {
	return new Uint8Array(atob(base64).split("").map((c) => c.charCodeAt(0)));
}
var init_StringUtils = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Time.js
var BeDuration, BeTimePoint, StopWatch;
var init_Time = __esmMin((() => {
	BeDuration = class BeDuration {
		_milliseconds;
		constructor(milliseconds = 0) {
			this._milliseconds = milliseconds;
		}
		/** The duration in milliseconds */
		get milliseconds() {
			return this._milliseconds;
		}
		get seconds() {
			return this._milliseconds / 1e3;
		}
		/** Create a BeDuration from seconds.
		* @param seconds the number of seconds for this BeDuration
		*/
		static fromSeconds(seconds) {
			return new BeDuration(seconds * 1e3);
		}
		/** Create a BeDuration from milliseconds.
		* @param milliseconds the number of milliseconds for this BeDuration
		*/
		static fromMilliseconds(milliseconds) {
			return new BeDuration(milliseconds);
		}
		/** Determine whether this BeDuration is 0 seconds */
		get isZero() {
			return this._milliseconds === 0;
		}
		/** Determine whether this BeDuration is towards the future */
		get isTowardsFuture() {
			return this._milliseconds > 0;
		}
		/** Determine whether this BeDuration is towards the past */
		get isTowardsPast() {
			return this._milliseconds < 0;
		}
		/** Subtract a BeDuration from this BeDuration, returning a new BeDuration. */
		minus(other) {
			return new BeDuration(this._milliseconds - other._milliseconds);
		}
		/** Add a BeDuration to this BeDuration, returning a new BeDuration */
		plus(other) {
			return new BeDuration(this._milliseconds + other._milliseconds);
		}
		/** Utility function to just wait for the specified time
		* @param ms Duration in milliseconds to wait
		* @return Promise that resolves after the specified wait period
		*/
		static async wait(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		}
		/** Utility function to wait for either the specified time or a promise, whichever resolves first
		* @param ms Maximum duration in milliseconds to wait
		* @param promise A pending promise to wait for
		* @return Promise that resolves after the specified wait period or the provided promise resolves, whichever comes first
		*/
		static async race(ms, promise) {
			let timeout;
			const waitPromise = new Promise((resolve) => {
				timeout = setTimeout(resolve, ms);
			});
			return Promise.race([waitPromise, promise]).finally(() => {
				if (timeout) clearTimeout(timeout);
			});
		}
		/** Utility function to just wait for the specified time
		* @return Promise that resolves after the specified wait period
		*/
		async wait() {
			return new Promise((resolve) => setTimeout(resolve, this._milliseconds));
		}
		/** Execute a function after delaying by this duration.
		* @param fn the function to execute after the delay
		* @param scope An optional object scope to serve as the 'this' pointer when `fn` is invoked.
		* @param args optional arguments to `fn`
		* @return Promise resolved by `fn`
		*/
		async executeAfter(fn, scope, ...args) {
			return new Promise((resolve) => setTimeout(() => resolve(fn.apply(scope, args)), this._milliseconds));
		}
	};
	BeTimePoint = class BeTimePoint {
		_milliseconds;
		/** the time in milliseconds, of this BeTimePoint (relative to January 1, 1970 00:00:00 UTC.) */
		get milliseconds() {
			return this._milliseconds;
		}
		constructor(milliseconds) {
			this._milliseconds = milliseconds;
		}
		/** Create a BeTimePoint from Date.now() */
		static now() {
			return new BeTimePoint(Date.now());
		}
		/** Create a BeTimePoint at a specified duration in the future from now
		*  @param val the duration from now
		*/
		static fromNow(val) {
			return new BeTimePoint(Date.now() + val.milliseconds);
		}
		/** Create a BeTimePoint at a specified duration in the past before now
		* @param val the duration before now
		*/
		static beforeNow(val) {
			return new BeTimePoint(Date.now() - val.milliseconds);
		}
		/** Determine whether this BeTimePoint is a time in the future from the time this method is called (it calls now()!) */
		get isInFuture() {
			return Date.now() < this._milliseconds;
		}
		/** Determine whether this BeTimePoint is a time that has already passed before the time this method is called (it calls now()!) */
		get isInPast() {
			return Date.now() > this._milliseconds;
		}
		/** Determine whether this BeTimePoint happens before another one.
		* @param other the other BeTimePoint.
		*/
		before(other) {
			return this._milliseconds < other._milliseconds;
		}
		/** Determine whether this BeTimePoint happens after another one.
		* @param other the other BeTimePoint.
		*/
		after(other) {
			return this._milliseconds > other._milliseconds;
		}
		/** Subtract a BeDuration from this BeTimePoint, returning a new BeTimePoint. This moves this BeTimePoint backwards in time if BeDuration.isTowardsFuture() === true
		* @param duration the duration to subtract.
		*/
		minus(duration) {
			return new BeTimePoint(this._milliseconds - duration.milliseconds);
		}
		/** Subtract a BeDuration from this BeTimePoint, returning a new BeTimePoint. This moves this BeTimePoint backwards in time if BeDuration.isTowardsFuture() === true
		* @param duration the duration to subtract.
		*/
		plus(duration) {
			return new BeTimePoint(this._milliseconds + duration.milliseconds);
		}
	};
	StopWatch = class {
		description;
		_start;
		_stop;
		/** Get the elapsed time since start() on a running timer. */
		get current() {
			return BeDuration.fromMilliseconds(BeTimePoint.now().milliseconds - (!!this._start ? this._start.milliseconds : 0));
		}
		/** Get the elapsed time, in seconds, since start() on a running timer. */
		get currentSeconds() {
			return this.current.seconds;
		}
		/** Get the elapsed time between start() and stop() on this timer in milliseconds. */
		get elapsed() {
			return BeDuration.fromMilliseconds((!!this._stop ? this._stop.milliseconds : BeTimePoint.now().milliseconds) - (!!this._start ? this._start.milliseconds : 0));
		}
		/** Get the elapsed time, in seconds, between start() and stop() on this  timer. */
		get elapsedSeconds() {
			return this.elapsed.seconds;
		}
		/** ctor for StopWatch
		* @param description optional string stored with the StopWatch
		* @param startImmediately if true, StopWatch is started when created. Otherwise, call start() explicitly.
		*/
		constructor(description, startImmediately = false) {
			this.description = description;
			if (startImmediately) this.start();
		}
		/** Start the stopwatch. Any future time measurements will be based on this new value. */
		start() {
			this.reset();
			this._start = BeTimePoint.now();
		}
		/** Stop the stopwatch so that the duration can be viewed later. */
		stop() {
			this._stop = BeTimePoint.now();
			return this.elapsed;
		}
		/** Clear the StopWatch */
		reset() {
			this._start = this._stop = void 0;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/Tracing.js
function isValidPrimitive(val) {
	return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
function isValidPrimitiveArray(val) {
	if (!Array.isArray(val)) return false;
	let itemType;
	for (const x of val) {
		if (x === void 0 || x === null) continue;
		if (!itemType) {
			itemType = typeof x;
			if (!isValidPrimitive(x)) return false;
		}
		if (typeof x !== itemType) return false;
	}
	return true;
}
function isPlainObject(obj) {
	return typeof obj === "object" && obj !== null && Object.getPrototypeOf(obj) === Object.prototype;
}
function* getFlatEntries(obj, path = "") {
	if (isValidPrimitiveArray(obj)) {
		yield [path, obj];
		return;
	}
	if (!isPlainObject(obj) && !Array.isArray(obj)) {
		yield [path, isValidPrimitive(obj) ? obj : JSON.stringify(obj)];
		return;
	}
	const entries = Object.entries(obj);
	if (entries.length === 0) yield [path, []];
	for (const [key, val] of entries) yield* getFlatEntries(val, path === "" ? key : `${path}.${key}`);
}
function flattenObject(obj) {
	return Object.fromEntries(getFlatEntries(obj));
}
var SpanKind, Tracing;
var init_Tracing = __esmMin((() => {
	init_Logger();
	(function(SpanKind) {
		SpanKind[SpanKind["INTERNAL"] = 0] = "INTERNAL";
		SpanKind[SpanKind["SERVER"] = 1] = "SERVER";
		SpanKind[SpanKind["CLIENT"] = 2] = "CLIENT";
		SpanKind[SpanKind["PRODUCER"] = 3] = "PRODUCER";
		SpanKind[SpanKind["CONSUMER"] = 4] = "CONSUMER";
	})(SpanKind || (SpanKind = {}));
	Tracing = class Tracing {
		static _tracer;
		static _openTelemetry;
		/**
		* If OpenTelemetry tracing is enabled, creates a new span and runs the provided function in it.
		* If OpenTelemetry tracing is _not_ enabled, runs the provided function.
		* @param name name of the new span
		* @param fn function to run inside the new span
		* @param options span options
		* @param parentContext optional context used to retrieve parent span id
		*/
		static async withSpan(name, fn, options, parentContext) {
			if (Tracing._tracer === void 0 || Tracing._openTelemetry === void 0) return fn();
			const parent = parentContext === void 0 ? Tracing._openTelemetry.context.active() : Tracing._openTelemetry.trace.setSpanContext(Tracing._openTelemetry.context.active(), parentContext);
			return Tracing._openTelemetry.context.with(Tracing._openTelemetry.trace.setSpan(parent, Tracing._tracer.startSpan(name, options, Tracing._openTelemetry.context.active())), async () => {
				try {
					return await fn();
				} catch (err) {
					if (err instanceof Error) Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttribute("error", true);
					throw err;
				} finally {
					Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.end();
				}
			});
		}
		/**
		* Adds a span event describing a runtime exception, as advised in OpenTelemetry documentation
		* @param e error (exception) object
		*/
		static recordException(e) {
			Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.recordException(e);
		}
		/**
		* Enable logging to OpenTelemetry. [[Tracing.withSpan]] will be enabled, all log entries will be attached to active span as span events.
		* [IModelHost.startup]($backend) will call this automatically if the `enableOpenTelemetry` option is enabled and it succeeds in requiring `@opentelemetry/api`.
		* @note Node.js OpenTelemetry SDK should be initialized by the user.
		*/
		static enableOpenTelemetry(tracer, api) {
			Tracing._tracer = tracer;
			Tracing._openTelemetry = api;
			Logger.logTrace = Tracing.withOpenTelemetry(LogLevel.Trace, Logger.logTrace.bind(Logger)).bind(Logger);
			Logger.logInfo = Tracing.withOpenTelemetry(LogLevel.Info, Logger.logInfo.bind(Logger)).bind(Logger);
			Logger.logWarning = Tracing.withOpenTelemetry(LogLevel.Warning, Logger.logWarning.bind(Logger)).bind(Logger);
			Logger.logError = Tracing.withOpenTelemetry(LogLevel.Error, Logger.logError.bind(Logger)).bind(Logger);
		}
		static withOpenTelemetry(level, base, isError = false) {
			return (category, message, metaData) => {
				const oTelContext = Tracing._openTelemetry?.context.active();
				if (Tracing._openTelemetry === void 0 || oTelContext === void 0) return base(category, message, metaData);
				const serializedMetadata = Logger.getMetaData(metaData);
				if (Logger.isEnabled(category, level)) {
					try {
						Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.addEvent(message, {
							...flattenObject(serializedMetadata),
							error: isError,
							loggerCategory: category
						});
					} catch {}
					const spanContext = Tracing._openTelemetry.trace.getSpan(oTelContext)?.spanContext();
					base(category, message, {
						...serializedMetadata,
						trace_id: spanContext?.traceId,
						span_id: spanContext?.spanId,
						trace_flags: spanContext?.traceFlags
					});
				}
			};
		}
		/** Set attributes on currently active openTelemetry span. Doesn't do anything if openTelemetry logging is not initialized.
		* @param attributes The attributes to set
		*/
		static setAttributes(attributes) {
			Tracing._openTelemetry?.trace.getSpan(Tracing._openTelemetry.context.active())?.setAttributes(attributes);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/TupleKeyedMap.js
var init_TupleKeyedMap = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/TypedArrayBuilder.js
var TypedArrayBuilder, Uint8ArrayBuilder, Uint16ArrayBuilder, Uint32ArrayBuilder, UintArrayBuilder;
var init_TypedArrayBuilder = __esmMin((() => {
	init_Assert();
	TypedArrayBuilder = class {
		/** The constructor for the specific type of array being populated. */
		_constructor;
		/** The underlying typed array, to be reallocated and copied when its capacity is exceeded. */
		_data;
		/** The number of elements added to the array so far. */
		_length;
		/** Multiplier applied to required capacity by [[ensureCapacity]]. */
		growthFactor;
		/** Constructs a new builder from the specified options, with a [[length]] of zero. */
		constructor(constructor, options) {
			this._constructor = constructor;
			this._data = new constructor(options?.initialCapacity ?? 0);
			this.growthFactor = Math.max(1, options?.growthFactor ?? 1.5);
			this._length = 0;
		}
		/** The number of elements currently in the array. */
		get length() {
			return this._length;
		}
		/** The number of elements that can fit into the memory currently allocated for the array. */
		get capacity() {
			return this._data.length;
		}
		/** Like [TypedArray.at](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/at),
		* returns the element at the specified index, with negative integers counting back from the end of the array.
		* @note It is your responsibility to ensure the index falls within the bounds of the array.
		*/
		at(index) {
			if (index < 0) index = this.length - index;
			return this._data[index];
		}
		/** Ensure that [[capacity]] is at least equal to `newCapacity`.
		* This is used internally by methods like [[push]] and [[append]] to ensure the array has room for the element(s) to be added.
		* It can also be useful when you know you intend to add some number of additional elements, to minimize reallocations.
		*
		* If `newCapacity` is not greater than the current [[capacity]], this function does nothing.
		* Otherwise, it allocates a new `TypedArray` with room for `newCapacity * growthFactor` elements, and copies the contents of the previous `TypedArray` into it.
		* [[length]] remains unchanged; [[capacity]] reflects the size of the new TypeArray.
		*/
		ensureCapacity(newCapacity) {
			if (this.capacity >= newCapacity) return this.capacity;
			this.growthFactor;
			newCapacity = Math.ceil(newCapacity * this.growthFactor);
			const prevData = this._data;
			this._data = new this._constructor(newCapacity);
			this._data.set(prevData, 0);
			this.capacity;
			return this.capacity;
		}
		/** Append the specified value, resizing if necessary. */
		push(value) {
			this.ensureCapacity(this.length + 1);
			this._data[this.length] = value;
			++this._length;
		}
		/** Append an array of values, resizing (at most once) if necessary. */
		append(values) {
			const newLength = this.length + values.length;
			this.ensureCapacity(newLength);
			this._data.set(values, this.length);
			this._length = newLength;
		}
		/** Obtain the finished array.
		* @param includeUnusedCapacity If true, the length of the returned array will be equal to [[capacity]], with extra bytes initialized to zero; otherwise, the
		* returned array's length will be equal to [[length]].
		*/
		toTypedArray(includeUnusedCapacity = false) {
			if (includeUnusedCapacity) return this._data;
			const subarray = this._data.subarray(0, this.length);
			subarray instanceof this._constructor;
			subarray.buffer, this._data.buffer;
			return subarray;
		}
	};
	Uint8ArrayBuilder = class extends TypedArrayBuilder {
		/** See [[TypedArrayBuilder]] constructor. */
		constructor(options) {
			super(Uint8Array, options);
		}
	};
	Uint16ArrayBuilder = class extends TypedArrayBuilder {
		/** See [[TypedArrayBuilder]] constructor. */
		constructor(options) {
			super(Uint16Array, options);
		}
	};
	Uint32ArrayBuilder = class extends TypedArrayBuilder {
		/** See [[TypedArrayBuilder]] constructor. */
		constructor(options) {
			super(Uint32Array, options);
		}
		/** Obtain a view of the finished array as an array of bytes. */
		toUint8Array(includeUnusedCapacity = false) {
			if (includeUnusedCapacity) return new Uint8Array(this._data.buffer);
			return new Uint8Array(this._data.buffer, 0, this.length * 4);
		}
	};
	UintArrayBuilder = class extends TypedArrayBuilder {
		constructor(options) {
			super(options?.initialType ?? Uint8Array, options);
		}
		/** The number of bytes (1, 2, or 4) currently allocated per element by the underlying array.
		* This may change as larger values are added to the array.
		*/
		get bytesPerElement() {
			return this._data.BYTES_PER_ELEMENT;
		}
		/** Ensures that the underlying array is of a type that can contain the largest value in `newValues`.
		* For example, if `_data` is a `Uint16Array` and `newValues` contains any value(s) larger than 65,535, it will be replaced with a `Uint32Array`.
		* This method is invoked by [[push]] and [[append]].
		*/
		ensureBytesPerElement(newValues) {
			const curBytesPerElem = this.bytesPerElement;
			if (curBytesPerElem >= 4) return;
			let neededBytesPerElem = curBytesPerElem;
			for (const value of newValues) if (value > 65535) {
				neededBytesPerElem = 4;
				break;
			} else if (value > 255) neededBytesPerElem = 2;
			if (neededBytesPerElem <= curBytesPerElem) return;
			this._constructor = neededBytesPerElem === 1 ? Uint8Array : neededBytesPerElem === 2 ? Uint16Array : Uint32Array;
			this._data = new this._constructor(this._data);
		}
		/** See [[TypedArrayBuilder.push]]. */
		push(value) {
			this.ensureBytesPerElement([value]);
			super.push(value);
		}
		/** See [[TypedArrayBuilder.append]]. */
		append(values) {
			this.ensureBytesPerElement(values);
			super.append(values);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/UtilityTypes.js
/** @packageDocumentation
* @module Utils
*/
/** Returns true if `obj` is an object of class `T`.
* @see [[asInstanceOf]] to cast `obj` to class `T`.
* @public
*/
function isInstanceOf(obj, constructor) {
	return "object" === typeof obj && obj instanceof constructor;
}
/** Cast `obj` to an instance of class `T`, or return undefined if `obj` is not an instance of class `T`.
* @see [[isInstanceOf]] to query whether `obj` is of class `T`.
* @public
*/
function asInstanceOf(obj, constructor) {
	return isInstanceOf(obj, constructor) ? obj : void 0;
}
var init_UtilityTypes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/YieldManager.js
var init_YieldManager = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/BeSQLiteInternal.js
var DbChangeStage, DbValueType, DbConflictCause, DbConflictResolution;
var init_BeSQLiteInternal = __esmMin((() => {
	(function(DbChangeStage) {
		DbChangeStage[DbChangeStage["Old"] = 0] = "Old";
		DbChangeStage[DbChangeStage["New"] = 1] = "New";
	})(DbChangeStage || (DbChangeStage = {}));
	(function(DbValueType) {
		DbValueType[DbValueType["IntegerVal"] = 1] = "IntegerVal";
		DbValueType[DbValueType["FloatVal"] = 2] = "FloatVal";
		DbValueType[DbValueType["TextVal"] = 3] = "TextVal";
		DbValueType[DbValueType["BlobVal"] = 4] = "BlobVal";
		DbValueType[DbValueType["NullVal"] = 5] = "NullVal";
	})(DbValueType || (DbValueType = {}));
	(function(DbConflictCause) {
		DbConflictCause[DbConflictCause["Data"] = 1] = "Data";
		DbConflictCause[DbConflictCause["NotFound"] = 2] = "NotFound";
		DbConflictCause[DbConflictCause["Conflict"] = 3] = "Conflict";
		DbConflictCause[DbConflictCause["Constraint"] = 4] = "Constraint";
		DbConflictCause[DbConflictCause["ForeignKey"] = 5] = "ForeignKey";
	})(DbConflictCause || (DbConflictCause = {}));
	(function(DbConflictResolution) {
		/** Skip incoming change */
		DbConflictResolution[DbConflictResolution["Skip"] = 0] = "Skip";
		/** Replace local row with incoming changed row */
		DbConflictResolution[DbConflictResolution["Replace"] = 1] = "Replace";
		/** Abort apply changeset */
		DbConflictResolution[DbConflictResolution["Abort"] = 2] = "Abort";
	})(DbConflictResolution || (DbConflictResolution = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/internal/cross-package.js
var init_cross_package = __esmMin((() => {
	init_RepositoryStatus();
	init_BeSQLiteInternal();
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+core-bentley@5.8.1/node_modules/@itwin/core-bentley/lib/esm/core-bentley.js
var init_core_bentley = __esmMin((() => {
	init_AccessToken();
	init_Assert();
	init_BeEvent();
	init_BentleyError();
	init_BentleyLoggerCategory();
	init_StatusCategory();
	init_BeSQLite();
	init_ByteStream();
	init_ClassUtils();
	init_Compare();
	init_CompressedId64Set();
	init_Dictionary();
	init_Disposable();
	init_Expect();
	init_Id();
	init_IndexMap();
	init_JsonSchema();
	init_JsonUtils();
	init_Logger();
	init_LRUMap();
	init_ObservableSet();
	init_OneAtATimeAction();
	init_OrderedId64Iterable();
	init_OrderedSet();
	init_partitionArray();
	init_PriorityQueue();
	init_ProcessDetector();
	init_SortedArray();
	init_StringUtils();
	init_Time();
	init_Tracing();
	init_TupleKeyedMap();
	init_TypedArrayBuilder();
	init_UnexpectedErrors();
	init_UtilityTypes();
	init_YieldManager();
	init_cross_package();
}));
/** @docs-package-description
* The core-bentley package contains classes to solve problems that are common for both client and server use cases.
*/
/**
* @docs-group-description BeSQLite
* Classes for working with SQLite databases. SQLite underlies IModelDb and ECDb - see [Executing ECSQL]($docs/learning/ECSQL.md)
*/
/**
* @docs-group-description Errors
* Classes for working with errors.
*/
/**
* @docs-group-description Events
* Classes for raising and handling events.
*/
/**
* @docs-group-description Ids
* Classes for working with unique identifiers.
*/
/**
* @docs-group-description Logging
* Classes for configuring and logging diagnostic messages - see [Learning about Logging]($docs/learning/common/Logging.md)
*/
/**
* @docs-group-description Collections
* Specialized, customizable collection classes like priority queues.
*/
/**
* @docs-group-description Json
* utilities for dealing with Json strings and files.
*/
/**
* @docs-group-description Utils
* Miscellaneous utility classes.
*/
/**
* @docs-group-description ProcessDetector
* Functions for determining the type of the current JavaScript process.
*/
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/UiAdmin.js
var GenericUiEvent, UiAdmin;
var init_UiAdmin = __esmMin((() => {
	init_core_bentley();
	GenericUiEvent = class extends BeUiEvent {};
	UiAdmin = class UiAdmin {
		_featureFlags = {};
		static _messagePresenter;
		/** The MessagePresenter used to display messages. */
		static get messagePresenter() {
			if (!UiAdmin._messagePresenter) {
				const error = new BentleyError(BentleyStatus.ERROR, "UiAdmin.messagePresenter not set");
				error.category = "messagePresenter";
				throw error;
			}
			return UiAdmin._messagePresenter;
		}
		static set messagePresenter(mp) {
			UiAdmin._messagePresenter = mp;
		}
		get featureFlags() {
			return { ...this._featureFlags };
		}
		updateFeatureFlags(uiFlags) {
			this._featureFlags = {
				...this._featureFlags,
				...uiFlags
			};
		}
		/** @internal */
		onInitialized() {}
		/** Get the cursor X and Y position. */
		get cursorPosition() {
			return {
				x: 0,
				y: 0
			};
		}
		/** Create a PointProps object.
		* @deprecated in 4.2.0 - will not be removed until after 2026-06-13. Please use @core/geometry [[XAndY]] or a custom implementation.
		*/
		createXAndY(x, y) {
			return {
				x,
				y
			};
		}
		/** Determines if focus is set to Home */
		get isFocusOnHome() {
			return false;
		}
		/** Sets focus to Home */
		setFocusToHome() {}
		/** Show a context menu at a particular location.
		* @param _menuItemsProps Properties of the menu items to display.
		* @param _location Location of the context menu, relative to the origin of htmlElement or the window.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the menu was displayed, false if the menu could not be displayed.
		*/
		showContextMenu(_menuItemsProps, _location, _htmlElement) {
			return false;
		}
		/** Show a Toolbar at a particular location.
		* @param _toolbarProps Properties of the Toolbar to display.
		* @param _location Location of the Toolbar, relative to the origin of htmlElement or the window.
		* @param _offset Offset of the Toolbar from the location.
		* @param _onItemExecuted Function invoked after a Toolbar item is executed
		* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Toolbar
		* @param _relativePosition Position relative to the given location. Defaults to TopRight.
		* @param _htmlElement The HTMLElement that anchors the Toolbar. If undefined, the location is relative to the overall window.
		* @return true if the Toolbar was displayed, false if the Toolbar could not be displayed.
		*/
		showToolbar(_toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _htmlElement) {
			return false;
		}
		/** Hides the toolbar. */
		hideToolbar() {
			return false;
		}
		/** Show a menu button at a particular location. A menu button opens a context menu.
		* @param _id Id of the menu button. Multiple menu buttons may be displayed.
		* @param _menuItemsProps Properties of the menu items to display.
		* @param _location Location of the context menu, relative to the origin of htmlElement or the window.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the button was displayed, false if the button could not be displayed.
		*/
		showMenuButton(_id, _menuItemsProps, _location, _htmlElement) {
			return false;
		}
		/** Hides a menu button.
		* @param _id Id of the menu button. Multiple menu buttons may be displayed.
		* @return true if the menu was hidden, false if the menu could not be hidden.
		*/
		hideMenuButton(_id) {
			return false;
		}
		/** Show a calculator at a particular location.
		* @param _initialValue Value initially displayed in the calculator.
		* @param _resultIcon Icon displayed to the left of the value.
		* @param _location Location of the calculator, relative to the origin of htmlElement or the window.
		* @param _onCommit Function called when the OK button or the Enter key is pressed.
		* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the calculator was displayed, false if the calculator could not be displayed.
		*/
		showCalculator(_initialValue, _resultIcon, _location, _onCommit, _onCancel, _htmlElement) {
			return false;
		}
		/** Hides the calculator. */
		hideCalculator() {
			return false;
		}
		/** Show an input editor for an angle value at a particular location.
		* @param _initialValue Value initially displayed in the editor.
		* @param _location Location of the editor, relative to the origin of htmlElement or the window.
		* @param _onCommit Function called when the OK button or the Enter key is pressed.
		* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the editor was displayed, false if the editor could not be displayed.
		*/
		showAngleEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
			return false;
		}
		/** Show an input editor for a length value at a particular location.
		* @param _initialValue Value initially displayed in the editor.
		* @param _location Location of the editor, relative to the origin of htmlElement or the window.
		* @param _onCommit Function called when the OK button or the Enter key is pressed.
		* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the editor was displayed, false if the editor could not be displayed.
		*/
		showLengthEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
			return false;
		}
		/** Show an input editor for a height value at a particular location.
		* @param _initialValue Value initially displayed in the editor.
		* @param _location Location of the editor, relative to the origin of htmlElement or the window.
		* @param _onCommit Function called when the OK button or the Enter key is pressed.
		* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the editor was displayed, false if the editor could not be displayed.
		*/
		showHeightEditor(_initialValue, _location, _onCommit, _onCancel, _htmlElement) {
			return false;
		}
		/** Show an input editor for a primitive value at a particular location.
		* @param _initialValue Value initially displayed in the editor.
		* @param _propertyDescription Description of the primitive value property.
		* @param _location Location of the editor, relative to the origin of htmlElement or the window.
		* @param _onCommit Function called when the OK button or the Enter key is pressed.
		* @param _onCancel Function called when the Cancel button or the Escape key  is pressed.
		* @param _htmlElement The HTMLElement that anchors the context menu. If undefined, the location is relative to the overall window.
		* @return true if the editor was displayed, false if the editor could not be displayed.
		*/
		showInputEditor(_initialValue, _propertyDescription, _location, _onCommit, _onCancel, _htmlElement) {
			return false;
		}
		/** Hides the input editor. */
		hideInputEditor() {
			return false;
		}
		/** Show an HTML element at a particular location.
		* @param _displayElement The HTMLElement to display
		* @param _location Location of the tool settings, relative to the origin of anchorElement or the window
		* @param _offset Offset of the display element from the location
		* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the display element
		* @param _relativePosition Position relative to the given location. Defaults to TopRight.
		* @param _anchorElement The HTMLElement that anchors the display element. If undefined, the location is relative to the overall window.
		* @return true if the display element was displayed, false if the display element could not be displayed.
		*/
		showHTMLElement(_displayElement, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
			return false;
		}
		/** Hides the HTML Element. */
		hideHTMLElement() {
			return false;
		}
		/** Show a Card containing content, a title and a toolbar at a particular location.
		* @param _content The HTMLElement of the content to display
		* @param _title Title to display at the top of the card.
		* @param _toolbarProps Properties of the Toolbar to display.
		* @param _location Location of the Card, relative to the origin of anchorElement or the window.
		* @param _offset Offset of the Card from the location.
		* @param _onItemExecuted Function invoked after a Toolbar item is executed
		* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the Card
		* @param _relativePosition Position relative to the given location. Defaults to TopRight.
		* @param _anchorElement The HTMLElement that anchors the Card. If undefined, the location is relative to the overall window.
		* @return true if the Card was displayed, false if the Card could not be displayed.
		*/
		showCard(_content, _title, _toolbarProps, _location, _offset, _onItemExecuted, _onCancel, _relativePosition, _anchorElement) {
			return false;
		}
		/** Hides the Card. */
		hideCard() {
			return false;
		}
		/** Opens a Tool Settings Ui popup at a particular location.
		* @param _dataProvider The UiDataProvider for the tool settings
		* @param _location Location of the tool settings, relative to the origin of anchorElement or the window
		* @param _offset Offset of the tool settings from the location
		* @param _onCancel Function invoked when the Escape key is pressed or a click occurs outside the tool settings
		* @param _relativePosition Position relative to the given location. Defaults to TopRight.
		* @param _anchorElement The HTMLElement that anchors the tool settings. If undefined, the location is relative to the overall window.
		* @return true if the tool settings were displayed, false if the tool settings could not be displayed.
		*/
		openToolSettingsPopup(_dataProvider, _location, _offset, _onCancel, _relativePosition, _anchorElement) {
			return false;
		}
		/** Closes the Tool Settings Ui popup. */
		closeToolSettingsPopup() {
			return false;
		}
		/** Show the Keyin Palette to display all support Tool key-ins.
		* @param _htmlElement The HTMLElement that anchors the Keyin Palette. If undefined, the location is relative to the overall window.
		* @return true if the Keyin Palette was displayed, false if it could not be displayed.
		*/
		showKeyinPalette(_htmlElement) {
			return false;
		}
		/** Hides the Keyin Palette. */
		hideKeyinPalette() {
			return false;
		}
		/** Send a UI event */
		static sendUiEvent(args) {
			UiAdmin.onGenericUiEvent.emit(args);
		}
		/** GenericUiEvent  */
		static onGenericUiEvent = new GenericUiEvent();
		/** Opens a Dialog and automatically populates it using the properties defined by the UiDataProvider.
		* @param _uiDataProvider The DialogLayoutDataProvider for the dialog
		* @param _title Specify title for dialog.
		* @param _isModal Specify if the dialog is opened as a modal or modeless.
		* @param _id Id of the dialog that is used to close it.
		* @param _optionalProps Optional props for Dialog construction.
		* @return true if the tool settings were displayed, false if the tool settings could not be displayed.
		*/
		openDialog(_uiDataProvider, _title, _isModal, _id, _optionalProps) {
			return false;
		}
		/** Closes the Dialog with a given Id. */
		closeDialog(_dialogId) {
			return false;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/common/KeyboardKey.js
/** Determines if a KeyboardEvent.key is an Arrow key
* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. Please use a custom implementation moving forward.
*/
function isArrowKey(key) {
	return key === SpecialKey.ArrowLeft || key === SpecialKey.ArrowRight || key === SpecialKey.ArrowUp || key === SpecialKey.ArrowDown;
}
var FunctionKey, SpecialKey;
var init_KeyboardKey = __esmMin((() => {
	(function(FunctionKey) {
		FunctionKey["F1"] = "F1";
		FunctionKey["F2"] = "F2";
		FunctionKey["F3"] = "F3";
		FunctionKey["F4"] = "F4";
		FunctionKey["F5"] = "F5";
		FunctionKey["F6"] = "F6";
		FunctionKey["F7"] = "F7";
		FunctionKey["F8"] = "F8";
		FunctionKey["F9"] = "F9";
		FunctionKey["F10"] = "F10";
		FunctionKey["F11"] = "F11";
		FunctionKey["F12"] = "F12";
	})(FunctionKey || (FunctionKey = {}));
	(function(SpecialKey) {
		SpecialKey["Home"] = "Home";
		SpecialKey["End"] = "End";
		SpecialKey["PageUp"] = "PageUp";
		SpecialKey["PageDown"] = "PageDown";
		SpecialKey["Escape"] = "Escape";
		SpecialKey["Delete"] = "Delete";
		SpecialKey["Insert"] = "Insert";
		SpecialKey["Tab"] = "Tab";
		SpecialKey["ArrowLeft"] = "ArrowLeft";
		SpecialKey["ArrowRight"] = "ArrowRight";
		SpecialKey["ArrowUp"] = "ArrowUp";
		SpecialKey["ArrowDown"] = "ArrowDown";
		SpecialKey["Enter"] = "Enter";
		SpecialKey["Return"] = "Enter";
		SpecialKey["Space"] = " ";
		SpecialKey["Backspace"] = "Backspace";
		SpecialKey["Clear"] = "Clear";
		SpecialKey["Divide"] = "Divide";
		SpecialKey["Multiply"] = "Multiply";
		SpecialKey["Subtract"] = "Subtract";
		SpecialKey["Add"] = "Add";
		SpecialKey["Decimal"] = "Decimal";
	})(SpecialKey || (SpecialKey = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/content/ContentLayoutProps.js
var init_ContentLayoutProps = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/content/StandardContentLayouts.js
var StandardContentLayouts;
var init_StandardContentLayouts = __esmMin((() => {
	StandardContentLayouts = class StandardContentLayouts {
		static singleView = {
			id: "uia:singleView",
			description: "Single Content View"
		};
		static fourQuadrants = {
			id: "uia:fourQuadrants",
			description: "Four Views, two stacked on the left, two stacked on the right",
			verticalSplit: {
				id: "uia:fourQuadrantVerticalSplit",
				percentage: .5,
				lock: false,
				minSizeLeft: 100,
				minSizeRight: 100,
				left: { horizontalSplit: {
					id: "uia:fourQuadrantsLeftHorizontal",
					percentage: .5,
					top: 0,
					bottom: 1,
					lock: false,
					minSizeTop: 50,
					minSizeBottom: 50
				} },
				right: { horizontalSplit: {
					id: "uia:fourQuadrantsRightHorizontal",
					percentage: .5,
					top: 2,
					bottom: 3,
					lock: false,
					minSizeTop: 50,
					minSizeBottom: 50
				} }
			}
		};
		static twoVerticalSplit = {
			id: "uia:twoVerticalSplit",
			description: "Two Views, side by side",
			verticalSplit: {
				id: "uia:twoViewsVerticalSplit",
				percentage: .5,
				left: 0,
				right: 1
			}
		};
		static twoHorizontalSplit = {
			id: "uia:twoHorizontalSplit",
			description: "Two views, stack one on top of the other",
			horizontalSplit: {
				id: "uia:twoViewsHorizontalSplit",
				percentage: .5,
				lock: false,
				top: 0,
				bottom: 1
			}
		};
		static threeViewsTwoOnLeft = {
			id: "uia:threeViewsTwoOnLeft",
			description: "Three views, one on the right with the two on the left stacked one of top of the other",
			verticalSplit: {
				id: "uia:twoViewsOnLeftSplit",
				percentage: .5,
				left: { horizontalSplit: {
					id: "uia:twoViewsOnLeftHorizontal",
					percentage: .5,
					top: 0,
					bottom: 1,
					lock: false,
					minSizeTop: 50,
					minSizeBottom: 50
				} },
				right: 2
			}
		};
		static threeViewsTwoOnRight = {
			id: "uia:threeViewsTwoOnRight",
			description: "Three views, one on the left with the two on the right stacked one of top of the other",
			verticalSplit: {
				id: "uia:twoViewsOnRightSplit",
				percentage: .5,
				left: 0,
				right: { horizontalSplit: {
					id: "uia:twoViewsOnRightHorizontal",
					percentage: .5,
					top: 1,
					bottom: 2,
					lock: false,
					minSizeTop: 50,
					minSizeBottom: 50
				} }
			}
		};
		static threeViewsTwoOnBottom = {
			id: "uia:threeViewsTwoOnBottom",
			description: "Three Views, one on top and two side by side on the bottom",
			horizontalSplit: {
				id: "uia:threeViewsTwoOnBottomHorizontal",
				percentage: .5,
				lock: false,
				top: 0,
				bottom: { verticalSplit: {
					id: "uia:twoViewsOnBottomVertical",
					percentage: .5,
					left: 1,
					right: 2,
					lock: false,
					minSizeLeft: 50,
					minSizeRight: 50
				} }
			}
		};
		static threeViewsTwoOnTop = {
			id: "uia:threeViewsTwoOnTop",
			description: "Three Views, two side by side on top and one on the bottom",
			horizontalSplit: {
				id: "uia:twoViewsOnTopHorizontal",
				percentage: .5,
				lock: false,
				top: { verticalSplit: {
					id: "uia:twoViewsOnTopVertical",
					percentage: .5,
					left: 0,
					right: 1,
					lock: false,
					minSizeLeft: 50,
					minSizeRight: 50
				} },
				bottom: 2
			}
		};
		static availableLayouts = [
			StandardContentLayouts.singleView,
			StandardContentLayouts.fourQuadrants,
			StandardContentLayouts.twoVerticalSplit,
			StandardContentLayouts.twoHorizontalSplit,
			StandardContentLayouts.threeViewsTwoOnLeft,
			StandardContentLayouts.threeViewsTwoOnRight,
			StandardContentLayouts.threeViewsTwoOnBottom,
			StandardContentLayouts.threeViewsTwoOnTop
		];
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/DialogItem.js
var DialogProperty;
var init_DialogItem = __esmMin((() => {
	DialogProperty = class {
		description;
		_value;
		_displayValue;
		_isDisabled;
		constructor(description, _value, _displayValue, _isDisabled) {
			this.description = description;
			this._value = _value;
			this._displayValue = _displayValue;
			this._isDisabled = _isDisabled;
		}
		get isDisabled() {
			return !!this._isDisabled;
		}
		set isDisabled(val) {
			this._isDisabled = val;
		}
		get value() {
			return this._value;
		}
		set value(val) {
			this._value = val;
		}
		get name() {
			return this.description.name;
		}
		set displayValue(val) {
			this._displayValue = val;
		}
		get displayValue() {
			return this._displayValue;
		}
		get dialogItemValue() {
			// istanbul ignore else
			if (typeof this._value === "string" || typeof this._value === "number" || typeof this._value === "undefined" || typeof this._value === "boolean" || this._value instanceof Date) return {
				value: this._value,
				displayValue: this._displayValue
			};
			// istanbul ignore next
			throw new Error("Not valid primitive type");
		}
		set dialogItemValue(val) {
			this._value = val.value;
			this._displayValue = val.displayValue;
		}
		get syncItem() {
			const isDisabled = this._isDisabled;
			return {
				propertyName: this.name,
				value: this.dialogItemValue,
				isDisabled
			};
		}
		get item() {
			return {
				propertyName: this.name,
				value: this.dialogItemValue
			};
		}
		toDialogItem(editorPosition, lockProperty) {
			return {
				value: this.dialogItemValue,
				property: this.description,
				editorPosition,
				isDisabled: this._isDisabled,
				lockProperty
			};
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/EditorParams.js
var AlternateDateFormats, TimeDisplay, PropertyEditorParamTypes, isInputEditorSizeParams, isColorEditorParams, isIconListEditorParams, isButtonGroupEditorParams, isSuppressLabelEditorParams, isCustomFormattedNumberParams;
var init_EditorParams = __esmMin((() => {
	(function(AlternateDateFormats) {
		AlternateDateFormats[AlternateDateFormats["None"] = 0] = "None";
		AlternateDateFormats[AlternateDateFormats["IsoShort"] = 1] = "IsoShort";
		AlternateDateFormats[AlternateDateFormats["IsoDateTime"] = 2] = "IsoDateTime";
		AlternateDateFormats[AlternateDateFormats["UtcShort"] = 3] = "UtcShort";
		AlternateDateFormats[AlternateDateFormats["UtcDateTime"] = 4] = "UtcDateTime";
		AlternateDateFormats[AlternateDateFormats["UtcShortWithDay"] = 5] = "UtcShortWithDay";
		AlternateDateFormats[AlternateDateFormats["UtcDateTimeWithDay"] = 6] = "UtcDateTimeWithDay";
	})(AlternateDateFormats || (AlternateDateFormats = {}));
	(function(TimeDisplay) {
		TimeDisplay["H12MC"] = "hh:mm aa";
		TimeDisplay["H12MSC"] = "hh:mm:ss aa";
		TimeDisplay["H24M"] = "hh:mm";
		TimeDisplay["H24MS"] = "hh:mm:ss";
	})(TimeDisplay || (TimeDisplay = {}));
	(function(PropertyEditorParamTypes) {
		PropertyEditorParamTypes["ButtonGroupData"] = "UiAbstract-ButtonGroupData";
		PropertyEditorParamTypes["CheckBoxIcons"] = "UiAbstract-CheckBoxIcons";
		PropertyEditorParamTypes["Icon"] = "UiAbstract-Icon";
		PropertyEditorParamTypes["InputEditorSize"] = "UiAbstract-InputEditorSize";
		PropertyEditorParamTypes["ColorData"] = "UiAbstract-ColorData";
		PropertyEditorParamTypes["CustomFormattedNumber"] = "UiAbstract-CustomFormattedNumber";
		PropertyEditorParamTypes["IconListData"] = "UiAbstract-IconListData";
		PropertyEditorParamTypes["MultilineText"] = "UiAbstract-MultilineText";
		PropertyEditorParamTypes["Range"] = "UiAbstract-Range";
		PropertyEditorParamTypes["Slider"] = "UiAbstract-Slider";
		PropertyEditorParamTypes["SuppressEditorLabel"] = "UiAbstract-SuppressEditorLabel";
		PropertyEditorParamTypes["CheckBoxImages"] = "UiAbstract-CheckBoxImages";
	})(PropertyEditorParamTypes || (PropertyEditorParamTypes = {}));
	isInputEditorSizeParams = (item) => {
		return item.type === PropertyEditorParamTypes.InputEditorSize;
	};
	isColorEditorParams = (item) => {
		return item.type === PropertyEditorParamTypes.ColorData;
	};
	isIconListEditorParams = (item) => {
		return item.type === PropertyEditorParamTypes.IconListData;
	};
	isButtonGroupEditorParams = (item) => {
		return item.type === PropertyEditorParamTypes.ButtonGroupData;
	};
	isSuppressLabelEditorParams = (item) => {
		return item.type === PropertyEditorParamTypes.SuppressEditorLabel;
	};
	isCustomFormattedNumberParams = (item) => {
		return item.type === PropertyEditorParamTypes.CustomFormattedNumber;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/StandardTypeNames.js
var StandardTypeNames;
var init_StandardTypeNames = __esmMin((() => {
	(function(StandardTypeNames) {
		StandardTypeNames["Text"] = "text";
		StandardTypeNames["String"] = "string";
		StandardTypeNames["DateTime"] = "dateTime";
		StandardTypeNames["ShortDate"] = "shortdate";
		StandardTypeNames["Boolean"] = "boolean";
		StandardTypeNames["Bool"] = "bool";
		StandardTypeNames["Float"] = "float";
		StandardTypeNames["Double"] = "double";
		StandardTypeNames["Int"] = "int";
		StandardTypeNames["Integer"] = "integer";
		StandardTypeNames["Number"] = "number";
		StandardTypeNames["Hexadecimal"] = "hexadecimal";
		StandardTypeNames["Hex"] = "hex";
		StandardTypeNames["Enum"] = "enum";
		StandardTypeNames["Point2d"] = "point2d";
		StandardTypeNames["Point3d"] = "point3d";
		StandardTypeNames["Navigation"] = "navigation";
		StandardTypeNames["Composite"] = "composite";
		StandardTypeNames["Array"] = "array";
		StandardTypeNames["Struct"] = "struct";
		StandardTypeNames["URL"] = "url";
	})(StandardTypeNames || (StandardTypeNames = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Value.js
var PropertyValueFormat;
var init_Value = __esmMin((() => {
	(function(PropertyValueFormat) {
		PropertyValueFormat[PropertyValueFormat["Primitive"] = 0] = "Primitive";
		PropertyValueFormat[PropertyValueFormat["Array"] = 1] = "Array";
		PropertyValueFormat[PropertyValueFormat["Struct"] = 2] = "Struct";
	})(PropertyValueFormat || (PropertyValueFormat = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Record.js
function assignMemberIfExists(target, source, memberName) {
	if (source.hasOwnProperty(memberName)) target[memberName] = source[memberName];
}
var PropertyRecord;
var init_Record = __esmMin((() => {
	init_StandardTypeNames();
	init_Value();
	PropertyRecord = class PropertyRecord {
		/** Value for the property */
		value;
		/** The property description containing metadata for the property */
		property;
		/** Description for the property */
		description;
		/** Indicates if the property is read-only */
		isReadonly;
		/** Indicates if the property is disabled */
		isDisabled;
		/** Indicates if the property record represents merged properties */
		isMerged;
		/** Indicates if the property should be automatically expanded */
		autoExpand;
		/** Map containing any additional data */
		extendedData;
		/** Properties for link logic */
		links;
		/** Constructs a PropertyRecord instance */
		constructor(value, property) {
			this.value = value;
			this.property = property;
		}
		/** Creates a copy of this PropertyRecord with a new value and optionally a new PropertyDescription */
		copyWithNewValue(newValue, newDescription) {
			const rec = new PropertyRecord(newValue, newDescription ? newDescription : this.property);
			assignMemberIfExists(rec, this, "description");
			assignMemberIfExists(rec, this, "isReadonly");
			assignMemberIfExists(rec, this, "isDisabled");
			assignMemberIfExists(rec, this, "isMerged");
			assignMemberIfExists(rec, this, "autoExpand");
			assignMemberIfExists(rec, this, "extendedData");
			assignMemberIfExists(rec, this, "links");
			return rec;
		}
		/** Gets this property record value children records */
		getChildrenRecords() {
			switch (this.value.valueFormat) {
				case PropertyValueFormat.Primitive: return [];
				case PropertyValueFormat.Struct: return Object.values(this.value.members);
				case PropertyValueFormat.Array: return this.value.items;
			}
		}
		/** Creates a PropertyRecord based on a value string and an optional property description or name */
		static fromString(value, descriptionOrName) {
			let description;
			if (descriptionOrName && typeof descriptionOrName === "object") description = descriptionOrName;
			else if (descriptionOrName && typeof descriptionOrName === "string") description = {
				name: descriptionOrName,
				displayLabel: descriptionOrName,
				typename: StandardTypeNames.String
			};
			else description = {
				name: "string_value",
				displayLabel: "String Value",
				typename: StandardTypeNames.String
			};
			return new PropertyRecord({
				valueFormat: PropertyValueFormat.Primitive,
				value,
				displayValue: value
			}, description);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/UiDataProvider.js
var SyncPropertiesChangeEvent, UiDataProvider, PropertyChangeStatus;
var init_UiDataProvider = __esmMin((() => {
	init_core_bentley();
	SyncPropertiesChangeEvent = class extends BeUiEvent {};
	UiDataProvider = class {
		/** Called by UI to inform data provider of changes. */
		processChangesInUi(_properties) {
			throw new Error("Derived UiDataProvider must implement this method to apply changes to a bulk set of properties.");
		}
		/** Get Sync UI Control Properties Event */
		onSyncPropertiesChangeEvent = new SyncPropertiesChangeEvent();
		onItemsReloadedEvent = new BeUiEvent();
		/** Called by UI to validate a property value */
		validateProperty(_item) {
			return { status: PropertyChangeStatus.Success };
		}
		/** Called to sync properties synchronously if a UiDataProvider is active for the UI */
		syncProperties(syncProperties) {
			this.fireSyncPropertiesEvent(syncProperties);
		}
		/** Called to inform listener that the UiDataProvider has updated values for the UI */
		fireSyncPropertiesEvent(syncProperties) {
			this.onSyncPropertiesChangeEvent.emit({ properties: syncProperties });
		}
		/** Called to inform listeners that new properties are ready for display in UI.
		*/
		fireItemsReloadedEvent() {
			this.onItemsReloadedEvent.emit();
		}
		/** Used to pass properties between a tool and an explicity defined UI dialog. See method supplyDialogItems in [[UiLayoutDataProvider]] for supplying
		* properties that will be used to dynamically create and layout control in a Dialog or Widget.
		*/
		supplyAvailableProperties() {
			throw new Error("Derived UiDataProvider that want to use DialogPropertyItems must implement this method. Not for use with dynamic UI controls.");
		}
	};
	(function(PropertyChangeStatus) {
		/** Property Change(s) Succeeded */
		PropertyChangeStatus[PropertyChangeStatus["Success"] = 0] = "Success";
		/** Error Processing Property Change(s) */
		PropertyChangeStatus[PropertyChangeStatus["Error"] = 2] = "Error";
	})(PropertyChangeStatus || (PropertyChangeStatus = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/dialogs/UiLayoutDataProvider.js
var DialogButtonType, DialogButtonStyle, UiLayoutDataProvider, DialogLayoutDataProvider;
var init_UiLayoutDataProvider = __esmMin((() => {
	init_core_bentley();
	init_EditorParams();
	init_Record();
	init_Value();
	init_UiDataProvider();
	(function(DialogButtonType) {
		DialogButtonType["None"] = "";
		DialogButtonType["Close"] = "close";
		DialogButtonType["OK"] = "ok";
		DialogButtonType["Cancel"] = "cancel";
		DialogButtonType["Yes"] = "yes";
		DialogButtonType["No"] = "no";
		DialogButtonType["Retry"] = "retry";
		DialogButtonType["Next"] = "next";
		DialogButtonType["Previous"] = "previous";
	})(DialogButtonType || (DialogButtonType = {}));
	(function(DialogButtonStyle) {
		DialogButtonStyle["None"] = "";
		DialogButtonStyle["Primary"] = "iui-cta";
		DialogButtonStyle["Hollow"] = "iui-default";
		DialogButtonStyle["Blue"] = "iui-high-visibility";
	})(DialogButtonStyle || (DialogButtonStyle = {}));
	UiLayoutDataProvider = class UiLayoutDataProvider extends UiDataProvider {
		_items;
		/** Applies changes from one or more properties - some dialogs will use this to send a bulk set of changes back to the provider */
		processChangesInUi(properties) {
			properties.forEach((property) => this.applyUiPropertyChange(property));
			return { status: PropertyChangeStatus.Success };
		}
		/** Applies change of a single property - this is the default method used when property editors are dynamically generated. */
		// istanbul ignore next
		applyUiPropertyChange = (_updatedValue) => {
			throw new Error("Derived UiDataProvider should implement this to apply change to a single property.");
		};
		_rows;
		/** Array of dialog rows */
		get rows() {
			if (!this._rows) this._rows = this.layoutDialogRows();
			return this._rows;
		}
		loadItemsInternal(items) {
			this._items = items ? items : [];
			this._rows = this.layoutDialogRows();
		}
		/** Called by UI to request available properties that can be bound to user supplied UI components (See Tool1UiProvider for example). */
		// istanbul ignore next
		supplyDialogItems() {
			throw new Error("Derived UiDataProvider must implement this method to supply set of properties.");
		}
		get items() {
			if (void 0 === this._items) this.loadItemsInternal(this.supplyDialogItems());
			return this._items;
		}
		/** Called to inform listeners that new properties are ready for display in UI. */
		reloadDialogItems(emitEvent = true) {
			this.loadItemsInternal(this.supplyDialogItems());
			// istanbul ignore else
			if (emitEvent) this.fireItemsReloadedEvent();
		}
		/**
		* @internal
		*/
		layoutDialogRows() {
			const rows = [];
			this.items.forEach((item) => {
				const row = rows.find((value) => value.priority === item.editorPosition.rowPriority);
				if (row) row.items.push(item);
				else rows.push({
					priority: item.editorPosition.rowPriority,
					items: [item]
				});
			});
			rows.sort((a, b) => a.priority - b.priority);
			rows.forEach((row) => row.items.sort((a, b) => a.editorPosition.columnIndex - b.editorPosition.columnIndex));
			return rows;
		}
		/** Determines if a dialog item editor wants a label */
		static editorWantsLabel(item) {
			if (item.property.editor && item.property.editor.params) {
				// istanbul ignore else
				if (item.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.SuppressEditorLabel)) return false;
			}
			return true;
		}
		/** Determines if a dialog items has an associated lock property */
		static hasAssociatedLockProperty(item) {
			return !!item.lockProperty;
		}
		/** Gets the disabled state for a given dialog item */
		static getItemDisabledState(baseDialogItem) {
			const dialogItem = baseDialogItem;
			// istanbul ignore else
			if (dialogItem === void 0 || dialogItem.lockProperty === void 0) return !!baseDialogItem.isDisabled;
			const value = dialogItem.lockProperty.value;
			// istanbul ignore next
			if (value === void 0) return !!baseDialogItem.isDisabled;
			return !value.value;
		}
		/** Gets a property record for a given dialog item */
		static getPropertyRecord = (dialogItem) => {
			const record = new PropertyRecord({
				valueFormat: PropertyValueFormat.Primitive,
				value: dialogItem.value.value,
				displayValue: dialogItem.value.displayValue
			}, dialogItem.property);
			record.isDisabled = UiLayoutDataProvider.getItemDisabledState(dialogItem);
			return record;
		};
		/** Determines if a dialog row only contains button group editors */
		static onlyContainButtonGroupEditors(row) {
			for (const item of row.items)
 // istanbul ignore else
			if (UiLayoutDataProvider.hasAssociatedLockProperty(item) || void 0 === item.property.editor || "enum-buttongroup" !== item.property.editor.name || UiLayoutDataProvider.editorWantsLabel(item)) return false;
			return true;
		}
	};
	DialogLayoutDataProvider = class extends UiLayoutDataProvider {
		onButtonsReloadedEvent = new BeUiEvent();
		/** Called to inform listeners that modal dialog button data needs to be refreshed. */
		fireDialogButtonsReloadEvent() {
			this.onButtonsReloadedEvent.emit();
		}
		supplyButtonData() {
			const buttons = [];
			// istanbul ignore next
			buttons.push({
				type: DialogButtonType.OK,
				onClick: () => {}
			});
			// istanbul ignore next
			buttons.push({
				type: DialogButtonType.Cancel,
				onClick: () => {}
			});
			return buttons;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/AbstractItemProps.js
var init_AbstractItemProps = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/AbstractMenuItemProps.js
var init_AbstractMenuItemProps = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/AbstractToolbarProps.js
var init_AbstractToolbarProps = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/BadgeType.js
var BadgeType;
var init_BadgeType = __esmMin((() => {
	(function(BadgeType) {
		/** No badge. */
		BadgeType[BadgeType["None"] = 0] = "None";
		/** Standard Technical Preview badge. */
		BadgeType[BadgeType["TechnicalPreview"] = 1] = "TechnicalPreview";
		/** Standard New Feature badge. */
		BadgeType[BadgeType["New"] = 2] = "New";
	})(BadgeType || (BadgeType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/ConditionalBooleanValue.js
var ConditionalBooleanValue;
var init_ConditionalBooleanValue = __esmMin((() => {
	ConditionalBooleanValue = class ConditionalBooleanValue {
		testFunc;
		syncEventIds;
		_value;
		/**
		* Constructor for ConditionalBooleanValue. It is important that the same ConditionalBooleanValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
		* @param testFunc Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
		* @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
		* @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
		*/
		constructor(testFunc, syncEventIds, value) {
			this.testFunc = testFunc;
			this.syncEventIds = syncEventIds;
			this._value = value;
		}
		/** The current boolean value of the conditional. */
		get value() {
			if (void 0 !== this._value) return this._value;
			this._value = this.testFunc();
			return this._value;
		}
		/** Called to update the value by running the testFunc */
		refresh() {
			const newValue = this.testFunc();
			if (newValue !== this._value) {
				this._value = newValue;
				return true;
			}
			return false;
		}
		/** helper function to process properties defined as type ConditionalBooleanValue | boolean | undefined */
		static refreshValue(conditionalValue, eventIds) {
			if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalBooleanValue)) return false;
			if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase()))) return conditionalValue.refresh();
			return false;
		}
		/** helper function to get boolean from a ConditionalBooleanValue | boolean | undefined */
		static getValue(conditionalValue) {
			if (void 0 === conditionalValue) return false;
			if (conditionalValue instanceof ConditionalBooleanValue) return conditionalValue.value;
			return conditionalValue;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/ConditionalStringValue.js
var ConditionalStringValue;
var init_ConditionalStringValue = __esmMin((() => {
	ConditionalStringValue = class ConditionalStringValue {
		stringGetter;
		syncEventIds;
		_value;
		/**
		* Constructor for ConditionalStringValue. It is important that the same ConditionalStringValue instance is not used by multiple UI item definitions in order that the control's state is always rendered correctly.
		* @param stringGetter Function to run to retrieve the value for the conditional. This function is run when refresh method is called or if the value is not defined in the constructor.
		* @param syncEventIds An array of eventId that should be monitored to determine when to run the refresh method.
		* @param value The default value for the conditional value. If not specified then the function is run to set the value when the value is retrieved.
		*/
		constructor(stringGetter, syncEventIds, value) {
			this.stringGetter = stringGetter;
			this.syncEventIds = syncEventIds;
			this._value = value;
		}
		/** The current boolean value of the conditional. */
		get value() {
			if (void 0 !== this._value) return this._value;
			this._value = this.stringGetter();
			return this._value;
		}
		/** Called to update the value by running the stringGetter */
		refresh() {
			const newValue = this.stringGetter();
			if (newValue !== this._value) {
				this._value = newValue;
				return true;
			}
			return false;
		}
		/** helper function to process properties defined as type ConditionalStringValue | string | undefined
		* Return true if the value was updated.
		*/
		static refreshValue(conditionalValue, eventIds) {
			if (void 0 === conditionalValue || !(conditionalValue instanceof ConditionalStringValue)) return false;
			if (conditionalValue.syncEventIds.some((value) => eventIds.has(value.toLowerCase()))) return conditionalValue.refresh();
			return false;
		}
		/** helper function to get string from a ConditionalStringValue | string | undefined */
		static getValue(conditionalValue) {
			if (void 0 === conditionalValue) return void 0;
			if (conditionalValue instanceof ConditionalStringValue) return conditionalValue.value;
			return conditionalValue;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/items/RelativePosition.js
var RelativePosition;
var init_RelativePosition = __esmMin((() => {
	(function(RelativePosition) {
		RelativePosition[RelativePosition["Left"] = 0] = "Left";
		RelativePosition[RelativePosition["Top"] = 1] = "Top";
		RelativePosition[RelativePosition["Right"] = 2] = "Right";
		RelativePosition[RelativePosition["Bottom"] = 3] = "Bottom";
		RelativePosition[RelativePosition["TopLeft"] = 4] = "TopLeft";
		RelativePosition[RelativePosition["TopRight"] = 5] = "TopRight";
		RelativePosition[RelativePosition["BottomLeft"] = 6] = "BottomLeft";
		RelativePosition[RelativePosition["BottomRight"] = 7] = "BottomRight";
		RelativePosition[RelativePosition["RightTop"] = 8] = "RightTop";
		RelativePosition[RelativePosition["LeftTop"] = 9] = "LeftTop";
	})(RelativePosition || (RelativePosition = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/notification/MessagePresenter.js
var DisplayMessageType;
var init_MessagePresenter = __esmMin((() => {
	(function(DisplayMessageType) {
		/** Temporary message that displays at the bottom of the screen. */
		DisplayMessageType[DisplayMessageType["Toast"] = 0] = "Toast";
		/** Message with a close button that displays at the bottom of the screen. */
		DisplayMessageType[DisplayMessageType["Sticky"] = 2] = "Sticky";
		/** Message that displays near a specified HTML element. */
		DisplayMessageType[DisplayMessageType["InputField"] = 3] = "InputField";
		/** Modal message box. */
		DisplayMessageType[DisplayMessageType["Alert"] = 4] = "Alert";
	})(DisplayMessageType || (DisplayMessageType = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/notification/MessageSeverity.js
var MessageSeverity;
var init_MessageSeverity = __esmMin((() => {
	(function(MessageSeverity) {
		MessageSeverity[MessageSeverity["None"] = 0] = "None";
		MessageSeverity[MessageSeverity["Information"] = 1] = "Information";
		MessageSeverity[MessageSeverity["Question"] = 2] = "Question";
		MessageSeverity[MessageSeverity["Warning"] = 3] = "Warning";
		MessageSeverity[MessageSeverity["Error"] = 4] = "Error";
		MessageSeverity[MessageSeverity["Fatal"] = 5] = "Fatal";
		MessageSeverity[MessageSeverity["Success"] = 6] = "Success";
	})(MessageSeverity || (MessageSeverity = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/StandardEditorNames.js
var StandardEditorNames;
var init_StandardEditorNames = __esmMin((() => {
	(function(StandardEditorNames) {
		StandardEditorNames["ColorPicker"] = "color-picker";
		StandardEditorNames["LongDate"] = "long-date-picker";
		StandardEditorNames["ShortDate"] = "short-date-picker";
		StandardEditorNames["EnumButtonGroup"] = "enum-buttongroup";
		StandardEditorNames["IconPicker"] = "icon-picker";
		StandardEditorNames["MultiLine"] = "multi-line";
		StandardEditorNames["NumberCustom"] = "number-custom";
		StandardEditorNames["NumericInput"] = "numeric-input";
		StandardEditorNames["Slider"] = "slider";
		StandardEditorNames["Toggle"] = "toggle";
		StandardEditorNames["WeightPicker"] = "weight-picker";
		StandardEditorNames["ImageCheckBox"] = "image-check-box";
		StandardEditorNames["ThemedEnum"] = "themed-enum";
	})(StandardEditorNames || (StandardEditorNames = {}));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/Description.js
var PropertyDescriptionHelper;
var init_Description = __esmMin((() => {
	init_EditorParams();
	init_StandardEditorNames();
	init_StandardTypeNames();
	PropertyDescriptionHelper = class {
		/** Builds a number description with a "weight-picker" editor name
		* @public
		*/
		static buildWeightPickerDescription(name, label, additionalParams = []) {
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Number,
				editor: {
					name: StandardEditorNames.WeightPicker,
					params: additionalParams
				}
			};
		}
		/** Builds an editor that uses [NumberInput]($core-react) control
		* @public
		*/
		static buildNumberEditorDescription(name, label, overrideParams, additionalParams = []) {
			const editorParams = [{
				type: PropertyEditorParamTypes.Range,
				step: 1,
				precision: 0,
				...overrideParams
			}, ...additionalParams];
			const editor = {
				name: StandardEditorNames.NumericInput,
				params: editorParams
			};
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Number,
				editor
			};
		}
		/** Builds a string description
		* @public
		*/
		static buildTextEditorDescription(name, label, additionalParams = []) {
			const editor = { params: additionalParams };
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.String,
				editor
			};
		}
		/** Builds an enum description
		* @public
		*/
		static buildEnumPicklistEditorDescription(name, label, choices, additionalParams = []) {
			const editor = additionalParams.length ? { params: additionalParams } : void 0;
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Enum,
				editor,
				enum: { choices }
			};
		}
		/** Builds a number description for a tool settings or dialog property that will display a "color-picker" control.
		* @public
		*/
		static buildColorPickerDescription(name, label, colorValues, numColumns, additionalParams = []) {
			const editorParams = [{
				type: PropertyEditorParamTypes.ColorData,
				colorValues,
				numColumns
			}, ...additionalParams];
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Number,
				editor: {
					name: StandardEditorNames.ColorPicker,
					params: editorParams
				}
			};
		}
		/** Builds a boolean description for a tool settings or dialog property that will display a "toggle" control.
		* @public
		*/
		static buildToggleDescription(name, label, additionalParams = []) {
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Boolean,
				editor: {
					name: StandardEditorNames.Toggle,
					params: additionalParams
				}
			};
		}
		/** Builds a boolean description for a tool settings or dialog property that will display a "image-check-box" control.
		* @public
		*/
		static buildImageCheckBoxDescription(name, label, imageOff, imageOn, additionalParams = []) {
			const editorParams = [{
				type: PropertyEditorParamTypes.CheckBoxImages,
				imageOff,
				imageOn
			}, ...additionalParams];
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Boolean,
				editor: {
					name: StandardEditorNames.ImageCheckBox,
					params: editorParams
				}
			};
		}
		/** Builds a boolean description for a tool settings or dialog property that will display a checkbox control.
		* @public
		*/
		static buildCheckboxDescription(name, label, additionalParams = []) {
			const editor = { params: additionalParams };
			return {
				name,
				displayLabel: label,
				typename: StandardTypeNames.Boolean,
				editor
			};
		}
		/** Builds a property description for a tool settings or dialog `lock` property. This will create a checkbox control with no label.
		* @public
		*/
		static buildLockPropertyDescription(name, additionalParams = []) {
			const editor = { params: [{
				type: PropertyEditorParamTypes.SuppressEditorLabel,
				suppressLabelPlaceholder: true
			}, ...additionalParams] };
			return {
				name,
				displayLabel: "",
				typename: StandardTypeNames.Boolean,
				editor
			};
		}
		/** Bumps an enum property description value
		* @public
		*/
		static async bumpEnumProperty(description, value) {
			let choices;
			if (description.enum) if (description.enum.choices instanceof Promise) choices = await description.enum.choices;
			else choices = description.enum.choices;
			if (!choices || choices.length === 0) return value;
			let choiceIndex = choices.findIndex((choice) => choice.value === value);
			if (choiceIndex < 0) return value;
			choiceIndex++;
			if (choiceIndex >= choices.length) choiceIndex = 0;
			return choices[choiceIndex].value;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/properties/PrimitiveTypes.js
var init_PrimitiveTypes = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/quantity/BaseQuantityDescription.js
var BaseQuantityDescription;
var init_BaseQuantityDescription = __esmMin((() => {
	init_EditorParams();
	init_StandardTypeNames();
	init_StandardEditorNames();
	BaseQuantityDescription = class {
		name;
		displayLabel;
		typename;
		editor;
		kindOfQuantityName;
		constructor(name, displayLabel, iconSpec, kindOfQuantityName) {
			this.name = name;
			this.displayLabel = displayLabel;
			this.kindOfQuantityName = kindOfQuantityName;
			this.typename = StandardTypeNames.Number;
			this.editor = {
				name: StandardEditorNames.NumberCustom,
				params: [{
					type: PropertyEditorParamTypes.CustomFormattedNumber,
					formatFunction: this.format,
					parseFunction: this.parse
				}]
			};
			// istanbul ignore else
			if (iconSpec) {
				const params = {
					type: PropertyEditorParamTypes.Icon,
					definition: { iconSpec }
				};
				this.editor.params.push(params);
			}
		}
		format = (numberValue) => {
			return this.formatValue(numberValue);
		};
		parse = (userInput) => {
			return this.parseString(userInput);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/toolbars/ToolbarItem.js
var ToolbarItemUtilities;
var init_ToolbarItem = __esmMin((() => {
	ToolbarItemUtilities = class {
		/** Creates an Action Button */
		static createActionButton = (id, itemPriority, icon, label, execute, overrides) => ({
			id,
			itemPriority,
			icon,
			label,
			execute,
			...overrides
		});
		/** Creates a Group button. */
		static createGroupButton = (id, itemPriority, icon, label, items, overrides) => ({
			id,
			itemPriority,
			icon,
			label,
			items,
			...overrides
		});
		/** ActionButton type guard. */
		static isActionButton(item) {
			return item.execute !== void 0;
		}
		/** GroupButton type guard. */
		static isGroupButton(item) {
			return item.items !== void 0;
		}
		/** CustomButtonDefinition type guard. */
		static isCustomDefinition(item) {
			return !!item.isCustom;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/callbacks.js
var init_callbacks = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/misc.js
var getClassName;
var init_misc = __esmMin((() => {
	getClassName = (obj) => {
		let className = "";
		if (obj) {
			if (obj.name) className = obj.name;
			else if (obj.constructor && obj.constructor.name) className = obj.constructor.name;
		}
		return className;
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/IconSpecUtilities.js
var IconSpecUtilities;
var init_IconSpecUtilities = __esmMin((() => {
	IconSpecUtilities = class IconSpecUtilities {
		/** Prefix for an SVG IconSpec loaded with the Sprite loader */
		static SVG_PREFIX = "svg:";
		static WEB_COMPONENT_PREFIX = "webSvg:";
		/** Create an IconSpec for an SVG loaded into web component with svg-loader
		* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
		*/
		static createWebComponentIconSpec(srcString) {
			return `${IconSpecUtilities.WEB_COMPONENT_PREFIX}${srcString}`;
		}
		/** Get the SVG Source from an svg-loader IconSpec
		* @public @deprecated in 4.3 - will not be removed until after 2026-06-13. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
		*/
		static getWebComponentSource(iconSpec) {
			if (iconSpec.startsWith(IconSpecUtilities.WEB_COMPONENT_PREFIX) && iconSpec.length > 7) return iconSpec.slice(7);
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/PointProps.js
var init_PointProps = __esmMin((() => {}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiError.js
var UiError;
var init_UiError = __esmMin((() => {
	init_core_bentley();
	UiError = class extends BentleyError {
		category;
		/** Constructs UiError using BentleyError. */
		constructor(category, message, errorNumber = BentleyStatus.ERROR, getMetaData) {
			super(errorNumber, message, getMetaData);
			this.category = category;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiEventDispatcher.js
var UiSyncEvent, UiEventDispatcher;
var init_UiEventDispatcher = __esmMin((() => {
	init_core_bentley();
	UiSyncEvent = class extends BeUiEvent {};
	UiEventDispatcher = class {
		_syncEventTimerId;
		_eventIds;
		_eventIdAdded;
		_uiSyncEvent;
		_timeoutPeriod;
		_secondaryTimeoutPeriod;
		constructor() {
			this._eventIds = /* @__PURE__ */ new Set();
			this._eventIdAdded = false;
			this._uiSyncEvent = new UiSyncEvent();
			this._timeoutPeriod = 100;
			this._secondaryTimeoutPeriod = this._timeoutPeriod / 2;
		}
		/** @internal - used for testing only */
		/* istanbul ignore next */
		setTimeoutPeriod(period) {
			this._timeoutPeriod = period;
			this._secondaryTimeoutPeriod = Math.floor(this._timeoutPeriod / 2);
			if (this._secondaryTimeoutPeriod < 1) this._secondaryTimeoutPeriod = 1;
			if (this._syncEventTimerId) {
				window.clearTimeout(this._syncEventTimerId);
				this._syncEventTimerId = void 0;
			}
			if (this._eventIds) this._eventIds.clear();
			this._eventIdAdded = false;
		}
		/** The current timeout period */
		get timeoutPeriod() {
			return this._timeoutPeriod;
		}
		/** Return set of event ids that will be sent to listeners/. */
		get syncEventIds() {
			return this._eventIds;
		}
		/** Return UiSyncEvent so callers can register an event callback. */
		get onSyncUiEvent() {
			return this._uiSyncEvent;
		}
		/** Immediately trigger sync event processing. */
		dispatchImmediateSyncUiEvent(eventId) {
			const eventIds = /* @__PURE__ */ new Set();
			eventIds.add(eventId.toLowerCase());
			this.onSyncUiEvent.emit({ eventIds });
		}
		/** Save eventId in Set for processing. */
		dispatchSyncUiEvent(eventId) {
			// istanbul ignore if
			if (0 === this._timeoutPeriod) return;
			this.syncEventIds.add(eventId.toLowerCase());
			if (!this._syncEventTimerId) this._syncEventTimerId = window.setTimeout(() => {
				this.checkForAdditionalIds();
			}, this._timeoutPeriod);
			else this._eventIdAdded = true;
		}
		/** Save multiple eventIds in Set for processing. */
		dispatchSyncUiEvents(eventIds) {
			// istanbul ignore if
			if (0 === this._timeoutPeriod) return;
			eventIds.forEach((id) => this.syncEventIds.add(id.toLowerCase()));
			// istanbul ignore else
			if (!this._syncEventTimerId) this._syncEventTimerId = window.setTimeout(() => {
				this.checkForAdditionalIds();
			}, this._timeoutPeriod);
			else this._eventIdAdded = true;
		}
		/** Trigger registered event processing when timer has expired and no addition eventId are added. */
		checkForAdditionalIds() {
			/* istanbul ignore else */
			if (!this._eventIdAdded) {
				// istanbul ignore else
				if (this._syncEventTimerId) {
					window.clearTimeout(this._syncEventTimerId);
					this._syncEventTimerId = void 0;
				}
				this._eventIdAdded = false;
				// istanbul ignore else
				if (this.syncEventIds.size > 0) {
					const eventIds = /* @__PURE__ */ new Set();
					this.syncEventIds.forEach((value) => eventIds.add(value));
					this._eventIds.clear();
					this.onSyncUiEvent.emit({ eventIds });
				}
				return;
			}
			// istanbul ignore next
			if (this._syncEventTimerId) {
				window.clearTimeout(this._syncEventTimerId);
				this._syncEventTimerId = void 0;
			}
			// istanbul ignore next
			this._eventIdAdded = false;
			// istanbul ignore next
			this._syncEventTimerId = window.setTimeout(() => {
				this.checkForAdditionalIds();
			}, this._secondaryTimeoutPeriod);
		}
		/** Checks to see if an eventId of interest is contained in the set of eventIds */
		hasEventOfInterest(eventIds, idsOfInterest) {
			/* istanbul ignore else */
			if (idsOfInterest.length > 0 && idsOfInterest.some((value) => eventIds.has(value.toLowerCase()))) return true;
			return false;
		}
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/UiEvent.js
var UiEvent;
var init_UiEvent = __esmMin((() => {
	init_core_bentley();
	UiEvent = class extends BeUiEvent {};
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract/utils/filter/filters.js
function isWhitespace(code) {
	return code === CharCode.Space || code === CharCode.Tab || code === CharCode.LineFeed || code === CharCode.CarriageReturn;
}
function isWordSeparator(code) {
	return isWhitespace(code) || wordSeparators.has(code);
}
function charactersMatch(codeA, codeB) {
	return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}
function join(head, tail) {
	if (tail.length === 0) tail = [head];
	else if (head.end === tail[0].start) tail[0].start = head.start;
	else tail.unshift(head);
	return tail;
}
/**
* Matches beginning of words supporting non-ASCII languages.
* @param word Filter string
* @param target String being searched
* @param contiguous - If true the filter string must be found "contiguous" in the searched string (E.g. "pul" will match "Git: Pull").
* Otherwise also matches sub string of the word with beginnings of the words in the target (e.g. "gp" or "g p" will match "Git: Pull").
* Useful in cases where the target is words (e.g. command labels)
* @internal @deprecated in 4.3 - will not be removed until after 2026-06-13. Use `matchesWords` from @itwin/core-react instead. Though internal, this requires deprecation due to known public usage in @itwin/core-react.
*/
function matchesWords(word, target, contiguous = false) {
	if (!target || target.length === 0) return null;
	let result = null;
	let i = 0;
	word = word.toLowerCase();
	target = target.toLowerCase();
	while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) i = nextWord(target, i + 1);
	return result;
}
function _matchesWords(word, target, i, j, contiguous) {
	if (i === word.length) return [];
	else if (j === target.length) return null;
	else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) return null;
	else {
		let result = null;
		let nextWordIndex = j + 1;
		result = _matchesWords(word, target, i + 1, j + 1, contiguous);
		// istanbul ignore else
		if (!contiguous) while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
			result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
			nextWordIndex++;
		}
		return result === null ? null : join({
			start: j,
			end: j + 1
		}, result);
	}
}
function nextWord(word, start) {
	for (let i = start; i < word.length; i++) if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) return i;
	return word.length;
}
var CharCode, wordSeparators;
var init_filters = __esmMin((() => {
	(function(CharCode) {
		CharCode[CharCode["Space"] = 32] = "Space";
		CharCode[CharCode["Tab"] = 9] = "Tab";
		CharCode[CharCode["LineFeed"] = 10] = "LineFeed";
		CharCode[CharCode["CarriageReturn"] = 13] = "CarriageReturn";
	})(CharCode || (CharCode = {}));
	wordSeparators = /* @__PURE__ */ new Set();
	"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?".split("").forEach((s) => wordSeparators.add(s.charCodeAt(0)));
}));
//#endregion
//#region ../../node_modules/.pnpm/@itwin+appui-abstract@5.8.1_@itwin+core-bentley@5.8.1/node_modules/@itwin/appui-abstract/lib/esm/appui-abstract.js
var appui_abstract_exports = /* @__PURE__ */ __exportAll({
	AlternateDateFormats: () => AlternateDateFormats,
	BadgeType: () => BadgeType,
	BaseQuantityDescription: () => BaseQuantityDescription,
	ConditionalBooleanValue: () => ConditionalBooleanValue,
	ConditionalStringValue: () => ConditionalStringValue,
	DialogButtonStyle: () => DialogButtonStyle,
	DialogButtonType: () => DialogButtonType,
	DialogLayoutDataProvider: () => DialogLayoutDataProvider,
	DialogProperty: () => DialogProperty,
	DisplayMessageType: () => DisplayMessageType,
	FunctionKey: () => FunctionKey,
	GenericUiEvent: () => GenericUiEvent,
	IconSpecUtilities: () => IconSpecUtilities,
	MessageSeverity: () => MessageSeverity,
	PropertyChangeStatus: () => PropertyChangeStatus,
	PropertyDescriptionHelper: () => PropertyDescriptionHelper,
	PropertyEditorParamTypes: () => PropertyEditorParamTypes,
	PropertyRecord: () => PropertyRecord,
	PropertyValueFormat: () => PropertyValueFormat,
	RelativePosition: () => RelativePosition,
	SpecialKey: () => SpecialKey,
	StandardContentLayouts: () => StandardContentLayouts,
	StandardEditorNames: () => StandardEditorNames,
	StandardTypeNames: () => StandardTypeNames,
	SyncPropertiesChangeEvent: () => SyncPropertiesChangeEvent,
	TimeDisplay: () => TimeDisplay,
	ToolbarItemUtilities: () => ToolbarItemUtilities,
	UiAdmin: () => UiAdmin,
	UiDataProvider: () => UiDataProvider,
	UiError: () => UiError,
	UiEvent: () => UiEvent,
	UiEventDispatcher: () => UiEventDispatcher,
	UiLayoutDataProvider: () => UiLayoutDataProvider,
	UiSyncEvent: () => UiSyncEvent,
	getClassName: () => getClassName,
	isArrowKey: () => isArrowKey,
	isButtonGroupEditorParams: () => isButtonGroupEditorParams,
	isColorEditorParams: () => isColorEditorParams,
	isCustomFormattedNumberParams: () => isCustomFormattedNumberParams,
	isIconListEditorParams: () => isIconListEditorParams,
	isInputEditorSizeParams: () => isInputEditorSizeParams,
	isSuppressLabelEditorParams: () => isSuppressLabelEditorParams,
	matchesWords: () => matchesWords
});
var init_appui_abstract = __esmMin((() => {
	init_UiAdmin();
	init_KeyboardKey();
	init_ContentLayoutProps();
	init_StandardContentLayouts();
	init_DialogItem();
	init_UiLayoutDataProvider();
	init_UiDataProvider();
	init_AbstractItemProps();
	init_AbstractMenuItemProps();
	init_AbstractToolbarProps();
	init_BadgeType();
	init_ConditionalBooleanValue();
	init_ConditionalStringValue();
	init_RelativePosition();
	init_MessagePresenter();
	init_MessageSeverity();
	init_Description();
	init_EditorParams();
	init_PrimitiveTypes();
	init_Record();
	init_StandardEditorNames();
	init_StandardTypeNames();
	init_Value();
	init_BaseQuantityDescription();
	init_ToolbarItem();
	init_callbacks();
	init_misc();
	init_IconSpecUtilities();
	init_PointProps();
	init_UiError();
	init_UiEventDispatcher();
	init_UiEvent();
	init_filters();
}));
/** @docs-package-description
* The appui-abstract package contains abstractions for UI controls, such as toolbars, buttons and menus.
* For more information, see [UI]($docs/ui/index.md).
*/
/**
* @docs-group-description ContentView
* Classes and interfaces used with Content Layouts.
*/
/**
* @docs-group-description Dialog
* Interfaces and classes for generating UI items for Dialogs.
*/
/**
* @docs-group-description Item
* Classes for working with an Item in a Toolbar, Widget, Backstage or Context Menu
*/
/**
* @docs-group-description Notification
* Interfaces and enums for working with a message
*/
/**
* @docs-group-description Properties
* Properties system for data input and formatting.
*/
/**
* @docs-group-description Toolbar
* Classes for creating and managing items in a toolbar.
*/
/**
* @docs-group-description UiAdmin
* Abstractions for UI controls, such as toolbars, buttons and menus and are callable from IModelApp.uiAdmin in core-frontend.
*/
/**
* @docs-group-description UiItemsProvider
* Interface for specifying UI items to be inserted at runtime.
*/
/**
* @docs-group-description Utilities
* Various utility classes for working with a UI.
*/
//#endregion
//#region ../../node_modules/.pnpm/ts-key-enum@2.0.13/node_modules/ts-key-enum/dist/js/Key.enum.js
var require_Key_enum = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	(function(Key) {
		/**
		* The user agent wasn't able to map the event's virtual keycode to a
		* specific key value.
		* This can happen due to hardware or software constraints, or because of
		* constraints around the platform on which the user agent is running.
		*/
		Key["Unidentified"] = "Unidentified";
		/** The Alt (Alternative) key. */
		Key["Alt"] = "Alt";
		/**
		* The AltGr or AltGraph (Alternate Graphics) key.
		* Enables the ISO Level 3 shift modifier (where Shift is the
		* level 2 modifier).
		*/
		Key["AltGraph"] = "AltGraph";
		/**
		* The Caps Lock key. Toggles the capital character lock on and
		* off for subsequent input.
		*/
		Key["CapsLock"] = "CapsLock";
		/**
		* The Control, Ctrl, or Ctl key. Allows
		* typing control characters.
		*/
		Key["Control"] = "Control";
		/**
		* The Fn (Function modifier) key. Used to allow generating
		* function key (F1–F15, for instance) characters on
		* keyboards without a dedicated function key area. Often handled in
		* hardware so that events aren't generated for this key.
		*/
		Key["Fn"] = "Fn";
		/**
		* The FnLock or F-Lock (Function Lock) key.Toggles
		* the function key mode described by "Fn" on and off. Often
		* handled in hardware so that events aren't generated for this key.
		*/
		Key["FnLock"] = "FnLock";
		/** The Hyper key. */
		Key["Hyper"] = "Hyper";
		/**
		* The Meta key. Allows issuing special command inputs. This is
		* the Windows logo key, or the Command or
		* ⌘ key on Mac keyboards.
		*/
		Key["Meta"] = "Meta";
		/**
		* The NumLock (Number Lock) key. Toggles the numeric keypad
		* between number entry some other mode (often directional arrows).
		*/
		Key["NumLock"] = "NumLock";
		/**
		* The Scroll Lock key. Toggles between scrolling and cursor
		* movement modes.
		*/
		Key["ScrollLock"] = "ScrollLock";
		/**
		* The Shift key. Modifies keystrokes to allow typing upper (or
		* other) case letters, and to support typing punctuation and other special
		* characters.
		*/
		Key["Shift"] = "Shift";
		/** The Super key. */
		Key["Super"] = "Super";
		/** The Symbol modifier key (found on certain virtual keyboards). */
		Key["Symbol"] = "Symbol";
		/** The Symbol Lock key. */
		Key["SymbolLock"] = "SymbolLock";
		/**
		* The Enter or ↵ key (sometimes labeled
		* Return).
		*/
		Key["Enter"] = "Enter";
		/** The Horizontal Tab key, Tab. */
		Key["Tab"] = "Tab";
		/** The down arrow key. */
		Key["ArrowDown"] = "ArrowDown";
		/** The left arrow key. */
		Key["ArrowLeft"] = "ArrowLeft";
		/** The right arrow key. */
		Key["ArrowRight"] = "ArrowRight";
		/** The up arrow key. */
		Key["ArrowUp"] = "ArrowUp";
		/** The End key. Moves to the end of content. */
		Key["End"] = "End";
		/** The Home key. Moves to the start of content. */
		Key["Home"] = "Home";
		/**
		* The Page Down (or PgDn) key. Scrolls down or
		* displays the next page of content.
		*/
		Key["PageDown"] = "PageDown";
		/**
		* The Page Up (or PgUp) key. Scrolls up or displays
		* the previous page of content.
		*/
		Key["PageUp"] = "PageUp";
		/**
		* The Backspace key. This key is labeled Delete on
		* Mac keyboards.
		*/
		Key["Backspace"] = "Backspace";
		/** The Clear key. Removes the currently selected input. */
		Key["Clear"] = "Clear";
		/** The Copy key (on certain extended keyboards). */
		Key["Copy"] = "Copy";
		/** The Cursor Select key, CrSel. */
		Key["CrSel"] = "CrSel";
		/** The Cut key (on certain extended keyboards). */
		Key["Cut"] = "Cut";
		/** The Delete key, Del. */
		Key["Delete"] = "Delete";
		/**
		* Erase to End of Field. Deletes all characters from the current cursor
		* position to the end of the current field.
		*/
		Key["EraseEof"] = "EraseEof";
		/** The ExSel (Extend Selection) key. */
		Key["ExSel"] = "ExSel";
		/**
		* The Insert key, Ins. Toggles between inserting and
		* overwriting text.
		*/
		Key["Insert"] = "Insert";
		/** Paste from the clipboard. */
		Key["Paste"] = "Paste";
		/** Redo the last action. */
		Key["Redo"] = "Redo";
		/** Undo the last action. */
		Key["Undo"] = "Undo";
		/**
		* The Accept, Commit, or OK key or
		* button. Accepts the currently selected option or input method sequence
		* conversion.
		*/
		Key["Accept"] = "Accept";
		/** The Again key. Redoes or repeats a previous action. */
		Key["Again"] = "Again";
		/** The Attn (Attention) key. */
		Key["Attn"] = "Attn";
		/** The Cancel key. */
		Key["Cancel"] = "Cancel";
		/**
		* Shows the context menu. Typically found between the
		* Windows (or OS) key and the Control key
		* on the right side of the keyboard.
		*/
		Key["ContextMenu"] = "ContextMenu";
		/**
		* The Esc (Escape) key. Typically used as an exit, cancel, or
		* "escape this operation" button. Historically, the Escape character was
		* used to signal the start of a special control sequence of characters
		* called an "escape sequence."
		*/
		Key["Escape"] = "Escape";
		/** The Execute key. */
		Key["Execute"] = "Execute";
		/**
		* The Find key. Opens an interface (typically a dialog box) for
		* performing a find/search operation.
		*/
		Key["Find"] = "Find";
		/** The Finish key. */
		Key["Finish"] = "Finish";
		/**
		* The Help key. Opens or toggles the display of help
		* information.
		*/
		Key["Help"] = "Help";
		/**
		* The Pause key. Pauses the current application or state, if
		* applicable.
		* Note: This shouldn't be confused with the
		* "MediaPause" key value, which is used for media
		* controllers, rather than to control applications and processes.
		*/
		Key["Pause"] = "Pause";
		/**
		* The Play key. Resumes a previously paused application, if
		* applicable.
		* Note: This shouldn't be confused with the
		* "MediaPlay" key value, which is used for media
		* controllers, rather than to control applications and processes.
		*/
		Key["Play"] = "Play";
		/** The Props (Properties) key. */
		Key["Props"] = "Props";
		/** The Select key. */
		Key["Select"] = "Select";
		/** The ZoomIn key. */
		Key["ZoomIn"] = "ZoomIn";
		/** The ZoomOut key. */
		Key["ZoomOut"] = "ZoomOut";
		/**
		* The Brightness Down key. Typically used to reduce the brightness of the
		* display.
		*/
		Key["BrightnessDown"] = "BrightnessDown";
		/**
		* The Brightness Up key. Typically increases the brightness of the
		* display.
		*/
		Key["BrightnessUp"] = "BrightnessUp";
		/**
		* The Eject key. Ejects removable media (or toggles an optical
		* storage device tray open and closed).
		*/
		Key["Eject"] = "Eject";
		/** The LogOff key. */
		Key["LogOff"] = "LogOff";
		/**
		* The Power button or key, to toggle power on and off.
		* Note: Not all systems pass this key through to the
		* user agent.
		*/
		Key["Power"] = "Power";
		/**
		* The PowerOff or PowerDown key. Shuts off the
		* system.
		*/
		Key["PowerOff"] = "PowerOff";
		/**
		* The PrintScreen or PrtScr key. Sometimes
		* SnapShot. Captures the screen and prints it or saves it to
		* disk.
		*/
		Key["PrintScreen"] = "PrintScreen";
		/**
		* The Hibernate key. This saves the state of the computer to
		* disk and then shuts down; the computer can be returned to its previous
		* state by restoring the saved state information.
		*/
		Key["Hibernate"] = "Hibernate";
		/**
		* The Standby key. (Also known as Suspend or
		* Sleep.) This turns off the display and puts the computer in a
		* low power consumption mode, without completely powering off.
		*/
		Key["Standby"] = "Standby";
		/**
		* The WakeUp key. Used to wake the computer from the
		* hibernation or standby modes.
		*/
		Key["WakeUp"] = "WakeUp";
		/**
		* The All Candidates key, which starts multi-candidate mode, in
		* which multiple candidates are displayed for the ongoing input.
		*/
		Key["AllCandidates"] = "AllCandidates";
		/** The Alphanumeric key. */
		Key["Alphanumeric"] = "Alphanumeric";
		/**
		* The Code Input key, which enables code input mode, which lets
		* the user enter characters by typing their code points (their Unicode
		* character numbers, typically).
		*/
		Key["CodeInput"] = "CodeInput";
		/** The Compose key. */
		Key["Compose"] = "Compose";
		/**
		* The Convert key, which instructs the IME to convert the
		* current input method sequence into the resulting character.
		*/
		Key["Convert"] = "Convert";
		/**
		* A dead "combining" key; that is, a key which is used in tandem with
		* other keys to generate accented and other modified characters. If
		* pressed by itself, it doesn't generate a character.
		* If you wish to identify which specific dead key was pressed (in cases
		* where more than one exists), you can do so by examining the
		* KeyboardEvent's associated
		* compositionupdate event's
		* data property.
		*/
		Key["Dead"] = "Dead";
		/**
		* The Final (Final Mode) key is used on some Asian keyboards to
		* enter final mode when using IMEs.
		*/
		Key["FinalMode"] = "FinalMode";
		/**
		* Switches to the first character group on an
		* ISO/IEC 9995 keyboard. Each key may have multiple groups of characters, each in its own
		* column. Pressing this key instructs the device to interpret keypresses
		* as coming from the first column on subsequent keystrokes.
		*/
		Key["GroupFirst"] = "GroupFirst";
		/**
		* Switches to the last character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupLast"] = "GroupLast";
		/**
		* Switches to the next character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupNext"] = "GroupNext";
		/**
		* Switches to the previous character group on an
		* ISO/IEC 9995 keyboard.
		*/
		Key["GroupPrevious"] = "GroupPrevious";
		/** The Mode Change key. Toggles or cycles among input modes of IMEs. */
		Key["ModeChange"] = "ModeChange";
		/**
		* The Next Candidate function key. Selects the next possible match for the
		* ongoing input.
		*/
		Key["NextCandidate"] = "NextCandidate";
		/**
		* The NonConvert ("Don't convert") key. This accepts the
		* current input method sequence without running conversion when using an
		* IME.
		*/
		Key["NonConvert"] = "NonConvert";
		/**
		* The Previous Candidate key. Selects the previous possible match for the
		* ongoing input.
		*/
		Key["PreviousCandidate"] = "PreviousCandidate";
		/** The Process key. Instructs the IME to process the conversion. */
		Key["Process"] = "Process";
		/**
		* The Single Candidate key. Enables single candidate mode (as opposed to
		* multi-candidate mode); in this mode, only one candidate is displayed at
		* a time.
		*/
		Key["SingleCandidate"] = "SingleCandidate";
		/**
		* The Hangul (Korean character set) mode key, which toggles
		* between Hangul and English entry modes.
		*/
		Key["HangulMode"] = "HangulMode";
		/**
		* Selects the Hanja mode, for converting Hangul characters to the more
		* specific Hanja characters.
		*/
		Key["HanjaMode"] = "HanjaMode";
		/**
		* Selects the Junja mode, in which Korean is represented using single-byte
		* Latin characters.
		*/
		Key["JunjaMode"] = "JunjaMode";
		/**
		* The Eisu key. This key's purpose is defined by the IME, but
		* may be used to close the IME.
		*/
		Key["Eisu"] = "Eisu";
		/** The Hankaku (half-width characters) key. */
		Key["Hankaku"] = "Hankaku";
		/** The Hiragana key; selects Kana characters mode. */
		Key["Hiragana"] = "Hiragana";
		/** Toggles between the Hiragana and Katakana writing systems. */
		Key["HiraganaKatakana"] = "HiraganaKatakana";
		/** The Kana Mode (Kana Lock) key. */
		Key["KanaMode"] = "KanaMode";
		/**
		* The Kanji Mode key. Enables entering Japanese text using the
		* ideographic characters of Chinese origin.
		*/
		Key["KanjiMode"] = "KanjiMode";
		/** The Katakana key. */
		Key["Katakana"] = "Katakana";
		/** The Romaji key; selects the Roman character set. */
		Key["Romaji"] = "Romaji";
		/** The Zenkaku (full width) characters key. */
		Key["Zenkaku"] = "Zenkaku";
		/** The Zenkaku/Hankaku (full width/half width) toggle key. */
		Key["ZenkakuHanaku"] = "ZenkakuHanaku";
		/** The first general-purpose function key, F1. */
		Key["F1"] = "F1";
		/** The F2 key. */
		Key["F2"] = "F2";
		/** The F3 key. */
		Key["F3"] = "F3";
		/** The F4 key. */
		Key["F4"] = "F4";
		/** The F5 key. */
		Key["F5"] = "F5";
		/** The F6 key. */
		Key["F6"] = "F6";
		/** The F7 key. */
		Key["F7"] = "F7";
		/** The F8 key. */
		Key["F8"] = "F8";
		/** The F9 key. */
		Key["F9"] = "F9";
		/** The F10 key. */
		Key["F10"] = "F10";
		/** The F11 key. */
		Key["F11"] = "F11";
		/** The F12 key. */
		Key["F12"] = "F12";
		/** The F13 key. */
		Key["F13"] = "F13";
		/** The F14 key. */
		Key["F14"] = "F14";
		/** The F15 key. */
		Key["F15"] = "F15";
		/** The F16 key. */
		Key["F16"] = "F16";
		/** The F17 key. */
		Key["F17"] = "F17";
		/** The F18 key. */
		Key["F18"] = "F18";
		/** The F19 key. */
		Key["F19"] = "F19";
		/** The F20 key. */
		Key["F20"] = "F20";
		/** The first general-purpose virtual function key. */
		Key["Soft1"] = "Soft1";
		/** The second general-purpose virtual function key. */
		Key["Soft2"] = "Soft2";
		/** The third general-purpose virtual function key. */
		Key["Soft3"] = "Soft3";
		/** The fourth general-purpose virtual function key. */
		Key["Soft4"] = "Soft4";
		/**
		* Presents a list of recently-used applications which lets the user change
		* apps quickly.
		*/
		Key["AppSwitch"] = "AppSwitch";
		/** The Call key. Dials the number which has been entered. */
		Key["Call"] = "Call";
		/** The Camera key. Activates the camera. */
		Key["Camera"] = "Camera";
		/** The Focus key. Focuses the camera. */
		Key["CameraFocus"] = "CameraFocus";
		/** The End Call or Hang Up button. */
		Key["EndCall"] = "EndCall";
		/** The Back button. */
		Key["GoBack"] = "GoBack";
		/**
		* The Home button. Returns the user to the phone's main screen
		* (usually an application launcher).
		*/
		Key["GoHome"] = "GoHome";
		/**
		* The Headset Hook key. This is typically actually a button on
		* the headset which is used to hang up calls and play or pause media.
		*/
		Key["HeadsetHook"] = "HeadsetHook";
		/** The Redial button. Redials the last-called number. */
		Key["LastNumberRedial"] = "LastNumberRedial";
		/** The Notification key. */
		Key["Notification"] = "Notification";
		/**
		* A button which cycles among the notification modes: silent, vibrate,
		* ring, and so forth.
		*/
		Key["MannerMode"] = "MannerMode";
		/** The Voice Dial key. Initiates voice dialing. */
		Key["VoiceDial"] = "VoiceDial";
		/** Switches to the previous channel. */
		Key["ChannelDown"] = "ChannelDown";
		/** Switches to the next channel. */
		Key["ChannelUp"] = "ChannelUp";
		/** Starts, continues, or increases the speed of fast forwarding the media. */
		Key["MediaFastForward"] = "MediaFastForward";
		/**
		* Pauses the currently playing media.
		* Note: Some older applications use
		* "Pause", but this is not correct.
		*/
		Key["MediaPause"] = "MediaPause";
		/**
		* Starts or continues playing media at normal speed, if not already doing
		* so. Has no effect otherwise.
		*/
		Key["MediaPlay"] = "MediaPlay";
		/** Toggles between playing and pausing the current media. */
		Key["MediaPlayPause"] = "MediaPlayPause";
		/** Starts or resumes recording media. */
		Key["MediaRecord"] = "MediaRecord";
		/** Starts, continues, or increases the speed of rewinding the media. */
		Key["MediaRewind"] = "MediaRewind";
		/**
		* Stops the current media activity (such as playing, recording, pausing,
		* forwarding, or rewinding). Has no effect if the media is currently
		* stopped already.
		*/
		Key["MediaStop"] = "MediaStop";
		/** Seeks to the next media or program track. */
		Key["MediaTrackNext"] = "MediaTrackNext";
		/** Seeks to the previous media or program track. */
		Key["MediaTrackPrevious"] = "MediaTrackPrevious";
		/** Adjusts audio balance toward the left. */
		Key["AudioBalanceLeft"] = "AudioBalanceLeft";
		/** Adjusts audio balance toward the right. */
		Key["AudioBalanceRight"] = "AudioBalanceRight";
		/** Decreases the amount of bass. */
		Key["AudioBassDown"] = "AudioBassDown";
		/**
		* Reduces bass boosting or cycles downward through bass boost modes or
		* states.
		*/
		Key["AudioBassBoostDown"] = "AudioBassBoostDown";
		/** Toggles bass boosting on and off. */
		Key["AudioBassBoostToggle"] = "AudioBassBoostToggle";
		/**
		* Increases the amount of bass boosting, or cycles upward through a set of
		* bass boost modes or states.
		*/
		Key["AudioBassBoostUp"] = "AudioBassBoostUp";
		/** Increases the amount of bass. */
		Key["AudioBassUp"] = "AudioBassUp";
		/** Adjusts the audio fader toward the front. */
		Key["AudioFaderFront"] = "AudioFaderFront";
		/** Adjusts the audio fader toward the rear. */
		Key["AudioFaderRear"] = "AudioFaderRear";
		/** Selects the next available surround sound mode. */
		Key["AudioSurroundModeNext"] = "AudioSurroundModeNext";
		/** Decreases the amount of treble. */
		Key["AudioTrebleDown"] = "AudioTrebleDown";
		/** Increases the amount of treble. */
		Key["AudioTrebleUp"] = "AudioTrebleUp";
		/** Decreases the audio volume. */
		Key["AudioVolumeDown"] = "AudioVolumeDown";
		/** Mutes the audio. */
		Key["AudioVolumeMute"] = "AudioVolumeMute";
		/** Increases the audio volume. */
		Key["AudioVolumeUp"] = "AudioVolumeUp";
		/** Toggles the microphone on and off. */
		Key["MicrophoneToggle"] = "MicrophoneToggle";
		/** Decreases the microphone's input volume. */
		Key["MicrophoneVolumeDown"] = "MicrophoneVolumeDown";
		/** Mutes the microphone input. */
		Key["MicrophoneVolumeMute"] = "MicrophoneVolumeMute";
		/** Increases the microphone's input volume. */
		Key["MicrophoneVolumeUp"] = "MicrophoneVolumeUp";
		/** Switches into TV viewing mode. */
		Key["TV"] = "TV";
		/** Toggles 3D TV mode on and off. */
		Key["TV3DMode"] = "TV3DMode";
		/** Toggles between antenna and cable inputs. */
		Key["TVAntennaCable"] = "TVAntennaCable";
		/** Toggles audio description mode on and off. */
		Key["TVAudioDescription"] = "TVAudioDescription";
		/**
		* Decreases the audio description's mixing volume; reduces the volume of
		* the audio descriptions relative to the program sound.
		*/
		Key["TVAudioDescriptionMixDown"] = "TVAudioDescriptionMixDown";
		/**
		* Increases the audio description's mixing volume; increases the volume of
		* the audio descriptions relative to the program sound.
		*/
		Key["TVAudioDescriptionMixUp"] = "TVAudioDescriptionMixUp";
		/**
		* Displays or hides the media contents available for playback (this may be
		* a channel guide showing the currently airing programs, or a list of
		* media files to play).
		*/
		Key["TVContentsMenu"] = "TVContentsMenu";
		/** Displays or hides the TV's data service menu. */
		Key["TVDataService"] = "TVDataService";
		/** Cycles the input mode on an external TV. */
		Key["TVInput"] = "TVInput";
		/** Switches to the input "Component 1." */
		Key["TVInputComponent1"] = "TVInputComponent1";
		/** Switches to the input "Component 2." */
		Key["TVInputComponent2"] = "TVInputComponent2";
		/** Switches to the input "Composite 1." */
		Key["TVInputComposite1"] = "TVInputComposite1";
		/** Switches to the input "Composite 2." */
		Key["TVInputComposite2"] = "TVInputComposite2";
		/** Switches to the input "HDMI 1." */
		Key["TVInputHDMI1"] = "TVInputHDMI1";
		/** Switches to the input "HDMI 2." */
		Key["TVInputHDMI2"] = "TVInputHDMI2";
		/** Switches to the input "HDMI 3." */
		Key["TVInputHDMI3"] = "TVInputHDMI3";
		/** Switches to the input "HDMI 4." */
		Key["TVInputHDMI4"] = "TVInputHDMI4";
		/** Switches to the input "VGA 1." */
		Key["TVInputVGA1"] = "TVInputVGA1";
		/** The Media Context menu key. */
		Key["TVMediaContext"] = "TVMediaContext";
		/** Toggle the TV's network connection on and off. */
		Key["TVNetwork"] = "TVNetwork";
		/** Put the TV into number entry mode. */
		Key["TVNumberEntry"] = "TVNumberEntry";
		/** The device's power button. */
		Key["TVPower"] = "TVPower";
		/** Radio button. */
		Key["TVRadioService"] = "TVRadioService";
		/** Satellite button. */
		Key["TVSatellite"] = "TVSatellite";
		/** Broadcast Satellite button. */
		Key["TVSatelliteBS"] = "TVSatelliteBS";
		/** Communication Satellite button. */
		Key["TVSatelliteCS"] = "TVSatelliteCS";
		/** Toggles among available satellites. */
		Key["TVSatelliteToggle"] = "TVSatelliteToggle";
		/**
		* Selects analog terrestrial television service (analog cable or antenna
		* reception).
		*/
		Key["TVTerrestrialAnalog"] = "TVTerrestrialAnalog";
		/**
		* Selects digital terrestrial television service (digital cable or antenna
		* reception).
		*/
		Key["TVTerrestrialDigital"] = "TVTerrestrialDigital";
		/** Timer programming button. */
		Key["TVTimer"] = "TVTimer";
		/** Changes the input mode on an external audio/video receiver (AVR) unit. */
		Key["AVRInput"] = "AVRInput";
		/** Toggles the power on an external AVR unit. */
		Key["AVRPower"] = "AVRPower";
		/**
		* General-purpose media function key, color-coded red. This has index
		* 0 among the colored keys.
		*/
		Key["ColorF0Red"] = "ColorF0Red";
		/**
		* General-purpose media function key, color-coded green. This has index
		* 1 among the colored keys.
		*/
		Key["ColorF1Green"] = "ColorF1Green";
		/**
		* General-purpose media function key, color-coded yellow. This has index
		* 2 among the colored keys.
		*/
		Key["ColorF2Yellow"] = "ColorF2Yellow";
		/**
		* General-purpose media function key, color-coded blue. This has index
		* 3 among the colored keys.
		*/
		Key["ColorF3Blue"] = "ColorF3Blue";
		/**
		* General-purpose media function key, color-coded grey. This has index
		* 4 among the colored keys.
		*/
		Key["ColorF4Grey"] = "ColorF4Grey";
		/**
		* General-purpose media function key, color-coded brown. This has index
		* 5 among the colored keys.
		*/
		Key["ColorF5Brown"] = "ColorF5Brown";
		/** Toggles closed captioning on and off. */
		Key["ClosedCaptionToggle"] = "ClosedCaptionToggle";
		/**
		* Adjusts the brightness of the device by toggling between two brightness
		* levels or by cycling among multiple brightness levels.
		*/
		Key["Dimmer"] = "Dimmer";
		/** Cycles among video sources. */
		Key["DisplaySwap"] = "DisplaySwap";
		/** Switches the input source to the Digital Video Recorder (DVR). */
		Key["DVR"] = "DVR";
		/** The Exit button, which exits the current application or menu. */
		Key["Exit"] = "Exit";
		/** Clears the program or content stored in the first favorites list slot. */
		Key["FavoriteClear0"] = "FavoriteClear0";
		/** Clears the program or content stored in the second favorites list slot. */
		Key["FavoriteClear1"] = "FavoriteClear1";
		/** Clears the program or content stored in the third favorites list slot. */
		Key["FavoriteClear2"] = "FavoriteClear2";
		/** Clears the program or content stored in the fourth favorites list slot. */
		Key["FavoriteClear3"] = "FavoriteClear3";
		/**
		* Selects (recalls) the program or content stored in the first favorites
		* list slot.
		*/
		Key["FavoriteRecall0"] = "FavoriteRecall0";
		/**
		* Selects (recalls) the program or content stored in the second favorites
		* list slot.
		*/
		Key["FavoriteRecall1"] = "FavoriteRecall1";
		/**
		* Selects (recalls) the program or content stored in the third favorites
		* list slot.
		*/
		Key["FavoriteRecall2"] = "FavoriteRecall2";
		/**
		* Selects (recalls) the program or content stored in the fourth favorites
		* list slot.
		*/
		Key["FavoriteRecall3"] = "FavoriteRecall3";
		/**
		* Stores the current program or content into the first favorites list
		* slot.
		*/
		Key["FavoriteStore0"] = "FavoriteStore0";
		/**
		* Stores the current program or content into the second favorites list
		* slot.
		*/
		Key["FavoriteStore1"] = "FavoriteStore1";
		/**
		* Stores the current program or content into the third favorites list
		* slot.
		*/
		Key["FavoriteStore2"] = "FavoriteStore2";
		/**
		* Stores the current program or content into the fourth favorites list
		* slot.
		*/
		Key["FavoriteStore3"] = "FavoriteStore3";
		/** Toggles the display of the program or content guide. */
		Key["Guide"] = "Guide";
		/**
		* If the guide is currently displayed, this button tells the guide to
		* display the next day's content.
		*/
		Key["GuideNextDay"] = "GuideNextDay";
		/**
		* If the guide is currently displayed, this button tells the guide to
		* display the previous day's content.
		*/
		Key["GuidePreviousDay"] = "GuidePreviousDay";
		/**
		* Toggles the display of information about the currently selected content,
		* program, or media.
		*/
		Key["Info"] = "Info";
		/**
		* Tells the device to perform an instant replay (typically some form of
		* jumping back a short amount of time then playing it again, possibly but
		* not usually in slow motion).
		*/
		Key["InstantReplay"] = "InstantReplay";
		/** Opens content linked to the current program, if available and possible. */
		Key["Link"] = "Link";
		/** Lists the current program. */
		Key["ListProgram"] = "ListProgram";
		/** Toggles a display listing currently available live content or programs. */
		Key["LiveContent"] = "LiveContent";
		/** Locks or unlocks the currently selected content or pgoram. */
		Key["Lock"] = "Lock";
		/**
		* Presents a list of media applications, such as photo viewers, audio and
		* video players, and games. [1]
		*/
		Key["MediaApps"] = "MediaApps";
		/** The Audio Track key. */
		Key["MediaAudioTrack"] = "MediaAudioTrack";
		/** Jumps back to the last-viewed content, program, or other media. */
		Key["MediaLast"] = "MediaLast";
		/** Skips backward to the previous content or program. */
		Key["MediaSkipBackward"] = "MediaSkipBackward";
		/** Skips forward to the next content or program. */
		Key["MediaSkipForward"] = "MediaSkipForward";
		/** Steps backward to the previous content or program. */
		Key["MediaStepBackward"] = "MediaStepBackward";
		/** Steps forward to the next content or program. */
		Key["MediaStepForward"] = "MediaStepForward";
		/**
		* Top Menu button. Opens the media's main menu (e.g., for a DVD or Blu-Ray
		* disc).
		*/
		Key["MediaTopMenu"] = "MediaTopMenu";
		/** Navigates into a submenu or option. */
		Key["NavigateIn"] = "NavigateIn";
		/** Navigates to the next item. */
		Key["NavigateNext"] = "NavigateNext";
		/** Navigates out of the current screen or menu. */
		Key["NavigateOut"] = "NavigateOut";
		/** Navigates to the previous item. */
		Key["NavigatePrevious"] = "NavigatePrevious";
		/** Cycles to the next channel in the favorites list. */
		Key["NextFavoriteChannel"] = "NextFavoriteChannel";
		/**
		* Cycles to the next saved user profile, if this feature is supported and
		* multiple profiles exist.
		*/
		Key["NextUserProfile"] = "NextUserProfile";
		/**
		* Opens the user interface for selecting on demand content or programs to
		* watch.
		*/
		Key["OnDemand"] = "OnDemand";
		/** Starts the process of pairing the remote with a device to be controlled. */
		Key["Pairing"] = "Pairing";
		/** A button to move the picture-in-picture view downward. */
		Key["PinPDown"] = "PinPDown";
		/** A button to control moving the picture-in-picture view. */
		Key["PinPMove"] = "PinPMove";
		/** Toggles display of the picture-in-picture view on and off. */
		Key["PinPToggle"] = "PinPToggle";
		/** A button to move the picture-in-picture view upward. */
		Key["PinPUp"] = "PinPUp";
		/** Decreases the media playback rate. */
		Key["PlaySpeedDown"] = "PlaySpeedDown";
		/** Returns the media playback rate to normal. */
		Key["PlaySpeedReset"] = "PlaySpeedReset";
		/** Increases the media playback rate. */
		Key["PlaySpeedUp"] = "PlaySpeedUp";
		/** Toggles random media (also known as "shuffle mode") on and off. */
		Key["RandomToggle"] = "RandomToggle";
		/**
		* A code sent when the remote control's battery is low. This doesn't
		* actually correspond to a physical key at all.
		*/
		Key["RcLowBattery"] = "RcLowBattery";
		/** Cycles among the available media recording speeds. */
		Key["RecordSpeedNext"] = "RecordSpeedNext";
		/**
		* Toggles radio frequency (RF) input bypass mode on and off. RF bypass
		* mode passes RF input directly to the RF output without any processing or
		* filtering.
		*/
		Key["RfBypass"] = "RfBypass";
		/**
		* Toggles the channel scan mode on and off. This is a mode which flips
		* through channels automatically until the user stops the scan.
		*/
		Key["ScanChannelsToggle"] = "ScanChannelsToggle";
		/** Cycles through the available screen display modes. */
		Key["ScreenModeNext"] = "ScreenModeNext";
		/** Toggles display of the device's settings screen on and off. */
		Key["Settings"] = "Settings";
		/** Toggles split screen display mode on and off. */
		Key["SplitScreenToggle"] = "SplitScreenToggle";
		/** Cycles among input modes on an external set-top box (STB). */
		Key["STBInput"] = "STBInput";
		/** Toggles on and off an external STB. */
		Key["STBPower"] = "STBPower";
		/** Toggles the display of subtitles on and off if they're available. */
		Key["Subtitle"] = "Subtitle";
		/**
		* Toggles display of teletext,
		* if available.
		*/
		Key["Teletext"] = "Teletext";
		/** Cycles through the available video modes. */
		Key["VideoModeNext"] = "VideoModeNext";
		/**
		* Causes the device to identify itself in some fashion, such as by
		* flashing a light, briefly changing the brightness of indicator lights,
		* or emitting a tone.
		*/
		Key["Wink"] = "Wink";
		/**
		* Toggles between fullscreen and scaled content display, or otherwise
		* change the magnification level.
		*/
		Key["ZoomToggle"] = "ZoomToggle";
		/**
		* Presents a list of possible corrections for a word which was incorrectly
		* identified.
		*/
		Key["SpeechCorrectionList"] = "SpeechCorrectionList";
		/**
		* Toggles between dictation mode and command/control mode. This lets the
		* speech engine know whether to interpret spoken words as input text or as
		* commands.
		*/
		Key["SpeechInputToggle"] = "SpeechInputToggle";
		/** Closes the current document or message. Must not exit the application. */
		Key["Close"] = "Close";
		/** Creates a new document or message. */
		Key["New"] = "New";
		/** Opens an existing document or message. */
		Key["Open"] = "Open";
		/** Prints the current document or message. */
		Key["Print"] = "Print";
		/** Saves the current document or message. */
		Key["Save"] = "Save";
		/** Starts spell checking the current document. */
		Key["SpellCheck"] = "SpellCheck";
		/** Opens the user interface to forward a message. */
		Key["MailForward"] = "MailForward";
		/** Opens the user interface to reply to a message. */
		Key["MailReply"] = "MailReply";
		/** Sends the current message. */
		Key["MailSend"] = "MailSend";
		/**
		* The Calculator key, often labeled with an icon. This is often
		* used as a generic application launcher key
		* (APPCOMMAND_LAUNCH_APP2).
		*/
		Key["LaunchCalculator"] = "LaunchCalculator";
		/** The Calendar key. Often labeled with an icon. */
		Key["LaunchCalendar"] = "LaunchCalendar";
		/** The Contacts key. */
		Key["LaunchContacts"] = "LaunchContacts";
		/** The Mail key. Often labeled with an icon. */
		Key["LaunchMail"] = "LaunchMail";
		/** The Media Player key. */
		Key["LaunchMediaPlayer"] = "LaunchMediaPlayer";
		/** The Music Player key. Often labeled with an icon. */
		Key["LaunchMusicPlayer"] = "LaunchMusicPlayer";
		/**
		* The My Computer key on Windows keyboards. This is often used
		* as a generic application launcher key
		* (APPCOMMAND_LAUNCH_APP1).
		*/
		Key["LaunchMyComputer"] = "LaunchMyComputer";
		/**
		* The Phone key. Opens the phone dialer application (if one is
		* present).
		*/
		Key["LaunchPhone"] = "LaunchPhone";
		/** The Screen Saver key. */
		Key["LaunchScreenSaver"] = "LaunchScreenSaver";
		/** The Spreadsheet key. This key may be labeled with an icon. */
		Key["LaunchSpreadsheet"] = "LaunchSpreadsheet";
		/**
		* The Web Browser key. This key is frequently labeled with an
		* icon.
		*/
		Key["LaunchWebBrowser"] = "LaunchWebBrowser";
		/** The WebCam key. Opens the webcam application. */
		Key["LaunchWebCam"] = "LaunchWebCam";
		/**
		* The Word Processor key. This may be an icon of a specific
		* word processor application, or a generic document icon.
		*/
		Key["LaunchWordProcessor"] = "LaunchWordProcessor";
		/** The first generic application launcher button. */
		Key["LaunchApplication1"] = "LaunchApplication1";
		/** The second generic application launcher button. */
		Key["LaunchApplication2"] = "LaunchApplication2";
		/** The third generic application launcher button. */
		Key["LaunchApplication3"] = "LaunchApplication3";
		/** The fourth generic application launcher button. */
		Key["LaunchApplication4"] = "LaunchApplication4";
		/** The fifth generic application launcher button. */
		Key["LaunchApplication5"] = "LaunchApplication5";
		/** The sixth generic application launcher button. */
		Key["LaunchApplication6"] = "LaunchApplication6";
		/** The seventh generic application launcher button. */
		Key["LaunchApplication7"] = "LaunchApplication7";
		/** The eighth generic application launcher button. */
		Key["LaunchApplication8"] = "LaunchApplication8";
		/** The ninth generic application launcher button. */
		Key["LaunchApplication9"] = "LaunchApplication9";
		/** The 10th generic application launcher button. */
		Key["LaunchApplication10"] = "LaunchApplication10";
		/** The 11th generic application launcher button. */
		Key["LaunchApplication11"] = "LaunchApplication11";
		/** The 12th generic application launcher button. */
		Key["LaunchApplication12"] = "LaunchApplication12";
		/** The 13th generic application launcher button. */
		Key["LaunchApplication13"] = "LaunchApplication13";
		/** The 14th generic application launcher button. */
		Key["LaunchApplication14"] = "LaunchApplication14";
		/** The 15th generic application launcher button. */
		Key["LaunchApplication15"] = "LaunchApplication15";
		/** The 16th generic application launcher button. */
		Key["LaunchApplication16"] = "LaunchApplication16";
		/**
		* Navigates to the previous content or page in the current Web view's
		* history.
		*/
		Key["BrowserBack"] = "BrowserBack";
		/** Opens the user's list of bookmarks/favorites. */
		Key["BrowserFavorites"] = "BrowserFavorites";
		/** Navigates to the next content or page in the current Web view's history. */
		Key["BrowserForward"] = "BrowserForward";
		/** Navigates to the user's preferred home page. */
		Key["BrowserHome"] = "BrowserHome";
		/** Refreshes the current page or content. */
		Key["BrowserRefresh"] = "BrowserRefresh";
		/**
		* Activates the user's preferred search engine or the search interface
		* within their browser.
		*/
		Key["BrowserSearch"] = "BrowserSearch";
		/** Stops loading the currently displayed Web view or content. */
		Key["BrowserStop"] = "BrowserStop";
		/**
		* The decimal point key (typically . or
		* , depending on the region).
		* In newer browsers, this value to be the character generated by the
		* decimal key (one of those two characters). [1]
		*/
		Key["Decimal"] = "Decimal";
		/** The 11 key found on certain media numeric keypads. */
		Key["Key11"] = "Key11";
		/** The 12 key found on certain media numeric keypads. */
		Key["Key12"] = "Key12";
		/** The numeric keypad's multiplication key, *. */
		Key["Multiply"] = "Multiply";
		/** The numeric keypad's addition key, +. */
		Key["Add"] = "Add";
		/** The numeric keypad's division key, /. */
		Key["Divide"] = "Divide";
		/** The numeric keypad's subtraction key, -. */
		Key["Subtract"] = "Subtract";
		/**
		* The numeric keypad's places separator character.
		* (In the United States this is a comma, but elsewhere it is frequently
		* a period.)
		*/
		Key["Separator"] = "Separator";
	})(exports.Key || (exports.Key = {}));
}));
//#endregion
export { isInstanceOf as $, compareNumbersOrUndefined as $t, UiLayoutDataProvider as A, init_BentleyError as An, expectDefined as At, AlternateDateFormats as B, OrderedId64Array as Bt, init_ConditionalStringValue as C, BentleyError as Cn, OneAtATimeAction as Ct, init_BadgeType as D, ITwinError as Dn, IndexMap as Dt, BadgeType as E, IModelStatus as En, init_ObservableSet as Et, init_Record as F, OpenMode as Fn, init_Disposable as Ft, init_DialogItem as G, init_SortedArray as Gt, TimeDisplay as H, DuplicatePolicy as Ht, PropertyValueFormat as I, init_BeSQLite as In, Dictionary as It, UiAdmin as J, init_OrderedId64Iterable as Jt, StandardContentLayouts as K, lowerBound as Kt, init_Value as L, assert as Ln, init_Dictionary as Lt, PropertyChangeStatus as M, init_JsonUtils as Mn, init_Expect as Mt, init_UiDataProvider as N, DbOpcode as Nn, dispose as Nt, DialogButtonType as O, RealityDataStatus as On, IndexedValue as Ot, PropertyRecord as P, DbResult as Pn, disposeArray as Pt, init_UtilityTypes as Q, compareNumbers as Qt, StandardTypeNames as R, init_Assert as Rn, CompressedId64Set as Rt, ConditionalStringValue as S, init_Logger as Sn, AbandonedError as St, init_ConditionalBooleanValue as T, GeoServiceStatus as Tn, ObservableSet as Tt, init_EditorParams as U, ReadonlySortedArray as Ut, PropertyEditorParamTypes as V, init_CompressedId64Set as Vt, DialogProperty as W, SortedArray as Wt, init_core_bentley as X, compareBooleans as Xt, init_UiAdmin as Y, compareArrays as Yt, asInstanceOf as Z, compareBooleansOrUndefined as Zt, init_MessageSeverity as _, init_BeEvent as _n, init_PriorityQueue as _t, init_UiEvent as a, compareWithTolerance as an, Tracing as at, RelativePosition as b, LogLevel as bn, OrderedSet as bt, ToolbarItemUtilities as c, init_ByteStream as cn, BeTimePoint as ct, init_BaseQuantityDescription as d, TransientIdSequence as dn, base64StringToUint8Array as dt, comparePossiblyUndefined as en, Uint16ArrayBuilder as et, PropertyDescriptionHelper as f, init_Id as fn, init_StringUtils as ft, MessageSeverity as g, BeUiEvent as gn, PriorityQueue as gt, init_StandardEditorNames as h, BeEvent as hn, init_ProcessDetector as ht, UiEvent as i, compareStringsOrUndefined as in, init_TypedArrayBuilder as it, init_UiLayoutDataProvider as j, JsonUtils as jn, expectNotNull as jt, DialogLayoutDataProvider as k, RpcInterfaceStatus as kn, init_IndexMap as kt, init_ToolbarItem as l, Guid as ln, StopWatch as lt, StandardEditorNames as m, init_StatusCategory as mn, ProcessDetector as mt, appui_abstract_exports as n, compareSimpleTypes as nn, Uint8ArrayBuilder as nt, UiError as o, init_Compare as on, init_Tracing as ot, init_Description as p, StatusCategory as pn, utf8ToString as pt, init_StandardContentLayouts as q, OrderedId64Iterable as qt, init_appui_abstract as r, compareStrings as rn, UintArrayBuilder as rt, init_UiError as s, ByteStream as sn, BeDuration as st, require_Key_enum as t, compareSimpleArrays as tn, Uint32ArrayBuilder as tt, BaseQuantityDescription as u, Id64 as un, init_Time as ut, DisplayMessageType as v, UnexpectedErrors as vn, init_partitionArray as vt, ConditionalBooleanValue as w, BentleyStatus as wn, init_OneAtATimeAction as wt, init_RelativePosition as x, Logger as xn, init_OrderedSet as xt, init_MessagePresenter as y, init_UnexpectedErrors as yn, partitionArray as yt, init_StandardTypeNames as z, MutableCompressedId64Set as zt };
