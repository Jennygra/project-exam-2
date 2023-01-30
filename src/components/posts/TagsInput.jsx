import { useState } from "react";

function TagsInput() {
  const [tags, setTags] = useState([]);

  function handleKeyDown(e) {
    if (e.code !== "Space") return;
    const value = e.target.value;

    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <div className="tags-input_item" key={index}>
          <div className="tags-input_text">{tag}</div>
          <div className="tags-input_close" onClick={() => removeTag(index)}>
            &times;
          </div>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Type something"
        className="tags-input_input"
      ></input>
    </div>
  );
}

export default TagsInput;
