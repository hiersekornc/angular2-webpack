import ModelContext from "src/app/model/model-context.model";
import {IModel} from "src/app/model/model-description.model";

export default abstract class Model implements IModel {
  context : ModelContext;
  constructor(context : ModelContext) {
    this.context = context;
  }
};
