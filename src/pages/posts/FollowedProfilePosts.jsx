import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { POSTS_PATH } from "../../data/Api";
import DisplayPost from "./DisplayPosts";
import { Spinner, Alert } from "react-bootstrap";
import checkImg from "../../utilities/CheckImg";
import img from "../../images/no-img.jpg";

function FollowedProfilePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();
  const url = POSTS_PATH + "/following";

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setPosts(response.data);
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

  if (posts.length === 0) {
    return <Alert variant="light">Follow someone to see their posts</Alert>;
  }

  return (
    <>
      {posts.map((post) => (
        <div className="homepage-followed_users_posts__item" key={post.id}>
          <a href={`post/${post.id}`}>
            <img src={checkImg(post.media, img)} alt={post.title} />
          </a>
        </div>
      ))}
    </>
  );
}

export default FollowedProfilePosts;
