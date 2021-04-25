import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true }, 
    password: String,
    birthdate: Date,
    createdAt: Date
})

export default model('Users', userSchema);