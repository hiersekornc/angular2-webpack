import ModelStore from './model-store.model';
import ModelId from "./managed-object-id.model";
import Model from "./managed-object.model";
import EntityDescription from "./entity-description.model";
import {IRelationship} from "./relationship.model";

export default class ManagedObjectContext
{
  modelObjects: Array<Model>;
  modelMap: Map<ModelId, Model>;
  availableTypes: Array;
  resources: Array;
  store: ModelStore;

  constructor(public store : ModelStore) {
    this.availableTypes = Object.keys(store);
    this.resources = Object.values(store);

    this.modelMap = new Map();
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
  existingObject(withObjectID: ManagedObjectID) throws -> NSManagedObject
  modelWithModelId(modelId: ModelId) : Model {
    let model = this.modelMap.get(modelId);
    if (!model) {
      model = modelId.entityDescription(this);
      this.modelMap.set(modelId, model);
    }
    return model;
  }
  modelForDataAndDesc(data: string, entityDescription: EntityDescription) : Model {
    let modelId = this.store.modelIdForDataAndDesc(data, entityDescription);
    return this.modelWithModelId(modelId);
  }
  faultIntoContext(relationship: IRelationship) {
    let {model} = relationship;
    this.store.relationshipForModelId(model.id);
  }
  faultIntoContext(model: Model) {
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
