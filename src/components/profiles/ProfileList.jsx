import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import { Spinner, Button, Figure } from "react-bootstrap";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(PROFILE_PATH);
        console.log("reponse:", response.data);
        setProfiles(response.data);
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
      {profiles.slice(0, 10).map((profile) => (
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
