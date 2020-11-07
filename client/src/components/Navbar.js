import { React, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

export const NavbarComponent = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { userRole, userId } = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark" style={{ paddingLeft: 30, paddingRight: 30 }}>
            <Navbar.Brand as={NavLink} to="/">FitLog</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={NavLink} to="/users">Users</Nav.Link>
                    <Nav.Link as={NavLink} onClick={logoutHandler} to="/">Logout</Nav.Link>
                    {userRole == 'trainer' && (
                        <p>congratz you are trainer</p>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}