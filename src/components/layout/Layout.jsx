import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingsite from "../landingsite/Landingsite";
import Login from "../login/Login";
import Register from "../register/Register";
import Home from "../home/Home";
import Posts from "../posts/Posts";
import Post from "../posts/Post";
import Profiles from "../profiles/Profiles";
import Profile from "../profiles/Profile";
import PersonalProfile from "../personalProfile/PersonalProfile";
import Followers from "../followers/Followers";
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
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:name" exact element={<Profile />} />
            <Route
              path="/personalprofile/:name"
              exact
              element={<PersonalProfile />}
            />
            <Route path="/followers" element={<Followers />} />
          </Routes>
        </Container>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default Layout;
