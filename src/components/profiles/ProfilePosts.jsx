import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PROFILE_PATH } from "../../constants/api/Api";
import useAxios from "../../hooks/useAxios";
import { Spinner } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/no-img.jpg";

function ProfilePosts() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name } = useParams();
  const url = PROFILE_PATH + "/" + name + "/posts";

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setProfilePosts(response.data);
        console.log("Profile reponse:", response.data);
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

  if (profilePosts.length === 0) {
    return <div>No post yet</div>;
  }

  return (
    <>
      {profilePosts.map((post) => (
        <div className="Profile-posts_item">
          <a href={`profile/${post.name}`}>
            <img src={checkImg(post.media, img)} />
          </a>
        </div>
      ))}
    </>
  );
}

export default ProfilePosts;
