import React from 'react'

const LoginForm = ({ handleLogin, username, setUserName, password, setPassword }) => {
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

export default LoginForm