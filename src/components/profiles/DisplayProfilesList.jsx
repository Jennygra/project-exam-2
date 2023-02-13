import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import { Spinner, Figure, Alert } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/default-user-img.jpg";

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
      <>
        <Spinner animation="grow" variant="secondary" />
        Loading...
      </>
    );
  }

  if (error) {
    return <Alert variant="danger">ERROR: An error occured</Alert>;
  }

  return (
    <>
      {profiles.map((profile) => (
        <Figure key={profile.name}>
          <div className="profile-img_wrapper">
            <a href={`/profile/${profile.name}`}>
              <Figure.Image
                width={100}
                height={100}
                alt={profile.name}
                src={checkImg(profile.avatar, img)}
              />
            </a>
          </div>

          <div className="profile-details_wrapper">
            <div className="profile-details_info">
              <h5>{profile.name}</h5>
            </div>

            <div className="profile-details_counts">
              <p>{profile._count.posts} posts</p>
              <p>{profile._count.followers} followers</p>
              <p>{profile._count.following} following</p>
            </div>
            <hr className="profile-hr" />
          </div>
        </Figure>
      ))}
    </>
  );
}

export default DisplayProfilesList;
