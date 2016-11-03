import PropertyDescription from "src/app/model/property-description.model";
import Relationship from "src/app/model/relationship.model";

export default class RelationshipDescription extends PropertyDescription {
  destinationModel;
  inverseRelationship;

  constructor(name, destinationModel, inverseRelationship) {
    super(name);
    this.destinationModel = destinationModel;
    this.inverseRelationship = inverseRelationship;
  }

  decorate(model) {
    let relationship = new Relationship(this, model);
    Object.defineProperty(model, this.name, {
      get: () => {
        if (relationship.isFault) {
          model.context.realizeFault(relationship);
        }
        return relationship.value;
      },
      set: (entity) => {
        relationship.attach(entity);
      }
    })
  }
};
