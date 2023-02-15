import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import checkImg from "../../context/CheckImg";
import logo from "../../images/logo.png";
import profileImgDefault from "../../images/default-user-img.jpg";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  function logout() {
    const doLogout = window.confirm("You sure you want to log out?");

    if (doLogout) {
      setAuth(null);
      navigate.push("/");
    } else {
      window.event.preventDefault();
      navigate.push("/home");
    }
  }

  return (
    <Navbar className="nav-bar" variant="dark" expand="md" expanded={expanded}>
      <Container>
        {auth ? (
          <>
            <NavLink to="/home" exact>
              <Navbar.Brand to="/home" className="nav-link">
                <img className="logo-nav" src={logo} alt="Addie logo" />
              </Navbar.Brand>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" exact>
              <Navbar.Brand to="/" className="nav-link">
                <img className="logo-nav" src={logo} alt="Addie logo" />
              </Navbar.Brand>
            </NavLink>
          </>
        )}

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-toggle-menu">
          <Nav className="ms-auto justify-content-end">
            {auth ? (
              <>
                <NavLink
                  to="/posts"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  Posts
                </NavLink>
                <NavLink
                  to="/profiles"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  Profiles
                </NavLink>
                <NavDropdown
                  className="nav-bar_dropdown nav-bar_dropdown-container"
                  title={
                    <div className="nav-dropdown_user-wrapper">
                      <div className="nav-dropdown_user-img">
                        <img
                          src={checkImg(auth.avatar, profileImgDefault)}
                          alt={auth.name + "profile image"}
                        />
                      </div>
                      {auth.name}
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href={`/personalprofile/${auth.name}`}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout} href="/">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="nav-link"
                  onClick={() => setExpanded(false)}
                >
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
