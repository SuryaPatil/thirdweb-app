import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    createDate: {type: Date, default: new Date()},
    classes:  [{type: Schema.Types.ObjectId, ref: 'Class'}],
    isTeacher: {type: Boolean, default: false}
});
const User = model('User', userSchema);
export default User;