//const uri = "mongodb+srv://ehalim:hackathon@edblock.xvvenkb.mongodb.net/edblock?retryWrites=true&w=majority";
import mongoose from 'mongoose'
import User from './models/user.js'
import Class from './models/class.js'
import Posts from './models/posts.js'
import bcrypt from 'bcrypt'

import express from 'express' 
const app = express()
const port = 8000;
import cors from 'cors' 
app.use(cors({
  origin: "http://localhost:3000",
  methods: ['PUT', 'GET', 'DELETE', 'POST', 'PATCH'],
  credentials: true
}));
app.use(express.json())
 
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/edblock', {});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', function() {
  console.log('Connected to database');
});

// Handle POST request to createUser endpoint
app.post('/createUser', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, password, isTeacher, classes } = req.body;
    console.log("isTeacher: ")
    console.log(isTeacher)

    const emailExists = await User.find({email: email})
    if (emailExists.length > 0) {
      return {
        status: false,
        message: "Email already exists. Please choose a different email."
      }
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      isTeacher: isTeacher,
      classes:[]
    })
    console.log(newUser)

    // Send a meaningful response back to the client
    res.status(201).json({ message: "User has been created",});
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Handle POST request to createUser endpoint
app.post('/authUser', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log('User not found.');
      return res.send("User not found")
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Invalid password.');
      return res.send('Invalid password');
    }

    console.log('Login successful.');
    // Here you might set up a session or generate a token for the user
    res.send(user)
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  
})

app.post('/createClass', async (req, res) => {
  console.log(req.body)

  try{
    const {classCode, className, userId} = req.body
    const classExists = await Class.find({classCode: classCode})
    if (classExists.length > 0) {
      return {
        status: false,
        message: "Classcode already exists. Please choose a different classcode."
      }
    }
    const user = await User.findById(userId)
    if(!user){
      return {
        status: false,
        message: "User not found."
      }
    }
    const newClass = await Class.create({
      name: className,
      classCode: classCode,
      teacher: user,
      teacherName: user.name, 
      posts:[],
      students: []
    })
    user.classes.push(newClass)
    await user.save()
    console.log(newClass)
    // Send a meaningful response back to the client
    res.status(201).json({ message: "Class has been created",});

  } catch(e){
    console.log(e)
  }
})

app.get('/listClasses/:userId', async (req, res) => {
  //console.log(req.params)
  const userId = req.params.userId
  const user = await User.findById(userId);
  console.log("******\n")

  try{
    if (!user) {
      console.log('User not found.');
      return res.send("User not found")
    }
    const classIds = user.classes 

    // Map each class ID to a promise returned by Class.findById
    const promises = classIds.map(id => Class.findById(id));

    // Use Promise.all to wait for all promises to resolve
    const classes = await Promise.all(promises);
    const filteredArray = classes.filter(element => element !== null);

    console.log(filteredArray)
    res.send(filteredArray)
  } catch(e){
    console.log(e)
    res.send(e)
  }
    
})

app.get('/getUser:userId', async (req, res) => {
  const userId = req.params.userId
  try{
    const user = await User.findById(userId)
    if(!user){
      return {
        status: false,
        message: "User not found."
      }
    }
    res.send(user)
  }
  catch(e){
    console.log(e)
    res.send(e)
  }
})

app.get('/getTeacherByClass:classId', async (req, res) => {
  const teacherId = req.params.teacherId
  try{
    const teacher = await User.findById(teacherId)
    if(!teacher){
      return {
        status: false,
        message: "teacher not found."
      }
    }
    res.send(teacher.name)
  } catch(e){
    console.log(e)
  }
})

app.put('/enroll', async (req, res) => {
  const {classCode, email} = req.body
  console.log("@@@@@\n")
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log('User not found.');
      return {
        status: 101,
        message: "User not found"
      }
    }
    const clas = await Class.findOne({ classCode: classCode });
    if (!clas) {
      console.log('Class not found.');
      return res.send(  {
        status: 102,
        message: "Class not found"
      })

    }
    for(const student of clas.students){
      if(student.toString() === user._id.toString()){
        console.log("Cannot enroll in a class you are already enrolled in")
        res.send(  {
          status: 103,
          message: "Cannot enroll in a class you are already enrolled in"
        })
      }
    }
    clas.students.push(user)
    await clas.save()

    user.classes.push(clas)
    await user.save()

    console.log('Enrollment successful.');
    // Here you might set up a session or generate a token for the user
    res.send( {
      status: 200,
      message: "Enrollment successful"
    })
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

})

app.listen(port, () => {
  console.log(`listening on port ${port}...`) 
}) 