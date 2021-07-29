import React, { useState, useEffect, useRef } from 'react'
import postService from './services/postService'
import Notification from './components/Notification'
import DisplayPosts from './components/DisplayPost'
import AddPost from './components/AddPost'
import LoginForm from './components/LoginForm'
import DisplayUser from './components/DisplayUser'
import Toggleable from './components/Toggleable'

const App = () => {
    const [ posts, setPosts ] = useState([])
    const [ notification, setNotification ] = useState('')
    const [ user, setUser ] = useState(null)

    const blogFormRef = useRef()

    const notif = (msg, type) => {
        setNotification({  msg, type  })
        setTimeout(() => setNotification(''), 3000)
    }

    const createPost = async (newPost) => {
        const response = await postService.create(newPost)
        setPosts(posts.concat(response))
        notif(`a new blog ${response.title} by ${response.author} added`, 'success')
    }

    const updateLikes = async (newPost) => {
        const postToUpdate = posts.find(post => post.title === newPost.title)
        const postWithUser = { ...newPost, user:user.id }
        const response = await postService.update(postToUpdate.id, postWithUser)
        setPosts(posts.map(post => post.title.toLowerCase() !== response.title.toLowerCase() ? post : response))
        notif(`a blog ${response.title} has been updated`, 'success')
    }

    const deletePost = async (id) => {
        await postService.remove(id)
        setPosts(posts.filter(post => post.id !== id))
        notif('blog has been deleted', 'success')
    }

    const processLogin = user => {
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        postService.setToken(user.token)
        setUser(user)
    }

    const handleLogOut = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    const newLogin = () => {
        return (
            <Toggleable buttonLabel='log in'>
                <LoginForm
                    processLogin={processLogin}
                    notif={notif}
                />
            </Toggleable>
        )
    }

    const newBlog = () => {
        return (
            <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
                <AddPost createPost={createPost} />
            </Toggleable>
        )
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
                    <>
                        {newLogin()}
                    </> :
                    <>
                        <DisplayUser name={user.name} handleLogOut={handleLogOut} />
                        {newBlog()}
                        <DisplayPosts posts={posts} updateLikes={updateLikes} deletePost={deletePost} />
                    </>
            }
        </div>
    )
}

export default App
