import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, REGISTER_PATH } from "../../constants/api/Api";
import { Form, Button, Alert } from "react-bootstrap";

const url = BASE_URL + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username must not contain punctuation symbols apart from underscore (_)."
    ),
  email: yup
    .string()
    .required("Email is required")
    .matches(
      /(stud.noroff.no|noroff.no)/,
      "Invalid domain, must be either stud.noroff.no or noroff.no"
    )
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters"),
});

function RegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [resgisterError, setResgisterError] = useState(null);
  const [submitSuccessful, setSubmit] = useState(false);

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
    setResgisterError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
      setResgisterError(error.toString());
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      {resgisterError && (
        <Alert variant="warning">
          Register failed: profile already exist or try another username or
          email{" "}
        </Alert>
      )}
      {submitSuccessful && (
        <Alert variant="success">
          Success! Please go to{" "}
          <Alert.Link href="/login">login page</Alert.Link> to login
        </Alert>
      )}
      <fieldset disabled={submitting}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          {errors.name && (
            <Alert variant="warning">{errors.name.message}</Alert>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email", { required: true })} />
          {errors.email && (
            <Alert variant="warning">{errors.email.message}</Alert>
          )}
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password", { required: true })} />
          {errors.password && (
            <Alert variant="warning">{errors.password.message}</Alert>
          )}
        </Form.Group>

        <Form.Group className="text-center">
          <Button variant="outline-dark" aria-label="Submit" type="submit">
            {submitting ? "Submitting..." : "Register"}
          </Button>
          <p>
            Got an account? <a href="/login">Login here</a>
          </p>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default RegisterForm;
