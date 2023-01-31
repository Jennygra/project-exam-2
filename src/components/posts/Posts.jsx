import PostList from "./PostList";
import SearchPost from "./SearchPost";

function Posts() {
  return (
    <>
      <div className="posts-heading_wrapper">
        <h1>Post</h1>

        <div>
          <input
            type="text"
            placeholder="Search post..."
            onKeyUp={SearchPost}
          ></input>
        </div>
      </div>

      <div className="posts-postlist_wrapper">
        <PostList />
      </div>
    </>
  );
}

export default Posts;
