const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/Blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialPosts.map(note => new Blog(note))
    const promiseArray = blogObjects.map(post => post.save())
    await Promise.all(promiseArray)
})

describe('where are initially some posts', () => {
    test('posts are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all posts are returned', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialPosts.length)
    })
})

describe('checks that each blog post has the property id', () => 
    test('succeeds in retrieving id property of each blog post', async () => {
        const posts = await helper.postsInDb()
        posts.forEach(post => expect(post.id).toBeDefined())
    })
)

describe('addition of a new post', () => {
    test('succeeds with valid data', async () => {
        const newPost = {
            title: "Narnia",
            author: "C S Lewis",
            url: "https://narnia.com",
            likes: 100
        }

        await api.post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const posts = await helper.postsInDb()
        expect(posts).toHaveLength(helper.initialPosts.length + 1)
        const contents = posts.map(post => post.title)
        expect(contents).toContain('Narnia')
    })

    test('fails to create post with status code 400', async () => {
        const newPost = new Blog({
            author: 'C S Lewis',
            likes: 100
        })

        await api.post('/api/blogs')
            .send(newPost)
            .expect(400)

        const posts = await helper.postsInDb()
        expect(posts).toHaveLength(helper.initialPosts.length)
    })

    test('checks if default likes is 0 if not provided', async () => {
        const newPost = {
            title: "Harry Potter",
            author: "J K Rowling",
            url: "https://harry_potter.com"
        }

        await api.post('/api/blogs')
            .send(newPost)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const posts = await helper.postsInDb()
        const addedPost = posts.find(post => post.title === newPost.title)
        expect(addedPost.likes).toBe(0)
    })
})

describe('deletion of a post', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const postsAtStart = await helper.postsInDb()
        const postToDelete = postsAtStart[0]

        await api
            .delete(`/api/blogs/${postToDelete.id}`)
            .expect(204)

        const postsAtEnd = await helper.postsInDb()

        expect(postsAtEnd).toHaveLength(
            helper.initialPosts.length - 1
        )

        const contents = postsAtEnd.map(r => r.title)

        expect(contents).not.toContain(postToDelete.title)
    })
})

describe('update of post', () => {
    test('succeeds updating post with status code of 200 if id is valid', async () => {
        const postsAtStart = await helper.postsInDb()
        const postToUpdate = postsAtStart[0]
        const newLikes = Math.floor(Math.random() * 100)

        const newPost = { 
            ...postToUpdate,
            likes: newLikes}

        await api.put(`/api/blogs/${postToUpdate.id}`)
            .send(newPost)
            .expect(200)

        const postsAtEnd = await helper.postsInDb()
        const postUpdated = postsAtEnd[0]

        expect(postUpdated.likes).toBe(newLikes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})