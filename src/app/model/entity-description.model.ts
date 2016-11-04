import Model from "managed-object.model";
import PropertyDescription from "src/app/model/property-description.model";
import ManagedObjectContext from "managed-object-context.model";
import ModelId from "managed-object-id.model";
import Property from "src/app/model/property.model";
import ManagedObject from "src/app/model/managed-object.model";
import ManagedObjectModel from "managed-object-model.model";

export default class EntityDescription<T> {
  name: string;
  managedObjectClassName: string;
  properties: Array<PropertyDescription>;
  propertiesByName: Map<string, PropertyDescription>;
  keyProperties: Set<PropertyDescription>;
  managedObjectModel: ManagedObjectModel;

  constructor(managedObjectClassName: string) {
    this.managedObjectClassName = managedObjectClassName || "ManagedObject";
  }
  addPropertyDescription(propDef: PropertyDescription) {
    if (propDef.isKey) {
      this.keyProperties.add(propDef);
    }
    this.properties.push(propDef);
    this.propertiesByName.set(propDef.name, propDef);
  }
  static insertNewObject(forEntityName: string, into: ManagedObjectContext) : ManagedObject {
    let managedObjectModel = into.store.managedObjectModel;
    let entity = managedObjectModel.entitiesByName.get(forEntityName);
    return ManagedObject.initWith(entity, into);
  }

  static entity(forEntityName:string, inContext: ManagedObjectContext) : EntityDescription {
    let managedObjectModel = inContext.store.managedObjectModel;
    return managedObjectModel.entitiesByName.get(forEntityName);
  }
}
