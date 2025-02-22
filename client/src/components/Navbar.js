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
                    {userRole === "client" && (
                        <>
                        <Nav.Link as={NavLink} to="/myprofile">Профіль</Nav.Link>
                        <Nav.Link as={NavLink} to="/myexercises">Мої досягнення</Nav.Link>
                        </>
                    )

                    }
                    {((userRole === "trainer") || (userRole === "admin")) && (
                        <>
                            <Nav.Link as={NavLink} to="/profile">Профіль</Nav.Link>
                            <Nav.Link as={NavLink} to="/users">Користувачі</Nav.Link>
                            { userRole=='trainer' && (
                            <Nav.Link as={NavLink} to="/templates">Шаблони</Nav.Link>
                            )}
                        </>
                    )}
                    <Nav.Link as={NavLink} onClick={logoutHandler} to="/">Вийти</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}