import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, POSTS_PATH } from "../../constants/api/Api";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const schema = yup.object().shape({
  name: yup.string().required("Title is required"),
  media: yup
    .string()
    .matches(
      /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
      "Media must be a fully formed URL that links to a live and publicly accessible image"
    ),
  body: yup.string(),
  tags: yup.string(),
});

function MakePost(props) {
  const [submitting, setSubmitting] = useState(false);
  const [makePostError, setMakePostError] = useState(null);
  const [submitSuccessful, setSubmit] = useState(false);

  const url = BASE_URL + POSTS_PATH;

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
    setMakePostError(null);

    try {
      const response = await http.post(url, data);
      console.log("Make a post response", response.data);
    } catch (error) {
      console.log("error", error);
      setMakePostError(error.toString());
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Make a post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {makePostError && <div>Error: Failed to make a post</div>}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control {...register("title", { required: true })} />
              {errors.title && <span>{errors.title.message}</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Media</Form.Label>
              <Form.Control {...register("media", { required: true })} />
              {errors.media && <span>{errors.media.message}</span>}
            </Form.Group>

            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write a caption"
                {...register("body", { required: true })}
              />
              {errors.body && <span>{errors.body.message}</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Control {...register("tags", { required: true })} />
              {errors.tags && <span>{errors.tags.message}</span>}
            </Form.Group>

            <Form.Group className="text-center">
              <Button variant="dark" type="submit">
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </Form.Group>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default MakePost;
