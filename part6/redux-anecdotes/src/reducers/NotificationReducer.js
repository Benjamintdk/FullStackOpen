let timeoutID = 0

export const DisplayMessage = (notification, time) => {
    return async dispatch => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'HIDE',
                notification: null
            })
        }, time * 1000)
        dispatch({
            type: 'DISPLAY',
            notification
        })
    }
}

const NotificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'DISPLAY': 
            return action.notification
        case 'HIDE':
            return ''
        default:
            return state
    }
}

export default NotificationReducer