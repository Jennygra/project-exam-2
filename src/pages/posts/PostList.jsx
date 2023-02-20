import DisplayPost from "./DisplayPosts";
import { Alert } from "react-bootstrap";

function PostList({ searchResults }) {
  const results = searchResults.map((post) => (
    <DisplayPost key={post.id} post={post} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <div>
      <Alert variant="dark">No matching post</Alert>
    </div>
  );

  return <div className="posts-postlist_wrapper">{content}</div>;
}

export default PostList;
