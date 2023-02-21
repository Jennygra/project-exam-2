import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { POSTS_PATH } from "../../data/Api";
import {
  DisplaySpinner,
  DisplayError,
  DisplayPosts,
} from "../../components/index";

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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
  }

  return (
    <>
      {posts.map((post) => (
        <DisplayPosts key={post.id} post={post} />
      ))}
    </>
  );
}

export default DisplayPostList;
