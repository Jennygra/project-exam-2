import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner, Alert } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/no-img.jpg";

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
    return <Alert variant="danger">ERROR: An error occured</Alert>;
  }

  return (
    <>
      {posts.map((post) => (
        <div className="posts-item" key={post.id}>
          <a href={`post/${post.id}`}>
            <div className="posts-item_img-wrapper">
              <img src={checkImg(post.media, img)} alt={post.title} />
            </div>
          </a>

          <div className="posts-item_details-wrapper">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default DisplayPostList;
