import { Alert } from "react-bootstrap";

function DisplayError(props) {
  return (
    <Alert variant={props.type} className="alert_msg">
      {props.content}
    </Alert>
  );
}

export default DisplayError;
