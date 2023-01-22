import Banner from "./Banner";
import ProfileList from "../profiles/ProfileList";

function Home() {
  return (
    <>
      <Banner />

      <div className="homepage-profiles_container">
        <h2>Profiles</h2>
        <ProfileList />
      </div>

      <div className="homepage-posts_container">
        <h2>Posts</h2>
      </div>
    </>
  );
}

export default Home;
