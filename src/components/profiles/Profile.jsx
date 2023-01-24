import ProfileList from "./ProfileList";

function Profiles() {
  return (
    <>
      <div>
        <h1>Profiles</h1>

        <div>
          <input placeholder="Search profiles.."></input>
        </div>
      </div>

      <div className="profiles-page-container">
        <ProfileList />
      </div>
    </>
  );
}

export default Profiles;
