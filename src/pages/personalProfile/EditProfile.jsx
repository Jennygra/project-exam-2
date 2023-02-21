import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useAxios from "../../context/useAxios";
import { BASE_URL, PROFILE_PATH } from "../../data/Api";
import { Button, Form, Alert, Modal } from "react-bootstrap";

// This function let the user to edit banner and profile image

const schema = yup.object().shape({
  avatar: yup.string().url(),
  banner: yup.string().url(),
});

function EditProfile(props) {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [updateProfileError, setUpdateProfileError] = useState(null);

  const { name } = useParams();
  const url = BASE_URL + PROFILE_PATH + "/" + name;

  const http = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await http.get(url);
        setProfile(response.data);
      } catch (error) {
        setError(error.toString());
      }
    })();
  }, []);

  async function onSubmit(data) {
    setSubmitting(true);
    setUpdateProfileError(null);

    try {
      const response = await http.put(url + "/media", data);
      console.log("Update profile response", response.data);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
      setUpdateProfileError(error.toString());
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {updateProfileError && (
            <Alert variant="danger">Error: Failed to update profile</Alert>
          )}
          <fieldset disabled={submitting}>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                defaultValue={profile.avatar}
                {...register("avatar")}
              />
              {errors.media && (
                <Alert variant="warning">{errors.media.message}</Alert>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Banner</Form.Label>
              <Form.Control
                defaultValue={profile.banner}
                {...register("banner")}
              />
              {errors.media && (
                <Alert variant="warning">{errors.media.message}</Alert>
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

export default EditProfile;
