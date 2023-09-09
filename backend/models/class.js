import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const classSchema = new Schema({
  title: String,
  description: String,
  classCode: String,
  professor: String,
  posts: [String]
});

const Class = model('Class', classSchema);
export default Class;