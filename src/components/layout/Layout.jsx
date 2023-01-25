import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingsite from "../landingsite/Landingsite";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import Posts from "../posts/Posts";
import Profiles from "../profiles/Profiles";
import Profile from "../profiles/Profile";
import PersonalProfile from "../personalProfile/PersonalProfile";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { AuthProvider } from "../../context/AuthContext/authContext";

function Layout() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />

        <Container>
          <Routes>
            <Route path="/" exact element={<Landingsite />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:name" exact element={<Profile />} />
            <Route path="/personalprofile" element={<PersonalProfile />} />
          </Routes>
        </Container>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default Layout;
