import { Table } from 'react-bootstrap'
import React from 'react'

const DisplayUser = ({ user }) => {

    if (!user) {
        return null
    }
    return (
        <div>
            <h1>{user.name}</h1>
            <h3>added blogs</h3>
            <Table striped>
                <tbody>
                    {user.blogs.map(blog => {
                        return(
                            <tr key={blog.id} className="books">
                                <td>{blog.title}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default DisplayUser