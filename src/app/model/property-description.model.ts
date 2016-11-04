import Property from "src/app/model/property.model";
import Model from "./model.model";

export default class PropertyDescription<T> {
  name: string;
  type: any;
  isKey: boolean;

  constructor(name: string, isKey: boolean = false) {
    this.name = name;
    this.isKey = isKey;
    this.type = T;
  }

  decorate(model: Model) : Property<T> {
    let property = new Property<T>(this, model);
    Object.defineProperty(model, this.name, {
      get: () => property.value,
      set: (value) => {
        if (value === property.value) {
          return;
        }
        property.value = value;
        model.isUpdated = true;
      }
    });
    return property;
  }
}
