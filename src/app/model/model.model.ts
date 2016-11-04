import ModelContext from "src/app/model/model-context.model";
import {IModel} from "src/app/model/model-description.model";
import Property from "./property.model";

export default abstract class Model implements IModel {
  context: ModelContext;
  hasChanges: boolean;
  isInserted: boolean = false;
  isUpdated: boolean = false;
  isDeleted: boolean = false;
  isFault: boolean;

  get hasChanges() {
    return this.isInserted || this.isUpdated || this.isDeleted;
  }

  constructor(context : ModelContext) {
    this.context = context;
  }

  fireFault(property: Property) {
    this.context.realizePropertiesForModel(this);
  }
};
