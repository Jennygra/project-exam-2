import DisplayProfiles from "../../components/DisplayProfiles";
import { Alert } from "react-bootstrap";

/**
 * @param {object} props - The props object containing the "searchResults" array
 * @param {object} props.searchResults - An array of profile objects to be rendered
 * @returns {JSX.Element} The JSX representation of the profile list component
 */

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
