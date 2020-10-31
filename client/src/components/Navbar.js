import {React, useContext} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

export const NavbarComponent = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
 
    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }
    return (
        // <div>
        //     <h1>I'm navbar</h1>
        // </div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand as={NavLink} to="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
                    <Nav.Link as={NavLink} onClick={logoutHandler} to="/">Logout</Nav.Link>
                    
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}