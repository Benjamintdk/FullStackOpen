import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Posts = ({ posts }) => {
    const sortedPosts = [].concat(posts).sort((a, b) => a.likes > b.likes ? -1 : 1)
    return (
        <div>
            <h1>Blogs</h1>
            <Table striped>
                <tbody>
                    {sortedPosts.map(post => {
                        return(
                            <tr key={post.id}>
                                <td>
                                    <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>

    )
}

export default Posts
