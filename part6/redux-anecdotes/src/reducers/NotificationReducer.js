export const DisplayMessage = notification => {
    return {
        type: 'DISPLAY',
        notification
    }
}

export const HideMessage = () => {
    return {
        type: 'HIDE',
        notification: null
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