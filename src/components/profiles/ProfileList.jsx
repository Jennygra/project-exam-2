import DisplayProfiles from "./DisplayProfiles";

function ProfileList({ searchResults }) {
  const results = searchResults.map((profiles) => (
    <DisplayProfiles key={profiles.id} profiles={profiles} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <div>
      <p>No matching profile</p>
    </div>
  );

  return <div className="profiles-page-container">{content}</div>;
}

export default ProfileList;
