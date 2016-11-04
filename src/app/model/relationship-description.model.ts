import PropertyDescription from "src/app/model/property-description.model";
import Relationship from "src/app/model/relationship.model";
import EntityDescription from "entity-description.model";
import Model from "managed-object.model";

export default class RelationshipDescription extends PropertyDescription {
  destinationModel: EntityDescription;
  inverseRelationship: RelationshipDescription;

  constructor(name: string, destinationModel: EntityDescription, inverseRelationship: RelationshipDescription) {
    super(name);
    this.destinationModel = destinationModel;
    this.inverseRelationship = inverseRelationship;
  }

  decorate(model: Model) {
    let relationship = new Relationship(this, model);
    Object.defineProperty(model, this.name, {
      get: () => relationship.value,
      set: (entity) => {
        relationship.attach(entity);
      }
    })
  }
};
