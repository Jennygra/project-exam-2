import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, POSTS_PATH } from "../../constants/api/Api";

function ReactPost(props) {
  const reactionList = props.reactionList;
  const emojis = ["👍", "❤️", "😊", "🔥"];
  const [reactions, setReactions] = useState([]);
  const { id } = useParams();
  const http = useAxios();
  const navigate = useNavigate();

  console.log("This is reaction list", reactionList);

  // useEffect(() => {
  //   reactionList.map((reaction) => console.log(reaction.count));
  // }, []);

  async function emojiClicked(event) {
    const clickedEmoji = event.target.innerHTML;
    const url = BASE_URL + POSTS_PATH + "/" + id + "/react/" + clickedEmoji;

    try {
      const response = await http.put(url);
      console.log("Emoji response", response);
      navigate(`/post/${id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {emojis.map((emoji) => (
        <div>
          {/* <p>{reactions}</p> */}
          <p onClick={emojiClicked}>{emoji}</p>
        </div>
      ))}
    </>
  );
}

export default ReactPost;
