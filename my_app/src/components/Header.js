import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logoApp from '../assets/img/logo192.png'
import { Image } from 'react-bootstrap';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = (props) => {
      const navigate = useNavigate();
      const Location = useLocation();

      const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/");
      }

    return (
      <>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
        <img
              src={logoApp}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          <span>ThanhDat's App</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto " >
              
                <NavLink to="/" className="nav-link">Home</NavLink>
             
                <NavLink
                to="/ManageUsers" className="nav-link">Manage Users</NavLink>  
          
          </Nav>
          
          <NavDropdown title="Settings" >
              <NavLink to="/login" className="dropdown-item">Login</NavLink>
              <NavLink to="/logout" 
              className="dropdown-item"
              onClick={() => handleLogout()}
              >Logout</NavLink>
              
            
            </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>)
}

export default Header;