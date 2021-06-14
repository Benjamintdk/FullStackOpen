import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'

const App = (props) => {
  const [ countries, setCountries ] = useState([])
  const [ filteredCountries, setFilteredCountries ] = useState([])
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() =>
            axios.get("https://restcountries.eu/rest/v2/all")
                 .then(response => setCountries(response.data)), [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
    if (event.target.value === '') setFilteredCountries([])
    else setFilteredCountries(countries.filter(country => country.name.toLowerCase().match(newSearch.toLowerCase())))
  }

  return (
    <div>
      <div>find countries <input value={newSearch} onChange={handleSearchChange} /></div>
      <Filter filteredCountries={filteredCountries} />
    </div>
  )
}

export default App