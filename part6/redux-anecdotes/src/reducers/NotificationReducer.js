export const DisplayMessage = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'DISPLAY',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                notification: null
            })
        }, time * 1000)
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