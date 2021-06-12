import React from 'react'

const Display = ({ country }) => {
    return (
        <div>
          <h1>{country.name}</h1>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <br />
          <h2>languages</h2>
          <ul>
              {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
          </ul>
          <img alt="country flag" src={country.flag} width="300" height="180" />
        </div>
      )
}

export default Display