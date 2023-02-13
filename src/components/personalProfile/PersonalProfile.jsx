import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../constants/api/Api";
import checkImg from "../../context/CheckImg";
import { Spinner, Button, Alert } from "react-bootstrap";
import ProfilePosts from "../profiles/ProfilePosts";
import EditProfile from "./EditProfile";
import MakePost from "./MakePost";
import defaultProfileImg from "../../images/default-user-img.jpg";
import defaultBannerImg from "../../images/no-img.jpg";

function PersonalProfile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [makePostModalShow, makePostSetModalShow] = useState(false);
  const [editProfileModalShow, editProfileSetModalShow] = useState(false);

  const navigate = useNavigate();
  const { name } = useParams();
  const url = PROFILE_PATH + "/" + name;

  const http = useAxios();

  if (!name) {
    navigate.push("/profiles");
  }

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <Spinner animation="grow" variant="secondary" />
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger">ERROR: An error occured, please try again</Alert>
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-header_wrapper">
          <div className="profile-header_banner">
            <img
              src={checkImg(profile.banner, defaultBannerImg)}
              alt={profile.name + "banner image"}
            />
          </div>

          <div className="profile-header_profile-img">
            <img
              src={checkImg(profile.avatar, defaultProfileImg)}
              alt={profile.name + "avatar"}
            />
          </div>

          <div className="profile-header_update">
            <Button
              variant="outline-secondary"
              onClick={() => editProfileSetModalShow(true)}
              aria-label="Edit profile"
            >
              Edit profile
            </Button>
            <EditProfile
              show={editProfileModalShow}
              onHide={() => editProfileSetModalShow(false)}
            />
          </div>
        </div>

        <div className="profile-counts_wrapper">
          <div className="profile-tilte_wrapper">
            <h4>{profile.name}</h4>
          </div>

          <div className="profile-counts_item">
            <p>{profile._count.posts} posts</p>
            <p>{profile._count.followers} followers</p>
            <p>{profile._count.following} following</p>
          </div>
          <hr />
        </div>

        <div className="personal_profile-posts_container">
          <div className="profile-posts_wrapper">
            <ProfilePosts />
          </div>

          <div className="personal_profile-posts_btn">
            <Button
              variant="outline-secondary"
              onClick={() => makePostSetModalShow(true)}
              aria-label="Make a post"
            >
              <i className="fa-regular fa-plus"></i>
              Make a post
            </Button>
            <MakePost
              show={makePostModalShow}
              onHide={() => makePostSetModalShow(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalProfile;
