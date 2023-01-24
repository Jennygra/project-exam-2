import { useContext } from "react";
import AuthContext from "../../context/AuthContext/authContext";
import bannerImg from "../../images/homepage-banner.JPG";
import Card from "react-bootstrap/Card";

function Banner() {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <Card className="bg-dark text-white homepage-banner_container">
        <Card.Img src={bannerImg} alt="Banner img" />
        <Card.ImgOverlay>
          <Card.Title>Hello, {auth.name}!</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default Banner;