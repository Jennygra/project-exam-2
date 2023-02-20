import { Form } from "react-bootstrap";

function TagsInput({ tags, setTags }) {
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
      <Form.Group className="tags-input_input-wrapper">
        <Form.Control
          onKeyDown={handleKeyDown}
          type="text"
          placeholder=" On space the tag will be added"
          className="tags-input_input"
        ></Form.Control>
      </Form.Group>

      <div className="tags-input_tags-wrapper">
        {tags.map((tag, index) => (
          <div className="tags-input_item" key={index}>
            <div className="tags-input_text">
              {tag}
              <div
                className="tags-input_close"
                onClick={() => removeTag(index)}
              >
                &times;
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsInput;
