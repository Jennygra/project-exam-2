import { useState, useEffect, useContext } from "react";
import { AuthContext, useAxios } from "../context/index";
import { BASE_URL, PROFILE_PATH } from "../data/Api";
import { Button } from "react-bootstrap";

// Follow and unfollow button
// If the user is currently being followed, the button displays "Unfollow" and calls the following put function, or the other way

function FollowUnfollowBtn(props) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [error, setError] = useState(null);
  const http = useAxios();

  useEffect(() => {
    props.followerList.map((user) => {
      if (user.name === auth.name) {
        setIsFollowed(true);
      }
    });
  }, []);

  async function handleFollow() {
    const followUrl =
      BASE_URL + PROFILE_PATH + "/" + props.username + "/follow";

    try {
      const response = await http.put(followUrl);
      window.location.reload(false);
    } catch (error) {
      setError(error);
    }
  }

  async function unFollow() {
    const unfollowUrl =
      BASE_URL + PROFILE_PATH + "/" + props.username + "/unfollow";

    try {
      const response = await http.put(unfollowUrl);
      window.location.reload(false);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
      {isFollowed ? (
        <>
          <Button
            variant="dark"
            type="button"
            aria-label="Unfollow"
            onClick={unFollow}
          >
            Unfollow
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="dark"
            type="button"
            aria-label="Follow"
            onClick={handleFollow}
          >
            Follow
          </Button>
        </>
      )}
    </>
  );
}

export default FollowUnfollowBtn;
