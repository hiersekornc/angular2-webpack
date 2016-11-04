import { rfc4122 } from './uuid.service';
import ModelDescription from "./model-description.model";
import ModelStore from "./model-store.model";

export default class ModelId {
  modelDescription: ModelDescription;
  store: ModelStore;
  private _data: string;

  isTemporaryID() : boolean {
    return rfc4122.isUUID(this._data)
  }

  constructor(modelDescription: ModelDescription, store: ModelStore) {
    this.modelDescription = modelDescription;
    this.store = store;
    this._data = rfc4122.v4();
  }

  toJSON() {
    if (this.isTemporaryID()) {
      return undefined;
    }
    return this._data;
  }

  static withExistingData( modelDescription: ModelDescription, store: ModelStore, data: string) {
    let objectId = new this(modelDescription, store);
    objectId._data = data;
    return objectId;
  }
}
