import React from 'react'

const Filter = ( {value, handleSearchChange, personsToShow} ) => {
    return (
        <div>
            filter shown with <input value={value} onChange={handleSearchChange} />
            <ul>
                {personsToShow.map(person => <div key={person.name}>{person.name}</div>)}
            </ul>
        </div>
    )
}


export default Filter