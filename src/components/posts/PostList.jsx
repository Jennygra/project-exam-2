import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner, Card } from "react-bootstrap";

function PostList() {
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
      {posts.slice(0, 10).map((post) => (
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={post.media} />
          <Card.Body>
            <Card.Title>Username</Card.Title>
            <Card.Text>{post.title}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default PostList;
