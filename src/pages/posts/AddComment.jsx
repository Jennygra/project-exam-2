import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../context/useAxios";
import { useParams } from "react-router-dom";
import { BASE_URL, POSTS_PATH } from "../../data/Api";
import { Button, Form, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const schema = yup.object().shape({
  body: yup.string().required("Please write a comment"),
});

function AddComment(props) {
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);
  const [submitSuccessful, setSubmit] = useState(false);

  const { id } = useParams();
  const url = BASE_URL + POSTS_PATH + "/" + id + "/comment";

  const http = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setCommentError(null);

    try {
      const response = await http.post(url, data);
      console.log("Add comment response", response.data);
      window.location.reload();
    } catch (error) {
      setCommentError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmit(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton aria-label="Close">
        <Modal.Title id="contained-modal-title-vcenter">
          Add a Comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {commentError && (
            <Alert variant="danger">
              Error: Your comment was not submitted
            </Alert>
          )}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Comment"
                {...register("body", { required: true })}
              />
              {errors.body && (
                <Alert variant="warning">{errors.body.message}</Alert>
              )}
            </Form.Group>

            <Form.Group className="text-center">
              <Button variant="dark" type="submit" aria-label="Submit">
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Form.Group>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddComment;
