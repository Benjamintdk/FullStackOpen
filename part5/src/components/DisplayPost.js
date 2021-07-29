import React, { useState } from 'react'

const ShowDetails = (props) => {
    const [ visible, setVisible ] = useState(false)

    const hideWhenVisible = { display : visible ? 'none' : '' }
    const showWhenVisible = { display : visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>hide</button>
                {props.children}
            </div>
        </div>
    )
}

const Post = ({ post, updateLikes, deletePost }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const increaseLikes = event => {
        event.preventDefault()
        const updatedPost = {
            ...post,
            likes: post.likes + 1
        }
        updateLikes(updatedPost)
    }

    const removePost = event => {
        event.preventDefault()
        if (window.confirm(`Remove blog ${post.title} by ${post.author}?`)) {
            deletePost(post.id)
        }
    }

    return (
        <div style={blogStyle}>
            <li>
                {post.title}
                <ShowDetails buttonLabel="view">
                    <br />{post.url}
                    <br />likes {post.likes} <button onClick={increaseLikes}>like</button>
                    <br />{post.author}
                </ShowDetails>
                <button onClick={removePost}>remove</button>
            </li>
        </div>
    )
}

const DisplayPosts = ({ posts, updateLikes, deletePost }) => {
    return (
        <ul>
            {[].concat(posts)
                .sort((a, b) => a.likes > b.likes ? -1 : 1)
                .map(post => <Post key={post.id} post={post} updateLikes={updateLikes} deletePost={deletePost} />)}
        </ul>
    )
}

export default DisplayPosts
