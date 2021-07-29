import React from 'react'

const DisplayUser = ({ name, handleLogOut }) => {
    return (
        <div>
            <h3>
                {name} logged in
                <button onClick={handleLogOut}>logout</button>
            </h3>
        </div>
    )
}

export default DisplayUser