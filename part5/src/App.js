import React, { useState, useEffect } from 'react';
import postService from './services/postService';
import loginService from './services/LoginService';
import Notification from './components/Notification'
import DisplayPosts from './components/DisplayPost';
import AddPost from './components/AddPost';
import LoginForm from './components/LoginForm';
import DisplayUser from './components/DisplayUser';

const App = () => {
  const [ posts, setPosts ] = useState([])
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')
  const [ notification, setNotification ] = useState('')
  const [ username, setUserName ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)

  const notif = (msg, type) => {
    setNotification({  msg, type  })
    setTimeout(() => setNotification(''), 3000)
  }

  const addPost = event => {
      event.preventDefault()
      const newItem = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        likes: Math.floor(Math.random() * 100) 
      }
      postService.create(newItem)
                 .then(response => {
                   setPosts(posts.concat(response))
                   setNewTitle('')
                   setNewAuthor('')
                   setNewUrl('')
                   notif(`a new blog ${response.title} by ${response.author} added`, 'success')
                 })
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      postService.setToken(user.token)
      setUser(user)
      setUserName('')
      setPassword('')
    } catch (exception) {
      notif('Wrong Credentials', 'error')
    }
  }

  const handleLogOut = (event) => {
    window.localStorage.clear()
  }

  useEffect(() => 
            postService
            .getAll()
            .then(data => setPosts(data)), [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      postService.setToken(user.token)
    }
  }, [])


  return (
    <div>
      <Notification message={notification} />
      {
        user === null ?
        <><LoginForm handleLogin={handleLogin} username={username} setUserName={setUserName} password={password} setPassword={setPassword} /></> :
        <>
          <DisplayUser name={user.name} handleLogOut={handleLogOut} />
          <AddPost newTitle={newTitle} 
          newAuthor={newAuthor}
          newUrl={newUrl} 
          handleTitleChange={handleTitleChange}
          handleAuthorChange={handleAuthorChange}
          handleUrlChange={handleUrlChange}
          addPost={addPost} 
          />
          <DisplayPosts posts={posts} />
        </>
      }
    </div>
  )
}

export default App;
