import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
    return (
        <div>
            <h1>Users</h1>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return(
                            <tr key={user.id} className="user">
                                <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default Users