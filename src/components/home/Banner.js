import bannerImg from "../../images/homepage-banner.JPG";
import Card from "react-bootstrap/Card";

function Banner() {
  return (
    <>
      <Card className="bg-dark text-white homepage-banner_container">
        <Card.Img src={bannerImg} alt="Banner img" />
        <Card.ImgOverlay>
          <Card.Title>Hello (USER)</Card.Title>
        </Card.ImgOverlay>
      </Card>
    </>
  );
}

export default Banner;
