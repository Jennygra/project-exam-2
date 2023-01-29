import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../hooks/useAxios";
import { BASE_URL, PROFILE_PATH } from "../../constants/api/Api";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const schema = yup.object().shape({
  avatar: yup.string().url(),
  banner: yup.string().url(),
});

function EditProfile(props) {
  const [submitting, setSubmitting] = useState(false);
  const [updateProfileError, setUpdateProfileError] = useState(null);
  const [submitSuccessful, setSubmit] = useState(false);

  const { name } = useParams();
  const url = BASE_URL + PROFILE_PATH + "/" + name + "/media";

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
    setUpdateProfileError(null);

    try {
      const response = await http.put(url, data);
      console.log("Update profile response", response.data);
    } catch (error) {
      console.log("error", error);
      setUpdateProfileError(error.toString());
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
          Update profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {updateProfileError && <div>Error: Failed to update profile</div>}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control {...register("avatar", { required: true })} />
              {errors.media && <span>{errors.media.message}</span>}
            </Form.Group>

            <Form.Group>
              <Form.Label>Banner</Form.Label>
              <Form.Control {...register("banner", { required: true })} />
              {errors.media && <span>{errors.media.message}</span>}
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

export default EditProfile;
