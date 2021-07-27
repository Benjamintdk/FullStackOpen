import React from 'react'

const DisplayUser = ({ name, handleLogOut }) => {
    return (
        <div>
            <h3>{name} logged in</h3>
            <button onClick={handleLogOut}>logout</button>
        </div>
    )
}

export default DisplayUser