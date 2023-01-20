import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, POSTS_PATH } from "../../constants/api/Api";
import Spinner from "react-bootstrap/Spinner";

const postApi = BASE_URL + POSTS_PATH;

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(postApi);

        if (response.ok) {
          const json = await response.json();
          setPosts(json);
        } else {
          setError("An error occured");
        }
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
      {posts.map((post) => (
        <Figure>
          <Figure.Image
            width={171}
            height={180}
            alt={post.title}
            src={post.media}
          />
          <Figure.Caption>{post.title}</Figure.Caption>
        </Figure>
      ))}
    </>
  );
}

export default PostList;
