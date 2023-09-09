const uri = "mongodb+srv://ehalim:hackathon@edblock.xvvenkb.mongodb.net/edblock?retryWrites=true&w=majority";
import mongoose from 'mongoose'
import User from './models/user.js'
import Class from './models/class.js'
import Posts from './models/posts.js'

// "APIs"
import {getClassInfo, createClass, getClassStudents} from './controllers/class.js'
import {createPost} from './controllers/posts.js'
import {createUser, studentAddClass, listClasses, authUser} from './controllers/user.js'

mongoose.connect(uri)

// Create User
const createUserReq = {
  firstName: "John",
  lastName: "Doe",
  email: "RandomOtter",
  password: "password",
  role: "1"
}

const createUserRes = await createUser(createUserReq)
console.log("Created User")
console.log(createUserRes)

// User Login
const userLoginReq = {
  email: "RandomOtter",
  password: "password"
}

const userLoginRes = await authUser(userLoginReq)
console.log("User Login")
console.log(userLoginRes)

// create class
const createClassReq = {
  email: "RandomOtter",
  classTitle: "Electricity and Magnetism",
  classDescription: "We're gonna learn physics!",
  classCode: "PHYS101"
}

const createClassRes = await createClass(createClassReq)
console.log("Created Class")
console.log(createClassRes)

// Create post
const createPostReq = {
  classTitle: "Electricity and Magnetism",
  postTitle: "Welcome!",
  postBody: "First class is Monday 3.30pm"
}

const createPostRes = await createPost(createPostReq)
console.log("Created Post")
console.log(createPostRes)

// List Classes
const listClassesReq = {
  email: "RandomOtter"
}
const listClassesRes = await listClasses(listClassesReq)
console.log("List Classes")
console.log(listClassesRes)

// Get Class Info
const getClassInfoReq = {
  classTitle: "Electricity and Magnetism"
}
const getClassInfoRes = await getClassInfo(getClassInfoReq)
console.log("Get Class Info")
console.log(getClassInfoRes)

// Get Class Students
const getClassStudentsReq = {
  classTitle: "Electricity and Magnetism"
}
const getClassStudentsRes = await getClassStudents(getClassInfoReq)
console.log("Get Class Students")
console.log(getClassStudentsRes)

// Create New Student
const createNewStudentReq = {
  firstName: "Jane",
  lastName: "Doe",
  email: "RandomMule",
  password: "password",
  role: "0"
}
const createNewStudentRes = await createUser(createNewStudentReq)
console.log("Create New Students")
console.log(createNewStudentRes)

// Add Class Student
const studentAddClassReq = {
  classCode: "PHYS101",
  email: 'RandomMule'
}

const studentAddClassRes = await studentAddClass(studentAddClassReq)
console.log("Student Add Class")
console.log(studentAddClassRes)