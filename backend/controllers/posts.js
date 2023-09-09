const uri = "mongodb+srv://ehalim:hackathon@edblock.xvvenkb.mongodb.net/edblock?retryWrites=true&w=majority";
import mongoose from 'mongoose'
import Class from '../models/class.js'
import Post from '../models/posts.js';

mongoose.connect(uri)

export async function createPost(req) {
  /**
   * Format:
   * - req.classTitle
   * - req.postTitle
   * - req.postBody
   */

  const currClassId = await Class.exists({title: req.classTitle})
  if (currClassId === null) {
    return {
      status: false,
      message: "No class found"
    }
  }

  const postExists = await Post.find({$and: [
    {classTitle: req.classTitle}, {title: req.postTitle}
  ]})
  if (postExists.length > 0) {
    return {
      status: false,
      message: "Post with this title has already been posted in this class. Please choose another post title."
    }
  }

  const newPost = await Post.create({
    title: req.postTitle,
    classTitle: req.classTitle,
    body: req.postBody,
    datePosted: Date().toString()
  })

  const currClass = await Class.findById(currClassId)
  currClass.posts.push(JSON.stringify(newPost))
  await currClass.save()

  return {
    status: true,
    docs: newPost
  }
}