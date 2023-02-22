import { Figure } from "react-bootstrap";
import checkImg from "../utilities/CheckImg";
import img from "../images/default-user-img.jpg";

/**
 * Render a component to display user profiles
 * @param {object} profiles - Object containing the user profile information
 * @param {string} prfiles.name - The users name
 * @param {string} profiles.avatar - The URL of the users profile image
 * @returns {JSX.Element} - A component displaying the users profile image and name
 */

const DisplayUsers = ({ profiles }) => {
  return (
    <Figure key={profiles.name} className="following__container">
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
        <hr />
      </div>
    </Figure>
  );
};

export default DisplayUsers;
