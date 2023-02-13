import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import ProfilesSearchBar from "./ProfilesSearchBar";
import { Spinner, Alert } from "react-bootstrap";
import ProfileList from "./ProfileList";

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(PROFILE_PATH);
        setProfiles(response.data);
        setSearchResults(response.data);
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
      <div className="profiles-heading_container">
        <h1>Profiles</h1>

        <div className="profiles-heading_input">
          <ProfilesSearchBar
            profiles={profiles}
            setSearchResults={setSearchResults}
          />
        </div>
      </div>

      <ProfileList searchResults={searchResults} />
    </>
  );
}

export default Profiles;
