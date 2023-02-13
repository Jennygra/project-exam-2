import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import { Alert, Spinner, Figure } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/default-user-img.jpg";

function Following() {
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
      <Alert variant="danger" className="alert_msg">
        ERROR: An error occured
      </Alert>
    );
  }

  if (profile.following.length === 0) {
    return (
      <Alert variant="info" className="alert_msg">
        You are not following anyone! Go to{" "}
        <Alert.Link href="/profiles">profiles</Alert.Link> for find some one to
        follow.
      </Alert>
    );
  }

  return (
    <>
      <div className="following__heading">
        <h1>Following</h1>
      </div>

      <div className="profiles-page-container">
        {profile.following.map((profiles) => (
          <Figure key={profiles.name} className="following__container">
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

export default Following;
