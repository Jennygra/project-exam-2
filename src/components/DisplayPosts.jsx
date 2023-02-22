import { checkImg } from "../utilities/index";
import img from "../images/no-img.jpg";

/**
 * Render a component to display post
 * @param {object} post - Object containing the post information
 * @param {string} post.id - The post id
 * @param {string} post.media - The URL of the post image
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The body of the post
 * @returns {JSX.Element} - A component displaying the post image, title, id and body
 */

const DisplayPosts = ({ post }) => {
  return (
    <div className="posts-item" key={post.id}>
      <a href={`post/${post.id}`}>
        <div className="posts-item_img-wrapper">
          <img src={checkImg(post.media, img)} alt={post.title} />
        </div>

        <div className="posts-item_details-wrapper">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      </a>
    </div>
  );
};

export default DisplayPosts;
