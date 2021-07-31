const blogRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response) => {
    const posts = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(posts)
  })
  
blogRouter.post('/', userExtractor, async (request, response) => {
  const blog = request.body
  const user = request.user

  const newPost = new Blog({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes === undefined ? 0 : blog.likes,
    user: user._id
  })

  const savedPost = await newPost.save()
  user.blogs = user.blogs.concat(newPost._id)
  await user.save()
  response.json(savedPost)
})

blogRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user._id.toString()) {
    const body = request.body
    const newPost = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, { runValidators: true, new: true, context: 'query' })
    response.json(updatedPost.toJSON())
  }
  else {
    response.status(401).json({ error: "you are not authorized to update this blog post" })
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: "you are not authorized to delete this blog post" })
  }
})

module.exports = blogRouter
