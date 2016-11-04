import ModelId from "./model-id.model";
import ModelSchema from "./model-schema.model";
import ModelDescription from "./model-description.model";

export default class StoreAdapter {
    modelDesc: ModelDescription;

    constructor(modelDesc: ModelDescription) {
        this.modelDesc = modelDesc;
    }

    fetchAll() : Promise<Array<Object>> {
        return Promise.resolve([{}]);
    }

    registerObject() {
        this
    }
};
