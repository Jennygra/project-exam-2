import { DisplayPosts } from "../../components/index";
import { Alert } from "react-bootstrap";

/**
 * @param {object} props - The props object containing the "searchResults" array
 * @param {object} props.searchResults - An array of post objects to be rendered
 * @returns {JSX.Element} The JSX representation of the post list component
 */

function PostList({ searchResults }) {
  const results = searchResults.map((post) => (
    <DisplayPosts key={post.id} post={post} />
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
