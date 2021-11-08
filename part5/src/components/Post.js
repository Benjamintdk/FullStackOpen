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
            <div style={showWhenVisible} className='urllikes'>
                <button onClick={toggleVisibility}>hide</button>
                {props.children}
            </div>
        </div>
    )
}

const Post = ({ post, updateLikes, deletePost, loggedUser }) => {
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
        <div id={post.title} style={blogStyle}>
            <li>
                <p>{post.title} - {post.author}</p>
                <ShowDetails buttonLabel="view">
                    <br /><div className="url">{post.url}</div>
                    <br /><div className="likes">likes {post.likes} <button onClick={increaseLikes}>like</button></div>
                </ShowDetails>
                {loggedUser.username === post.user.username ?
                    <button id="removepost" onClick={removePost}>remove</button>
                    : null
                }
            </li>
        </div>
    )
}

export default Post