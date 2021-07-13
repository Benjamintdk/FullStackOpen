const express = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const Blog = require('../models/Blog')
const User = require('../models/User')

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
    let headers 
    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'pass123'
        }

        await api.post('/api/users')
            .send(newUser)

        const result = await api.post('/api/login')
            .send(newUser)

        headers = {
            'Authorization': `bearer ${result.body.token}`
        }
    })

    test('fails if no token is provided', async () => {
        const newPost = {
            title: "Narnia",
            author: "C S Lewis",
            url: "https://narnia.com",
            likes: 100
        }

        await api.post('/api/blogs')
            .send(newPost)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const posts = await helper.postsInDb()
        expect(posts).toHaveLength(helper.initialPosts.length)
    })

    test('succeeds with valid data', async () => {
        const newPost = {
            title: "Narnia",
            author: "C S Lewis",
            url: "https://narnia.com",
            likes: 100
        }

        await api.post('/api/blogs')
            .set(headers)
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
            .set(headers)
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
            .set(headers)
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

describe('addition of new users', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        console.log(passwordHash)
        const user = new User({ username:'root', passwordHash })
        await user.save()
    })

    test('checks that password and username length meet requirement', async () => {
        const usersAtStart = await helper.usersInDb()
        const newUser1 = {
            username: 'No',
            name: 'Superuser',
            password: 'password123'
        }

        const newUser2 = {
            username: 'Nothing',
            name: 'Superuser',
            password: '1'
        }

        const result1 = await api.post('/api/users')
        .send(newUser1)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result1.body.error).toContain('is shorter than the minimum allowed length')

        const result2 = await api.post('/api/users')
        .send(newUser2)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result2.body.error).toContain('password length must be at least 3 characters long')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })

    test('creation fails with proper statuscode and message if username is already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'password123'
        }

        const result = await api.post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})