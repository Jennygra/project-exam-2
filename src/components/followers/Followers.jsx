import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import DisplayProfiles from "../profiles/DisplayProfiles";
import { Alert, Spinner, Figure } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/default-user-img.jpg";

function Followers() {
  const [auth, setAuth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();
  const url =
    PROFILE_PATH + "/" + auth.name + "?_following=true&_followers=true";

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
      <Alert variant="danger" className="error__msg">
        ERROR: An error occured
      </Alert>
    );
  }

  console.log(profile.followers);

  return (
    <>
      <div className="followers__heading">
        <h1>Followers</h1>
      </div>

      <div className="profiles-page-container">
        {profile.followers.map((profiles) => (
          <Figure key={profiles.name} className="followers__container">
            <div className="profile-img_wrapper">
              <a href={`/profile/${profiles.name}`}>
                <Figure.Image
                  width={100}
                  height={100}
                  alt={profiles.name}
                  src={checkImg(profiles.avatar, img)}
                />
              </a>
            </div>

            <div className="profile-details_wrapper">
              <div className="profile-details_info">
                <h5>{profiles.name}</h5>
              </div>
              <hr />
            </div>
          </Figure>
        ))}
      </div>
    </>
  );
}

export default Followers;
