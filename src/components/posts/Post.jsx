import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner } from "react-bootstrap";
import GetComment from "./GetComment";
import checkImg from "../../context/CheckImg";
import defaultPostImg from "../../images/no-img.jpg";
import defaultProfileImg from "../../images/default-user-img.jpg";

function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const url =
    POSTS_PATH + "/" + id + "?_author=true&_comments=true&_reactions=true";

  const http = useAxios();

  if (!id) {
    navigate.push("/posts");
  }

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setPost(response.data);
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

  console.log(post.author.avatar);

  return (
    <>
      <div className="post-container">
        <div className="post-container_img-wrapper">
          <img src={checkImg(post.media, defaultPostImg)} alt="#" />
        </div>

        <div className="post-container_details-wrapper">
          <div className="post-container_details_img">
            <img
              src={checkImg(post.author.avatar, defaultProfileImg)}
              alt="#"
            ></img>
          </div>

          <div>
            <h4>{post.author.name}</h4>
            <h6>{post.title}</h6>
            <p>{post.body}</p>
          </div>
        </div>

        <hr />

        <div className="post-container_comment-wrapper">
          <div>
            <p>Comment</p>
          </div>

          <div>
            <GetComment />
            <div>
              <button>
                <i class="fa-regular fa-plus"></i>
                Write a comment
              </button>
            </div>
          </div>

          <div className="post-container_icons-wrapper">
            <i class="fa-regular fa-face-smile"></i>
            <i class="fa-regular fa-share-from-square"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
