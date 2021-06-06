import React, { useState } from 'react';
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personToBeAdded = { name: newName, number: newNumber }
    if (persons.filter(person => person.name === newName).length !== 0) { alert(`${newName} has already been added`) }
    else setPersons(persons.concat(personToBeAdded))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearch(event.target.value)
  const personsToShow = persons.filter(person => person.name.toLowerCase().match(newSearch))
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleSearchChange={handleSearchChange} personsToShow={personsToShow} />
      <h2>add a new</h2>
      <PersonForm newName={newName} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App;
