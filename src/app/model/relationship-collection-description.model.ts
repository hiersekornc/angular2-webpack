import RelationshipDescription from "relationship-description.model";
import RelationshipCollection from "src/app/model/relationship-collection.model";
import Model from "managed-object.model";


export default class RelationshipCollectionDescription extends RelationshipDescription {

  decorate(model: Model) : RelationshipCollection {
    let add = this.accessorNameForAddingEntity();
    let remove = this.accessorNameForRemovingEntity();
    let collection = new RelationshipCollection(this, model);
    Object.defineProperty(model, this.name, {
      get: () => collection
    });
    Object.defineProperty(model, add, {
      get: () => collection.attach
    });
    Object.defineProperty(model, remove, {
      get: () => collection.detach
    });
    return collection;
  }
  accessorNameForAddingEntity() : string {
    let entityName = RelationshipCollectionDescription.capitalizeFirstLetter(this.name);
    return `add${entityName}`;
  }
  accessorNameForRemovingEntity() : string {
    let entityName = RelationshipCollectionDescription.capitalizeFirstLetter(this.name);
    return `remove${entityName}`;
  }
  static capitalizeFirstLetter(string: string) : string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
