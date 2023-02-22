import { Alert } from "react-bootstrap";

/**
 * Renders an error message with the specified content and type
 * @param {object} props - The props object
 * @param {string} props.type - The type of the alert variant
 * @param {string} props.content - The content of the error message
 * @returns {JSX.Element} The component for displaying the error message
 */

function DisplayError(props) {
  return (
    <Alert variant={props.type} className="alert_msg">
      {props.content}
    </Alert>
  );
}

export default DisplayError;
