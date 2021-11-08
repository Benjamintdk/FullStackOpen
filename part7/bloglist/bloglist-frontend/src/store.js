import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import postReducer from './reducers/postReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
    notification: notificationReducer,
    posts: postReducer,
    user: userReducer,
    allUsers: allUsersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store