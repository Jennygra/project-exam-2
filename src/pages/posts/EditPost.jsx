import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../context/useAxios";
import { BASE_URL, POSTS_PATH } from "../../data/Api";
import { TagsInput, DeletePost } from "./index";
import { Alert, Button, Form, Modal } from "react-bootstrap";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  media: yup.string().url(),
  body: yup.string(),
  tags: yup.array().of(yup.string()),
});

function EditPost(props) {
  const [post, setPost] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [updatePostError, setUpdatePostError] = useState(null);
  const [tags, setTags] = useState([]);

  const { id } = useParams();
  const url = BASE_URL + POSTS_PATH + "/" + id;
  const http = useAxios();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setPost(response.data);
      } catch (error) {
        setUpdatePostError(error.toString());
      }
    })();
  }, []);

  async function onSubmit(data) {
    setUpdatePostError(null);

    try {
      const putData = { ...data, tags: tags };
      const response = await http.put(url, putData);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      setUpdatePostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmitting(true);
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
          Update post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {updatePostError && (
            <Alert variant="danger">Error: Failed to make a post</Alert>
          )}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                defaultValue={post.title}
                {...register("title", { required: true })}
              />
              {errors.title && (
                <Alert variant="warning">{errors.title.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Image link</Form.Label>
              <Form.Control defaultValue={post.media} {...register("media")} />
              {errors.media && (
                <Alert variant="warning">{errors.media.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Write a caption</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                defaultValue={post.body}
                {...register("body")}
              />
              {errors.body && (
                <Alert variant="warning">{errors.body.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <TagsInput
                tags={tags}
                setTags={setTags}
                defaultValue={post.tags}
                {...register("tags")}
              />
              {errors.tags && (
                <Alert variant="warning">{errors.tags.message}</Alert>
              )}
            </Form.Group>

            <Form.Group className="text-center edit-post__btns">
              <Button variant="dark" type="submit" aria-label="Submit">
                {submitting ? "Updating..." : "Update"}
              </Button>

              <DeletePost />
            </Form.Group>
          </fieldset>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditPost;
