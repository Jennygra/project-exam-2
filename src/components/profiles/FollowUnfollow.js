import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, PROFILE_PATH } from "../../constants/api/Api";
import { Button } from "react-bootstrap";

function FollowUnfollow(props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState(null);
  const http = useAxios();

  const userUrl =
    BASE_URL +
    PROFILE_PATH +
    "/" +
    props.username +
    "?_following=true&_followers=true";

  useEffect(() => {
    (async function getFollowers() {
      try {
        const response = await http.get(userUrl);
        setFollowers(response.data.followers);
      } catch (error) {
        console.log("User error", error);
        setError(error);
      }
    })();
  }, []);

  async function handleFollow() {
    const followUrl =
      BASE_URL + PROFILE_PATH + "/" + props.username + "/follow";

    try {
      const response = await http.put(followUrl);
      console.log("Follow response", response.data.name);
    } catch (error) {
      console.log("Follow error", error);
      setError(error);
    }
  }

  async function unFollow() {
    const unfollowUrl =
      BASE_URL + PROFILE_PATH + "/" + props.username + "/unfollow";

    try {
      const response = await http.put(unfollowUrl);
      console.log("Unfollow response", response.data.name);
    } catch (error) {
      console.log(" Unfollow error", error);
      setError(error);
    }
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  followers.map((user) => {
    if (user.name === auth.name) {
      console.log("Show unfollow");
      setIsFollowed(true);
    } else {
      console.log("Show follow");
      setIsFollowed(false);
    }
  });

  return (
    <>
      {isFollowed ? (
        <>
          <Button type="button" onClick={unFollow}>
            Unfollow
          </Button>
        </>
      ) : (
        <>
          <Button type="button" onClick={handleFollow}>
            Follow
          </Button>
        </>
      )}
    </>
  );
}

export default FollowUnfollow;
