import { IModelConnection } from "@itwin/core-frontend";
import { SchemaContext } from "@itwin/ecschema-metadata";
import { ECSchemaRpcLocater } from "@itwin/ecschema-rpcinterface-common";

const schemaContextsCache = new Map<string, SchemaContext>();
export function getSchemaContext(imodel: IModelConnection) {
  const context = schemaContextsCache.get(imodel.key);
  if (context) {
    return context;
  }

  const newContext = new SchemaContext();
  newContext.addLocater(new ECSchemaRpcLocater(imodel.getRpcProps()));
  schemaContextsCache.set(imodel.key, newContext);

  imodel.onClose.addListener(() => schemaContextsCache.delete(imodel.key));

  return newContext;
}
