import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, PROFILE_PATH } from "../../constants/api/Api";
import { Spinner, Button, Figure } from "react-bootstrap";

const profileApi = BASE_URL + PROFILE_PATH;

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(profileApi);

        if (response.ok) {
          const json = await response.json();
          setProfiles(json);
        } else {
          setError("An error occured");
        }
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
      {profiles.map((profile) => (
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt={profile.name}
            src={profile.avatar}
          />
          <Figure.Caption>{profile.name}</Figure.Caption>
          <Button variant="dark">Follow</Button>
        </Figure>
      ))}
    </>
  );
}

export default ProfileList;
