import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    birthdate: Date,
    createdAt: Date
})

export default model('Users', userSchema);