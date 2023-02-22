import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, useAxios } from "../../context/index";
import { PROFILE_PATH } from "../../data/Api";
import {
  DisplayUsers,
  DisplayError,
  DisplaySpinner,
} from "../../components/index";
import { Alert } from "react-bootstrap";

function Followers() {
  const [auth, setAuth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name } = useParams();
  const http = useAxios();

  const url = PROFILE_PATH + "/" + name + "?_following=true&_followers=true";

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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
  }

  if (profile.followers.length === 0) {
    if (auth.name === name) {
      return (
        <Alert variant="info" className="alert_msg">
          No have no followers! Make a{" "}
          <Alert.Link href={"/personalprofile/" + auth.name}>post</Alert.Link>{" "}
          to attract other users to follow you.
        </Alert>
      );
    } else {
      return (
        <Alert variant="secondary" className="alert_msg">
          No followers!
        </Alert>
      );
    }
  }

  return (
    <>
      <div className="followers__heading">
        <h1>Followers</h1>
      </div>

      <div className="profiles-page-container">
        {profile.followers.map((profiles) => (
          <DisplayUsers key={profiles.id} profiles={profiles} />
        ))}
      </div>
    </>
  );
}

export default Followers;
