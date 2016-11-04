import ManagedObjectContext from "managed-object-context.model";
import EntityDescription from "entity-description.model";
import Property from "./property.model";
import PropertyDescription from "src/app/model/property-description.model";
import ManagedObjectID from "managed-object-id.model";

export default abstract class ManagedObject {
  readonly objectId: ManagedObjectID;
  context: ManagedObjectContext;
  entity: EntityDescription;
  hasChanges: boolean;
  isInserted: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  isFault: boolean;
  protected properties: Set<Property>;


  get hasChanges() {
    return this.isInserted || this.isUpdated || this.isDeleted;
  }

  constructor(entity: EntityDescription, context: ManagedObjectContext) {
    this.entity = entity;
    this.context = context;
  }

  fireFault(property: Property) {
    this.context.realizeModel(this);
  }

  toObject() {
    var object = Object.create(null);
    for (let property of this.properties) {
      Object.defineProperty(object, property.description.name, {
        value: property.toObject(object)
      });
    }
    return object;
  }

  static initWith(entity: EntityDescription, insertIntoManagedObjectContext: ManagedObjectContext) {
    let managedObject = new this(entity, insertIntoManagedObjectContext);
    for (let property of entity.properties) {
      managedObject.properties.add( property.decorate(managedObject) );
    }
    return managedObject;
  };
};
