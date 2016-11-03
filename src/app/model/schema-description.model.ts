import ModelDescription from "src/app/model/model-description.model";

export default class SchemaDescription {
  models : Array<ModelDescription>;

  constructor() {
    this.models = [];
  }

  addModel(model : ModelDescription) {
    this.models.push(model);
  }

}
