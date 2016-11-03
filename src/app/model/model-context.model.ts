import { ModelService } from './model-service.model';
import ModelId from "./model-id-model";

export default class ModelContext
{
  modelObjects : Array;
  modelMap : Map;
  modelIdMap : Map;
  availableTypes : Array;
  resources : Array;

  constructor(public service : ModelService) {
    this.availableTypes = Object.keys(service);
    this.resources = Object.values(service);

    this.modelMap = new Map();
    this.modelIdMap = new Map();
    this.modelObjects = [];
  }
  loadAll() : Promise {
    let promises = this.resources.map((resource) => this._loadSingleResource(resource));
    return Promise.all(promises)
  }
  load(typeName) {
    if (!typeName) {
      return this.loadAll();
    }
    if (!this.availableTypes.includes(typeName)) {
      return Promise.reject(`Request Model Type ${typeName} does not exist.`)
    }
    let resource = this.service[typeName];
    return this._loadSingleResource(resource);
  }
  modelIdForDataAndDesc(id: ModelId, modelDescription) { // Todo: move to store
    let modelId = this.modelIdMap.get(id);
    if (!modelId) {
      let modelId = ModelId.withExistingData(this.service, modelDescription, id);
      this.modelIdMap.set(id, modelId);
    }
    return modelId;
  }
  modelForModelId(modelId) {
    let model = this.modelMap.get(modelId);
    if (!model) {
      model = modelId.modelDescription.create(this);
      this.modelMap.set(modelId, model);
    }
    return model;
  }
  modelForId(id, modelDescription) {
    let modelId = this.modelIdForDataAndDesc(id, modelDescription);
    return this.modelForModelId(modelId);
  }
  realizeFault(relation) {
    let {value} = relation;
    let model = this.modelObjects.find((model) => value === model.id);
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
  save() {

  }
  _loadSingleResource(resource) {
    return resource.get()
      .then((modelObjects) => {
        this.modelObjects.push(...modelObjects);
        return modelObjects;
      })
  }
}
