import React from 'react'

const Input = ({ placeholder, value, handleChange }) => {
    return (
        <div>
            {placeholder} <input value={value} onChange={handleChange}></input>
        </div>
    )
}

const AddPost = ({ newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange, addPost }) => {
    return (
        <form onSubmit={addPost}>
            <Input placeholder={'Title:'} value={newTitle} handleChange={handleTitleChange} />
            <Input placeholder={'Author:'} value={newAuthor} handleChange={handleAuthorChange} />
            <Input placeholder={'Url:'} value={newUrl} handleChange={handleUrlChange} />
            <button type='submit'>Add Post</button>
        </form>
    )
}

export default AddPost