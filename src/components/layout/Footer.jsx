import { Navbar, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

function Footer() {
  return (
    <footer>
      <Navbar className="footer-bar" variant="dark" expand="md">
        <Container>
          <NavLink to="/" exact>
            <Navbar.Brand to="/" className="nav-link">
              <img className="logo-nav" src={logo} alt="Addie logo" />
            </Navbar.Brand>
          </NavLink>
          <p>&copy; AdD. 2023. All rights reserved.</p>
        </Container>
      </Navbar>
    </footer>
  );
}

export default Footer;
