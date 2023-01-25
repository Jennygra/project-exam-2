import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import ProfilePosts from "./ProfilePosts";
import { Spinner } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import defaultProfileImg from "../../images/default-user-img.jpg";
import defaultBannerImg from "../../images/no-img.jpg";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <>
        <Spinner animation="grow" variant="secondary" />
        Loading...
      </>
    );
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-header_wrapper">
          <div className="profile-header_banner">
            <img src={checkImg(profile.banner, defaultBannerImg)} alt="#" />
          </div>

          <div className="profile-header_profile-img">
            <img src={checkImg(profile.avatar, defaultProfileImg)} alt="#" />
          </div>
        </div>

        <div className="profile-detail_wrapper">
          <div className="profile-tilte_wrapper">
            <h4>{profile.name}</h4>
          </div>

          <div className="profile-counts_item">
            <p>Posts: {profile._count.posts}</p>
            <p>Followers: {profile._count.followers}</p>
            <p>Following: {profile._count.following}</p>
          </div>
          <hr />
        </div>

        <div className="profile-posts_wrapper">
          <ProfilePosts />
        </div>
      </div>
    </>
  );
}

export default Profile;
