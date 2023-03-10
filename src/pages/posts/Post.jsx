import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAxios, AuthContext } from "../../context/index";
import { POSTS_PATH } from "../../data/Api";
import { DisplaySpinner, DisplayError } from "../../components/index";
import { Button } from "react-bootstrap";
import { GetComment, AddComment, EditPost, ReactPost } from "./index";
import { checkImg, FormatDate } from "../../utilities/index";
import defaultPostImg from "../../images/no-img.jpg";
import defaultProfileImg from "../../images/default-user-img.jpg";

// Display all the post details, and gives the ability to comment, react, and edit and delete on their own post

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
    return <DisplaySpinner />;
  }

  if (error) {
    return <DisplayError type="danger" content="ERROR: An error occured" />;
  }

  if (auth.name === post.author.name) {
    return (
      <>
        <div className="post__author-container">
          <div className="post__author-img">
            <a href={`/personalprofile/${auth.name}`}>
              <img
                src={checkImg(post.author.avatar, defaultProfileImg)}
                alt={post.author.name + "profile image"}
              />
            </a>
          </div>

          <div>
            <a href={`/personalprofile/${auth.name}`}>
              <h4>{post.author.name}</h4>
            </a>
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
            <a href={`/profile/${post.author.name}`}>
              <h4>{post.author.name}</h4>
            </a>
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
