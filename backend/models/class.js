import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const classSchema = new Schema({
  name: {type: String, required: true},
  classCode: {type: String, required: true},
  teacher: {type: Schema.Types.ObjectId, ref: 'User'},
  teacherName: {type: String, required: true},
  posts:  [{type: Schema.Types.ObjectId, ref: 'Post'}],
  students:  [{type: Schema.Types.ObjectId, ref: 'User'}],
});

const Class = model('Class', classSchema);
export default Class;