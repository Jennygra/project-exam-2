import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, useAxios } from "../../context/index";
import { PROFILE_PATH } from "../../data/Api";
import {
  DisplaySpinner,
  DisplayUsers,
  DisplayError,
} from "../../components/index";
import { Alert } from "react-bootstrap";

function Following() {
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

  if (profile.following.length === 0) {
    if (auth.name === name) {
      return (
        <Alert variant="info" className="alert_msg">
          You are not following anyone! Go to{" "}
          <Alert.Link href="/profiles">profiles</Alert.Link> to find someone to
          follow.
        </Alert>
      );
    } else {
      return (
        <Alert variant="secondary" className="alert_msg">
          "{name}" is not following anyone!
        </Alert>
      );
    }
  }

  return (
    <>
      <div className="following__heading">
        <h1>Following</h1>
      </div>

      <div className="profiles-page-container">
        {profile.following.map((profiles) => (
          <DisplayUsers key={profiles.id} profiles={profiles} />
        ))}
      </div>
    </>
  );
}

export default Following;
