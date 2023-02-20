import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landingsite from "../../pages/landingsite/Landingsite";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Home from "../../pages/home/Home";
import Posts from "../../pages/posts/Posts";
import Post from "../../pages/posts/Post";
import Profiles from "../../pages/profiles/Profiles";
import Profile from "../../pages/profiles/Profile";
import PersonalProfile from "../../pages/personalProfile/PersonalProfile";
import Followers from "../../pages/followers/Followers";
import Following from "../../pages/following/Following";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { AuthProvider } from "../../context/authContext";

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
            <Route path="/followers/:name" exact element={<Followers />} />
            <Route path="/following/:name" exact element={<Following />} />
          </Routes>
        </Container>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default Layout;
