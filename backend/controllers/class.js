const uri = "mongodb+srv://ehalim:hackathon@edblock.xvvenkb.mongodb.net/edblock?retryWrites=true&w=majority";
import mongoose from 'mongoose'
import Class from '../models/class.js'
import User from '../models/user.js'

mongoose.connect(uri)

export async function getClassInfo(req) {
  /**
     * Required format:
     * - req.classTitle
     */
  if (req.classTitle === null) {
    return {
      status: false,
      message: "Invalid request, missing classtitle"
    }
  }
  const currClass = await Class.findOne({title: req.classTitle})
  if (currClass === null) {
    return {
      status: false,
      message: "Class doesn't exist!"
    }
  } 

  return {
    status: true,
    docs: currClass
  }
}

export async function createClass(req) {
  /**
   * Format:
   * - req.email
   * - req.classTitle
   * - req.classDescription
   * - req.classCode
   */

  const user = await User.findOne({email: req.email})
  if (user === null) {
    return {
      status: false,
      message: "User not found"
    }
  }

  if (user.role !== "1") {
    return {
      status: false,
      message: "Only teachers can create classes."
    }
  }

  if (req.classTitle === '' || req.classDescription === '') {
    return {
      status: false,
      message: "Title and Description cannot be empty!"
    }
  }

  const classExists = await Class.exists({title: req.classTitle})
  if (classExists !== null) {
    return {
      status: false,
      message: "Class with same name already exists!"
    }
  }

  const newClass = await Class.create({
    title: req.classTitle,
    description: req.classDescription,
    professor: user.firstName + " " + user.lastName,
    classCode: req.classCode,
    posts: []
  })

  user.classes.push(newClass.title)
  await user.save()
  return {
    status: true,
    message: "Class has been created successfully",
    docs: newClass
  }
}

export async function getClassStudents(req) {
  /**
   * Format:
   * - req.classTitle
   */

  const currClass = await Class.findOne({title: req.classTitle})
  if (currClass === null) {
    return {
      status: false,
      message: "Class doesn't exist."
    }
  }

  const students = await User.find({$and: [
    {classTitle: req.classTitle},
    {role: '0'}
  ]})
  return {
    status: true,
    docs: students
  }
}