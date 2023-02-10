import checkImg from "../../context/CheckImg";
import ReactPost from "./ReactPost";
import img from "../../images/no-img.jpg";

const DisplayPost = ({ post }) => {
  return (
    <div className="posts-item" key={post.id}>
      <a href={`post/${post.id}`}>
        <div className="posts-item_img-wrapper">
          <img src={checkImg(post.media, img)} alt={post.title} />
        </div>
      </a>

      <div className="posts-item_details-wrapper">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </div>
    </div>
  );
};

export default DisplayPost;
