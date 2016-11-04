import Model from "managed-object.model";
import {IRelationship} from "src/app/model/relationship.model";
import Property from "src/app/model/property.model";
import RelationshipCollectionDescription from "src/app/model/relationship-collection-description.model";

export default class RelationshipCollection<T> extends Property<Set> implements IRelationship {
  protected _value: Set<T>;

  constructor(description: RelationshipCollectionDescription, model: Model) {
    super(description, model);

    this._value = new Set<T>();
  }
  attach(entity) {
    return this.value.add(entity);
  }

  detach(entity) {
    return this.value.delete(entity);
  }
  toObject() : Set<string> {
    let idSet: Set<string> = new Set();
    for (let model of this.value) {
      idSet.add(model.id);
    }
    return idSet;
  }
  static fromObject(description: RelationshipCollectionDescription, model: Model, idArray: Array<string>) : RelationshipCollection {
    let relCol = new this(description, model);
    for (let data of idArray) {
      relCol.attach( model.context.modelForDataAndDesc(data, description.destinationModel) );
    }
    return relCol;
  }
}
