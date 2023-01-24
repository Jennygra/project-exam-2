import Banner from "./Banner";
import ProfileList from "../profiles/ProfileList";
import PostList from "../posts/PostList";

function Home() {
  return (
    <>
      <Banner />

      <div className="homepage-profiles_container">
        <div className="homepage-profiles_title">
          <h2>Profiles</h2>
          <p>
            <a href="/profiles">See more</a>
          </p>
        </div>

        <div className="homepage-profiles_wrapper">
          <ProfileList />
        </div>
      </div>

      <div className="homepage-posts_container">
        <div className="homepage-posts_title">
          <h2>Posts</h2>
          <p>
            <a href="/posts">See more</a>
          </p>
        </div>

        <div className="homepage-posts_wrapper">
          <PostList />
        </div>
      </div>
    </>
  );
}

export default Home;
