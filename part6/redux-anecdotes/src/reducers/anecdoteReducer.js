import anecdoteService from "../services/anecdotes"

export const incrementVote = (object) => {
  return async dispatch => {
    const updatedAnecdote = { 
      ...object, 
      votes: object.votes + 1 }
    const response = await anecdoteService.updateVotes(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: response
    })
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const response = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: response
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const content = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: content
    })
  }
}

const AnecdoteReducer = (state = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const id = action.data.id
    const votedAnecdote = action.data
    return state.map(a => a.id !== id ? a : votedAnecdote)
  }
  case 'CREATE_ANECDOTE': 
    return [ ...state, action.data ]

  case 'INIT_ANECDOTES':
    return action.data
  default:
    return state
  }
}

export default AnecdoteReducer