import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/AnecdoteReducer'
import { DisplayMessage } from '../reducers/NotificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotesToShow = useSelector(({ anecdotes, filter }) => {
        if (filter !== '') {
            return anecdotes.filter(anec => anec.content.toLowerCase().match(filter))
            .sort((a, b) => a.votes > b.votes ? -1 : 1)
        }
        return anecdotes
    })

    const vote = (anecdote) => {
        dispatch(DisplayMessage(`you voted ${anecdote.content}`, 10))
        dispatch(incrementVote(anecdote))
    }

    return (
        <div>
        {anecdotesToShow.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
        )}
        </div>
    )
}

export default AnecdoteList