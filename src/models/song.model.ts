import mongoose, { Schema, Document } from 'mongoose';
import BaseModel, { IBaseModel } from '@models/base.model';

interface IArtist {
    _id: Schema.Types.ObjectId,
    full_name: string
}

export interface ISong extends Document {
    name: string;
    description: string;
    artists: Array<IArtist>,
    country: string
}

const SongSchema: Schema = new BaseModel({
    name: { type: String, required: true },
    description: { type: String },
    artists: { type: [Schema.Types.Mixed] },
    country: String
});

export default mongoose.model<ISong, IBaseModel>('Song', SongSchema);