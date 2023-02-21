import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxios from "../../context/useAxios";
import { BASE_URL, POSTS_PATH } from "../../data/Api";

function ReactPost(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState("");

  const reactionsCount = props.reactionCount;
  const emojis = ["👍", "❤️", "😊", "🔥"];
  const { id } = useParams();
  const http = useAxios();
  let sumCounts = 0;

  useEffect(() => {
    //Render list of counts and sum it up, then set the value for using it later
    reactionsCount.map((emoji) => {
      const counts = emoji.count;
      const convertedCounts = parseInt(counts);

      sumCounts += convertedCounts;

      setCounts(sumCounts);
    });
  }, []);

  async function emojiClicked(event) {
    // Emoji onclick it will send a PUT request to the server with clikes value
    const clickedEmoji = event.target.innerHTML;
    const url = BASE_URL + POSTS_PATH + "/" + id + "/react/" + clickedEmoji;

    try {
      const response = await http.put(url);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="reaction-wrapper">
      <i
        className={`fa-regular fa-face-smile menu-icon ${
          menuOpen ? "open" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {"  "}
        {counts}
      </i>

      <ul className={`menu-items ${menuOpen ? "open" : ""}`}>
        {emojis.map((emoji) => (
          <li className="menu-item" onClick={emojiClicked}>
            {emoji}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReactPost;
