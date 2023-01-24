import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import checkImg from "../../context/CheckImg";
import logo from "../../images/logo.png";
import profileImgDefault from "../../images/default-user-img.jpg";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate.push("/");
  }

  console.log(auth.name);

  return (
    <Navbar className="nav-bar" variant="dark" expand="md">
      <Container>
        {auth ? (
          <>
            <NavLink to="/home" exact>
              <Navbar.Brand to="/home" className="nav-link">
                <img className="logo-nav" src={logo} alt="Addie logo"></img>
              </Navbar.Brand>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" exact>
              <Navbar.Brand to="/" className="nav-link">
                <img className="logo-nav" src={logo} alt="Addie logo"></img>
              </Navbar.Brand>
            </NavLink>
          </>
        )}

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
                <NavDropdown
                  className="nav-bar_dropdown nav-bar_dropdown-container"
                  title={
                    <div className="nav-dropdown_user-wrapper">
                      <div className="nav-dropdown_user-img">
                        <img src={checkImg(auth.avatar, profileImgDefault)} />
                      </div>

                      {auth.name}
                    </div>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/personalprofile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout} href="/">
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
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
