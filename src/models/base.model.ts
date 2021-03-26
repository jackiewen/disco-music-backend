import { Schema, Model, SchemaDefinition, DocumentDefinition, SchemaOptions } from 'mongoose';

export interface IBaseModel extends Model<any> {
    paginate(limit: number, page: number, filter: Object): any;
}

export default class BaseModel extends Schema {
    constructor(definition?: SchemaDefinition<DocumentDefinition<any>>, options?: SchemaOptions) {
        super(definition, options);

        this.statics.paginate = function(limit, page, filter = {}) {
            if (!page || page < 1) {
                page = 1;
            }
            return this.find(filter, null, { skip: (page - 1) * limit });
        }
    }
}