import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import img from "../../images/no-img.jpg";
import ReactPost from "./ReactPost";

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
    console.log(error);
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <div className="posts-item" key={post.id}>
          <a href={`post/${post.id}`}>
            <div className="posts-item_img-wrapper">
              <img src={checkImg(post.media, img)} alt="" />
            </div>
          </a>

          <div className="posts-item_details-wrapper">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
          </div>

          <div className="posts-item_actions-wrapper">
            <i className="fa-regular fa-face-smile" onClick={ReactPost}></i>
            <i className="fa-regular fa-comment"></i>
          </div>
        </div>
      ))}
    </>
  );
}

export default PostList;
