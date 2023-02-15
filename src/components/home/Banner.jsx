import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import Card from "react-bootstrap/Card";

function Banner() {
  const [auth, setAuth] = useContext(AuthContext);

  const currentTime = new Date().getHours();
  let imgUrl = "";
  let greeting = "";

  if (3 <= currentTime && currentTime < 11) {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG777_1.jpeg";

    greeting = "Good morning,";
  } else if (12 <= currentTime && currentTime < 18) {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG778_1.jpeg";

    greeting = "Good afternoon,";
  } else {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG775_1.jpeg";

    greeting = "Good evening,";
  }

  return (
    <>
      <div className="homepage-banner_container">
        <img src={imgUrl} alt="Banner image" />
        <div>
          <h1>
            {greeting} {auth.name}!
          </h1>
        </div>
      </div>
    </>
  );
}

export default Banner;
