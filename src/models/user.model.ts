import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from '@models/base.model';

export interface IUser extends Document {
    email: string;
    password: string;
    firstName?: string;
    paginate?: any;
}

const UserSchema: Schema = new BaseModel({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String }
});

export default mongoose.model<IUser, IBaseModel>('User', UserSchema);