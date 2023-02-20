import DisplayProfiles from "../../components/DisplayProfiles";
import { Alert } from "react-bootstrap";

function ProfileList({ searchResults }) {
  const results = searchResults.map((profiles) => (
    <DisplayProfiles key={profiles.id} profiles={profiles} />
  ));

  const content = results?.length ? (
    results
  ) : (
    <div>
      <Alert variant="dark">No matching profile</Alert>
    </div>
  );

  return <div className="profiles-page-container">{content}</div>;
}

export default ProfileList;
