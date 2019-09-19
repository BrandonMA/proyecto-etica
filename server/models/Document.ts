import mongoose, { Schema, Document } from 'mongoose';

export enum DocumentType {
    document = 'document',
    video = 'video',
    blog = 'blog'
}

export interface JSONDocument {
    name: string,
    content: string,
    id: string,
    type: DocumentType
}

export interface IDocument extends Document {
    name: string,
    content: string,
    id: string,
    type: DocumentType
}

const DocumentSchema: Schema = new Schema({
    name: String,
    content: String,
    type: String
});

export default mongoose.model<IDocument>('Document', DocumentSchema);