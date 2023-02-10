import Banner from "./Banner";
import DisplayPostList from "../posts/DisplayPostList";
import DisplayProfilesList from "../profiles/DisplayProfilesList";

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
          <DisplayProfilesList />
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
          <div className="homepage-posts_item">
            {" "}
            <DisplayPostList />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
