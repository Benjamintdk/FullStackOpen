/*eslint-disable no-unused-vars*/
require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('data', (request, response) => {
    if (request.method === 'POST') return JSON.stringify(request.body)
})

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens['data'](req, res)
    ].join(' ')
}))

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error:'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).send({ error:error.message})
    }
    next(error)
}

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.get('/api/persons/', (request, response, next) => {
    Person.find({})
        .then(persons => response.json(persons))
        .catch(error => next(error))
})

app.get('/api/persons/:id/', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) response.json(person)
            else response.status(404).end()
        })
        .catch(error => next(error))
})

app.get('/info/', (request, response) => {
    Person.countDocuments({}, (err, count) => {
        const info = `<p>Phonebook has info for ${count} people</p>
                      <p>${new Date()}</p> `
        response.send(info)
    })
})

app.delete('/api/persons/:id/', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
    const body = request.body
    const person = new Person ({
        'name' : body.name,
        'number' : body.number
    })
    person.save()
        .then(savedPerson => savedPerson.toJSON())
        .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
        .catch(error => next(error))
})

app.put('/api/persons/:id/', (request, response, next) => {
    const body = request.body
    const person = {
        'name' : body.name,
        'number' : body.number
    }
    Person.findByIdAndUpdate(request.params.id, person, { runValidators: true, new: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)