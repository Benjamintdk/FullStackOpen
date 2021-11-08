import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

const NavBar = ({ name, handleLogOut }) => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='#' as='span'>
                            <Link to='/blogs' style={padding}>blogs</Link>
                        </Nav.Link>
                        <Nav.Link href='#' as='span'>
                            <Link to='/users' style={padding}>users</Link>
                        </Nav.Link>
                        <Nav.Link href="#" as="span">
                            {name
                                ? <em style={padding}>{name} logged in</em>
                                : <Link style={padding} to="/login">login</Link>
                            }
                        </Nav.Link>
                        <button onClick={handleLogOut}>logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default NavBar