import checkImg from "../../context/CheckImg";
import ReactPost from "./ReactPost";
import img from "../../images/no-img.jpg";

const DisplayPost = ({ post }) => {
  return (
    <div className="posts-item" key={post.id}>
      <a href={`post/${post.id}`}>
        <div className="posts-item_img-wrapper">
          <img src={checkImg(post.media, img)} alt="" />
        </div>
      </a>

      <div className="posts-item_details-wrapper">
        <h4>{post.title}</h4>
        <p>{post.body}</p>
      </div>

      <div className="posts-item_actions-wrapper">
        <i className="fa-regular fa-face-smile" onClick={ReactPost}></i>
        <i className="fa-regular fa-comment"></i>
      </div>
    </div>
  );
};

export default DisplayPost;
