// Search function for profiles page
// Find profile by name

function ProfilesSearchBar({ profiles, setSearchResults }) {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.trim().toLowerCase();

    if (!inputValue) {
      return setSearchResults(profiles);
    }

    const resultArray = profiles.filter((profile) => {
      return profile.name.toString().toLowerCase().includes(inputValue);
    });

    setSearchResults(resultArray);
  };

  return (
    <>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="search__input"
          onChange={handleSearchChange}
        />
      </form>
    </>
  );
}

export default ProfilesSearchBar;
