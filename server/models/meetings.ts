import { Schema, model } from 'mongoose';

const meetingSchema = new Schema({
    name: String,
    date: Date,
    createdBy: Schema.Types.ObjectId,
    participants: [Schema.Types.ObjectId],
    familyId: Schema.Types.ObjectId,
})

export default model('meetings', meetingSchema);