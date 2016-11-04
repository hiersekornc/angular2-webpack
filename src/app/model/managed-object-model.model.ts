import EntityDescription from "entity-description.model";

export default class ManagedObjectModel {
  entitiesByName: Map<string, EntityDescription>;

  constructor() {
    this.entitiesByName = new Map();
  }

  addEntity(entity : EntityDescription) {
    this.entitiesByName.set(entity.name, entity);
  }

}
