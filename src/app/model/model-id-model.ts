import { rfc4122 } from './uuid.service';

export default class ModelId {
  context;
  modelDescription;
  _data;

  isTemporaryID() {
    return rfc4122.isUUID(this._data)
  }

  constructor(modelDescription, store) {
    this.modelDescription = modelDescription;
    this.store = store;
    this._data = rfc4122.v4();
  }

  setValue(value) {
    this._data = value;
  }

  toJSON() {
    if (this.isTemporaryID()) {
      return undefined;
    }
    return this._data;
  }

  static withExistingData(context, modelDescription, data) {
    let objectId = new this(context, modelDescription);
    objectId._data = data;
    return objectId;
  }
}
