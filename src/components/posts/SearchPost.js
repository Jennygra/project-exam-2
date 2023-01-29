import { useState, useEffect } from "react";

function SearchPost(value) {
  const searchInput = document.querySelector("#postSearchInput");

  searchInput.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();
    const filteredProduct = value.filter((item) =>
      item.id.toLowerCase().includes(searchValue)
    );

    if (filteredProduct.length === 0) {
      return (
        <>
          <div>No posts matches the id</div>
        </>
      );
    }

    if (filteredProduct.length !== 0) {
      return (
        <>
          <div>no post</div>
        </>
      );
    }
  };
}

export default SearchPost;
