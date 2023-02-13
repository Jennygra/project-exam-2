function SearchBar({ posts, setSearchResults }) {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const inputValue = e.target.value.trim();

    if (!inputValue) {
      return setSearchResults(posts);
    }

    const resultArray = posts.filter((post) => {
      return post.id.toString().includes(inputValue);
    });

    setSearchResults(resultArray);
  };

  return (
    <>
      <form className="search__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search post by id..."
          className="search__input"
          onChange={handleSearchChange}
        />
      </form>
    </>
  );
}

export default SearchBar;
