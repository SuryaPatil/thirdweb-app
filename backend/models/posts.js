import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    postBy: {type: String, required: true},
    datePosted: {type: Date, default: new Date()},
    email: {type: String, required: true}
});

// Export schema
const Post = model('Post', postSchema);
export default Post;