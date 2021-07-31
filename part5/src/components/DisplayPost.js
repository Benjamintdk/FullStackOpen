import React from 'react'
import Post from './Post'

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
