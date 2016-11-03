import RelationshipDescription from "relationship-description.model";
import RelationshipCollection from "src/app/model/relationship-collection.model";
import Model from "src/app/model/model.model";

class RelationshipCollectionDescription extends RelationshipDescription {

  decorate(model : Model) {
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
  accessorNameForAddingEntity() {
    let entityName = RelationshipCollectionDescription.capitalizeFirstLetter(this.name);
    return "add" + entityName;
  }
  accessorNameForRemovingEntity() {
    let entityName = RelationshipCollectionDescription.capitalizeFirstLetter(this.name);
    return "remove" + entityName;
  }
  static capitalizeFirstLetter(string : string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
