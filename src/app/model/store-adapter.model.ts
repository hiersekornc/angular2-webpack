import ModelId from "./managed-object-id.model";
import ModelSchema from "./managed-object-model.model";
import EntityDescription from "./entity-description.model";

export default class StoreAdapter {
    modelDesc: EntityDescription;

    constructor(modelDesc: EntityDescription) {
        this.modelDesc = modelDesc;
    }

    fetchAll() : Promise<Array<Object>> {
        return Promise.resolve([{}]);
    }

    registerObject() {
        this
    }
};
