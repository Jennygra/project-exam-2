import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { PROFILE_PATH } from "../../data/Api";
import {
  DisplaySpinner,
  DisplayProfiles,
  DisplayError,
} from "../../components/index";

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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
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
