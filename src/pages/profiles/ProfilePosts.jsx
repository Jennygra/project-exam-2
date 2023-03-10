import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PROFILE_PATH } from "../../data/Api";
import useAxios from "../../context/useAxios";
import { DisplaySpinner, DisplayError } from "../../components/index";
import checkImg from "../../utilities/CheckImg";
import img from "../../images/no-img.jpg";

function ProfilePosts() {
  const [profilePosts, setProfilePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { name } = useParams();
  const url = PROFILE_PATH + "/" + name + "/posts";

  const http = useAxios();

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setProfilePosts(response.data);
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
    return <DisplayError type="secondary" content="ERROR: An error occured" />;
  }

  if (profilePosts.length === 0) {
    return <div>No post yet</div>;
  }

  return (
    <>
      {profilePosts.map((post) => (
        <div className="profile-posts_item" key={post.id}>
          <a href={`/post/${post.id}`}>
            <img src={checkImg(post.media, img)} alt={post.title} />
          </a>
        </div>
      ))}
    </>
  );
}

export default ProfilePosts;
