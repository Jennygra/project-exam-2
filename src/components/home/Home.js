import ProfileList from "../profiles/ProfileList";
import Banner from "./Banner";

function Home() {
  return (
    <>
      <Banner />

      <div>
        <ProfileList />
      </div>

      <div>
        <h2>Posts</h2>
      </div>
    </>
  );
}

export default Home;
