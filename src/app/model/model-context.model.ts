import ModelStore from './model-store.model';
import ModelId from "./model-id.model";
import Model from "./model.model";
import ModelDescription from "./model-description.model";
import {IRelationship} from "./relationship.model";

export default class ModelContext
{
  modelObjects : Array<Model>;
  modelMap : Map<ModelId, Model>;
  modelIdMap : Map<string, ModelId>;
  availableTypes : Array;
  resources : Array;
  store : ModelStore;

  constructor(public store : ModelStore) {
    this.availableTypes = Object.keys(store);
    this.resources = Object.values(store);

    this.modelMap = new Map();
    this.modelIdMap = new Map();
    this.modelObjects = [];
  }
  loadAll() : Array<Promise> {
    return this.resources.map((resource) => this._loadSingleResource(resource));
  }
  load(typeName: string) : Promise<Array> {
    if (!typeName) {
      return Promise.all(this.loadAll());
    }
    if (!this.availableTypes.includes(typeName)) {
      return Promise.reject(`Request Model Type ${typeName} does not exist.`)
    }
    return this._loadSingleResource(typeName);
  }
  modelIdForDataAndDesc(data: string, modelDescription: ModelDescription) : ModelId { // Todo: move to store
    let modelId = this.modelIdMap.get(data);
    if (!modelId) {
      let modelId = ModelId.withExistingData(modelDescription, this.store, data);
      this.modelIdMap.set(data, modelId);
    }
    return modelId;
  }
  modelWithModelId(modelId: ModelId) : Model {
    let model = this.modelMap.get(modelId);
    if (!model) {
      model = modelId.modelDescription.create(this);
      this.modelMap.set(modelId, model);
    }
    return model;
  }
  modelForDataAndDesc(id: string, modelDescription: ModelDescription) : Model {
    let modelId = this.modelIdForDataAndDesc(id, modelDescription);
    return this.modelWithModelId(modelId);
  }
  realizeFault(property: IRelationship) {
    let {value} = property;
    let model = this.modelWithModelId(value);
    // Todo: Maybe use promises throughout all getters and setters instead of raising Errors when accessing faulty models
    if (!model) {
      throw new Error(`Model with id ${value} either does not exist or has not been loaded.`)
    }
    relation.value = model;
    relation.isFault = false;
    // Realize inverse relation early to avoid additional lookup
    if (!relation.inverse) {
      return;
    }
    relation.inverse.value = relation.model;
  }
  realizePropertiesForModel(model: Model) {
    this.store.getObjectById
  }
  save() {

  }
  _loadSingleResource(typeName: string) : Promise<Array> {
    return this.store.getAll(typeName)
      .then((modelObjects: Array<Model>) => {
        this.modelObjects.push(...modelObjects);
        return modelObjects;
      })
  }
}
