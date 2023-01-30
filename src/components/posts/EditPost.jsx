import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../context/AuthContext/authContext";
import { BASE_URL, POSTS_PATH } from "../../constants/api/Api";
import TagsInput from "./TagsInput";
import DeletePost from "./DeletePost";
import { Button, Form, Modal } from "react-bootstrap";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  media: yup.string().url(),
  body: yup.string(),
  tags: yup.string(),
});

function EditPost(props) {
  const [submitting, setSubmitting] = useState(false);
  const [updatePostError, setUpdatePostError] = useState(null);
  const [submitSuccessful, setSubmit] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);

  const { id } = useParams();
  const url = BASE_URL + POSTS_PATH + "/" + id;
  const http = useAxios();
  const navigate = useNavigate();

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
    setUpdatePostError(null);

    console.log(data);

    try {
      const response = await http.put(url, data);
      console.log("Update profile response", response.data);
      navigate(`/personalprofile/${auth.name}`);
    } catch (error) {
      console.log("error", error);
      setUpdatePostError(error.toString());
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
          Update post
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {updatePostError && <div>Error: Failed to make a post</div>}
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
              <Form.Label>Write a caption</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                {...register("body", { required: true })}
              />
              {errors.body && <span>{errors.body.message}</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <TagsInput {...register("tags", { required: true })} />
              {errors.tags && <span>{errors.tags.message}</span>}
            </Form.Group>

            <Form.Group className="text-center">
              <Button variant="dark" type="submit">
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
