import ModelId from "./managed-object-id.model";
import ManagedObjectModel from "./managed-object-model.model";
import StoreAdapter from "./store-adapter.model";
import EntityDescription from "./entity-description.model";

export default class ModelStore {
  keyToModelIdMap: Map<string, ModelId>;
  modelIdToKeyMap: Map<ModelId, string>;
  modelDescToAdapterMap: Map<EntityDescription, StoreAdapter>;
  adapters: Set<StoreAdapter>;
  managedObjectModel: ManagedObjectModel;

  constructor(managedObjectModel: ManagedObjectModel) {
      this.keyToModelIdMap = new Map();
      this.modelIdToKeyMap = new Map();
      this.managedObjectModel = managedObjectModel;
  }

  modelIdForDataAndDesc(data: string, entityDescription: EntityDescription) : ModelId { // Todo: move to store
    let modelId = this.keyToModelIdMap.get(data);
    if (!modelId) {
      let modelId = ModelId.withExistingData(entityDescription, this, data);
      this.keyToModelIdMap.set(data, modelId);
    }
    return modelId;
  }
  getAllObjectsForType(typeName : string) : Promise<Array<Object>> {
      return Promise.resolve([{}]);
  }
  fetch(fetchRequest: FetchRequest) {
      if (!this.modelDescToAdapterMap) {
          this.createAdapters();
      }
      for (let modelDesc of fetchRequest) {

      }
  }
  fetchForModelDesc(modelDesc: EntityDescription, fetchRequest: FetchRequest) {
      let adapter = this.modelDescToAdapterMap.get(modelDesc);
      return adapter.fetch(fetchRequest)
  }

  registerObject() {
      this
  }

  createAdapters() {
      this.modelDescToAdapterMap = new Map();
      for (let desc of this.schema.models) {
          let adapter = new StoreAdapter(desc);
          this.modelDescToAdapterMap.set(desc, adapter);
          this.adapters.add(adapter);
      }
  }
};
