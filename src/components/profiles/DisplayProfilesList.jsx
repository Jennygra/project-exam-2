import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import DisplayProfiles from "./DisplayProfiles";
import { Spinner, Alert } from "react-bootstrap";

function DisplayProfilesList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(PROFILE_PATH);
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

  return (
    <>
      {profiles.map((profile) => (
        <DisplayProfiles key={profile.id} profiles={profile} />
      ))}
    </>
  );
}

export default DisplayProfilesList;
