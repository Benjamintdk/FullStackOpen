import React from 'react'

const Notification = ({ message }) => {
    if (message === null) return null
    return (
        <div className={message.status} >
            {message.msg}
        </div>
    )
}

export default Notification