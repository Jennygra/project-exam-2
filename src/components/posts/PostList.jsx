import DisplayPost from "./DisplayPosts";

function PostList({ searchResults }) {
  const results = searchResults.map((post) => (
    <DisplayPost key={post.id} post={post} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <div>
      <p>No matching posts</p>
    </div>
  );

  return <div className="posts-postlist_wrapper">{content}</div>;
}

export default PostList;
