const mongoose = require('mongoose')
const uniqueNameValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(result => console.log("connected to MongoDB"))
        .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true,
        minLength: 8
    }
})

personSchema.set('toJSON', {
    transform: (docuent, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

personSchema.plugin(uniqueNameValidator)

module.exports = mongoose.model('Person', personSchema)
