import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { POSTS_PATH } from "../../data/Api";
import DisplayPost from "./DisplayPosts";
import { Spinner, Alert } from "react-bootstrap";

function DisplayPostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(POSTS_PATH);
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

  return (
    <>
      {posts.map((post) => (
        <DisplayPost key={post.id} post={post} />
      ))}
    </>
  );
}

export default DisplayPostList;
