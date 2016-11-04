import PropertyDescription from "src/app/model/property-description.model";
import Model from "managed-object.model";

export default class Property<T> {
  description: PropertyDescription;
  model: Model;
  isFault: boolean;
  protected _value: T;

  get value() : T {
    if (this.isFault) {
      this.model.fireFault(this);
    }
    return this._value;
  }
  set value(value: T) {
    this._value = value;
    if (this.isFault) {
      this.isFault = false;
    }
  }
  constructor(description: PropertyDescription, model: Model) {
    this.model = model;
    this.description = description;

    this.isFault = true;
  }
  realizeFault(value: T) {
    this._value = value;
    this.isFault = false;
  }
  toObject(object) {
    return this.value;
  }
  static fromObject(description: PropertyDescription, model: Model, value: Object) {
    let property = new this(description, model);
    property.realizeFault(value);
    return property;
  }
}
