import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext/authContext";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner, Button, Alert } from "react-bootstrap";
import GetComment from "./GetComment";
import AddComment from "./AddComment";
import EditPost from "./EditPost";
import ReactPost from "./ReactPost";
import checkImg from "../../context/CheckImg";
import defaultPostImg from "../../images/no-img.jpg";
import defaultProfileImg from "../../images/default-user-img.jpg";
import FormatDate from "../../context/FormatDate";

function Post() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [editPostModalShow, setEditPostModalShow] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

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

  if (auth.name === post.author.name) {
    return (
      <>
        <div className="post__author-container">
          <div className="post__author-img">
            <a href={`/profile/${post.author.name}`}>
              <img
                src={checkImg(post.author.avatar, defaultProfileImg)}
                alt={post.author.name + "profile image"}
              />
            </a>
          </div>

          <div>
            <h4>{post.author.name}</h4>
            <p>{FormatDate(post.created)}</p>
          </div>
        </div>

        <div className="post-container">
          <div className="post-container_img-wrapper">
            <img
              src={checkImg(post.media, defaultPostImg)}
              alt={post.author.name + "post media"}
            />
          </div>

          <div className="post-container_details-wrapper">
            <div className="post-container_details_titles">
              <h5>{post.title}</h5>
              <p>{post.body}</p>
            </div>

            <div className="post-container_details_btn">
              <Button
                variant="outline-secondary"
                aria-label="Edit post"
                onClick={() => setEditPostModalShow(true)}
              >
                <i className="fa-regular fa-plus" aria-label="Edit post"></i>
                Edit post
              </Button>
              <EditPost
                show={editPostModalShow}
                onHide={() => setEditPostModalShow(false)}
              />
            </div>
          </div>

          <hr />

          <div className="post-container_comment-wrapper">
            <div>
              <p>Comment</p>
            </div>

            <div className="post-container_comment-item">
              <GetComment />
              <div>
                <Button
                  variant="outline-dark"
                  aria-label="Write a comment"
                  onClick={() => setModalShow(true)}
                >
                  <i
                    className="fa-regular fa-plus"
                    aria-label="Write a comment"
                  />
                  Write a comment
                </Button>

                <AddComment
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>

            <div className="post-container_icons-wrapper">
              <ReactPost reactionCount={post.reactions} />
              <a
                href={`mailto:?subject=Check%20out%20AdD.%20-%20Share,%20connect,%20discover!&body= Check out AdD. Join to share, connect and discover -> ${window.location.href}`}
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fa-regular fa-share-from-square share__btn"
                  aria-label="Share"
                />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="post__author-container">
          <div className="post__author-img">
            <a href={`/profile/${post.author.name}`}>
              <img
                src={checkImg(post.author.avatar, defaultProfileImg)}
                alt={post.author.name + "profile image"}
              />
            </a>
          </div>

          <div>
            <h4>{post.author.name}</h4>
            <p>{FormatDate(post.created)}</p>
          </div>
        </div>

        <div className="post-container">
          <div className="post-container_img-wrapper">
            <img
              src={checkImg(post.media, defaultPostImg)}
              alt={post.author.name + "post media"}
            />
          </div>

          <div className="post-container_details-wrapper">
            <div className="post-container_details_titles">
              <h5>{post.title}</h5>
              <p>{post.body}</p>
            </div>
          </div>

          <hr />

          <div className="post-container_comment-wrapper">
            <div>
              <p>Comment</p>
            </div>

            <div className="post-container_comment-item">
              <GetComment />
              <div>
                <Button
                  variant="outline-dark"
                  aria-label="Add a comment"
                  onClick={() => setModalShow(true)}
                >
                  <i
                    className="fa-regular fa-plus"
                    aria-label="Write a comment"
                  />
                  Write a comment
                </Button>

                <AddComment
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                />
              </div>
            </div>

            <div className="post-container_icons-wrapper">
              <ReactPost reactionCount={post.reactions} />
              <a
                href={`mailto:?subject=Check%20out%20AdD.%20-%20Share,%20connect,%20discover!&body= Check out AdD. Join to share, connect and discover -> ${window.location.href}`}
                target="_blank"
                rel="noreferrer"
              >
                <i
                  className="fa-regular fa-share-from-square share__btn"
                  aria-label="Share"
                />
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Post;
