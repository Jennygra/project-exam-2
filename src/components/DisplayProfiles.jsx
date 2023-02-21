import { Figure } from "react-bootstrap";
import checkImg from "../utilities/CheckImg";
import img from "../images/default-user-img.jpg";

// This component display user profile
// User profile details including profile picture, name, post, followers and following.

const DisplayProfiles = ({ profiles }) => {
  return (
    <>
      <Figure key={profiles.name}>
        <div className="profile-img_wrapper">
          <a href={`/profile/${profiles.name}`}>
            <Figure.Image
              width={100}
              height={100}
              alt={profiles.name}
              src={checkImg(profiles.avatar, img)}
            />
          </a>
        </div>

        <div className="profile-details_wrapper">
          <div className="profile-details_info">
            <h5>{profiles.name}</h5>
          </div>

          <div className="profile-details_counts">
            <p>{profiles._count.posts} posts</p>
            <p>{profiles._count.followers} followers</p>
            <p>{profiles._count.following} following</p>
          </div>
          <hr className="profile-hr" />
        </div>
      </Figure>
    </>
  );
};

export default DisplayProfiles;
