import React from 'react'

const Post = ({ post }) => {
    return (
        <li>{post.title} by {post.author}</li>
    )
}

const DisplayPosts = ({ posts }) => {
    return (
        <ul>
            {posts.map(post => <Post key={post.id} post={post}/>)}
        </ul>
    )
}

export default DisplayPosts
