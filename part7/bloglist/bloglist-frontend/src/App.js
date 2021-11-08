import React, { useEffect, useRef } from 'react'
import postService from './services/postService'
import Notification from './components/Notification'
import AddPost from './components/AddPost'
import LoginForm from './components/LoginForm'
import Users from './components/Users'
import DisplayUser from './components/DisplayUser'
import Posts from './components/Posts'
import DisplayPost from './components/DisplayPost'
import Toggleable from './components/Toggleable'
import NavBar from './components/Navbar'
import { showNotification } from './reducers/notificationReducer'
import { addPost, initPosts } from './reducers/postReducer'
import { getAllUsers } from './reducers/allUsersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

const App = () => {

    const dispatch = useDispatch()
    const notification = useSelector(state => state.notification)
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers)
    const blogFormRef = useRef()

    const createPost = async (newPost) => {
        dispatch(addPost(newPost))
        dispatch(showNotification(`a new blog ${newPost.title} by ${newPost.author} added`, 'success'))
    }

    const handleLogOut = () => {
        window.localStorage.clear()
        window.location.reload()
    }

    const newLogin = () => {
        return (
            <Toggleable buttonLabel='log in'>
                <LoginForm />
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

    const blogMatch = useRouteMatch('/blogs/:id')
    const post = blogMatch
        ? posts.find(p => p.id === blogMatch.params.id)
        : null

    const userMatch = useRouteMatch('/users/:id')
    const selectedUser = userMatch
        ? users.find(u => u.id === userMatch.params.id)
        : null

    useEffect(() =>
        dispatch(initPosts()), [dispatch])


    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            postService.setToken(user.token)
        }
    }, [dispatch])

    useEffect(() => dispatch(getAllUsers()), [dispatch, posts])

    return (
        <div className='container'>
            <Notification message={notification} />
            {
                user === null ?
                    <>
                        {newLogin()}
                    </> :
                    <>
                        <NavBar name={user.name} handleLogOut={handleLogOut} />
                        <Switch>
                            <Route path='/blogs/:id'>
                                <DisplayPost post={post} loggedUser={user} />
                            </Route>
                            <Route path='/blogs'>
                                <Posts posts={posts} />
                                {newBlog()}
                            </Route>
                            <Route path='/users/:id'>
                                <DisplayUser user={selectedUser} />
                            </Route>
                            <Route path='/users'>
                                <Users users={users} />
                            </Route>
                        </Switch>
                    </>
            }
        </div>
    )
}

export default App
