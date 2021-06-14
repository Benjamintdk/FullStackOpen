import React, { useState } from 'react'
import Display from './Display'
import Weather from './Weather'

const Filter = ({ filteredCountries }) => {
    const [ countryToShow, setCountryToShow ] = useState([])
    if (filteredCountries.length > 10) return (<div>Too many matches, specify another filter</div>)
    else if (filteredCountries.length === 1) {
        return (
          <div>
              <Display country={filteredCountries[0]} />
              <Weather country={filteredCountries[0]} />
          </div>
        )
      }
    else {
        return (
            <div>
                <ul>
                    {filteredCountries.map(country => <div key={country.name}>
                        {country.name}<button onClick={() => setCountryToShow([country])}>show</button>
                        </div>)}
                </ul>
                {countryToShow.map(country => <Display key={country.alpha3Code} country={country} />)}
            </div>
        )
    }
}

export default Filter