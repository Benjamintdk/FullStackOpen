import React from 'react'

const PersonForm = ({ newName, addName, handleNameChange, handleNumberChange }) => {
    return (
        <form onSubmit={addName}>
            <div>name: <input onChange={handleNameChange} value={newName.name}/></div>
            <div>number: <input onChange={handleNumberChange} value={newName.number} /></div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm