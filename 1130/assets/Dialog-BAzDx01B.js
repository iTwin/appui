const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./styles-_k_Q0V1q.css"])))=>i.map(i=>d[i]);
import { g as getDefaultExportFromCjs, r as reactExports, b as React, R as React$1 } from "./index-DDLqOySG.js";
import { r as reactDomExports, R as ReactDOM } from "./index-BwI9SQDf.js";
import { _ as __vitePreload } from "./iframe-ClmldM-Z.js";
import { _ as _inheritsLoose } from "./inheritsLoose-HEqISCW8.js";
function assert(condition, message) {
  return;
}
var OpenMode;
(function(OpenMode2) {
  OpenMode2[OpenMode2["Readonly"] = 1] = "Readonly";
  OpenMode2[OpenMode2["ReadWrite"] = 2] = "ReadWrite";
})(OpenMode || (OpenMode = {}));
var DbOpcode;
(function(DbOpcode2) {
  DbOpcode2[DbOpcode2["Delete"] = 9] = "Delete";
  DbOpcode2[DbOpcode2["Insert"] = 18] = "Insert";
  DbOpcode2[DbOpcode2["Update"] = 23] = "Update";
})(DbOpcode || (DbOpcode = {}));
var DbResult;
(function(DbResult2) {
  DbResult2[DbResult2["BE_SQLITE_OK"] = 0] = "BE_SQLITE_OK";
  DbResult2[DbResult2["BE_SQLITE_ERROR"] = 1] = "BE_SQLITE_ERROR";
  DbResult2[DbResult2["BE_SQLITE_INTERNAL"] = 2] = "BE_SQLITE_INTERNAL";
  DbResult2[DbResult2["BE_SQLITE_PERM"] = 3] = "BE_SQLITE_PERM";
  DbResult2[DbResult2["BE_SQLITE_ABORT"] = 4] = "BE_SQLITE_ABORT";
  DbResult2[DbResult2["BE_SQLITE_BUSY"] = 5] = "BE_SQLITE_BUSY";
  DbResult2[DbResult2["BE_SQLITE_LOCKED"] = 6] = "BE_SQLITE_LOCKED";
  DbResult2[DbResult2["BE_SQLITE_NOMEM"] = 7] = "BE_SQLITE_NOMEM";
  DbResult2[DbResult2["BE_SQLITE_READONLY"] = 8] = "BE_SQLITE_READONLY";
  DbResult2[DbResult2["BE_SQLITE_INTERRUPT"] = 9] = "BE_SQLITE_INTERRUPT";
  DbResult2[DbResult2["BE_SQLITE_IOERR"] = 10] = "BE_SQLITE_IOERR";
  DbResult2[DbResult2["BE_SQLITE_CORRUPT"] = 11] = "BE_SQLITE_CORRUPT";
  DbResult2[DbResult2["BE_SQLITE_NOTFOUND"] = 12] = "BE_SQLITE_NOTFOUND";
  DbResult2[DbResult2["BE_SQLITE_FULL"] = 13] = "BE_SQLITE_FULL";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN"] = 14] = "BE_SQLITE_CANTOPEN";
  DbResult2[DbResult2["BE_SQLITE_PROTOCOL"] = 15] = "BE_SQLITE_PROTOCOL";
  DbResult2[DbResult2["BE_SQLITE_EMPTY"] = 16] = "BE_SQLITE_EMPTY";
  DbResult2[DbResult2["BE_SQLITE_SCHEMA"] = 17] = "BE_SQLITE_SCHEMA";
  DbResult2[DbResult2["BE_SQLITE_TOOBIG"] = 18] = "BE_SQLITE_TOOBIG";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_BASE"] = 19] = "BE_SQLITE_CONSTRAINT_BASE";
  DbResult2[DbResult2["BE_SQLITE_MISMATCH"] = 20] = "BE_SQLITE_MISMATCH";
  DbResult2[DbResult2["BE_SQLITE_MISUSE"] = 21] = "BE_SQLITE_MISUSE";
  DbResult2[DbResult2["BE_SQLITE_NOLFS"] = 22] = "BE_SQLITE_NOLFS";
  DbResult2[DbResult2["BE_SQLITE_AUTH"] = 23] = "BE_SQLITE_AUTH";
  DbResult2[DbResult2["BE_SQLITE_FORMAT"] = 24] = "BE_SQLITE_FORMAT";
  DbResult2[DbResult2["BE_SQLITE_RANGE"] = 25] = "BE_SQLITE_RANGE";
  DbResult2[DbResult2["BE_SQLITE_NOTADB"] = 26] = "BE_SQLITE_NOTADB";
  DbResult2[DbResult2["BE_SQLITE_ROW"] = 100] = "BE_SQLITE_ROW";
  DbResult2[DbResult2["BE_SQLITE_DONE"] = 101] = "BE_SQLITE_DONE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_READ"] = 266] = "BE_SQLITE_IOERR_READ";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHORT_READ"] = 522] = "BE_SQLITE_IOERR_SHORT_READ";
  DbResult2[DbResult2["BE_SQLITE_IOERR_WRITE"] = 778] = "BE_SQLITE_IOERR_WRITE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_FSYNC"] = 1034] = "BE_SQLITE_IOERR_FSYNC";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DIR_FSYNC"] = 1290] = "BE_SQLITE_IOERR_DIR_FSYNC";
  DbResult2[DbResult2["BE_SQLITE_IOERR_TRUNCATE"] = 1546] = "BE_SQLITE_IOERR_TRUNCATE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_FSTAT"] = 1802] = "BE_SQLITE_IOERR_FSTAT";
  DbResult2[DbResult2["BE_SQLITE_IOERR_UNLOCK"] = 2058] = "BE_SQLITE_IOERR_UNLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_RDLOCK"] = 2314] = "BE_SQLITE_IOERR_RDLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DELETE"] = 2570] = "BE_SQLITE_IOERR_DELETE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_BLOCKED"] = 2826] = "BE_SQLITE_IOERR_BLOCKED";
  DbResult2[DbResult2["BE_SQLITE_IOERR_NOMEM"] = 3082] = "BE_SQLITE_IOERR_NOMEM";
  DbResult2[DbResult2["BE_SQLITE_IOERR_ACCESS"] = 3338] = "BE_SQLITE_IOERR_ACCESS";
  DbResult2[DbResult2["BE_SQLITE_IOERR_CHECKRESERVEDLOCK"] = 3594] = "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_LOCK"] = 3850] = "BE_SQLITE_IOERR_LOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_CLOSE"] = 4106] = "BE_SQLITE_IOERR_CLOSE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DIR_CLOSE"] = 4362] = "BE_SQLITE_IOERR_DIR_CLOSE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMOPEN"] = 4618] = "BE_SQLITE_IOERR_SHMOPEN";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMSIZE"] = 4874] = "BE_SQLITE_IOERR_SHMSIZE";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMLOCK"] = 5130] = "BE_SQLITE_IOERR_SHMLOCK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SHMMAP"] = 5386] = "BE_SQLITE_IOERR_SHMMAP";
  DbResult2[DbResult2["BE_SQLITE_IOERR_SEEK"] = 5642] = "BE_SQLITE_IOERR_SEEK";
  DbResult2[DbResult2["BE_SQLITE_IOERR_DELETE_NOENT"] = 5898] = "BE_SQLITE_IOERR_DELETE_NOENT";
  DbResult2[DbResult2["BE_SQLITE_ERROR_FileExists"] = 16777226] = "BE_SQLITE_ERROR_FileExists";
  DbResult2[DbResult2["BE_SQLITE_ERROR_AlreadyOpen"] = 33554442] = "BE_SQLITE_ERROR_AlreadyOpen";
  DbResult2[DbResult2["BE_SQLITE_ERROR_NoPropertyTable"] = 50331658] = "BE_SQLITE_ERROR_NoPropertyTable";
  DbResult2[DbResult2["BE_SQLITE_ERROR_FileNotFound"] = 67108874] = "BE_SQLITE_ERROR_FileNotFound";
  DbResult2[DbResult2["BE_SQLITE_ERROR_NoTxnActive"] = 83886090] = "BE_SQLITE_ERROR_NoTxnActive";
  DbResult2[DbResult2["BE_SQLITE_ERROR_BadDbProfile"] = 100663306] = "BE_SQLITE_ERROR_BadDbProfile";
  DbResult2[DbResult2["BE_SQLITE_ERROR_InvalidProfileVersion"] = 117440522] = "BE_SQLITE_ERROR_InvalidProfileVersion";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileUpgradeFailed"] = 134217738] = "BE_SQLITE_ERROR_ProfileUpgradeFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooOldForReadWrite"] = 150994954] = "BE_SQLITE_ERROR_ProfileTooOldForReadWrite";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooOld"] = 167772170] = "BE_SQLITE_ERROR_ProfileTooOld";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooNewForReadWrite"] = 184549386] = "BE_SQLITE_ERROR_ProfileTooNewForReadWrite";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ProfileTooNew"] = 201326602] = "BE_SQLITE_ERROR_ProfileTooNew";
  DbResult2[DbResult2["BE_SQLITE_ERROR_ChangeTrackError"] = 218103818] = "BE_SQLITE_ERROR_ChangeTrackError";
  DbResult2[DbResult2["BE_SQLITE_ERROR_InvalidChangeSetVersion"] = 234881034] = "BE_SQLITE_ERROR_InvalidChangeSetVersion";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeRequired"] = 251658250] = "BE_SQLITE_ERROR_SchemaUpgradeRequired";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaTooNew"] = 268435466] = "BE_SQLITE_ERROR_SchemaTooNew";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaTooOld"] = 285212682] = "BE_SQLITE_ERROR_SchemaTooOld";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaLockFailed"] = 301989898] = "BE_SQLITE_ERROR_SchemaLockFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeFailed"] = 318767114] = "BE_SQLITE_ERROR_SchemaUpgradeFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaImportFailed"] = 335544330] = "BE_SQLITE_ERROR_SchemaImportFailed";
  DbResult2[DbResult2["BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes"] = 352321546] = "BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes";
  DbResult2[DbResult2["BE_SQLITE_ERROR_SchemaUpgradeRecommended"] = 369098762] = "BE_SQLITE_ERROR_SchemaUpgradeRecommended";
  DbResult2[DbResult2["BE_SQLITE_ERROR_DataTransformRequired"] = 385875978] = "BE_SQLITE_ERROR_DataTransformRequired";
  DbResult2[DbResult2["BE_SQLITE_LOCKED_SHAREDCACHE"] = 262] = "BE_SQLITE_LOCKED_SHAREDCACHE";
  DbResult2[DbResult2["BE_SQLITE_BUSY_RECOVERY"] = 261] = "BE_SQLITE_BUSY_RECOVERY";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_NOTEMPDIR"] = 270] = "BE_SQLITE_CANTOPEN_NOTEMPDIR";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_ISDIR"] = 526] = "BE_SQLITE_CANTOPEN_ISDIR";
  DbResult2[DbResult2["BE_SQLITE_CANTOPEN_FULLPATH"] = 782] = "BE_SQLITE_CANTOPEN_FULLPATH";
  DbResult2[DbResult2["BE_SQLITE_CORRUPT_VTAB"] = 267] = "BE_SQLITE_CORRUPT_VTAB";
  DbResult2[DbResult2["BE_SQLITE_READONLY_RECOVERY"] = 264] = "BE_SQLITE_READONLY_RECOVERY";
  DbResult2[DbResult2["BE_SQLITE_READONLY_CANTLOCK"] = 520] = "BE_SQLITE_READONLY_CANTLOCK";
  DbResult2[DbResult2["BE_SQLITE_READONLY_ROLLBACK"] = 776] = "BE_SQLITE_READONLY_ROLLBACK";
  DbResult2[DbResult2["BE_SQLITE_ABORT_ROLLBACK"] = 516] = "BE_SQLITE_ABORT_ROLLBACK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_CHECK"] = 275] = "BE_SQLITE_CONSTRAINT_CHECK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_COMMITHOOK"] = 531] = "BE_SQLITE_CONSTRAINT_COMMITHOOK";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_FOREIGNKEY"] = 787] = "BE_SQLITE_CONSTRAINT_FOREIGNKEY";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_FUNCTION"] = 1043] = "BE_SQLITE_CONSTRAINT_FUNCTION";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_NOTNULL"] = 1299] = "BE_SQLITE_CONSTRAINT_NOTNULL";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_PRIMARYKEY"] = 1555] = "BE_SQLITE_CONSTRAINT_PRIMARYKEY";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_TRIGGER"] = 1811] = "BE_SQLITE_CONSTRAINT_TRIGGER";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_UNIQUE"] = 2067] = "BE_SQLITE_CONSTRAINT_UNIQUE";
  DbResult2[DbResult2["BE_SQLITE_CONSTRAINT_VTAB"] = 2323] = "BE_SQLITE_CONSTRAINT_VTAB";
})(DbResult || (DbResult = {}));
var BentleyStatus;
(function(BentleyStatus2) {
  BentleyStatus2[BentleyStatus2["SUCCESS"] = 0] = "SUCCESS";
  BentleyStatus2[BentleyStatus2["ERROR"] = 32768] = "ERROR";
})(BentleyStatus || (BentleyStatus = {}));
var IModelStatus;
(function(IModelStatus2) {
  IModelStatus2[IModelStatus2["IMODEL_ERROR_BASE"] = 65536] = "IMODEL_ERROR_BASE";
  IModelStatus2[IModelStatus2["Success"] = 0] = "Success";
  IModelStatus2[IModelStatus2["AlreadyLoaded"] = 65537] = "AlreadyLoaded";
  IModelStatus2[IModelStatus2["AlreadyOpen"] = 65538] = "AlreadyOpen";
  IModelStatus2[IModelStatus2["BadArg"] = 65539] = "BadArg";
  IModelStatus2[IModelStatus2["BadElement"] = 65540] = "BadElement";
  IModelStatus2[IModelStatus2["BadModel"] = 65541] = "BadModel";
  IModelStatus2[IModelStatus2["BadRequest"] = 65542] = "BadRequest";
  IModelStatus2[IModelStatus2["BadSchema"] = 65543] = "BadSchema";
  IModelStatus2[IModelStatus2["CannotUndo"] = 65544] = "CannotUndo";
  IModelStatus2[IModelStatus2["CodeNotReserved"] = 65545] = "CodeNotReserved";
  IModelStatus2[IModelStatus2["DeletionProhibited"] = 65546] = "DeletionProhibited";
  IModelStatus2[IModelStatus2["DuplicateCode"] = 65547] = "DuplicateCode";
  IModelStatus2[IModelStatus2["DuplicateName"] = 65548] = "DuplicateName";
  IModelStatus2[IModelStatus2["ElementBlockedChange"] = 65549] = "ElementBlockedChange";
  IModelStatus2[IModelStatus2["FileAlreadyExists"] = 65550] = "FileAlreadyExists";
  IModelStatus2[IModelStatus2["FileNotFound"] = 65551] = "FileNotFound";
  IModelStatus2[IModelStatus2["FileNotLoaded"] = 65552] = "FileNotLoaded";
  IModelStatus2[IModelStatus2["ForeignKeyConstraint"] = 65553] = "ForeignKeyConstraint";
  IModelStatus2[IModelStatus2["IdExists"] = 65554] = "IdExists";
  IModelStatus2[IModelStatus2["InDynamicTransaction"] = 65555] = "InDynamicTransaction";
  IModelStatus2[IModelStatus2["InvalidCategory"] = 65556] = "InvalidCategory";
  IModelStatus2[IModelStatus2["InvalidCode"] = 65557] = "InvalidCode";
  IModelStatus2[IModelStatus2["InvalidCodeSpec"] = 65558] = "InvalidCodeSpec";
  IModelStatus2[IModelStatus2["InvalidId"] = 65559] = "InvalidId";
  IModelStatus2[IModelStatus2["InvalidName"] = 65560] = "InvalidName";
  IModelStatus2[IModelStatus2["InvalidParent"] = 65561] = "InvalidParent";
  IModelStatus2[IModelStatus2["InvalidProfileVersion"] = 65562] = "InvalidProfileVersion";
  IModelStatus2[IModelStatus2["IsCreatingChangeSet"] = 65563] = "IsCreatingChangeSet";
  IModelStatus2[IModelStatus2["LockNotHeld"] = 65564] = "LockNotHeld";
  IModelStatus2[IModelStatus2["Mismatch2d3d"] = 65565] = "Mismatch2d3d";
  IModelStatus2[IModelStatus2["MismatchGcs"] = 65566] = "MismatchGcs";
  IModelStatus2[IModelStatus2["MissingDomain"] = 65567] = "MissingDomain";
  IModelStatus2[IModelStatus2["MissingHandler"] = 65568] = "MissingHandler";
  IModelStatus2[IModelStatus2["MissingId"] = 65569] = "MissingId";
  IModelStatus2[IModelStatus2["NoGeometry"] = 65570] = "NoGeometry";
  IModelStatus2[IModelStatus2["NoMultiTxnOperation"] = 65571] = "NoMultiTxnOperation";
  IModelStatus2[IModelStatus2["NotEnabled"] = 65573] = "NotEnabled";
  IModelStatus2[IModelStatus2["NotFound"] = 65574] = "NotFound";
  IModelStatus2[IModelStatus2["NotOpen"] = 65575] = "NotOpen";
  IModelStatus2[IModelStatus2["NotOpenForWrite"] = 65576] = "NotOpenForWrite";
  IModelStatus2[IModelStatus2["NotSameUnitBase"] = 65577] = "NotSameUnitBase";
  IModelStatus2[IModelStatus2["NothingToRedo"] = 65578] = "NothingToRedo";
  IModelStatus2[IModelStatus2["NothingToUndo"] = 65579] = "NothingToUndo";
  IModelStatus2[IModelStatus2["ParentBlockedChange"] = 65580] = "ParentBlockedChange";
  IModelStatus2[IModelStatus2["ReadError"] = 65581] = "ReadError";
  IModelStatus2[IModelStatus2["ReadOnly"] = 65582] = "ReadOnly";
  IModelStatus2[IModelStatus2["ReadOnlyDomain"] = 65583] = "ReadOnlyDomain";
  IModelStatus2[IModelStatus2["RepositoryManagerError"] = 65584] = "RepositoryManagerError";
  IModelStatus2[IModelStatus2["SQLiteError"] = 65585] = "SQLiteError";
  IModelStatus2[IModelStatus2["TransactionActive"] = 65586] = "TransactionActive";
  IModelStatus2[IModelStatus2["UnitsMissing"] = 65587] = "UnitsMissing";
  IModelStatus2[IModelStatus2["UnknownFormat"] = 65588] = "UnknownFormat";
  IModelStatus2[IModelStatus2["UpgradeFailed"] = 65589] = "UpgradeFailed";
  IModelStatus2[IModelStatus2["ValidationFailed"] = 65590] = "ValidationFailed";
  IModelStatus2[IModelStatus2["VersionTooNew"] = 65591] = "VersionTooNew";
  IModelStatus2[IModelStatus2["VersionTooOld"] = 65592] = "VersionTooOld";
  IModelStatus2[IModelStatus2["ViewNotFound"] = 65593] = "ViewNotFound";
  IModelStatus2[IModelStatus2["WriteError"] = 65594] = "WriteError";
  IModelStatus2[IModelStatus2["WrongClass"] = 65595] = "WrongClass";
  IModelStatus2[IModelStatus2["WrongIModel"] = 65596] = "WrongIModel";
  IModelStatus2[IModelStatus2["WrongDomain"] = 65597] = "WrongDomain";
  IModelStatus2[IModelStatus2["WrongElement"] = 65598] = "WrongElement";
  IModelStatus2[IModelStatus2["WrongHandler"] = 65599] = "WrongHandler";
  IModelStatus2[IModelStatus2["WrongModel"] = 65600] = "WrongModel";
  IModelStatus2[IModelStatus2["ConstraintNotUnique"] = 65601] = "ConstraintNotUnique";
  IModelStatus2[IModelStatus2["NoGeoLocation"] = 65602] = "NoGeoLocation";
  IModelStatus2[IModelStatus2["ServerTimeout"] = 65603] = "ServerTimeout";
  IModelStatus2[IModelStatus2["NoContent"] = 65604] = "NoContent";
  IModelStatus2[IModelStatus2["NotRegistered"] = 65605] = "NotRegistered";
  IModelStatus2[IModelStatus2["FunctionNotFound"] = 65606] = "FunctionNotFound";
  IModelStatus2[IModelStatus2["NoActiveCommand"] = 65607] = "NoActiveCommand";
})(IModelStatus || (IModelStatus = {}));
var BriefcaseStatus;
(function(BriefcaseStatus2) {
  BriefcaseStatus2[BriefcaseStatus2["BRIEFCASE_STATUS_BASE"] = 131072] = "BRIEFCASE_STATUS_BASE";
  BriefcaseStatus2[BriefcaseStatus2["CannotAcquire"] = 131072] = "CannotAcquire";
  BriefcaseStatus2[BriefcaseStatus2["CannotDownload"] = 131073] = "CannotDownload";
  BriefcaseStatus2[BriefcaseStatus2["CannotUpload"] = 131074] = "CannotUpload";
  BriefcaseStatus2[BriefcaseStatus2["CannotCopy"] = 131075] = "CannotCopy";
  BriefcaseStatus2[BriefcaseStatus2["CannotDelete"] = 131076] = "CannotDelete";
  BriefcaseStatus2[BriefcaseStatus2["VersionNotFound"] = 131077] = "VersionNotFound";
  BriefcaseStatus2[BriefcaseStatus2["CannotApplyChanges"] = 131078] = "CannotApplyChanges";
  BriefcaseStatus2[BriefcaseStatus2["DownloadCancelled"] = 131079] = "DownloadCancelled";
  BriefcaseStatus2[BriefcaseStatus2["ContainsDeletedChangeSets"] = 131080] = "ContainsDeletedChangeSets";
})(BriefcaseStatus || (BriefcaseStatus = {}));
var RpcInterfaceStatus;
(function(RpcInterfaceStatus2) {
  RpcInterfaceStatus2[RpcInterfaceStatus2["Success"] = 0] = "Success";
  RpcInterfaceStatus2[RpcInterfaceStatus2["RPC_INTERFACE_ERROR_BASE"] = 135168] = "RPC_INTERFACE_ERROR_BASE";
  RpcInterfaceStatus2[RpcInterfaceStatus2["IncompatibleVersion"] = 135168] = "IncompatibleVersion";
})(RpcInterfaceStatus || (RpcInterfaceStatus = {}));
var ChangeSetStatus;
(function(ChangeSetStatus2) {
  ChangeSetStatus2[ChangeSetStatus2["Success"] = 0] = "Success";
  ChangeSetStatus2[ChangeSetStatus2["CHANGESET_ERROR_BASE"] = 90112] = "CHANGESET_ERROR_BASE";
  ChangeSetStatus2[ChangeSetStatus2["ApplyError"] = 90113] = "ApplyError";
  ChangeSetStatus2[ChangeSetStatus2["ChangeTrackingNotEnabled"] = 90114] = "ChangeTrackingNotEnabled";
  ChangeSetStatus2[ChangeSetStatus2["CorruptedChangeStream"] = 90115] = "CorruptedChangeStream";
  ChangeSetStatus2[ChangeSetStatus2["FileNotFound"] = 90116] = "FileNotFound";
  ChangeSetStatus2[ChangeSetStatus2["FileWriteError"] = 90117] = "FileWriteError";
  ChangeSetStatus2[ChangeSetStatus2["HasLocalChanges"] = 90118] = "HasLocalChanges";
  ChangeSetStatus2[ChangeSetStatus2["HasUncommittedChanges"] = 90119] = "HasUncommittedChanges";
  ChangeSetStatus2[ChangeSetStatus2["InvalidId"] = 90120] = "InvalidId";
  ChangeSetStatus2[ChangeSetStatus2["InvalidVersion"] = 90121] = "InvalidVersion";
  ChangeSetStatus2[ChangeSetStatus2["InDynamicTransaction"] = 90122] = "InDynamicTransaction";
  ChangeSetStatus2[ChangeSetStatus2["IsCreatingChangeSet"] = 90123] = "IsCreatingChangeSet";
  ChangeSetStatus2[ChangeSetStatus2["IsNotCreatingChangeSet"] = 90124] = "IsNotCreatingChangeSet";
  ChangeSetStatus2[ChangeSetStatus2["MergePropagationError"] = 90125] = "MergePropagationError";
  ChangeSetStatus2[ChangeSetStatus2["NothingToMerge"] = 90126] = "NothingToMerge";
  ChangeSetStatus2[ChangeSetStatus2["NoTransactions"] = 90127] = "NoTransactions";
  ChangeSetStatus2[ChangeSetStatus2["ParentMismatch"] = 90128] = "ParentMismatch";
  ChangeSetStatus2[ChangeSetStatus2["SQLiteError"] = 90129] = "SQLiteError";
  ChangeSetStatus2[ChangeSetStatus2["WrongDgnDb"] = 90130] = "WrongDgnDb";
  ChangeSetStatus2[ChangeSetStatus2["CouldNotOpenDgnDb"] = 90131] = "CouldNotOpenDgnDb";
  ChangeSetStatus2[ChangeSetStatus2["MergeSchemaChangesOnOpen"] = 90132] = "MergeSchemaChangesOnOpen";
  ChangeSetStatus2[ChangeSetStatus2["ReverseOrReinstateSchemaChanges"] = 90133] = "ReverseOrReinstateSchemaChanges";
  ChangeSetStatus2[ChangeSetStatus2["ProcessSchemaChangesOnOpen"] = 90134] = "ProcessSchemaChangesOnOpen";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoReadonly"] = 90135] = "CannotMergeIntoReadonly";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoMaster"] = 90136] = "CannotMergeIntoMaster";
  ChangeSetStatus2[ChangeSetStatus2["CannotMergeIntoReversed"] = 90137] = "CannotMergeIntoReversed";
  ChangeSetStatus2[ChangeSetStatus2["DownloadCancelled"] = 90138] = "DownloadCancelled";
})(ChangeSetStatus || (ChangeSetStatus = {}));
var RepositoryStatus;
(function(RepositoryStatus2) {
  RepositoryStatus2[RepositoryStatus2["Success"] = 0] = "Success";
  RepositoryStatus2[RepositoryStatus2["ServerUnavailable"] = 86017] = "ServerUnavailable";
  RepositoryStatus2[RepositoryStatus2["LockAlreadyHeld"] = 86018] = "LockAlreadyHeld";
  RepositoryStatus2[RepositoryStatus2["SyncError"] = 86019] = "SyncError";
  RepositoryStatus2[RepositoryStatus2["InvalidResponse"] = 86020] = "InvalidResponse";
  RepositoryStatus2[RepositoryStatus2["PendingTransactions"] = 86021] = "PendingTransactions";
  RepositoryStatus2[RepositoryStatus2["LockUsed"] = 86022] = "LockUsed";
  RepositoryStatus2[RepositoryStatus2["CannotCreateChangeSet"] = 86023] = "CannotCreateChangeSet";
  RepositoryStatus2[RepositoryStatus2["InvalidRequest"] = 86024] = "InvalidRequest";
  RepositoryStatus2[RepositoryStatus2["ChangeSetRequired"] = 86025] = "ChangeSetRequired";
  RepositoryStatus2[RepositoryStatus2["CodeUnavailable"] = 86026] = "CodeUnavailable";
  RepositoryStatus2[RepositoryStatus2["CodeNotReserved"] = 86027] = "CodeNotReserved";
  RepositoryStatus2[RepositoryStatus2["CodeUsed"] = 86028] = "CodeUsed";
  RepositoryStatus2[RepositoryStatus2["LockNotHeld"] = 86029] = "LockNotHeld";
  RepositoryStatus2[RepositoryStatus2["RepositoryIsLocked"] = 86030] = "RepositoryIsLocked";
  RepositoryStatus2[RepositoryStatus2["ChannelConstraintViolation"] = 86031] = "ChannelConstraintViolation";
})(RepositoryStatus || (RepositoryStatus = {}));
var HttpStatus;
(function(HttpStatus2) {
  HttpStatus2[HttpStatus2["Success"] = 0] = "Success";
  HttpStatus2[HttpStatus2["Info"] = 94209] = "Info";
  HttpStatus2[HttpStatus2["Redirection"] = 94210] = "Redirection";
  HttpStatus2[HttpStatus2["ClientError"] = 94211] = "ClientError";
  HttpStatus2[HttpStatus2["ServerError"] = 94212] = "ServerError";
})(HttpStatus || (HttpStatus = {}));
var IModelHubStatus;
(function(IModelHubStatus2) {
  IModelHubStatus2[IModelHubStatus2["Success"] = 0] = "Success";
  IModelHubStatus2[IModelHubStatus2["IMODELHUBERROR_BASE"] = 102400] = "IMODELHUBERROR_BASE";
  IModelHubStatus2[IModelHubStatus2["IMODELHUBERROR_REQUESTERRORBASE"] = 102656] = "IMODELHUBERROR_REQUESTERRORBASE";
  IModelHubStatus2[IModelHubStatus2["Unknown"] = 102401] = "Unknown";
  IModelHubStatus2[IModelHubStatus2["MissingRequiredProperties"] = 102402] = "MissingRequiredProperties";
  IModelHubStatus2[IModelHubStatus2["InvalidPropertiesValues"] = 102403] = "InvalidPropertiesValues";
  IModelHubStatus2[IModelHubStatus2["UserDoesNotHavePermission"] = 102404] = "UserDoesNotHavePermission";
  IModelHubStatus2[IModelHubStatus2["UserDoesNotHaveAccess"] = 102405] = "UserDoesNotHaveAccess";
  IModelHubStatus2[IModelHubStatus2["InvalidBriefcase"] = 102406] = "InvalidBriefcase";
  IModelHubStatus2[IModelHubStatus2["BriefcaseDoesNotExist"] = 102407] = "BriefcaseDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["BriefcaseDoesNotBelongToUser"] = 102408] = "BriefcaseDoesNotBelongToUser";
  IModelHubStatus2[IModelHubStatus2["AnotherUserPushing"] = 102409] = "AnotherUserPushing";
  IModelHubStatus2[IModelHubStatus2["ChangeSetAlreadyExists"] = 102410] = "ChangeSetAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["ChangeSetDoesNotExist"] = 102411] = "ChangeSetDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileIsNotUploaded"] = 102412] = "FileIsNotUploaded";
  IModelHubStatus2[IModelHubStatus2["iModelIsNotInitialized"] = 102413] = "iModelIsNotInitialized";
  IModelHubStatus2[IModelHubStatus2["ChangeSetPointsToBadSeed"] = 102414] = "ChangeSetPointsToBadSeed";
  IModelHubStatus2[IModelHubStatus2["OperationFailed"] = 102415] = "OperationFailed";
  IModelHubStatus2[IModelHubStatus2["PullIsRequired"] = 102416] = "PullIsRequired";
  IModelHubStatus2[IModelHubStatus2["MaximumNumberOfBriefcasesPerUser"] = 102417] = "MaximumNumberOfBriefcasesPerUser";
  IModelHubStatus2[IModelHubStatus2["MaximumNumberOfBriefcasesPerUserPerMinute"] = 102418] = "MaximumNumberOfBriefcasesPerUserPerMinute";
  IModelHubStatus2[IModelHubStatus2["DatabaseTemporarilyLocked"] = 102419] = "DatabaseTemporarilyLocked";
  IModelHubStatus2[IModelHubStatus2["iModelIsLocked"] = 102420] = "iModelIsLocked";
  IModelHubStatus2[IModelHubStatus2["CodesExist"] = 102421] = "CodesExist";
  IModelHubStatus2[IModelHubStatus2["LocksExist"] = 102422] = "LocksExist";
  IModelHubStatus2[IModelHubStatus2["iModelAlreadyExists"] = 102423] = "iModelAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["iModelDoesNotExist"] = 102424] = "iModelDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileDoesNotExist"] = 102425] = "FileDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["FileAlreadyExists"] = 102426] = "FileAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["LockDoesNotExist"] = 102427] = "LockDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["LockOwnedByAnotherBriefcase"] = 102428] = "LockOwnedByAnotherBriefcase";
  IModelHubStatus2[IModelHubStatus2["CodeStateInvalid"] = 102429] = "CodeStateInvalid";
  IModelHubStatus2[IModelHubStatus2["CodeReservedByAnotherBriefcase"] = 102430] = "CodeReservedByAnotherBriefcase";
  IModelHubStatus2[IModelHubStatus2["CodeDoesNotExist"] = 102431] = "CodeDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventTypeDoesNotExist"] = 102432] = "EventTypeDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventSubscriptionDoesNotExist"] = 102433] = "EventSubscriptionDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["EventSubscriptionAlreadyExists"] = 102434] = "EventSubscriptionAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["ITwinIdIsNotSpecified"] = 102435] = "ITwinIdIsNotSpecified";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinPermissions"] = 102436] = "FailedToGetITwinPermissions";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinMembers"] = 102437] = "FailedToGetITwinMembers";
  IModelHubStatus2[IModelHubStatus2["ChangeSetAlreadyHasVersion"] = 102438] = "ChangeSetAlreadyHasVersion";
  IModelHubStatus2[IModelHubStatus2["VersionAlreadyExists"] = 102439] = "VersionAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["JobSchedulingFailed"] = 102440] = "JobSchedulingFailed";
  IModelHubStatus2[IModelHubStatus2["ConflictsAggregate"] = 102441] = "ConflictsAggregate";
  IModelHubStatus2[IModelHubStatus2["FailedToGetITwinById"] = 102442] = "FailedToGetITwinById";
  IModelHubStatus2[IModelHubStatus2["DatabaseOperationFailed"] = 102443] = "DatabaseOperationFailed";
  IModelHubStatus2[IModelHubStatus2["SeedFileInitializationFailed"] = 102444] = "SeedFileInitializationFailed";
  IModelHubStatus2[IModelHubStatus2["FailedToGetAssetPermissions"] = 102445] = "FailedToGetAssetPermissions";
  IModelHubStatus2[IModelHubStatus2["FailedToGetAssetMembers"] = 102446] = "FailedToGetAssetMembers";
  IModelHubStatus2[IModelHubStatus2["ITwinDoesNotExist"] = 102447] = "ITwinDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["LockChunkDoesNotExist"] = 102449] = "LockChunkDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["CheckpointAlreadyExists"] = 102450] = "CheckpointAlreadyExists";
  IModelHubStatus2[IModelHubStatus2["CheckpointDoesNotExist"] = 102451] = "CheckpointDoesNotExist";
  IModelHubStatus2[IModelHubStatus2["UndefinedArgumentError"] = 102657] = "UndefinedArgumentError";
  IModelHubStatus2[IModelHubStatus2["InvalidArgumentError"] = 102658] = "InvalidArgumentError";
  IModelHubStatus2[IModelHubStatus2["MissingDownloadUrlError"] = 102659] = "MissingDownloadUrlError";
  IModelHubStatus2[IModelHubStatus2["NotSupportedInBrowser"] = 102660] = "NotSupportedInBrowser";
  IModelHubStatus2[IModelHubStatus2["FileHandlerNotSet"] = 102661] = "FileHandlerNotSet";
  IModelHubStatus2[IModelHubStatus2["FileNotFound"] = 102662] = "FileNotFound";
  IModelHubStatus2[IModelHubStatus2["InitializationTimeout"] = 102663] = "InitializationTimeout";
})(IModelHubStatus || (IModelHubStatus = {}));
var GeoServiceStatus;
(function(GeoServiceStatus2) {
  GeoServiceStatus2[GeoServiceStatus2["Success"] = 0] = "Success";
  GeoServiceStatus2[GeoServiceStatus2["GEOSERVICESTATUS_BASE"] = 147456] = "GEOSERVICESTATUS_BASE";
  GeoServiceStatus2[GeoServiceStatus2["NoGeoLocation"] = 65602] = "NoGeoLocation";
  GeoServiceStatus2[GeoServiceStatus2["OutOfUsefulRange"] = 147457] = "OutOfUsefulRange";
  GeoServiceStatus2[GeoServiceStatus2["OutOfMathematicalDomain"] = 147458] = "OutOfMathematicalDomain";
  GeoServiceStatus2[GeoServiceStatus2["NoDatumConverter"] = 147459] = "NoDatumConverter";
  GeoServiceStatus2[GeoServiceStatus2["VerticalDatumConvertError"] = 147460] = "VerticalDatumConvertError";
  GeoServiceStatus2[GeoServiceStatus2["CSMapError"] = 147461] = "CSMapError";
  GeoServiceStatus2[GeoServiceStatus2["Pending"] = 147462] = "Pending";
})(GeoServiceStatus || (GeoServiceStatus = {}));
var RealityDataStatus;
(function(RealityDataStatus2) {
  RealityDataStatus2[RealityDataStatus2["Success"] = 0] = "Success";
  RealityDataStatus2[RealityDataStatus2["REALITYDATA_ERROR_BASE"] = 151552] = "REALITYDATA_ERROR_BASE";
  RealityDataStatus2[RealityDataStatus2["InvalidData"] = 151553] = "InvalidData";
})(RealityDataStatus || (RealityDataStatus = {}));
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}
class BentleyError extends Error {
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
    switch (this.errorNumber) {
      case IModelStatus.AlreadyLoaded:
        return "Already Loaded";
      case IModelStatus.AlreadyOpen:
        return "Already Open";
      case IModelStatus.BadArg:
        return "Bad Arg";
      case IModelStatus.BadElement:
        return "Bad Element";
      case IModelStatus.BadModel:
        return "Bad Model";
      case IModelStatus.BadRequest:
        return "Bad Request";
      case IModelStatus.BadSchema:
        return "Bad Schema";
      case IModelStatus.CannotUndo:
        return "Can not Undo";
      case IModelStatus.CodeNotReserved:
        return "Code Not Reserved";
      case IModelStatus.DeletionProhibited:
        return "Deletion Prohibited";
      case IModelStatus.DuplicateCode:
        return "Duplicate Code";
      case IModelStatus.DuplicateName:
        return "Duplicate Name";
      case IModelStatus.ElementBlockedChange:
        return "Element Blocked Change";
      case IModelStatus.FileAlreadyExists:
        return "File Already Exists";
      case IModelStatus.FileNotFound:
        return "File Not Found";
      case IModelStatus.FileNotLoaded:
        return "File Not Loaded";
      case IModelStatus.ForeignKeyConstraint:
        return "ForeignKey Constraint";
      case IModelStatus.IdExists:
        return "Id Exists";
      case IModelStatus.InDynamicTransaction:
        return "InDynamicTransaction";
      case IModelStatus.InvalidCategory:
        return "Invalid Category";
      case IModelStatus.InvalidCode:
        return "Invalid Code";
      case IModelStatus.InvalidCodeSpec:
        return "Invalid CodeSpec";
      case IModelStatus.InvalidId:
        return "Invalid Id";
      case IModelStatus.InvalidName:
        return "Invalid Name";
      case IModelStatus.InvalidParent:
        return "Invalid Parent";
      case IModelStatus.InvalidProfileVersion:
        return "Invalid Profile Version";
      case IModelStatus.IsCreatingChangeSet:
        return "IsCreatingChangeSet";
      case IModelStatus.LockNotHeld:
        return "Lock Not Held";
      case IModelStatus.Mismatch2d3d:
        return "Mismatch 2d3d";
      case IModelStatus.MismatchGcs:
        return "Mismatch Gcs";
      case IModelStatus.MissingDomain:
        return "Missing Domain";
      case IModelStatus.MissingHandler:
        return "Missing Handler";
      case IModelStatus.MissingId:
        return "Missing Id";
      case IModelStatus.NoGeometry:
        return "No Geometry";
      case IModelStatus.NoMultiTxnOperation:
        return "NoMultiTxnOperation";
      case IModelStatus.NotEnabled:
        return "Not Enabled";
      case IModelStatus.NotFound:
        return "Not Found";
      case IModelStatus.NotOpen:
        return "Not Open";
      case IModelStatus.NotOpenForWrite:
        return "Not Open For Write";
      case IModelStatus.NotSameUnitBase:
        return "Not Same Unit Base";
      case IModelStatus.NothingToRedo:
        return "Nothing To Redo";
      case IModelStatus.NothingToUndo:
        return "Nothing To Undo";
      case IModelStatus.ParentBlockedChange:
        return "Parent Blocked Change";
      case IModelStatus.ReadError:
        return "Read Error";
      case IModelStatus.ReadOnly:
        return "ReadOnly";
      case IModelStatus.ReadOnlyDomain:
        return "ReadOnlyDomain";
      case IModelStatus.RepositoryManagerError:
        return "RepositoryManagerError";
      case IModelStatus.SQLiteError:
        return "SQLiteError";
      case IModelStatus.TransactionActive:
        return "Transaction Active";
      case IModelStatus.UnitsMissing:
        return "Units Missing";
      case IModelStatus.UnknownFormat:
        return "Unknown Format";
      case IModelStatus.UpgradeFailed:
        return "Upgrade Failed";
      case IModelStatus.ValidationFailed:
        return "Validation Failed";
      case IModelStatus.VersionTooNew:
        return "Version Too New";
      case IModelStatus.VersionTooOld:
        return "Version Too Old";
      case IModelStatus.ViewNotFound:
        return "View Not Found";
      case IModelStatus.WriteError:
        return "Write Error";
      case IModelStatus.WrongClass:
        return "Wrong Class";
      case IModelStatus.WrongIModel:
        return "Wrong IModel";
      case IModelStatus.WrongDomain:
        return "Wrong Domain";
      case IModelStatus.WrongElement:
        return "Wrong Element";
      case IModelStatus.WrongHandler:
        return "Wrong Handler";
      case IModelStatus.WrongModel:
        return "Wrong Model";
      case DbResult.BE_SQLITE_ERROR:
        return "BE_SQLITE_ERROR";
      case DbResult.BE_SQLITE_INTERNAL:
        return "BE_SQLITE_INTERNAL";
      case DbResult.BE_SQLITE_PERM:
        return "BE_SQLITE_PERM";
      case DbResult.BE_SQLITE_ABORT:
        return "BE_SQLITE_ABORT";
      case DbResult.BE_SQLITE_BUSY:
        return "Db is busy";
      case DbResult.BE_SQLITE_LOCKED:
        return "Db is Locked";
      case DbResult.BE_SQLITE_NOMEM:
        return "BE_SQLITE_NOMEM";
      case DbResult.BE_SQLITE_READONLY:
        return "Readonly";
      case DbResult.BE_SQLITE_INTERRUPT:
        return "BE_SQLITE_INTERRUPT";
      case DbResult.BE_SQLITE_IOERR:
        return "BE_SQLITE_IOERR";
      case DbResult.BE_SQLITE_CORRUPT:
        return "BE_SQLITE_CORRUPT";
      case DbResult.BE_SQLITE_NOTFOUND:
        return "Not Found";
      case DbResult.BE_SQLITE_FULL:
        return "BE_SQLITE_FULL";
      case DbResult.BE_SQLITE_CANTOPEN:
        return "Can't open";
      case DbResult.BE_SQLITE_PROTOCOL:
        return "BE_SQLITE_PROTOCOL";
      case DbResult.BE_SQLITE_EMPTY:
        return "BE_SQLITE_EMPTY";
      case DbResult.BE_SQLITE_SCHEMA:
        return "BE_SQLITE_SCHEMA";
      case DbResult.BE_SQLITE_TOOBIG:
        return "BE_SQLITE_TOOBIG";
      case DbResult.BE_SQLITE_MISMATCH:
        return "BE_SQLITE_MISMATCH";
      case DbResult.BE_SQLITE_MISUSE:
        return "BE_SQLITE_MISUSE";
      case DbResult.BE_SQLITE_NOLFS:
        return "BE_SQLITE_NOLFS";
      case DbResult.BE_SQLITE_AUTH:
        return "BE_SQLITE_AUTH";
      case DbResult.BE_SQLITE_FORMAT:
        return "BE_SQLITE_FORMAT";
      case DbResult.BE_SQLITE_RANGE:
        return "BE_SQLITE_RANGE";
      case DbResult.BE_SQLITE_NOTADB:
        return "Not a Database";
      case DbResult.BE_SQLITE_IOERR_READ:
        return "BE_SQLITE_IOERR_READ";
      case DbResult.BE_SQLITE_IOERR_SHORT_READ:
        return "BE_SQLITE_IOERR_SHORT_READ";
      case DbResult.BE_SQLITE_IOERR_WRITE:
        return "BE_SQLITE_IOERR_WRITE";
      case DbResult.BE_SQLITE_IOERR_FSYNC:
        return "BE_SQLITE_IOERR_FSYNC";
      case DbResult.BE_SQLITE_IOERR_DIR_FSYNC:
        return "BE_SQLITE_IOERR_DIR_FSYNC";
      case DbResult.BE_SQLITE_IOERR_TRUNCATE:
        return "BE_SQLITE_IOERR_TRUNCATE";
      case DbResult.BE_SQLITE_IOERR_FSTAT:
        return "BE_SQLITE_IOERR_FSTAT";
      case DbResult.BE_SQLITE_IOERR_UNLOCK:
        return "BE_SQLITE_IOERR_UNLOCK";
      case DbResult.BE_SQLITE_IOERR_RDLOCK:
        return "BE_SQLITE_IOERR_RDLOCK";
      case DbResult.BE_SQLITE_IOERR_DELETE:
        return "BE_SQLITE_IOERR_DELETE";
      case DbResult.BE_SQLITE_IOERR_BLOCKED:
        return "BE_SQLITE_IOERR_BLOCKED";
      case DbResult.BE_SQLITE_IOERR_NOMEM:
        return "BE_SQLITE_IOERR_NOMEM";
      case DbResult.BE_SQLITE_IOERR_ACCESS:
        return "BE_SQLITE_IOERR_ACCESS";
      case DbResult.BE_SQLITE_IOERR_CHECKRESERVEDLOCK:
        return "BE_SQLITE_IOERR_CHECKRESERVEDLOCK";
      case DbResult.BE_SQLITE_IOERR_LOCK:
        return "BE_SQLITE_IOERR_LOCK";
      case DbResult.BE_SQLITE_IOERR_CLOSE:
        return "BE_SQLITE_IOERR_CLOSE";
      case DbResult.BE_SQLITE_IOERR_DIR_CLOSE:
        return "BE_SQLITE_IOERR_DIR_CLOSE";
      case DbResult.BE_SQLITE_IOERR_SHMOPEN:
        return "BE_SQLITE_IOERR_SHMOPEN";
      case DbResult.BE_SQLITE_IOERR_SHMSIZE:
        return "BE_SQLITE_IOERR_SHMSIZE";
      case DbResult.BE_SQLITE_IOERR_SHMLOCK:
        return "BE_SQLITE_IOERR_SHMLOCK";
      case DbResult.BE_SQLITE_IOERR_SHMMAP:
        return "BE_SQLITE_IOERR_SHMMAP";
      case DbResult.BE_SQLITE_IOERR_SEEK:
        return "BE_SQLITE_IOERR_SEEK";
      case DbResult.BE_SQLITE_IOERR_DELETE_NOENT:
        return "BE_SQLITE_IOERR_DELETE_NOENT";
      case DbResult.BE_SQLITE_ERROR_DataTransformRequired:
        return "Schema update require to transform data";
      case DbResult.BE_SQLITE_ERROR_FileExists:
        return "File Exists";
      case DbResult.BE_SQLITE_ERROR_AlreadyOpen:
        return "Already Open";
      case DbResult.BE_SQLITE_ERROR_NoPropertyTable:
        return "No Property Table";
      case DbResult.BE_SQLITE_ERROR_FileNotFound:
        return "File Not Found";
      case DbResult.BE_SQLITE_ERROR_NoTxnActive:
        return "No Txn Active";
      case DbResult.BE_SQLITE_ERROR_BadDbProfile:
        return "Bad Db Profile";
      case DbResult.BE_SQLITE_ERROR_InvalidProfileVersion:
        return "Invalid Profile Version";
      case DbResult.BE_SQLITE_ERROR_ProfileUpgradeFailed:
        return "Profile Upgrade Failed";
      case DbResult.BE_SQLITE_ERROR_ProfileTooOldForReadWrite:
        return "Profile Too Old For ReadWrite";
      case DbResult.BE_SQLITE_ERROR_ProfileTooOld:
        return "Profile Too Old";
      case DbResult.BE_SQLITE_ERROR_ProfileTooNewForReadWrite:
        return "Profile Too New For ReadWrite";
      case DbResult.BE_SQLITE_ERROR_ProfileTooNew:
        return "Profile Too New";
      case DbResult.BE_SQLITE_ERROR_ChangeTrackError:
        return "ChangeTrack Error";
      case DbResult.BE_SQLITE_ERROR_InvalidChangeSetVersion:
        return "Invalid ChangeSet Version";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRequired:
        return "Schema Upgrade Required";
      case DbResult.BE_SQLITE_ERROR_SchemaTooNew:
        return "Schema Too New";
      case DbResult.BE_SQLITE_ERROR_SchemaTooOld:
        return "Schema Too Old";
      case DbResult.BE_SQLITE_ERROR_SchemaLockFailed:
        return "Schema Lock Failed";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeFailed:
        return "Schema Upgrade Failed";
      case DbResult.BE_SQLITE_ERROR_SchemaImportFailed:
        return "Schema Import Failed";
      case DbResult.BE_SQLITE_ERROR_CouldNotAcquireLocksOrCodes:
        return "Could Not Acquire Locks Or Codes";
      case DbResult.BE_SQLITE_ERROR_SchemaUpgradeRecommended:
        return "Recommended that the schemas found in the database be upgraded";
      case DbResult.BE_SQLITE_LOCKED_SHAREDCACHE:
        return "BE_SQLITE_LOCKED_SHAREDCACHE";
      case DbResult.BE_SQLITE_BUSY_RECOVERY:
        return "BE_SQLITE_BUSY_RECOVERY";
      case DbResult.BE_SQLITE_CANTOPEN_NOTEMPDIR:
        return "SQLite No Temp Dir";
      case DbResult.BE_SQLITE_CANTOPEN_ISDIR:
        return "BE_SQLITE_CANTOPEN_ISDIR";
      case DbResult.BE_SQLITE_CANTOPEN_FULLPATH:
        return "BE_SQLITE_CANTOPEN_FULLPATH";
      case DbResult.BE_SQLITE_CORRUPT_VTAB:
        return "BE_SQLITE_CORRUPT_VTAB";
      case DbResult.BE_SQLITE_READONLY_RECOVERY:
        return "BE_SQLITE_READONLY_RECOVERY";
      case DbResult.BE_SQLITE_READONLY_CANTLOCK:
        return "BE_SQLITE_READONLY_CANTLOCK";
      case DbResult.BE_SQLITE_READONLY_ROLLBACK:
        return "BE_SQLITE_READONLY_ROLLBACK";
      case DbResult.BE_SQLITE_ABORT_ROLLBACK:
        return "BE_SQLITE_ABORT_ROLLBACK";
      case DbResult.BE_SQLITE_CONSTRAINT_CHECK:
        return "BE_SQLITE_CONSTRAINT_CHECK";
      case DbResult.BE_SQLITE_CONSTRAINT_COMMITHOOK:
        return "CommitHook Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_FOREIGNKEY:
        return "Foreign Key Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_FUNCTION:
        return "Function Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_NOTNULL:
        return "NotNull Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_PRIMARYKEY:
        return "Primary Key Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_TRIGGER:
        return "Trigger Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_UNIQUE:
        return "Unique Constraint Error";
      case DbResult.BE_SQLITE_CONSTRAINT_VTAB:
        return "VTable Constraint Error";
      case BentleyStatus.ERROR:
        return "Error";
      case BriefcaseStatus.CannotAcquire:
        return "CannotAcquire";
      case BriefcaseStatus.CannotDownload:
        return "CannotDownload";
      case BriefcaseStatus.CannotCopy:
        return "CannotCopy";
      case BriefcaseStatus.CannotDelete:
        return "CannotDelete";
      case BriefcaseStatus.VersionNotFound:
        return "VersionNotFound";
      case BriefcaseStatus.DownloadCancelled:
        return "DownloadCancelled";
      case BriefcaseStatus.ContainsDeletedChangeSets:
        return "ContainsDeletedChangeSets";
      case RpcInterfaceStatus.IncompatibleVersion:
        return "RpcInterfaceStatus.IncompatibleVersion";
      case ChangeSetStatus.ApplyError:
        return "Error applying a change set";
      case ChangeSetStatus.ChangeTrackingNotEnabled:
        return "Change tracking has not been enabled. The ChangeSet API mandates this";
      case ChangeSetStatus.CorruptedChangeStream:
        return "Contents of the change stream are corrupted and does not match the ChangeSet";
      case ChangeSetStatus.FileNotFound:
        return "File containing the changes was not found";
      case ChangeSetStatus.FileWriteError:
        return "Error writing the contents of the change set to the backing change stream file";
      case ChangeSetStatus.HasLocalChanges:
        return "Cannot perform the operation since the Db has local changes";
      case ChangeSetStatus.HasUncommittedChanges:
        return "Cannot perform the operation since current transaction has uncommitted changes";
      case ChangeSetStatus.InvalidId:
        return "Invalid ChangeSet Id";
      case ChangeSetStatus.InvalidVersion:
        return "Invalid version of the change set";
      case ChangeSetStatus.InDynamicTransaction:
        return "Cannot perform the operation since system is in the middle of a dynamic transaction";
      case ChangeSetStatus.IsCreatingChangeSet:
        return "Cannot perform operation since system is in the middle of a creating a change set";
      case ChangeSetStatus.IsNotCreatingChangeSet:
        return "Cannot perform operation since the system is not creating a change set";
      case ChangeSetStatus.MergePropagationError:
        return "Error propagating the changes after the merge";
      case ChangeSetStatus.NothingToMerge:
        return "No change sets to merge";
      case ChangeSetStatus.NoTransactions:
        return "No transactions are available to create a change set";
      case ChangeSetStatus.ParentMismatch:
        return "Parent change set of the Db does not match the parent id of the change set";
      case ChangeSetStatus.SQLiteError:
        return "Error performing a SQLite operation on the Db";
      case ChangeSetStatus.WrongDgnDb:
        return "ChangeSet originated in a different Db";
      case ChangeSetStatus.CouldNotOpenDgnDb:
        return "Could not open the DgnDb to merge change set";
      case ChangeSetStatus.MergeSchemaChangesOnOpen:
        return "Cannot merge changes in in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
      case ChangeSetStatus.ReverseOrReinstateSchemaChanges:
        return "Cannot reverse or reinstate schema changes.";
      case ChangeSetStatus.ProcessSchemaChangesOnOpen:
        return "Cannot process changes schema changes in an open DgnDb. Close the DgnDb, and process the operation when it is opened";
      case ChangeSetStatus.CannotMergeIntoReadonly:
        return "Cannot merge changes into a Readonly DgnDb";
      case ChangeSetStatus.CannotMergeIntoMaster:
        return "Cannot merge changes into a Master DgnDb";
      case ChangeSetStatus.CannotMergeIntoReversed:
        return "Cannot merge changes into a DgnDb that has reversed change sets";
      case ChangeSetStatus.DownloadCancelled:
        return "ChangeSet(s) download was cancelled.";
      case RepositoryStatus.ServerUnavailable:
        return "ServerUnavailable";
      case RepositoryStatus.LockAlreadyHeld:
        return "LockAlreadyHeld";
      case RepositoryStatus.SyncError:
        return "SyncError";
      case RepositoryStatus.InvalidResponse:
        return "InvalidResponse";
      case RepositoryStatus.PendingTransactions:
        return "PendingTransactions";
      case RepositoryStatus.LockUsed:
        return "LockUsed";
      case RepositoryStatus.CannotCreateChangeSet:
        return "CannotCreateChangeSet";
      case RepositoryStatus.InvalidRequest:
        return "InvalidRequest";
      case RepositoryStatus.ChangeSetRequired:
        return "ChangeSetRequired";
      case RepositoryStatus.CodeUnavailable:
        return "CodeUnavailable";
      case RepositoryStatus.CodeNotReserved:
        return "CodeNotReserved";
      case RepositoryStatus.CodeUsed:
        return "CodeUsed";
      case RepositoryStatus.LockNotHeld:
        return "LockNotHeld";
      case RepositoryStatus.RepositoryIsLocked:
        return "RepositoryIsLocked";
      case RepositoryStatus.ChannelConstraintViolation:
        return "ChannelConstraintViolation";
      case HttpStatus.Info:
        return "HTTP Info";
      case HttpStatus.Redirection:
        return "HTTP Redirection";
      case HttpStatus.ClientError:
        return "HTTP Client error";
      case HttpStatus.ServerError:
        return "HTTP Server error";
      case IModelHubStatus.Unknown:
        return "Unknown error";
      case IModelHubStatus.MissingRequiredProperties:
        return "Missing required properties";
      case IModelHubStatus.InvalidPropertiesValues:
        return "Invalid properties values";
      case IModelHubStatus.UserDoesNotHavePermission:
        return "User does not have permission";
      case IModelHubStatus.UserDoesNotHaveAccess:
        return "User does not have access";
      case IModelHubStatus.InvalidBriefcase:
        return "Invalid briefcase";
      case IModelHubStatus.BriefcaseDoesNotExist:
        return "Briefcase does not exist";
      case IModelHubStatus.BriefcaseDoesNotBelongToUser:
        return "Briefcase does not belong to user";
      case IModelHubStatus.AnotherUserPushing:
        return "Another user pushing";
      case IModelHubStatus.ChangeSetAlreadyExists:
        return "ChangeSet already exists";
      case IModelHubStatus.ChangeSetDoesNotExist:
        return "ChangeSet does not exist";
      case IModelHubStatus.FileIsNotUploaded:
        return "File is not uploaded";
      case IModelHubStatus.iModelIsNotInitialized:
        return "iModel is not initialized";
      case IModelHubStatus.ChangeSetPointsToBadSeed:
        return "ChangeSet points to a bad seed file";
      case IModelHubStatus.OperationFailed:
        return "iModelHub operation has failed";
      case IModelHubStatus.PullIsRequired:
        return "Pull is required";
      case IModelHubStatus.MaximumNumberOfBriefcasesPerUser:
        return "Limit of briefcases per user was reached";
      case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute:
        return "Limit of briefcases per user per minute was reached";
      case IModelHubStatus.DatabaseTemporarilyLocked:
        return "Database is temporarily locked";
      case IModelHubStatus.iModelIsLocked:
        return "iModel is locked";
      case IModelHubStatus.CodesExist:
        return "Code already exists";
      case IModelHubStatus.LocksExist:
        return "Lock already exists";
      case IModelHubStatus.iModelAlreadyExists:
        return "iModel already exists";
      case IModelHubStatus.iModelDoesNotExist:
        return "iModel does not exist";
      case IModelHubStatus.LockDoesNotExist:
        return "Lock does not exist";
      case IModelHubStatus.LockChunkDoesNotExist:
        return "Lock chunk does not exist";
      case IModelHubStatus.LockOwnedByAnotherBriefcase:
        return "Lock is owned by another briefcase";
      case IModelHubStatus.CodeStateInvalid:
        return "Code state is invalid";
      case IModelHubStatus.CodeReservedByAnotherBriefcase:
        return "Code is reserved by another briefcase";
      case IModelHubStatus.CodeDoesNotExist:
        return "Code does not exist";
      case IModelHubStatus.FileDoesNotExist:
        return "File does not exist";
      case IModelHubStatus.FileAlreadyExists:
        return "File already exists";
      case IModelHubStatus.EventTypeDoesNotExist:
        return "Event type does not exist";
      case IModelHubStatus.EventSubscriptionDoesNotExist:
        return "Event subscription does not exist";
      case IModelHubStatus.EventSubscriptionAlreadyExists:
        return "Event subscription already exists";
      case IModelHubStatus.ITwinIdIsNotSpecified:
        return "ITwin Id is not specified";
      case IModelHubStatus.FailedToGetITwinPermissions:
        return "Failed to get iTwin permissions";
      case IModelHubStatus.FailedToGetITwinMembers:
        return "Failed to get iTwin members";
      case IModelHubStatus.FailedToGetAssetPermissions:
        return "Failed to get asset permissions";
      case IModelHubStatus.FailedToGetAssetMembers:
        return "Failed to get asset members";
      case IModelHubStatus.ChangeSetAlreadyHasVersion:
        return "ChangeSet already has version";
      case IModelHubStatus.VersionAlreadyExists:
        return "Version already exists";
      case IModelHubStatus.JobSchedulingFailed:
        return "Failed to schedule a background job";
      case IModelHubStatus.ConflictsAggregate:
        return "Codes or locks are owned by another briefcase";
      case IModelHubStatus.FailedToGetITwinById:
        return "Failed to query iTwin by its id";
      case IModelHubStatus.DatabaseOperationFailed:
        return "Database operation has failed";
      case IModelHubStatus.ITwinDoesNotExist:
        return "ITwin does not exist";
      case IModelHubStatus.UndefinedArgumentError:
        return "Undefined argument";
      case IModelHubStatus.InvalidArgumentError:
        return "Invalid argument";
      case IModelHubStatus.MissingDownloadUrlError:
        return "Missing download url";
      case IModelHubStatus.NotSupportedInBrowser:
        return "Not supported in browser";
      case IModelHubStatus.FileHandlerNotSet:
        return "File handler is not set";
      case IModelHubStatus.FileNotFound:
        return "File not found";
      case GeoServiceStatus.NoGeoLocation:
        return "No GeoLocation";
      case GeoServiceStatus.OutOfUsefulRange:
        return "Out of useful range";
      case GeoServiceStatus.OutOfMathematicalDomain:
        return "Out of mathematical domain";
      case GeoServiceStatus.NoDatumConverter:
        return "No datum converter";
      case GeoServiceStatus.VerticalDatumConvertError:
        return "Vertical datum convert error";
      case GeoServiceStatus.CSMapError:
        return "CSMap error";
      case GeoServiceStatus.Pending:
        return "Pending";
      case RealityDataStatus.InvalidData:
        return "Invalid or unknown data";
      case IModelStatus.Success:
      case DbResult.BE_SQLITE_OK:
      case DbResult.BE_SQLITE_ROW:
      case DbResult.BE_SQLITE_DONE:
      case BentleyStatus.SUCCESS:
        return "Success";
      default:
        return `Error (${this.errorNumber})`;
    }
  }
  /** Use run-time type checking to safely get a useful string summary of an unknown error value, or `""` if none exists.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
   * @public
   */
  static getErrorMessage(error) {
    if (typeof error === "string")
      return error;
    if (error instanceof Error)
      return error.toString();
    if (isObject(error)) {
      if (typeof error.message === "string")
        return error.message;
      if (typeof error.msg === "string")
        return error.msg;
      if (error.toString() !== "[object Object]")
        return error.toString();
    }
    return "";
  }
  /** Use run-time type checking to safely get the call stack of an unknown error value, if possible.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof Error`
   * @public
   */
  static getErrorStack(error) {
    if (isObject(error) && typeof error.stack === "string")
      return error.stack;
    return void 0;
  }
  /** Use run-time type checking to safely get the metadata with an unknown error value, if possible.
   * @note It's recommended to use this function in `catch` clauses, where a caught value cannot be assumed to be `instanceof BentleyError`
   * @see [[BentleyError.getMetaData]]
   * @public
   */
  static getErrorMetadata(error) {
    if (isObject(error) && typeof error.getMetaData === "function") {
      const metadata = error.getMetaData();
      if (typeof metadata === "object" && metadata !== null)
        return metadata;
    }
    return void 0;
  }
  /** Returns a new `ErrorProps` object representing an unknown error value.  Useful for logging or wrapping/re-throwing caught errors.
   * @note Unlike `Error` objects (which lose messages and call stacks when serialized to JSON), objects
   *       returned by this are plain old JavaScript objects, and can be easily logged/serialized to JSON.
   * @public
   */
  static getErrorProps(error) {
    const serialized = {
      message: BentleyError.getErrorMessage(error)
    };
    const stack = BentleyError.getErrorStack(error);
    if (stack)
      serialized.stack = stack;
    const metadata = BentleyError.getErrorMetadata(error);
    if (metadata)
      serialized.metadata = metadata;
    return serialized;
  }
}
var BentleyLoggerCategory;
(function(BentleyLoggerCategory2) {
  BentleyLoggerCategory2["Performance"] = "Performance";
})(BentleyLoggerCategory || (BentleyLoggerCategory = {}));
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["Trace"] = 0] = "Trace";
  LogLevel2[LogLevel2["Info"] = 1] = "Info";
  LogLevel2[LogLevel2["Warning"] = 2] = "Warning";
  LogLevel2[LogLevel2["Error"] = 3] = "Error";
  LogLevel2[LogLevel2["None"] = 4] = "None";
})(LogLevel || (LogLevel = {}));
class Logger {
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
    for (const meta2 of Logger.staticMetaData) {
      const val = BentleyError.getMetaData(meta2[1]);
      if (val)
        Object.assign(metaObj, val);
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
    var _a2;
    this._minLevel = minLevel;
    (_a2 = this.logLevelChangedFn) == null ? void 0 : _a2.call(this);
  }
  /** Set the minimum logging level for the specified category. The minimum level is least severe level at which messages in the
   * specified category should be displayed.
   */
  static setLevel(category, minLevel) {
    var _a2;
    Logger._categoryFilter.set(category, minLevel);
    (_a2 = this.logLevelChangedFn) == null ? void 0 : _a2.call(this);
  }
  /** Interpret a string as the name of a LogLevel */
  static parseLogLevel(str) {
    switch (str.toUpperCase()) {
      case "EXCEPTION":
        return LogLevel.Error;
      case "FATAL":
        return LogLevel.Error;
      case "ERROR":
        return LogLevel.Error;
      case "WARNING":
        return LogLevel.Warning;
      case "INFO":
        return LogLevel.Info;
      case "TRACE":
        return LogLevel.Trace;
      case "DEBUG":
        return LogLevel.Trace;
    }
    return LogLevel.None;
  }
  /** Set the log level for multiple categories at once. Also see [[validateProps]] */
  static configureLevels(cfg) {
    Logger.validateProps(cfg);
    if (cfg.defaultLevel !== void 0) {
      this.setLevelDefault(Logger.parseLogLevel(cfg.defaultLevel));
    }
    if (cfg.categoryLevels !== void 0) {
      for (const cl of cfg.categoryLevels) {
        this.setLevel(cl.category, Logger.parseLogLevel(cl.logLevel));
      }
    }
  }
  static isLogLevel(v) {
    return LogLevel.hasOwnProperty(v);
  }
  /** Check that the specified object is a valid LoggerLevelsConfig. This is useful when reading a config from a .json file. */
  static validateProps(config2) {
    const validProps = ["defaultLevel", "categoryLevels"];
    for (const prop of Object.keys(config2)) {
      if (!validProps.includes(prop))
        throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig - unrecognized property: ${prop}`);
      if (prop === "defaultLevel") {
        if (!Logger.isLogLevel(config2.defaultLevel))
          throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.defaultLevel must be a LogLevel. Invalid value: ${JSON.stringify(config2.defaultLevel)}`);
      } else if (prop === "categoryLevels") {
        const value = config2[prop];
        if (!Array.isArray(value))
          throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels must be an array. Invalid value: ${JSON.stringify(value)}`);
        for (const item of config2[prop]) {
          if (!item.hasOwnProperty("category") || !item.hasOwnProperty("logLevel"))
            throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item must be a LoggerCategoryAndLevel {category: logLevel:}. Invalid value: ${JSON.stringify(item)}`);
          if (!Logger.isLogLevel(item.logLevel))
            throw new BentleyError(IModelStatus.BadArg, `LoggerLevelsConfig.categoryLevels - each item's logLevel property must be a LogLevel. Invalid value: ${JSON.stringify(item.logLevel)}`);
        }
      }
    }
  }
  /** Get the minimum logging level for the specified category. */
  static getLevel(category) {
    const minLevelForThisCategory = Logger._categoryFilter.get(category);
    if (minLevelForThisCategory !== void 0)
      return minLevelForThisCategory;
    const parent = category.lastIndexOf(".");
    if (parent !== -1)
      return Logger.getLevel(category.slice(0, parent));
    return Logger._minLevel;
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
    Logger._categoryFilter.clear();
  }
  /** Check if messages in the specified category should be displayed at this level of severity. */
  static isEnabled(category, level) {
    const minLevel = Logger.getLevel(category);
    return minLevel !== void 0 && level >= minLevel;
  }
  /** Log the specified message to the **error** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logError(category, message, metaData) {
    if (Logger._logError && Logger.isEnabled(category, LogLevel.Error))
      Logger._logError(category, message, metaData);
  }
  static getExceptionMessage(err) {
    const stack = Logger.logExceptionCallstacks ? `
${BentleyError.getErrorStack(err)}` : "";
    return BentleyError.getErrorMessage(err) + stack;
  }
  /** Log the specified exception. The special "ExceptionType" property will be added as metadata.
   * @param category  The category of the message.
   * @param err  The exception object.
   * @param log The logger output function to use - defaults to Logger.logError
   */
  static logException(category, err, log = (_category, message, metaData) => Logger.logError(_category, message, metaData)) {
    log(category, Logger.getExceptionMessage(err), () => {
      return { ...BentleyError.getErrorMetadata(err), exceptionType: err.constructor.name };
    });
  }
  /** Log the specified message to the **warning** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logWarning(category, message, metaData) {
    if (Logger._logWarning && Logger.isEnabled(category, LogLevel.Warning))
      Logger._logWarning(category, message, metaData);
  }
  /** Log the specified message to the **info** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logInfo(category, message, metaData) {
    if (Logger._logInfo && Logger.isEnabled(category, LogLevel.Info))
      Logger._logInfo(category, message, metaData);
  }
  /** Log the specified message to the **trace** stream.
   * @param category  The category of the message.
   * @param message  The message.
   * @param metaData  Optional data for the message
   */
  static logTrace(category, message, metaData) {
    if (Logger._logTrace && Logger.isEnabled(category, LogLevel.Trace))
      Logger._logTrace(category, message, metaData);
  }
}
Logger._categoryFilter = /* @__PURE__ */ new Map();
Logger._minLevel = void 0;
Logger.logExceptionCallstacks = false;
Logger.staticMetaData = /* @__PURE__ */ new Map();
LogLevel.Info;
var _a;
class UnexpectedErrors {
  constructor() {
  }
  // this is a singleton
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
    if (notifyTelemetry) {
      this._telemetry.forEach((telemetry) => {
        try {
          telemetry(error);
        } catch (_) {
        }
      });
    }
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
}
_a = UnexpectedErrors;
UnexpectedErrors.reThrowImmediate = (e) => {
  throw e;
};
UnexpectedErrors.reThrowDeferred = (e) => setTimeout(() => {
  throw e;
}, 0);
UnexpectedErrors.consoleLog = (e) => console.error(e);
UnexpectedErrors.errorLog = (e) => Logger.logException("unhandled", e);
UnexpectedErrors._telemetry = [];
UnexpectedErrors._handler = _a.errorLog;
class BeEvent {
  constructor() {
    this._listeners = [];
    this._insideRaiseEvent = false;
  }
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
    this._listeners.push({ listener, scope, once: false });
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
    this._listeners.push({ listener, scope, once: true });
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
        if (this._insideRaiseEvent) {
          context.listener = void 0;
        } else {
          listeners.splice(i, 1);
        }
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
      if (!context.listener) {
        dropped = true;
      } else {
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
    if (dropped)
      this._listeners = this._listeners.filter((ctx) => ctx.listener !== void 0);
    this._insideRaiseEvent = false;
  }
  /** Determine whether this BeEvent has a specified listener registered.
   * @param listener The listener to check.
   * @param scope optional scope argument to match call to addListener
   */
  has(listener, scope) {
    for (const ctx of this._listeners) {
      if (ctx.listener === listener && ctx.scope === scope) {
        return true;
      }
    }
    return false;
  }
  /** Clear all Listeners from this BeEvent. */
  clear() {
    this._listeners.length = 0;
  }
}
class BeUiEvent extends BeEvent {
  /** Raises event with single strongly typed argument. */
  emit(args) {
    this.raiseEvent(args);
  }
}
class StatusCategory {
  static for(error) {
    for (const handler of this.handlers) {
      const category = handler(error);
      if (category) {
        return category;
      }
    }
    return lookupCategory(error);
  }
}
StatusCategory.handlers = /* @__PURE__ */ new Set();
class SuccessCategory extends StatusCategory {
  constructor() {
    super(...arguments);
    this.error = false;
  }
}
class ErrorCategory extends StatusCategory {
  constructor() {
    super(...arguments);
    this.error = true;
  }
}
var HTTP;
(function(HTTP2) {
  class OK extends SuccessCategory {
    constructor() {
      super(...arguments);
      this.name = "OK";
      this.code = 200;
    }
  }
  HTTP2.OK = OK;
  class Accepted extends SuccessCategory {
    constructor() {
      super(...arguments);
      this.name = "Accepted";
      this.code = 202;
    }
  }
  HTTP2.Accepted = Accepted;
  class NoContent2 extends SuccessCategory {
    constructor() {
      super(...arguments);
      this.name = "NoContent";
      this.code = 204;
    }
  }
  HTTP2.NoContent = NoContent2;
  class BadRequest2 extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "BadRequest";
      this.code = 400;
    }
  }
  HTTP2.BadRequest = BadRequest2;
  class Unauthorized extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "Unauthorized";
      this.code = 401;
    }
  }
  HTTP2.Unauthorized = Unauthorized;
  class Forbidden2 extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "Forbidden";
      this.code = 403;
    }
  }
  HTTP2.Forbidden = Forbidden2;
  class NotFound2 extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "NotFound";
      this.code = 404;
    }
  }
  HTTP2.NotFound = NotFound2;
  class RequestTimeout extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "RequestTimeout";
      this.code = 408;
    }
  }
  HTTP2.RequestTimeout = RequestTimeout;
  class Conflict2 extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "Conflict";
      this.code = 409;
    }
  }
  HTTP2.Conflict = Conflict2;
  class Gone extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "Gone";
      this.code = 410;
    }
  }
  HTTP2.Gone = Gone;
  class PreconditionFailed extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "PreconditionFailed";
      this.code = 412;
    }
  }
  HTTP2.PreconditionFailed = PreconditionFailed;
  class ExpectationFailed extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "ExpectationFailed";
      this.code = 417;
    }
  }
  HTTP2.ExpectationFailed = ExpectationFailed;
  class MisdirectedRequest extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "MisdirectedRequest";
      this.code = 421;
    }
  }
  HTTP2.MisdirectedRequest = MisdirectedRequest;
  class UnprocessableEntity extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "UnprocessableEntity";
      this.code = 422;
    }
  }
  HTTP2.UnprocessableEntity = UnprocessableEntity;
  class UpgradeRequired extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "UpgradeRequired";
      this.code = 426;
    }
  }
  HTTP2.UpgradeRequired = UpgradeRequired;
  class PreconditionRequired extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "PreconditionRequired";
      this.code = 428;
    }
  }
  HTTP2.PreconditionRequired = PreconditionRequired;
  class TooManyRequests extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "TooManyRequests";
      this.code = 429;
    }
  }
  HTTP2.TooManyRequests = TooManyRequests;
  class InternalServerError extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "InternalServerError";
      this.code = 500;
    }
  }
  HTTP2.InternalServerError = InternalServerError;
  class NotImplemented2 extends ErrorCategory {
    constructor() {
      super(...arguments);
      this.name = "NotImplemented";
      this.code = 501;
    }
  }
  HTTP2.NotImplemented = NotImplemented2;
})(HTTP || (HTTP = {}));
class Success extends HTTP.OK {
}
class Pending extends HTTP.Accepted {
}
class NoContent extends HTTP.NoContent {
}
class NothingToDo extends HTTP.NoContent {
}
class BadRequest extends HTTP.BadRequest {
}
class Forbidden extends HTTP.Forbidden {
}
class PermissionsViolation extends HTTP.Forbidden {
}
class ReadOnly extends HTTP.Forbidden {
}
class NotFound extends HTTP.NotFound {
}
class NotEnabled extends HTTP.UnprocessableEntity {
}
class NotSupported extends HTTP.UnprocessableEntity {
}
class ValidationError extends HTTP.BadRequest {
}
class Timeout extends HTTP.RequestTimeout {
}
class Conflict extends HTTP.Conflict {
}
class Cancelled extends HTTP.Gone {
}
class ConstraintViolation extends HTTP.Forbidden {
}
class VersioningViolation extends HTTP.Forbidden {
}
class Corruption extends HTTP.InternalServerError {
}
class InvalidData extends HTTP.InternalServerError {
}
class OperationFailed extends HTTP.InternalServerError {
}
class StateViolation extends HTTP.InternalServerError {
}
class Locked extends HTTP.Conflict {
}
class NetworkError extends HTTP.InternalServerError {
}
class Throttled extends HTTP.TooManyRequests {
}
class FileSystemError extends HTTP.InternalServerError {
}
class InternalError extends HTTP.InternalServerError {
}
class UnknownError extends HTTP.InternalServerError {
}
class NotImplemented extends HTTP.NotImplemented {
}
function lookupCategory(error) {
  switch (error.errorNumber) {
    case BentleyStatus.SUCCESS:
      return new Success();
    case BentleyStatus.ERROR:
      return new UnknownError();
    case IModelStatus.Success:
      return new Success();
    case IModelStatus.AlreadyLoaded:
      return new StateViolation();
    case IModelStatus.AlreadyOpen:
      return new StateViolation();
    case IModelStatus.BadArg:
      return new ValidationError();
    case IModelStatus.BadElement:
      return new ValidationError();
    case IModelStatus.BadModel:
      return new ValidationError();
    case IModelStatus.BadRequest:
      return new BadRequest();
    case IModelStatus.BadSchema:
      return new ValidationError();
    case IModelStatus.CannotUndo:
      return new OperationFailed();
    case IModelStatus.CodeNotReserved:
      return new StateViolation();
    case IModelStatus.DeletionProhibited:
      return new Forbidden();
    case IModelStatus.DuplicateCode:
      return new Conflict();
    case IModelStatus.DuplicateName:
      return new Conflict();
    case IModelStatus.ElementBlockedChange:
      return new ConstraintViolation();
    case IModelStatus.FileAlreadyExists:
      return new Conflict();
    case IModelStatus.FileNotFound:
      return new NotFound();
    case IModelStatus.FileNotLoaded:
      return new FileSystemError();
    case IModelStatus.ForeignKeyConstraint:
      return new ConstraintViolation();
    case IModelStatus.IdExists:
      return new Conflict();
    case IModelStatus.InDynamicTransaction:
      return new StateViolation();
    case IModelStatus.InvalidCategory:
      return new ValidationError();
    case IModelStatus.InvalidCode:
      return new ValidationError();
    case IModelStatus.InvalidCodeSpec:
      return new ValidationError();
    case IModelStatus.InvalidId:
      return new ValidationError();
    case IModelStatus.InvalidName:
      return new ValidationError();
    case IModelStatus.InvalidParent:
      return new Conflict();
    case IModelStatus.InvalidProfileVersion:
      return new InvalidData();
    case IModelStatus.IsCreatingChangeSet:
      return new StateViolation();
    case IModelStatus.LockNotHeld:
      return new Forbidden();
    case IModelStatus.Mismatch2d3d:
      return new ValidationError();
    case IModelStatus.MismatchGcs:
      return new ValidationError();
    case IModelStatus.MissingDomain:
      return new ValidationError();
    case IModelStatus.MissingHandler:
      return new ValidationError();
    case IModelStatus.MissingId:
      return new ValidationError();
    case IModelStatus.NoGeometry:
      return new NoContent();
    case IModelStatus.NoMultiTxnOperation:
      return new StateViolation();
    case IModelStatus.NotEnabled:
      return new NotEnabled();
    case IModelStatus.NotFound:
      return new NotFound();
    case IModelStatus.NotOpen:
      return new StateViolation();
    case IModelStatus.NotOpenForWrite:
      return new Forbidden();
    case IModelStatus.NotSameUnitBase:
      return new ValidationError();
    case IModelStatus.NothingToRedo:
      return new NothingToDo();
    case IModelStatus.NothingToUndo:
      return new NothingToDo();
    case IModelStatus.ParentBlockedChange:
      return new Forbidden();
    case IModelStatus.ReadError:
      return new FileSystemError();
    case IModelStatus.ReadOnly:
      return new ReadOnly();
    case IModelStatus.ReadOnlyDomain:
      return new ReadOnly();
    case IModelStatus.RepositoryManagerError:
      return new NetworkError();
    case IModelStatus.SQLiteError:
      return new InternalError();
    case IModelStatus.TransactionActive:
      return new StateViolation();
    case IModelStatus.UnitsMissing:
      return new ValidationError();
    case IModelStatus.UnknownFormat:
      return new InvalidData();
    case IModelStatus.UpgradeFailed:
      return new OperationFailed();
    case IModelStatus.ValidationFailed:
      return new ValidationError();
    case IModelStatus.VersionTooNew:
      return new VersioningViolation();
    case IModelStatus.VersionTooOld:
      return new VersioningViolation();
    case IModelStatus.ViewNotFound:
      return new NotFound();
    case IModelStatus.WriteError:
      return new FileSystemError();
    case IModelStatus.WrongClass:
      return new ValidationError();
    case IModelStatus.WrongIModel:
      return new ValidationError();
    case IModelStatus.WrongDomain:
      return new ValidationError();
    case IModelStatus.WrongElement:
      return new ValidationError();
    case IModelStatus.WrongHandler:
      return new ValidationError();
    case IModelStatus.WrongModel:
      return new ValidationError();
    case IModelStatus.ConstraintNotUnique:
      return new ConstraintViolation();
    case IModelStatus.NoGeoLocation:
      return new ValidationError();
    case IModelStatus.ServerTimeout:
      return new Timeout();
    case IModelStatus.NoContent:
      return new NoContent();
    case IModelStatus.NotRegistered:
      return new NotImplemented();
    case IModelStatus.FunctionNotFound:
      return new NotImplemented();
    case IModelStatus.NoActiveCommand:
      return new StateViolation();
    case BriefcaseStatus.CannotAcquire:
      return new OperationFailed();
    case BriefcaseStatus.CannotDownload:
      return new OperationFailed();
    case BriefcaseStatus.CannotUpload:
      return new OperationFailed();
    case BriefcaseStatus.CannotCopy:
      return new OperationFailed();
    case BriefcaseStatus.CannotDelete:
      return new OperationFailed();
    case BriefcaseStatus.VersionNotFound:
      return new NotFound();
    case BriefcaseStatus.CannotApplyChanges:
      return new OperationFailed();
    case BriefcaseStatus.DownloadCancelled:
      return new Cancelled();
    case BriefcaseStatus.ContainsDeletedChangeSets:
      return new ValidationError();
    case RpcInterfaceStatus.Success:
      return new Success();
    case RpcInterfaceStatus.IncompatibleVersion:
      return new VersioningViolation();
    case ChangeSetStatus.Success:
      return new Success();
    case ChangeSetStatus.ApplyError:
      return new OperationFailed();
    case ChangeSetStatus.ChangeTrackingNotEnabled:
      return new NotEnabled();
    case ChangeSetStatus.CorruptedChangeStream:
      return new Corruption();
    case ChangeSetStatus.FileNotFound:
      return new NotFound();
    case ChangeSetStatus.FileWriteError:
      return new FileSystemError();
    case ChangeSetStatus.HasLocalChanges:
      return new StateViolation();
    case ChangeSetStatus.HasUncommittedChanges:
      return new StateViolation();
    case ChangeSetStatus.InvalidId:
      return new Corruption();
    case ChangeSetStatus.InvalidVersion:
      return new Corruption();
    case ChangeSetStatus.InDynamicTransaction:
      return new StateViolation();
    case ChangeSetStatus.IsCreatingChangeSet:
      return new StateViolation();
    case ChangeSetStatus.IsNotCreatingChangeSet:
      return new StateViolation();
    case ChangeSetStatus.MergePropagationError:
      return new OperationFailed();
    case ChangeSetStatus.NothingToMerge:
      return new NothingToDo();
    case ChangeSetStatus.NoTransactions:
      return new OperationFailed();
    case ChangeSetStatus.ParentMismatch:
      return new ValidationError();
    case ChangeSetStatus.SQLiteError:
      return new InternalError();
    case ChangeSetStatus.WrongDgnDb:
      return new ValidationError();
    case ChangeSetStatus.CouldNotOpenDgnDb:
      return new OperationFailed();
    case ChangeSetStatus.MergeSchemaChangesOnOpen:
      return new BadRequest();
    case ChangeSetStatus.ReverseOrReinstateSchemaChanges:
      return new Conflict();
    case ChangeSetStatus.ProcessSchemaChangesOnOpen:
      return new BadRequest();
    case ChangeSetStatus.CannotMergeIntoReadonly:
      return new ValidationError();
    case ChangeSetStatus.CannotMergeIntoMaster:
      return new ValidationError();
    case ChangeSetStatus.CannotMergeIntoReversed:
      return new ValidationError();
    case RepositoryStatus.Success:
      return new Success();
    case RepositoryStatus.ServerUnavailable:
      return new NetworkError();
    case RepositoryStatus.LockAlreadyHeld:
      return new Conflict();
    case RepositoryStatus.SyncError:
      return new NetworkError();
    case RepositoryStatus.InvalidResponse:
      return new NetworkError();
    case RepositoryStatus.PendingTransactions:
      return new StateViolation();
    case RepositoryStatus.LockUsed:
      return new StateViolation();
    case RepositoryStatus.CannotCreateChangeSet:
      return new InternalError();
    case RepositoryStatus.InvalidRequest:
      return new NetworkError();
    case RepositoryStatus.ChangeSetRequired:
      return new StateViolation();
    case RepositoryStatus.CodeUnavailable:
      return new Conflict();
    case RepositoryStatus.CodeNotReserved:
      return new StateViolation();
    case RepositoryStatus.CodeUsed:
      return new StateViolation();
    case RepositoryStatus.LockNotHeld:
      return new Forbidden();
    case RepositoryStatus.RepositoryIsLocked:
      return new Locked();
    case RepositoryStatus.ChannelConstraintViolation:
      return new ConstraintViolation();
    case HttpStatus.Success:
      return new Success();
    case IModelHubStatus.Success:
      return new Success();
    case IModelHubStatus.Unknown:
      return new UnknownError();
    case IModelHubStatus.MissingRequiredProperties:
      return new ValidationError();
    case IModelHubStatus.InvalidPropertiesValues:
      return new ValidationError();
    case IModelHubStatus.UserDoesNotHavePermission:
      return new PermissionsViolation();
    case IModelHubStatus.UserDoesNotHaveAccess:
      return new PermissionsViolation();
    case IModelHubStatus.InvalidBriefcase:
      return new ValidationError();
    case IModelHubStatus.BriefcaseDoesNotExist:
      return new NotFound();
    case IModelHubStatus.BriefcaseDoesNotBelongToUser:
      return new PermissionsViolation();
    case IModelHubStatus.AnotherUserPushing:
      return new StateViolation();
    case IModelHubStatus.ChangeSetAlreadyExists:
      return new Conflict();
    case IModelHubStatus.ChangeSetDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileIsNotUploaded:
      return new StateViolation();
    case IModelHubStatus.iModelIsNotInitialized:
      return new StateViolation();
    case IModelHubStatus.ChangeSetPointsToBadSeed:
      return new InvalidData();
    case IModelHubStatus.OperationFailed:
      return new OperationFailed();
    case IModelHubStatus.PullIsRequired:
      return new StateViolation();
    case IModelHubStatus.MaximumNumberOfBriefcasesPerUser:
      return new Throttled();
    case IModelHubStatus.MaximumNumberOfBriefcasesPerUserPerMinute:
      return new Throttled();
    case IModelHubStatus.DatabaseTemporarilyLocked:
      return new Locked();
    case IModelHubStatus.iModelIsLocked:
      return new Locked();
    case IModelHubStatus.CodesExist:
      return new Conflict();
    case IModelHubStatus.LocksExist:
      return new Conflict();
    case IModelHubStatus.iModelAlreadyExists:
      return new Conflict();
    case IModelHubStatus.iModelDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileDoesNotExist:
      return new NotFound();
    case IModelHubStatus.FileAlreadyExists:
      return new Conflict();
    case IModelHubStatus.LockDoesNotExist:
      return new NotFound();
    case IModelHubStatus.LockOwnedByAnotherBriefcase:
      return new Conflict();
    case IModelHubStatus.CodeStateInvalid:
      return new StateViolation();
    case IModelHubStatus.CodeReservedByAnotherBriefcase:
      return new Conflict();
    case IModelHubStatus.CodeDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventTypeDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventSubscriptionDoesNotExist:
      return new NotFound();
    case IModelHubStatus.EventSubscriptionAlreadyExists:
      return new StateViolation();
    case IModelHubStatus.ITwinIdIsNotSpecified:
      return new ValidationError();
    case IModelHubStatus.FailedToGetITwinPermissions:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetITwinMembers:
      return new OperationFailed();
    case IModelHubStatus.ChangeSetAlreadyHasVersion:
      return new Conflict();
    case IModelHubStatus.VersionAlreadyExists:
      return new Conflict();
    case IModelHubStatus.JobSchedulingFailed:
      return new InternalError();
    case IModelHubStatus.ConflictsAggregate:
      return new Conflict();
    case IModelHubStatus.FailedToGetITwinById:
      return new OperationFailed();
    case IModelHubStatus.DatabaseOperationFailed:
      return new OperationFailed();
    case IModelHubStatus.SeedFileInitializationFailed:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetAssetPermissions:
      return new OperationFailed();
    case IModelHubStatus.FailedToGetAssetMembers:
      return new OperationFailed();
    case IModelHubStatus.ITwinDoesNotExist:
      return new NotFound();
    case IModelHubStatus.LockChunkDoesNotExist:
      return new NotFound();
    case IModelHubStatus.CheckpointAlreadyExists:
      return new Conflict();
    case IModelHubStatus.CheckpointDoesNotExist:
      return new NotFound();
    case IModelHubStatus.UndefinedArgumentError:
      return new ValidationError();
    case IModelHubStatus.InvalidArgumentError:
      return new ValidationError();
    case IModelHubStatus.MissingDownloadUrlError:
      return new ValidationError();
    case IModelHubStatus.NotSupportedInBrowser:
      return new NotSupported();
    case IModelHubStatus.FileHandlerNotSet:
      return new NotImplemented();
    case IModelHubStatus.FileNotFound:
      return new NotFound();
    case IModelHubStatus.InitializationTimeout:
      return new Timeout();
    case GeoServiceStatus.Success:
      return new Success();
    case GeoServiceStatus.NoGeoLocation:
      return new ValidationError();
    case GeoServiceStatus.OutOfUsefulRange:
      return new ValidationError();
    case GeoServiceStatus.OutOfMathematicalDomain:
      return new ValidationError();
    case GeoServiceStatus.NoDatumConverter:
      return new OperationFailed();
    case GeoServiceStatus.VerticalDatumConvertError:
      return new OperationFailed();
    case GeoServiceStatus.CSMapError:
      return new InternalError();
    case GeoServiceStatus.Pending:
      return new Pending();
    case RealityDataStatus.Success:
      return new Success();
    case RealityDataStatus.InvalidData:
      return new InvalidData();
    default:
      return new UnknownError();
  }
}
function toHex(str) {
  const v = parseInt(str, 16);
  return Number.isNaN(v) ? 0 : v;
}
function isLowerCaseNonZeroHexDigit(str, index2) {
  return isLowerCaseHexDigit(str, index2, false);
}
function isLowerCaseHexDigit(str, index2, allowZero = true) {
  const charCode = str.charCodeAt(index2);
  const minDecimalDigit = allowZero ? 48 : 49;
  return charCode >= minDecimalDigit && charCode <= 57 || charCode >= 97 && charCode <= 102;
}
function isValidHexString(id, startIndex, len) {
  if (len === 0)
    return false;
  if (!isLowerCaseNonZeroHexDigit(id, startIndex))
    return false;
  for (let i = 1; i < len; i++)
    if (!isLowerCaseHexDigit(id, startIndex + i))
      return false;
  return true;
}
var Id64;
(function(Id642) {
  function getLocalId(id) {
    if (isInvalid(id))
      return 0;
    const len = id.length;
    const start = len > 12 ? len - 10 : 2;
    return toHex(id.slice(start));
  }
  Id642.getLocalId = getLocalId;
  function getBriefcaseId(id) {
    if (isInvalid(id))
      return 0;
    const len = id.length;
    return len <= 12 ? 0 : toHex(id.slice(2, len - 10));
  }
  Id642.getBriefcaseId = getBriefcaseId;
  function fromJSON(prop) {
    return typeof prop === "string" ? Id642.fromString(prop) : Id642.invalid;
  }
  Id642.fromJSON = fromJSON;
  function fromString(val) {
    if (typeof val !== "string")
      return Id642.invalid;
    if (Id642.isId64(val))
      return val;
    val = val.toLowerCase().trim();
    const len = val.length;
    if (len < 2 || val[0] !== "0" || val[1] !== "x")
      return Id642.invalid;
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
  Id642.fromString = fromString;
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
  function fromLocalAndBriefcaseIds(localId, briefcaseId) {
    if (typeof localId !== "number" || typeof briefcaseId !== "number")
      return Id642.invalid;
    localId = Math.floor(localId);
    if (0 === localId)
      return Id642.invalid;
    briefcaseId = Math.floor(briefcaseId);
    const lowStr = localId.toString(16);
    return `0x${briefcaseId === 0 ? lowStr : briefcaseId.toString(16) + (_localIdPrefixByLocalIdLength[lowStr.length] + lowStr)}`;
  }
  Id642.fromLocalAndBriefcaseIds = fromLocalAndBriefcaseIds;
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
      const uint4 = charCodeToUint4(id.charCodeAt(i));
      const shift2 = end - i - 1 << 2;
      const mask = uint4 << shift2;
      uint32 = (uint32 | mask) >>> 0;
    }
    return uint32;
  }
  function fromUint32Pair(lowBytes, highBytes) {
    const localIdLow = lowBytes >>> 0;
    const localIdHigh = (highBytes & 255) * (4294967295 + 1);
    const localId = localIdLow + localIdHigh;
    if (0 === localId)
      return Id642.invalid;
    const buffer = scratchCharCodes;
    let index2 = 2;
    for (let i = 7; i >= 0; i--) {
      const shift2 = i << 2;
      const mask = 15 << shift2;
      const uint4 = (highBytes & mask) >>> shift2;
      if (index2 > 2 || 0 !== uint4)
        buffer[index2++] = uint4ToCharCode(uint4);
    }
    for (let i = 7; i >= 0; i--) {
      const shift2 = i << 2;
      const mask = 15 << shift2;
      const uint4 = (lowBytes & mask) >>> shift2;
      if (index2 > 2 || 0 !== uint4)
        buffer[index2++] = uint4ToCharCode(uint4);
    }
    if (buffer.length !== index2)
      buffer.length = index2;
    return String.fromCharCode(...scratchCharCodes);
  }
  Id642.fromUint32Pair = fromUint32Pair;
  function fromUint32PairObject(pair) {
    return fromUint32Pair(pair.lower, pair.upper);
  }
  Id642.fromUint32PairObject = fromUint32PairObject;
  function isValidUint32Pair(lowBytes, highBytes) {
    return 0 !== lowBytes || 0 !== (highBytes & 255);
  }
  Id642.isValidUint32Pair = isValidUint32Pair;
  function getUint32Pair(id, out) {
    if (!out)
      out = { lower: 0, upper: 0 };
    out.lower = getLowerUint32(id);
    out.upper = getUpperUint32(id);
    return out;
  }
  Id642.getUint32Pair = getUint32Pair;
  function getLowerUint32(id) {
    if (isInvalid(id))
      return 0;
    const end = id.length;
    const start = end > 10 ? end - 8 : 2;
    return substringToUint32(id, start, end);
  }
  Id642.getLowerUint32 = getLowerUint32;
  function getUpperUint32(id) {
    const len = id.length;
    if (len <= 10 || isInvalid(id))
      return 0;
    return substringToUint32(id, 2, len - 8);
  }
  Id642.getUpperUint32 = getUpperUint32;
  function toIdSet(arg, makeCopy = false) {
    if (arg instanceof Set)
      return makeCopy ? new Set(arg) : arg;
    const ids = /* @__PURE__ */ new Set();
    if (typeof arg === "string")
      ids.add(arg);
    else if (Array.isArray(arg)) {
      arg.forEach((id) => {
        if (typeof id === "string")
          ids.add(id);
      });
    }
    return ids;
  }
  Id642.toIdSet = toIdSet;
  function* iterator(ids) {
    if (typeof ids === "string") {
      yield ids;
    } else {
      for (const id of ids)
        yield id;
    }
  }
  Id642.iterator = iterator;
  function iterable(ids) {
    return {
      [Symbol.iterator]: () => iterator(ids)
    };
  }
  Id642.iterable = iterable;
  function getFirst(arg) {
    return typeof arg === "string" ? arg : Array.isArray(arg) ? arg[0] : arg.values().next().value;
  }
  Id642.getFirst = getFirst;
  function sizeOf(arg) {
    return typeof arg === "string" ? 1 : Array.isArray(arg) ? arg.length : arg.size;
  }
  Id642.sizeOf = sizeOf;
  function has(arg, id) {
    if (typeof arg === "string")
      return arg === id;
    if (Array.isArray(arg))
      return -1 !== arg.indexOf(id);
    return arg.has(id);
  }
  Id642.has = has;
  Id642.invalid = "0";
  function isTransient(id) {
    return 18 === id.length && id.startsWith("0xffffff");
  }
  Id642.isTransient = isTransient;
  function isTransientId64(id) {
    return isValidId64(id) && isTransient(id);
  }
  Id642.isTransientId64 = isTransientId64;
  function isId64(id) {
    const len = id.length;
    if (0 === len || 18 < len)
      return false;
    if ("0" !== id[0])
      return false;
    if (1 === len)
      return true;
    if (2 === len || "x" !== id[1])
      return false;
    let localIdStart = 2;
    if (len > 12) {
      localIdStart = len - 10;
      if (!isValidHexString(id, 2, localIdStart - 2))
        return false;
      for (let i = localIdStart; i < len; i++) {
        if (48 !== id.charCodeAt(i))
          break;
        else
          localIdStart++;
      }
      if (localIdStart >= len)
        return false;
    }
    return isValidHexString(id, localIdStart, len - localIdStart);
  }
  Id642.isId64 = isId64;
  function isValid(id) {
    return Id642.invalid !== id;
  }
  Id642.isValid = isValid;
  function isValidId64(id) {
    return Id642.invalid !== id && Id642.isId64(id);
  }
  Id642.isValidId64 = isValidId64;
  function isInvalid(id) {
    return Id642.invalid === id;
  }
  Id642.isInvalid = isInvalid;
  class Uint32Set {
    /** Construct a new Uint32Set.
     * @param ids If supplied, all of the specified Ids will be added to the new set.
     */
    constructor(ids) {
      this._map = /* @__PURE__ */ new Map();
      if (void 0 !== ids)
        this.addIds(ids);
    }
    /** Remove all contents of this set. */
    clear() {
      this._map.clear();
    }
    /** Add an Id to the set. */
    addId(id) {
      this.add(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Add any number of Ids to the set. */
    addIds(ids) {
      for (const id of Id642.iterable(ids))
        this.addId(id);
    }
    /** Returns true if the set contains the specified Id. */
    hasId(id) {
      return this.has(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
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
      this.delete(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Remove any number of Ids from the set. */
    deleteIds(ids) {
      for (const id of Id642.iterable(ids))
        this.deleteId(id);
    }
    /** Remove an Id from the set. */
    delete(low, high) {
      const set = this._map.get(high);
      if (void 0 !== set)
        set.delete(low);
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
      let size2 = 0;
      for (const entry of this._map)
        size2 += entry[1].size;
      return size2;
    }
    /** Populates and returns an array of all Ids contained in the set. */
    toId64Array() {
      const ids = [];
      for (const entry of this._map)
        for (const low of entry[1])
          ids.push(Id642.fromUint32Pair(low, entry[0]));
      return ids;
    }
    /** Populates and returns a set of all Ids contained in the set. */
    toId64Set() {
      const ids = /* @__PURE__ */ new Set();
      for (const entry of this._map)
        for (const low of entry[1])
          ids.add(Id642.fromUint32Pair(low, entry[0]));
      return ids;
    }
    /** Execute a function against each Id in this set. */
    forEach(func) {
      for (const entry of this._map)
        for (const lo of entry[1])
          func(lo, entry[0]);
    }
  }
  Id642.Uint32Set = Uint32Set;
  class Uint32Map {
    constructor() {
      this._map = /* @__PURE__ */ new Map();
    }
    /** Remove all entries from the map. */
    clear() {
      this._map.clear();
    }
    /** Find an entry in the map by Id. */
    getById(id) {
      return this.get(Id642.getLowerUint32(id), Id642.getUpperUint32(id));
    }
    /** Set an entry in the map by Id. */
    setById(id, value) {
      this.set(Id642.getLowerUint32(id), Id642.getUpperUint32(id), value);
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
      let size2 = 0;
      for (const entry of this._map)
        size2 += entry[1].size;
      return size2;
    }
    /** Execute a function against each entry in this map. */
    forEach(func) {
      for (const outerEntry of this._map)
        for (const innerEntry of outerEntry[1])
          func(innerEntry[0], outerEntry[0], innerEntry[1]);
    }
  }
  Id642.Uint32Map = Uint32Map;
})(Id64 || (Id64 = {}));
class TransientIdSequence {
  constructor() {
    this._localId = 0;
  }
  /** Generate and return the next transient Id64String in the sequence.
   * @deprecated in 3.x. Use [[getNext]].
   */
  get next() {
    return this.getNext();
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
}
var Guid;
(function(Guid2) {
  const uuidPattern = new RegExp("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$");
  Guid2.empty = "00000000-0000-0000-0000-000000000000";
  function isGuid(value) {
    return uuidPattern.test(value);
  }
  Guid2.isGuid = isGuid;
  function isV4Guid(value) {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value);
  }
  Guid2.isV4Guid = isV4Guid;
  function createValue() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : r & 3 | 8;
      return v.toString(16);
    });
  }
  Guid2.createValue = createValue;
  function normalize(value) {
    const lowerValue = value.toLowerCase().trim();
    if (isGuid(lowerValue))
      return lowerValue;
    const noDashValue = lowerValue.replace(/-/g, "");
    const noDashPattern = /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/;
    if (noDashPattern.test(noDashValue)) {
      return noDashValue.replace(noDashPattern, (_match, p1, p2, p3, p4, p5) => `${p1}-${p2}-${p3}-${p4}-${p5}`);
    }
    return value;
  }
  Guid2.normalize = normalize;
})(Guid || (Guid = {}));
var OrderedId64Iterable;
(function(OrderedId64Iterable2) {
  function compare(lhs, rhs) {
    if (lhs.length !== rhs.length)
      return lhs.length < rhs.length ? -1 : 1;
    if (lhs !== rhs)
      return lhs < rhs ? -1 : 1;
    return 0;
  }
  OrderedId64Iterable2.compare = compare;
  function sortArray(ids) {
    ids.sort((x, y) => compare(x, y));
    return ids;
  }
  OrderedId64Iterable2.sortArray = sortArray;
  function areEqualSets(ids1, ids2) {
    const leftIter = uniqueIterator(ids1);
    const rightIter = uniqueIterator(ids2);
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    while (!leftState.done && !rightState.done) {
      const left = leftState.value;
      const right = rightState.value;
      if (0 !== compare(left, right))
        return false;
      leftState = leftIter.next();
      rightState = rightIter.next();
    }
    if (leftState.done && rightState.done)
      return true;
    return false;
  }
  OrderedId64Iterable2.areEqualSets = areEqualSets;
  function isEmptySet(ids) {
    if (typeof ids === "string")
      return "" === ids;
    return true === ids[Symbol.iterator]().next().done;
  }
  OrderedId64Iterable2.isEmptySet = isEmptySet;
  function unique(ids) {
    return { [Symbol.iterator]: () => uniqueIterator(ids) };
  }
  OrderedId64Iterable2.unique = unique;
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
  OrderedId64Iterable2.uniqueIterator = uniqueIterator;
  function union(ids1, ids2) {
    return { [Symbol.iterator]: () => unionIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.union = union;
  function intersection(ids1, ids2) {
    return { [Symbol.iterator]: () => intersectionIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.intersection = intersection;
  function difference(ids1, ids2) {
    return { [Symbol.iterator]: () => differenceIterator(ids1, ids2) };
  }
  OrderedId64Iterable2.difference = difference;
  function* unionIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done || !rightState.done) {
      const left = leftState.done ? void 0 : leftState.value;
      const right = rightState.done ? void 0 : rightState.value;
      if (void 0 === left && void 0 === right)
        break;
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
          if (0 === cmp)
            rightState = rightIter.next();
        } else {
          next = right;
          rightState = rightIter.next();
        }
      }
      if (prev === next)
        continue;
      prev = next;
      yield next;
    }
  }
  OrderedId64Iterable2.unionIterator = unionIterator;
  function* intersectionIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done && !rightState.done) {
      const left = leftState.value;
      leftState = leftIter.next();
      if (left === prev)
        continue;
      prev = left;
      let right = rightState.value;
      let cmp = compare(left, right);
      while (cmp > 0) {
        rightState = rightIter.next();
        if (rightState.done)
          return;
        right = rightState.value;
        cmp = compare(left, right);
      }
      if (0 === cmp)
        yield left;
    }
  }
  OrderedId64Iterable2.intersectionIterator = intersectionIterator;
  function* differenceIterator(ids1, ids2) {
    const leftIter = ids1[Symbol.iterator]();
    const rightIter = ids2[Symbol.iterator]();
    let leftState = leftIter.next();
    let rightState = rightIter.next();
    let prev;
    while (!leftState.done) {
      const left = leftState.value;
      leftState = leftIter.next();
      if (left === prev)
        continue;
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
      if (cmp < 0)
        yield prev = left;
    }
  }
  OrderedId64Iterable2.differenceIterator = differenceIterator;
})(OrderedId64Iterable || (OrderedId64Iterable = {}));
function shallowClone(value) {
  return value;
}
function lowerBound(value, list, compare) {
  return lowerBoundOfEquivalent(list, (element) => compare(value, element));
}
function lowerBoundOfEquivalent(list, criterion) {
  let low = 0;
  let high = list.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    const comp = criterion(list[mid]);
    if (0 === comp)
      return { index: mid, equal: true };
    else if (comp < 0)
      high = mid;
    else
      low = mid + 1;
  }
  return { index: low, equal: false };
}
var DuplicatePolicy;
(function(DuplicatePolicy2) {
  DuplicatePolicy2[DuplicatePolicy2["Allow"] = 0] = "Allow";
  DuplicatePolicy2[DuplicatePolicy2["Retain"] = 1] = "Retain";
  DuplicatePolicy2[DuplicatePolicy2["Replace"] = 2] = "Replace";
})(DuplicatePolicy || (DuplicatePolicy = {}));
class ReadonlySortedArray {
  /**
   * Construct a new ReadonlySortedArray<T>.
   * @param compare The function used to compare elements within the array.
   * @param duplicatePolicy Policy for handling attempts to insert a value when an equivalent value already exists. If the input is a boolean, then `true` indicates [[DuplicatePolicy.Allow]], and `false` indicates [[DuplicatePolicy.Retain]].
   * @param clone The function invoked to clone a new element for insertion into the array. The default implementation simply returns its input.
   */
  constructor(compare, duplicatePolicy = false, clone = shallowClone) {
    this._array = [];
    this._compare = compare;
    this._clone = clone;
    if (typeof duplicatePolicy === "boolean")
      duplicatePolicy = duplicatePolicy ? DuplicatePolicy.Allow : DuplicatePolicy.Retain;
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
    const index2 = this.indexOf(value);
    return -1 !== index2 ? this._array[index2] : void 0;
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
    const index2 = this.indexOfEquivalent(criterion);
    return -1 !== index2 ? this._array[index2] : void 0;
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
  get(index2) {
    return index2 < this.length ? this._array[index2] : void 0;
  }
  /** Apply a function to each element in the array, in sorted order.
   * @param func The function to be applied.
   */
  forEach(func) {
    for (let i = 0; i < this.length; i++)
      func(this._array[i]);
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
    if (bound.equal) {
      switch (this._duplicatePolicy) {
        case DuplicatePolicy.Retain:
          return bound.index;
        case DuplicatePolicy.Replace:
          this._array[bound.index] = this._clone(value);
          if (onInsert)
            onInsert(value);
          return bound.index;
      }
    }
    this._array.splice(bound.index, 0, this._clone(value));
    if (void 0 !== onInsert)
      onInsert(value);
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
    } else {
      return -1;
    }
  }
}
class SortedArray extends ReadonlySortedArray {
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
}
var CompressedId64Set;
(function(CompressedId64Set2) {
  function isHexDigit(ch) {
    return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70;
  }
  function compactRange(increment, length) {
    const inc = `+${increment.toString()}`;
    if (length <= 1)
      return inc;
    const len = length.toString(16).toUpperCase();
    return `${inc}*${len}`;
  }
  function compressSet(ids) {
    return sortAndCompress(ids);
  }
  CompressedId64Set2.compressSet = compressSet;
  function sortAndCompress(ids) {
    const arr = typeof ids === "string" ? [ids] : Array.from(ids);
    OrderedId64Iterable.sortArray(arr);
    return compressArray(arr);
  }
  CompressedId64Set2.sortAndCompress = sortAndCompress;
  function compressArray(ids) {
    return compressIds(ids);
  }
  CompressedId64Set2.compressArray = compressArray;
  function compressIds(ids) {
    if ("string" === typeof ids)
      return ids;
    let str = "";
    const prevId = new Uint64();
    const rangeIncrement = new Uint64();
    let rangeLen = 0;
    const curId = new Uint64();
    const curIncrement = new Uint64();
    for (const id of ids) {
      if (!Id64.isValidId64(id))
        continue;
      curId.setFromId(id);
      curIncrement.setFromDifference(curId, prevId);
      const cmp = prevId.compare(curId);
      if (0 === cmp)
        continue;
      else if (cmp > 0)
        throw new Error("CompressedId64Set.compressArray requires a sorted array as input");
      prevId.copyFrom(curId);
      if (0 === rangeLen) {
        rangeIncrement.copyFrom(curIncrement);
        rangeLen = 1;
      } else if (curIncrement.equals(rangeIncrement)) {
        ++rangeLen;
      } else {
        str += compactRange(rangeIncrement, rangeLen);
        rangeIncrement.copyFrom(curIncrement);
        rangeLen = 1;
      }
    }
    if (0 < rangeLen)
      str += compactRange(rangeIncrement, rangeLen);
    return str;
  }
  CompressedId64Set2.compressIds = compressIds;
  class Uint64 {
    static assertUint32(num) {
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
      assert(!rhs.isGreaterThan(lhs));
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
      if (0 === this.upper)
        return this.lower.toString(16).toUpperCase();
      const upper = this.upper.toString(16);
      const lower = this.lower.toString(16).padStart(8, "0");
      assert(lower.length === 8);
      return `${upper}${lower}`.toUpperCase();
    }
    toId64String() {
      return Id64.fromUint32Pair(this.lower, this.upper);
    }
  }
  Uint64._base = 4294967296;
  function* iterator(ids) {
    if (0 === ids.length)
      return;
    if ("+" !== ids[0])
      throw new Error("Invalid CompressedId64Set");
    let curIndex = 1;
    const curId = new Uint64();
    function parseUint32() {
      let value = 0;
      let nChars = 0;
      while (curIndex < ids.length && nChars < 8) {
        ++nChars;
        const ch = ids.charCodeAt(curIndex);
        if (!isHexDigit(ch))
          break;
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
      const nFirstDigits = curIndex - startIndex;
      if (8 === nFirstDigits && curIndex + 1 < ids.length && isHexDigit(ids.charCodeAt(curIndex + 1))) {
        const secondIndex = curIndex;
        const second = parseUint32();
        const nSecondDigits = curIndex - secondIndex;
        const nDigitsToTransfer = 8 - nSecondDigits;
        upper = first >>> 4 * nDigitsToTransfer;
        const transfer = first - (upper << 4 * nDigitsToTransfer >>> 0);
        lower = (second | transfer << 4 * nSecondDigits >>> 0) >>> 0;
      } else {
        lower = first;
      }
      uint64.lower = lower;
      uint64.upper = upper;
    }
    const increment = new Uint64();
    while (curIndex < ids.length) {
      let multiplier = 1;
      parseUint64(increment);
      if (increment.isZero)
        throw new Error("Invalid CompressedId64Set");
      if (curIndex < ids.length) {
        switch (ids[curIndex++]) {
          case "*":
            multiplier = parseUint32();
            if (0 === multiplier)
              throw new Error("Invalid CompressedId64Set");
            if (curIndex !== ids.length && ids[curIndex++] !== "+")
              return;
            break;
          case "+":
            break;
          default:
            throw new Error("Invalid CompressedId64Set");
        }
      }
      for (let i = 0; i < multiplier; i++) {
        curId.add(increment);
        yield curId.toId64String();
      }
    }
  }
  CompressedId64Set2.iterator = iterator;
  function iterable(ids) {
    return {
      [Symbol.iterator]: () => iterator(ids)
    };
  }
  CompressedId64Set2.iterable = iterable;
  function decompressSet(compressedIds, out) {
    const set = out ?? /* @__PURE__ */ new Set();
    for (const id of iterable(compressedIds))
      set.add(id);
    return set;
  }
  CompressedId64Set2.decompressSet = decompressSet;
  function decompressArray(compressedIds, out) {
    const arr = out ?? [];
    for (const id of iterable(compressedIds))
      arr.push(id);
    return arr;
  }
  CompressedId64Set2.decompressArray = decompressArray;
})(CompressedId64Set || (CompressedId64Set = {}));
class OrderedId64Array extends SortedArray {
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
}
class MutableCompressedId64Set {
  /** Construct a new set, optionally initialized to contain the Ids represented by `ids`. */
  constructor(ids) {
    this._inserted = new OrderedId64Array();
    this._deleted = new OrderedId64Array();
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
    if (!Id64.isValidId64(id))
      throw new Error("MutableCompressedId64Set.add: invalid Id");
    this._deleted.remove(id);
    this._inserted.insert(id);
  }
  /** Remove the specified Id from the set.
   * @throws Error if `id` is not a valid [[Id64String]].
   */
  delete(id) {
    if (!Id64.isValidId64(id))
      throw new Error("MutableCompressedId64Set.delete: invalid Id");
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
    if (this.isEmpty)
      return CompressedId64Set.compressIds(ids);
    else if (OrderedId64Iterable.isEmptySet(ids) || this.equals(ids))
      return this.ids;
    return CompressedId64Set.compressIds(OrderedId64Iterable.union(this, ids));
  }
  /** Compute a compact string representation of the intersection of this and another set of Ids - i.e., those Ids present in both this and the other set. */
  computeIntersection(ids) {
    if (this.equals(ids))
      return this.ids;
    else if (this.isEmpty || OrderedId64Iterable.isEmptySet(ids))
      return "";
    return CompressedId64Set.compressIds(OrderedId64Iterable.intersection(this, ids));
  }
  /** Compute a compact string representation of the difference between this and another set - i.e., those Ids present in this but not in the other set. */
  computeDifference(ids) {
    if (this.isEmpty || this.equals(ids))
      return "";
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
      if (other === this)
        return true;
      if (typeof other !== "string")
        other = other.ids;
    }
    if (typeof other === "string")
      return other === this.ids;
    this.updateIds();
    return OrderedId64Iterable.areEqualSets(this, other);
  }
  get _isDirty() {
    return !this._inserted.isEmpty || !this._deleted.isEmpty;
  }
  updateIds() {
    if (!this._isDirty)
      return;
    const difference = OrderedId64Iterable.difference(CompressedId64Set.iterable(this._ids), this._deleted.ids);
    const union = { [Symbol.iterator]: () => OrderedId64Iterable.unionIterator(difference, this._inserted.ids) };
    this._ids = CompressedId64Set.compressIds(union);
    this._inserted.clear();
    this._deleted.clear();
  }
}
var JsonUtils;
(function(JsonUtils2) {
  function asBool(json, defaultVal = false) {
    return isNullOrUndefined(json) ? defaultVal : !!json;
  }
  JsonUtils2.asBool = asBool;
  function asInt(json, defaultVal = 0) {
    return typeof json === "number" ? Math.trunc(json) : defaultVal;
  }
  JsonUtils2.asInt = asInt;
  function asDouble(json, defaultVal = 0) {
    return typeof json === "number" ? json : defaultVal;
  }
  JsonUtils2.asDouble = asDouble;
  function asString(json, defaultVal = "") {
    return isNullOrUndefined(json) ? defaultVal : json.toString();
  }
  JsonUtils2.asString = asString;
  function asArray(json) {
    return Array.isArray(json) ? json : void 0;
  }
  JsonUtils2.asArray = asArray;
  function asObject(json) {
    return "object" === typeof json ? json : void 0;
  }
  JsonUtils2.asObject = asObject;
  function setOrRemoveNumber(json, key, val, defaultVal) {
    if (val === defaultVal)
      delete json[key];
    else
      json[key] = val;
  }
  JsonUtils2.setOrRemoveNumber = setOrRemoveNumber;
  function setOrRemoveBoolean(json, key, val, defaultVal) {
    if (val === defaultVal)
      delete json[key];
    else
      json[key] = val;
  }
  JsonUtils2.setOrRemoveBoolean = setOrRemoveBoolean;
  function isEmptyObject(json) {
    return "object" === typeof json && 0 === Object.keys(json).length;
  }
  JsonUtils2.isEmptyObject = isEmptyObject;
  function isEmptyObjectOrUndefined(json) {
    return void 0 === json || isEmptyObject(json);
  }
  JsonUtils2.isEmptyObjectOrUndefined = isEmptyObjectOrUndefined;
  function isNullOrUndefined(json) {
    return null === json || void 0 === json;
  }
  function isNonEmptyObject(value) {
    return !isEmptyObjectOrUndefined(value);
  }
  JsonUtils2.isNonEmptyObject = isNonEmptyObject;
  function toObject(val) {
    if (typeof val === "boolean" || typeof val === "number" || typeof val === "string")
      return val;
    if (typeof val !== "object")
      return void 0;
    if (typeof val.toJSON !== "undefined")
      return toObject(val.toJSON());
    if (Array.isArray(val)) {
      const arr = new Array(val.length);
      val.forEach((el, i) => arr[i] = toObject(el));
      return arr;
    }
    const out = {};
    Object.getOwnPropertyNames(val).forEach((prop) => {
      const transformVal = toObject(val[prop]);
      if (transformVal !== void 0)
        out[prop] = transformVal;
    });
    return out;
  }
  JsonUtils2.toObject = toObject;
})(JsonUtils || (JsonUtils = {}));
var Utf8ToString;
(function(Utf8ToString2) {
  function inRange(a, min2, max2) {
    return min2 <= a && a <= max2;
  }
  function utf8Handler(bytes) {
    let codePoint = 0;
    let bytesSeen = 0;
    let bytesNeeded = 0;
    let lowerBoundary = 128;
    let upperBoundary = 191;
    const codePoints = [];
    const length = bytes.length;
    for (let i = 0; i < length; i++) {
      const currentByte = bytes[i];
      if (0 === bytesNeeded) {
        if (inRange(currentByte, 0, 127)) {
          codePoints.push(currentByte);
          continue;
        }
        if (inRange(currentByte, 194, 223)) {
          bytesNeeded = 1;
          codePoint = currentByte & 31;
          continue;
        }
        if (inRange(currentByte, 224, 239)) {
          if (224 === currentByte)
            lowerBoundary = 160;
          else if (237 === currentByte)
            upperBoundary = 159;
          bytesNeeded = 2;
          codePoint = currentByte & 15;
          continue;
        }
        if (inRange(currentByte, 240, 244)) {
          if (240 === currentByte)
            lowerBoundary = 144;
          else if (244 === currentByte)
            upperBoundary = 143;
          bytesNeeded = 3;
          codePoint = currentByte & 7;
          continue;
        }
        return void 0;
      }
      if (!inRange(currentByte, lowerBoundary, upperBoundary)) {
        codePoint = bytesNeeded = bytesSeen = 0;
        lowerBoundary = 128;
        upperBoundary = 191;
        --i;
        continue;
      }
      lowerBoundary = 128;
      upperBoundary = 191;
      codePoint = codePoint << 6 | currentByte & 63;
      ++bytesSeen;
      if (bytesSeen === bytesNeeded) {
        codePoints.push(codePoint);
        codePoint = bytesNeeded = bytesSeen = 0;
      }
    }
    return codePoints;
  }
  function decodeWithFromCharCode(view) {
    let result = "";
    const codePoints = utf8Handler(view);
    if (void 0 === codePoints)
      return void 0;
    for (let cp of codePoints) {
      if (cp <= 65535) {
        result += String.fromCharCode(cp);
      } else {
        cp -= 65536;
        result += String.fromCharCode((cp >> 10) + 55296, (cp & 1023) + 56320);
      }
    }
    return result;
  }
  Utf8ToString2.decodeWithFromCharCode = decodeWithFromCharCode;
})(Utf8ToString || (Utf8ToString = {}));
function utf8ToStringPolyfill(utf8) {
  return Utf8ToString.decodeWithFromCharCode(utf8);
}
let textDecoderSupported = true;
function utf8ToString(utf8) {
  let decoder;
  if (textDecoderSupported) {
    try {
      decoder = new TextDecoder("utf-8");
    } catch (_ex) {
      textDecoderSupported = false;
    }
  }
  if (void 0 !== decoder)
    return decoder.decode(utf8);
  else
    return utf8ToStringPolyfill(utf8);
}
function base64StringToUint8Array(base64) {
  return new Uint8Array(atob(base64).split("").map((c) => c.charCodeAt(0)));
}
var SpanKind;
(function(SpanKind2) {
  SpanKind2[SpanKind2["INTERNAL"] = 0] = "INTERNAL";
  SpanKind2[SpanKind2["SERVER"] = 1] = "SERVER";
  SpanKind2[SpanKind2["CLIENT"] = 2] = "CLIENT";
  SpanKind2[SpanKind2["PRODUCER"] = 3] = "PRODUCER";
  SpanKind2[SpanKind2["CONSUMER"] = 4] = "CONSUMER";
})(SpanKind || (SpanKind = {}));
function isValidPrimitive(val) {
  return typeof val === "string" || typeof val === "number" || typeof val === "boolean";
}
function isValidPrimitiveArray(val) {
  if (!Array.isArray(val))
    return false;
  let itemType;
  for (const x of val) {
    if (x === void 0 || x === null)
      continue;
    if (!itemType) {
      itemType = typeof x;
      if (!isValidPrimitive(x))
        return false;
    }
    if (typeof x !== itemType)
      return false;
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
  if (entries.length === 0)
    yield [path, []];
  for (const [key, val] of entries)
    yield* getFlatEntries(val, path === "" ? key : `${path}.${key}`);
}
function flattenObject(obj) {
  return Object.fromEntries(getFlatEntries(obj));
}
class Tracing {
  /**
   * If OpenTelemetry tracing is enabled, creates a new span and runs the provided function in it.
   * If OpenTelemetry tracing is _not_ enabled, runs the provided function.
   * @param name name of the new span
   * @param fn function to run inside the new span
   * @param options span options
   * @param parentContext optional context used to retrieve parent span id
   */
  static async withSpan(name, fn, options, parentContext) {
    if (Tracing._tracer === void 0 || Tracing._openTelemetry === void 0)
      return fn();
    const parent = parentContext === void 0 ? Tracing._openTelemetry.context.active() : Tracing._openTelemetry.trace.setSpanContext(Tracing._openTelemetry.context.active(), parentContext);
    return Tracing._openTelemetry.context.with(Tracing._openTelemetry.trace.setSpan(parent, Tracing._tracer.startSpan(name, options, Tracing._openTelemetry.context.active())), async () => {
      var _a2, _b, _c, _d;
      try {
        return await fn();
      } catch (err) {
        if (err instanceof Error)
          (_b = (_a2 = Tracing._openTelemetry) == null ? void 0 : _a2.trace.getSpan(Tracing._openTelemetry.context.active())) == null ? void 0 : _b.setAttribute("error", true);
        throw err;
      } finally {
        (_d = (_c = Tracing._openTelemetry) == null ? void 0 : _c.trace.getSpan(Tracing._openTelemetry.context.active())) == null ? void 0 : _d.end();
      }
    });
  }
  /**
   * Adds a span event describing a runtime exception, as advised in OpenTelemetry documentation
   * @param e error (exception) object
   * @internal
   */
  static recordException(e) {
    var _a2, _b;
    (_b = (_a2 = Tracing._openTelemetry) == null ? void 0 : _a2.trace.getSpan(Tracing._openTelemetry.context.active())) == null ? void 0 : _b.recordException(e);
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
      var _a2, _b, _c, _d;
      const oTelContext = (_a2 = Tracing._openTelemetry) == null ? void 0 : _a2.context.active();
      if (Tracing._openTelemetry === void 0 || oTelContext === void 0)
        return base(category, message, metaData);
      const serializedMetadata = Logger.getMetaData(metaData);
      if (Logger.isEnabled(category, level)) {
        try {
          (_c = (_b = Tracing._openTelemetry) == null ? void 0 : _b.trace.getSpan(Tracing._openTelemetry.context.active())) == null ? void 0 : _c.addEvent(message, {
            ...flattenObject(serializedMetadata),
            error: isError,
            loggerCategory: category
          });
        } catch (_e) {
        }
        const spanContext = (_d = Tracing._openTelemetry.trace.getSpan(oTelContext)) == null ? void 0 : _d.spanContext();
        base(category, message, {
          ...serializedMetadata,
          /* eslint-disable @typescript-eslint/naming-convention */
          trace_id: spanContext == null ? void 0 : spanContext.traceId,
          span_id: spanContext == null ? void 0 : spanContext.spanId,
          trace_flags: spanContext == null ? void 0 : spanContext.traceFlags
          /* eslint-enable @typescript-eslint/naming-convention */
        });
      }
    };
  }
  /** Set attributes on currently active openTelemetry span. Doesn't do anything if openTelemetry logging is not initialized.
   * @param attributes The attributes to set
   */
  static setAttributes(attributes) {
    var _a2, _b;
    (_b = (_a2 = Tracing._openTelemetry) == null ? void 0 : _a2.trace.getSpan(Tracing._openTelemetry.context.active())) == null ? void 0 : _b.setAttributes(attributes);
  }
}
var StageUsage;
(function(StageUsage2) {
  StageUsage2["Private"] = "Private";
  StageUsage2["General"] = "General";
  StageUsage2["Redline"] = "Redline";
  StageUsage2["ViewOnly"] = "ViewOnly";
  StageUsage2["Edit"] = "Edit";
  StageUsage2["Settings"] = "Settings";
})(StageUsage || (StageUsage = {}));
const loggerCategory = "appui-abstract.UiItemsManager";
var UiItemsApplicationAction;
(function(UiItemsApplicationAction2) {
  UiItemsApplicationAction2[UiItemsApplicationAction2["Allow"] = 0] = "Allow";
  UiItemsApplicationAction2[UiItemsApplicationAction2["Disallow"] = 1] = "Disallow";
  UiItemsApplicationAction2[UiItemsApplicationAction2["Update"] = 2] = "Update";
})(UiItemsApplicationAction || (UiItemsApplicationAction = {}));
class UiItemsManager {
  /** For use in unit testing
   * @internal */
  static clearAllProviders() {
    UiItemsManager._registeredUiItemsProviders.clear();
  }
  /** Return number of registered UiProvider. */
  static get registeredProviderIds() {
    const ids = [...UiItemsManager._registeredUiItemsProviders.keys()];
    return ids;
  }
  /** Return true if there is any registered UiProvider. */
  static get hasRegisteredProviders() {
    return this._registeredUiItemsProviders.size > 0;
  }
  /**
   * Retrieves a previously loaded UiItemsProvider.
   * @param providerId id of the UiItemsProvider to get
   */
  static getUiItemsProvider(providerId) {
    var _a2;
    return (_a2 = UiItemsManager._registeredUiItemsProviders.get(providerId)) == null ? void 0 : _a2.provider;
  }
  static sendRegisteredEvent(ev) {
    UiItemsManager.onUiProviderRegisteredEvent.raiseEvent(ev);
  }
  /**
   * Registers a UiItemsProvider with the UiItemsManager.
   * @param uiProvider the UI items provider to register.
   */
  static register(uiProvider, overrides) {
    const providerId = (overrides == null ? void 0 : overrides.providerId) ?? uiProvider.id;
    if (UiItemsManager.getUiItemsProvider(providerId)) {
      Logger.logInfo(loggerCategory, `UiItemsProvider (${providerId}) is already loaded`);
    } else {
      UiItemsManager._registeredUiItemsProviders.set(providerId, { provider: uiProvider, overrides });
      Logger.logInfo(loggerCategory, `UiItemsProvider ${uiProvider.id} registered as ${providerId} `);
      UiItemsManager.sendRegisteredEvent({ providerId });
    }
  }
  /** Remove a specific UiItemsProvider from the list of available providers. */
  static unregister(uiProviderId) {
    const provider = UiItemsManager.getUiItemsProvider(uiProviderId);
    if (!provider)
      return;
    provider.onUnregister && provider.onUnregister();
    UiItemsManager._registeredUiItemsProviders.delete(uiProviderId);
    Logger.logInfo(loggerCategory, `UiItemsProvider (${uiProviderId}) unloaded`);
    UiItemsManager.sendRegisteredEvent({ providerId: uiProviderId });
  }
  static allowItemsFromProvider(entry, stageId, stageUsage) {
    const overrides = entry.overrides;
    if (void 0 !== stageId && (overrides == null ? void 0 : overrides.stageIds) && !overrides.stageIds.some((value) => value === stageId))
      return false;
    if (void 0 !== stageUsage && (overrides == null ? void 0 : overrides.stageUsages) && !overrides.stageUsages.some((value) => value === stageUsage))
      return false;
    return true;
  }
  /** Called when the application is populating a toolbar so that any registered UiItemsProvider can add tool buttons that either either execute
   * an action or specify a registered ToolId into toolbar.
   * @param stageId a string identifier the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @param toolbarUsage usage of the toolbar
   * @param toolbarOrientation orientation of the toolbar
   * @returns an array of error messages. The array will be empty if the load is successful, otherwise it is a list of one or more problems.
   */
  static getToolbarButtonItems(stageId, stageUsage, toolbarUsage, toolbarOrientation, stageAppData) {
    const buttonItems = [];
    if (0 === UiItemsManager._registeredUiItemsProviders.size)
      return buttonItems;
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      var _a2;
      const uiProvider = entry.provider;
      const providerId = ((_a2 = entry.overrides) == null ? void 0 : _a2.providerId) ?? uiProvider.id;
      if (uiProvider.provideToolbarButtonItems && this.allowItemsFromProvider(entry, stageId, stageUsage)) {
        uiProvider.provideToolbarButtonItems(stageId, stageUsage, toolbarUsage, toolbarOrientation, stageAppData).forEach((spec) => {
          if (-1 === buttonItems.findIndex((existingItem) => spec.id === existingItem.id))
            buttonItems.push({ ...spec, providerId });
        });
      }
    });
    return buttonItems;
  }
  /** Called when the application is populating the statusbar so that any registered UiItemsProvider can add status fields
   * @param stageId a string identifier the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @returns An array of CommonStatusBarItem that will be used to create controls for the status bar.
   */
  static getStatusBarItems(stageId, stageUsage, stageAppData) {
    const statusBarItems = [];
    if (0 === UiItemsManager._registeredUiItemsProviders.size)
      return statusBarItems;
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      var _a2;
      const uiProvider = entry.provider;
      const providerId = ((_a2 = entry.overrides) == null ? void 0 : _a2.providerId) ?? uiProvider.id;
      if (uiProvider.provideStatusBarItems && this.allowItemsFromProvider(entry, stageId, stageUsage)) {
        uiProvider.provideStatusBarItems(stageId, stageUsage, stageAppData).forEach((item) => {
          if (-1 === statusBarItems.findIndex((existingItem) => item.id === existingItem.id))
            statusBarItems.push({ ...item, providerId });
        });
      }
    });
    return statusBarItems;
  }
  /** Called when the application is populating the statusbar so that any registered UiItemsProvider can add status fields
   * @returns An array of BackstageItem that will be used to create controls for the backstage menu.
   */
  static getBackstageItems() {
    const backstageItems = [];
    if (0 === UiItemsManager._registeredUiItemsProviders.size)
      return backstageItems;
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      var _a2;
      const uiProvider = entry.provider;
      const providerId = ((_a2 = entry.overrides) == null ? void 0 : _a2.providerId) ?? uiProvider.id;
      if (uiProvider.provideBackstageItems) {
        uiProvider.provideBackstageItems().forEach((item) => {
          if (-1 === backstageItems.findIndex((existingItem) => item.id === existingItem.id))
            backstageItems.push({ ...item, providerId });
        });
      }
    });
    return backstageItems;
  }
  /** Called when the application is populating the Stage Panels so that any registered UiItemsProvider can add widgets
   * @param stageId a string identifier the active stage.
   * @param stageUsage the StageUsage of the active stage.
   * @param location the location within the stage.
   * @param section the section within location.
   * @returns An array of AbstractWidgetProps that will be used to create widgets.
   */
  static getWidgets(stageId, stageUsage, location, section, zoneLocation, stageAppData) {
    const widgets = [];
    if (0 === UiItemsManager._registeredUiItemsProviders.size)
      return widgets;
    UiItemsManager._registeredUiItemsProviders.forEach((entry) => {
      var _a2;
      const uiProvider = entry.provider;
      const providerId = ((_a2 = entry.overrides) == null ? void 0 : _a2.providerId) ?? uiProvider.id;
      if (uiProvider.provideWidgets && this.allowItemsFromProvider(entry, stageId, stageUsage)) {
        uiProvider.provideWidgets(stageId, stageUsage, location, section, zoneLocation, stageAppData).forEach((widget) => {
          if (-1 === widgets.findIndex((existingItem) => widget.id === existingItem.id))
            widgets.push({ ...widget, providerId });
        });
      }
    });
    return widgets;
  }
}
UiItemsManager._registeredUiItemsProviders = /* @__PURE__ */ new Map();
UiItemsManager.onUiProviderRegisteredEvent = new BeEvent();
class GenericUiEvent extends BeUiEvent {
}
class UiAdmin {
  constructor() {
    this._featureFlags = {};
  }
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
    this._featureFlags = { ...this._featureFlags, ...uiFlags };
  }
  /** @internal */
  onInitialized() {
  }
  /** Get the cursor X and Y position. */
  get cursorPosition() {
    return { x: 0, y: 0 };
  }
  /** Create a PointProps object.
  * @deprecated in 4.2.x. Please use @core/geometry [[XAndY]] or a custom implementation.
  */
  createXAndY(x, y) {
    return { x, y };
  }
  /** Determines if focus is set to Home */
  get isFocusOnHome() {
    return false;
  }
  /** Sets focus to Home */
  setFocusToHome() {
  }
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
}
UiAdmin.onGenericUiEvent = new GenericUiEvent();
var BackstageItemType;
(function(BackstageItemType2) {
  BackstageItemType2[BackstageItemType2["ActionItem"] = 1] = "ActionItem";
  BackstageItemType2[BackstageItemType2["StageLauncher"] = 2] = "StageLauncher";
})(BackstageItemType || (BackstageItemType = {}));
const isActionItem = (item) => {
  return item.execute !== void 0;
};
const isStageLauncher = (item) => {
  return item.stageId !== void 0;
};
class BackstageItemUtilities {
}
BackstageItemUtilities.createStageLauncher = (frontstageId, groupPriority, itemPriority, label, subtitle, icon, overrides) => ({
  groupPriority,
  icon,
  internalData: overrides == null ? void 0 : overrides.internalData,
  id: frontstageId,
  itemPriority,
  label,
  stageId: frontstageId,
  subtitle,
  ...overrides
});
BackstageItemUtilities.createActionItem = (itemId, groupPriority, itemPriority, execute, label, subtitle, icon, overrides) => ({
  execute,
  groupPriority,
  icon,
  internalData: overrides == null ? void 0 : overrides.internalData,
  id: itemId,
  itemPriority,
  label,
  subtitle,
  ...overrides
});
var FunctionKey;
(function(FunctionKey2) {
  FunctionKey2["F1"] = "F1";
  FunctionKey2["F2"] = "F2";
  FunctionKey2["F3"] = "F3";
  FunctionKey2["F4"] = "F4";
  FunctionKey2["F5"] = "F5";
  FunctionKey2["F6"] = "F6";
  FunctionKey2["F7"] = "F7";
  FunctionKey2["F8"] = "F8";
  FunctionKey2["F9"] = "F9";
  FunctionKey2["F10"] = "F10";
  FunctionKey2["F11"] = "F11";
  FunctionKey2["F12"] = "F12";
})(FunctionKey || (FunctionKey = {}));
var SpecialKey;
(function(SpecialKey2) {
  SpecialKey2["Home"] = "Home";
  SpecialKey2["End"] = "End";
  SpecialKey2["PageUp"] = "PageUp";
  SpecialKey2["PageDown"] = "PageDown";
  SpecialKey2["Escape"] = "Escape";
  SpecialKey2["Delete"] = "Delete";
  SpecialKey2["Insert"] = "Insert";
  SpecialKey2["Tab"] = "Tab";
  SpecialKey2["ArrowLeft"] = "ArrowLeft";
  SpecialKey2["ArrowRight"] = "ArrowRight";
  SpecialKey2["ArrowUp"] = "ArrowUp";
  SpecialKey2["ArrowDown"] = "ArrowDown";
  SpecialKey2["Enter"] = "Enter";
  SpecialKey2["Return"] = "Enter";
  SpecialKey2["Space"] = " ";
  SpecialKey2["Backspace"] = "Backspace";
  SpecialKey2["Clear"] = "Clear";
  SpecialKey2["Divide"] = "Divide";
  SpecialKey2["Multiply"] = "Multiply";
  SpecialKey2["Subtract"] = "Subtract";
  SpecialKey2["Add"] = "Add";
  SpecialKey2["Decimal"] = "Decimal";
})(SpecialKey || (SpecialKey = {}));
function isArrowKey(key) {
  return key === SpecialKey.ArrowLeft || key === SpecialKey.ArrowRight || key === SpecialKey.ArrowUp || key === SpecialKey.ArrowDown;
}
class StandardContentLayouts {
}
StandardContentLayouts.singleView = {
  id: "uia:singleView",
  description: "Single Content View"
};
StandardContentLayouts.fourQuadrants = {
  id: "uia:fourQuadrants",
  description: "Four Views, two stacked on the left, two stacked on the right",
  verticalSplit: {
    id: "uia:fourQuadrantVerticalSplit",
    percentage: 0.5,
    lock: false,
    minSizeLeft: 100,
    minSizeRight: 100,
    left: { horizontalSplit: { id: "uia:fourQuadrantsLeftHorizontal", percentage: 0.5, top: 0, bottom: 1, lock: false, minSizeTop: 50, minSizeBottom: 50 } },
    right: { horizontalSplit: { id: "uia:fourQuadrantsRightHorizontal", percentage: 0.5, top: 2, bottom: 3, lock: false, minSizeTop: 50, minSizeBottom: 50 } }
  }
};
StandardContentLayouts.twoVerticalSplit = {
  id: "uia:twoVerticalSplit",
  description: "Two Views, side by side",
  verticalSplit: {
    id: "uia:twoViewsVerticalSplit",
    percentage: 0.5,
    left: 0,
    right: 1
  }
};
StandardContentLayouts.twoHorizontalSplit = {
  id: "uia:twoHorizontalSplit",
  description: "Two views, stack one on top of the other",
  horizontalSplit: {
    id: "uia:twoViewsHorizontalSplit",
    percentage: 0.5,
    lock: false,
    top: 0,
    bottom: 1
  }
};
StandardContentLayouts.threeViewsTwoOnLeft = {
  id: "uia:threeViewsTwoOnLeft",
  description: "Three views, one on the right with the two on the left stacked one of top of the other",
  verticalSplit: {
    id: "uia:twoViewsOnLeftSplit",
    percentage: 0.5,
    left: { horizontalSplit: { id: "uia:twoViewsOnLeftHorizontal", percentage: 0.5, top: 0, bottom: 1, lock: false, minSizeTop: 50, minSizeBottom: 50 } },
    right: 2
  }
};
StandardContentLayouts.threeViewsTwoOnRight = {
  id: "uia:threeViewsTwoOnRight",
  description: "Three views, one on the left with the two on the right stacked one of top of the other",
  verticalSplit: {
    id: "uia:twoViewsOnRightSplit",
    percentage: 0.5,
    left: 0,
    right: { horizontalSplit: { id: "uia:twoViewsOnRightHorizontal", percentage: 0.5, top: 1, bottom: 2, lock: false, minSizeTop: 50, minSizeBottom: 50 } }
  }
};
StandardContentLayouts.threeViewsTwoOnBottom = {
  id: "uia:threeViewsTwoOnBottom",
  description: "Three Views, one on top and two side by side on the bottom",
  horizontalSplit: {
    id: "uia:threeViewsTwoOnBottomHorizontal",
    percentage: 0.5,
    lock: false,
    top: 0,
    bottom: { verticalSplit: { id: "uia:twoViewsOnBottomVertical", percentage: 0.5, left: 1, right: 2, lock: false, minSizeLeft: 50, minSizeRight: 50 } }
  }
};
StandardContentLayouts.threeViewsTwoOnTop = {
  id: "uia:threeViewsTwoOnTop",
  description: "Three Views, two side by side on top and one on the bottom",
  horizontalSplit: {
    id: "uia:twoViewsOnTopHorizontal",
    percentage: 0.5,
    lock: false,
    top: { verticalSplit: { id: "uia:twoViewsOnTopVertical", percentage: 0.5, left: 0, right: 1, lock: false, minSizeLeft: 50, minSizeRight: 50 } },
    bottom: 2
  }
};
StandardContentLayouts.availableLayouts = [
  StandardContentLayouts.singleView,
  StandardContentLayouts.fourQuadrants,
  StandardContentLayouts.twoVerticalSplit,
  StandardContentLayouts.twoHorizontalSplit,
  StandardContentLayouts.threeViewsTwoOnLeft,
  StandardContentLayouts.threeViewsTwoOnRight,
  StandardContentLayouts.threeViewsTwoOnBottom,
  StandardContentLayouts.threeViewsTwoOnTop
];
var AlternateDateFormats;
(function(AlternateDateFormats2) {
  AlternateDateFormats2[AlternateDateFormats2["None"] = 0] = "None";
  AlternateDateFormats2[AlternateDateFormats2["IsoShort"] = 1] = "IsoShort";
  AlternateDateFormats2[AlternateDateFormats2["IsoDateTime"] = 2] = "IsoDateTime";
  AlternateDateFormats2[AlternateDateFormats2["UtcShort"] = 3] = "UtcShort";
  AlternateDateFormats2[AlternateDateFormats2["UtcDateTime"] = 4] = "UtcDateTime";
  AlternateDateFormats2[AlternateDateFormats2["UtcShortWithDay"] = 5] = "UtcShortWithDay";
  AlternateDateFormats2[AlternateDateFormats2["UtcDateTimeWithDay"] = 6] = "UtcDateTimeWithDay";
})(AlternateDateFormats || (AlternateDateFormats = {}));
var TimeDisplay;
(function(TimeDisplay2) {
  TimeDisplay2["H12MC"] = "hh:mm aa";
  TimeDisplay2["H12MSC"] = "hh:mm:ss aa";
  TimeDisplay2["H24M"] = "hh:mm";
  TimeDisplay2["H24MS"] = "hh:mm:ss";
})(TimeDisplay || (TimeDisplay = {}));
var PropertyEditorParamTypes;
(function(PropertyEditorParamTypes2) {
  PropertyEditorParamTypes2["ButtonGroupData"] = "UiAbstract-ButtonGroupData";
  PropertyEditorParamTypes2["CheckBoxIcons"] = "UiAbstract-CheckBoxIcons";
  PropertyEditorParamTypes2["Icon"] = "UiAbstract-Icon";
  PropertyEditorParamTypes2["InputEditorSize"] = "UiAbstract-InputEditorSize";
  PropertyEditorParamTypes2["ColorData"] = "UiAbstract-ColorData";
  PropertyEditorParamTypes2["CustomFormattedNumber"] = "UiAbstract-CustomFormattedNumber";
  PropertyEditorParamTypes2["IconListData"] = "UiAbstract-IconListData";
  PropertyEditorParamTypes2["MultilineText"] = "UiAbstract-MultilineText";
  PropertyEditorParamTypes2["Range"] = "UiAbstract-Range";
  PropertyEditorParamTypes2["Slider"] = "UiAbstract-Slider";
  PropertyEditorParamTypes2["SuppressEditorLabel"] = "UiAbstract-SuppressEditorLabel";
  PropertyEditorParamTypes2["CheckBoxImages"] = "UiAbstract-CheckBoxImages";
})(PropertyEditorParamTypes || (PropertyEditorParamTypes = {}));
const isInputEditorSizeParams = (item) => {
  return item.type === PropertyEditorParamTypes.InputEditorSize;
};
const isColorEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.ColorData;
};
const isIconListEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.IconListData;
};
const isButtonGroupEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.ButtonGroupData;
};
const isSuppressLabelEditorParams = (item) => {
  return item.type === PropertyEditorParamTypes.SuppressEditorLabel;
};
const isCustomFormattedNumberParams = (item) => {
  return item.type === PropertyEditorParamTypes.CustomFormattedNumber;
};
var StandardTypeNames;
(function(StandardTypeNames2) {
  StandardTypeNames2["Text"] = "text";
  StandardTypeNames2["String"] = "string";
  StandardTypeNames2["DateTime"] = "dateTime";
  StandardTypeNames2["ShortDate"] = "shortdate";
  StandardTypeNames2["Boolean"] = "boolean";
  StandardTypeNames2["Bool"] = "bool";
  StandardTypeNames2["Float"] = "float";
  StandardTypeNames2["Double"] = "double";
  StandardTypeNames2["Int"] = "int";
  StandardTypeNames2["Integer"] = "integer";
  StandardTypeNames2["Number"] = "number";
  StandardTypeNames2["Hexadecimal"] = "hexadecimal";
  StandardTypeNames2["Hex"] = "hex";
  StandardTypeNames2["Enum"] = "enum";
  StandardTypeNames2["Point2d"] = "point2d";
  StandardTypeNames2["Point3d"] = "point3d";
  StandardTypeNames2["Navigation"] = "navigation";
  StandardTypeNames2["Composite"] = "composite";
  StandardTypeNames2["Array"] = "array";
  StandardTypeNames2["Struct"] = "struct";
  StandardTypeNames2["URL"] = "url";
})(StandardTypeNames || (StandardTypeNames = {}));
var PropertyValueFormat;
(function(PropertyValueFormat2) {
  PropertyValueFormat2[PropertyValueFormat2["Primitive"] = 0] = "Primitive";
  PropertyValueFormat2[PropertyValueFormat2["Array"] = 1] = "Array";
  PropertyValueFormat2[PropertyValueFormat2["Struct"] = 2] = "Struct";
})(PropertyValueFormat || (PropertyValueFormat = {}));
class PropertyRecord {
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
      case PropertyValueFormat.Primitive:
        return [];
      case PropertyValueFormat.Struct:
        return Object.values(this.value.members);
      case PropertyValueFormat.Array:
        return this.value.items;
    }
  }
  /** Creates a PropertyRecord based on a value string and an optional property description or name */
  static fromString(value, descriptionOrName) {
    let description;
    if (descriptionOrName && typeof descriptionOrName === "object") {
      description = descriptionOrName;
    } else if (descriptionOrName && typeof descriptionOrName === "string") {
      description = {
        name: descriptionOrName,
        displayLabel: descriptionOrName,
        typename: StandardTypeNames.String
      };
    } else {
      description = {
        name: "string_value",
        displayLabel: "String Value",
        typename: StandardTypeNames.String
      };
    }
    return new PropertyRecord({
      valueFormat: PropertyValueFormat.Primitive,
      value,
      displayValue: value
    }, description);
  }
}
function assignMemberIfExists(target, source, memberName) {
  if (source.hasOwnProperty(memberName))
    target[memberName] = source[memberName];
}
class SyncPropertiesChangeEvent extends BeUiEvent {
}
class UiDataProvider {
  constructor() {
    this.onSyncPropertiesChangeEvent = new SyncPropertiesChangeEvent();
    this.onItemsReloadedEvent = new BeUiEvent();
  }
  /** Called by UI to inform data provider of changes. */
  processChangesInUi(_properties) {
    throw new Error("Derived UiDataProvider must implement this method to apply changes to a bulk set of properties.");
  }
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
}
var PropertyChangeStatus;
(function(PropertyChangeStatus2) {
  PropertyChangeStatus2[PropertyChangeStatus2["Success"] = 0] = "Success";
  PropertyChangeStatus2[PropertyChangeStatus2["Error"] = 2] = "Error";
})(PropertyChangeStatus || (PropertyChangeStatus = {}));
var DialogButtonType;
(function(DialogButtonType2) {
  DialogButtonType2["None"] = "";
  DialogButtonType2["Close"] = "close";
  DialogButtonType2["OK"] = "ok";
  DialogButtonType2["Cancel"] = "cancel";
  DialogButtonType2["Yes"] = "yes";
  DialogButtonType2["No"] = "no";
  DialogButtonType2["Retry"] = "retry";
  DialogButtonType2["Next"] = "next";
  DialogButtonType2["Previous"] = "previous";
})(DialogButtonType || (DialogButtonType = {}));
var DialogButtonStyle;
(function(DialogButtonStyle2) {
  DialogButtonStyle2["None"] = "";
  DialogButtonStyle2["Primary"] = "iui-cta";
  DialogButtonStyle2["Hollow"] = "iui-default";
  DialogButtonStyle2["Blue"] = "iui-high-visibility";
})(DialogButtonStyle || (DialogButtonStyle = {}));
class UiLayoutDataProvider extends UiDataProvider {
  constructor() {
    super(...arguments);
    this.applyUiPropertyChange = (_updatedValue) => {
      throw new Error("Derived UiDataProvider should implement this to apply change to a single property.");
    };
  }
  /** Applies changes from one or more properties - some dialogs will use this to send a bulk set of changes back to the provider */
  processChangesInUi(properties) {
    properties.forEach((property) => this.applyUiPropertyChange(property));
    return { status: PropertyChangeStatus.Success };
  }
  /** Array of dialog rows */
  get rows() {
    if (!this._rows) {
      this._rows = this.layoutDialogRows();
    }
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
    if (void 0 === this._items) {
      this.loadItemsInternal(this.supplyDialogItems());
    }
    return this._items;
  }
  /** Called to inform listeners that new properties are ready for display in UI. */
  reloadDialogItems(emitEvent = true) {
    this.loadItemsInternal(this.supplyDialogItems());
    if (emitEvent)
      this.fireItemsReloadedEvent();
  }
  /**
   * @internal
   */
  layoutDialogRows() {
    const rows = [];
    this.items.forEach((item) => {
      const row = rows.find((value) => value.priority === item.editorPosition.rowPriority);
      if (row) {
        row.items.push(item);
      } else {
        rows.push({ priority: item.editorPosition.rowPriority, items: [item] });
      }
    });
    rows.sort((a, b) => a.priority - b.priority);
    rows.forEach((row) => row.items.sort((a, b) => a.editorPosition.columnIndex - b.editorPosition.columnIndex));
    return rows;
  }
  /** Determines if a dialog item editor wants a label */
  static editorWantsLabel(item) {
    if (item.property.editor && item.property.editor.params) {
      const params = item.property.editor.params.find((param) => param.type === PropertyEditorParamTypes.SuppressEditorLabel);
      if (params)
        return false;
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
    if (dialogItem === void 0 || dialogItem.lockProperty === void 0)
      return !!baseDialogItem.isDisabled;
    const value = dialogItem.lockProperty.value;
    if (value === void 0)
      return !!baseDialogItem.isDisabled;
    return !value.value;
  }
  /** Determines if a dialog row only contains button group editors */
  static onlyContainButtonGroupEditors(row) {
    for (const item of row.items) {
      if (UiLayoutDataProvider.hasAssociatedLockProperty(item) || void 0 === item.property.editor || "enum-buttongroup" !== item.property.editor.name || UiLayoutDataProvider.editorWantsLabel(item))
        return false;
    }
    return true;
  }
}
UiLayoutDataProvider.getPropertyRecord = (dialogItem) => {
  const propertyValue = { valueFormat: PropertyValueFormat.Primitive, value: dialogItem.value.value, displayValue: dialogItem.value.displayValue };
  const record = new PropertyRecord(propertyValue, dialogItem.property);
  record.isDisabled = UiLayoutDataProvider.getItemDisabledState(dialogItem);
  return record;
};
class DialogLayoutDataProvider extends UiLayoutDataProvider {
  constructor() {
    super(...arguments);
    this.onButtonsReloadedEvent = new BeUiEvent();
  }
  /** Called to inform listeners that modal dialog button data needs to be refreshed. */
  fireDialogButtonsReloadEvent() {
    this.onButtonsReloadedEvent.emit();
  }
  supplyButtonData() {
    const buttons = [];
    buttons.push({ type: DialogButtonType.OK, onClick: () => {
    } });
    buttons.push({ type: DialogButtonType.Cancel, onClick: () => {
    } });
    return buttons;
  }
}
var BadgeType;
(function(BadgeType2) {
  BadgeType2[BadgeType2["None"] = 0] = "None";
  BadgeType2[BadgeType2["TechnicalPreview"] = 1] = "TechnicalPreview";
  BadgeType2[BadgeType2["New"] = 2] = "New";
})(BadgeType || (BadgeType = {}));
var RelativePosition;
(function(RelativePosition2) {
  RelativePosition2[RelativePosition2["Left"] = 0] = "Left";
  RelativePosition2[RelativePosition2["Top"] = 1] = "Top";
  RelativePosition2[RelativePosition2["Right"] = 2] = "Right";
  RelativePosition2[RelativePosition2["Bottom"] = 3] = "Bottom";
  RelativePosition2[RelativePosition2["TopLeft"] = 4] = "TopLeft";
  RelativePosition2[RelativePosition2["TopRight"] = 5] = "TopRight";
  RelativePosition2[RelativePosition2["BottomLeft"] = 6] = "BottomLeft";
  RelativePosition2[RelativePosition2["BottomRight"] = 7] = "BottomRight";
  RelativePosition2[RelativePosition2["RightTop"] = 8] = "RightTop";
  RelativePosition2[RelativePosition2["LeftTop"] = 9] = "LeftTop";
})(RelativePosition || (RelativePosition = {}));
var DisplayMessageType;
(function(DisplayMessageType2) {
  DisplayMessageType2[DisplayMessageType2["Toast"] = 0] = "Toast";
  DisplayMessageType2[DisplayMessageType2["Sticky"] = 2] = "Sticky";
  DisplayMessageType2[DisplayMessageType2["InputField"] = 3] = "InputField";
  DisplayMessageType2[DisplayMessageType2["Alert"] = 4] = "Alert";
})(DisplayMessageType || (DisplayMessageType = {}));
var MessageSeverity;
(function(MessageSeverity2) {
  MessageSeverity2[MessageSeverity2["None"] = 0] = "None";
  MessageSeverity2[MessageSeverity2["Information"] = 1] = "Information";
  MessageSeverity2[MessageSeverity2["Question"] = 2] = "Question";
  MessageSeverity2[MessageSeverity2["Warning"] = 3] = "Warning";
  MessageSeverity2[MessageSeverity2["Error"] = 4] = "Error";
  MessageSeverity2[MessageSeverity2["Fatal"] = 5] = "Fatal";
  MessageSeverity2[MessageSeverity2["Success"] = 6] = "Success";
})(MessageSeverity || (MessageSeverity = {}));
var StandardEditorNames;
(function(StandardEditorNames2) {
  StandardEditorNames2["ColorPicker"] = "color-picker";
  StandardEditorNames2["LongDate"] = "long-date-picker";
  StandardEditorNames2["ShortDate"] = "short-date-picker";
  StandardEditorNames2["EnumButtonGroup"] = "enum-buttongroup";
  StandardEditorNames2["IconPicker"] = "icon-picker";
  StandardEditorNames2["MultiLine"] = "multi-line";
  StandardEditorNames2["NumberCustom"] = "number-custom";
  StandardEditorNames2["NumericInput"] = "numeric-input";
  StandardEditorNames2["Slider"] = "slider";
  StandardEditorNames2["Toggle"] = "toggle";
  StandardEditorNames2["WeightPicker"] = "weight-picker";
  StandardEditorNames2["ImageCheckBox"] = "image-check-box";
  StandardEditorNames2["ThemedEnum"] = "themed-enum";
})(StandardEditorNames || (StandardEditorNames = {}));
var StatusBarSection;
(function(StatusBarSection2) {
  StatusBarSection2[StatusBarSection2["Message"] = 0] = "Message";
  StatusBarSection2[StatusBarSection2["Left"] = 0] = "Left";
  StatusBarSection2[StatusBarSection2["Stage"] = 1] = "Stage";
  StatusBarSection2[StatusBarSection2["Center"] = 1] = "Center";
  StatusBarSection2[StatusBarSection2["Selection"] = 2] = "Selection";
  StatusBarSection2[StatusBarSection2["Right"] = 2] = "Right";
  StatusBarSection2[StatusBarSection2["Context"] = 3] = "Context";
})(StatusBarSection || (StatusBarSection = {}));
var StatusBarLabelSide;
(function(StatusBarLabelSide2) {
  StatusBarLabelSide2[StatusBarLabelSide2["Left"] = 0] = "Left";
  StatusBarLabelSide2[StatusBarLabelSide2["Right"] = 1] = "Right";
})(StatusBarLabelSide || (StatusBarLabelSide = {}));
const isAbstractStatusBarActionItem = (item) => {
  return item.execute !== void 0;
};
const isAbstractStatusBarLabelItem = (item) => {
  return item.label !== void 0 && item.execute === void 0;
};
const isAbstractStatusBarCustomItem = (item) => {
  return !!item.isCustom;
};
class AbstractStatusBarItemUtilities {
}
AbstractStatusBarItemUtilities.createActionItem = (id, section, itemPriority, icon, tooltip, execute, overrides) => ({
  id,
  section,
  itemPriority,
  icon,
  tooltip,
  execute,
  ...overrides
});
AbstractStatusBarItemUtilities.createLabelItem = (id, section, itemPriority, icon, label, labelSide = StatusBarLabelSide.Right, overrides) => ({
  id,
  section,
  itemPriority,
  icon,
  label,
  labelSide,
  ...overrides
});
var ToolbarUsage;
(function(ToolbarUsage2) {
  ToolbarUsage2[ToolbarUsage2["ContentManipulation"] = 0] = "ContentManipulation";
  ToolbarUsage2[ToolbarUsage2["ViewNavigation"] = 1] = "ViewNavigation";
})(ToolbarUsage || (ToolbarUsage = {}));
var ToolbarOrientation;
(function(ToolbarOrientation2) {
  ToolbarOrientation2[ToolbarOrientation2["Horizontal"] = 0] = "Horizontal";
  ToolbarOrientation2[ToolbarOrientation2["Vertical"] = 1] = "Vertical";
})(ToolbarOrientation || (ToolbarOrientation = {}));
class ToolbarItemUtilities {
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
}
ToolbarItemUtilities.createActionButton = (id, itemPriority, icon, label, execute, overrides) => ({
  id,
  itemPriority,
  icon,
  label,
  execute,
  ...overrides
});
ToolbarItemUtilities.createGroupButton = (id, itemPriority, icon, label, items, overrides) => ({
  id,
  itemPriority,
  icon,
  label,
  items,
  ...overrides
});
class IconSpecUtilities {
  /** Create an IconSpec for an SVG loaded into web component with sprite loader
   * This method is deprecated --  use createWebComponentIconSpec()
   * @public @deprecated in 3.2. Please avoid using the Sprite loader and use IconSpecUtilities.createWebComponentIconSpec() instead.
  */
  static createSvgIconSpec(svgSrc) {
    return `${IconSpecUtilities.SVG_PREFIX}${svgSrc}`;
  }
  /** Create an IconSpec for an SVG loaded into web component with svg-loader
   * @public @deprecated in 4.3. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
  */
  static createWebComponentIconSpec(srcString) {
    return `${IconSpecUtilities.WEB_COMPONENT_PREFIX}${srcString}`;
  }
  /** Get the SVG Source from an sprite IconSpec
   * This method is deprecated -- use getWebComponentSource()
   * @public @deprecated in 3.2. avoid using the Sprite loader and use IconSpecUtilities.getWebComponentSource() instead.
  */
  static getSvgSource(iconSpec) {
    if (iconSpec.startsWith(IconSpecUtilities.SVG_PREFIX) && iconSpec.length > 4) {
      return iconSpec.slice(4);
    }
    return void 0;
  }
  /** Get the SVG Source from an svg-loader IconSpec
   * @public @deprecated in 4.3. AppUI libraries > 4.7.x support loading SVGs sources without prefixes, eliminating the need for this utility.
  */
  static getWebComponentSource(iconSpec) {
    if (iconSpec.startsWith(IconSpecUtilities.WEB_COMPONENT_PREFIX) && iconSpec.length > 7) {
      return iconSpec.slice(7);
    }
    return void 0;
  }
}
IconSpecUtilities.SVG_PREFIX = "svg:";
IconSpecUtilities.WEB_COMPONENT_PREFIX = "webSvg:";
var CharCode;
(function(CharCode2) {
  CharCode2[CharCode2["Space"] = 32] = "Space";
  CharCode2[CharCode2["Tab"] = 9] = "Tab";
  CharCode2[CharCode2["LineFeed"] = 10] = "LineFeed";
  CharCode2[CharCode2["CarriageReturn"] = 13] = "CarriageReturn";
})(CharCode || (CharCode = {}));
function isWhitespace(code) {
  return code === CharCode.Space || code === CharCode.Tab || code === CharCode.LineFeed || code === CharCode.CarriageReturn;
}
const wordSeparators = /* @__PURE__ */ new Set();
"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?".split("").forEach((s) => wordSeparators.add(s.charCodeAt(0)));
function isWordSeparator(code) {
  return isWhitespace(code) || wordSeparators.has(code);
}
function charactersMatch(codeA, codeB) {
  return codeA === codeB || isWordSeparator(codeA) && isWordSeparator(codeB);
}
function join(head, tail) {
  if (tail.length === 0) {
    tail = [head];
  } else if (head.end === tail[0].start) {
    tail[0].start = head.start;
  } else {
    tail.unshift(head);
  }
  return tail;
}
function matchesWords(word, target, contiguous = false) {
  if (!target || target.length === 0) {
    return null;
  }
  let result = null;
  let i = 0;
  word = word.toLowerCase();
  target = target.toLowerCase();
  while (i < target.length && (result = _matchesWords(word, target, 0, i, contiguous)) === null) {
    i = nextWord(target, i + 1);
  }
  return result;
}
function _matchesWords(word, target, i, j, contiguous) {
  if (i === word.length) {
    return [];
  } else if (j === target.length) {
    return null;
  } else if (!charactersMatch(word.charCodeAt(i), target.charCodeAt(j))) {
    return null;
  } else {
    let result = null;
    let nextWordIndex = j + 1;
    result = _matchesWords(word, target, i + 1, j + 1, contiguous);
    if (!contiguous) {
      while (!result && (nextWordIndex = nextWord(target, nextWordIndex)) < target.length) {
        result = _matchesWords(word, target, i + 1, nextWordIndex, contiguous);
        nextWordIndex++;
      }
    }
    return result === null ? null : join({ start: j, end: j + 1 }, result);
  }
}
function nextWord(word, start) {
  for (let i = start; i < word.length; i++) {
    if (isWordSeparator(word.charCodeAt(i)) || i > 0 && isWordSeparator(word.charCodeAt(i - 1))) {
      return i;
    }
  }
  return word.length;
}
var AbstractZoneLocation;
(function(AbstractZoneLocation2) {
  AbstractZoneLocation2[AbstractZoneLocation2["CenterLeft"] = 4] = "CenterLeft";
  AbstractZoneLocation2[AbstractZoneLocation2["CenterRight"] = 6] = "CenterRight";
  AbstractZoneLocation2[AbstractZoneLocation2["BottomLeft"] = 7] = "BottomLeft";
  AbstractZoneLocation2[AbstractZoneLocation2["BottomRight"] = 9] = "BottomRight";
})(AbstractZoneLocation || (AbstractZoneLocation = {}));
var StagePanelLocation;
(function(StagePanelLocation2) {
  StagePanelLocation2[StagePanelLocation2["Top"] = 101] = "Top";
  StagePanelLocation2[StagePanelLocation2["TopMost"] = 102] = "TopMost";
  StagePanelLocation2[StagePanelLocation2["Left"] = 103] = "Left";
  StagePanelLocation2[StagePanelLocation2["Right"] = 104] = "Right";
  StagePanelLocation2[StagePanelLocation2["Bottom"] = 105] = "Bottom";
  StagePanelLocation2[StagePanelLocation2["BottomMost"] = 106] = "BottomMost";
})(StagePanelLocation || (StagePanelLocation = {}));
var StagePanelSection;
(function(StagePanelSection2) {
  StagePanelSection2[StagePanelSection2["Start"] = 0] = "Start";
  StagePanelSection2[StagePanelSection2["Middle"] = 1] = "Middle";
  StagePanelSection2[StagePanelSection2["End"] = 2] = "End";
})(StagePanelSection || (StagePanelSection = {}));
var WidgetState;
(function(WidgetState2) {
  WidgetState2[WidgetState2["Open"] = 0] = "Open";
  WidgetState2[WidgetState2["Closed"] = 1] = "Closed";
  WidgetState2[WidgetState2["Hidden"] = 2] = "Hidden";
  WidgetState2[WidgetState2["Floating"] = 3] = "Floating";
  WidgetState2[WidgetState2["Unloaded"] = 4] = "Unloaded";
})(WidgetState || (WidgetState = {}));
var classnames$1 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
(function(module) {
  (function() {
    var hasOwn = {}.hasOwnProperty;
    function classNames() {
      var classes = "";
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (arg) {
          classes = appendClass(classes, parseValue(arg));
        }
      }
      return classes;
    }
    function parseValue(arg) {
      if (typeof arg === "string" || typeof arg === "number") {
        return arg;
      }
      if (typeof arg !== "object") {
        return "";
      }
      if (Array.isArray(arg)) {
        return classNames.apply(null, arg);
      }
      if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
        return arg.toString();
      }
      var classes = "";
      for (var key in arg) {
        if (hasOwn.call(arg, key) && arg[key]) {
          classes = appendClass(classes, key);
        }
      }
      return classes;
    }
    function appendClass(value, newClass) {
      if (!newClass) {
        return value;
      }
      if (value) {
        return value + " " + newClass;
      }
      return value + newClass;
    }
    if (module.exports) {
      classNames.default = classNames;
      module.exports = classNames;
    } else {
      window.classNames = classNames;
    }
  })();
})(classnames$1);
var classnamesExports = classnames$1.exports;
const classnames = /* @__PURE__ */ getDefaultExportFromCjs(classnamesExports);
var Key_enum = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  (function(Key) {
    Key["Unidentified"] = "Unidentified";
    Key["Alt"] = "Alt";
    Key["AltGraph"] = "AltGraph";
    Key["CapsLock"] = "CapsLock";
    Key["Control"] = "Control";
    Key["Fn"] = "Fn";
    Key["FnLock"] = "FnLock";
    Key["Hyper"] = "Hyper";
    Key["Meta"] = "Meta";
    Key["NumLock"] = "NumLock";
    Key["ScrollLock"] = "ScrollLock";
    Key["Shift"] = "Shift";
    Key["Super"] = "Super";
    Key["Symbol"] = "Symbol";
    Key["SymbolLock"] = "SymbolLock";
    Key["Enter"] = "Enter";
    Key["Tab"] = "Tab";
    Key["ArrowDown"] = "ArrowDown";
    Key["ArrowLeft"] = "ArrowLeft";
    Key["ArrowRight"] = "ArrowRight";
    Key["ArrowUp"] = "ArrowUp";
    Key["End"] = "End";
    Key["Home"] = "Home";
    Key["PageDown"] = "PageDown";
    Key["PageUp"] = "PageUp";
    Key["Backspace"] = "Backspace";
    Key["Clear"] = "Clear";
    Key["Copy"] = "Copy";
    Key["CrSel"] = "CrSel";
    Key["Cut"] = "Cut";
    Key["Delete"] = "Delete";
    Key["EraseEof"] = "EraseEof";
    Key["ExSel"] = "ExSel";
    Key["Insert"] = "Insert";
    Key["Paste"] = "Paste";
    Key["Redo"] = "Redo";
    Key["Undo"] = "Undo";
    Key["Accept"] = "Accept";
    Key["Again"] = "Again";
    Key["Attn"] = "Attn";
    Key["Cancel"] = "Cancel";
    Key["ContextMenu"] = "ContextMenu";
    Key["Escape"] = "Escape";
    Key["Execute"] = "Execute";
    Key["Find"] = "Find";
    Key["Finish"] = "Finish";
    Key["Help"] = "Help";
    Key["Pause"] = "Pause";
    Key["Play"] = "Play";
    Key["Props"] = "Props";
    Key["Select"] = "Select";
    Key["ZoomIn"] = "ZoomIn";
    Key["ZoomOut"] = "ZoomOut";
    Key["BrightnessDown"] = "BrightnessDown";
    Key["BrightnessUp"] = "BrightnessUp";
    Key["Eject"] = "Eject";
    Key["LogOff"] = "LogOff";
    Key["Power"] = "Power";
    Key["PowerOff"] = "PowerOff";
    Key["PrintScreen"] = "PrintScreen";
    Key["Hibernate"] = "Hibernate";
    Key["Standby"] = "Standby";
    Key["WakeUp"] = "WakeUp";
    Key["AllCandidates"] = "AllCandidates";
    Key["Alphanumeric"] = "Alphanumeric";
    Key["CodeInput"] = "CodeInput";
    Key["Compose"] = "Compose";
    Key["Convert"] = "Convert";
    Key["Dead"] = "Dead";
    Key["FinalMode"] = "FinalMode";
    Key["GroupFirst"] = "GroupFirst";
    Key["GroupLast"] = "GroupLast";
    Key["GroupNext"] = "GroupNext";
    Key["GroupPrevious"] = "GroupPrevious";
    Key["ModeChange"] = "ModeChange";
    Key["NextCandidate"] = "NextCandidate";
    Key["NonConvert"] = "NonConvert";
    Key["PreviousCandidate"] = "PreviousCandidate";
    Key["Process"] = "Process";
    Key["SingleCandidate"] = "SingleCandidate";
    Key["HangulMode"] = "HangulMode";
    Key["HanjaMode"] = "HanjaMode";
    Key["JunjaMode"] = "JunjaMode";
    Key["Eisu"] = "Eisu";
    Key["Hankaku"] = "Hankaku";
    Key["Hiragana"] = "Hiragana";
    Key["HiraganaKatakana"] = "HiraganaKatakana";
    Key["KanaMode"] = "KanaMode";
    Key["KanjiMode"] = "KanjiMode";
    Key["Katakana"] = "Katakana";
    Key["Romaji"] = "Romaji";
    Key["Zenkaku"] = "Zenkaku";
    Key["ZenkakuHanaku"] = "ZenkakuHanaku";
    Key["F1"] = "F1";
    Key["F2"] = "F2";
    Key["F3"] = "F3";
    Key["F4"] = "F4";
    Key["F5"] = "F5";
    Key["F6"] = "F6";
    Key["F7"] = "F7";
    Key["F8"] = "F8";
    Key["F9"] = "F9";
    Key["F10"] = "F10";
    Key["F11"] = "F11";
    Key["F12"] = "F12";
    Key["F13"] = "F13";
    Key["F14"] = "F14";
    Key["F15"] = "F15";
    Key["F16"] = "F16";
    Key["F17"] = "F17";
    Key["F18"] = "F18";
    Key["F19"] = "F19";
    Key["F20"] = "F20";
    Key["Soft1"] = "Soft1";
    Key["Soft2"] = "Soft2";
    Key["Soft3"] = "Soft3";
    Key["Soft4"] = "Soft4";
    Key["AppSwitch"] = "AppSwitch";
    Key["Call"] = "Call";
    Key["Camera"] = "Camera";
    Key["CameraFocus"] = "CameraFocus";
    Key["EndCall"] = "EndCall";
    Key["GoBack"] = "GoBack";
    Key["GoHome"] = "GoHome";
    Key["HeadsetHook"] = "HeadsetHook";
    Key["LastNumberRedial"] = "LastNumberRedial";
    Key["Notification"] = "Notification";
    Key["MannerMode"] = "MannerMode";
    Key["VoiceDial"] = "VoiceDial";
    Key["ChannelDown"] = "ChannelDown";
    Key["ChannelUp"] = "ChannelUp";
    Key["MediaFastForward"] = "MediaFastForward";
    Key["MediaPause"] = "MediaPause";
    Key["MediaPlay"] = "MediaPlay";
    Key["MediaPlayPause"] = "MediaPlayPause";
    Key["MediaRecord"] = "MediaRecord";
    Key["MediaRewind"] = "MediaRewind";
    Key["MediaStop"] = "MediaStop";
    Key["MediaTrackNext"] = "MediaTrackNext";
    Key["MediaTrackPrevious"] = "MediaTrackPrevious";
    Key["AudioBalanceLeft"] = "AudioBalanceLeft";
    Key["AudioBalanceRight"] = "AudioBalanceRight";
    Key["AudioBassDown"] = "AudioBassDown";
    Key["AudioBassBoostDown"] = "AudioBassBoostDown";
    Key["AudioBassBoostToggle"] = "AudioBassBoostToggle";
    Key["AudioBassBoostUp"] = "AudioBassBoostUp";
    Key["AudioBassUp"] = "AudioBassUp";
    Key["AudioFaderFront"] = "AudioFaderFront";
    Key["AudioFaderRear"] = "AudioFaderRear";
    Key["AudioSurroundModeNext"] = "AudioSurroundModeNext";
    Key["AudioTrebleDown"] = "AudioTrebleDown";
    Key["AudioTrebleUp"] = "AudioTrebleUp";
    Key["AudioVolumeDown"] = "AudioVolumeDown";
    Key["AudioVolumeMute"] = "AudioVolumeMute";
    Key["AudioVolumeUp"] = "AudioVolumeUp";
    Key["MicrophoneToggle"] = "MicrophoneToggle";
    Key["MicrophoneVolumeDown"] = "MicrophoneVolumeDown";
    Key["MicrophoneVolumeMute"] = "MicrophoneVolumeMute";
    Key["MicrophoneVolumeUp"] = "MicrophoneVolumeUp";
    Key["TV"] = "TV";
    Key["TV3DMode"] = "TV3DMode";
    Key["TVAntennaCable"] = "TVAntennaCable";
    Key["TVAudioDescription"] = "TVAudioDescription";
    Key["TVAudioDescriptionMixDown"] = "TVAudioDescriptionMixDown";
    Key["TVAudioDescriptionMixUp"] = "TVAudioDescriptionMixUp";
    Key["TVContentsMenu"] = "TVContentsMenu";
    Key["TVDataService"] = "TVDataService";
    Key["TVInput"] = "TVInput";
    Key["TVInputComponent1"] = "TVInputComponent1";
    Key["TVInputComponent2"] = "TVInputComponent2";
    Key["TVInputComposite1"] = "TVInputComposite1";
    Key["TVInputComposite2"] = "TVInputComposite2";
    Key["TVInputHDMI1"] = "TVInputHDMI1";
    Key["TVInputHDMI2"] = "TVInputHDMI2";
    Key["TVInputHDMI3"] = "TVInputHDMI3";
    Key["TVInputHDMI4"] = "TVInputHDMI4";
    Key["TVInputVGA1"] = "TVInputVGA1";
    Key["TVMediaContext"] = "TVMediaContext";
    Key["TVNetwork"] = "TVNetwork";
    Key["TVNumberEntry"] = "TVNumberEntry";
    Key["TVPower"] = "TVPower";
    Key["TVRadioService"] = "TVRadioService";
    Key["TVSatellite"] = "TVSatellite";
    Key["TVSatelliteBS"] = "TVSatelliteBS";
    Key["TVSatelliteCS"] = "TVSatelliteCS";
    Key["TVSatelliteToggle"] = "TVSatelliteToggle";
    Key["TVTerrestrialAnalog"] = "TVTerrestrialAnalog";
    Key["TVTerrestrialDigital"] = "TVTerrestrialDigital";
    Key["TVTimer"] = "TVTimer";
    Key["AVRInput"] = "AVRInput";
    Key["AVRPower"] = "AVRPower";
    Key["ColorF0Red"] = "ColorF0Red";
    Key["ColorF1Green"] = "ColorF1Green";
    Key["ColorF2Yellow"] = "ColorF2Yellow";
    Key["ColorF3Blue"] = "ColorF3Blue";
    Key["ColorF4Grey"] = "ColorF4Grey";
    Key["ColorF5Brown"] = "ColorF5Brown";
    Key["ClosedCaptionToggle"] = "ClosedCaptionToggle";
    Key["Dimmer"] = "Dimmer";
    Key["DisplaySwap"] = "DisplaySwap";
    Key["DVR"] = "DVR";
    Key["Exit"] = "Exit";
    Key["FavoriteClear0"] = "FavoriteClear0";
    Key["FavoriteClear1"] = "FavoriteClear1";
    Key["FavoriteClear2"] = "FavoriteClear2";
    Key["FavoriteClear3"] = "FavoriteClear3";
    Key["FavoriteRecall0"] = "FavoriteRecall0";
    Key["FavoriteRecall1"] = "FavoriteRecall1";
    Key["FavoriteRecall2"] = "FavoriteRecall2";
    Key["FavoriteRecall3"] = "FavoriteRecall3";
    Key["FavoriteStore0"] = "FavoriteStore0";
    Key["FavoriteStore1"] = "FavoriteStore1";
    Key["FavoriteStore2"] = "FavoriteStore2";
    Key["FavoriteStore3"] = "FavoriteStore3";
    Key["Guide"] = "Guide";
    Key["GuideNextDay"] = "GuideNextDay";
    Key["GuidePreviousDay"] = "GuidePreviousDay";
    Key["Info"] = "Info";
    Key["InstantReplay"] = "InstantReplay";
    Key["Link"] = "Link";
    Key["ListProgram"] = "ListProgram";
    Key["LiveContent"] = "LiveContent";
    Key["Lock"] = "Lock";
    Key["MediaApps"] = "MediaApps";
    Key["MediaAudioTrack"] = "MediaAudioTrack";
    Key["MediaLast"] = "MediaLast";
    Key["MediaSkipBackward"] = "MediaSkipBackward";
    Key["MediaSkipForward"] = "MediaSkipForward";
    Key["MediaStepBackward"] = "MediaStepBackward";
    Key["MediaStepForward"] = "MediaStepForward";
    Key["MediaTopMenu"] = "MediaTopMenu";
    Key["NavigateIn"] = "NavigateIn";
    Key["NavigateNext"] = "NavigateNext";
    Key["NavigateOut"] = "NavigateOut";
    Key["NavigatePrevious"] = "NavigatePrevious";
    Key["NextFavoriteChannel"] = "NextFavoriteChannel";
    Key["NextUserProfile"] = "NextUserProfile";
    Key["OnDemand"] = "OnDemand";
    Key["Pairing"] = "Pairing";
    Key["PinPDown"] = "PinPDown";
    Key["PinPMove"] = "PinPMove";
    Key["PinPToggle"] = "PinPToggle";
    Key["PinPUp"] = "PinPUp";
    Key["PlaySpeedDown"] = "PlaySpeedDown";
    Key["PlaySpeedReset"] = "PlaySpeedReset";
    Key["PlaySpeedUp"] = "PlaySpeedUp";
    Key["RandomToggle"] = "RandomToggle";
    Key["RcLowBattery"] = "RcLowBattery";
    Key["RecordSpeedNext"] = "RecordSpeedNext";
    Key["RfBypass"] = "RfBypass";
    Key["ScanChannelsToggle"] = "ScanChannelsToggle";
    Key["ScreenModeNext"] = "ScreenModeNext";
    Key["Settings"] = "Settings";
    Key["SplitScreenToggle"] = "SplitScreenToggle";
    Key["STBInput"] = "STBInput";
    Key["STBPower"] = "STBPower";
    Key["Subtitle"] = "Subtitle";
    Key["Teletext"] = "Teletext";
    Key["VideoModeNext"] = "VideoModeNext";
    Key["Wink"] = "Wink";
    Key["ZoomToggle"] = "ZoomToggle";
    Key["SpeechCorrectionList"] = "SpeechCorrectionList";
    Key["SpeechInputToggle"] = "SpeechInputToggle";
    Key["Close"] = "Close";
    Key["New"] = "New";
    Key["Open"] = "Open";
    Key["Print"] = "Print";
    Key["Save"] = "Save";
    Key["SpellCheck"] = "SpellCheck";
    Key["MailForward"] = "MailForward";
    Key["MailReply"] = "MailReply";
    Key["MailSend"] = "MailSend";
    Key["LaunchCalculator"] = "LaunchCalculator";
    Key["LaunchCalendar"] = "LaunchCalendar";
    Key["LaunchContacts"] = "LaunchContacts";
    Key["LaunchMail"] = "LaunchMail";
    Key["LaunchMediaPlayer"] = "LaunchMediaPlayer";
    Key["LaunchMusicPlayer"] = "LaunchMusicPlayer";
    Key["LaunchMyComputer"] = "LaunchMyComputer";
    Key["LaunchPhone"] = "LaunchPhone";
    Key["LaunchScreenSaver"] = "LaunchScreenSaver";
    Key["LaunchSpreadsheet"] = "LaunchSpreadsheet";
    Key["LaunchWebBrowser"] = "LaunchWebBrowser";
    Key["LaunchWebCam"] = "LaunchWebCam";
    Key["LaunchWordProcessor"] = "LaunchWordProcessor";
    Key["LaunchApplication1"] = "LaunchApplication1";
    Key["LaunchApplication2"] = "LaunchApplication2";
    Key["LaunchApplication3"] = "LaunchApplication3";
    Key["LaunchApplication4"] = "LaunchApplication4";
    Key["LaunchApplication5"] = "LaunchApplication5";
    Key["LaunchApplication6"] = "LaunchApplication6";
    Key["LaunchApplication7"] = "LaunchApplication7";
    Key["LaunchApplication8"] = "LaunchApplication8";
    Key["LaunchApplication9"] = "LaunchApplication9";
    Key["LaunchApplication10"] = "LaunchApplication10";
    Key["LaunchApplication11"] = "LaunchApplication11";
    Key["LaunchApplication12"] = "LaunchApplication12";
    Key["LaunchApplication13"] = "LaunchApplication13";
    Key["LaunchApplication14"] = "LaunchApplication14";
    Key["LaunchApplication15"] = "LaunchApplication15";
    Key["LaunchApplication16"] = "LaunchApplication16";
    Key["BrowserBack"] = "BrowserBack";
    Key["BrowserFavorites"] = "BrowserFavorites";
    Key["BrowserForward"] = "BrowserForward";
    Key["BrowserHome"] = "BrowserHome";
    Key["BrowserRefresh"] = "BrowserRefresh";
    Key["BrowserSearch"] = "BrowserSearch";
    Key["BrowserStop"] = "BrowserStop";
    Key["Decimal"] = "Decimal";
    Key["Key11"] = "Key11";
    Key["Key12"] = "Key12";
    Key["Multiply"] = "Multiply";
    Key["Add"] = "Add";
    Key["Divide"] = "Divide";
    Key["Subtract"] = "Subtract";
    Key["Separator"] = "Separator";
  })(exports.Key || (exports.Key = {}));
})(Key_enum);
const getWindow$1 = () => "undefined" == typeof window ? void 0 : window;
const mergeEventHandlers = (...callbacks) => (event) => {
  for (let cb of callbacks) {
    cb == null ? void 0 : cb(event);
    if (event == null ? void 0 : event.defaultPrevented) return;
  }
};
const getTranslateValuesFromElement = (element) => {
  if (!element) return [];
  let transformValue = getComputedStyle(element).getPropertyValue("transform");
  return getTranslateValues(transformValue);
};
const getTranslateValues = (transformValue) => {
  let matrix = new DOMMatrix(transformValue);
  return [matrix.m41, matrix.m42];
};
const getBoundedValue = (val, min2, max2) => Math.min(max2, Math.max(min2, val));
const getRandomValue = (length = 21) => {
  let alphabet = "_-0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  for (let i = 0; i < length; i++) id += alphabet[64 * Math.random() | 0];
  return id;
};
const useEventListener = (eventName, handler, element) => {
  let savedHandler = reactExports.useRef();
  reactExports.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  reactExports.useEffect(() => {
    if (!element) return;
    let eventListener = (event) => {
      var _a2;
      return (_a2 = savedHandler.current) == null ? void 0 : _a2.call(savedHandler, event);
    };
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};
const mergeRefs = (...refs) => (instance) => {
  refs.forEach((ref) => {
    if ("function" == typeof ref) ref(instance);
    else if (ref) ref.current = instance;
  });
};
const useMergedRefs = (...refs) => reactExports.useCallback(mergeRefs(...refs), [...refs]);
const useResizeObserver = (onResize) => {
  let resizeObserver = reactExports.useRef();
  let elementRef = reactExports.useCallback(
    (element) => {
      var _a2, _b, _c, _d, _e;
      if (!((_a2 = getWindow$1()) == null ? void 0 : _a2.ResizeObserver)) return;
      (_c = (_b = resizeObserver.current) == null ? void 0 : _b.disconnect) == null ? void 0 : _c.call(_b);
      if (element) {
        resizeObserver.current = new ResizeObserver((entries) => {
          window.requestAnimationFrame(() => {
            if (!Array.isArray(entries) || !entries.length) return;
            let [{ contentRect }] = entries;
            return onResize(contentRect);
          });
        });
        (_e = (_d = resizeObserver.current) == null ? void 0 : _d.observe) == null ? void 0 : _e.call(_d, element);
      }
    },
    [onResize]
  );
  return [elementRef, resizeObserver.current];
};
let useIsomorphicLayoutEffect = "undefined" != typeof window ? reactExports.useLayoutEffect : reactExports.useEffect;
let STARTING_MAX_ITEMS_COUNT = 20;
const useOverflow = (itemsCount, disabled = false, orientation = "horizontal") => {
  let containerRef = reactExports.useRef(null);
  let [visibleCount, setVisibleCount] = reactExports.useState(
    () => disabled ? itemsCount : Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT)
  );
  let needsFullRerender = reactExports.useRef(true);
  let [containerSize, setContainerSize] = reactExports.useState(0);
  let previousContainerSize = reactExports.useRef(0);
  let updateContainerSize = reactExports.useCallback(
    ({ width, height }) => setContainerSize("horizontal" === orientation ? width : height),
    [orientation]
  );
  let [resizeRef, observer] = useResizeObserver(updateContainerSize);
  let resizeObserverRef = reactExports.useRef(observer);
  useIsomorphicLayoutEffect(() => {
    if (disabled) setVisibleCount(itemsCount);
    else {
      setVisibleCount(Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT));
      needsFullRerender.current = true;
    }
  }, [containerSize, disabled, itemsCount]);
  let mergedRefs = useMergedRefs(containerRef, resizeRef);
  useIsomorphicLayoutEffect(() => {
    var _a2;
    if (!containerRef.current || disabled) {
      (_a2 = resizeObserverRef.current) == null ? void 0 : _a2.disconnect();
      return;
    }
    let dimension = "horizontal" === orientation ? "Width" : "Height";
    let availableSize = containerRef.current[`offset${dimension}`];
    let requiredSize = containerRef.current[`scroll${dimension}`];
    if (availableSize < requiredSize) {
      let avgItemSize = requiredSize / visibleCount;
      let visibleItems = Math.floor(availableSize / avgItemSize);
      setVisibleCount(visibleItems > 0 ? visibleItems : 1);
    } else if (needsFullRerender.current) {
      let childrenSize = Array.from(containerRef.current.children).reduce(
        (sum, child) => sum + child[`offset${dimension}`],
        0
      );
      let currentVisibleCount = visibleCount || Math.min(itemsCount, STARTING_MAX_ITEMS_COUNT);
      let avgItemSize = childrenSize / currentVisibleCount;
      let visibleItems = Math.floor(availableSize / avgItemSize);
      if (!isNaN(visibleItems))
        setVisibleCount(Math.min(itemsCount, 2 * visibleItems));
    }
    needsFullRerender.current = false;
  }, [containerSize, visibleCount, disabled, itemsCount, orientation]);
  useIsomorphicLayoutEffect(() => {
    previousContainerSize.current = containerSize;
  }, [containerSize]);
  return [mergedRefs, visibleCount];
};
const ThemeContext = reactExports.createContext(void 0);
let isJest = "undefined" != typeof jest;
let isCypress = void 0 !== globalThis.Cypress;
let isMocha = void 0 !== globalThis.beforeEach && "function(name,fn){suites[0].beforeEach(name,fn);}" === `${globalThis.beforeEach}`.replace(/\s/g, "") && !isCypress;
let isVitest = void 0 !== globalThis.__vitest_index__;
let isUnitTest = isJest || isVitest || isMocha;
const useGlobals = () => {
  let themeContext = reactExports.useContext(ThemeContext);
  useThemeProviderWarning(themeContext);
  useRootFontSizeWarning();
  return themeContext;
};
const useThemeProviderWarning = (themeContext) => {
  reactExports.useEffect(() => {
  }, [themeContext]);
};
let useRootFontSizeWarning = () => {
  reactExports.useEffect(() => {
  }, []);
};
let _React$1 = React;
const useSyncExternalStore = _React$1.useSyncExternalStore || useSyncExternalStoreShim;
function useSyncExternalStoreShim(subscribe, getSnapshot) {
  let value = getSnapshot();
  let [{ instance }, forceUpdate] = reactExports.useState({
    instance: {
      value,
      getSnapshot
    }
  });
  reactExports.useLayoutEffect(() => {
    instance.value = value;
    instance.getSnapshot = getSnapshot;
    if (!Object.is(value, getSnapshot()))
      forceUpdate({
        instance
      });
  }, [subscribe, value, getSnapshot]);
  reactExports.useEffect(() => {
    let synchronize = () => {
      if (!Object.is(instance.value, instance.getSnapshot()))
        forceUpdate({
          instance
        });
    };
    synchronize();
    return subscribe(synchronize);
  }, [subscribe]);
  return value;
}
const useMediaQuery = (queryString) => {
  let getSnapshot = reactExports.useCallback(
    () => {
      var _a2;
      return "undefined" != typeof window ? (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, queryString).matches : void 0;
    },
    [queryString]
  );
  let subscribe = reactExports.useCallback(
    (onChange) => {
      var _a2, _b;
      let mediaQueryList = (_a2 = window.matchMedia) == null ? void 0 : _a2.call(window, queryString);
      (_b = mediaQueryList == null ? void 0 : mediaQueryList.addEventListener) == null ? void 0 : _b.call(mediaQueryList, "change", onChange);
      return () => {
        var _a3;
        return (_a3 = mediaQueryList == null ? void 0 : mediaQueryList.removeEventListener) == null ? void 0 : _a3.call(mediaQueryList, "change", onChange);
      };
    },
    [queryString]
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => void 0);
};
const useSafeContext = (context) => {
  let value = reactExports.useContext(context);
  if (!value)
    throw new Error(`${context.displayName || "Context"} is undefined`);
  return value;
};
const useLatestRef$2 = (value) => {
  let valueRef = reactExports.useRef(value);
  reactExports.useEffect(() => {
    valueRef.current = value;
  }, [value]);
  return valueRef;
};
const useIsClient = () => {
  let [isClient, setIsClient] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setIsClient(true);
  }, []);
  return isClient;
};
const useId$1 = () => {
  let uniqueValue = useUniqueValue();
  return reactExports.useMemo(() => `iui-${uniqueValue}`, [uniqueValue]);
};
let _React = React;
let useUniqueValue = _React.useId ?? (() => reactExports.useMemo(() => getRandomValue(10), []));
const useControlledState = (initialValue, controlledState, setControlledState) => {
  let [uncontrolledState, setUncontrolledState] = reactExports.useState(initialValue);
  let state = reactExports.useMemo(
    () => void 0 !== controlledState ? controlledState : uncontrolledState,
    [controlledState, uncontrolledState]
  );
  let setState = reactExports.useCallback(
    (value) => {
      setUncontrolledState(value);
      setControlledState == null ? void 0 : setControlledState(value);
    },
    [setControlledState, setUncontrolledState]
  );
  return [state, setState];
};
let tabbableElementsSelector = 'a[href], button, input, textarea, select, details, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])';
const getTabbableElements = (container) => {
  if (!container) return [];
  let elements = container.querySelectorAll(tabbableElementsSelector);
  return Array.from(elements).filter(
    (el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled")
  );
};
const getFocusableElements = (container) => {
  if (!container) return [];
  let elements = container.querySelectorAll(
    `${tabbableElementsSelector}, [tabindex="-1"]`
  );
  return Array.from(elements).filter(
    (el) => !el.hasAttribute("disabled") && !el.classList.contains("iui-disabled") && "true" !== el.getAttribute("aria-disabled")
  );
};
function useFocusableElements(root, extraOptions) {
  let focusableElementsRef = reactExports.useRef([]);
  let [focusableElements, setFocusableElements] = reactExports.useState(
    focusableElementsRef.current
  );
  let setFocusableElementsRefAndState = (newFocusableElements) => {
    focusableElementsRef.current = newFocusableElements;
    setFocusableElements(newFocusableElements);
  };
  let { filter: filterProp } = extraOptions ?? {};
  let filter = useLatestRef$2(filterProp);
  let returnValue = reactExports.useMemo(
    () => ({
      focusableElementsRef,
      focusableElements
    }),
    [focusableElementsRef, focusableElements]
  );
  return useSyncExternalStore(
    reactExports.useCallback(() => {
      if (!root) {
        setFocusableElementsRefAndState([]);
        return () => {
        };
      }
      updateFocusableElements();
      let observer = new MutationObserver(() => updateFocusableElements());
      observer.observe(root, {
        childList: true,
        subtree: true
      });
      return () => observer.disconnect();
      function updateFocusableElements() {
        var _a2;
        let newFocusableElements = getFocusableElements(root);
        if (filter.current)
          newFocusableElements = (_a2 = filter.current) == null ? void 0 : _a2.call(filter, newFocusableElements);
        setFocusableElementsRefAndState(newFocusableElements);
      }
    }, [root, filter]),
    () => returnValue,
    () => returnValue
  );
}
const t = "3.15.5";
const u = new Proxy(
  {},
  {
    get(e, i) {
      if (typeof i == "string" && i.startsWith("iui-"))
        return i.replace("iui-", `_iui${t.replace(/\./g, "")}-`);
    },
    has(e, i) {
      return typeof i == "string" && i.startsWith("iui-");
    }
  }
);
let _base = (defaultElement) => (className, attrs) => {
  let Comp = reactExports.forwardRef(({ as = defaultElement, ...props }, ref) => {
    props = {
      ...attrs,
      ...props,
      className: getScopedClassName(
        classnames(className, attrs == null ? void 0 : attrs.className, props.className)
      )
    };
    let Element2 = as || "div";
    if ("button" === Element2 || "a" === Element2 || "input" === Element2 && "checkbox" === props.type) {
      var _props;
      (_props = props).tabIndex ?? (_props.tabIndex = 0);
    }
    useGlobals();
    return reactExports.createElement(Element2, {
      ref,
      ...props
    });
  });
  return Comp;
};
const polymorphic = new Proxy(
  {},
  {
    get: (target, prop) => {
      if ("string" == typeof prop) return _base(prop);
      return Reflect.get(target, prop);
    }
  }
);
let getScopedClassName = (className = "") => className.split(" ").map((c) => c in u ? u[c] : c).join(" ") || null;
const importCss = async (url) => {
  try {
    return await new Function(
      `return import("${url}", { with: { type: "css" } })`
    )();
  } catch {
    try {
      return await new Function(
        `return import("${url}", { assert: { type: "css" } })`
      )();
    } catch {
      return await fetch(url).then((res) => res.text()).then((cssText) => {
        let stylesheet = new CSSStyleSheet();
        stylesheet.replaceSync(cssText);
        return {
          default: stylesheet
        };
      });
    }
  }
};
const cloneElementWithRef = (children, getProps) => {
  if (!children) return null;
  if (!reactExports.isValidElement(children)) return children;
  let props = getProps(children);
  let ref = mergeRefs(
    ...[
      "ref" in children ? children.ref : null,
      "ref" in props ? props.ref : null
    ].filter(Boolean)
  );
  return reactExports.cloneElement(children, {
    ...props,
    ref
  });
};
const Resizer = (props) => reactExports.createElement(
  "div",
  {
    style: {
      position: "absolute",
      inset: -6,
      display: "grid",
      pointerEvents: "none"
    }
  },
  reactExports.createElement(ResizerStyles, null),
  reactExports.createElement(Resizers, props)
);
let Resizers = (props) => {
  let { elementRef, containerRef, onResizeStart, onResizeEnd } = props;
  let isResizing = reactExports.useRef(false);
  let onResizePointerDown = (event) => {
    if (!elementRef.current || 0 !== event.button) return;
    let initialPointerX = event.clientX;
    let initialPointerY = event.clientY;
    let [initialTranslateX, initialTranslateY] = getTranslateValuesFromElement(
      elementRef.current
    );
    let { width: initialWidth, height: initialHeight } = elementRef.current.getBoundingClientRect();
    let width = `${initialWidth}px`;
    let height = `${initialHeight}px`;
    let translateX = initialTranslateX;
    let translateY = initialTranslateY;
    let minWidth = parseFloat(getComputedStyle(elementRef.current).minWidth);
    if (Number.isNaN(minWidth)) minWidth = 380;
    let minHeight = parseFloat(getComputedStyle(elementRef.current).minHeight);
    let resizer = event.currentTarget.dataset.iuiResizer;
    let ownerDocument = elementRef.current.ownerDocument || document;
    let originalUserSelect = ownerDocument.body.style.userSelect;
    ownerDocument.body.style.userSelect = "none";
    let onResizePointerMove = (event2) => {
      var _a2;
      if (!elementRef.current) return;
      if (!isResizing.current) {
        isResizing.current = true;
        onResizeStart == null ? void 0 : onResizeStart();
      }
      let containerRect = (_a2 = containerRef == null ? void 0 : containerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
      let clientX = getBoundedValue(
        event2.clientX,
        (containerRect == null ? void 0 : containerRect.left) ?? 0,
        (containerRect == null ? void 0 : containerRect.right) ?? ownerDocument.documentElement.clientWidth ?? 0
      );
      let clientY = getBoundedValue(
        event2.clientY,
        (containerRect == null ? void 0 : containerRect.top) ?? 0,
        (containerRect == null ? void 0 : containerRect.bottom) ?? ownerDocument.documentElement.clientHeight ?? 0
      );
      let diffX = initialPointerX - clientX;
      let diffY = initialPointerY - clientY;
      switch (resizer) {
        case "top-left": {
          let newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          let newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "top": {
          let newHeight = initialHeight + diffY;
          if (newHeight < minHeight) break;
          height = elementRef.current.style.height = `${newHeight}px`;
          translateY = initialTranslateY - diffY;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "top-right": {
          let newHeight = initialHeight + diffY;
          if (newHeight >= minHeight) {
            height = elementRef.current.style.height = `${newHeight}px`;
            translateY = initialTranslateY - diffY;
          }
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "right":
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom-right":
          width = elementRef.current.style.width = `${initialWidth - diffX}px`;
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom":
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        case "bottom-left": {
          let newWidth = initialWidth + diffX;
          if (newWidth >= minWidth) {
            width = elementRef.current.style.width = `${newWidth}px`;
            translateX = initialTranslateX - diffX;
          }
          height = elementRef.current.style.height = `${initialHeight - diffY}px`;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
        case "left": {
          let newWidth = initialWidth + diffX;
          if (newWidth < minWidth) break;
          width = elementRef.current.style.width = `${newWidth}px`;
          height = elementRef.current.style.height = `${initialHeight}px`;
          translateX = initialTranslateX - diffX;
          elementRef.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
          break;
        }
      }
    };
    ownerDocument.addEventListener("pointermove", onResizePointerMove);
    ownerDocument.addEventListener(
      "pointerup",
      () => {
        ownerDocument.removeEventListener("pointermove", onResizePointerMove);
        if (elementRef.current) {
          ownerDocument.body.style.userSelect = originalUserSelect;
          isResizing.current = false;
          onResizeEnd == null ? void 0 : onResizeEnd({
            width,
            height,
            transform: `translate(${translateX}px, ${translateY}px)`
          });
        }
      },
      {
        once: true
      }
    );
  };
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("div", {
      "data-iui-resizer": "top-left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "nw-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "top",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "n-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "top-right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "ne-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "e-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom-right",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "se-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "s-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "bottom-left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "sw-resize"
      }
    }),
    reactExports.createElement("div", {
      "data-iui-resizer": "left",
      onPointerDown: onResizePointerDown,
      style: {
        cursor: "w-resize"
      }
    })
  );
};
let ResizerStyles = reactExports.memo(
  () => reactExports.createElement("style", null, resizerStyles)
);
let resizerStyles = `
[data-iui-resizer] {
  pointer-events: auto;
  grid-area: 1 / 1 / -1 / -1;
  width: 12px;
  height: 12px;
  z-index: 1;
}
[data-iui-resizer='top'],
[data-iui-resizer='bottom'] {
  height: 8px;
  width: auto;
  z-index: 0;
}
[data-iui-resizer='left'],
[data-iui-resizer='right'] {
  height: auto;
  width: 8px;
  z-index: 0;
}
[data-iui-resizer^='top'] {
  align-self: start;
}
[data-iui-resizer^='bottom'] {
  align-self: end;
}
[data-iui-resizer$='left'] {
  justify-self: start;
}
[data-iui-resizer$='right'] {
  justify-self: end;
}`;
const FocusTrap = (props) => {
  let { children } = props;
  let childRef = reactExports.useRef();
  let getFirstLastFocusables = () => {
    let elements = getTabbableElements(childRef.current);
    let firstElement = elements[0];
    let lastElement = elements[(elements.length || 1) - 1];
    return [firstElement, lastElement];
  };
  let onFirstFocus = (event) => {
    let [firstElement, lastElement] = getFirstLastFocusables();
    if (event.relatedTarget === firstElement) lastElement == null ? void 0 : lastElement.focus();
    else firstElement == null ? void 0 : firstElement.focus();
  };
  let onLastFocus = (event) => {
    let [firstElement, lastElement] = getFirstLastFocusables();
    if (event.relatedTarget === lastElement) firstElement == null ? void 0 : firstElement.focus();
    else lastElement == null ? void 0 : lastElement.focus();
  };
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement("div", {
      tabIndex: 0,
      onFocus: onFirstFocus,
      "aria-hidden": true
    }),
    reactExports.cloneElement(children, {
      ref: mergeRefs(children.ref, childRef)
    }),
    reactExports.createElement("div", {
      tabIndex: 0,
      onFocus: onLastFocus,
      "aria-hidden": true
    })
  );
};
const Box = polymorphic.div("");
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle$1(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element) {
  return ["table", "td", "th"].includes(getNodeName(element));
}
function isTopLayer$1(element) {
  return [":popover-open", ":modal"].some((selector) => {
    try {
      return element.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function isContainingBlock(elementOrCss) {
  const webkit = isWebKit();
  const css2 = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
  return css2.transform !== "none" || css2.perspective !== "none" || (css2.containerType ? css2.containerType !== "normal" : false) || !webkit && (css2.backdropFilter ? css2.backdropFilter !== "none" : false) || !webkit && (css2.filter ? css2.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css2.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css2.contain || "").includes(value));
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer$1(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports) return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
function activeElement(doc) {
  let activeElement2 = doc.activeElement;
  while (((_activeElement = activeElement2) == null || (_activeElement = _activeElement.shadowRoot) == null ? void 0 : _activeElement.activeElement) != null) {
    var _activeElement;
    activeElement2 = activeElement2.shadowRoot.activeElement;
  }
  return activeElement2;
}
function contains(parent, child) {
  if (!parent || !child) {
    return false;
  }
  const rootNode = child.getRootNode == null ? void 0 : child.getRootNode();
  if (parent.contains(child)) {
    return true;
  }
  if (rootNode && isShadowRoot(rootNode)) {
    let next = child;
    while (next) {
      if (parent === next) {
        return true;
      }
      next = next.parentNode || next.host;
    }
  }
  return false;
}
function getPlatform() {
  const uaData = navigator.userAgentData;
  if (uaData != null && uaData.platform) {
    return uaData.platform;
  }
  return navigator.platform;
}
function getUserAgent() {
  const uaData = navigator.userAgentData;
  if (uaData && Array.isArray(uaData.brands)) {
    return uaData.brands.map((_ref) => {
      let {
        brand,
        version
      } = _ref;
      return brand + "/" + version;
    }).join(" ");
  }
  return navigator.userAgent;
}
function isVirtualClick(event) {
  if (event.mozInputSource === 0 && event.isTrusted) {
    return true;
  }
  if (isAndroid() && event.pointerType) {
    return event.type === "click" && event.buttons === 1;
  }
  return event.detail === 0 && !event.pointerType;
}
function isVirtualPointerEvent(event) {
  if (isJSDOM()) return false;
  return !isAndroid() && event.width === 0 && event.height === 0 || isAndroid() && event.width === 1 && event.height === 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "mouse" || // iOS VoiceOver returns 0.333• for width/height.
  event.width < 1 && event.height < 1 && event.pressure === 0 && event.detail === 0 && event.pointerType === "touch";
}
function isSafari() {
  return /apple/i.test(navigator.vendor);
}
function isAndroid() {
  const re = /android/i;
  return re.test(getPlatform()) || re.test(getUserAgent());
}
function isMac() {
  return getPlatform().toLowerCase().startsWith("mac") && !navigator.maxTouchPoints;
}
function isJSDOM() {
  return getUserAgent().includes("jsdom/");
}
function isMouseLikePointerType(pointerType, strict) {
  const values = ["mouse", "pen"];
  if (!strict) {
    values.push("", void 0);
  }
  return values.includes(pointerType);
}
function isReactEvent(event) {
  return "nativeEvent" in event;
}
function isRootElement(element) {
  return element.matches("html,body");
}
function getDocument(node) {
  return (node == null ? void 0 : node.ownerDocument) || document;
}
function isEventTargetWithin(event, node) {
  if (node == null) {
    return false;
  }
  if ("composedPath" in event) {
    return event.composedPath().includes(node);
  }
  const e = event;
  return e.target != null && node.contains(e.target);
}
function getTarget(event) {
  if ("composedPath" in event) {
    return event.composedPath()[0];
  }
  return event.target;
}
const TYPEABLE_SELECTOR = "input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])";
function isTypeableElement(element) {
  return isHTMLElement(element) && element.matches(TYPEABLE_SELECTOR);
}
function stopEvent(event) {
  event.preventDefault();
  event.stopPropagation();
}
function isTypeableCombobox(element) {
  if (!element) return false;
  return element.getAttribute("role") === "combobox" && isTypeableElement(element);
}
const sides = ["top", "right", "bottom", "left"];
const alignments = ["start", "end"];
const placements = /* @__PURE__ */ sides.reduce((acc, side) => acc.concat(side, side + "-" + alignments[0], side + "-" + alignments[1]), []);
const min = Math.min;
const max = Math.max;
const round = Math.round;
const floor = Math.floor;
const createCoords = (v) => ({
  x: v,
  y: v
});
const oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
const oppositeAlignmentMap = {
  start: "end",
  end: "start"
};
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x,
    y,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    x,
    y
  };
}
/*!
* tabbable 6.2.0
* @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
*/
var candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
var candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
var NoElement = typeof Element === "undefined";
var matches = NoElement ? function() {
} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
var getRootNode = !NoElement && Element.prototype.getRootNode ? function(element) {
  var _element$getRootNode;
  return element === null || element === void 0 ? void 0 : (_element$getRootNode = element.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element);
} : function(element) {
  return element === null || element === void 0 ? void 0 : element.ownerDocument;
};
var isInert = function isInert2(node, lookUp) {
  var _node$getAttribute;
  if (lookUp === void 0) {
    lookUp = true;
  }
  var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
  var inert = inertAtt === "" || inertAtt === "true";
  var result = inert || lookUp && node && isInert2(node.parentNode);
  return result;
};
var isContentEditable = function isContentEditable2(node) {
  var _node$getAttribute2;
  var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
  return attValue === "" || attValue === "true";
};
var getCandidates = function getCandidates2(el, includeContainer, filter) {
  if (isInert(el)) {
    return [];
  }
  var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
  if (includeContainer && matches.call(el, candidateSelector)) {
    candidates.unshift(el);
  }
  candidates = candidates.filter(filter);
  return candidates;
};
var getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options) {
  var candidates = [];
  var elementsToCheck = Array.from(elements);
  while (elementsToCheck.length) {
    var element = elementsToCheck.shift();
    if (isInert(element, false)) {
      continue;
    }
    if (element.tagName === "SLOT") {
      var assigned = element.assignedElements();
      var content = assigned.length ? assigned : element.children;
      var nestedCandidates = getCandidatesIteratively2(content, true, options);
      if (options.flatten) {
        candidates.push.apply(candidates, nestedCandidates);
      } else {
        candidates.push({
          scopeParent: element,
          candidates: nestedCandidates
        });
      }
    } else {
      var validCandidate = matches.call(element, candidateSelector);
      if (validCandidate && options.filter(element) && (includeContainer || !elements.includes(element))) {
        candidates.push(element);
      }
      var shadowRoot = element.shadowRoot || // check for an undisclosed shadow
      typeof options.getShadowRoot === "function" && options.getShadowRoot(element);
      var validShadowRoot = !isInert(shadowRoot, false) && (!options.shadowRootFilter || options.shadowRootFilter(element));
      if (shadowRoot && validShadowRoot) {
        var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element.children : shadowRoot.children, true, options);
        if (options.flatten) {
          candidates.push.apply(candidates, _nestedCandidates);
        } else {
          candidates.push({
            scopeParent: element,
            candidates: _nestedCandidates
          });
        }
      } else {
        elementsToCheck.unshift.apply(elementsToCheck, element.children);
      }
    }
  }
  return candidates;
};
var hasTabIndex = function hasTabIndex2(node) {
  return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
};
var getTabIndex = function getTabIndex2(node) {
  if (!node) {
    throw new Error("No node provided");
  }
  if (node.tabIndex < 0) {
    if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
      return 0;
    }
  }
  return node.tabIndex;
};
var getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
  var tabIndex = getTabIndex(node);
  if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
    return 0;
  }
  return tabIndex;
};
var sortOrderedTabbables = function sortOrderedTabbables2(a, b) {
  return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
};
var isInput = function isInput2(node) {
  return node.tagName === "INPUT";
};
var isHiddenInput = function isHiddenInput2(node) {
  return isInput(node) && node.type === "hidden";
};
var isDetailsWithSummary = function isDetailsWithSummary2(node) {
  var r = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
    return child.tagName === "SUMMARY";
  });
  return r;
};
var getCheckedRadio = function getCheckedRadio2(nodes, form) {
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i].checked && nodes[i].form === form) {
      return nodes[i];
    }
  }
};
var isTabbableRadio = function isTabbableRadio2(node) {
  if (!node.name) {
    return true;
  }
  var radioScope = node.form || getRootNode(node);
  var queryRadios = function queryRadios2(name) {
    return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
  };
  var radioSet;
  if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
    radioSet = queryRadios(window.CSS.escape(node.name));
  } else {
    try {
      radioSet = queryRadios(node.name);
    } catch (err) {
      console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
      return false;
    }
  }
  var checked = getCheckedRadio(radioSet, node.form);
  return !checked || checked === node;
};
var isRadio = function isRadio2(node) {
  return isInput(node) && node.type === "radio";
};
var isNonTabbableRadio = function isNonTabbableRadio2(node) {
  return isRadio(node) && !isTabbableRadio(node);
};
var isNodeAttached = function isNodeAttached2(node) {
  var _nodeRoot;
  var nodeRoot = node && getRootNode(node);
  var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
  var attached = false;
  if (nodeRoot && nodeRoot !== node) {
    var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
    attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
    while (!attached && nodeRootHost) {
      var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
      nodeRoot = getRootNode(nodeRootHost);
      nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
      attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
    }
  }
  return attached;
};
var isZeroArea = function isZeroArea2(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
  return width === 0 && height === 0;
};
var isHidden = function isHidden2(node, _ref) {
  var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
  if (getComputedStyle(node).visibility === "hidden") {
    return true;
  }
  var isDirectSummary = matches.call(node, "details>summary:first-of-type");
  var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
  if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
    return true;
  }
  if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
    if (typeof getShadowRoot === "function") {
      var originalNode = node;
      while (node) {
        var parentElement = node.parentElement;
        var rootNode = getRootNode(node);
        if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
          return isZeroArea(node);
        } else if (node.assignedSlot) {
          node = node.assignedSlot;
        } else if (!parentElement && rootNode !== node.ownerDocument) {
          node = rootNode.host;
        } else {
          node = parentElement;
        }
      }
      node = originalNode;
    }
    if (isNodeAttached(node)) {
      return !node.getClientRects().length;
    }
    if (displayCheck !== "legacy-full") {
      return true;
    }
  } else if (displayCheck === "non-zero-area") {
    return isZeroArea(node);
  }
  return false;
};
var isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
  if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
    var parentNode = node.parentElement;
    while (parentNode) {
      if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
        for (var i = 0; i < parentNode.children.length; i++) {
          var child = parentNode.children.item(i);
          if (child.tagName === "LEGEND") {
            return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
          }
        }
        return true;
      }
      parentNode = parentNode.parentElement;
    }
  }
  return false;
};
var isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options, node) {
  if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
  //  because we're limited in the type of selectors we can use in JSDom (see related
  //  note related to `candidateSelectors`)
  isInert(node) || isHiddenInput(node) || isHidden(node, options) || // For a details element with a summary, the summary element gets the focus
  isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
    return false;
  }
  return true;
};
var isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options, node) {
  if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options, node)) {
    return false;
  }
  return true;
};
var isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
  var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
  if (isNaN(tabIndex) || tabIndex >= 0) {
    return true;
  }
  return false;
};
var sortByOrder = function sortByOrder2(candidates) {
  var regularTabbables = [];
  var orderedTabbables = [];
  candidates.forEach(function(item, i) {
    var isScope = !!item.scopeParent;
    var element = isScope ? item.scopeParent : item;
    var candidateTabindex = getSortOrderTabIndex(element, isScope);
    var elements = isScope ? sortByOrder2(item.candidates) : element;
    if (candidateTabindex === 0) {
      isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element);
    } else {
      orderedTabbables.push({
        documentOrder: i,
        tabIndex: candidateTabindex,
        item,
        isScope,
        content: elements
      });
    }
  });
  return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
    sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
    return acc;
  }, []).concat(regularTabbables);
};
var tabbable = function tabbable2(container, options) {
  options = options || {};
  var candidates;
  if (options.getShadowRoot) {
    candidates = getCandidatesIteratively([container], options.includeContainer, {
      filter: isNodeMatchingSelectorTabbable.bind(null, options),
      flatten: false,
      getShadowRoot: options.getShadowRoot,
      shadowRootFilter: isValidShadowRootTabbable
    });
  } else {
    candidates = getCandidates(container, options.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options));
  }
  return sortByOrder(candidates);
};
var isTabbable = function isTabbable2(node, options) {
  options = options || {};
  if (!node) {
    throw new Error("No node provided");
  }
  if (matches.call(node, candidateSelector) === false) {
    return false;
  }
  return isNodeMatchingSelectorTabbable(options, node);
};
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
const computePosition$1 = async (reference, floating, config2) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config2;
  const validMiddleware = middleware.filter(Boolean);
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x,
    y
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let middlewareData = {};
  let resetCount = 0;
  for (let i = 0; i < validMiddleware.length; i++) {
    const {
      name,
      fn
    } = validMiddleware[i];
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x,
      y,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platform2,
      elements: {
        reference,
        floating
      }
    });
    x = nextX != null ? nextX : x;
    y = nextY != null ? nextY : y;
    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data
      }
    };
    if (reset && resetCount <= 50) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x,
          y
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i = -1;
      continue;
    }
  }
  return {
    x,
    y,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x,
    y,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x,
    y
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
function getPlacementList(alignment, autoAlignment, allowedPlacements) {
  const allowedPlacementsSortedByAlignment = alignment ? [...allowedPlacements.filter((placement) => getAlignment(placement) === alignment), ...allowedPlacements.filter((placement) => getAlignment(placement) !== alignment)] : allowedPlacements.filter((placement) => getSide(placement) === placement);
  return allowedPlacementsSortedByAlignment.filter((placement) => {
    if (alignment) {
      return getAlignment(placement) === alignment || (autoAlignment ? getOppositeAlignmentPlacement(placement) !== placement : false);
    }
    return true;
  });
}
const autoPlacement$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "autoPlacement",
    options,
    async fn(state) {
      var _middlewareData$autoP, _middlewareData$autoP2, _placementsThatFitOnE;
      const {
        rects,
        middlewareData,
        placement,
        platform: platform2,
        elements
      } = state;
      const {
        crossAxis = false,
        alignment,
        allowedPlacements = placements,
        autoAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      const placements$1 = alignment !== void 0 || allowedPlacements === placements ? getPlacementList(alignment || null, autoAlignment, allowedPlacements) : allowedPlacements;
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const currentIndex = ((_middlewareData$autoP = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP.index) || 0;
      const currentPlacement = placements$1[currentIndex];
      if (currentPlacement == null) {
        return {};
      }
      const alignmentSides = getAlignmentSides(currentPlacement, rects, await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)));
      if (placement !== currentPlacement) {
        return {
          reset: {
            placement: placements$1[0]
          }
        };
      }
      const currentOverflows = [overflow[getSide(currentPlacement)], overflow[alignmentSides[0]], overflow[alignmentSides[1]]];
      const allOverflows = [...((_middlewareData$autoP2 = middlewareData.autoPlacement) == null ? void 0 : _middlewareData$autoP2.overflows) || [], {
        placement: currentPlacement,
        overflows: currentOverflows
      }];
      const nextPlacement = placements$1[currentIndex + 1];
      if (nextPlacement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: nextPlacement
          }
        };
      }
      const placementsSortedByMostSpace = allOverflows.map((d) => {
        const alignment2 = getAlignment(d.placement);
        return [d.placement, alignment2 && crossAxis ? (
          // Check along the mainAxis and main crossAxis side.
          d.overflows.slice(0, 2).reduce((acc, v) => acc + v, 0)
        ) : (
          // Check only the mainAxis.
          d.overflows[0]
        ), d.overflows];
      }).sort((a, b) => a[1] - b[1]);
      const placementsThatFitOnEachSide = placementsSortedByMostSpace.filter((d) => d[2].slice(
        0,
        // Aligned placements should not check their opposite crossAxis
        // side.
        getAlignment(d[0]) ? 2 : 3
      ).every((v) => v <= 0));
      const resetPlacement = ((_placementsThatFitOnE = placementsThatFitOnEachSide[0]) == null ? void 0 : _placementsThatFitOnE[0]) || placementsSortedByMostSpace[0][0];
      if (resetPlacement !== placement) {
        return {
          data: {
            index: currentIndex + 1,
            overflows: allOverflows
          },
          reset: {
            placement: resetPlacement
          }
        };
      }
      return {};
    }
  };
};
const flip$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          return {
            data: {
              index: nextIndex,
              overflows: overflowsData
            },
            reset: {
              placement: nextPlacement
            }
          };
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$map$so;
              const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
function getSideOffsets(overflow, rect) {
  return {
    top: overflow.top - rect.height,
    right: overflow.right - rect.width,
    bottom: overflow.bottom - rect.height,
    left: overflow.left - rect.width
  };
}
function isAnySideFullyClipped(overflow) {
  return sides.some((side) => overflow[side] >= 0);
}
const hide$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "hide",
    options,
    async fn(state) {
      const {
        rects
      } = state;
      const {
        strategy = "referenceHidden",
        ...detectOverflowOptions
      } = evaluate(options, state);
      switch (strategy) {
        case "referenceHidden": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            elementContext: "reference"
          });
          const offsets = getSideOffsets(overflow, rects.reference);
          return {
            data: {
              referenceHiddenOffsets: offsets,
              referenceHidden: isAnySideFullyClipped(offsets)
            }
          };
        }
        case "escaped": {
          const overflow = await detectOverflow(state, {
            ...detectOverflowOptions,
            altBoundary: true
          });
          const offsets = getSideOffsets(overflow, rects.floating);
          return {
            data: {
              escapedOffsets: offsets,
              escaped: isAnySideFullyClipped(offsets)
            }
          };
        }
        default: {
          return {};
        }
      }
    }
  };
};
function getBoundingRect(rects) {
  const minX = min(...rects.map((rect) => rect.left));
  const minY = min(...rects.map((rect) => rect.top));
  const maxX = max(...rects.map((rect) => rect.right));
  const maxY = max(...rects.map((rect) => rect.bottom));
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
function getRectsByLine(rects) {
  const sortedRects = rects.slice().sort((a, b) => a.y - b.y);
  const groups = [];
  let prevRect = null;
  for (let i = 0; i < sortedRects.length; i++) {
    const rect = sortedRects[i];
    if (!prevRect || rect.y - prevRect.y > prevRect.height / 2) {
      groups.push([rect]);
    } else {
      groups[groups.length - 1].push(rect);
    }
    prevRect = rect;
  }
  return groups.map((rect) => rectToClientRect(getBoundingRect(rect)));
}
const inline$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "inline",
    options,
    async fn(state) {
      const {
        placement,
        elements,
        rects,
        platform: platform2,
        strategy
      } = state;
      const {
        padding = 2,
        x,
        y
      } = evaluate(options, state);
      const nativeClientRects = Array.from(await (platform2.getClientRects == null ? void 0 : platform2.getClientRects(elements.reference)) || []);
      const clientRects = getRectsByLine(nativeClientRects);
      const fallback = rectToClientRect(getBoundingRect(nativeClientRects));
      const paddingObject = getPaddingObject(padding);
      function getBoundingClientRect2() {
        if (clientRects.length === 2 && clientRects[0].left > clientRects[1].right && x != null && y != null) {
          return clientRects.find((rect) => x > rect.left - paddingObject.left && x < rect.right + paddingObject.right && y > rect.top - paddingObject.top && y < rect.bottom + paddingObject.bottom) || fallback;
        }
        if (clientRects.length >= 2) {
          if (getSideAxis(placement) === "y") {
            const firstRect = clientRects[0];
            const lastRect = clientRects[clientRects.length - 1];
            const isTop = getSide(placement) === "top";
            const top2 = firstRect.top;
            const bottom2 = lastRect.bottom;
            const left2 = isTop ? firstRect.left : lastRect.left;
            const right2 = isTop ? firstRect.right : lastRect.right;
            const width2 = right2 - left2;
            const height2 = bottom2 - top2;
            return {
              top: top2,
              bottom: bottom2,
              left: left2,
              right: right2,
              width: width2,
              height: height2,
              x: left2,
              y: top2
            };
          }
          const isLeftSide = getSide(placement) === "left";
          const maxRight = max(...clientRects.map((rect) => rect.right));
          const minLeft = min(...clientRects.map((rect) => rect.left));
          const measureRects = clientRects.filter((rect) => isLeftSide ? rect.left === minLeft : rect.right === maxRight);
          const top = measureRects[0].top;
          const bottom = measureRects[measureRects.length - 1].bottom;
          const left = minLeft;
          const right = maxRight;
          const width = right - left;
          const height = bottom - top;
          return {
            top,
            bottom,
            left,
            right,
            width,
            height,
            x: left,
            y: top
          };
        }
        return fallback;
      }
      const resetRects = await platform2.getElementRects({
        reference: {
          getBoundingClientRect: getBoundingClientRect2
        },
        floating: elements.floating,
        strategy
      });
      if (rects.reference.x !== resetRects.reference.x || rects.reference.y !== resetRects.reference.y || rects.reference.width !== resetRects.reference.width || rects.reference.height !== resetRects.reference.height) {
        return {
          reset: {
            rects: resetRects
          }
        };
      }
      return {};
    }
  };
};
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
const offset$1 = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x,
        y,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x + diffCoords.x,
        y: y + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
const shift$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x,
        y,
        placement
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x2,
              y: y2
            } = _ref;
            return {
              x: x2,
              y: y2
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x,
        y
      };
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(getSide(placement));
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      if (checkMainAxis) {
        const minSide = mainAxis === "y" ? "top" : "left";
        const maxSide = mainAxis === "y" ? "bottom" : "right";
        const min2 = mainAxisCoord + overflow[minSide];
        const max2 = mainAxisCoord - overflow[maxSide];
        mainAxisCoord = clamp(min2, mainAxisCoord, max2);
      }
      if (checkCrossAxis) {
        const minSide = crossAxis === "y" ? "top" : "left";
        const maxSide = crossAxis === "y" ? "bottom" : "right";
        const min2 = crossAxisCoord + overflow[minSide];
        const max2 = crossAxisCoord - overflow[maxSide];
        crossAxisCoord = clamp(min2, crossAxisCoord, max2);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x,
          y: limitedCoords.y - y
        }
      };
    }
  };
};
const size$2 = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "size",
    options,
    async fn(state) {
      const {
        placement,
        rects,
        platform: platform2,
        elements
      } = state;
      const {
        apply = () => {
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const overflow = await detectOverflow(state, detectOverflowOptions);
      const side = getSide(placement);
      const alignment = getAlignment(placement);
      const isYAxis = getSideAxis(placement) === "y";
      const {
        width,
        height
      } = rects.floating;
      let heightSide;
      let widthSide;
      if (side === "top" || side === "bottom") {
        heightSide = side;
        widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
      } else {
        widthSide = side;
        heightSide = alignment === "end" ? "top" : "bottom";
      }
      const overflowAvailableHeight = height - overflow[heightSide];
      const overflowAvailableWidth = width - overflow[widthSide];
      const noShift = !state.middlewareData.shift;
      let availableHeight = overflowAvailableHeight;
      let availableWidth = overflowAvailableWidth;
      if (isYAxis) {
        const maximumClippingWidth = width - overflow.left - overflow.right;
        availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
      } else {
        const maximumClippingHeight = height - overflow.top - overflow.bottom;
        availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
      }
      if (noShift && !alignment) {
        const xMin = max(overflow.left, 0);
        const xMax = max(overflow.right, 0);
        const yMin = max(overflow.top, 0);
        const yMax = max(overflow.bottom, 0);
        if (isYAxis) {
          availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
        } else {
          availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
        }
      }
      await apply({
        ...state,
        availableWidth,
        availableHeight
      });
      const nextDimensions = await platform2.getDimensions(elements.floating);
      if (width !== nextDimensions.width || height !== nextDimensions.height) {
        return {
          reset: {
            rects: true
          }
        };
      }
      return {};
    }
  };
};
function getCssDimensions(element) {
  const css2 = getComputedStyle$1(element);
  let width = parseFloat(css2.width) || 0;
  let height = parseFloat(css2.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x = ($ ? round(rect.width) : rect.width) / width;
  let y = ($ ? round(rect.height) : rect.height) / height;
  if (!x || !Number.isFinite(x)) {
    x = 1;
  }
  if (!y || !Number.isFinite(y)) {
    y = 1;
  }
  return {
    x,
    y
  };
}
const noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x = (clientRect.left + visualOffsets.x) / scale.x;
  let y = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css2 = getComputedStyle$1(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css2.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css2.paddingTop)) * iframeScale.y;
      x *= iframeScale.x;
      y *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x += left;
      y += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x,
    y
  });
}
const topLayerSelectors = [":popover-open", ":modal"];
function isTopLayer(floating) {
  return topLayerSelectors.some((selector) => {
    try {
      return floating.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element) {
  return Array.from(element.getClientRects());
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getNodeScroll(element).scrollLeft;
}
function getDocumentRect(element) {
  const html = getDocumentElement(element);
  const scroll = getNodeScroll(element);
  const body = element.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x = -scroll.scrollLeft + getWindowScrollBarX(element);
  const y = -scroll.scrollTop;
  if (getComputedStyle$1(body).direction === "rtl") {
    x += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getViewportRect(element, strategy) {
  const win = getWindow(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x = 0;
  let y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x,
    y
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = isHTMLElement(element) ? getScale(element) : createCoords(1);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x = left * scale.x;
  const y = top * scale.y;
  return {
    width,
    height,
    x,
    y
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element, stopNode) {
  const parentNode = getParentNode(element);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle$1(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle$1(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle$1(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x = rect.left + scroll.scrollLeft - offsets.x;
  const y = rect.top + scroll.scrollTop - offsets.y;
  return {
    x,
    y,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  return element.offsetParent;
}
function getOffsetParent(element, polyfill) {
  const window2 = getWindow(element);
  if (!isHTMLElement(element) || isTopLayer(element)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle$1(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
const getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      ...await getDimensionsFn(data.floating)
    }
  };
};
function isRTL(element) {
  return getComputedStyle$1(element).direction === "rtl";
}
const platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function observeMove(element, onMove) {
  let io = null;
  let timeoutId2;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId2);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId2 = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
const autoPlacement$1 = autoPlacement$2;
const shift$1 = shift$2;
const flip$1 = flip$2;
const size$1 = size$2;
const hide$1 = hide$2;
const inline$1 = inline$2;
const computePosition = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = {
    platform,
    ...options
  };
  const platformWithCache = {
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition$1(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};
var index$1 = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function deepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === "function" && a.toString() === b.toString()) {
    return true;
  }
  let length;
  let i;
  let keys;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a)) {
      length = a.length;
      if (length !== b.length) return false;
      for (i = length; i-- !== 0; ) {
        if (!deepEqual(a[i], b[i])) {
          return false;
        }
      }
      return true;
    }
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      if (!{}.hasOwnProperty.call(b, keys[i])) {
        return false;
      }
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (key === "_owner" && a.$$typeof) {
        continue;
      }
      if (!deepEqual(a[key], b[key])) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function getDPR(element) {
  if (typeof window === "undefined") {
    return 1;
  }
  const win = element.ownerDocument.defaultView || window;
  return win.devicePixelRatio || 1;
}
function roundByDPR(element, value) {
  const dpr = getDPR(element);
  return Math.round(value * dpr) / dpr;
}
function useLatestRef$1(value) {
  const ref = reactExports.useRef(value);
  index$1(() => {
    ref.current = value;
  });
  return ref;
}
function useFloating$1(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2,
    elements: {
      reference: externalReference,
      floating: externalFloating
    } = {},
    transform = true,
    whileElementsMounted,
    open
  } = options;
  const [data, setData] = reactExports.useState({
    x: 0,
    y: 0,
    strategy,
    placement,
    middlewareData: {},
    isPositioned: false
  });
  const [latestMiddleware, setLatestMiddleware] = reactExports.useState(middleware);
  if (!deepEqual(latestMiddleware, middleware)) {
    setLatestMiddleware(middleware);
  }
  const [_reference, _setReference] = reactExports.useState(null);
  const [_floating, _setFloating] = reactExports.useState(null);
  const setReference = reactExports.useCallback((node) => {
    if (node !== referenceRef.current) {
      referenceRef.current = node;
      _setReference(node);
    }
  }, []);
  const setFloating = reactExports.useCallback((node) => {
    if (node !== floatingRef.current) {
      floatingRef.current = node;
      _setFloating(node);
    }
  }, []);
  const referenceEl = externalReference || _reference;
  const floatingEl = externalFloating || _floating;
  const referenceRef = reactExports.useRef(null);
  const floatingRef = reactExports.useRef(null);
  const dataRef = reactExports.useRef(data);
  const hasWhileElementsMounted = whileElementsMounted != null;
  const whileElementsMountedRef = useLatestRef$1(whileElementsMounted);
  const platformRef = useLatestRef$1(platform2);
  const openRef = useLatestRef$1(open);
  const update = reactExports.useCallback(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }
    const config2 = {
      placement,
      strategy,
      middleware: latestMiddleware
    };
    if (platformRef.current) {
      config2.platform = platformRef.current;
    }
    computePosition(referenceRef.current, floatingRef.current, config2).then((data2) => {
      const fullData = {
        ...data2,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: openRef.current !== false
      };
      if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
        dataRef.current = fullData;
        reactDomExports.flushSync(() => {
          setData(fullData);
        });
      }
    });
  }, [latestMiddleware, placement, strategy, platformRef, openRef]);
  index$1(() => {
    if (open === false && dataRef.current.isPositioned) {
      dataRef.current.isPositioned = false;
      setData((data2) => ({
        ...data2,
        isPositioned: false
      }));
    }
  }, [open]);
  const isMountedRef = reactExports.useRef(false);
  index$1(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  index$1(() => {
    if (referenceEl) referenceRef.current = referenceEl;
    if (floatingEl) floatingRef.current = floatingEl;
    if (referenceEl && floatingEl) {
      if (whileElementsMountedRef.current) {
        return whileElementsMountedRef.current(referenceEl, floatingEl, update);
      }
      update();
    }
  }, [referenceEl, floatingEl, update, whileElementsMountedRef, hasWhileElementsMounted]);
  const refs = reactExports.useMemo(() => ({
    reference: referenceRef,
    floating: floatingRef,
    setReference,
    setFloating
  }), [setReference, setFloating]);
  const elements = reactExports.useMemo(() => ({
    reference: referenceEl,
    floating: floatingEl
  }), [referenceEl, floatingEl]);
  const floatingStyles = reactExports.useMemo(() => {
    const initialStyles = {
      position: strategy,
      left: 0,
      top: 0
    };
    if (!elements.floating) {
      return initialStyles;
    }
    const x = roundByDPR(elements.floating, data.x);
    const y = roundByDPR(elements.floating, data.y);
    if (transform) {
      return {
        ...initialStyles,
        transform: "translate(" + x + "px, " + y + "px)",
        ...getDPR(elements.floating) >= 1.5 && {
          willChange: "transform"
        }
      };
    }
    return {
      position: strategy,
      left: x,
      top: y
    };
  }, [strategy, transform, elements.floating, data.x, data.y]);
  return reactExports.useMemo(() => ({
    ...data,
    update,
    refs,
    elements,
    floatingStyles
  }), [data, update, refs, elements, floatingStyles]);
}
const offset = (options, deps) => ({
  ...offset$1(options),
  options: [options, deps]
});
const shift = (options, deps) => ({
  ...shift$1(options),
  options: [options, deps]
});
const flip = (options, deps) => ({
  ...flip$1(options),
  options: [options, deps]
});
const size = (options, deps) => ({
  ...size$1(options),
  options: [options, deps]
});
const autoPlacement = (options, deps) => ({
  ...autoPlacement$1(options),
  options: [options, deps]
});
const hide = (options, deps) => ({
  ...hide$1(options),
  options: [options, deps]
});
const inline = (options, deps) => ({
  ...inline$1(options),
  options: [options, deps]
});
function useMergeRefs(refs) {
  return reactExports.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (value) => {
      refs.forEach((ref) => {
        if (typeof ref === "function") {
          ref(value);
        } else if (ref != null) {
          ref.current = value;
        }
      });
    };
  }, refs);
}
const SafeReact = {
  ...React
};
const useInsertionEffect = SafeReact.useInsertionEffect;
const useSafeInsertionEffect = useInsertionEffect || ((fn) => fn());
function useEffectEvent(callback) {
  const ref = reactExports.useRef(() => {
  });
  useSafeInsertionEffect(() => {
    ref.current = callback;
  });
  return reactExports.useCallback(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return ref.current == null ? void 0 : ref.current(...args);
  }, []);
}
const ARROW_UP = "ArrowUp";
const ARROW_DOWN = "ArrowDown";
const ARROW_LEFT = "ArrowLeft";
const ARROW_RIGHT = "ArrowRight";
function isDifferentRow(index2, cols, prevRow) {
  return Math.floor(index2 / cols) !== prevRow;
}
function isIndexOutOfBounds(listRef, index2) {
  return index2 < 0 || index2 >= listRef.current.length;
}
function getMinIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    disabledIndices
  });
}
function getMaxIndex(listRef, disabledIndices) {
  return findNonDisabledIndex(listRef, {
    decrement: true,
    startingIndex: listRef.current.length,
    disabledIndices
  });
}
function findNonDisabledIndex(listRef, _temp) {
  let {
    startingIndex = -1,
    decrement = false,
    disabledIndices,
    amount = 1
  } = _temp === void 0 ? {} : _temp;
  const list = listRef.current;
  let index2 = startingIndex;
  do {
    index2 += decrement ? -amount : amount;
  } while (index2 >= 0 && index2 <= list.length - 1 && isDisabled(list, index2, disabledIndices));
  return index2;
}
function getGridNavigatedIndex(elementsRef, _ref) {
  let {
    event,
    orientation,
    loop,
    cols,
    disabledIndices,
    minIndex,
    maxIndex,
    prevIndex,
    stopEvent: stop = false
  } = _ref;
  let nextIndex = prevIndex;
  if (event.key === ARROW_UP) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = maxIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: nextIndex,
        amount: cols,
        decrement: true,
        disabledIndices
      });
      if (loop && (prevIndex - cols < minIndex || nextIndex < 0)) {
        const col = prevIndex % cols;
        const maxCol = maxIndex % cols;
        const offset3 = maxIndex - (maxCol - col);
        if (maxCol === col) {
          nextIndex = maxIndex;
        } else {
          nextIndex = maxCol > col ? offset3 : offset3 - cols;
        }
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (event.key === ARROW_DOWN) {
    stop && stopEvent(event);
    if (prevIndex === -1) {
      nextIndex = minIndex;
    } else {
      nextIndex = findNonDisabledIndex(elementsRef, {
        startingIndex: prevIndex,
        amount: cols,
        disabledIndices
      });
      if (loop && prevIndex + cols > maxIndex) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex % cols - cols,
          amount: cols,
          disabledIndices
        });
      }
    }
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      nextIndex = prevIndex;
    }
  }
  if (orientation === "both") {
    const prevRow = floor(prevIndex / cols);
    if (event.key === ARROW_RIGHT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== cols - 1) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex - prevIndex % cols - 1,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    if (event.key === ARROW_LEFT) {
      stop && stopEvent(event);
      if (prevIndex % cols !== 0) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex,
          decrement: true,
          disabledIndices
        });
        if (loop && isDifferentRow(nextIndex, cols, prevRow)) {
          nextIndex = findNonDisabledIndex(elementsRef, {
            startingIndex: prevIndex + (cols - prevIndex % cols),
            decrement: true,
            disabledIndices
          });
        }
      } else if (loop) {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex + (cols - prevIndex % cols),
          decrement: true,
          disabledIndices
        });
      }
      if (isDifferentRow(nextIndex, cols, prevRow)) {
        nextIndex = prevIndex;
      }
    }
    const lastRow = floor(maxIndex / cols) === prevRow;
    if (isIndexOutOfBounds(elementsRef, nextIndex)) {
      if (loop && lastRow) {
        nextIndex = event.key === ARROW_LEFT ? maxIndex : findNonDisabledIndex(elementsRef, {
          startingIndex: prevIndex - prevIndex % cols - 1,
          disabledIndices
        });
      } else {
        nextIndex = prevIndex;
      }
    }
  }
  return nextIndex;
}
function buildCellMap(sizes, cols, dense) {
  const cellMap = [];
  let startIndex = 0;
  sizes.forEach((_ref2, index2) => {
    let {
      width,
      height
    } = _ref2;
    let itemPlaced = false;
    if (dense) {
      startIndex = 0;
    }
    while (!itemPlaced) {
      const targetCells = [];
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          targetCells.push(startIndex + i + j * cols);
        }
      }
      if (startIndex % cols + width <= cols && targetCells.every((cell) => cellMap[cell] == null)) {
        targetCells.forEach((cell) => {
          cellMap[cell] = index2;
        });
        itemPlaced = true;
      } else {
        startIndex++;
      }
    }
  });
  return [...cellMap];
}
function getCellIndexOfCorner(index2, sizes, cellMap, cols, corner) {
  if (index2 === -1) return -1;
  const firstCellIndex = cellMap.indexOf(index2);
  const sizeItem = sizes[index2];
  switch (corner) {
    case "tl":
      return firstCellIndex;
    case "tr":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + sizeItem.width - 1;
    case "bl":
      if (!sizeItem) {
        return firstCellIndex;
      }
      return firstCellIndex + (sizeItem.height - 1) * cols;
    case "br":
      return cellMap.lastIndexOf(index2);
  }
}
function getCellIndices(indices, cellMap) {
  return cellMap.flatMap((index2, cellIndex) => indices.includes(index2) ? [cellIndex] : []);
}
function isDisabled(list, index2, disabledIndices) {
  if (disabledIndices) {
    return disabledIndices.includes(index2);
  }
  const element = list[index2];
  return element == null || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true";
}
let rafId = 0;
function enqueueFocus(el, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    preventScroll = false,
    cancelPrevious = true,
    sync = false
  } = options;
  cancelPrevious && cancelAnimationFrame(rafId);
  const exec = () => el == null ? void 0 : el.focus({
    preventScroll
  });
  if (sync) {
    exec();
  } else {
    rafId = requestAnimationFrame(exec);
  }
}
var index = typeof document !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function sortByDocumentPosition(a, b) {
  const position = a.compareDocumentPosition(b);
  if (position & Node.DOCUMENT_POSITION_FOLLOWING || position & Node.DOCUMENT_POSITION_CONTAINED_BY) {
    return -1;
  }
  if (position & Node.DOCUMENT_POSITION_PRECEDING || position & Node.DOCUMENT_POSITION_CONTAINS) {
    return 1;
  }
  return 0;
}
function areMapsEqual(map1, map2) {
  if (map1.size !== map2.size) {
    return false;
  }
  for (const [key, value] of map1.entries()) {
    if (value !== map2.get(key)) {
      return false;
    }
  }
  return true;
}
const FloatingListContext = /* @__PURE__ */ reactExports.createContext({
  register: () => {
  },
  unregister: () => {
  },
  map: /* @__PURE__ */ new Map(),
  elementsRef: {
    current: []
  }
});
function FloatingList(props) {
  const {
    children,
    elementsRef,
    labelsRef
  } = props;
  const [map, setMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const register = reactExports.useCallback((node) => {
    setMap((prevMap) => new Map(prevMap).set(node, null));
  }, []);
  const unregister = reactExports.useCallback((node) => {
    setMap((prevMap) => {
      const map2 = new Map(prevMap);
      map2.delete(node);
      return map2;
    });
  }, []);
  index(() => {
    const newMap = new Map(map);
    const nodes = Array.from(newMap.keys()).sort(sortByDocumentPosition);
    nodes.forEach((node, index2) => {
      newMap.set(node, index2);
    });
    if (!areMapsEqual(map, newMap)) {
      setMap(newMap);
    }
  }, [map]);
  return /* @__PURE__ */ reactExports.createElement(FloatingListContext.Provider, {
    value: reactExports.useMemo(() => ({
      register,
      unregister,
      map,
      elementsRef,
      labelsRef
    }), [register, unregister, map, elementsRef, labelsRef])
  }, children);
}
function useListItem(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    label
  } = props;
  const {
    register,
    unregister,
    map,
    elementsRef,
    labelsRef
  } = reactExports.useContext(FloatingListContext);
  const [index$12, setIndex] = reactExports.useState(null);
  const componentRef = reactExports.useRef(null);
  const ref = reactExports.useCallback((node) => {
    componentRef.current = node;
    if (index$12 !== null) {
      elementsRef.current[index$12] = node;
      if (labelsRef) {
        var _node$textContent;
        const isLabelDefined = label !== void 0;
        labelsRef.current[index$12] = isLabelDefined ? label : (_node$textContent = node == null ? void 0 : node.textContent) != null ? _node$textContent : null;
      }
    }
  }, [index$12, elementsRef, labelsRef, label]);
  index(() => {
    const node = componentRef.current;
    if (node) {
      register(node);
      return () => {
        unregister(node);
      };
    }
  }, [register, unregister]);
  index(() => {
    const index2 = componentRef.current ? map.get(componentRef.current) : null;
    if (index2 != null) {
      setIndex(index2);
    }
  }, [map]);
  return reactExports.useMemo(() => ({
    ref,
    index: index$12 == null ? -1 : index$12
  }), [index$12, ref]);
}
function renderJsx(render, computedProps) {
  if (typeof render === "function") {
    return render(computedProps);
  }
  if (render) {
    return /* @__PURE__ */ reactExports.cloneElement(render, computedProps);
  }
  return /* @__PURE__ */ reactExports.createElement("div", computedProps);
}
const CompositeContext = /* @__PURE__ */ reactExports.createContext({
  activeIndex: 0,
  onNavigate: () => {
  }
});
const horizontalKeys = [ARROW_LEFT, ARROW_RIGHT];
const verticalKeys = [ARROW_UP, ARROW_DOWN];
const allKeys = [...horizontalKeys, ...verticalKeys];
const Composite = /* @__PURE__ */ reactExports.forwardRef(function Composite2(props, forwardedRef) {
  const {
    render,
    orientation = "both",
    loop = true,
    cols = 1,
    disabledIndices,
    activeIndex: externalActiveIndex,
    onNavigate: externalSetActiveIndex,
    itemSizes,
    dense = false,
    ...domProps
  } = props;
  const [internalActiveIndex, internalSetActiveIndex] = reactExports.useState(0);
  const activeIndex = externalActiveIndex != null ? externalActiveIndex : internalActiveIndex;
  const onNavigate = useEffectEvent(externalSetActiveIndex != null ? externalSetActiveIndex : internalSetActiveIndex);
  const elementsRef = reactExports.useRef([]);
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const contextValue = reactExports.useMemo(() => ({
    activeIndex,
    onNavigate
  }), [activeIndex, onNavigate]);
  const isGrid = cols > 1;
  function handleKeyDown(event) {
    if (!allKeys.includes(event.key)) return;
    let nextIndex = activeIndex;
    const minIndex = getMinIndex(elementsRef, disabledIndices);
    const maxIndex = getMaxIndex(elementsRef, disabledIndices);
    if (isGrid) {
      const sizes = itemSizes || Array.from({
        length: elementsRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index2) => index2 != null && !isDisabled(elementsRef.current, index2, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index2, cellIndex) => index2 != null && !isDisabled(elementsRef.current, index2, disabledIndices) ? cellIndex : foundIndex, -1);
      const maybeNextIndex = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex ? elementsRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || elementsRef.current.map((_, index2) => isDisabled(elementsRef.current, index2) ? index2 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          activeIndex > maxIndex ? minIndex : activeIndex,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction we're
          // moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === ARROW_RIGHT ? "tr" : "tl"
        )
      })];
      if (maybeNextIndex != null) {
        nextIndex = maybeNextIndex;
      }
    }
    const toEndKeys = {
      horizontal: [ARROW_RIGHT],
      vertical: [ARROW_DOWN],
      both: [ARROW_RIGHT, ARROW_DOWN]
    }[orientation];
    const toStartKeys = {
      horizontal: [ARROW_LEFT],
      vertical: [ARROW_UP],
      both: [ARROW_LEFT, ARROW_UP]
    }[orientation];
    const preventedKeys = isGrid ? allKeys : {
      horizontal: horizontalKeys,
      vertical: verticalKeys,
      both: allKeys
    }[orientation];
    if (nextIndex === activeIndex && [...toEndKeys, ...toStartKeys].includes(event.key)) {
      if (loop && nextIndex === maxIndex && toEndKeys.includes(event.key)) {
        nextIndex = minIndex;
      } else if (loop && nextIndex === minIndex && toStartKeys.includes(event.key)) {
        nextIndex = maxIndex;
      } else {
        nextIndex = findNonDisabledIndex(elementsRef, {
          startingIndex: nextIndex,
          decrement: toStartKeys.includes(event.key),
          disabledIndices
        });
      }
    }
    if (nextIndex !== activeIndex && !isIndexOutOfBounds(elementsRef, nextIndex)) {
      event.stopPropagation();
      if (preventedKeys.includes(event.key)) {
        event.preventDefault();
      }
      onNavigate(nextIndex);
      queueMicrotask(() => {
        enqueueFocus(elementsRef.current[nextIndex]);
      });
    }
  }
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: forwardedRef,
    "aria-orientation": orientation === "both" ? void 0 : orientation,
    onKeyDown(e) {
      domProps.onKeyDown == null || domProps.onKeyDown(e);
      renderElementProps.onKeyDown == null || renderElementProps.onKeyDown(e);
      handleKeyDown(e);
    }
  };
  return /* @__PURE__ */ reactExports.createElement(CompositeContext.Provider, {
    value: contextValue
  }, /* @__PURE__ */ reactExports.createElement(FloatingList, {
    elementsRef
  }, renderJsx(render, computedProps)));
});
const CompositeItem = /* @__PURE__ */ reactExports.forwardRef(function CompositeItem2(props, forwardedRef) {
  const {
    render,
    ...domProps
  } = props;
  const renderElementProps = render && typeof render !== "function" ? render.props : {};
  const {
    activeIndex,
    onNavigate
  } = reactExports.useContext(CompositeContext);
  const {
    ref,
    index: index2
  } = useListItem();
  const mergedRef = useMergeRefs([ref, forwardedRef, renderElementProps.ref]);
  const isActive = activeIndex === index2;
  const computedProps = {
    ...domProps,
    ...renderElementProps,
    ref: mergedRef,
    tabIndex: isActive ? 0 : -1,
    "data-active": isActive ? "" : void 0,
    onFocus(e) {
      domProps.onFocus == null || domProps.onFocus(e);
      renderElementProps.onFocus == null || renderElementProps.onFocus(e);
      onNavigate(index2);
    }
  };
  return renderJsx(render, computedProps);
});
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
let serverHandoffComplete = false;
let count = 0;
const genId = () => (
  // Ensure the id is unique with multiple independent versions of Floating UI
  // on <React 18
  "floating-ui-" + Math.random().toString(36).slice(2, 6) + count++
);
function useFloatingId() {
  const [id, setId] = reactExports.useState(() => serverHandoffComplete ? genId() : void 0);
  index(() => {
    if (id == null) {
      setId(genId());
    }
  }, []);
  reactExports.useEffect(() => {
    serverHandoffComplete = true;
  }, []);
  return id;
}
const useReactId = SafeReact.useId;
const useId = useReactId || useFloatingId;
function createPubSub() {
  const map = /* @__PURE__ */ new Map();
  return {
    emit(event, data) {
      var _map$get;
      (_map$get = map.get(event)) == null || _map$get.forEach((handler) => handler(data));
    },
    on(event, listener) {
      map.set(event, [...map.get(event) || [], listener]);
    },
    off(event, listener) {
      var _map$get2;
      map.set(event, ((_map$get2 = map.get(event)) == null ? void 0 : _map$get2.filter((l) => l !== listener)) || []);
    }
  };
}
const FloatingNodeContext = /* @__PURE__ */ reactExports.createContext(null);
const FloatingTreeContext = /* @__PURE__ */ reactExports.createContext(null);
const useFloatingParentNodeId = () => {
  var _React$useContext;
  return ((_React$useContext = reactExports.useContext(FloatingNodeContext)) == null ? void 0 : _React$useContext.id) || null;
};
const useFloatingTree = () => reactExports.useContext(FloatingTreeContext);
function useFloatingNodeId(customParentId) {
  const id = useId();
  const tree = useFloatingTree();
  const reactParentId = useFloatingParentNodeId();
  const parentId = reactParentId;
  index(() => {
    const node = {
      id,
      parentId
    };
    tree == null || tree.addNode(node);
    return () => {
      tree == null || tree.removeNode(node);
    };
  }, [tree, id, parentId]);
  return id;
}
function FloatingNode(props) {
  const {
    children,
    id
  } = props;
  const parentId = useFloatingParentNodeId();
  return /* @__PURE__ */ reactExports.createElement(FloatingNodeContext.Provider, {
    value: reactExports.useMemo(() => ({
      id,
      parentId
    }), [id, parentId])
  }, children);
}
function FloatingTree(props) {
  const {
    children
  } = props;
  const nodesRef = reactExports.useRef([]);
  const addNode = reactExports.useCallback((node) => {
    nodesRef.current = [...nodesRef.current, node];
  }, []);
  const removeNode = reactExports.useCallback((node) => {
    nodesRef.current = nodesRef.current.filter((n) => n !== node);
  }, []);
  const events = reactExports.useState(() => createPubSub())[0];
  return /* @__PURE__ */ reactExports.createElement(FloatingTreeContext.Provider, {
    value: reactExports.useMemo(() => ({
      nodesRef,
      addNode,
      removeNode,
      events
    }), [addNode, removeNode, events])
  }, children);
}
function createAttribute(name) {
  return "data-floating-ui-" + name;
}
function useLatestRef(value) {
  const ref = reactExports.useRef(value);
  index(() => {
    ref.current = value;
  });
  return ref;
}
const safePolygonIdentifier = /* @__PURE__ */ createAttribute("safe-polygon");
function getDelay(value, prop, pointerType) {
  if (pointerType && !isMouseLikePointerType(pointerType)) {
    return 0;
  }
  if (typeof value === "number") {
    return value;
  }
  return value == null ? void 0 : value[prop];
}
function useHover(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    events,
    elements
  } = context;
  const {
    enabled = true,
    delay = 0,
    handleClose = null,
    mouseOnly = false,
    restMs = 0,
    move = true
  } = props;
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();
  const handleCloseRef = useLatestRef(handleClose);
  const delayRef = useLatestRef(delay);
  const openRef = useLatestRef(open);
  const pointerTypeRef = reactExports.useRef();
  const timeoutRef = reactExports.useRef(-1);
  const handlerRef = reactExports.useRef();
  const restTimeoutRef = reactExports.useRef(-1);
  const blockMouseMoveRef = reactExports.useRef(true);
  const performedPointerEventsMutationRef = reactExports.useRef(false);
  const unbindMouseMoveRef = reactExports.useRef(() => {
  });
  const restTimeoutPendingRef = reactExports.useRef(false);
  const isHoverOpen = reactExports.useCallback(() => {
    var _dataRef$current$open;
    const type = (_dataRef$current$open = dataRef.current.openEvent) == null ? void 0 : _dataRef$current$open.type;
    return (type == null ? void 0 : type.includes("mouse")) && type !== "mousedown";
  }, [dataRef]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onOpenChange2(_ref) {
      let {
        open: open2
      } = _ref;
      if (!open2) {
        clearTimeout(timeoutRef.current);
        clearTimeout(restTimeoutRef.current);
        blockMouseMoveRef.current = true;
        restTimeoutPendingRef.current = false;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [enabled, events]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    if (!handleCloseRef.current) return;
    if (!open) return;
    function onLeave(event) {
      if (isHoverOpen()) {
        onOpenChange(false, event, "hover");
      }
    }
    const html = getDocument(elements.floating).documentElement;
    html.addEventListener("mouseleave", onLeave);
    return () => {
      html.removeEventListener("mouseleave", onLeave);
    };
  }, [elements.floating, open, onOpenChange, enabled, handleCloseRef, isHoverOpen]);
  const closeWithDelay = reactExports.useCallback(function(event, runElseBranch, reason) {
    if (runElseBranch === void 0) {
      runElseBranch = true;
    }
    if (reason === void 0) {
      reason = "hover";
    }
    const closeDelay = getDelay(delayRef.current, "close", pointerTypeRef.current);
    if (closeDelay && !handlerRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => onOpenChange(false, event, reason), closeDelay);
    } else if (runElseBranch) {
      clearTimeout(timeoutRef.current);
      onOpenChange(false, event, reason);
    }
  }, [delayRef, onOpenChange]);
  const cleanupMouseMoveHandler = useEffectEvent(() => {
    unbindMouseMoveRef.current();
    handlerRef.current = void 0;
  });
  const clearPointerEvents = useEffectEvent(() => {
    if (performedPointerEventsMutationRef.current) {
      const body = getDocument(elements.floating).body;
      body.style.pointerEvents = "";
      body.removeAttribute(safePolygonIdentifier);
      performedPointerEventsMutationRef.current = false;
    }
  });
  reactExports.useEffect(() => {
    if (!enabled) return;
    function isClickLikeOpenEvent() {
      return dataRef.current.openEvent ? ["click", "mousedown"].includes(dataRef.current.openEvent.type) : false;
    }
    function onMouseEnter(event) {
      clearTimeout(timeoutRef.current);
      blockMouseMoveRef.current = false;
      if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current) || restMs > 0 && !getDelay(delayRef.current, "open")) {
        return;
      }
      const openDelay = getDelay(delayRef.current, "open", pointerTypeRef.current);
      if (openDelay) {
        timeoutRef.current = window.setTimeout(() => {
          if (!openRef.current) {
            onOpenChange(true, event, "hover");
          }
        }, openDelay);
      } else {
        onOpenChange(true, event, "hover");
      }
    }
    function onMouseLeave(event) {
      if (isClickLikeOpenEvent()) return;
      unbindMouseMoveRef.current();
      const doc = getDocument(elements.floating);
      clearTimeout(restTimeoutRef.current);
      restTimeoutPendingRef.current = false;
      if (handleCloseRef.current && dataRef.current.floatingContext) {
        if (!open) {
          clearTimeout(timeoutRef.current);
        }
        handlerRef.current = handleCloseRef.current({
          ...dataRef.current.floatingContext,
          tree,
          x: event.clientX,
          y: event.clientY,
          onClose() {
            clearPointerEvents();
            cleanupMouseMoveHandler();
            closeWithDelay(event, true, "safe-polygon");
          }
        });
        const handler = handlerRef.current;
        doc.addEventListener("mousemove", handler);
        unbindMouseMoveRef.current = () => {
          doc.removeEventListener("mousemove", handler);
        };
        return;
      }
      const shouldClose = pointerTypeRef.current === "touch" ? !contains(elements.floating, event.relatedTarget) : true;
      if (shouldClose) {
        closeWithDelay(event);
      }
    }
    function onScrollMouseLeave(event) {
      if (isClickLikeOpenEvent()) return;
      if (!dataRef.current.floatingContext) return;
      handleCloseRef.current == null || handleCloseRef.current({
        ...dataRef.current.floatingContext,
        tree,
        x: event.clientX,
        y: event.clientY,
        onClose() {
          clearPointerEvents();
          cleanupMouseMoveHandler();
          closeWithDelay(event);
        }
      })(event);
    }
    if (isElement(elements.domReference)) {
      var _elements$floating;
      const ref = elements.domReference;
      open && ref.addEventListener("mouseleave", onScrollMouseLeave);
      (_elements$floating = elements.floating) == null || _elements$floating.addEventListener("mouseleave", onScrollMouseLeave);
      move && ref.addEventListener("mousemove", onMouseEnter, {
        once: true
      });
      ref.addEventListener("mouseenter", onMouseEnter);
      ref.addEventListener("mouseleave", onMouseLeave);
      return () => {
        var _elements$floating2;
        open && ref.removeEventListener("mouseleave", onScrollMouseLeave);
        (_elements$floating2 = elements.floating) == null || _elements$floating2.removeEventListener("mouseleave", onScrollMouseLeave);
        move && ref.removeEventListener("mousemove", onMouseEnter);
        ref.removeEventListener("mouseenter", onMouseEnter);
        ref.removeEventListener("mouseleave", onMouseLeave);
      };
    }
  }, [elements, enabled, context, mouseOnly, restMs, move, closeWithDelay, cleanupMouseMoveHandler, clearPointerEvents, onOpenChange, open, openRef, tree, delayRef, handleCloseRef, dataRef]);
  index(() => {
    var _handleCloseRef$curre;
    if (!enabled) return;
    if (open && (_handleCloseRef$curre = handleCloseRef.current) != null && _handleCloseRef$curre.__options.blockPointerEvents && isHoverOpen()) {
      performedPointerEventsMutationRef.current = true;
      const floatingEl = elements.floating;
      if (isElement(elements.domReference) && floatingEl) {
        var _tree$nodesRef$curren;
        const body = getDocument(elements.floating).body;
        body.setAttribute(safePolygonIdentifier, "");
        const ref = elements.domReference;
        const parentFloating = tree == null || (_tree$nodesRef$curren = tree.nodesRef.current.find((node) => node.id === parentId)) == null || (_tree$nodesRef$curren = _tree$nodesRef$curren.context) == null ? void 0 : _tree$nodesRef$curren.elements.floating;
        if (parentFloating) {
          parentFloating.style.pointerEvents = "";
        }
        body.style.pointerEvents = "none";
        ref.style.pointerEvents = "auto";
        floatingEl.style.pointerEvents = "auto";
        return () => {
          body.style.pointerEvents = "";
          ref.style.pointerEvents = "";
          floatingEl.style.pointerEvents = "";
        };
      }
    }
  }, [enabled, open, parentId, elements, tree, handleCloseRef, isHoverOpen]);
  index(() => {
    if (!open) {
      pointerTypeRef.current = void 0;
      restTimeoutPendingRef.current = false;
      cleanupMouseMoveHandler();
      clearPointerEvents();
    }
  }, [open, cleanupMouseMoveHandler, clearPointerEvents]);
  reactExports.useEffect(() => {
    return () => {
      cleanupMouseMoveHandler();
      clearTimeout(timeoutRef.current);
      clearTimeout(restTimeoutRef.current);
      clearPointerEvents();
    };
  }, [enabled, elements.domReference, cleanupMouseMoveHandler, clearPointerEvents]);
  const reference = reactExports.useMemo(() => {
    function setPointerRef(event) {
      pointerTypeRef.current = event.pointerType;
    }
    return {
      onPointerDown: setPointerRef,
      onPointerEnter: setPointerRef,
      onMouseMove(event) {
        const {
          nativeEvent
        } = event;
        function handleMouseMove() {
          if (!blockMouseMoveRef.current && !openRef.current) {
            onOpenChange(true, nativeEvent, "hover");
          }
        }
        if (mouseOnly && !isMouseLikePointerType(pointerTypeRef.current)) {
          return;
        }
        if (open || restMs === 0) {
          return;
        }
        if (restTimeoutPendingRef.current && event.movementX ** 2 + event.movementY ** 2 < 2) {
          return;
        }
        clearTimeout(restTimeoutRef.current);
        if (pointerTypeRef.current === "touch") {
          handleMouseMove();
        } else {
          restTimeoutPendingRef.current = true;
          restTimeoutRef.current = window.setTimeout(handleMouseMove, restMs);
        }
      }
    };
  }, [mouseOnly, onOpenChange, open, openRef, restMs]);
  const floating = reactExports.useMemo(() => ({
    onMouseEnter() {
      clearTimeout(timeoutRef.current);
    },
    onMouseLeave(event) {
      closeWithDelay(event.nativeEvent, false);
    }
  }), [closeWithDelay]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
const NOOP = () => {
};
const FloatingDelayGroupContext = /* @__PURE__ */ reactExports.createContext({
  delay: 0,
  initialDelay: 0,
  timeoutMs: 0,
  currentId: null,
  setCurrentId: NOOP,
  setState: NOOP,
  isInstantPhase: false
});
const useDelayGroupContext = () => reactExports.useContext(FloatingDelayGroupContext);
function FloatingDelayGroup(props) {
  const {
    children,
    delay,
    timeoutMs = 0
  } = props;
  const [state, setState] = reactExports.useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {
    delay,
    timeoutMs,
    initialDelay: delay,
    currentId: null,
    isInstantPhase: false
  });
  const initialCurrentIdRef = reactExports.useRef(null);
  const setCurrentId = reactExports.useCallback((currentId) => {
    setState({
      currentId
    });
  }, []);
  index(() => {
    if (state.currentId) {
      if (initialCurrentIdRef.current === null) {
        initialCurrentIdRef.current = state.currentId;
      } else if (!state.isInstantPhase) {
        setState({
          isInstantPhase: true
        });
      }
    } else {
      if (state.isInstantPhase) {
        setState({
          isInstantPhase: false
        });
      }
      initialCurrentIdRef.current = null;
    }
  }, [state.currentId, state.isInstantPhase]);
  return /* @__PURE__ */ reactExports.createElement(FloatingDelayGroupContext.Provider, {
    value: reactExports.useMemo(() => ({
      ...state,
      setState,
      setCurrentId
    }), [state, setCurrentId])
  }, children);
}
function useDelayGroup(context, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    open,
    onOpenChange,
    floatingId
  } = context;
  const {
    id: optionId,
    enabled = true
  } = options;
  const id = optionId != null ? optionId : floatingId;
  const groupContext = useDelayGroupContext();
  const {
    currentId,
    setCurrentId,
    initialDelay,
    setState,
    timeoutMs
  } = groupContext;
  index(() => {
    if (!enabled) return;
    if (!currentId) return;
    setState({
      delay: {
        open: 1,
        close: getDelay(initialDelay, "close")
      }
    });
    if (currentId !== id) {
      onOpenChange(false);
    }
  }, [enabled, id, onOpenChange, setState, currentId, initialDelay]);
  index(() => {
    function unset() {
      onOpenChange(false);
      setState({
        delay: initialDelay,
        currentId: null
      });
    }
    if (!enabled) return;
    if (!currentId) return;
    if (!open && currentId === id) {
      if (timeoutMs) {
        const timeout = window.setTimeout(unset, timeoutMs);
        return () => {
          clearTimeout(timeout);
        };
      }
      unset();
    }
  }, [enabled, open, setState, currentId, id, onOpenChange, initialDelay, timeoutMs]);
  index(() => {
    if (!enabled) return;
    if (setCurrentId === NOOP || !open) return;
    setCurrentId(id);
  }, [enabled, open, setCurrentId, id]);
  return groupContext;
}
function getAncestors(nodes, id) {
  var _nodes$find;
  let allAncestors = [];
  let currentParentId = (_nodes$find = nodes.find((node) => node.id === id)) == null ? void 0 : _nodes$find.parentId;
  while (currentParentId) {
    const currentNode = nodes.find((node) => node.id === currentParentId);
    currentParentId = currentNode == null ? void 0 : currentNode.parentId;
    if (currentNode) {
      allAncestors = allAncestors.concat(currentNode);
    }
  }
  return allAncestors;
}
function getChildren(nodes, id) {
  let allChildren = nodes.filter((node) => {
    var _node$context;
    return node.parentId === id && ((_node$context = node.context) == null ? void 0 : _node$context.open);
  });
  let currentChildren = allChildren;
  while (currentChildren.length) {
    currentChildren = nodes.filter((node) => {
      var _currentChildren;
      return (_currentChildren = currentChildren) == null ? void 0 : _currentChildren.some((n) => {
        var _node$context2;
        return node.parentId === n.id && ((_node$context2 = node.context) == null ? void 0 : _node$context2.open);
      });
    });
    allChildren = allChildren.concat(currentChildren);
  }
  return allChildren;
}
function getDeepestNode(nodes, id) {
  let deepestNodeId;
  let maxDepth = -1;
  function findDeepest(nodeId, depth) {
    if (depth > maxDepth) {
      deepestNodeId = nodeId;
      maxDepth = depth;
    }
    const children = getChildren(nodes, nodeId);
    children.forEach((child) => {
      findDeepest(child.id, depth + 1);
    });
  }
  findDeepest(id, 0);
  return nodes.find((node) => node.id === deepestNodeId);
}
let counterMap = /* @__PURE__ */ new WeakMap();
let uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
let markerMap = {};
let lockCount$1 = 0;
const supportsInert = () => typeof HTMLElement !== "undefined" && "inert" in HTMLElement.prototype;
const unwrapHost = (node) => node && (node.host || unwrapHost(node.parentNode));
const correctElements = (parent, targets) => targets.map((target) => {
  if (parent.contains(target)) {
    return target;
  }
  const correctedTarget = unwrapHost(target);
  if (parent.contains(correctedTarget)) {
    return correctedTarget;
  }
  return null;
}).filter((x) => x != null);
function applyAttributeToOthers(uncorrectedAvoidElements, body, ariaHidden, inert) {
  const markerName = "data-floating-ui-inert";
  const controlAttribute = inert ? "inert" : ariaHidden ? "aria-hidden" : null;
  const avoidElements = correctElements(body, uncorrectedAvoidElements);
  const elementsToKeep = /* @__PURE__ */ new Set();
  const elementsToStop = new Set(avoidElements);
  const hiddenElements = [];
  if (!markerMap[markerName]) {
    markerMap[markerName] = /* @__PURE__ */ new WeakMap();
  }
  const markerCounter = markerMap[markerName];
  avoidElements.forEach(keep);
  deep(body);
  elementsToKeep.clear();
  function keep(el) {
    if (!el || elementsToKeep.has(el)) {
      return;
    }
    elementsToKeep.add(el);
    el.parentNode && keep(el.parentNode);
  }
  function deep(parent) {
    if (!parent || elementsToStop.has(parent)) {
      return;
    }
    [].forEach.call(parent.children, (node) => {
      if (getNodeName(node) === "script") return;
      if (elementsToKeep.has(node)) {
        deep(node);
      } else {
        const attr2 = controlAttribute ? node.getAttribute(controlAttribute) : null;
        const alreadyHidden = attr2 !== null && attr2 !== "false";
        const counterValue = (counterMap.get(node) || 0) + 1;
        const markerValue = (markerCounter.get(node) || 0) + 1;
        counterMap.set(node, counterValue);
        markerCounter.set(node, markerValue);
        hiddenElements.push(node);
        if (counterValue === 1 && alreadyHidden) {
          uncontrolledElementsSet.add(node);
        }
        if (markerValue === 1) {
          node.setAttribute(markerName, "");
        }
        if (!alreadyHidden && controlAttribute) {
          node.setAttribute(controlAttribute, "true");
        }
      }
    });
  }
  lockCount$1++;
  return () => {
    hiddenElements.forEach((element) => {
      const counterValue = (counterMap.get(element) || 0) - 1;
      const markerValue = (markerCounter.get(element) || 0) - 1;
      counterMap.set(element, counterValue);
      markerCounter.set(element, markerValue);
      if (!counterValue) {
        if (!uncontrolledElementsSet.has(element) && controlAttribute) {
          element.removeAttribute(controlAttribute);
        }
        uncontrolledElementsSet.delete(element);
      }
      if (!markerValue) {
        element.removeAttribute(markerName);
      }
    });
    lockCount$1--;
    if (!lockCount$1) {
      counterMap = /* @__PURE__ */ new WeakMap();
      counterMap = /* @__PURE__ */ new WeakMap();
      uncontrolledElementsSet = /* @__PURE__ */ new WeakSet();
      markerMap = {};
    }
  };
}
function markOthers(avoidElements, ariaHidden, inert) {
  if (ariaHidden === void 0) {
    ariaHidden = false;
  }
  if (inert === void 0) {
    inert = false;
  }
  const body = getDocument(avoidElements[0]).body;
  return applyAttributeToOthers(avoidElements.concat(Array.from(body.querySelectorAll("[aria-live]"))), body, ariaHidden, inert);
}
const getTabbableOptions = () => ({
  getShadowRoot: true,
  displayCheck: (
    // JSDOM does not support the `tabbable` library. To solve this we can
    // check if `ResizeObserver` is a real function (not polyfilled), which
    // determines if the current environment is JSDOM-like.
    typeof ResizeObserver === "function" && ResizeObserver.toString().includes("[native code]") ? "full" : "none"
  )
});
function getTabbableIn(container, direction) {
  const allTabbable = tabbable(container, getTabbableOptions());
  if (direction === "prev") {
    allTabbable.reverse();
  }
  const activeIndex = allTabbable.indexOf(activeElement(getDocument(container)));
  const nextTabbableElements = allTabbable.slice(activeIndex + 1);
  return nextTabbableElements[0];
}
function getNextTabbable() {
  return getTabbableIn(document.body, "next");
}
function getPreviousTabbable() {
  return getTabbableIn(document.body, "prev");
}
function isOutsideEvent(event, container) {
  const containerElement = container || event.currentTarget;
  const relatedTarget = event.relatedTarget;
  return !relatedTarget || !contains(containerElement, relatedTarget);
}
function disableFocusInside(container) {
  const tabbableElements = tabbable(container, getTabbableOptions());
  tabbableElements.forEach((element) => {
    element.dataset.tabindex = element.getAttribute("tabindex") || "";
    element.setAttribute("tabindex", "-1");
  });
}
function enableFocusInside(container) {
  const elements = container.querySelectorAll("[data-tabindex]");
  elements.forEach((element) => {
    const tabindex = element.dataset.tabindex;
    delete element.dataset.tabindex;
    if (tabindex) {
      element.setAttribute("tabindex", tabindex);
    } else {
      element.removeAttribute("tabindex");
    }
  });
}
const HIDDEN_STYLES = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "fixed",
  whiteSpace: "nowrap",
  width: "1px",
  top: 0,
  left: 0
};
let timeoutId;
function setActiveElementOnTab(event) {
  if (event.key === "Tab") {
    event.target;
    clearTimeout(timeoutId);
  }
}
const FocusGuard = /* @__PURE__ */ reactExports.forwardRef(function FocusGuard2(props, ref) {
  const [role, setRole] = reactExports.useState();
  index(() => {
    if (isSafari()) {
      setRole("button");
    }
    document.addEventListener("keydown", setActiveElementOnTab);
    return () => {
      document.removeEventListener("keydown", setActiveElementOnTab);
    };
  }, []);
  const restProps = {
    ref,
    tabIndex: 0,
    // Role is only for VoiceOver
    role,
    "aria-hidden": role ? void 0 : true,
    [createAttribute("focus-guard")]: "",
    style: HIDDEN_STYLES
  };
  return /* @__PURE__ */ reactExports.createElement("span", _extends({}, props, restProps));
});
const PortalContext = /* @__PURE__ */ reactExports.createContext(null);
const attr = /* @__PURE__ */ createAttribute("portal");
function useFloatingPortalNode(props) {
  if (props === void 0) {
    props = {};
  }
  const {
    id,
    root
  } = props;
  const uniqueId = useId();
  const portalContext = usePortalContext();
  const [portalNode, setPortalNode] = reactExports.useState(null);
  const portalNodeRef = reactExports.useRef(null);
  index(() => {
    return () => {
      portalNode == null || portalNode.remove();
      queueMicrotask(() => {
        portalNodeRef.current = null;
      });
    };
  }, [portalNode]);
  index(() => {
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    const existingIdRoot = id ? document.getElementById(id) : null;
    if (!existingIdRoot) return;
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    existingIdRoot.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, uniqueId]);
  index(() => {
    if (root === null) return;
    if (!uniqueId) return;
    if (portalNodeRef.current) return;
    let container = root || (portalContext == null ? void 0 : portalContext.portalNode);
    if (container && !isElement(container)) container = container.current;
    container = container || document.body;
    let idWrapper = null;
    if (id) {
      idWrapper = document.createElement("div");
      idWrapper.id = id;
      container.appendChild(idWrapper);
    }
    const subRoot = document.createElement("div");
    subRoot.id = uniqueId;
    subRoot.setAttribute(attr, "");
    container = idWrapper || container;
    container.appendChild(subRoot);
    portalNodeRef.current = subRoot;
    setPortalNode(subRoot);
  }, [id, root, uniqueId, portalContext]);
  return portalNode;
}
function FloatingPortal(props) {
  const {
    children,
    id,
    root,
    preserveTabOrder = true
  } = props;
  const portalNode = useFloatingPortalNode({
    id,
    root
  });
  const [focusManagerState, setFocusManagerState] = reactExports.useState(null);
  const beforeOutsideRef = reactExports.useRef(null);
  const afterOutsideRef = reactExports.useRef(null);
  const beforeInsideRef = reactExports.useRef(null);
  const afterInsideRef = reactExports.useRef(null);
  const modal = focusManagerState == null ? void 0 : focusManagerState.modal;
  const open = focusManagerState == null ? void 0 : focusManagerState.open;
  const shouldRenderGuards = (
    // The FocusManager and therefore floating element are currently open/
    // rendered.
    !!focusManagerState && // Guards are only for non-modal focus management.
    !focusManagerState.modal && // Don't render if unmount is transitioning.
    focusManagerState.open && preserveTabOrder && !!(root || portalNode)
  );
  reactExports.useEffect(() => {
    if (!portalNode || !preserveTabOrder || modal) {
      return;
    }
    function onFocus(event) {
      if (portalNode && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(portalNode);
      }
    }
    portalNode.addEventListener("focusin", onFocus, true);
    portalNode.addEventListener("focusout", onFocus, true);
    return () => {
      portalNode.removeEventListener("focusin", onFocus, true);
      portalNode.removeEventListener("focusout", onFocus, true);
    };
  }, [portalNode, preserveTabOrder, modal]);
  reactExports.useEffect(() => {
    if (!portalNode) return;
    if (open) return;
    enableFocusInside(portalNode);
  }, [open, portalNode]);
  return /* @__PURE__ */ reactExports.createElement(PortalContext.Provider, {
    value: reactExports.useMemo(() => ({
      preserveTabOrder,
      beforeOutsideRef,
      afterOutsideRef,
      beforeInsideRef,
      afterInsideRef,
      portalNode,
      setFocusManagerState
    }), [preserveTabOrder, portalNode])
  }, shouldRenderGuards && portalNode && /* @__PURE__ */ reactExports.createElement(FocusGuard, {
    "data-type": "outside",
    ref: beforeOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _beforeInsideRef$curr;
        (_beforeInsideRef$curr = beforeInsideRef.current) == null || _beforeInsideRef$curr.focus();
      } else {
        const prevTabbable = getPreviousTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        prevTabbable == null || prevTabbable.focus();
      }
    }
  }), shouldRenderGuards && portalNode && /* @__PURE__ */ reactExports.createElement("span", {
    "aria-owns": portalNode.id,
    style: HIDDEN_STYLES
  }), portalNode && /* @__PURE__ */ reactDomExports.createPortal(children, portalNode), shouldRenderGuards && portalNode && /* @__PURE__ */ reactExports.createElement(FocusGuard, {
    "data-type": "outside",
    ref: afterOutsideRef,
    onFocus: (event) => {
      if (isOutsideEvent(event, portalNode)) {
        var _afterInsideRef$curre;
        (_afterInsideRef$curre = afterInsideRef.current) == null || _afterInsideRef$curre.focus();
      } else {
        const nextTabbable = getNextTabbable() || (focusManagerState == null ? void 0 : focusManagerState.refs.domReference.current);
        nextTabbable == null || nextTabbable.focus();
        (focusManagerState == null ? void 0 : focusManagerState.closeOnFocusOut) && (focusManagerState == null ? void 0 : focusManagerState.onOpenChange(false, event.nativeEvent, "focus-out"));
      }
    }
  }));
}
const usePortalContext = () => reactExports.useContext(PortalContext);
const FOCUSABLE_ATTRIBUTE = "data-floating-ui-focusable";
function getFloatingFocusElement(floatingElement) {
  if (!floatingElement) {
    return null;
  }
  return floatingElement.hasAttribute(FOCUSABLE_ATTRIBUTE) ? floatingElement : floatingElement.querySelector("[" + FOCUSABLE_ATTRIBUTE + "]") || floatingElement;
}
const LIST_LIMIT = 20;
let previouslyFocusedElements = [];
function addPreviouslyFocusedElement(element) {
  previouslyFocusedElements = previouslyFocusedElements.filter((el) => el.isConnected);
  let tabbableEl = element;
  if (!tabbableEl || getNodeName(tabbableEl) === "body") return;
  if (!isTabbable(tabbableEl, getTabbableOptions())) {
    const tabbableChild = tabbable(tabbableEl, getTabbableOptions())[0];
    if (tabbableChild) {
      tabbableEl = tabbableChild;
    }
  }
  previouslyFocusedElements.push(tabbableEl);
  if (previouslyFocusedElements.length > LIST_LIMIT) {
    previouslyFocusedElements = previouslyFocusedElements.slice(-LIST_LIMIT);
  }
}
function getPreviouslyFocusedElement() {
  return previouslyFocusedElements.slice().reverse().find((el) => el.isConnected);
}
const VisuallyHiddenDismiss = /* @__PURE__ */ reactExports.forwardRef(function VisuallyHiddenDismiss2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement("button", _extends({}, props, {
    type: "button",
    ref,
    tabIndex: -1,
    style: HIDDEN_STYLES
  }));
});
function FloatingFocusManager(props) {
  const {
    context,
    children,
    disabled = false,
    order = ["content"],
    guards: _guards = true,
    initialFocus = 0,
    returnFocus = true,
    restoreFocus = false,
    modal = true,
    visuallyHiddenDismiss = false,
    closeOnFocusOut = true
  } = props;
  const {
    open,
    refs,
    nodeId,
    onOpenChange,
    events,
    dataRef,
    floatingId,
    elements: {
      domReference,
      floating
    }
  } = context;
  const ignoreInitialFocus = typeof initialFocus === "number" && initialFocus < 0;
  const isUntrappedTypeableCombobox = isTypeableCombobox(domReference) && ignoreInitialFocus;
  const guards = supportsInert() ? _guards : true;
  const orderRef = useLatestRef(order);
  const initialFocusRef = useLatestRef(initialFocus);
  const returnFocusRef = useLatestRef(returnFocus);
  const tree = useFloatingTree();
  const portalContext = usePortalContext();
  const startDismissButtonRef = reactExports.useRef(null);
  const endDismissButtonRef = reactExports.useRef(null);
  const preventReturnFocusRef = reactExports.useRef(false);
  const isPointerDownRef = reactExports.useRef(false);
  const tabbableIndexRef = reactExports.useRef(-1);
  const isInsidePortal = portalContext != null;
  const floatingFocusElement = getFloatingFocusElement(floating);
  const getTabbableContent = useEffectEvent(function(container) {
    if (container === void 0) {
      container = floatingFocusElement;
    }
    return container ? tabbable(container, getTabbableOptions()) : [];
  });
  const getTabbableElements2 = useEffectEvent((container) => {
    const content = getTabbableContent(container);
    return orderRef.current.map((type) => {
      if (domReference && type === "reference") {
        return domReference;
      }
      if (floatingFocusElement && type === "floating") {
        return floatingFocusElement;
      }
      return content;
    }).filter(Boolean).flat();
  });
  reactExports.useEffect(() => {
    preventReturnFocusRef.current = false;
  }, [disabled]);
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!modal) return;
    function onKeyDown(event) {
      if (event.key === "Tab") {
        if (contains(floatingFocusElement, activeElement(getDocument(floatingFocusElement))) && getTabbableContent().length === 0 && !isUntrappedTypeableCombobox) {
          stopEvent(event);
        }
        const els = getTabbableElements2();
        const target = getTarget(event);
        if (orderRef.current[0] === "reference" && target === domReference) {
          stopEvent(event);
          if (event.shiftKey) {
            enqueueFocus(els[els.length - 1]);
          } else {
            enqueueFocus(els[1]);
          }
        }
        if (orderRef.current[1] === "floating" && target === floatingFocusElement && event.shiftKey) {
          stopEvent(event);
          enqueueFocus(els[0]);
        }
      }
    }
    const doc = getDocument(floatingFocusElement);
    doc.addEventListener("keydown", onKeyDown);
    return () => {
      doc.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, domReference, floatingFocusElement, modal, orderRef, isUntrappedTypeableCombobox, getTabbableContent, getTabbableElements2]);
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!floating) return;
    function handleFocusIn(event) {
      const target = getTarget(event);
      const tabbableContent = getTabbableContent();
      const tabbableIndex = tabbableContent.indexOf(target);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
    }
    floating.addEventListener("focusin", handleFocusIn);
    return () => {
      floating.removeEventListener("focusin", handleFocusIn);
    };
  }, [disabled, floating, getTabbableContent]);
  reactExports.useEffect(() => {
    if (disabled) return;
    if (!closeOnFocusOut) return;
    function handlePointerDown() {
      isPointerDownRef.current = true;
      setTimeout(() => {
        isPointerDownRef.current = false;
      });
    }
    function handleFocusOutside(event) {
      const relatedTarget = event.relatedTarget;
      queueMicrotask(() => {
        const movedToUnrelatedNode = !(contains(domReference, relatedTarget) || contains(floating, relatedTarget) || contains(relatedTarget, floating) || contains(portalContext == null ? void 0 : portalContext.portalNode, relatedTarget) || relatedTarget != null && relatedTarget.hasAttribute(createAttribute("focus-guard")) || tree && (getChildren(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context, _node$context2;
          return contains((_node$context = node.context) == null ? void 0 : _node$context.elements.floating, relatedTarget) || contains((_node$context2 = node.context) == null ? void 0 : _node$context2.elements.domReference, relatedTarget);
        }) || getAncestors(tree.nodesRef.current, nodeId).find((node) => {
          var _node$context3, _node$context4;
          return ((_node$context3 = node.context) == null ? void 0 : _node$context3.elements.floating) === relatedTarget || ((_node$context4 = node.context) == null ? void 0 : _node$context4.elements.domReference) === relatedTarget;
        })));
        if (restoreFocus && movedToUnrelatedNode && activeElement(getDocument(floatingFocusElement)) === getDocument(floatingFocusElement).body) {
          if (isHTMLElement(floatingFocusElement)) {
            floatingFocusElement.focus();
          }
          const prevTabbableIndex = tabbableIndexRef.current;
          const tabbableContent = getTabbableContent();
          const nodeToFocus = tabbableContent[prevTabbableIndex] || tabbableContent[tabbableContent.length - 1] || floatingFocusElement;
          if (isHTMLElement(nodeToFocus)) {
            nodeToFocus.focus();
          }
        }
        if ((isUntrappedTypeableCombobox ? true : !modal) && relatedTarget && movedToUnrelatedNode && !isPointerDownRef.current && // Fix React 18 Strict Mode returnFocus due to double rendering.
        relatedTarget !== getPreviouslyFocusedElement()) {
          preventReturnFocusRef.current = true;
          onOpenChange(false, event, "focus-out");
        }
      });
    }
    if (floating && isHTMLElement(domReference)) {
      domReference.addEventListener("focusout", handleFocusOutside);
      domReference.addEventListener("pointerdown", handlePointerDown);
      floating.addEventListener("focusout", handleFocusOutside);
      return () => {
        domReference.removeEventListener("focusout", handleFocusOutside);
        domReference.removeEventListener("pointerdown", handlePointerDown);
        floating.removeEventListener("focusout", handleFocusOutside);
      };
    }
  }, [disabled, domReference, floating, floatingFocusElement, modal, nodeId, tree, portalContext, onOpenChange, closeOnFocusOut, restoreFocus, getTabbableContent, isUntrappedTypeableCombobox]);
  reactExports.useEffect(() => {
    var _portalContext$portal;
    if (disabled) return;
    const portalNodes = Array.from((portalContext == null || (_portalContext$portal = portalContext.portalNode) == null ? void 0 : _portalContext$portal.querySelectorAll("[" + createAttribute("portal") + "]")) || []);
    if (floating) {
      const insideElements = [floating, ...portalNodes, startDismissButtonRef.current, endDismissButtonRef.current, orderRef.current.includes("reference") || isUntrappedTypeableCombobox ? domReference : null].filter((x) => x != null);
      const cleanup2 = modal || isUntrappedTypeableCombobox ? markOthers(insideElements, guards, !guards) : markOthers(insideElements);
      return () => {
        cleanup2();
      };
    }
  }, [disabled, domReference, floating, modal, orderRef, portalContext, isUntrappedTypeableCombobox, guards]);
  index(() => {
    if (disabled || !isHTMLElement(floatingFocusElement)) return;
    const doc = getDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    queueMicrotask(() => {
      const focusableElements = getTabbableElements2(floatingFocusElement);
      const initialFocusValue = initialFocusRef.current;
      const elToFocus = (typeof initialFocusValue === "number" ? focusableElements[initialFocusValue] : initialFocusValue.current) || floatingFocusElement;
      const focusAlreadyInsideFloatingEl = contains(floatingFocusElement, previouslyFocusedElement);
      if (!ignoreInitialFocus && !focusAlreadyInsideFloatingEl && open) {
        enqueueFocus(elToFocus, {
          preventScroll: elToFocus === floatingFocusElement
        });
      }
    });
  }, [disabled, open, floatingFocusElement, ignoreInitialFocus, getTabbableElements2, initialFocusRef]);
  index(() => {
    if (disabled || !floatingFocusElement) return;
    let preventReturnFocusScroll = false;
    const doc = getDocument(floatingFocusElement);
    const previouslyFocusedElement = activeElement(doc);
    const contextData = dataRef.current;
    let openEvent = contextData.openEvent;
    addPreviouslyFocusedElement(previouslyFocusedElement);
    function onOpenChange2(_ref) {
      let {
        open: open2,
        reason,
        event,
        nested
      } = _ref;
      if (open2) {
        openEvent = event;
      }
      if (reason === "escape-key" && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      if (reason === "hover" && event.type === "mouseleave") {
        preventReturnFocusRef.current = true;
      }
      if (reason !== "outside-press") return;
      if (nested) {
        preventReturnFocusRef.current = false;
        preventReturnFocusScroll = true;
      } else {
        preventReturnFocusRef.current = !(isVirtualClick(event) || isVirtualPointerEvent(event));
      }
    }
    events.on("openchange", onOpenChange2);
    const fallbackEl = doc.createElement("span");
    fallbackEl.setAttribute("tabindex", "-1");
    fallbackEl.setAttribute("aria-hidden", "true");
    Object.assign(fallbackEl.style, HIDDEN_STYLES);
    if (isInsidePortal && domReference) {
      domReference.insertAdjacentElement("afterend", fallbackEl);
    }
    function getReturnElement() {
      if (typeof returnFocusRef.current === "boolean") {
        return getPreviouslyFocusedElement() || fallbackEl;
      }
      return returnFocusRef.current.current || fallbackEl;
    }
    return () => {
      events.off("openchange", onOpenChange2);
      const activeEl = activeElement(doc);
      const isFocusInsideFloatingTree = contains(floating, activeEl) || tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
        var _node$context5;
        return contains((_node$context5 = node.context) == null ? void 0 : _node$context5.elements.floating, activeEl);
      });
      const shouldFocusReference = isFocusInsideFloatingTree || openEvent && ["click", "mousedown"].includes(openEvent.type);
      if (shouldFocusReference && refs.domReference.current) {
        addPreviouslyFocusedElement(refs.domReference.current);
      }
      const returnElement = getReturnElement();
      queueMicrotask(() => {
        if (
          // eslint-disable-next-line react-hooks/exhaustive-deps
          returnFocusRef.current && !preventReturnFocusRef.current && isHTMLElement(returnElement) && // If the focus moved somewhere else after mount, avoid returning focus
          // since it likely entered a different element which should be
          // respected: https://github.com/floating-ui/floating-ui/issues/2607
          (returnElement !== activeEl && activeEl !== doc.body ? isFocusInsideFloatingTree : true)
        ) {
          returnElement.focus({
            preventScroll: preventReturnFocusScroll
          });
        }
        fallbackEl.remove();
      });
    };
  }, [disabled, floating, floatingFocusElement, returnFocusRef, dataRef, refs, events, tree, nodeId, isInsidePortal, domReference]);
  index(() => {
    if (disabled) return;
    if (!portalContext) return;
    portalContext.setFocusManagerState({
      modal,
      closeOnFocusOut,
      open,
      onOpenChange,
      refs
    });
    return () => {
      portalContext.setFocusManagerState(null);
    };
  }, [disabled, portalContext, modal, open, onOpenChange, refs, closeOnFocusOut]);
  index(() => {
    if (disabled) return;
    if (!floatingFocusElement) return;
    if (typeof MutationObserver !== "function") return;
    if (ignoreInitialFocus) return;
    const handleMutation = () => {
      const tabIndex = floatingFocusElement.getAttribute("tabindex");
      const tabbableContent = getTabbableContent();
      const activeEl = activeElement(getDocument(floating));
      const tabbableIndex = tabbableContent.indexOf(activeEl);
      if (tabbableIndex !== -1) {
        tabbableIndexRef.current = tabbableIndex;
      }
      if (orderRef.current.includes("floating") || activeEl !== refs.domReference.current && tabbableContent.length === 0) {
        if (tabIndex !== "0") {
          floatingFocusElement.setAttribute("tabindex", "0");
        }
      } else if (tabIndex !== "-1") {
        floatingFocusElement.setAttribute("tabindex", "-1");
      }
    };
    handleMutation();
    const observer = new MutationObserver(handleMutation);
    observer.observe(floatingFocusElement, {
      childList: true,
      subtree: true,
      attributes: true
    });
    return () => {
      observer.disconnect();
    };
  }, [disabled, floating, floatingFocusElement, refs, orderRef, getTabbableContent, ignoreInitialFocus]);
  function renderDismissButton(location) {
    if (disabled || !visuallyHiddenDismiss || !modal) {
      return null;
    }
    return /* @__PURE__ */ reactExports.createElement(VisuallyHiddenDismiss, {
      ref: location === "start" ? startDismissButtonRef : endDismissButtonRef,
      onClick: (event) => onOpenChange(false, event.nativeEvent)
    }, typeof visuallyHiddenDismiss === "string" ? visuallyHiddenDismiss : "Dismiss");
  }
  const shouldRenderGuards = !disabled && guards && (modal ? !isUntrappedTypeableCombobox : true) && (isInsidePortal || modal);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, shouldRenderGuards && /* @__PURE__ */ reactExports.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.beforeInsideRef,
    onFocus: (event) => {
      if (modal) {
        const els = getTabbableElements2();
        enqueueFocus(order[0] === "reference" ? els[0] : els[els.length - 1]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        preventReturnFocusRef.current = false;
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const nextTabbable = getNextTabbable() || domReference;
          nextTabbable == null || nextTabbable.focus();
        } else {
          var _portalContext$before;
          (_portalContext$before = portalContext.beforeOutsideRef.current) == null || _portalContext$before.focus();
        }
      }
    }
  }), !isUntrappedTypeableCombobox && renderDismissButton("start"), children, renderDismissButton("end"), shouldRenderGuards && /* @__PURE__ */ reactExports.createElement(FocusGuard, {
    "data-type": "inside",
    ref: portalContext == null ? void 0 : portalContext.afterInsideRef,
    onFocus: (event) => {
      if (modal) {
        enqueueFocus(getTabbableElements2()[0]);
      } else if (portalContext != null && portalContext.preserveTabOrder && portalContext.portalNode) {
        if (closeOnFocusOut) {
          preventReturnFocusRef.current = true;
        }
        if (isOutsideEvent(event, portalContext.portalNode)) {
          const prevTabbable = getPreviousTabbable() || domReference;
          prevTabbable == null || prevTabbable.focus();
        } else {
          var _portalContext$afterO;
          (_portalContext$afterO = portalContext.afterOutsideRef.current) == null || _portalContext$afterO.focus();
        }
      }
    }
  }));
}
function isButtonTarget(event) {
  return isHTMLElement(event.target) && event.target.tagName === "BUTTON";
}
function isSpaceIgnored(element) {
  return isTypeableElement(element);
}
function useClick(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    dataRef,
    elements: {
      domReference
    }
  } = context;
  const {
    enabled = true,
    event: eventOption = "click",
    toggle = true,
    ignoreMouse = false,
    keyboardHandlers = true
  } = props;
  const pointerTypeRef = reactExports.useRef();
  const didKeyDownRef = reactExports.useRef(false);
  const reference = reactExports.useMemo(() => ({
    onPointerDown(event) {
      pointerTypeRef.current = event.pointerType;
    },
    onMouseDown(event) {
      const pointerType = pointerTypeRef.current;
      if (event.button !== 0) return;
      if (eventOption === "click") return;
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "mousedown" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        event.preventDefault();
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onClick(event) {
      const pointerType = pointerTypeRef.current;
      if (eventOption === "mousedown" && pointerTypeRef.current) {
        pointerTypeRef.current = void 0;
        return;
      }
      if (isMouseLikePointerType(pointerType, true) && ignoreMouse) return;
      if (open && toggle && (dataRef.current.openEvent ? dataRef.current.openEvent.type === "click" : true)) {
        onOpenChange(false, event.nativeEvent, "click");
      } else {
        onOpenChange(true, event.nativeEvent, "click");
      }
    },
    onKeyDown(event) {
      pointerTypeRef.current = void 0;
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event)) {
        return;
      }
      if (event.key === " " && !isSpaceIgnored(domReference)) {
        event.preventDefault();
        didKeyDownRef.current = true;
      }
      if (event.key === "Enter") {
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    },
    onKeyUp(event) {
      if (event.defaultPrevented || !keyboardHandlers || isButtonTarget(event) || isSpaceIgnored(domReference)) {
        return;
      }
      if (event.key === " " && didKeyDownRef.current) {
        didKeyDownRef.current = false;
        if (open && toggle) {
          onOpenChange(false, event.nativeEvent, "click");
        } else {
          onOpenChange(true, event.nativeEvent, "click");
        }
      }
    }
  }), [dataRef, domReference, eventOption, ignoreMouse, keyboardHandlers, onOpenChange, open, toggle]);
  return reactExports.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
const bubbleHandlerKeys = {
  pointerdown: "onPointerDown",
  mousedown: "onMouseDown",
  click: "onClick"
};
const captureHandlerKeys = {
  pointerdown: "onPointerDownCapture",
  mousedown: "onMouseDownCapture",
  click: "onClickCapture"
};
const normalizeProp = (normalizable) => {
  var _normalizable$escapeK, _normalizable$outside;
  return {
    escapeKey: typeof normalizable === "boolean" ? normalizable : (_normalizable$escapeK = normalizable == null ? void 0 : normalizable.escapeKey) != null ? _normalizable$escapeK : false,
    outsidePress: typeof normalizable === "boolean" ? normalizable : (_normalizable$outside = normalizable == null ? void 0 : normalizable.outsidePress) != null ? _normalizable$outside : true
  };
};
function useDismiss(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    elements,
    dataRef
  } = context;
  const {
    enabled = true,
    escapeKey = true,
    outsidePress: unstable_outsidePress = true,
    outsidePressEvent = "pointerdown",
    referencePress = false,
    referencePressEvent = "pointerdown",
    ancestorScroll = false,
    bubbles,
    capture
  } = props;
  const tree = useFloatingTree();
  const outsidePressFn = useEffectEvent(typeof unstable_outsidePress === "function" ? unstable_outsidePress : () => false);
  const outsidePress = typeof unstable_outsidePress === "function" ? outsidePressFn : unstable_outsidePress;
  const insideReactTreeRef = reactExports.useRef(false);
  const endedOrStartedInsideRef = reactExports.useRef(false);
  const {
    escapeKey: escapeKeyBubbles,
    outsidePress: outsidePressBubbles
  } = normalizeProp(bubbles);
  const {
    escapeKey: escapeKeyCapture,
    outsidePress: outsidePressCapture
  } = normalizeProp(capture);
  const isComposingRef = reactExports.useRef(false);
  const closeOnEscapeKeyDown = useEffectEvent((event) => {
    var _dataRef$current$floa;
    if (!open || !enabled || !escapeKey || event.key !== "Escape") {
      return;
    }
    if (isComposingRef.current) {
      return;
    }
    const nodeId = (_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.nodeId;
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (!escapeKeyBubbles) {
      event.stopPropagation();
      if (children.length > 0) {
        let shouldDismiss = true;
        children.forEach((child) => {
          var _child$context;
          if ((_child$context = child.context) != null && _child$context.open && !child.context.dataRef.current.__escapeKeyBubbles) {
            shouldDismiss = false;
            return;
          }
        });
        if (!shouldDismiss) {
          return;
        }
      }
    }
    onOpenChange(false, isReactEvent(event) ? event.nativeEvent : event, "escape-key");
  });
  const closeOnEscapeKeyDownCapture = useEffectEvent((event) => {
    var _getTarget2;
    const callback = () => {
      var _getTarget;
      closeOnEscapeKeyDown(event);
      (_getTarget = getTarget(event)) == null || _getTarget.removeEventListener("keydown", callback);
    };
    (_getTarget2 = getTarget(event)) == null || _getTarget2.addEventListener("keydown", callback);
  });
  const closeOnPressOutside = useEffectEvent((event) => {
    var _dataRef$current$floa2;
    const insideReactTree = insideReactTreeRef.current;
    insideReactTreeRef.current = false;
    const endedOrStartedInside = endedOrStartedInsideRef.current;
    endedOrStartedInsideRef.current = false;
    if (outsidePressEvent === "click" && endedOrStartedInside) {
      return;
    }
    if (insideReactTree) {
      return;
    }
    if (typeof outsidePress === "function" && !outsidePress(event)) {
      return;
    }
    const target = getTarget(event);
    const inertSelector = "[" + createAttribute("inert") + "]";
    const markers = getDocument(elements.floating).querySelectorAll(inertSelector);
    let targetRootAncestor = isElement(target) ? target : null;
    while (targetRootAncestor && !isLastTraversableNode(targetRootAncestor)) {
      const nextParent = getParentNode(targetRootAncestor);
      if (isLastTraversableNode(nextParent) || !isElement(nextParent)) {
        break;
      }
      targetRootAncestor = nextParent;
    }
    if (markers.length && isElement(target) && !isRootElement(target) && // Clicked on a direct ancestor (e.g. FloatingOverlay).
    !contains(target, elements.floating) && // If the target root element contains none of the markers, then the
    // element was injected after the floating element rendered.
    Array.from(markers).every((marker) => !contains(targetRootAncestor, marker))) {
      return;
    }
    if (isHTMLElement(target) && floating) {
      const canScrollX = target.clientWidth > 0 && target.scrollWidth > target.clientWidth;
      const canScrollY = target.clientHeight > 0 && target.scrollHeight > target.clientHeight;
      let xCond = canScrollY && event.offsetX > target.clientWidth;
      if (canScrollY) {
        const isRTL2 = getComputedStyle$1(target).direction === "rtl";
        if (isRTL2) {
          xCond = event.offsetX <= target.offsetWidth - target.clientWidth;
        }
      }
      if (xCond || canScrollX && event.offsetY > target.clientHeight) {
        return;
      }
    }
    const nodeId = (_dataRef$current$floa2 = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa2.nodeId;
    const targetIsInsideChildren = tree && getChildren(tree.nodesRef.current, nodeId).some((node) => {
      var _node$context;
      return isEventTargetWithin(event, (_node$context = node.context) == null ? void 0 : _node$context.elements.floating);
    });
    if (isEventTargetWithin(event, elements.floating) || isEventTargetWithin(event, elements.domReference) || targetIsInsideChildren) {
      return;
    }
    const children = tree ? getChildren(tree.nodesRef.current, nodeId) : [];
    if (children.length > 0) {
      let shouldDismiss = true;
      children.forEach((child) => {
        var _child$context2;
        if ((_child$context2 = child.context) != null && _child$context2.open && !child.context.dataRef.current.__outsidePressBubbles) {
          shouldDismiss = false;
          return;
        }
      });
      if (!shouldDismiss) {
        return;
      }
    }
    onOpenChange(false, event, "outside-press");
  });
  const closeOnPressOutsideCapture = useEffectEvent((event) => {
    var _getTarget4;
    const callback = () => {
      var _getTarget3;
      closeOnPressOutside(event);
      (_getTarget3 = getTarget(event)) == null || _getTarget3.removeEventListener(outsidePressEvent, callback);
    };
    (_getTarget4 = getTarget(event)) == null || _getTarget4.addEventListener(outsidePressEvent, callback);
  });
  reactExports.useEffect(() => {
    if (!open || !enabled) {
      return;
    }
    dataRef.current.__escapeKeyBubbles = escapeKeyBubbles;
    dataRef.current.__outsidePressBubbles = outsidePressBubbles;
    let compositionTimeout = -1;
    function onScroll(event) {
      onOpenChange(false, event, "ancestor-scroll");
    }
    function handleCompositionStart() {
      window.clearTimeout(compositionTimeout);
      isComposingRef.current = true;
    }
    function handleCompositionEnd() {
      compositionTimeout = window.setTimeout(
        () => {
          isComposingRef.current = false;
        },
        // 0ms or 1ms don't work in Safari. 5ms appears to consistently work.
        // Only apply to WebKit for the test to remain 0ms.
        isWebKit() ? 5 : 0
      );
    }
    const doc = getDocument(elements.floating);
    if (escapeKey) {
      doc.addEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
      doc.addEventListener("compositionstart", handleCompositionStart);
      doc.addEventListener("compositionend", handleCompositionEnd);
    }
    outsidePress && doc.addEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
    let ancestors = [];
    if (ancestorScroll) {
      if (isElement(elements.domReference)) {
        ancestors = getOverflowAncestors(elements.domReference);
      }
      if (isElement(elements.floating)) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.floating));
      }
      if (!isElement(elements.reference) && elements.reference && elements.reference.contextElement) {
        ancestors = ancestors.concat(getOverflowAncestors(elements.reference.contextElement));
      }
    }
    ancestors = ancestors.filter((ancestor) => {
      var _doc$defaultView;
      return ancestor !== ((_doc$defaultView = doc.defaultView) == null ? void 0 : _doc$defaultView.visualViewport);
    });
    ancestors.forEach((ancestor) => {
      ancestor.addEventListener("scroll", onScroll, {
        passive: true
      });
    });
    return () => {
      if (escapeKey) {
        doc.removeEventListener("keydown", escapeKeyCapture ? closeOnEscapeKeyDownCapture : closeOnEscapeKeyDown, escapeKeyCapture);
        doc.removeEventListener("compositionstart", handleCompositionStart);
        doc.removeEventListener("compositionend", handleCompositionEnd);
      }
      outsidePress && doc.removeEventListener(outsidePressEvent, outsidePressCapture ? closeOnPressOutsideCapture : closeOnPressOutside, outsidePressCapture);
      ancestors.forEach((ancestor) => {
        ancestor.removeEventListener("scroll", onScroll);
      });
      window.clearTimeout(compositionTimeout);
    };
  }, [dataRef, elements, escapeKey, outsidePress, outsidePressEvent, open, onOpenChange, ancestorScroll, enabled, escapeKeyBubbles, outsidePressBubbles, closeOnEscapeKeyDown, escapeKeyCapture, closeOnEscapeKeyDownCapture, closeOnPressOutside, outsidePressCapture, closeOnPressOutsideCapture]);
  reactExports.useEffect(() => {
    insideReactTreeRef.current = false;
  }, [outsidePress, outsidePressEvent]);
  const reference = reactExports.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    [bubbleHandlerKeys[referencePressEvent]]: (event) => {
      if (referencePress) {
        onOpenChange(false, event.nativeEvent, "reference-press");
      }
    }
  }), [closeOnEscapeKeyDown, onOpenChange, referencePress, referencePressEvent]);
  const floating = reactExports.useMemo(() => ({
    onKeyDown: closeOnEscapeKeyDown,
    onMouseDown() {
      endedOrStartedInsideRef.current = true;
    },
    onMouseUp() {
      endedOrStartedInsideRef.current = true;
    },
    [captureHandlerKeys[outsidePressEvent]]: () => {
      insideReactTreeRef.current = true;
    }
  }), [closeOnEscapeKeyDown, outsidePressEvent]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating
  } : {}, [enabled, reference, floating]);
}
function useFloatingRootContext(options) {
  const {
    open = false,
    onOpenChange: onOpenChangeProp,
    elements: elementsProp
  } = options;
  const floatingId = useId();
  const dataRef = reactExports.useRef({});
  const [events] = reactExports.useState(() => createPubSub());
  const nested = useFloatingParentNodeId() != null;
  const [positionReference, setPositionReference] = reactExports.useState(elementsProp.reference);
  const onOpenChange = useEffectEvent((open2, event, reason) => {
    dataRef.current.openEvent = open2 ? event : void 0;
    events.emit("openchange", {
      open: open2,
      event,
      reason,
      nested
    });
    onOpenChangeProp == null || onOpenChangeProp(open2, event, reason);
  });
  const refs = reactExports.useMemo(() => ({
    setPositionReference
  }), []);
  const elements = reactExports.useMemo(() => ({
    reference: positionReference || elementsProp.reference || null,
    floating: elementsProp.floating || null,
    domReference: elementsProp.reference
  }), [positionReference, elementsProp.reference, elementsProp.floating]);
  return reactExports.useMemo(() => ({
    dataRef,
    open,
    onOpenChange,
    elements,
    events,
    floatingId,
    refs
  }), [open, onOpenChange, elements, events, floatingId, refs]);
}
function useFloating(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    nodeId
  } = options;
  const internalRootContext = useFloatingRootContext({
    ...options,
    elements: {
      reference: null,
      floating: null,
      ...options.elements
    }
  });
  const rootContext = options.rootContext || internalRootContext;
  const computedElements = rootContext.elements;
  const [_domReference, setDomReference] = reactExports.useState(null);
  const [positionReference, _setPositionReference] = reactExports.useState(null);
  const optionDomReference = computedElements == null ? void 0 : computedElements.domReference;
  const domReference = optionDomReference || _domReference;
  const domReferenceRef = reactExports.useRef(null);
  const tree = useFloatingTree();
  index(() => {
    if (domReference) {
      domReferenceRef.current = domReference;
    }
  }, [domReference]);
  const position = useFloating$1({
    ...options,
    elements: {
      ...computedElements,
      ...positionReference && {
        reference: positionReference
      }
    }
  });
  const setPositionReference = reactExports.useCallback((node) => {
    const computedPositionReference = isElement(node) ? {
      getBoundingClientRect: () => node.getBoundingClientRect(),
      contextElement: node
    } : node;
    _setPositionReference(computedPositionReference);
    position.refs.setReference(computedPositionReference);
  }, [position.refs]);
  const setReference = reactExports.useCallback((node) => {
    if (isElement(node) || node === null) {
      domReferenceRef.current = node;
      setDomReference(node);
    }
    if (isElement(position.refs.reference.current) || position.refs.reference.current === null || // Don't allow setting virtual elements using the old technique back to
    // `null` to support `positionReference` + an unstable `reference`
    // callback ref.
    node !== null && !isElement(node)) {
      position.refs.setReference(node);
    }
  }, [position.refs]);
  const refs = reactExports.useMemo(() => ({
    ...position.refs,
    setReference,
    setPositionReference,
    domReference: domReferenceRef
  }), [position.refs, setReference, setPositionReference]);
  const elements = reactExports.useMemo(() => ({
    ...position.elements,
    domReference
  }), [position.elements, domReference]);
  const context = reactExports.useMemo(() => ({
    ...position,
    ...rootContext,
    refs,
    elements,
    nodeId
  }), [position, refs, elements, nodeId, rootContext]);
  index(() => {
    rootContext.dataRef.current.floatingContext = context;
    const node = tree == null ? void 0 : tree.nodesRef.current.find((node2) => node2.id === nodeId);
    if (node) {
      node.context = context;
    }
  });
  return reactExports.useMemo(() => ({
    ...position,
    context,
    refs,
    elements
  }), [position, refs, elements, context]);
}
function useFocus(context, props) {
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    onOpenChange,
    events,
    dataRef,
    elements
  } = context;
  const {
    enabled = true,
    visibleOnly = true
  } = props;
  const blockFocusRef = reactExports.useRef(false);
  const timeoutRef = reactExports.useRef();
  const keyboardModalityRef = reactExports.useRef(true);
  reactExports.useEffect(() => {
    if (!enabled) return;
    const win = getWindow(elements.domReference);
    function onBlur() {
      if (!open && isHTMLElement(elements.domReference) && elements.domReference === activeElement(getDocument(elements.domReference))) {
        blockFocusRef.current = true;
      }
    }
    function onKeyDown() {
      keyboardModalityRef.current = true;
    }
    win.addEventListener("blur", onBlur);
    win.addEventListener("keydown", onKeyDown, true);
    return () => {
      win.removeEventListener("blur", onBlur);
      win.removeEventListener("keydown", onKeyDown, true);
    };
  }, [elements.domReference, open, enabled]);
  reactExports.useEffect(() => {
    if (!enabled) return;
    function onOpenChange2(_ref) {
      let {
        reason
      } = _ref;
      if (reason === "reference-press" || reason === "escape-key") {
        blockFocusRef.current = true;
      }
    }
    events.on("openchange", onOpenChange2);
    return () => {
      events.off("openchange", onOpenChange2);
    };
  }, [events, enabled]);
  reactExports.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);
  const reference = reactExports.useMemo(() => ({
    onPointerDown(event) {
      if (isVirtualPointerEvent(event.nativeEvent)) return;
      keyboardModalityRef.current = false;
    },
    onMouseLeave() {
      blockFocusRef.current = false;
    },
    onFocus(event) {
      if (blockFocusRef.current) return;
      const target = getTarget(event.nativeEvent);
      if (visibleOnly && isElement(target)) {
        try {
          if (isSafari() && isMac()) throw Error();
          if (!target.matches(":focus-visible")) return;
        } catch (e) {
          if (!keyboardModalityRef.current && !isTypeableElement(target)) {
            return;
          }
        }
      }
      onOpenChange(true, event.nativeEvent, "focus");
    },
    onBlur(event) {
      blockFocusRef.current = false;
      const relatedTarget = event.relatedTarget;
      const nativeEvent = event.nativeEvent;
      const movedToFocusGuard = isElement(relatedTarget) && relatedTarget.hasAttribute(createAttribute("focus-guard")) && relatedTarget.getAttribute("data-type") === "outside";
      timeoutRef.current = window.setTimeout(() => {
        var _dataRef$current$floa;
        const activeEl = activeElement(elements.domReference ? elements.domReference.ownerDocument : document);
        if (!relatedTarget && activeEl === elements.domReference) return;
        if (contains((_dataRef$current$floa = dataRef.current.floatingContext) == null ? void 0 : _dataRef$current$floa.refs.floating.current, activeEl) || contains(elements.domReference, activeEl) || movedToFocusGuard) {
          return;
        }
        onOpenChange(false, nativeEvent, "focus");
      });
    }
  }), [dataRef, elements.domReference, onOpenChange, visibleOnly]);
  return reactExports.useMemo(() => enabled ? {
    reference
  } : {}, [enabled, reference]);
}
const ACTIVE_KEY = "active";
const SELECTED_KEY = "selected";
function mergeProps(userProps, propsList, elementKey) {
  const map = /* @__PURE__ */ new Map();
  const isItem = elementKey === "item";
  let domUserProps = userProps;
  if (isItem && userProps) {
    const {
      [ACTIVE_KEY]: _,
      [SELECTED_KEY]: __,
      ...validProps
    } = userProps;
    domUserProps = validProps;
  }
  return {
    ...elementKey === "floating" && {
      tabIndex: -1,
      [FOCUSABLE_ATTRIBUTE]: ""
    },
    ...domUserProps,
    ...propsList.map((value) => {
      const propsOrGetProps = value ? value[elementKey] : null;
      if (typeof propsOrGetProps === "function") {
        return userProps ? propsOrGetProps(userProps) : null;
      }
      return propsOrGetProps;
    }).concat(userProps).reduce((acc, props) => {
      if (!props) {
        return acc;
      }
      Object.entries(props).forEach((_ref) => {
        let [key, value] = _ref;
        if (isItem && [ACTIVE_KEY, SELECTED_KEY].includes(key)) {
          return;
        }
        if (key.indexOf("on") === 0) {
          if (!map.has(key)) {
            map.set(key, []);
          }
          if (typeof value === "function") {
            var _map$get;
            (_map$get = map.get(key)) == null || _map$get.push(value);
            acc[key] = function() {
              var _map$get2;
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              return (_map$get2 = map.get(key)) == null ? void 0 : _map$get2.map((fn) => fn(...args)).find((val) => val !== void 0);
            };
          }
        } else {
          acc[key] = value;
        }
      });
      return acc;
    }, {})
  };
}
function useInteractions(propsList) {
  if (propsList === void 0) {
    propsList = [];
  }
  const referenceDeps = propsList.map((key) => key == null ? void 0 : key.reference);
  const floatingDeps = propsList.map((key) => key == null ? void 0 : key.floating);
  const itemDeps = propsList.map((key) => key == null ? void 0 : key.item);
  const getReferenceProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "reference"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    referenceDeps
  );
  const getFloatingProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "floating"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    floatingDeps
  );
  const getItemProps = reactExports.useCallback(
    (userProps) => mergeProps(userProps, propsList, "item"),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    itemDeps
  );
  return reactExports.useMemo(() => ({
    getReferenceProps,
    getFloatingProps,
    getItemProps
  }), [getReferenceProps, getFloatingProps, getItemProps]);
}
let isPreventScrollSupported = false;
function doSwitch(orientation, vertical, horizontal) {
  switch (orientation) {
    case "vertical":
      return vertical;
    case "horizontal":
      return horizontal;
    default:
      return vertical || horizontal;
  }
}
function isMainOrientationKey(key, orientation) {
  const vertical = key === ARROW_UP || key === ARROW_DOWN;
  const horizontal = key === ARROW_LEFT || key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal);
}
function isMainOrientationToEndKey(key, orientation, rtl) {
  const vertical = key === ARROW_DOWN;
  const horizontal = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  return doSwitch(orientation, vertical, horizontal) || key === "Enter" || key === " " || key === "";
}
function isCrossOrientationOpenKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_LEFT : key === ARROW_RIGHT;
  const horizontal = key === ARROW_DOWN;
  return doSwitch(orientation, vertical, horizontal);
}
function isCrossOrientationCloseKey(key, orientation, rtl) {
  const vertical = rtl ? key === ARROW_RIGHT : key === ARROW_LEFT;
  const horizontal = key === ARROW_UP;
  return doSwitch(orientation, vertical, horizontal);
}
function useListNavigation(context, props) {
  const {
    open,
    onOpenChange,
    elements
  } = context;
  const {
    listRef,
    activeIndex,
    onNavigate: unstable_onNavigate = () => {
    },
    enabled = true,
    selectedIndex = null,
    allowEscape = false,
    loop = false,
    nested = false,
    rtl = false,
    virtual = false,
    focusItemOnOpen = "auto",
    focusItemOnHover = true,
    openOnArrowKeyDown = true,
    disabledIndices = void 0,
    orientation = "vertical",
    cols = 1,
    scrollItemIntoView = true,
    virtualItemRef,
    itemSizes,
    dense = false
  } = props;
  const floatingFocusElement = getFloatingFocusElement(elements.floating);
  const floatingFocusElementRef = useLatestRef(floatingFocusElement);
  const parentId = useFloatingParentNodeId();
  const tree = useFloatingTree();
  const onNavigate = useEffectEvent(unstable_onNavigate);
  const typeableComboboxReference = isTypeableCombobox(elements.domReference);
  const focusItemOnOpenRef = reactExports.useRef(focusItemOnOpen);
  const indexRef = reactExports.useRef(selectedIndex != null ? selectedIndex : -1);
  const keyRef = reactExports.useRef(null);
  const isPointerModalityRef = reactExports.useRef(true);
  const previousOnNavigateRef = reactExports.useRef(onNavigate);
  const previousMountedRef = reactExports.useRef(!!elements.floating);
  const previousOpenRef = reactExports.useRef(open);
  const forceSyncFocus = reactExports.useRef(false);
  const forceScrollIntoViewRef = reactExports.useRef(false);
  const disabledIndicesRef = useLatestRef(disabledIndices);
  const latestOpenRef = useLatestRef(open);
  const scrollItemIntoViewRef = useLatestRef(scrollItemIntoView);
  const selectedIndexRef = useLatestRef(selectedIndex);
  const [activeId, setActiveId] = reactExports.useState();
  const [virtualId, setVirtualId] = reactExports.useState();
  const focusItem = useEffectEvent(function(listRef2, indexRef2, forceScrollIntoView) {
    if (forceScrollIntoView === void 0) {
      forceScrollIntoView = false;
    }
    function runFocus(item2) {
      if (virtual) {
        setActiveId(item2.id);
        tree == null || tree.events.emit("virtualfocus", item2);
        if (virtualItemRef) {
          virtualItemRef.current = item2;
        }
      } else {
        enqueueFocus(item2, {
          preventScroll: true,
          // Mac Safari does not move the virtual cursor unless the focus call
          // is sync. However, for the very first focus call, we need to wait
          // for the position to be ready in order to prevent unwanted
          // scrolling. This means the virtual cursor will not move to the first
          // item when first opening the floating element, but will on
          // subsequent calls. `preventScroll` is supported in modern Safari,
          // so we can use that instead.
          // iOS Safari must be async or the first item will not be focused.
          sync: isMac() && isSafari() ? isPreventScrollSupported || forceSyncFocus.current : false
        });
      }
    }
    const initialItem = listRef2.current[indexRef2.current];
    if (initialItem) {
      runFocus(initialItem);
    }
    requestAnimationFrame(() => {
      const waitedItem = listRef2.current[indexRef2.current] || initialItem;
      if (!waitedItem) return;
      if (!initialItem) {
        runFocus(waitedItem);
      }
      const scrollIntoViewOptions = scrollItemIntoViewRef.current;
      const shouldScrollIntoView = scrollIntoViewOptions && item && (forceScrollIntoView || !isPointerModalityRef.current);
      if (shouldScrollIntoView) {
        waitedItem.scrollIntoView == null || waitedItem.scrollIntoView(typeof scrollIntoViewOptions === "boolean" ? {
          block: "nearest",
          inline: "nearest"
        } : scrollIntoViewOptions);
      }
    });
  });
  index(() => {
    document.createElement("div").focus({
      get preventScroll() {
        isPreventScrollSupported = true;
        return false;
      }
    });
  }, []);
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (focusItemOnOpenRef.current && selectedIndex != null) {
        forceScrollIntoViewRef.current = true;
        indexRef.current = selectedIndex;
        onNavigate(selectedIndex);
      }
    } else if (previousMountedRef.current) {
      indexRef.current = -1;
      previousOnNavigateRef.current(null);
    }
  }, [enabled, open, elements.floating, selectedIndex, onNavigate]);
  index(() => {
    if (!enabled) return;
    if (open && elements.floating) {
      if (activeIndex == null) {
        forceSyncFocus.current = false;
        if (selectedIndexRef.current != null) {
          return;
        }
        if (previousMountedRef.current) {
          indexRef.current = -1;
          focusItem(listRef, indexRef);
        }
        if ((!previousOpenRef.current || !previousMountedRef.current) && focusItemOnOpenRef.current && (keyRef.current != null || focusItemOnOpenRef.current === true && keyRef.current == null)) {
          let runs = 0;
          const waitForListPopulated = () => {
            if (listRef.current[0] == null) {
              if (runs < 2) {
                const scheduler = runs ? requestAnimationFrame : queueMicrotask;
                scheduler(waitForListPopulated);
              }
              runs++;
            } else {
              indexRef.current = keyRef.current == null || isMainOrientationToEndKey(keyRef.current, orientation, rtl) || nested ? getMinIndex(listRef, disabledIndicesRef.current) : getMaxIndex(listRef, disabledIndicesRef.current);
              keyRef.current = null;
              onNavigate(indexRef.current);
            }
          };
          waitForListPopulated();
        }
      } else if (!isIndexOutOfBounds(listRef, activeIndex)) {
        indexRef.current = activeIndex;
        focusItem(listRef, indexRef, forceScrollIntoViewRef.current);
        forceScrollIntoViewRef.current = false;
      }
    }
  }, [enabled, open, elements.floating, activeIndex, selectedIndexRef, nested, listRef, orientation, rtl, onNavigate, focusItem, disabledIndicesRef]);
  index(() => {
    var _nodes$find;
    if (!enabled || elements.floating || !tree || virtual || !previousMountedRef.current) {
      return;
    }
    const nodes = tree.nodesRef.current;
    const parent = (_nodes$find = nodes.find((node) => node.id === parentId)) == null || (_nodes$find = _nodes$find.context) == null ? void 0 : _nodes$find.elements.floating;
    const activeEl = activeElement(getDocument(elements.floating));
    const treeContainsActiveEl = nodes.some((node) => node.context && contains(node.context.elements.floating, activeEl));
    if (parent && !treeContainsActiveEl && isPointerModalityRef.current) {
      parent.focus({
        preventScroll: true
      });
    }
  }, [enabled, elements.floating, tree, parentId, virtual]);
  index(() => {
    if (!enabled) return;
    if (!tree) return;
    if (!virtual) return;
    if (parentId) return;
    function handleVirtualFocus(item2) {
      setVirtualId(item2.id);
      if (virtualItemRef) {
        virtualItemRef.current = item2;
      }
    }
    tree.events.on("virtualfocus", handleVirtualFocus);
    return () => {
      tree.events.off("virtualfocus", handleVirtualFocus);
    };
  }, [enabled, tree, virtual, parentId, virtualItemRef]);
  index(() => {
    previousOnNavigateRef.current = onNavigate;
    previousMountedRef.current = !!elements.floating;
  });
  index(() => {
    if (!open) {
      keyRef.current = null;
    }
  }, [open]);
  index(() => {
    previousOpenRef.current = open;
  }, [open]);
  const hasActiveIndex = activeIndex != null;
  const item = reactExports.useMemo(() => {
    function syncCurrentTarget(currentTarget) {
      if (!open) return;
      const index2 = listRef.current.indexOf(currentTarget);
      if (index2 !== -1) {
        onNavigate(index2);
      }
    }
    const props2 = {
      onFocus(_ref) {
        let {
          currentTarget
        } = _ref;
        syncCurrentTarget(currentTarget);
      },
      onClick: (_ref2) => {
        let {
          currentTarget
        } = _ref2;
        return currentTarget.focus({
          preventScroll: true
        });
      },
      // Safari
      ...focusItemOnHover && {
        onMouseMove(_ref3) {
          let {
            currentTarget
          } = _ref3;
          syncCurrentTarget(currentTarget);
        },
        onPointerLeave(_ref4) {
          let {
            pointerType
          } = _ref4;
          if (!isPointerModalityRef.current || pointerType === "touch") {
            return;
          }
          indexRef.current = -1;
          focusItem(listRef, indexRef);
          onNavigate(null);
          if (!virtual) {
            enqueueFocus(floatingFocusElementRef.current, {
              preventScroll: true
            });
          }
        }
      }
    };
    return props2;
  }, [open, floatingFocusElementRef, focusItem, focusItemOnHover, listRef, onNavigate, virtual]);
  const commonOnKeyDown = useEffectEvent((event) => {
    isPointerModalityRef.current = false;
    forceSyncFocus.current = true;
    if (event.which === 229) {
      return;
    }
    if (!latestOpenRef.current && event.currentTarget === floatingFocusElementRef.current) {
      return;
    }
    if (nested && isCrossOrientationCloseKey(event.key, orientation, rtl)) {
      stopEvent(event);
      onOpenChange(false, event.nativeEvent, "list-navigation");
      if (isHTMLElement(elements.domReference)) {
        if (virtual) {
          tree == null || tree.events.emit("virtualfocus", elements.domReference);
        } else {
          elements.domReference.focus();
        }
      }
      return;
    }
    const currentIndex = indexRef.current;
    const minIndex = getMinIndex(listRef, disabledIndices);
    const maxIndex = getMaxIndex(listRef, disabledIndices);
    if (!typeableComboboxReference) {
      if (event.key === "Home") {
        stopEvent(event);
        indexRef.current = minIndex;
        onNavigate(indexRef.current);
      }
      if (event.key === "End") {
        stopEvent(event);
        indexRef.current = maxIndex;
        onNavigate(indexRef.current);
      }
    }
    if (cols > 1) {
      const sizes = itemSizes || Array.from({
        length: listRef.current.length
      }, () => ({
        width: 1,
        height: 1
      }));
      const cellMap = buildCellMap(sizes, cols, dense);
      const minGridIndex = cellMap.findIndex((index3) => index3 != null && !isDisabled(listRef.current, index3, disabledIndices));
      const maxGridIndex = cellMap.reduce((foundIndex, index3, cellIndex) => index3 != null && !isDisabled(listRef.current, index3, disabledIndices) ? cellIndex : foundIndex, -1);
      const index2 = cellMap[getGridNavigatedIndex({
        current: cellMap.map((itemIndex) => itemIndex != null ? listRef.current[itemIndex] : null)
      }, {
        event,
        orientation,
        loop,
        cols,
        // treat undefined (empty grid spaces) as disabled indices so we
        // don't end up in them
        disabledIndices: getCellIndices([...disabledIndices || listRef.current.map((_, index3) => isDisabled(listRef.current, index3) ? index3 : void 0), void 0], cellMap),
        minIndex: minGridIndex,
        maxIndex: maxGridIndex,
        prevIndex: getCellIndexOfCorner(
          indexRef.current > maxIndex ? minIndex : indexRef.current,
          sizes,
          cellMap,
          cols,
          // use a corner matching the edge closest to the direction
          // we're moving in so we don't end up in the same item. Prefer
          // top/left over bottom/right.
          event.key === ARROW_DOWN ? "bl" : event.key === ARROW_RIGHT ? "tr" : "tl"
        ),
        stopEvent: true
      })];
      if (index2 != null) {
        indexRef.current = index2;
        onNavigate(indexRef.current);
      }
      if (orientation === "both") {
        return;
      }
    }
    if (isMainOrientationKey(event.key, orientation)) {
      stopEvent(event);
      if (open && !virtual && activeElement(event.currentTarget.ownerDocument) === event.currentTarget) {
        indexRef.current = isMainOrientationToEndKey(event.key, orientation, rtl) ? minIndex : maxIndex;
        onNavigate(indexRef.current);
        return;
      }
      if (isMainOrientationToEndKey(event.key, orientation, rtl)) {
        if (loop) {
          indexRef.current = currentIndex >= maxIndex ? allowEscape && currentIndex !== listRef.current.length ? -1 : minIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          });
        } else {
          indexRef.current = Math.min(maxIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            disabledIndices
          }));
        }
      } else {
        if (loop) {
          indexRef.current = currentIndex <= minIndex ? allowEscape && currentIndex !== -1 ? listRef.current.length : maxIndex : findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          });
        } else {
          indexRef.current = Math.max(minIndex, findNonDisabledIndex(listRef, {
            startingIndex: currentIndex,
            decrement: true,
            disabledIndices
          }));
        }
      }
      if (isIndexOutOfBounds(listRef, indexRef.current)) {
        onNavigate(null);
      } else {
        onNavigate(indexRef.current);
      }
    }
  });
  const ariaActiveDescendantProp = reactExports.useMemo(() => {
    return virtual && open && hasActiveIndex && {
      "aria-activedescendant": virtualId || activeId
    };
  }, [virtual, open, hasActiveIndex, virtualId, activeId]);
  const floating = reactExports.useMemo(() => {
    return {
      "aria-orientation": orientation === "both" ? void 0 : orientation,
      ...!isTypeableCombobox(elements.domReference) && ariaActiveDescendantProp,
      onKeyDown: commonOnKeyDown,
      onPointerMove() {
        isPointerModalityRef.current = true;
      }
    };
  }, [ariaActiveDescendantProp, commonOnKeyDown, elements.domReference, orientation]);
  const reference = reactExports.useMemo(() => {
    function checkVirtualMouse(event) {
      if (focusItemOnOpen === "auto" && isVirtualClick(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    function checkVirtualPointer(event) {
      focusItemOnOpenRef.current = focusItemOnOpen;
      if (focusItemOnOpen === "auto" && isVirtualPointerEvent(event.nativeEvent)) {
        focusItemOnOpenRef.current = true;
      }
    }
    return {
      ...ariaActiveDescendantProp,
      onKeyDown(event) {
        isPointerModalityRef.current = false;
        const isArrowKey2 = event.key.startsWith("Arrow");
        const isHomeOrEndKey = ["Home", "End"].includes(event.key);
        const isMoveKey = isArrowKey2 || isHomeOrEndKey;
        const isCrossOpenKey = isCrossOrientationOpenKey(event.key, orientation, rtl);
        const isCrossCloseKey = isCrossOrientationCloseKey(event.key, orientation, rtl);
        const isMainKey = isMainOrientationKey(event.key, orientation);
        const isNavigationKey = (nested ? isCrossOpenKey : isMainKey) || event.key === "Enter" || event.key.trim() === "";
        if (virtual && open) {
          const rootNode = tree == null ? void 0 : tree.nodesRef.current.find((node) => node.parentId == null);
          const deepestNode = tree && rootNode ? getDeepestNode(tree.nodesRef.current, rootNode.id) : null;
          if (isMoveKey && deepestNode && virtualItemRef) {
            const eventObject = new KeyboardEvent("keydown", {
              key: event.key,
              bubbles: true
            });
            if (isCrossOpenKey || isCrossCloseKey) {
              var _deepestNode$context, _deepestNode$context2;
              const isCurrentTarget = ((_deepestNode$context = deepestNode.context) == null ? void 0 : _deepestNode$context.elements.domReference) === event.currentTarget;
              const dispatchItem = isCrossCloseKey && !isCurrentTarget ? (_deepestNode$context2 = deepestNode.context) == null ? void 0 : _deepestNode$context2.elements.domReference : isCrossOpenKey ? listRef.current.find((item2) => (item2 == null ? void 0 : item2.id) === activeId) : null;
              if (dispatchItem) {
                stopEvent(event);
                dispatchItem.dispatchEvent(eventObject);
                setVirtualId(void 0);
              }
            }
            if ((isMainKey || isHomeOrEndKey) && deepestNode.context) {
              if (deepestNode.context.open && deepestNode.parentId && event.currentTarget !== deepestNode.context.elements.domReference) {
                var _deepestNode$context$;
                stopEvent(event);
                (_deepestNode$context$ = deepestNode.context.elements.domReference) == null || _deepestNode$context$.dispatchEvent(eventObject);
                return;
              }
            }
          }
          return commonOnKeyDown(event);
        }
        if (!open && !openOnArrowKeyDown && isArrowKey2) {
          return;
        }
        if (isNavigationKey) {
          keyRef.current = nested && isMainKey ? null : event.key;
        }
        if (nested) {
          if (isCrossOpenKey) {
            stopEvent(event);
            if (open) {
              indexRef.current = getMinIndex(listRef, disabledIndicesRef.current);
              onNavigate(indexRef.current);
            } else {
              onOpenChange(true, event.nativeEvent, "list-navigation");
            }
          }
          return;
        }
        if (isMainKey) {
          if (selectedIndex != null) {
            indexRef.current = selectedIndex;
          }
          stopEvent(event);
          if (!open && openOnArrowKeyDown) {
            onOpenChange(true, event.nativeEvent, "list-navigation");
          } else {
            commonOnKeyDown(event);
          }
          if (open) {
            onNavigate(indexRef.current);
          }
        }
      },
      onFocus() {
        if (open && !virtual) {
          onNavigate(null);
        }
      },
      onPointerDown: checkVirtualPointer,
      onMouseDown: checkVirtualMouse,
      onClick: checkVirtualMouse
    };
  }, [activeId, ariaActiveDescendantProp, commonOnKeyDown, disabledIndicesRef, focusItemOnOpen, listRef, nested, onNavigate, onOpenChange, open, openOnArrowKeyDown, orientation, rtl, selectedIndex, tree, virtual, virtualItemRef]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
const componentRoleToAriaRoleMap = /* @__PURE__ */ new Map([["select", "listbox"], ["combobox", "listbox"], ["label", false]]);
function useRole(context, props) {
  var _componentRoleToAriaR;
  if (props === void 0) {
    props = {};
  }
  const {
    open,
    floatingId
  } = context;
  const {
    enabled = true,
    role = "dialog"
  } = props;
  const ariaRole = (_componentRoleToAriaR = componentRoleToAriaRoleMap.get(role)) != null ? _componentRoleToAriaR : role;
  const referenceId = useId();
  const parentId = useFloatingParentNodeId();
  const isNested = parentId != null;
  const reference = reactExports.useMemo(() => {
    if (ariaRole === "tooltip" || role === "label") {
      return {
        ["aria-" + (role === "label" ? "labelledby" : "describedby")]: open ? floatingId : void 0
      };
    }
    return {
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": ariaRole === "alertdialog" ? "dialog" : ariaRole,
      "aria-controls": open ? floatingId : void 0,
      ...ariaRole === "listbox" && {
        role: "combobox"
      },
      ...ariaRole === "menu" && {
        id: referenceId
      },
      ...ariaRole === "menu" && isNested && {
        role: "menuitem"
      },
      ...role === "select" && {
        "aria-autocomplete": "none"
      },
      ...role === "combobox" && {
        "aria-autocomplete": "list"
      }
    };
  }, [ariaRole, floatingId, isNested, open, referenceId, role]);
  const floating = reactExports.useMemo(() => {
    const floatingProps = {
      id: floatingId,
      ...ariaRole && {
        role: ariaRole
      }
    };
    if (ariaRole === "tooltip" || role === "label") {
      return floatingProps;
    }
    return {
      ...floatingProps,
      ...ariaRole === "menu" && {
        "aria-labelledby": referenceId
      }
    };
  }, [ariaRole, floatingId, referenceId, role]);
  const item = reactExports.useCallback((_ref) => {
    let {
      active,
      selected
    } = _ref;
    const commonProps = {
      role: "option",
      ...active && {
        id: floatingId + "-option"
      }
    };
    switch (role) {
      case "select":
        return {
          ...commonProps,
          "aria-selected": active && selected
        };
      case "combobox": {
        return {
          ...commonProps,
          ...active && {
            "aria-selected": true
          }
        };
      }
    }
    return {};
  }, [floatingId, role]);
  return reactExports.useMemo(() => enabled ? {
    reference,
    floating,
    item
  } : {}, [enabled, reference, floating, item]);
}
function isPointInPolygon(point, polygon) {
  const [x, y] = point;
  let isInside2 = false;
  const length = polygon.length;
  for (let i = 0, j = length - 1; i < length; j = i++) {
    const [xi, yi] = polygon[i] || [0, 0];
    const [xj, yj] = polygon[j] || [0, 0];
    const intersect = yi >= y !== yj >= y && x <= (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) {
      isInside2 = !isInside2;
    }
  }
  return isInside2;
}
function isInside(point, rect) {
  return point[0] >= rect.x && point[0] <= rect.x + rect.width && point[1] >= rect.y && point[1] <= rect.y + rect.height;
}
function safePolygon(options) {
  if (options === void 0) {
    options = {};
  }
  const {
    buffer = 0.5,
    blockPointerEvents = false,
    requireIntent = true
  } = options;
  let timeoutId2;
  let hasLanded = false;
  let lastX = null;
  let lastY = null;
  let lastCursorTime = performance.now();
  function getCursorSpeed(x, y) {
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastCursorTime;
    if (lastX === null || lastY === null || elapsedTime === 0) {
      lastX = x;
      lastY = y;
      lastCursorTime = currentTime;
      return null;
    }
    const deltaX = x - lastX;
    const deltaY = y - lastY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const speed = distance / elapsedTime;
    lastX = x;
    lastY = y;
    lastCursorTime = currentTime;
    return speed;
  }
  const fn = (_ref) => {
    let {
      x,
      y,
      placement,
      elements,
      onClose,
      nodeId,
      tree
    } = _ref;
    return function onMouseMove(event) {
      function close() {
        clearTimeout(timeoutId2);
        onClose();
      }
      clearTimeout(timeoutId2);
      if (!elements.domReference || !elements.floating || placement == null || x == null || y == null) {
        return;
      }
      const {
        clientX,
        clientY
      } = event;
      const clientPoint = [clientX, clientY];
      const target = getTarget(event);
      const isLeave = event.type === "mouseleave";
      const isOverFloatingEl = contains(elements.floating, target);
      const isOverReferenceEl = contains(elements.domReference, target);
      const refRect = elements.domReference.getBoundingClientRect();
      const rect = elements.floating.getBoundingClientRect();
      const side = placement.split("-")[0];
      const cursorLeaveFromRight = x > rect.right - rect.width / 2;
      const cursorLeaveFromBottom = y > rect.bottom - rect.height / 2;
      const isOverReferenceRect = isInside(clientPoint, refRect);
      const isFloatingWider = rect.width > refRect.width;
      const isFloatingTaller = rect.height > refRect.height;
      const left = (isFloatingWider ? refRect : rect).left;
      const right = (isFloatingWider ? refRect : rect).right;
      const top = (isFloatingTaller ? refRect : rect).top;
      const bottom = (isFloatingTaller ? refRect : rect).bottom;
      if (isOverFloatingEl) {
        hasLanded = true;
        if (!isLeave) {
          return;
        }
      }
      if (isOverReferenceEl) {
        hasLanded = false;
      }
      if (isOverReferenceEl && !isLeave) {
        hasLanded = true;
        return;
      }
      if (isLeave && isElement(event.relatedTarget) && contains(elements.floating, event.relatedTarget)) {
        return;
      }
      if (tree && getChildren(tree.nodesRef.current, nodeId).some((_ref2) => {
        let {
          context
        } = _ref2;
        return context == null ? void 0 : context.open;
      })) {
        return;
      }
      if (side === "top" && y >= refRect.bottom - 1 || side === "bottom" && y <= refRect.top + 1 || side === "left" && x >= refRect.right - 1 || side === "right" && x <= refRect.left + 1) {
        return close();
      }
      let rectPoly = [];
      switch (side) {
        case "top":
          rectPoly = [[left, refRect.top + 1], [left, rect.bottom - 1], [right, rect.bottom - 1], [right, refRect.top + 1]];
          break;
        case "bottom":
          rectPoly = [[left, rect.top + 1], [left, refRect.bottom - 1], [right, refRect.bottom - 1], [right, rect.top + 1]];
          break;
        case "left":
          rectPoly = [[rect.right - 1, bottom], [rect.right - 1, top], [refRect.left + 1, top], [refRect.left + 1, bottom]];
          break;
        case "right":
          rectPoly = [[refRect.right - 1, bottom], [refRect.right - 1, top], [rect.left + 1, top], [rect.left + 1, bottom]];
          break;
      }
      function getPolygon(_ref3) {
        let [x2, y2] = _ref3;
        switch (side) {
          case "top": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 + buffer + 1];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.bottom - buffer : isFloatingWider ? rect.bottom - buffer : rect.top], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.bottom - buffer : rect.top : rect.bottom - buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "bottom": {
            const cursorPointOne = [isFloatingWider ? x2 + buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const cursorPointTwo = [isFloatingWider ? x2 - buffer / 2 : cursorLeaveFromRight ? x2 + buffer * 4 : x2 - buffer * 4, y2 - buffer];
            const commonPoints = [[rect.left, cursorLeaveFromRight ? rect.top + buffer : isFloatingWider ? rect.top + buffer : rect.bottom], [rect.right, cursorLeaveFromRight ? isFloatingWider ? rect.top + buffer : rect.bottom : rect.top + buffer]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
          case "left": {
            const cursorPointOne = [x2 + buffer + 1, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 + buffer + 1, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.right - buffer : isFloatingTaller ? rect.right - buffer : rect.left, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.right - buffer : rect.left : rect.right - buffer, rect.bottom]];
            return [...commonPoints, cursorPointOne, cursorPointTwo];
          }
          case "right": {
            const cursorPointOne = [x2 - buffer, isFloatingTaller ? y2 + buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const cursorPointTwo = [x2 - buffer, isFloatingTaller ? y2 - buffer / 2 : cursorLeaveFromBottom ? y2 + buffer * 4 : y2 - buffer * 4];
            const commonPoints = [[cursorLeaveFromBottom ? rect.left + buffer : isFloatingTaller ? rect.left + buffer : rect.right, rect.top], [cursorLeaveFromBottom ? isFloatingTaller ? rect.left + buffer : rect.right : rect.left + buffer, rect.bottom]];
            return [cursorPointOne, cursorPointTwo, ...commonPoints];
          }
        }
      }
      if (isPointInPolygon([clientX, clientY], rectPoly)) {
        return;
      }
      if (hasLanded && !isOverReferenceRect) {
        return close();
      }
      if (!isLeave && requireIntent) {
        const cursorSpeed = getCursorSpeed(event.clientX, event.clientY);
        const cursorSpeedThreshold = 0.1;
        if (cursorSpeed !== null && cursorSpeed < cursorSpeedThreshold) {
          return close();
        }
      }
      if (!isPointInPolygon([clientX, clientY], getPolygon([x, y]))) {
        close();
      } else if (!hasLanded && requireIntent) {
        timeoutId2 = window.setTimeout(close, 40);
      }
    };
  };
  fn.__options = {
    blockPointerEvents
  };
  return fn;
}
let useTooltip = (options = {}) => {
  let uniqueId = useId$1();
  let {
    placement = "top",
    visible,
    onVisibleChange,
    middleware = {
      flip: true,
      shift: true
    },
    autoUpdateOptions = {},
    reference,
    ariaStrategy = "description",
    id = uniqueId,
    ...props
  } = options;
  let [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange
  );
  let syncWithControlledState = reactExports.useCallback(
    (element) => {
      queueMicrotask(() => {
        var _a2;
        try {
          (_a2 = element == null ? void 0 : element.togglePopover) == null ? void 0 : _a2.call(element, open);
        } catch {
        }
      });
    },
    [open]
  );
  let floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: "fixed",
    whileElementsMounted: reactExports.useMemo(
      () => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0,
      [autoUpdateOptions, open]
    ),
    middleware: reactExports.useMemo(
      () => [
        void 0 !== middleware.offset ? offset(middleware.offset) : offset(4),
        middleware.flip && flip({
          padding: 4
        }),
        middleware.shift && shift({
          padding: 4
        }),
        middleware.size && size({
          padding: 4
        }),
        middleware.autoPlacement && autoPlacement({
          padding: 4
        }),
        middleware.inline && inline(),
        middleware.hide && hide({
          padding: 4
        })
      ].filter(Boolean),
      [middleware]
    ),
    ...reference && {
      elements: {
        reference
      }
    }
  });
  let ariaProps = reactExports.useMemo(
    () => "description" === ariaStrategy ? {
      "aria-describedby": id
    } : "label" === ariaStrategy ? {
      "aria-labelledby": id
    } : {},
    [ariaStrategy, id]
  );
  let { delay } = useDelayGroup(floating.context, {
    id: useId$1()
  });
  let interactions = useInteractions([
    useHover(floating.context, {
      delay: 0 !== delay ? delay : {
        open: 50,
        close: 250
      },
      handleClose: safePolygon({
        buffer: -1 / 0
      }),
      move: false
    }),
    useFocus(floating.context),
    useDismiss(floating.context, {
      referencePress: true,
      referencePressEvent: "click"
    })
  ]);
  reactExports.useEffect(() => {
    if (!reference) return;
    let domEventName = (e) => e.toLowerCase().substring(2);
    let cleanupValues = {};
    Object.entries({
      ...ariaProps,
      ...interactions.getReferenceProps()
    }).forEach(([key, value]) => {
      if ("function" == typeof value) {
        let patchedHandler = (event) => {
          value({
            ...event,
            nativeEvent: event
          });
        };
        reference.addEventListener(domEventName(key), patchedHandler);
        cleanupValues[key] = patchedHandler;
      } else if (value) {
        cleanupValues[key] = reference.getAttribute(key);
        reference.setAttribute(key, value);
      }
    });
    return () => {
      Object.entries(cleanupValues).forEach(([key, value]) => {
        if ("function" == typeof value)
          reference.removeEventListener(domEventName(key), value);
        else if (value) reference.setAttribute(key, value);
        else reference.removeAttribute(key);
      });
    };
  }, [ariaProps, reference, interactions]);
  let getReferenceProps = reactExports.useCallback(
    (userProps) => interactions.getReferenceProps({
      ...userProps,
      ...ariaProps
    }),
    [interactions, ariaProps]
  );
  let floatingProps = reactExports.useMemo(
    () => ({
      ...interactions.getFloatingProps({
        hidden: !open,
        "aria-hidden": "true",
        ...props,
        id
      }),
      popover: "manual"
    }),
    [interactions, props, id, open]
  );
  return reactExports.useMemo(
    () => ({
      getReferenceProps,
      floatingProps,
      ...floating,
      refs: {
        ...floating.refs,
        setFloating: (element) => {
          floating.refs.setFloating(element);
          syncWithControlledState(element);
        }
      },
      floatingStyles: floating.context.open ? floating.floatingStyles : {}
    }),
    [getReferenceProps, floatingProps, floating, syncWithControlledState]
  );
};
const Tooltip = reactExports.forwardRef((props, forwardedRef) => {
  let { content, children, portal = true, className, style, ...rest } = props;
  let tooltip = useTooltip(rest);
  let refs = useMergedRefs(tooltip.refs.setFloating, forwardedRef);
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    cloneElementWithRef(children, (children2) => ({
      ...tooltip.getReferenceProps(children2.props),
      ref: tooltip.refs.setReference
    })),
    "none" !== props.ariaStrategy || tooltip.context.open ? reactExports.createElement(
      Portal,
      {
        portal
      },
      reactExports.createElement(
        Box,
        {
          className: classnames("iui-tooltip", className),
          ref: refs,
          style: {
            ...tooltip.floatingStyles,
            ...style
          },
          ...tooltip.floatingProps
        },
        content
      )
    ) : null
  );
});
const VisuallyHidden = reactExports.forwardRef((props, ref) => {
  let {
    as: asProp = "span",
    className,
    unhideOnFocus = true,
    children: childrenProp,
    ...rest
  } = props;
  let isHydrated = "hydrated" === useHydration();
  let children = ["div", "span", "p"].includes(asProp) ? reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      ShadowRoot$1,
      {
        css
      },
      reactExports.createElement("slot", null)
    ),
    isHydrated && childrenProp
  ) : childrenProp;
  return reactExports.createElement(
    Box,
    {
      as: asProp,
      className: classnames("iui-visually-hidden", className),
      "data-iui-unhide-on-focus": !!unhideOnFocus || void 0,
      ref,
      ...rest
    },
    children
  );
});
let css = `
  :host(:where(:not([data-iui-unhide-on-focus]:is(:focus-within, :active)))) {
    clip-path: inset(50%) !important;
    overflow: hidden !important;
    position: absolute !important;
    white-space: nowrap !important;
    block-size: 1px !important;
    inline-size: 1px !important;
  }
`;
const ButtonGroupContext = reactExports.createContext(void 0);
reactExports.forwardRef((props, forwardedRef) => {
  let {
    children: childrenProp,
    overflowButton,
    overflowPlacement = "end",
    orientation = "horizontal",
    ...rest
  } = props;
  let children = reactExports.useMemo(() => {
    if ("toolbar" !== props.role) return childrenProp;
    return reactExports.Children.map(
      childrenProp,
      (child, index2) => reactExports.isValidElement(child) ? reactExports.createElement(CompositeItem, {
        key: index2,
        render: child
      }) : child
    );
  }, [childrenProp, props.role]);
  let node = overflowButton ? reactExports.createElement(
    OverflowGroup,
    {
      orientation,
      overflowButton,
      overflowPlacement,
      ref: forwardedRef,
      ...rest
    },
    children
  ) : reactExports.createElement(
    BaseGroup,
    {
      orientation,
      ref: forwardedRef,
      ...rest
    },
    children
  );
  return reactExports.createElement(
    FloatingDelayGroup,
    {
      delay: {
        open: 50,
        close: 250
      }
    },
    reactExports.createElement(
      ButtonGroupContext.Provider,
      {
        value: orientation
      },
      "toolbar" === props.role ? reactExports.createElement(Composite, {
        orientation,
        render: node,
        disabledIndices: []
      }) : node
    )
  );
});
let BaseGroup = reactExports.forwardRef((props, forwardedRef) => {
  let { orientation, className, ...rest } = props;
  return reactExports.createElement(Box, {
    className: classnames("iui-button-group", className),
    "data-iui-orientation": "vertical" === orientation ? orientation : void 0,
    ref: forwardedRef,
    ...rest
  });
});
let OverflowGroup = reactExports.forwardRef((props, forwardedRef) => {
  let {
    children: childrenProp,
    orientation,
    overflowButton,
    overflowPlacement,
    ...rest
  } = props;
  let items = reactExports.useMemo(
    () => reactExports.Children.toArray(childrenProp).filter(Boolean),
    [childrenProp]
  );
  return reactExports.createElement(
    OverflowContainer,
    {
      as: BaseGroup,
      itemsCount: items.length,
      overflowOrientation: orientation,
      orientation,
      ...rest,
      className: classnames(
        {
          "iui-button-group-overflow-x": !!overflowButton && "horizontal" === orientation
        },
        props.className
      ),
      ref: forwardedRef
    },
    reactExports.createElement(OverflowGroupContent, {
      overflowButton,
      overflowPlacement,
      items
    })
  );
});
let OverflowGroupContent = (props) => {
  let { overflowButton, overflowPlacement, items } = props;
  let { visibleCount } = OverflowContainer.useContext();
  let overflowStart = "start" === overflowPlacement ? items.length - visibleCount : visibleCount - 1;
  if (!(visibleCount < items.length)) return items;
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    overflowButton && "start" === overflowPlacement && overflowButton(overflowStart),
    "start" === overflowPlacement ? items.slice(overflowStart + 1) : items.slice(0, Math.max(0, overflowStart)),
    overflowButton && "end" === overflowPlacement && overflowButton(overflowStart)
  );
};
const __vite_import_meta_env__$1 = { "BASE_URL": "./", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "STORYBOOK": "true" };
let keyCount = 0;
function atom(read, write) {
  const key = `atom${++keyCount}`;
  const config2 = {
    toString: () => key
  };
  {
    config2.init = read;
    config2.read = defaultRead;
    config2.write = defaultWrite;
  }
  return config2;
}
function defaultRead(get) {
  return get(this);
}
function defaultWrite(get, set, arg) {
  return set(
    this,
    typeof arg === "function" ? arg(get(this)) : arg
  );
}
const isSelfAtom = (atom2, a) => atom2.unstable_is ? atom2.unstable_is(a) : a === atom2;
const hasInitialValue = (atom2) => "init" in atom2;
const isActuallyWritableAtom = (atom2) => !!atom2.write;
const cancelPromiseMap = /* @__PURE__ */ new WeakMap();
const registerCancelPromise = (promise, cancel) => {
  cancelPromiseMap.set(promise, cancel);
  promise.catch(() => {
  }).finally(() => cancelPromiseMap.delete(promise));
};
const cancelPromise = (promise, next) => {
  const cancel = cancelPromiseMap.get(promise);
  if (cancel) {
    cancelPromiseMap.delete(promise);
    cancel(next);
  }
};
const resolvePromise = (promise, value) => {
  promise.status = "fulfilled";
  promise.value = value;
};
const rejectPromise = (promise, e) => {
  promise.status = "rejected";
  promise.reason = e;
};
const isPromiseLike$1 = (x) => typeof (x == null ? void 0 : x.then) === "function";
const isEqualAtomValue = (a, b) => !!a && "v" in a && "v" in b && Object.is(a.v, b.v);
const isEqualAtomError = (a, b) => !!a && "e" in a && "e" in b && Object.is(a.e, b.e);
const hasPromiseAtomValue = (a) => !!a && "v" in a && a.v instanceof Promise;
const isEqualPromiseAtomValue = (a, b) => "v" in a && "v" in b && a.v.orig && a.v.orig === b.v.orig;
const returnAtomValue = (atomState) => {
  if ("e" in atomState) {
    throw atomState.e;
  }
  return atomState.v;
};
const createStore$1 = () => {
  const atomStateMap = /* @__PURE__ */ new WeakMap();
  const mountedMap = /* @__PURE__ */ new WeakMap();
  const pendingStack = [];
  const pendingMap = /* @__PURE__ */ new WeakMap();
  let devListenersRev2;
  let mountedAtoms;
  if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
    devListenersRev2 = /* @__PURE__ */ new Set();
    mountedAtoms = /* @__PURE__ */ new Set();
  }
  const getAtomState = (atom2) => atomStateMap.get(atom2);
  const addPendingDependent = (atom2, atomState) => {
    atomState.d.forEach((_, a) => {
      if (!pendingMap.has(a)) {
        const aState = getAtomState(a);
        pendingMap.set(a, [aState, /* @__PURE__ */ new Set()]);
        if (aState) {
          addPendingDependent(a, aState);
        }
      }
      pendingMap.get(a)[1].add(atom2);
    });
  };
  const setAtomState = (atom2, atomState) => {
    var _a2;
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      Object.freeze(atomState);
    }
    const prevAtomState = getAtomState(atom2);
    atomStateMap.set(atom2, atomState);
    (_a2 = pendingStack[pendingStack.length - 1]) == null ? void 0 : _a2.add(atom2);
    if (!pendingMap.has(atom2)) {
      pendingMap.set(atom2, [prevAtomState, /* @__PURE__ */ new Set()]);
      addPendingDependent(atom2, atomState);
    }
    if (hasPromiseAtomValue(prevAtomState)) {
      const next = "v" in atomState ? atomState.v instanceof Promise ? atomState.v : Promise.resolve(atomState.v) : Promise.reject(atomState.e);
      if (prevAtomState.v !== next) {
        cancelPromise(prevAtomState.v, next);
      }
    }
  };
  const updateDependencies = (atom2, nextAtomState, nextDependencies, keepPreviousDependencies) => {
    const dependencies = new Map(
      keepPreviousDependencies ? nextAtomState.d : null
    );
    let changed = false;
    nextDependencies.forEach((aState, a) => {
      if (!aState && isSelfAtom(atom2, a)) {
        aState = nextAtomState;
      }
      if (aState) {
        dependencies.set(a, aState);
        if (nextAtomState.d.get(a) !== aState) {
          changed = true;
        }
      } else if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
        console.warn("[Bug] atom state not found");
      }
    });
    if (changed || nextAtomState.d.size !== dependencies.size) {
      nextAtomState.d = dependencies;
    }
  };
  const setAtomValue = (atom2, value, nextDependencies, keepPreviousDependencies) => {
    const prevAtomState = getAtomState(atom2);
    const nextAtomState = {
      d: (prevAtomState == null ? void 0 : prevAtomState.d) || /* @__PURE__ */ new Map(),
      v: value
    };
    if (nextDependencies) {
      updateDependencies(
        atom2,
        nextAtomState,
        nextDependencies,
        keepPreviousDependencies
      );
    }
    if (isEqualAtomValue(prevAtomState, nextAtomState) && prevAtomState.d === nextAtomState.d) {
      return prevAtomState;
    }
    if (hasPromiseAtomValue(prevAtomState) && hasPromiseAtomValue(nextAtomState) && isEqualPromiseAtomValue(prevAtomState, nextAtomState)) {
      if (prevAtomState.d === nextAtomState.d) {
        return prevAtomState;
      } else {
        nextAtomState.v = prevAtomState.v;
      }
    }
    setAtomState(atom2, nextAtomState);
    return nextAtomState;
  };
  const setAtomValueOrPromise = (atom2, valueOrPromise, nextDependencies, abortPromise) => {
    if (isPromiseLike$1(valueOrPromise)) {
      let continuePromise;
      const updatePromiseDependencies = () => {
        const prevAtomState = getAtomState(atom2);
        if (!hasPromiseAtomValue(prevAtomState) || prevAtomState.v !== promise) {
          return;
        }
        const nextAtomState = setAtomValue(
          atom2,
          promise,
          nextDependencies
        );
        if (mountedMap.has(atom2) && prevAtomState.d !== nextAtomState.d) {
          mountDependencies(atom2, nextAtomState, prevAtomState.d);
        }
      };
      const promise = new Promise((resolve, reject) => {
        let settled = false;
        valueOrPromise.then(
          (v) => {
            if (!settled) {
              settled = true;
              resolvePromise(promise, v);
              resolve(v);
              updatePromiseDependencies();
            }
          },
          (e) => {
            if (!settled) {
              settled = true;
              rejectPromise(promise, e);
              reject(e);
              updatePromiseDependencies();
            }
          }
        );
        continuePromise = (next) => {
          if (!settled) {
            settled = true;
            next.then(
              (v) => resolvePromise(promise, v),
              (e) => rejectPromise(promise, e)
            );
            resolve(next);
          }
        };
      });
      promise.orig = valueOrPromise;
      promise.status = "pending";
      registerCancelPromise(promise, (next) => {
        if (next) {
          continuePromise(next);
        }
        abortPromise == null ? void 0 : abortPromise();
      });
      return setAtomValue(atom2, promise, nextDependencies, true);
    }
    return setAtomValue(atom2, valueOrPromise, nextDependencies);
  };
  const setAtomError = (atom2, error, nextDependencies) => {
    const prevAtomState = getAtomState(atom2);
    const nextAtomState = {
      d: (prevAtomState == null ? void 0 : prevAtomState.d) || /* @__PURE__ */ new Map(),
      e: error
    };
    if (nextDependencies) {
      updateDependencies(atom2, nextAtomState, nextDependencies);
    }
    if (isEqualAtomError(prevAtomState, nextAtomState) && prevAtomState.d === nextAtomState.d) {
      return prevAtomState;
    }
    setAtomState(atom2, nextAtomState);
    return nextAtomState;
  };
  const readAtomState = (atom2, force) => {
    const atomState = getAtomState(atom2);
    if (!(force == null ? void 0 : force(atom2)) && atomState) {
      if (mountedMap.has(atom2)) {
        return atomState;
      }
      if (Array.from(atomState.d).every(([a, s]) => {
        if (a === atom2) {
          return true;
        }
        const aState = readAtomState(a, force);
        return aState === s || isEqualAtomValue(aState, s);
      })) {
        return atomState;
      }
    }
    const nextDependencies = /* @__PURE__ */ new Map();
    let isSync = true;
    const getter = (a) => {
      if (isSelfAtom(atom2, a)) {
        const aState2 = getAtomState(a);
        if (aState2) {
          nextDependencies.set(a, aState2);
          return returnAtomValue(aState2);
        }
        if (hasInitialValue(a)) {
          nextDependencies.set(a, void 0);
          return a.init;
        }
        throw new Error("no atom init");
      }
      const aState = readAtomState(a, force);
      nextDependencies.set(a, aState);
      return returnAtomValue(aState);
    };
    let controller;
    let setSelf;
    const options = {
      get signal() {
        if (!controller) {
          controller = new AbortController();
        }
        return controller.signal;
      },
      get setSelf() {
        if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && !isActuallyWritableAtom(atom2)) {
          console.warn("setSelf function cannot be used with read-only atom");
        }
        if (!setSelf && isActuallyWritableAtom(atom2)) {
          setSelf = (...args) => {
            if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production" && isSync) {
              console.warn("setSelf function cannot be called in sync");
            }
            if (!isSync) {
              return writeAtom(atom2, ...args);
            }
          };
        }
        return setSelf;
      }
    };
    try {
      const valueOrPromise = atom2.read(getter, options);
      return setAtomValueOrPromise(
        atom2,
        valueOrPromise,
        nextDependencies,
        () => controller == null ? void 0 : controller.abort()
      );
    } catch (error) {
      return setAtomError(atom2, error, nextDependencies);
    } finally {
      isSync = false;
    }
  };
  const readAtom = (atom2) => returnAtomValue(readAtomState(atom2));
  const recomputeDependents = (atom2) => {
    const getDependents = (a) => {
      var _a2, _b;
      const dependents = new Set((_a2 = mountedMap.get(a)) == null ? void 0 : _a2.t);
      (_b = pendingMap.get(a)) == null ? void 0 : _b[1].forEach((dependent) => {
        dependents.add(dependent);
      });
      return dependents;
    };
    const topsortedAtoms = new Array();
    const markedAtoms = /* @__PURE__ */ new Set();
    const visit = (n) => {
      if (markedAtoms.has(n)) {
        return;
      }
      markedAtoms.add(n);
      for (const m of getDependents(n)) {
        if (n !== m) {
          visit(m);
        }
      }
      topsortedAtoms.push(n);
    };
    visit(atom2);
    const changedAtoms = /* @__PURE__ */ new Set([atom2]);
    const isMarked = (a) => markedAtoms.has(a);
    for (let i = topsortedAtoms.length - 1; i >= 0; --i) {
      const a = topsortedAtoms[i];
      const prevAtomState = getAtomState(a);
      if (!prevAtomState) {
        continue;
      }
      let hasChangedDeps = false;
      for (const dep of prevAtomState.d.keys()) {
        if (dep !== a && changedAtoms.has(dep)) {
          hasChangedDeps = true;
          break;
        }
      }
      if (hasChangedDeps) {
        const nextAtomState = readAtomState(a, isMarked);
        addPendingDependent(a, nextAtomState);
        if (!isEqualAtomValue(prevAtomState, nextAtomState)) {
          changedAtoms.add(a);
        }
      }
      markedAtoms.delete(a);
    }
  };
  const writeAtomState = (atom2, ...args) => {
    const getter = (a) => returnAtomValue(readAtomState(a));
    const setter = (a, ...args2) => {
      const isSync = pendingStack.length > 0;
      if (!isSync) {
        pendingStack.push(/* @__PURE__ */ new Set([a]));
      }
      let r;
      if (isSelfAtom(atom2, a)) {
        if (!hasInitialValue(a)) {
          throw new Error("atom not writable");
        }
        const prevAtomState = getAtomState(a);
        const nextAtomState = setAtomValueOrPromise(a, args2[0]);
        if (!isEqualAtomValue(prevAtomState, nextAtomState)) {
          recomputeDependents(a);
        }
      } else {
        r = writeAtomState(a, ...args2);
      }
      if (!isSync) {
        const flushed = flushPending(pendingStack.pop());
        if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
          devListenersRev2.forEach(
            (l) => l({ type: "async-write", flushed })
          );
        }
      }
      return r;
    };
    const result = atom2.write(getter, setter, ...args);
    return result;
  };
  const writeAtom = (atom2, ...args) => {
    pendingStack.push(/* @__PURE__ */ new Set([atom2]));
    const result = writeAtomState(atom2, ...args);
    const flushed = flushPending(pendingStack.pop());
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      devListenersRev2.forEach((l) => l({ type: "write", flushed }));
    }
    return result;
  };
  const mountAtom = (atom2, initialDependent, onMountQueue) => {
    var _a2;
    const existingMount = mountedMap.get(atom2);
    if (existingMount) {
      if (initialDependent) {
        existingMount.t.add(initialDependent);
      }
      return existingMount;
    }
    const queue = onMountQueue || [];
    (_a2 = getAtomState(atom2)) == null ? void 0 : _a2.d.forEach((_, a) => {
      if (a !== atom2) {
        mountAtom(a, atom2, queue);
      }
    });
    readAtomState(atom2);
    const mounted = {
      t: new Set(initialDependent && [initialDependent]),
      l: /* @__PURE__ */ new Set()
    };
    mountedMap.set(atom2, mounted);
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      mountedAtoms.add(atom2);
    }
    if (isActuallyWritableAtom(atom2) && atom2.onMount) {
      const { onMount } = atom2;
      queue.push(() => {
        const onUnmount = onMount((...args) => writeAtom(atom2, ...args));
        if (onUnmount) {
          mounted.u = onUnmount;
        }
      });
    }
    if (!onMountQueue) {
      queue.forEach((f) => f());
    }
    return mounted;
  };
  const canUnmountAtom = (atom2, mounted) => !mounted.l.size && (!mounted.t.size || mounted.t.size === 1 && mounted.t.has(atom2));
  const tryUnmountAtom = (atom2, mounted) => {
    if (!canUnmountAtom(atom2, mounted)) {
      return;
    }
    const onUnmount = mounted.u;
    if (onUnmount) {
      onUnmount();
    }
    mountedMap.delete(atom2);
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      mountedAtoms.delete(atom2);
    }
    const atomState = getAtomState(atom2);
    if (atomState) {
      if (hasPromiseAtomValue(atomState)) {
        cancelPromise(atomState.v);
      }
      atomState.d.forEach((_, a) => {
        if (a !== atom2) {
          const mountedDep = mountedMap.get(a);
          if (mountedDep) {
            mountedDep.t.delete(atom2);
            tryUnmountAtom(a, mountedDep);
          }
        }
      });
    } else if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      console.warn("[Bug] could not find atom state to unmount", atom2);
    }
  };
  const mountDependencies = (atom2, atomState, prevDependencies) => {
    const depSet = new Set(atomState.d.keys());
    const maybeUnmountAtomSet = /* @__PURE__ */ new Set();
    prevDependencies == null ? void 0 : prevDependencies.forEach((_, a) => {
      if (depSet.has(a)) {
        depSet.delete(a);
        return;
      }
      maybeUnmountAtomSet.add(a);
      const mounted = mountedMap.get(a);
      if (mounted) {
        mounted.t.delete(atom2);
      }
    });
    depSet.forEach((a) => {
      mountAtom(a, atom2);
    });
    maybeUnmountAtomSet.forEach((a) => {
      const mounted = mountedMap.get(a);
      if (mounted) {
        tryUnmountAtom(a, mounted);
      }
    });
  };
  const flushPending = (pendingAtoms) => {
    let flushed;
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      flushed = /* @__PURE__ */ new Set();
    }
    const pending = [];
    const collectPending = (pendingAtom) => {
      var _a2;
      if (!pendingMap.has(pendingAtom)) {
        return;
      }
      const [prevAtomState, dependents] = pendingMap.get(pendingAtom);
      pendingMap.delete(pendingAtom);
      pending.push([pendingAtom, prevAtomState]);
      dependents.forEach(collectPending);
      (_a2 = getAtomState(pendingAtom)) == null ? void 0 : _a2.d.forEach((_, a) => collectPending(a));
    };
    pendingAtoms.forEach(collectPending);
    pending.forEach(([atom2, prevAtomState]) => {
      const atomState = getAtomState(atom2);
      if (!atomState) {
        if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
          console.warn("[Bug] no atom state to flush");
        }
        return;
      }
      if (atomState !== prevAtomState) {
        const mounted = mountedMap.get(atom2);
        if (mounted && atomState.d !== (prevAtomState == null ? void 0 : prevAtomState.d)) {
          mountDependencies(atom2, atomState, prevAtomState == null ? void 0 : prevAtomState.d);
        }
        if (mounted && !// TODO This seems pretty hacky. Hope to fix it.
        // Maybe we could `mountDependencies` in `setAtomState`?
        (!hasPromiseAtomValue(prevAtomState) && (isEqualAtomValue(prevAtomState, atomState) || isEqualAtomError(prevAtomState, atomState)))) {
          mounted.l.forEach((listener) => listener());
          if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
            flushed.add(atom2);
          }
        }
      }
    });
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      return flushed;
    }
  };
  const subscribeAtom = (atom2, listener) => {
    const mounted = mountAtom(atom2);
    const flushed = flushPending([atom2]);
    const listeners = mounted.l;
    listeners.add(listener);
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      devListenersRev2.forEach(
        (l) => l({ type: "sub", flushed })
      );
    }
    return () => {
      listeners.delete(listener);
      tryUnmountAtom(atom2, mounted);
      if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
        devListenersRev2.forEach((l) => l({ type: "unsub" }));
      }
    };
  };
  if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
    return {
      get: readAtom,
      set: writeAtom,
      sub: subscribeAtom,
      // store dev methods (these are tentative and subject to change without notice)
      dev_subscribe_store: (l) => {
        devListenersRev2.add(l);
        return () => {
          devListenersRev2.delete(l);
        };
      },
      dev_get_mounted_atoms: () => mountedAtoms.values(),
      dev_get_atom_state: (a) => atomStateMap.get(a),
      dev_get_mounted: (a) => mountedMap.get(a),
      dev_restore_atoms: (values) => {
        pendingStack.push(/* @__PURE__ */ new Set());
        for (const [atom2, valueOrPromise] of values) {
          if (hasInitialValue(atom2)) {
            setAtomValueOrPromise(atom2, valueOrPromise);
            recomputeDependents(atom2);
          }
        }
        const flushed = flushPending(pendingStack.pop());
        devListenersRev2.forEach(
          (l) => l({ type: "restore", flushed })
        );
      }
    };
  }
  return {
    get: readAtom,
    set: writeAtom,
    sub: subscribeAtom
  };
};
let defaultStore;
const getDefaultStore$1 = () => {
  if (!defaultStore) {
    defaultStore = createStore$1();
    if ((__vite_import_meta_env__$1 ? "production" : void 0) !== "production") {
      globalThis.__JOTAI_DEFAULT_STORE__ || (globalThis.__JOTAI_DEFAULT_STORE__ = defaultStore);
      if (globalThis.__JOTAI_DEFAULT_STORE__ !== defaultStore) {
        console.warn(
          "Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"
        );
      }
    }
  }
  return defaultStore;
};
const createStore = createStore$1;
const getDefaultStore = getDefaultStore$1;
const __vite_import_meta_env__ = { "BASE_URL": "./", "DEV": false, "MODE": "production", "PROD": true, "SSR": false, "STORYBOOK": "true" };
const StoreContext = reactExports.createContext(
  void 0
);
const useStore = (options) => {
  const store = reactExports.useContext(StoreContext);
  return (options == null ? void 0 : options.store) || store || getDefaultStore();
};
const isPromiseLike = (x) => typeof (x == null ? void 0 : x.then) === "function";
const use = React$1.use || ((promise) => {
  if (promise.status === "pending") {
    throw promise;
  } else if (promise.status === "fulfilled") {
    return promise.value;
  } else if (promise.status === "rejected") {
    throw promise.reason;
  } else {
    promise.status = "pending";
    promise.then(
      (v) => {
        promise.status = "fulfilled";
        promise.value = v;
      },
      (e) => {
        promise.status = "rejected";
        promise.reason = e;
      }
    );
    throw promise;
  }
});
function useAtomValue(atom2, options) {
  const store = useStore(options);
  const [[valueFromReducer, storeFromReducer, atomFromReducer], rerender] = reactExports.useReducer(
    (prev) => {
      const nextValue = store.get(atom2);
      if (Object.is(prev[0], nextValue) && prev[1] === store && prev[2] === atom2) {
        return prev;
      }
      return [nextValue, store, atom2];
    },
    void 0,
    () => [store.get(atom2), store, atom2]
  );
  let value = valueFromReducer;
  if (storeFromReducer !== store || atomFromReducer !== atom2) {
    rerender();
    value = store.get(atom2);
  }
  const delay = options == null ? void 0 : options.delay;
  reactExports.useEffect(() => {
    const unsub = store.sub(atom2, () => {
      if (typeof delay === "number") {
        setTimeout(rerender, delay);
        return;
      }
      rerender();
    });
    rerender();
    return unsub;
  }, [store, atom2, delay]);
  reactExports.useDebugValue(value);
  return isPromiseLike(value) ? use(value) : value;
}
function useSetAtom(atom2, options) {
  const store = useStore(options);
  const setAtom = reactExports.useCallback(
    (...args) => {
      if ((__vite_import_meta_env__ ? "production" : void 0) !== "production" && !("write" in atom2)) {
        throw new Error("not writable atom");
      }
      return store.set(atom2, ...args);
    },
    [store, atom2]
  );
  return setAtom;
}
let ScopeContext = reactExports.createContext({
  store: createStore(),
  parentStore: null
});
const ScopeProvider = ({ children }) => {
  let store = reactExports.useMemo(() => createStore(), []);
  let parentStore = reactExports.useContext(ScopeContext).store;
  return reactExports.createElement(
    ScopeContext.Provider,
    {
      value: reactExports.useMemo(
        () => ({
          store,
          parentStore
        }),
        [store, parentStore]
      )
    },
    children
  );
};
const useScopedAtom = (atom2) => {
  let { store, parentStore } = reactExports.useContext(ScopeContext);
  let setAtom = useScopedSetAtom(atom2);
  let value = useAtomValue(atom2, {
    store
  });
  let inheritedValue = useAtomValue(atom2, {
    store: parentStore || store
  });
  reactExports.useEffect(() => {
    if (void 0 == value && void 0 != inheritedValue) setAtom(inheritedValue);
  });
  return [value, setAtom];
};
const useScopedSetAtom = (atom2) => {
  let { store } = reactExports.useContext(ScopeContext);
  return useSetAtom(atom2, {
    store
  });
};
const portalContainerAtom = atom(void 0);
const Portal = (props) => {
  let { portal = true, children } = props;
  let isClient = useIsClient();
  let portalTo = usePortalTo(portal);
  if (!isClient) return null;
  return portalTo ? reactDomExports.createPortal(children, portalTo) : children;
};
const usePortalTo = (portal) => {
  let [portalContainer] = useScopedAtom(portalContainerAtom);
  if ("boolean" == typeof portal) return portal ? portalContainer : null;
  let portalTo = "function" == typeof portal.to ? portal.to() : portal.to;
  return portalTo ?? portalContainer;
};
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
const config = {
  disabled: false
};
const TransitionGroupContext = React$1.createContext(null);
var forceReflow = function forceReflow2(node) {
  return node.scrollTop;
};
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout2 = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout2;
    if (timeout2 != null && typeof timeout2 !== "number") {
      exit = timeout2.exit;
      enter = timeout2.enter;
      appear = timeout2.appear !== void 0 ? timeout2.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
          if (node) forceReflow(node);
        }
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [ReactDOM.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : ReactDOM.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout2, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : ReactDOM.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout2 == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout2 != null) {
      setTimeout(this.nextCallback, timeout2);
    }
  };
  _proto.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children;
    _this$props.in;
    _this$props.mountOnEnter;
    _this$props.unmountOnExit;
    _this$props.appear;
    _this$props.enter;
    _this$props.exit;
    _this$props.timeout;
    _this$props.addEndListener;
    _this$props.onEnter;
    _this$props.onEntering;
    _this$props.onEntered;
    _this$props.onExit;
    _this$props.onExiting;
    _this$props.onExited;
    _this$props.nodeRef;
    var childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ React$1.createElement(TransitionGroupContext.Provider, {
        value: null
      }, typeof children === "function" ? children(status, childProps) : React$1.cloneElement(React$1.Children.only(children), childProps))
    );
  };
  return Transition2;
}(React$1.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;
const Toast = (props) => {
  let {
    content,
    category,
    type = "temporary",
    isVisible: isVisibleProp,
    link,
    duration = 7e3,
    hasCloseButton,
    onRemove,
    animateOutTo,
    domProps
  } = props;
  let closeTimeout = reactExports.useRef(0);
  let { placement } = useSafeContext(ToasterStateContext).settings;
  let placementPosition = placement.startsWith("top") ? "top" : "bottom";
  let [visible, setVisible] = reactExports.useState(isVisibleProp ?? true);
  let isVisible = isVisibleProp ?? visible;
  let [height, setHeight] = reactExports.useState(0);
  let thisElement = reactExports.useRef(null);
  let [margin, setMargin] = reactExports.useState(0);
  let motionOk = useMediaQuery("(prefers-reduced-motion: no-preference)");
  let marginStyle = () => {
    if ("top" === placementPosition)
      return {
        marginBlockEnd: margin
      };
    return {
      marginBlockStart: margin
    };
  };
  reactExports.useEffect(() => {
    if ("temporary" === type) setCloseTimeout(duration);
    return () => {
      clearCloseTimeout();
    };
  }, [duration, type]);
  reactExports.useEffect(() => {
    if (!isVisible && !animateOutTo) setMargin(-height);
  }, [isVisible, animateOutTo, setMargin, height]);
  let close = () => {
    clearCloseTimeout();
    setMargin(-height);
    setVisible(false);
  };
  let setCloseTimeout = (timeout) => {
    let definedWindow = getWindow$1();
    if (!definedWindow) return;
    closeTimeout.current = definedWindow.setTimeout(() => {
      close();
    }, timeout);
  };
  let clearCloseTimeout = () => {
    var _a2;
    (_a2 = getWindow$1()) == null ? void 0 : _a2.clearTimeout(closeTimeout.current);
  };
  let onRef = (ref) => {
    if (ref) {
      let { height: height2 } = ref.getBoundingClientRect();
      setHeight(height2);
    }
  };
  let calculateOutAnimation = (node) => {
    let translateX = 0;
    let translateY = 0;
    if (animateOutTo && node) {
      let { x: startX, y: startY } = node.getBoundingClientRect();
      let { x: endX, y: endY } = animateOutTo.getBoundingClientRect();
      translateX = endX - startX;
      translateY = endY - startY;
    }
    return {
      translateX,
      translateY
    };
  };
  return reactExports.createElement(
    Transition,
    {
      timeout: {
        enter: 240,
        exit: animateOutTo ? 400 : 120
      },
      in: isVisible,
      appear: true,
      unmountOnExit: true,
      onEnter: (node) => {
        if (motionOk) {
          node.style.transform = "translateY(15%)";
          node.style.transitionTimingFunction = "ease";
        }
      },
      onEntered: (node) => {
        if (motionOk) node.style.transform = "translateY(0)";
      },
      onExiting: (node) => {
        if (motionOk) {
          let { translateX, translateY } = calculateOutAnimation(node);
          node.style.transform = animateOutTo ? `scale(0.9) translate(${translateX}px,${translateY}px)` : "scale(0.9)";
          node.style.opacity = "0";
          node.style.transitionDuration = animateOutTo ? "400ms" : "120ms";
          node.style.transitionTimingFunction = "cubic-bezier(0.4, 0, 1, 1)";
        }
      },
      onExited: onRemove
    },
    reactExports.createElement(
      Box,
      {
        ref: thisElement,
        className: "iui-toast-all",
        style: {
          height,
          ...marginStyle()
        }
      },
      reactExports.createElement(
        "div",
        {
          ref: onRef
        },
        reactExports.createElement(ToastPresentation, {
          as: "div",
          category,
          content,
          link,
          type,
          hasCloseButton,
          onClose: close,
          ...domProps == null ? void 0 : domProps.toastProps,
          contentProps: domProps == null ? void 0 : domProps.contentProps
        })
      )
    )
  );
};
const ToastPresentation = reactExports.forwardRef((props, forwardedRef) => {
  let {
    content,
    category,
    type = "temporary",
    link,
    hasCloseButton,
    onClose,
    className,
    contentProps,
    ...rest
  } = props;
  let StatusIcon = StatusIconMap[category];
  return reactExports.createElement(
    Box,
    {
      className: classnames(`iui-toast iui-${category}`, className),
      ref: forwardedRef,
      ...rest
    },
    reactExports.createElement(
      Box,
      {
        className: "iui-status-area"
      },
      reactExports.createElement(StatusIcon, {
        className: "iui-icon"
      })
    ),
    reactExports.createElement(
      Box,
      {
        as: "div",
        ...contentProps,
        className: classnames("iui-message", contentProps == null ? void 0 : contentProps.className)
      },
      content
    ),
    link && reactExports.createElement(
      ButtonBase,
      {
        ...link,
        className: classnames("iui-anchor", "iui-toast-anchor", link.className),
        title: void 0,
        "data-iui-status": category,
        "data-iui-underline": true
      },
      link.title
    ),
    ("persisting" === type || hasCloseButton) && reactExports.createElement(
      IconButton,
      {
        size: "small",
        styleType: "borderless",
        onClick: onClose,
        "aria-label": "Close"
      },
      reactExports.createElement(SvgCloseSmall, null)
    )
  );
});
const useToaster = () => {
  let dispatch = useSafeContext(ToasterDispatchContext);
  return reactExports.useMemo(() => {
    let showToast = (category) => (content, options) => {
      let id = nextId();
      dispatch({
        type: "add",
        toast: {
          ...options,
          id,
          content,
          category
        }
      });
      return {
        close: () => dispatch({
          type: "remove",
          id
        })
      };
    };
    return {
      positive: showToast("positive"),
      informational: showToast("informational"),
      negative: showToast("negative"),
      warning: showToast("warning"),
      closeAll: () => {
        dispatch({
          type: "close-all"
        });
      },
      setSettings: (settings) => {
        dispatch({
          type: "settings",
          settings
        });
      }
    };
  }, [dispatch]);
};
const Toaster = () => {
  let { toasts, settings } = useSafeContext(ToasterStateContext);
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-toast-wrapper", `iui-placement-${settings.placement}`)
    },
    toasts.map(
      (toastProps) => reactExports.createElement(Toast, {
        key: toastProps.id,
        ...toastProps
      })
    )
  );
};
const ToastProvider = ({ children, inherit = false }) => {
  let [toasterState, dispatch] = reactExports.useReducer(toastReducer, {
    toasts: [],
    settings: {
      order: "auto",
      placement: "top"
    }
  });
  if (reactExports.useContext(ToasterStateContext) && inherit) return children;
  return reactExports.createElement(
    ToasterDispatchContext.Provider,
    {
      value: dispatch
    },
    reactExports.createElement(
      ToasterStateContext.Provider,
      {
        value: toasterState
      },
      children
    )
  );
};
let toastReducer = (state, action) => {
  if ("add" === action.type) {
    let order = state.settings.order;
    if ("auto" === order)
      order = state.settings.placement.startsWith("top") ? "descending" : "ascending";
    return {
      ...state,
      toasts: [
        ..."ascending" === order ? state.toasts : [],
        action.toast,
        ..."descending" === order ? state.toasts : []
      ]
    };
  }
  if ("remove" === action.type)
    return {
      ...state,
      toasts: state.toasts.filter((toast) => toast.id !== action.id)
    };
  if ("close-all" === action.type)
    return {
      ...state,
      toasts: state.toasts.map((toast) => ({
        ...toast,
        isVisible: false
      }))
    };
  if ("settings" === action.type)
    return {
      ...state,
      settings: {
        ...state.settings,
        ...action.settings
      }
    };
  return state;
};
const ToasterStateContext = reactExports.createContext(void 0);
let ToasterDispatchContext = reactExports.createContext(void 0);
let nextId = /* @__PURE__ */ (() => {
  let count2 = 0;
  return () => ++count2;
})();
let _moduleType = "ESM";
const meta = {
  version: t,
  module: _moduleType
};
let versionWithoutDots = meta.version.replace(/\./g, "");
let ownerDocumentAtom = atom(void 0);
const ThemeProvider = reactExports.forwardRef((props, forwardedRef) => {
  var _themeOptions, _themeOptions1;
  let {
    theme: themeProp = "inherit",
    children,
    themeOptions = {},
    portalContainer: portalContainerProp,
    includeCss = "inherit" === themeProp,
    ...rest
  } = props;
  useInertPolyfill();
  let [rootElement, setRootElement] = reactExports.useState(null);
  let parent = useParentThemeAndContext(rootElement);
  let theme = "inherit" === themeProp ? parent.theme || "light" : themeProp;
  (_themeOptions = themeOptions).applyBackground ?? (_themeOptions.applyBackground = !parent.theme);
  (_themeOptions1 = themeOptions).highContrast ?? (_themeOptions1.highContrast = "inherit" === themeProp ? parent.highContrast : void 0);
  let [portalContainerFromParent] = useScopedAtom(portalContainerAtom);
  let contextValue = reactExports.useMemo(
    () => ({
      theme,
      themeOptions
    }),
    [theme, JSON.stringify(themeOptions)]
  );
  return reactExports.createElement(
    ScopeProvider,
    null,
    reactExports.createElement(
      HydrationProvider,
      null,
      reactExports.createElement(
        ThemeContext.Provider,
        {
          value: contextValue
        },
        reactExports.createElement(
          ToastProvider,
          {
            inherit: "inherit" === themeProp && !portalContainerProp
          },
          includeCss && rootElement ? reactExports.createElement(FallbackStyles, {
            root: rootElement
          }) : null,
          reactExports.createElement(
            MainRoot,
            {
              theme,
              themeOptions,
              ref: useMergedRefs(forwardedRef, setRootElement, useIuiDebugRef),
              ...rest
            },
            children,
            reactExports.createElement(PortalContainer, {
              theme,
              themeOptions,
              portalContainerProp,
              portalContainerFromParent,
              isInheritingTheme: "inherit" === themeProp
            })
          )
        )
      )
    )
  );
});
let MainRoot = reactExports.forwardRef((props, forwardedRef) => {
  let [ownerDocument, setOwnerDocument] = useScopedAtom(ownerDocumentAtom);
  let findOwnerDocumentFromRef = reactExports.useCallback(
    (el) => {
      if (el && el.ownerDocument !== ownerDocument)
        setOwnerDocument(el.ownerDocument);
    },
    [ownerDocument, setOwnerDocument]
  );
  return reactExports.createElement(Root, {
    ...props,
    ref: useMergedRefs(findOwnerDocumentFromRef, forwardedRef)
  });
});
let Root = reactExports.forwardRef((props, forwardedRef) => {
  let { theme, children, themeOptions, className, ...rest } = props;
  let prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  let prefersHighContrast = useMediaQuery("(prefers-contrast: more)");
  let shouldApplyDark = "dark" === theme || "os" === theme && prefersDark;
  let shouldApplyHC = (themeOptions == null ? void 0 : themeOptions.highContrast) ?? prefersHighContrast;
  let shouldApplyBackground = themeOptions == null ? void 0 : themeOptions.applyBackground;
  return reactExports.createElement(
    Box,
    {
      className: classnames(
        "iui-root",
        {
          "iui-root-background": shouldApplyBackground
        },
        className
      ),
      "data-iui-theme": shouldApplyDark ? "dark" : "light",
      "data-iui-contrast": shouldApplyHC ? "high" : "default",
      ref: forwardedRef,
      ...rest
    },
    children
  );
});
let useParentThemeAndContext = (rootElement) => {
  var _a2, _b;
  let parentContext = reactExports.useContext(ThemeContext);
  let [parentThemeState, setParentTheme] = reactExports.useState(parentContext == null ? void 0 : parentContext.theme);
  let [parentHighContrastState, setParentHighContrastState] = reactExports.useState(
    (_a2 = parentContext == null ? void 0 : parentContext.themeOptions) == null ? void 0 : _a2.highContrast
  );
  let parentThemeRef = useLatestRef$2(parentContext == null ? void 0 : parentContext.theme);
  useIsomorphicLayoutEffect(() => {
    var _a3;
    if (parentThemeRef.current) return;
    let closestRoot = (_a3 = rootElement == null ? void 0 : rootElement.parentElement) == null ? void 0 : _a3.closest("[data-iui-theme]");
    if (!closestRoot) return;
    let synchronizeTheme = () => {
      setParentTheme(closestRoot == null ? void 0 : closestRoot.getAttribute("data-iui-theme"));
      setParentHighContrastState(
        (closestRoot == null ? void 0 : closestRoot.getAttribute("data-iui-contrast")) === "high"
      );
    };
    synchronizeTheme();
    let observer = new MutationObserver(() => synchronizeTheme());
    observer.observe(closestRoot, {
      attributes: true,
      attributeFilter: ["data-iui-theme", "data-iui-contrast"]
    });
    return () => {
      observer.disconnect();
    };
  }, [rootElement, parentThemeRef]);
  return {
    theme: (parentContext == null ? void 0 : parentContext.theme) ?? parentThemeState,
    highContrast: ((_b = parentContext == null ? void 0 : parentContext.themeOptions) == null ? void 0 : _b.highContrast) ?? parentHighContrastState,
    context: parentContext
  };
};
let PortalContainer = reactExports.memo(
  ({
    portalContainerProp,
    portalContainerFromParent,
    isInheritingTheme,
    theme,
    themeOptions
  }) => {
    let [ownerDocument] = useScopedAtom(ownerDocumentAtom);
    let [portalContainer, setPortalContainer] = useScopedAtom(portalContainerAtom);
    let shouldSetupPortalContainer = !portalContainerProp && (!isInheritingTheme || !portalContainerFromParent || !!ownerDocument && portalContainerFromParent.ownerDocument !== ownerDocument);
    let id = useId$1();
    reactExports.useEffect(() => {
      if (shouldSetupPortalContainer) return;
      let portalTarget = portalContainerProp || portalContainerFromParent;
      if (portalTarget && portalTarget !== portalContainer)
        setPortalContainer(portalTarget);
    });
    let isHydrated = "hydrated" === useHydration();
    if (!isHydrated) return null;
    if (shouldSetupPortalContainer && ownerDocument)
      return reactDomExports.createPortal(
        reactExports.createElement(
          Root,
          {
            theme,
            themeOptions: {
              ...themeOptions,
              applyBackground: false
            },
            "data-iui-portal": true,
            style: {
              display: "contents"
            },
            ref: setPortalContainer,
            id
          },
          reactExports.createElement(Toaster, null)
        ),
        ownerDocument.body
      );
    if (portalContainerProp)
      return reactDomExports.createPortal(
        reactExports.createElement(Toaster, null),
        portalContainerProp
      );
    return null;
  }
);
let FallbackStyles = ({ root }) => {
  useIsomorphicLayoutEffect(() => {
    if ("yes" === getComputedStyle(root).getPropertyValue(`--_iui-v${versionWithoutDots}`))
      return;
    if (isUnitTest) return;
    (async () => {
      try {
        await __vitePreload(() => Promise.resolve({}), true ? __vite__mapDeps([0]) : void 0, import.meta.url);
      } catch (error) {
        console.log("Error loading styles.css locally", error);
        let css2 = await importCss(
          `https://cdn.jsdelivr.net/npm/@itwin/itwinui-react@${meta.version}/styles.css`
        );
        document.adoptedStyleSheets = [
          ...document.adoptedStyleSheets,
          css2.default
        ];
      }
    })();
  }, [root]);
  return reactExports.createElement(reactExports.Fragment, null);
};
let useIuiDebugRef = () => {
  var _globalThis;
  let _globalThis1 = globalThis;
  (_globalThis = _globalThis1).__iui || (_globalThis.__iui = {
    versions: /* @__PURE__ */ new Set()
  });
  _globalThis1.__iui.versions.add(JSON.stringify(meta));
};
let useInertPolyfill = () => {
  let loaded = reactExports.useRef(false);
  let modulePath = "https://cdn.jsdelivr.net/npm/wicg-inert@3.1.2/dist/inert.min.js";
  reactExports.useEffect(() => {
    (async () => {
      if (!HTMLElement.prototype.hasOwnProperty("inert") && !loaded.current && !isUnitTest) {
        await new Function("url", "return import(url)")(modulePath);
        loaded.current = true;
      }
    })();
  }, []);
};
const PopoverOpenContext = reactExports.createContext(void 0);
const PopoverInitialFocusContext = reactExports.createContext(void 0);
const usePopover = (options) => {
  var _a2, _b;
  let {
    placement = "bottom-start",
    visible,
    onVisibleChange,
    closeOnOutsideClick,
    autoUpdateOptions,
    matchWidth,
    interactions: interactionsProp,
    role,
    ...rest
  } = options;
  let mergedInteractions = reactExports.useMemo(
    () => ({
      ...interactionsProp,
      click: (interactionsProp == null ? void 0 : interactionsProp.click) ?? true,
      dismiss: (interactionsProp == null ? void 0 : interactionsProp.dismiss) ?? true,
      hover: (interactionsProp == null ? void 0 : interactionsProp.hover) ?? false,
      focus: (interactionsProp == null ? void 0 : interactionsProp.focus) ?? false
    }),
    [interactionsProp]
  );
  let tree = useFloatingTree();
  let middleware = reactExports.useMemo(
    () => {
      var _a3, _b2, _c, _d;
      return {
        ...options.middleware,
        flip: ((_a3 = options.middleware) == null ? void 0 : _a3.flip) ?? true,
        shift: ((_b2 = options.middleware) == null ? void 0 : _b2.shift) ?? true,
        size: ((_c = options.middleware) == null ? void 0 : _c.size) ?? true,
        hide: ((_d = options.middleware) == null ? void 0 : _d.hide) || !isUnitTest
      };
    },
    [options.middleware]
  );
  let maxHeight = "boolean" == typeof middleware.size ? "400px" : (_a2 = middleware.size) == null ? void 0 : _a2.maxHeight;
  let [open, onOpenChange] = useControlledState(
    false,
    visible,
    onVisibleChange
  );
  let floating = useFloating({
    placement,
    open,
    onOpenChange,
    strategy: "fixed",
    whileElementsMounted: reactExports.useMemo(
      () => open ? (...args) => autoUpdate(...args, autoUpdateOptions) : void 0,
      [autoUpdateOptions, open]
    ),
    ...rest,
    middleware: reactExports.useMemo(
      () => [
        void 0 !== middleware.offset && offset(middleware.offset),
        middleware.flip && flip({
          padding: 4
        }),
        middleware.shift && shift({
          padding: 4
        }),
        (matchWidth || middleware.size) && size({
          padding: 4,
          apply: ({ rects, availableHeight: availableHeight2 }) => {
            if (middleware.size)
              setAvailableHeight(Math.round(availableHeight2));
            if (matchWidth) setReferenceWidth(rects.reference.width);
          }
        }),
        middleware.autoPlacement && autoPlacement({
          padding: 4
        }),
        middleware.inline && inline(),
        middleware.hide && hide({
          padding: 4
        })
      ].filter(Boolean),
      [matchWidth, middleware]
    )
  });
  let interactions = useInteractions([
    useClick(floating.context, {
      enabled: !!mergedInteractions.click,
      ...mergedInteractions.click
    }),
    useDismiss(floating.context, {
      enabled: !!mergedInteractions.dismiss,
      outsidePress: closeOnOutsideClick,
      bubbles: null != tree,
      ...mergedInteractions.dismiss
    }),
    useHover(floating.context, {
      enabled: !!mergedInteractions.hover,
      delay: 100,
      handleClose: safePolygon({
        buffer: 1,
        blockPointerEvents: true
      }),
      move: false,
      ...mergedInteractions.hover
    }),
    useFocus(floating.context, {
      enabled: !!mergedInteractions.focus,
      ...mergedInteractions.focus
    }),
    useRole(floating.context, {
      role: "dialog",
      enabled: !!role
    })
  ]);
  let [referenceWidth, setReferenceWidth] = reactExports.useState();
  let [availableHeight, setAvailableHeight] = reactExports.useState();
  let getFloatingProps = reactExports.useCallback(
    (userProps) => {
      var _a3;
      return interactions.getFloatingProps({
        ...userProps,
        style: {
          ...floating.floatingStyles,
          ...middleware.size && availableHeight && {
            maxBlockSize: `min(${availableHeight}px, ${maxHeight})`
          },
          zIndex: 9999,
          ...matchWidth && referenceWidth ? {
            minInlineSize: `${referenceWidth}px`,
            maxInlineSize: `min(${2 * referenceWidth}px, 90vw)`
          } : {},
          ...middleware.hide && ((_a3 = floating.middlewareData.hide) == null ? void 0 : _a3.referenceHidden) && {
            visibility: "hidden"
          },
          ...userProps == null ? void 0 : userProps.style
        }
      });
    },
    [
      interactions,
      floating.floatingStyles,
      (_b = floating.middlewareData.hide) == null ? void 0 : _b.referenceHidden,
      middleware.size,
      middleware.hide,
      availableHeight,
      maxHeight,
      matchWidth,
      referenceWidth
    ]
  );
  let getReferenceProps = reactExports.useCallback(
    (userProps) => interactions.getReferenceProps({
      ...userProps,
      onClick: mergeEventHandlers(userProps == null ? void 0 : userProps.onClick, () => {
        if (!!mergedInteractions.click && visible) onOpenChange(false);
      })
    }),
    [interactions, mergedInteractions.click, visible, onOpenChange]
  );
  return reactExports.useMemo(
    () => ({
      open,
      onOpenChange,
      getReferenceProps,
      getFloatingProps,
      ...floating
    }),
    [open, onOpenChange, getFloatingProps, floating, getReferenceProps]
  );
};
const Popover = reactExports.forwardRef((props, forwardedRef) => {
  var _a2;
  let {
    portal = true,
    visible,
    placement = "bottom-start",
    onVisibleChange,
    closeOnOutsideClick = true,
    middleware,
    positionReference,
    className,
    children,
    content,
    applyBackground = false,
    ...rest
  } = props;
  let popover = usePopover({
    visible,
    placement,
    onVisibleChange,
    closeOnOutsideClick,
    role: "dialog",
    middleware
  });
  let [popoverElement, setPopoverElement] = reactExports.useState();
  let popoverRef = useMergedRefs(
    popover.refs.setFloating,
    forwardedRef,
    setPopoverElement
  );
  let triggerId = `${useId$1()}-trigger`;
  let hasAriaLabel = !!props["aria-labelledby"] || !!props["aria-label"];
  useIsomorphicLayoutEffect(() => {
    if (!positionReference) return;
    popover.refs.setPositionReference(positionReference);
    return () => void popover.refs.setPositionReference(null);
  }, [popover.refs, positionReference]);
  let [initialFocus, setInitialFocus] = reactExports.useState();
  let initialFocusContextValue = reactExports.useMemo(
    () => ({
      setInitialFocus
    }),
    []
  );
  return reactExports.createElement(
    reactExports.Fragment,
    null,
    reactExports.createElement(
      PopoverOpenContext.Provider,
      {
        value: popover.open
      },
      cloneElementWithRef(children, (children2) => ({
        id: children2.props.id || triggerId,
        ...popover.getReferenceProps(children2.props),
        ref: popover.refs.setReference
      }))
    ),
    popover.open ? reactExports.createElement(
      PopoverInitialFocusContext.Provider,
      {
        value: initialFocusContextValue
      },
      reactExports.createElement(
        PopoverPortal,
        {
          portal
        },
        reactExports.createElement(
          ThemeProvider,
          {
            portalContainer: popoverElement
          },
          reactExports.createElement(DisplayContents, null),
          reactExports.createElement(
            FloatingFocusManager,
            {
              context: popover.context,
              modal: false,
              initialFocus
            },
            reactExports.createElement(
              Box,
              {
                className: classnames(
                  {
                    "iui-popover-surface": applyBackground
                  },
                  className
                ),
                "aria-labelledby": hasAriaLabel ? void 0 : (_a2 = popover.refs.domReference.current) == null ? void 0 : _a2.id,
                ...popover.getFloatingProps(rest),
                ref: popoverRef
              },
              content
            )
          )
        )
      )
    ) : null
  );
});
let PopoverPortal = ({ children, portal = true }) => {
  let portalTo = usePortalTo(portal);
  return reactExports.createElement(
    FloatingPortal,
    {
      key: portalTo == null ? void 0 : portalTo.id,
      root: portalTo
    },
    reactExports.createElement(DisplayContents, null),
    children
  );
};
let DisplayContents = reactExports.memo(
  () => reactExports.createElement(
    ShadowRoot$1,
    {
      css: `
        :host {
          display: contents;
        }
      `
    },
    reactExports.createElement("slot", null)
  )
);
const IconButton = reactExports.forwardRef((props, ref) => {
  let {
    isActive,
    children,
    styleType = "default",
    size: size2,
    className,
    title,
    label = title,
    iconProps,
    labelProps,
    ...rest
  } = props;
  let buttonGroupOrientation = reactExports.useContext(ButtonGroupContext);
  let hasPopoverOpen = reactExports.useContext(PopoverOpenContext);
  let button = reactExports.createElement(
    ButtonBase,
    {
      ref,
      className: classnames("iui-button", "iui-field", className),
      "data-iui-variant": "default" !== styleType ? styleType : void 0,
      "data-iui-size": size2,
      "data-iui-active": isActive,
      "data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
      "aria-pressed": isActive,
      ...rest
    },
    reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...iconProps,
        className: classnames("iui-button-icon", iconProps == null ? void 0 : iconProps.className)
      },
      children
    ),
    label ? reactExports.createElement(VisuallyHidden, null, label) : null
  );
  return label ? reactExports.createElement(
    Tooltip,
    {
      placement: "vertical" === buttonGroupOrientation ? "right" : "top",
      ...labelProps,
      content: label,
      ariaStrategy: "none"
    },
    button
  ) : button;
});
let OverflowContainerComponent = React$1.forwardRef((props, ref) => {
  let { itemsCount, children, overflowOrientation, ...rest } = props;
  let [containerRef, visibleCount] = useOverflow(
    itemsCount,
    false,
    overflowOrientation
  );
  let overflowContainerContextValue = React$1.useMemo(
    () => ({
      visibleCount,
      itemsCount
    }),
    [itemsCount, visibleCount]
  );
  return React$1.createElement(
    OverflowContainerContext.Provider,
    {
      value: overflowContainerContextValue
    },
    React$1.createElement(
      Box,
      {
        ref: useMergedRefs(ref, containerRef),
        ...rest
      },
      children
    )
  );
});
let OverflowContainerOverflowNode = (props) => {
  let { children } = props;
  let { visibleCount, itemsCount } = useOverflowContainerContext();
  let isOverflowing = visibleCount < itemsCount;
  return isOverflowing ? children : null;
};
const OverflowContainer = Object.assign(OverflowContainerComponent, {
  OverflowNode: OverflowContainerOverflowNode,
  useContext: useOverflowContainerContext
});
let OverflowContainerContext = React$1.createContext(void 0);
function useOverflowContainerContext() {
  let overflowContainerContext = useSafeContext(OverflowContainerContext);
  return overflowContainerContext;
}
const ButtonBase = reactExports.forwardRef((props, forwardedRef) => {
  let {
    as: asProp = "button",
    disabled: disabledProp,
    htmlDisabled,
    ...rest
  } = props;
  let isClient = useIsClient();
  let ariaDisabled = disabledProp && !htmlDisabled && isClient && "button" === asProp;
  let handleIfEnabled = (handler) => (e) => {
    if (disabledProp) return;
    handler == null ? void 0 : handler(e);
  };
  return reactExports.createElement(Box, {
    as: asProp,
    type: "button" === asProp ? "button" : void 0,
    ref: forwardedRef,
    "aria-disabled": ariaDisabled ? "true" : void 0,
    "data-iui-disabled": disabledProp ? "true" : void 0,
    disabled: !!(htmlDisabled ?? (!isClient && disabledProp)) || void 0,
    ...rest,
    className: classnames("iui-button-base", props.className),
    onClick: handleIfEnabled(props.onClick),
    onPointerDown: handleIfEnabled(props.onPointerDown),
    onPointerUp: handleIfEnabled(props.onPointerUp)
  });
});
let HydrationContext = reactExports.createContext(false);
let noopSubscribe = () => () => {
};
let isServer = "undefined" == typeof window;
const useHydration = () => {
  let hydrating = useSyncExternalStore(
    noopSubscribe,
    () => false,
    () => !isServer
  );
  let hydrated = reactExports.useContext(HydrationContext);
  let hydratedFallback = useIsClient();
  if (hydrated || hydratedFallback) return "hydrated";
  if (hydrating) return "hydrating";
};
const HydrationProvider = ({ children }) => {
  let [isHydrated, setIsHydrated] = reactExports.useState(
    reactExports.useContext(HydrationContext)
  );
  let onHydrate = reactExports.useCallback(() => setIsHydrated(true), []);
  return reactExports.createElement(
    HydrationContext.Provider,
    {
      value: isHydrated
    },
    isHydrated ? null : reactExports.createElement(HydrationCheck, {
      onHydrate
    }),
    children
  );
};
let HydrationCheck = ({ onHydrate }) => {
  reactExports.useEffect(() => void onHydrate(), [onHydrate]);
  return null;
};
let isBrowser = "undefined" != typeof document;
let supportsDSD = isBrowser && "shadowRootMode" in HTMLTemplateElement.prototype;
let supportsAdoptedStylesheets = isBrowser && "adoptedStyleSheets" in Document.prototype;
const ShadowRoot$1 = ({ children, css: css2 }) => {
  let isHydrating = "hydrating" === useHydration();
  if (!isBrowser)
    return reactExports.createElement(
      "template",
      {
        shadowrootmode: "open"
      },
      css2 && reactExports.createElement("style", null, css2),
      children
    );
  if (supportsDSD && isHydrating) return null;
  return reactExports.createElement(
    ClientShadowRoot,
    {
      css: css2
    },
    children
  );
};
let ClientShadowRoot = ({ children, css: css2 }) => {
  let templateRef = reactExports.useRef(null);
  let shadowRoot = useShadowRoot(templateRef, {
    css: css2
  });
  let fallbackCss = !supportsAdoptedStylesheets && css2 ? reactExports.createElement("style", null, css2) : null;
  return shadowRoot ? reactDomExports.createPortal(
    reactExports.createElement(reactExports.Fragment, null, fallbackCss, children),
    shadowRoot
  ) : reactExports.createElement("template", {
    ref: templateRef
  });
};
function useShadowRoot(templateRef, { css: css2 = "" }) {
  let [shadowRoot, setShadowRoot] = reactExports.useState(null);
  let styleSheet = reactExports.useRef();
  let latestCss = useLatestRef$2(css2);
  let latestShadowRoot = useLatestRef$2(shadowRoot);
  let createStyleSheet = reactExports.useCallback(
    (shadow) => {
      if (shadow && supportsAdoptedStylesheets) {
        let currentWindow = shadow.ownerDocument.defaultView || globalThis;
        if (styleSheet.current instanceof currentWindow.CSSStyleSheet) return;
        styleSheet.current = new currentWindow.CSSStyleSheet();
        shadow.adoptedStyleSheets.push(styleSheet.current);
        if (latestCss.current)
          styleSheet.current.replaceSync(latestCss.current);
      }
    },
    [latestCss]
  );
  useIsomorphicLayoutEffect(() => {
    var _a2;
    let parent = (_a2 = templateRef.current) == null ? void 0 : _a2.parentElement;
    if (!parent) return;
    let setupOrReuseShadowRoot = () => {
      if (parent.shadowRoot && null === latestShadowRoot.current)
        parent.shadowRoot.replaceChildren();
      let shadow = parent.shadowRoot || parent.attachShadow({
        mode: "open"
      });
      createStyleSheet(shadow);
      reactDomExports.flushSync(() => setShadowRoot(shadow));
    };
    queueMicrotask(() => {
      setupOrReuseShadowRoot();
    });
    return () => void setShadowRoot(null);
  }, [templateRef, createStyleSheet, latestShadowRoot]);
  useIsomorphicLayoutEffect(() => {
    var _a2;
    if (css2 && supportsAdoptedStylesheets) (_a2 = styleSheet.current) == null ? void 0 : _a2.replaceSync(css2);
  }, [css2]);
  reactExports.useEffect(() => {
    let listener = () => createStyleSheet(latestShadowRoot.current);
    window.addEventListener("appui:reparent", listener);
    return () => {
      window.removeEventListener("appui:reparent", listener);
    };
  }, [createStyleSheet, latestShadowRoot]);
  return shadowRoot;
}
const Svg = polymorphic.svg("", {
  viewBox: "0 0 16 16",
  width: 16,
  height: 16
});
const SvgInfoCircular = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8zm1.2 3.2a.923.923 0 0 1 .997.843l.003.057a1.31 1.31 0 0 1-1.3 1.2.945.945 0 0 1-1-1 1.228 1.228 0 0 1 1.3-1.1zm-2 9.6c-.5 0-.9-.3-.5-1.7l.6-2.4c.1-.4.1-.5 0-.5-.2-.1-.9.2-1.3.5l-.2-.5a6.497 6.497 0 0 1 3.3-1.6c.5 0 .6.6.3 1.6l-.7 2.6c-.1.5-.1.6.1.6a2.003 2.003 0 0 0 1.1-.6l.3.4a5.769 5.769 0 0 1-3 1.6z"
  })
);
const SvgStatusError = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M9 12H7v-2h2v2Zm0-3H7V4h2v5Zm2.314-9H4.686L0 4.686v6.628L4.686 16h6.628L16 11.314V4.686L11.314 0Z"
  })
);
const SvgStatusSuccess = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m8 0a8 8 0 1 0 8 8 8 8 0 0 0 -8-8zm-1.35 12-3.65-3.41 1.4-1.3 2.36 2.2 4.83-4.49 1.41 1.29z"
  })
);
const SvgStatusWarning = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m15.86807 13.26721-6.77-11.62a1.15 1.15 0 0 0 -1.1-.67 1.17 1.17 0 0 0 -1.1.69l-6.77 11.59a1.2 1.2 0 0 0 1.1 1.72h13.45a1.19 1.19 0 0 0 1.19-1.71zm-6.87-.29h-2v-2h2zm0-3h-2v-5h2z"
  })
);
const StatusIconMap = {
  negative: (args) => reactExports.createElement(SvgStatusError, {
    "aria-hidden": true,
    ...args
  }),
  positive: (args) => reactExports.createElement(SvgStatusSuccess, {
    "aria-hidden": true,
    ...args
  }),
  warning: (args) => reactExports.createElement(SvgStatusWarning, {
    "aria-hidden": true,
    ...args
  }),
  informational: (args) => reactExports.createElement(SvgInfoCircular, {
    "aria-hidden": true,
    ...args
  })
};
const SvgClose = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m14 0-6 6-6-6-2 2 6 6-6 6 2 2 6-6 6 6 2-2-6-6 6-6"
  })
);
const SvgCloseSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m12.5 2-4.5 4.5-4.5-4.5-1.5 1.5 4.5 4.5-4.5 4.5 1.5 1.5 4.5-4.5 4.5 4.5 1.5-1.5-4.5-4.5 4.5-4.5z"
  })
);
const SvgCheckmarkSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "m6 13.4-4.7-4.7 1.4-1.4 3.3 3.3 7.3-7.3 1.4 1.4z"
  })
);
const SvgImportantSmall = (props) => reactExports.createElement(
  Svg,
  props,
  reactExports.createElement("path", {
    d: "M6.25 1h3.5v3.19l-.676 6.408H6.91L6.25 4.19zm.12 10.572h3.268V15H6.37z"
  })
);
const Backdrop = reactExports.forwardRef((props, ref) => {
  let { isVisible = true, className, ...rest } = props;
  return reactExports.createElement(Box, {
    className: classnames(
      "iui-backdrop",
      {
        "iui-backdrop-visible": isVisible
      },
      className
    ),
    ref,
    ...rest
  });
});
const ProgressRadial = reactExports.forwardRef((props, forwardedRef) => {
  let {
    value,
    indeterminate = void 0 === value,
    status,
    size: size2,
    className,
    style,
    children,
    ...rest
  } = props;
  let statusMap = {
    negative: reactExports.createElement(SvgImportantSmall, {
      "aria-hidden": true
    }),
    positive: reactExports.createElement(SvgCheckmarkSmall, {
      "aria-hidden": true
    }),
    warning: reactExports.createElement(SvgImportantSmall, {
      "aria-hidden": true
    })
  };
  return reactExports.createElement(
    Box,
    {
      className: classnames("iui-progress-indicator-radial", className),
      "data-iui-size": size2,
      "data-iui-status": status,
      "data-iui-indeterminate": indeterminate ? "true" : void 0,
      ref: forwardedRef,
      style: {
        ...void 0 !== value && {
          "--iui-progress-percentage": `${getBoundedValue(value, 0, 100)}%`
        },
        ...style
      },
      ...rest
    },
    reactExports.createElement(
      ShadowRoot$1,
      null,
      100 !== value && reactExports.createElement(VisuallyHidden, null, "Loading."),
      reactExports.createElement("slot", null)
    ),
    "x-small" !== size2 ? children ?? (status ? statusMap[status] : null) : null
  );
});
const Button = reactExports.forwardRef((props, ref) => {
  let {
    children,
    className,
    size: size2,
    styleType = "default",
    startIcon,
    endIcon,
    labelProps,
    startIconProps,
    endIconProps,
    stretched,
    loading,
    disabled: disabledProp,
    ...rest
  } = props;
  let hasPopoverOpen = reactExports.useContext(PopoverOpenContext);
  return reactExports.createElement(
    ButtonBase,
    {
      ref,
      className: classnames("iui-button", "iui-field", className),
      "data-iui-variant": "default" !== styleType ? styleType : void 0,
      "data-iui-size": size2,
      "data-iui-loading": loading ? "true" : void 0,
      "data-iui-has-popover": hasPopoverOpen ? "open" : void 0,
      disabled: disabledProp || loading,
      ...rest,
      style: {
        "--_iui-width": stretched ? "100%" : void 0,
        ...props.style
      }
    },
    startIcon && reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...startIconProps,
        className: classnames("iui-button-icon", startIconProps == null ? void 0 : startIconProps.className)
      },
      startIcon
    ),
    children && reactExports.createElement(
      Box,
      {
        as: "span",
        ...labelProps,
        className: classnames("iui-button-label", labelProps == null ? void 0 : labelProps.className)
      },
      children
    ),
    endIcon && reactExports.createElement(
      Box,
      {
        as: "span",
        "aria-hidden": true,
        ...endIconProps,
        className: classnames("iui-button-icon", endIconProps == null ? void 0 : endIconProps.className)
      },
      endIcon
    ),
    loading && reactExports.createElement(ProgressRadial, {
      size: "small" === size2 ? "x-small" : "small",
      className: "iui-button-spinner",
      "aria-hidden": true
    })
  );
});
const DialogContext = reactExports.createContext(void 0);
const useDialogContext = () => reactExports.useContext(DialogContext) || {};
const DialogTitleBarTitle = polymorphic.div("iui-dialog-title");
const DialogDragContext = reactExports.createContext(void 0);
const useDialogDragContext = () => {
  let context = reactExports.useContext(DialogDragContext);
  return {
    ...context
  };
};
const DialogTitleBar = Object.assign(
  reactExports.forwardRef((props, ref) => {
    let dialogContext = useDialogContext();
    let {
      children,
      titleText,
      isDismissible = dialogContext.isDismissible,
      onClose = dialogContext.onClose,
      isDraggable = dialogContext.isDraggable,
      className,
      onPointerDown: onPointerDownProp,
      ...rest
    } = props;
    let { onPointerDown } = useDialogDragContext();
    return reactExports.createElement(
      Box,
      {
        className: classnames("iui-dialog-title-bar", className, {
          "iui-dialog-title-bar-filled": isDraggable
        }),
        ref,
        onPointerDown: mergeEventHandlers(onPointerDownProp, onPointerDown),
        ...rest
      },
      children ? children : reactExports.createElement(
        reactExports.Fragment,
        null,
        reactExports.createElement(DialogTitleBarTitle, null, titleText),
        isDismissible && reactExports.createElement(
          IconButton,
          {
            size: "small",
            styleType: "borderless",
            onClick: onClose,
            "aria-label": "Close",
            "data-iui-shift": "right"
          },
          reactExports.createElement(SvgClose, null)
        )
      )
    );
  }),
  {
    Title: DialogTitleBarTitle
  }
);
const DialogContent = polymorphic.div("iui-dialog-content");
const DialogBackdrop = reactExports.forwardRef((props, ref) => {
  let dialogContext = useDialogContext();
  let {
    isVisible = dialogContext.isOpen,
    isDismissible = dialogContext.isDismissible,
    onClose = dialogContext.onClose,
    closeOnExternalClick = dialogContext.closeOnExternalClick,
    relativeTo = dialogContext.relativeTo,
    onMouseDown,
    className,
    style,
    ...rest
  } = props;
  let backdropRef = reactExports.useRef(null);
  let refs = useMergedRefs(backdropRef, ref);
  let handleMouseDown = (event) => {
    event.persist();
    if (event.target !== backdropRef.current) return;
    if (isDismissible && closeOnExternalClick && onClose) onClose(event);
    onMouseDown == null ? void 0 : onMouseDown(event);
  };
  return reactExports.createElement(Backdrop, {
    isVisible,
    className: classnames(
      {
        "iui-backdrop-fixed": "viewport" === relativeTo
      },
      className
    ),
    ref: refs,
    onMouseDown: handleMouseDown,
    style: {
      pointerEvents: "auto",
      ...style
    },
    ...rest
  });
});
const DialogButtonBar = polymorphic.div("iui-dialog-button-bar");
let getContainerRect = (containerRef) => {
  var _a2, _b, _c;
  let containerRect = (_a2 = containerRef == null ? void 0 : containerRef.current) == null ? void 0 : _a2.getBoundingClientRect();
  return {
    top: (containerRect == null ? void 0 : containerRect.top) ?? 0,
    right: (containerRect == null ? void 0 : containerRect.right) ?? ((_b = getWindow$1()) == null ? void 0 : _b.innerWidth) ?? 0,
    bottom: (containerRect == null ? void 0 : containerRect.bottom) ?? ((_c = getWindow$1()) == null ? void 0 : _c.innerHeight) ?? 0,
    left: (containerRect == null ? void 0 : containerRect.left) ?? 0
  };
};
const useDragAndDrop = (elementRef, containerRef, enabled = true) => {
  let grabOffsetX = reactExports.useRef(0);
  let grabOffsetY = reactExports.useRef(0);
  let translateX = reactExports.useRef();
  let translateY = reactExports.useRef();
  let containerRectRef = reactExports.useRef(getContainerRect(containerRef));
  let adjustTransform = reactExports.useCallback(() => {
    var _a2;
    if (!elementRef.current || !enabled) return;
    let { top, right, bottom, left } = (_a2 = elementRef.current) == null ? void 0 : _a2.getBoundingClientRect();
    let [newTranslateX, newTranslateY] = getTranslateValuesFromElement(
      elementRef.current
    );
    containerRectRef.current = getContainerRect(containerRef);
    if (bottom > containerRectRef.current.bottom)
      newTranslateY -= bottom - containerRectRef.current.bottom;
    if (top < containerRectRef.current.top)
      newTranslateY += containerRectRef.current.top - top;
    if (right > containerRectRef.current.right)
      newTranslateX -= right - containerRectRef.current.right;
    if (left < containerRectRef.current.left)
      newTranslateX += containerRectRef.current.left - left;
    translateX.current = newTranslateX;
    translateY.current = newTranslateY;
    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
  }, [containerRef, elementRef, enabled]);
  let [resizeRef, resizeObserver] = useResizeObserver(adjustTransform);
  resizeRef(containerRef == null ? void 0 : containerRef.current);
  reactExports.useEffect(
    () => () => {
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
    },
    [resizeObserver]
  );
  useEventListener(
    "resize",
    () => {
      adjustTransform();
      if (null != translateX.current && null != translateY.current)
        setTransform(
          `translate(${translateX.current}px, ${translateY.current}px)`
        );
    },
    getWindow$1()
  );
  let [transform, setTransform] = reactExports.useState("");
  let onPointerMove = reactExports.useRef((event) => {
    if (!elementRef.current) return;
    let newTranslateX = event.clientX - grabOffsetX.current;
    let newTranslateY = event.clientY - grabOffsetY.current;
    elementRef.current.style.transform = `translate(${newTranslateX}px, ${newTranslateY}px)`;
    adjustTransform();
  });
  let originalUserSelect = reactExports.useRef("");
  let onPointerDown = reactExports.useCallback(
    (e) => {
      if (!elementRef.current || 0 !== e.button || !enabled) return;
      let [x, y] = getTranslateValuesFromElement(elementRef.current);
      grabOffsetX.current = e.clientX - x;
      grabOffsetY.current = e.clientY - y;
      originalUserSelect.current = elementRef.current.style.userSelect;
      elementRef.current.style.userSelect = "none";
      let ownerDocument = elementRef.current.ownerDocument || document;
      ownerDocument.addEventListener("pointermove", onPointerMove.current);
      ownerDocument.addEventListener(
        "pointerup",
        () => {
          setTransform(
            `translate(${translateX.current}px, ${translateY.current}px)`
          );
          ownerDocument.removeEventListener(
            "pointermove",
            onPointerMove.current
          );
          if (elementRef.current)
            elementRef.current.style.userSelect = originalUserSelect.current;
        },
        {
          once: true
        }
      );
    },
    [elementRef, enabled]
  );
  return {
    onPointerDown,
    transform
  };
};
const DialogMain = reactExports.forwardRef((props, ref) => {
  let dialogContext = useDialogContext();
  let {
    className,
    children,
    styleType = "default",
    isOpen = dialogContext.isOpen,
    isDismissible = dialogContext.isDismissible,
    onClose = dialogContext.onClose,
    closeOnEsc = dialogContext.closeOnEsc,
    trapFocus = dialogContext.trapFocus,
    setFocus = dialogContext.setFocus,
    preventDocumentScroll = dialogContext.preventDocumentScroll,
    onKeyDown,
    isDraggable = dialogContext.isDraggable,
    isResizable = dialogContext.isResizable,
    style: propStyle,
    placement = dialogContext.placement,
    ...rest
  } = props;
  let [style, setStyle] = reactExports.useState();
  let dialogRef = reactExports.useRef(null);
  let hasBeenResized = reactExports.useRef(false);
  let previousFocusedElement = reactExports.useRef();
  let originalBodyOverflow = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (isOpen) originalBodyOverflow.current = document.body.style.overflow;
  }, [isOpen]);
  reactExports.useEffect(() => {
    var _a2;
    let ownerDocument = (_a2 = dialogRef.current) == null ? void 0 : _a2.ownerDocument;
    if (!ownerDocument || !preventDocumentScroll || "hidden" === originalBodyOverflow.current)
      return;
    if (isOpen) ownerDocument.body.style.overflow = "hidden";
    else ownerDocument.body.style.overflow = originalBodyOverflow.current;
    return () => {
      ownerDocument.body.style.overflow = originalBodyOverflow.current;
    };
  }, [isOpen, preventDocumentScroll]);
  let handleKeyDown = (event) => {
    if (event.altKey) return;
    event.persist();
    if (isDismissible && closeOnEsc && "Escape" === event.key && onClose)
      onClose(event);
    onKeyDown == null ? void 0 : onKeyDown(event);
  };
  let { onPointerDown, transform } = useDragAndDrop(
    dialogRef,
    dialogContext.dialogRootRef,
    isDraggable
  );
  let handlePointerDown = reactExports.useCallback(
    (event) => {
      if (isDraggable) onPointerDown(event);
    },
    [isDraggable, onPointerDown]
  );
  useIsomorphicLayoutEffect(() => {
    if (!isDraggable || !isOpen) return;
    let [translateX, translateY] = getTranslateValuesFromElement(
      dialogRef.current
    );
    setStyle((oldStyle) => {
      var _a2, _b;
      return {
        ...oldStyle,
        insetInlineStart: (_a2 = dialogRef.current) == null ? void 0 : _a2.offsetLeft,
        insetBlockStart: (_b = dialogRef.current) == null ? void 0 : _b.offsetTop,
        transform: `translate(${translateX}px,${translateY}px)`
      };
    });
  }, [isDraggable, isOpen]);
  let setResizeStyle = reactExports.useCallback((newStyle) => {
    setStyle((oldStyle) => ({
      ...oldStyle,
      ...newStyle
    }));
  }, []);
  let content = reactExports.createElement(
    Box,
    {
      className: classnames(
        "iui-dialog",
        {
          "iui-dialog-default": "default" === styleType,
          "iui-dialog-full-page": "fullPage" === styleType,
          "iui-dialog-visible": isOpen,
          "iui-dialog-draggable": isDraggable
        },
        className
      ),
      role: "dialog",
      ref: useMergedRefs(dialogRef, ref),
      onKeyDown: handleKeyDown,
      tabIndex: -1,
      "data-iui-placement": placement,
      style: {
        transform,
        ...style,
        ...propStyle
      },
      ...rest
    },
    reactExports.createElement(
      ShadowRoot$1,
      null,
      reactExports.createElement("slot", null),
      isResizable && reactExports.createElement(Resizer, {
        elementRef: dialogRef,
        containerRef: dialogContext.dialogRootRef,
        onResizeStart: () => {
          if (!hasBeenResized.current) {
            hasBeenResized.current = true;
            setResizeStyle({
              maxInlineSize: "100%"
            });
          }
        },
        onResizeEnd: setResizeStyle
      })
    ),
    children
  );
  return reactExports.createElement(
    Transition,
    {
      in: isOpen,
      appear: true,
      timeout: {
        exit: 600
      },
      onEntered: () => {
        var _a2, _b;
        previousFocusedElement.current = (_a2 = dialogRef.current) == null ? void 0 : _a2.ownerDocument.activeElement;
        setFocus && ((_b = dialogRef.current) == null ? void 0 : _b.focus({
          preventScroll: true
        }));
      },
      onExit: () => {
        var _a2, _b, _c;
        if ((_b = dialogRef.current) == null ? void 0 : _b.contains(
          (_a2 = dialogRef.current) == null ? void 0 : _a2.ownerDocument.activeElement
        ))
          (_c = previousFocusedElement.current) == null ? void 0 : _c.focus();
      },
      unmountOnExit: true,
      nodeRef: dialogRef
    },
    reactExports.createElement(
      DialogDragContext.Provider,
      {
        value: {
          onPointerDown: handlePointerDown
        }
      },
      trapFocus && reactExports.createElement(FocusTrap, null, content),
      !trapFocus && content
    )
  );
});
let DialogComponent = reactExports.forwardRef((props, ref) => {
  let {
    trapFocus = false,
    setFocus = false,
    preventDocumentScroll = false,
    isOpen = false,
    isDismissible = true,
    closeOnEsc = true,
    closeOnExternalClick = false,
    onClose,
    isDraggable = false,
    isResizable = false,
    relativeTo = "viewport",
    placement,
    className,
    portal = false,
    ...rest
  } = props;
  let dialogRootRef = reactExports.useRef(null);
  return reactExports.createElement(
    Transition,
    {
      in: isOpen,
      timeout: {
        exit: 600
      },
      mountOnEnter: true,
      unmountOnExit: true
    },
    reactExports.createElement(
      DialogContext.Provider,
      {
        value: {
          isOpen,
          onClose,
          closeOnEsc,
          closeOnExternalClick,
          isDismissible,
          preventDocumentScroll,
          trapFocus,
          setFocus,
          isDraggable,
          isResizable,
          relativeTo,
          dialogRootRef,
          placement
        }
      },
      reactExports.createElement(
        Portal,
        {
          portal
        },
        reactExports.createElement(Box, {
          className: classnames("iui-dialog-wrapper", className),
          "data-iui-relative": "container" === relativeTo,
          ref: useMergedRefs(ref, dialogRootRef),
          ...rest
        })
      )
    )
  );
});
const Dialog$1 = Object.assign(DialogComponent, {
  Backdrop: DialogBackdrop,
  Main: DialogMain,
  TitleBar: DialogTitleBar,
  Content: DialogContent,
  ButtonBar: DialogButtonBar
});
export {
  DbOpcode as $,
  IModelStatus as A,
  Button as B,
  ToolbarItemUtilities as C,
  DialogLayoutDataProvider as D,
  PropertyEditorParamTypes as E,
  StandardEditorNames as F,
  Guid as G,
  Id64 as H,
  IconButton as I,
  shallowClone as J,
  Key_enum as K,
  Logger as L,
  lowerBound as M,
  SortedArray as N,
  JsonUtils as O,
  PropertyChangeStatus as P,
  CompressedId64Set as Q,
  RelativePosition as R,
  StandardTypeNames as S,
  ThemeProvider as T,
  UiAdmin as U,
  VisuallyHidden as V,
  OpenMode as W,
  GeoServiceStatus as X,
  MutableCompressedId64Set as Y,
  OrderedId64Iterable as Z,
  DbResult as _,
  DialogButtonType as a,
  useListNavigation as a$,
  RpcInterfaceStatus as a0,
  Tracing as a1,
  StatusCategory as a2,
  utf8ToString as a3,
  UiItemsManager as a4,
  StageUsage as a5,
  AbstractStatusBarItemUtilities as a6,
  AbstractZoneLocation as a7,
  AlternateDateFormats as a8,
  BackstageItemType as a9,
  isColorEditorParams as aA,
  isCustomFormattedNumberParams as aB,
  isIconListEditorParams as aC,
  isInputEditorSizeParams as aD,
  isStageLauncher as aE,
  isSuppressLabelEditorParams as aF,
  matchesWords as aG,
  ReadonlySortedArray as aH,
  TransientIdSequence as aI,
  base64StringToUint8Array as aJ,
  DuplicatePolicy as aK,
  RealityDataStatus as aL,
  LogLevel as aM,
  StatusIconMap as aN,
  forceReflow as aO,
  _objectWithoutPropertiesLoose as aP,
  Transition as aQ,
  TransitionGroupContext as aR,
  polymorphic as aS,
  getBoundedValue as aT,
  useFloatingTree as aU,
  useFloatingNodeId as aV,
  useFloatingParentNodeId as aW,
  useControlledState as aX,
  useFocusableElements as aY,
  usePopover as aZ,
  useInteractions as a_,
  BackstageItemUtilities as aa,
  DialogButtonStyle as ab,
  DisplayMessageType as ac,
  FunctionKey as ad,
  GenericUiEvent as ae,
  IconSpecUtilities as af,
  MessageSeverity as ag,
  SpecialKey as ah,
  StagePanelLocation as ai,
  StagePanelSection as aj,
  StatusBarLabelSide as ak,
  StatusBarSection as al,
  SyncPropertiesChangeEvent as am,
  TimeDisplay as an,
  ToolbarOrientation as ao,
  ToolbarUsage as ap,
  UiDataProvider as aq,
  UiItemsApplicationAction as ar,
  UiLayoutDataProvider as as,
  WidgetState as at,
  isAbstractStatusBarActionItem as au,
  isAbstractStatusBarCustomItem as av,
  isAbstractStatusBarLabelItem as aw,
  isActionItem as ax,
  isArrowKey as ay,
  isButtonGroupEditorParams as az,
  Dialog$1 as b,
  useSyncExternalStore as b0,
  cloneElementWithRef as b1,
  mergeRefs as b2,
  Portal as b3,
  PopoverOpenContext as b4,
  FloatingNode as b5,
  mergeEventHandlers as b6,
  FloatingTree as b7,
  ButtonBase as b8,
  useEventListener as b9,
  useId$1 as ba,
  OverflowContainer as bb,
  useSafeContext as bc,
  PopoverInitialFocusContext as bd,
  useIsClient as be,
  CompositeItem as bf,
  Composite as bg,
  useToaster as bh,
  UnexpectedErrors as bi,
  classnames as c,
  ProgressRadial as d,
  PropertyValueFormat as e,
  Tooltip as f,
  Popover as g,
  Box as h,
  StandardContentLayouts as i,
  BeEvent as j,
  BadgeType as k,
  BentleyError as l,
  BentleyStatus as m,
  assert as n,
  PropertyRecord as o,
  BeUiEvent as p,
  getWindow$1 as q,
  ShadowRoot$1 as r,
  Svg as s,
  u as t,
  useMergedRefs as u,
  useGlobals as v,
  useLatestRef$2 as w,
  useResizeObserver as x,
  useIsomorphicLayoutEffect as y,
  RepositoryStatus as z
};
