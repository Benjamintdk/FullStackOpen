import React, { useState } from 'react'
import loginService from '../services/LoginService'
import PropTypes from 'prop-types'

const LoginForm = ({ processLogin, notif }) => {
    const [ username, setUserName ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            setUserName('')
            setPassword('')
            processLogin(user)
        } catch (exception) {
            notif('Wrong Credentials', 'error')
        }
    }

    return (
        <form onSubmit={handleLogin} >
            <div>
        username <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({ target }) => setUserName(target.value)}/>
            </div>
            <div>
        password <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({ target }) => setPassword(target.value)}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    processLogin: PropTypes.func.isRequired,
    notif: PropTypes.func.isRequired,
}

export default LoginForm