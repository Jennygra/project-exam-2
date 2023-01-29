import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext/authContext";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner, Button } from "react-bootstrap";
import GetComment from "./GetComment";
import AddComment from "./AddComment";
import EditPost from "./EditPost";
import checkImg from "../../context/CheckImg";
import defaultPostImg from "../../images/no-img.jpg";
import defaultProfileImg from "../../images/default-user-img.jpg";

function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editProfileModalShow, setEditProfileModalShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [updateProfile, setUpdateProfile] = useState(false);

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

  console.log(auth.name, post.author.name);

  return (
    <>
      <div className="post-container">
        <div className="post-container_img-wrapper">
          <img src={checkImg(post.media, defaultPostImg)} alt="#" />
        </div>

        <div className="post-container_details-wrapper">
          <div className="post-container_details_img">
            <a href={`/profile/${post.author.name}`}>
              <img
                src={checkImg(post.author.avatar, defaultProfileImg)}
                alt="#"
              ></img>
            </a>
          </div>

          <div className="post-container_details_titles">
            <h4>{post.author.name}</h4>
            <h6>{post.title}</h6>
            <p>{post.body}</p>
          </div>

          <div>
            <Button
              variant="outline-secondary"
              onClick={() => setEditProfileModalShow(true)}
            >
              <i class="fa-regular fa-plus"></i>
              Edit post
            </Button>
            <EditPost
              show={editProfileModalShow}
              onHide={() => setEditProfileModalShow(false)}
            />
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
              <Button variant="outline-dark" onClick={() => setModalShow(true)}>
                <i class="fa-regular fa-plus"></i>
                Write a comment
              </Button>

              <AddComment show={modalShow} onHide={() => setModalShow(false)} />
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
