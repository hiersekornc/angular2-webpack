import Model from "src/app/model/model.model";
import PropertyDescription from "src/app/model/property-description.model";
import ModelContext from "src/app/model/model-context.model";
import ModelId from "src/app/model/model-id-model";
import Property from "src/app/model/property.model";

export default class ModelDescription<T> {
  ModelClass : T;
  propertyDescriptions : Array<PropertyDescription>;
  get name() : string {
    return this.ModelClass.name;
  }
  constructor(ModelClass : T) {
    this.ModelClass = ModelClass || Model;
  }
  addPropertyDescription(propDef : PropertyDescription) {
    this.propertyDescriptions.push(propDef);
  }
  create(context : ModelContext) : Model {
    let model : T = Object.create(this.ModelClass.prototype, {
      "modelDescription": {
        value: this
      },
      "_properties": {
        value: this.propertyDescriptions.map((property) => property.decorate(model))
      },
      "isDirty": {
        value: false
      },
      "isFault": {
        value: true
      },
      'id': {
        value: new ModelId(this, context.service),
        writable: false
      },
      '_id': { // this = ModelClass
        set: function(value) {
          this.id.setValue(value);
        },
        get: function() {
          return this.id.data;
        }
      },
      "toObject": {
        get: function() {
          return () => {
            var object = Object.create(null);
            this["_properties"].forEach((property) => property.toObject(object));
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
  _properties: Array<Property>;
  isDirty: boolean;
  isFault: boolean;
  readonly id: ModelId;
  _id: string;
  toObject(): Object;
}
