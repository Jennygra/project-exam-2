import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, REGISTER_PATH } from "../../data/Api";
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
  const [registerError, setRegisterError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
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
    setRegisterError(null);

    try {
      const response = await axios.post(url, data);
    } catch (error) {
      console.log("error", error);
      setRegisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful && registerError === null) {
      setSubmit(true);
      reset();
    }
  }, [isSubmitSuccessful, registerError, reset]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {registerError && (
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
          <div className="password-wrapper">
            <Form.Label>Password</Form.Label>
            <i
              className="fa-regular fa-eye"
              onClick={togglePassword}
              aria-Label="Show password"
            />
          </div>
          <Form.Control
            type={passwordShown ? "text" : "password"}
            {...register("password", { required: true })}
          />
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
