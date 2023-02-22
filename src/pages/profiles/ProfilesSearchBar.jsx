// Search function for profiles page
// Find profile by name

function ProfilesSearchBar({ profiles, setSearchResults }) {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const inputValue = e.target?.value?.trim().toLowerCase();

    if (!inputValue) {
      return setSearchResults(profiles);
    }

    const delaySearch = setTimeout(() => {
      const resultArray = profiles.filter((profile) => {
        return profile.name.toLowerCase().includes(inputValue);
      });

      setSearchResults(resultArray);
    }, 500);

    return () => clearTimeout(delaySearch);
  };

  return (
    <>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          className="search__input"
          onChange={handleSearchChange}
          id="serach-input"
        />
      </form>
    </>
  );
}

export default ProfilesSearchBar;
