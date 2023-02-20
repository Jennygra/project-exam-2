import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../context/useAxios";
import AuthContext from "../../context/authContext";
import { BASE_URL, POSTS_PATH } from "../../data/Api";
import { Button } from "react-bootstrap";

function DeletePost() {
  const [error, setError] = useState(null);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  const http = useAxios();

  const { id } = useParams();
  const url = BASE_URL + POSTS_PATH + "/" + id;

  async function handleDelete() {
    const confirmDelete = window.confirm("Do you want to delete this post?");

    if (confirmDelete) {
      try {
        const response = await http.delete(url);
        console.log("Delete post response", response);
        navigate(`/personalprofile/${auth.name}`);
      } catch (error) {
        console.log("error", error);
        setError(error);
      }
    }
  }

  return (
    <Button
      variant="dark"
      type="button"
      aria-label="Delete"
      onClick={handleDelete}
    >
      {error ? "Error! Try again later" : "Delete"}
    </Button>
  );
}

export default DeletePost;
