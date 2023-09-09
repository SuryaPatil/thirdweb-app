const uri = "mongodb+srv://ehalim:hackathon@edblock.xvvenkb.mongodb.net/edblock?retryWrites=true&w=majority";
import mongoose from 'mongoose'
import User from '../models/user.js'
import Class from '../models/class.js'

mongoose.connect(uri)

export const createUser = async (req) => {
  /**
   * Required format:
   * - firstName
   * - lastName
   * - email
   * - password
   * - role (0 for student, 1 for teacher)
   */
  const emailExists = await User.find({email: req.email})
  if (emailExists.length > 0) {
    return {
      status: false,
      message: "Email already exists. Please choose a different email."
    }
  }
  const newUser = await User.create({
    firstName: req.firstName,
    lastName: req.lastName,
    email: req.email,
    password: req.password,
    role: req.role,
    classes:[]
  })
  
  return {
    status: true,
    message: "User has been created",
    docs: newUser
  }
}

export async function studentAddClass(req) {
  /**
   * format:
   * - req.classCode
   * - req.email
   */

  if (req.classCode === null || req.user === null) {
    return {
      status: false,
      message: "Request fields are empty."
    }
  }

  const addedClass = await Class.findOne({classCode: req.classCode})
  if (addedClass === null) {
    return {
      status: false,
      message: "Class code does not match any existing class."
    }
  }

  const user = await User.findOne({email: req.email})

  if (user.classes.includes(addedClass.title)) {
    return {
      status: true,
      message: "Student is aleady in " + addedClass.title
    }
  }
  user.classes.push(addedClass.title)

  await user.save()

  return {
    status: true,
    message: "added class",
    docs: user
  }
}

// getter method
export async function listClasses(req) {
  /**
   * Format:
   * req.email
   */
  const user = await User.findOne({email: req.email})
  if (user === null) {
    return {
      status: false,
      message: "User not found"
    }
  }
  const classSet = []
  for (let x of user.classes) {
    const cls = await Class.findOne({ title: x })
    if (cls === null) {
      return {
        status: false,
        message: "User has nonexistant class."
      }
    }
    classSet.push(JSON.stringify({
      title: cls.title, 
      description: cls.description,
      professor: cls.professor
    }))
  }
  return {
    status: true,
    docs: classSet
  }
}

 export async function authUser(req) {
  /**
   * Required format:
   * - email
   * - password 
   */

  if (req.password === null || req.password === null) {
    return {
      status: false,
      message: "missing field."
    }
  }

  const user = await User.findOne({ email: req.email})
  if (req.password === user.password) {
    return {
      status: true,
      message: "successfully logged in!"
    }
  } else {
    return {
      status: false,
      message: "Incorrect password for user " + user.email + "."
    }
  }
 }

