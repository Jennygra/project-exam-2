import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { PROFILE_PATH } from "../../constants/api/Api";
import { Spinner, Button, Figure } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/default-user-img.jpg";

function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(PROFILE_PATH);
        setProfiles(response.data);
        console.log(response.data);
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
          <div className="profile-img_wrapper">
            <Figure.Image
              width={100}
              height={100}
              alt={profile.name}
              src={checkImg(profile.avatar, img)}
            />
          </div>

          <div className="profile-details_wrapper">
            <div className="profile-details_info">
              <h5>{profile.name}</h5>
              <Button variant="dark">Follow</Button>
            </div>

            <div className="profile-details_counts">
              <p>Posts: {profile._count.posts}</p>
              <p>Followers: {profile._count.followers}</p>
              <p>Following: {profile._count.following}</p>
            </div>
            <hr className="profile-hr" />
          </div>
        </Figure>
      ))}
    </>
  );
}

export default ProfileList;
