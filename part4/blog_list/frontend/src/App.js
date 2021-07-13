import React, { useState, useEffect } from 'react';
import postService from './services/postService';
import DisplayPosts from './components/DisplayPost';
import AddPost from './components/AddPost';

const App = () => {
  const [ posts, setPosts ] = useState([])
  const [ newTitle, setNewTitle ] = useState('')
  const [ newAuthor, setNewAuthor ] = useState('')
  const [ newUrl, setNewUrl ] = useState('')

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
                 })
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)

  useEffect(() => 
            postService
            .getAll()
            .then(data => setPosts(data)), [])


  return (
    <div>
      <AddPost newTitle={newTitle} 
               newAuthor={newAuthor}
               newUrl={newUrl} 
               handleTitleChange={handleTitleChange}
               handleAuthorChange={handleAuthorChange}
               handleUrlChange={handleUrlChange}
               addPost={addPost} 
      />
      <DisplayPosts posts={posts} />
    </div>
  )
}

export default App;
