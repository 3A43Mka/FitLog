import {React} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import 'react-bootstrap';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext';
import { NavbarComponent } from './components/Navbar';
import { Loader } from './components/Loader';
import { Container } from 'react-bootstrap';

function App() {
  const {token, login, logout, userId, userRole, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, userRole);

  if (!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider value ={{
      token, login, logout, userId, userRole, isAuthenticated
    }}>
    <Router>
      {isAuthenticated && <NavbarComponent/>}
    <Container>
      {routes}
    </Container>
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
