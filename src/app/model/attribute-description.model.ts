import PropertyDescription from "src/app/model/property-description.model";

export default class AttributeDescription extends PropertyDescription {
  defaultValue : any;
  constructor(name : string, defaultValue : any) {
    super(name);
    this.defaultValue = defaultValue || null;
  }
}
