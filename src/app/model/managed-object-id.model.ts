import { rfc4122 } from './uuid.service';
import EntityDescription from "./entity-description.model";
import ModelStore from "./model-store.model";

export default class ManagedManagedObjectID {
  entityDescription: EntityDescription;
  store: ModelStore;
  isTemporaryID: boolean;
  private _data: string;

  private get data() {
    if (!this._data) {
      this._data = rfc4122.v4();
    }
    return this._data;
  }

  constructor(entityDescription: EntityDescription, store: ModelStore) {
    this.entityDescription = entityDescription;
    this.store = store;
    this.isTemporaryID = true;
  }

  toJSON() {
    if (this.isTemporaryID) {
      return undefined;
    }
    return this._data;
  }

  static withExistingData( entityDescription: EntityDescription, store: ModelStore, data: string) {
    let objectId = new this(entityDescription, store);
    objectId._data = data;
    objectId.isTemporaryID = false;
    return objectId;
  }
}
