import Banner from "./Banner";
import ProfileList from "../profiles/ProfileList";
import PostList from "../posts/PostList";

function Home() {
  return (
    <>
      <Banner />

      <div className="homepage-profiles_container">
        <h2>Profiles</h2>
        <div className="homepage-profiles_wrapper">
          <ProfileList />
        </div>
      </div>

      <div className="homepage-posts_container">
        <h2>Posts</h2>
        <div className="homepage-posts_wrapper">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Home;
