import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { POSTS_PATH } from "../../data/Api";
import { DisplaySpinner, DisplayError } from "../../components/index";
import { SearchBar, PostList } from "./index";

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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
  }

  return (
    <>
      <div className="posts-heading_wrapper">
        <h1>New post!</h1>

        <div>
          <SearchBar posts={posts} setSearchResults={setSearchResults} />
        </div>
      </div>

      <PostList searchResults={searchResults} />
    </>
  );
}

export default Posts;
