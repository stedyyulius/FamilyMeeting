import { Schema, model } from 'mongoose';

const familySchema = new Schema({
    name: String,
    members: [Schema.Types.ObjectId],
    createdAt: Date
})

export default model('family', familySchema);