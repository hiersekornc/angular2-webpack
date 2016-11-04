import Model from "src/app/model/model.model";
import PropertyDescription from "src/app/model/property-description.model";
import ModelContext from "src/app/model/model-context.model";
import ModelId from "src/app/model/model-id.model";
import Property from "src/app/model/property.model";

export default class ModelDescription<T> {
  ModelClass : T;
  propertyDescriptions: Set<PropertyDescription>;
  keyProperties: Set<PropertyDescription>;
  get name(): string {
    return this.ModelClass.name;
  }
  constructor(ModelClass: T) {
    this.ModelClass = ModelClass || Model;
  }
  addPropertyDescription(propDef: PropertyDescription) {
    if (propDef.isKey) {
      this.keyProperties.add(propDef);
    }
    this.propertyDescriptions.add(propDef);
  }
  create(context : ModelContext) : Model {
    let model: T = Object.create(this.ModelClass.prototype);
    let properties = new Set();
    for (let propDesc of this.propertyDescriptions) {
      let property = propDesc.decorate(model);
      properties.add(property);
    }
    Object.defineProperties(model, {
      "modelDescription": {
        value: this
      },
      "_properties": {
        value: properties
      },
      'id': {
        value: new ModelId(this, context.store),
        writable: false
      },
      '_id': { // this = ModelClass
        set: function(value) {
          model.id.setValue(value);
        },
        get: function() {
          return model.id.data;
        }
      },
      "toObject": {
        get: function() {
          return () => {
            var object = Object.create(null);
            model["_properties"].forEach((property) => property.toObject(object));
            return object;
          }
        }
      }
    });
    this.ModelClass.apply(model, arguments);
    return model;
  }
}
export interface IModel {
  modelDescription: ModelDescription;
  _properties: Set<Property>;
  isDirty: boolean;
  isFault: boolean;
  readonly id: ModelId;
  _id: string;
  toObject(): Object;
}
