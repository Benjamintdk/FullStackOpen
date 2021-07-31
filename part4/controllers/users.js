const bcrypt = require('bcrypt')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

userRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        return response.status(400).json({ 
            error: 'password length must be at least 3 characters long' 
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = userRouter