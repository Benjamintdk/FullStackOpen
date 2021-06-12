import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ filteredPersons, setFilteredPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState(' ')

  useEffect(() => {
            axios.get("http://localhost:3001/persons")
                 .then(response => setPersons(response.data)) }
                 , [])

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
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    if (event.target.value === '') setFilteredPersons([])
    else setFilteredPersons(persons.filter(person => person.name.toLowerCase().match(newSearch.toLowerCase())))
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} handleSearchChange={handleSearchChange} filteredPersons={filteredPersons} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App;
