import Property from "src/app/model/property.model";

export default class PropertyDescription {
  name;
  constructor(name) {
    this.name = name;
  }
  decorate(model) {
    let property = new Property(this, model);
    Object.defineProperty(model, this.name, {
      get: () => property.value,
      set: (value) => {
        if (value === property.value) {
          return;
        }
        property.value = value;
        model.isDirty = true;
      }
    });
    return property;
  }
}
