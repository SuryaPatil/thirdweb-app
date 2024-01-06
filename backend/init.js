import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
// Import your Mongoose models and other necessary configurations
import User from './models/user.js'
import Class from './models/class.js'
import Post from './models/posts.js'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/edblock', {});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
    console.log('Connected to database');
  });
  
async function createClass(name, classCode, teacher, posts, students){
  const classDetail = {
    name: name,
    classCode: classCode,
    teacher: teacher,
    posts: posts,
    students, students
  }
  let clas = new Class(classDetail);
  return clas.save();
}
async function createPost(title, body, email, postBy){
  const date = new Date();
  const postDetail = {
    title: title,
    body: body,
    postBy: postBy,
    email: email
  }
  let post = new Post(postDetail);
  return post.save();
}
async function createUser(username, email, isTeacher){
  const res = await User.find({email: email}).exec()
  if(res[0]){
    console.log("User already exists");
    console.log(res)
    return; 
  }
  const date = new Date();
  const hashedPassword = await bcrypt.hash('a', 10);
  const userDetail = {
    username: username,
    password:hashedPassword,
    email: email,
    isTeacher: isTeacher
  }
  let user = new User(userDetail);
  return user.save();
}

const populate = async () => {
    console.log('populate')

    const walter = await createUser("Walter White", "walter.white@stonybrook.edu", true)
    const bruce = await createUser("Bruce Banner", "bruce.banner@stonybrook.edu", true)
    
    const p1 = await createP1(); 

    const c1 = await createC1();
    if(db){
        db.close();
        console.log("Closed db")
    } 
    console.log('done');
}

const createP1 = async () => {
  const title = 'Welcome to the Class!' 
  const body = 'We are excited to have you on board.'
  const postBy = "Walter White"
  const email = "walter.white@stonybrook.edu"
  const res = await createPost(title, body, email, postBy)
  return res
}

const createC1 = async () => {

}

populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db){db.close(); console.log("db closed")} ;
});