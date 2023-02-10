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
      <form className="serach__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search profile by name..."
          className="serach__input"
          onChange={handleSearchChange}
        />
      </form>
    </>
  );
}

export default ProfilesSearchBar;
