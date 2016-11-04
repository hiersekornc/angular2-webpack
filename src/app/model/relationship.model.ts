import Property from "src/app/model/property.model";
import Model from "managed-object.model";

export default class Relationship extends Property<Model> implements IRelationship {
  protected _value : Model;

  attach(entity: Model, skipInverse: boolean = false) {
    if (this.value) {
      this.value.detach(this, true)
    }
    this.value = entity;
    if (!skipInverse) {
      this.value.attach(this, true);
    }
  }
  detach(entity: Model, skipInverse: boolean = false) {
    if (this.value && !skipInverse) {
      this.value.detach(this, true);
    }
    this.value = null;
  }
  toObject() {
    return this.value.id.toObject();
  }
  realizeFault(entity) {
    this._value = entity;
    this.isFault = false;
  }
}

export interface IRelationship {
  attach(model: Model, skipInverse: boolean);
  detach(model: Model, skipInverse: boolean);
}
