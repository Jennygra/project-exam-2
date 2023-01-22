import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import logo from "../../images/logo.png";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate.push("/");
  }

  return (
    <Navbar className="nav-bar" variant="dark" expand="md">
      <Container>
        <NavLink to="/" exact>
          <Navbar.Brand to="/" className="nav-link">
            <img className="logo-nav" src={logo} alt="Addie logo"></img>
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto justify-content-end">
            {auth ? (
              <>
                <NavLink to="/posts" className="nav-link">
                  Posts
                </NavLink>
                <NavLink to="/profiles" className="nav-link">
                  Profiles
                </NavLink>
                <NavLink to="/personalprofile" className="nav-link">
                  Hi User
                </NavLink>
                <button onClick={logout}>Log out</button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
