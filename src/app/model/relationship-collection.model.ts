import PropertyDescription from "src/app/model/property-description.model";
import Model from "src/app/model/model.model";
import {IRelationship} from "src/app/model/relationship.model";
import Property from "src/app/model/property.model";

export default class RelationshipCollection<T> extends Property implements IRelationship {
  protected _value : Array<T>;

  constructor(description : PropertyDescription, model : Model) {
    super(description, model);

    this._value = [];
  }
  attach(entity) {
    this.push(entity);
  }

  detach(entity) {
    let idx = this.indexOf(entity);
    if (idx > -1) {
      this.removeAt(idx);
    }
  }
  toObject() : Array<string> {
    return this._value.map((entity) => entity.id)
  }
  fromObject(idArray : Array) {
    let models = idArray.map((id) => this.model.context.modelForId(id));
    this.push(...models);
  }
  push(entity) {
    return this.value.push(entity);
  }
  indexOf(entity) {
    return this.value.indexOf(entity);
  }
  objectAtIndex(index) : Model {
    let model = this.value[index];
    if(!model) {
      return; // error?
    }
    return model;
  }
  removeAt(index) {
    return this.value.splice(index, 1);
  }
}
