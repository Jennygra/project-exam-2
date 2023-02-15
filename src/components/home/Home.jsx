import Banner from "./Banner";
import DisplayPostList from "../posts/DisplayPostList";
import DisplayProfilesList from "../profiles/DisplayProfilesList";
import FollowedProfilePosts from "../posts/FollowedProfilePosts";

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
          <h2>New post!</h2>
          <p>
            <a href="/posts">See more</a>
          </p>
        </div>

        <div className="homepage-posts_wrapper">
          <div className="homepage-posts_item">
            <DisplayPostList />
          </div>
        </div>

        <div className="homepage-followed_users_posts__container">
          <div className="homepage-followed_users_posts__title">
            <h2>See what your friends posted</h2>
          </div>

          <div className="homepage-followed_users_posts__item">
            <FollowedProfilePosts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
