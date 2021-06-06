import React from 'react'

const Person = ({ person }) => <div>{person.name} {person.number}</div>

const Persons = ({ persons }) => {
    return (
        <div>
            <ul>
                {persons.map(person => <Person key={person.name} person={person} />)}
            </ul>
        </div>
    )
}
export default Persons