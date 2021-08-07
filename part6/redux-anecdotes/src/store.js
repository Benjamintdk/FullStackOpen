import { createStore, combineReducers } from 'redux'
import AnecdoteReducer from './reducers/AnecdoteReducer'
import NotificationReducer from './reducers/NotificationReducer'
import FilterReducer from './reducers/FilterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    anecdotes: AnecdoteReducer,
    notification: NotificationReducer,
    filter: FilterReducer
})

const store = createStore(reducer, composeWithDevTools())

export default store