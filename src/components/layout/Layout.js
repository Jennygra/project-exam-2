import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import logo from "../../images/logo.png";
import Landingsite from "../landingsite/Landingsite";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
// import Posts from "../posts/Posts";
// import Profiles from "../profiles/Profile";
// import PersonalProfile from "../personalProfile/PersonalProfile";

function Layout() {
  return (
    <Router>
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
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/register" className="nav-link">
                Register
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" exact element={<Landingsite />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/posts" element={<Posts />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/personalprofile" element={<PersonalProfile />} /> */}
        </Routes>
      </Container>

      <footer>
        <Navbar className="footer-bar" variant="dark" expand="md">
          <Container>
            <NavLink to="/" exact>
              <Navbar.Brand to="/" className="nav-link">
                <img className="logo-nav" src={logo} alt="Addie logo"></img>
              </Navbar.Brand>
            </NavLink>
            <p>&copy; AdD. 2023. All rights reserved.</p>
          </Container>
        </Navbar>
      </footer>
    </Router>
  );
}

export default Layout;
