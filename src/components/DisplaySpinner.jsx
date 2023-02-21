import { Spinner } from "react-bootstrap";

function DisplaySpinner() {
  return (
    <div className="spinner">
      <Spinner animation="grow" variant="secondary" />
      Loading...
    </div>
  );
}

export default DisplaySpinner;
