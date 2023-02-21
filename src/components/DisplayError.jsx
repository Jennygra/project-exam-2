import { Alert } from "react-bootstrap";

// This component display an error message.
// Props.content determined the message to users
// Props.type determind the Bootstrap UI styling for this message

function DisplayError(props) {
  return (
    <Alert variant={props.type} className="alert_msg">
      {props.content}
    </Alert>
  );
}

export default DisplayError;
