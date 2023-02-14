import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import ProfilePosts from "./ProfilePosts";
import FollowUnfollowBtn from "./FollowUnfollowBtn";
import { Spinner, Alert } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import defaultProfileImg from "../../images/default-user-img.jpg";
import defaultBannerImg from "../../images/no-img.jpg";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { name } = useParams();
  const url = PROFILE_PATH + "/" + name + "?_following=true&_followers=true";

  const http = useAxios();

  if (!name) {
    navigate.push("/profiles");
  }

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setProfile(response.data);
        console.log(response.data);
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
      <Alert variant="danger" className="alert_msg">
        ERROR: An error occured
      </Alert>
    );
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-header_wrapper">
          <div className="profile-header_banner">
            <img
              src={checkImg(profile.banner, defaultBannerImg)}
              alt={profile.name + " profile banner"}
            />
          </div>

          <div className="profile-header_profile-img">
            <img
              src={checkImg(profile.avatar, defaultProfileImg)}
              alt={profile.name + " profile image"}
            />
          </div>
        </div>

        <div className="profile-detail_wrapper">
          <div className="profile-tilte_wrapper">
            <h4>{profile.name}</h4>
            <FollowUnfollowBtn
              username={profile.name}
              followerList={profile.followers}
            />
          </div>

          <div className="profile-counts_item">
            <p>{profile._count.posts} posts</p>
            <a href={`/followers/${profile.name}`}>
              {profile._count.followers} followers
            </a>
            <a href={`/following/${profile.name}`}>
              {profile._count.following} following
            </a>
          </div>
          <hr />
        </div>

        <div className="profile-posts_container">
          <div className="profile-posts_wrapper">
            <ProfilePosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
