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
  console.log(req.body)
  const { email, password } = req.body;
  console.log(req.body)
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
app.listen(port, () => {
  console.log(`listening on port ${port}...`) 
}) 