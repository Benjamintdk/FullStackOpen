import postService from '../services/postService'

const postReducer = (state = [], action) => {

    switch (action.type) {
    case 'INIT_POSTS':
        return action.data
    case 'ADD_POST':
        return [ ...state, action.data ]
    case 'UPDATE_POST':
        return state.map(a => a.id === action.data.id ? action.data : a)
    case 'DELETE_POST':
        return state.filter(a => a.id !== action.data.id)
    default:
        return state
    }
}

export const initPosts = () => {
    return async dispatch => {
        const posts = await postService.getAll()
        dispatch({
            type: 'INIT_POSTS',
            data: posts
        })
    }
}

export const addPost = data => {
    return async dispatch => {
        const newPost = await postService.create(data)
        dispatch({
            type: 'ADD_POST',
            data: newPost
        })
    }
}

export const updatePost = (id, data) => {
    return async dispatch => {
        const updatedPost = await postService.update(id, data)
        dispatch({
            type: 'UPDATE_POST',
            data: updatedPost
        })
    }
}

export const deletePost = id => {
    return async dispatch => {
        await postService.remove(id)
        dispatch({
            type: 'DELETE_POST',
            data: {
                id: id
            }
        })
    }
}


export default postReducer