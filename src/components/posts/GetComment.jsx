import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { POSTS_PATH } from "../../constants/api/Api";
import { Spinner } from "react-bootstrap";
import checkImg from "../../context/CheckImg";
import defaultProfileImg from "../../images/default-user-img.jpg";

function GetComment() {
  const [comment, setComment] = useState([]);
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
        setComment(response.data);
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

  if (comment.comments.length === 0) {
    return <div>No Comments</div>;
  }

  return (
    <>
      {comment.comments.map((comments) => (
        <div className="comment-container" key={comments.author.name}>
          <div className="comment-img">
            <a href={`/profile/${comments.author.name}`}>
              <img src={checkImg(comments.author.avatar, defaultProfileImg)} />
            </a>
          </div>

          <div className="comment-details">
            <h6>
              <a href={`/profile/${comments.author.name}`}>
                {comments.author.name}
              </a>
            </h6>
            <p>{comments.body}</p>
          </div>

          <hr />
        </div>
      ))}
    </>
  );
}

export default GetComment;
