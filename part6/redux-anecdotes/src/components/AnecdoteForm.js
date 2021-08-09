import React from 'react'
import { addNewAnecdote } from '../reducers/AnecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const createAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addNewAnecdote(content)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(null, { addNewAnecdote })(AnecdoteForm)