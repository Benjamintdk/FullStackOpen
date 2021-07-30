import React, { useState } from 'react'

const Input = ({ placeholder, value, handleChange, id }) => {
    return (
        <div>
            {placeholder} <input id={id} value={value} onChange={handleChange}></input>
        </div>
    )
}

const AddPost = ({ createPost }) => {
    const [ newTitle, setNewTitle ] = useState('')
    const [ newAuthor, setNewAuthor ] = useState('')
    const [ newUrl, setNewUrl ] = useState('')

    const handleTitleChange = (event) => setNewTitle(event.target.value)
    const handleAuthorChange = (event) => setNewAuthor(event.target.value)
    const handleUrlChange = (event) => setNewUrl(event.target.value)

    const addPost = event => {
        event.preventDefault()
        const newItem = {
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: Math.floor(Math.random() * 100)
        }

        createPost(newItem)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>Create New</h2>
            <form onSubmit={addPost}>
                <Input placeholder={'Title:'} value={newTitle} handleChange={handleTitleChange} id='title' />
                <Input placeholder={'Author:'} value={newAuthor} handleChange={handleAuthorChange} id='author' />
                <Input placeholder={'Url:'} value={newUrl} handleChange={handleUrlChange} id='url' />
                <button type='submit'>Add Post</button>
            </form>
        </div>
    )
}

export default AddPost