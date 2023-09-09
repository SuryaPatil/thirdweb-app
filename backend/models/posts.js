import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postsSchema = new Schema({
  title: String,
  classTitle: String,
  body: String,
  datePosted: String
});

const Post = model('Posts', postsSchema);
export default Post;