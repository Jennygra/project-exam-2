import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { PROFILE_PATH } from "../../data/Api";
import ProfilesSearchBar from "./ProfilesSearchBar";
import { DisplaySpinner, DisplayError } from "../../components/index";
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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
  }

  return (
    <>
      <div className="profiles-heading_container">
        <h1>🔗 Connect with others</h1>

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
