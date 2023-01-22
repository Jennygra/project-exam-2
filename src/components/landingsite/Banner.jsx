import img from "../../images/landingsite-banner.png";

function Banner() {
  return (
    <div className="landingsite-banner">
      <img
        src={img}
        alt="Share, connect, discover. Dont miss out, register now!"
      />
    </div>
  );
}

export default Banner;
