import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner, Alert } from "react-bootstrap";
import SearchBar from "./SearchBar";
import PostList from "./PostList";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(POSTS_PATH);
        setPosts(response.data);
        setSearchResults(response.data);
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
    console.log(error);
    return (
      <Alert variant="danger" className="error__msg">
        ERROR: An error occured
      </Alert>
    );
  }

  return (
    <>
      <div className="posts-heading_wrapper">
        <h1>Post</h1>

        <div>
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
        </div>
      </div>

      <PostList searchResults={searchResults} />
    </>
  );
}

export default Posts;
