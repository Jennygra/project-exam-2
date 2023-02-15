import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import bannerImg from "../../images/homepage-banner.JPG";
import Card from "react-bootstrap/Card";

function Banner() {
  const [auth, setAuth] = useContext(AuthContext);

  const currentTime = new Date().getHours();
  let imgUrl = "";
  let greeting = "";

  if (4 <= currentTime && currentTime < 11) {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG777.jpeg";

    greeting = "Good morning,";
  } else if (12 <= currentTime && currentTime < 18) {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG778.jpeg";

    greeting = "Good afternoon,";
  } else {
    imgUrl = "https://www.linkpicture.com/q/WechatIMG775.jpeg";

    greeting = "Good evening,";
  }

  return (
    <>
      <Card className="bg-dark text-white homepage-banner_container">
        <Card.Img src={imgUrl} alt="" />
        <Card.ImgOverlay>
          <Card.Title>
            {greeting} {auth.name}!
          </Card.Title>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default Banner;
