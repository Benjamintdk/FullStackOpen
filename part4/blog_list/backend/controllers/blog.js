const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response) => {
    const posts = await Blog.find({})
    response.json(posts)
  })
  
  blogRouter.post('/', async (request, response) => {
    const blog = request.body
    const newPost = new Blog ({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes === undefined ? 0 : blog.likes
    })
    const post = await newPost.save()
    response.json(post)
  })

  blogRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newPost = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, newPost, { runValidators: true, new: true, context: 'query' })
    response.json(updatedPost.toJSON())
  })

  blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

  module.exports = blogRouter
