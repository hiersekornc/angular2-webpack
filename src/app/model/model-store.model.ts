import ModelId from "./model-id.model";
import ModelSchema from "./model-schema.model";
import StoreAdapter from "./store-adapter.model";
import ModelDescription from "./model-description.model";

export default class ModelStore {
    keyToModelIdMap: Map<string, ModelId>;
    modelIdToKeyMap: Map<ModelId, string>;
    modelDescToAdapterMap: Map<ModelDescription, StoreAdapter>;
    adapters: Set<StoreAdapter>;
    schema: ModelSchema;

    constructor(schema: ModelSchema) {
        this.keyToModelIdMap = new Map();
        this.modelIdToKeyMap = new Map();
        this.schema = schema;
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
    fetchForModelDesc(modelDesc: ModelDescription, fetchRequest: FetchRequest) {
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
