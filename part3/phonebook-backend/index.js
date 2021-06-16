const { response } = require('express');
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('data', (request, response) => {
    if (request.method === 'POST') return JSON.stringify(request.body);
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
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


const generateID = () => Math.round(Math.random() * 100) + 17 

let people = [
                { 
                    "name": "Arto Hellas", 
                    "number": "040-123456",
                    "id": 1
                },
                { 
                    "name": "Ada Lovelace", 
                    "number": "39-44-5323523",
                    "id": 2
                },
                { 
                    "name": "Dan Abramov", 
                    "number": "12-43-234345",
                    "id": 3
                },
                { 
                    "name": "Mary Poppendieck", 
                    "number": "39-23-6423122",
                    "id": 4
                }
            ]

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/persons/', (request, response) => {
    response.json(people)
})

app.get('/api/persons/:id/', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (person) response.json(person)
    else response.status(404).end()
})

app.get('/info/', (request, response) => {
    const info = `<p>Phonebook has info for ${people.length} people</p>
                  <p>${new Date()}</p> `
    response.send(info)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = people.find(person => person.id === id)
    if (!person) return response.status(404).json({"error":"person not found and cannot be deleted"})
    people = people.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons/', (request, response) => {
    const body = request.body
    if (!body.name) return response.status(404).json({"error":"no name found"})
    else if (!body.number) return response.status(404).json({"error":"no number found"})
    else if (people.find(person => person.name === body.name)) return response.status(404).json({"error":"name provided is not unique"})
    const person = {
        "name" : body.name,
        "number" : body.number,
        "id" : generateID()
    }
    people = people.concat(person)
    response.json(person)
})

app.put('/api/persons/:id/', (request, response) => {
    const body = request.body
    const id = request.params.id
    const name = body.name.toLowerCase()
    if (people.find(person => person.name.toLowerCase() === name)) {
        const person = {
            "name" : body.name,
            "number" : body.number,
            "id" : Number(id)
        }
        people = people.filter(person => person.name.toLowerCase() !== name)
        people = people.concat(person)
        response.json(person)
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
