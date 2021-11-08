let timeoutID = 0

const notificationReducer = (state = null, action) => {
    switch (action.type) {
    case 'DISPLAY':
        return action.data
    case 'HIDE':
        return null
    default:
        return state

    }
}

export const showNotification = (msg, status) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'HIDE'
            })
        }, 3000)
        dispatch({
            type: 'DISPLAY',
            data: {
                msg,
                status
            }
        })
    }
}

export default notificationReducer