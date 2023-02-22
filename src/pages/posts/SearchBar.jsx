// Search function for posts page
// Find post by id or title

function SearchBar({ posts, setSearchResults }) {
  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    const inputValue = e.target?.value?.trim();

    if (!inputValue) {
      return setSearchResults(posts);
    }

    const delaySearch = setTimeout(() => {
      const resultArray = posts.filter((post) => {
        return (
          post.id.toString().includes(inputValue) ||
          post.title.includes(inputValue)
        );
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
        />
      </form>
    </>
  );
}

export default SearchBar;
