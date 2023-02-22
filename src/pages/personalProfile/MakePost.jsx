import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../context/useAxios";
import { BASE_URL, POSTS_PATH } from "../../data/Api";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import TagsInput from "../posts/TagsInput";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  media: yup.string().url(),
  body: yup.string(),
  tags: yup.array().of(yup.string()),
});

function MakePost(props) {
  const [submitting, setSubmitting] = useState(false);
  const [makePostError, setMakePostError] = useState(null);
  const [tags, setTags] = useState([]);

  const url = BASE_URL + POSTS_PATH;
  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setMakePostError(null);

    try {
      const postData = { ...data, tags: tags };
      const response = await http.post(url, postData);
      window.location.reload();
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
      setMakePostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton aria-label="Close">
        <Modal.Title id="contained-modal-title-vcenter">
          Make a post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {makePostError && (
            <Alert variant="danger">Error: Failed to make a post</Alert>
          )}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control {...register("title", { required: true })} />
              {errors.title && (
                <Alert variant="warning">{errors.title.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Image link</Form.Label>
              <Form.Control {...register("media")} />
              {errors.media && (
                <Alert variant="warning">{errors.media.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Write a caption</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("body")} />
              {errors.body && (
                <Alert variant="warning">{errors.body.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <TagsInput tags={tags} setTags={setTags} />
              {errors.tags && (
                <Alert variant="warning">{errors.tags.message}</Alert>
              )}
            </Form.Group>

            <Form.Group className="text-center">
              <Button variant="dark" type="submit" aria-label="submit">
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
