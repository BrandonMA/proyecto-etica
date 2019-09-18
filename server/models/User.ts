import mongoose, { Schema, Document } from 'mongoose';

export enum UserType {
    user = 'User',
    admin = 'Admin'
}

export interface JSONUser {
    name: string,
    lastname: string,
    email: string,
    type: UserType
}

export interface IUser extends Document {
    name: string,
    lastname: string,
    email: string,
    password: string,
    type: UserType
}

const UserSchema: Schema = new Schema({
    name: String,
    lastname: String,
    email: { type: String, unique: true, required: true, dropDups: true },
    password: String,
    type: String
});

export default mongoose.model<IUser>('User', UserSchema);