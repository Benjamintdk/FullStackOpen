import React from 'react'
import { useDispatch } from 'react-redux'
import { updatePost, deletePost } from '../reducers/postReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useHistory } from 'react-router'
import { Form, Button, ListGroup } from 'react-bootstrap'

const DisplayPost = ({ post, loggedUser }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    if (!post) {
        return null
    }

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
            likes: post.likes + 1,
            user: post.user.id
        }
        dispatch(updatePost(updatedPost.id, updatedPost))
        dispatch(showNotification(`Blog ${updatedPost.title} has been liked`, 'success'))
    }

    const addComments = event => {
        event.preventDefault()
        const comment = event.target.comment.value
        const updatedPost = {
            ...post,
            comments: post.comments.concat(comment),
            user: post.user.id
        }
        dispatch(updatePost(updatedPost.id, updatedPost))
        dispatch(showNotification(`Blog ${updatedPost.title} has been commented on`, 'success'))
        event.target.comment.value = ''
    }

    const removePost = event => {
        event.preventDefault()
        const result = window.confirm(`Remove blog ${post.title} by ${post.author}?`)
        if (result) {
            dispatch(deletePost(post.id))
            dispatch(showNotification('blog has been deleted', 'success'))
            history.push('/')
        }
    }

    return (
        <div id={post.title} style={blogStyle}>
            <h2 className="title">{post.title} - {post.author}</h2>
            <div className="likes">likes {post.likes} <Button id="likesbutton" onClick={increaseLikes} variant="secondary">like</Button></div>
            {loggedUser.username === post.user.username ?
                <Button id="removepost" onClick={removePost}>remove</Button>
                : null}
            <div className="container">
                <Form onSubmit={addComments}>
                    <Form.Control
                        id='comment'
                        type='text'
                        name='comment'
                        placeholder="Add comments here"
                        as="textarea" />
                    <Button variant="primary" type='submit'>add comment</Button>
                </Form>
                <ListGroup as="ul" className="comments">
                    {post.comments.map(c => {
                        return (
                            <ListGroup.Item as="li" key={c}>{c}</ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </div>
    )
}

export default DisplayPost