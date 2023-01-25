import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useParams, useNavigate } from "react-router-dom";
import { PROFILE_PATH } from "../../constants/api/Api";
import checkImg from "../../context/CheckImg";
import { Spinner } from "react-bootstrap";
import ProfilePosts from "../profiles/ProfilePosts";
import defaultProfileImg from "../../images/default-user-img.jpg";
import defaultBannerImg from "../../images/no-img.jpg";

function PersonalProfile() {
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

        <div className="profile-counts_wrapper">
          <div className="profile-tilte_wrapper">
            <h4>{profile.name}</h4>
            <p>
              <a>Edit</a>
            </p>
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

export default PersonalProfile;
