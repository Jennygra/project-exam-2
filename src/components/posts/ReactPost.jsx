import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, POSTS_PATH } from "../../constants/api/Api";

function ReactPost(props) {
  const reactionList = props.reactionList;
  const reactionCount = reactionList.length;
  const emojis = ["👍", "❤️", "😊", "🔥"];
  const { id } = useParams();
  const http = useAxios();

  async function emojiClicked(event) {
    const clickedEmoji = event.target.innerHTML;
    const url = BASE_URL + POSTS_PATH + "/" + id + "/react/" + clickedEmoji;

    try {
      const response = await http.put(url);
      console.log("Emoji response", response);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="post-reaction-container">
      <p>{reactionCount}</p>
      {emojis.map((emoji) => (
        <div>
          <p onClick={emojiClicked}>{emoji}</p>
        </div>
      ))}
    </div>
  );
}

export default ReactPost;
