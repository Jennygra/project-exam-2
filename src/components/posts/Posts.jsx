import PostList from "./PostList";

function Posts() {
  return (
    <>
      <div className="posts-heading_wrapper">
        <h1>Post</h1>

        <div>
          <input placeholder="Search post..."></input>
        </div>
      </div>

      <div className="posts-postlist_wrapper">
        <PostList />
      </div>
    </>
  );
}

export default Posts;
