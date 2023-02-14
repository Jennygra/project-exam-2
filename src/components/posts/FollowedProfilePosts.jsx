import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import DisplayPost from "./DisplayPosts";
import { Spinner, Alert } from "react-bootstrap";

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
      {posts.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
    </>
  );
}

export default FollowedProfilePosts;
