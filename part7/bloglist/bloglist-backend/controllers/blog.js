const blogRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
    const posts = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(posts)
  })
  
blogRouter.post('/', userExtractor, async (request, response) => {
  const blog = request.body
  const user = request.user
  const newPost = new Blog({
    ...blog,
    likes: blog.likes === undefined ? 0 : blog.likes,
    user: user._id
  })

  const savedPost = await newPost.save()
  user.blogs = user.blogs.concat(newPost._id)
  await user.save()
  response.json(savedPost)
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, body, { runValidators: true, new: true, context: 'query' })
  response.json(updatedPost.toJSON())
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
