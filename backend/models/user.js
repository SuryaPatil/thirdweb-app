import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: String,
  classes:[String],
});
module.exports = mongoose.models?.User || mongoose.model("User", userSchema);