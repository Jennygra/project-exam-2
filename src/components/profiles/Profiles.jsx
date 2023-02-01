import ProfileList from "./ProfileList";

function Profiles() {
  return (
    <>
      <div className="profiles-heading_container">
        <h1>Profiles</h1>

        <div className="profiles-heading_input">
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
