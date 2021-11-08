import React from 'react'
import loginService from '../services/loginService'
import postService from '../services/postService'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const username = event.target.username.value
            const password = event.target.password.value
            const user = await loginService.login({
                username, password
            })
            dispatch(setUser(user))
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            event.target.username.value = ''
            event.target.password.value = ''
            postService.setToken(user.token)
        } catch (exception) {
            dispatch(showNotification('Wrong Credentials', 'error'))
        }
    }

    return (
        <Form onSubmit={handleLogin} >
            <Form.Group>
                <div>
                    <Form.Label>username:</Form.Label>
                    <Form.Control
                        id='username'
                        type='text'
                        name='Username'/>
                </div>
                <div>
                    <Form.Label>password:</Form.Label>
                    <Form.Control
                        id='password'
                        type='password'
                        name='Password'/>
                </div>
                <Button id='login-button' variant="primary" type="submit">login</Button>
            </Form.Group>
        </Form>
    )
}

export default LoginForm