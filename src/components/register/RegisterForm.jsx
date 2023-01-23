import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, REGISTER_PATH } from "../../constants/api/Api";
import { Form, Button } from "react-bootstrap";

const url = BASE_URL + REGISTER_PATH;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Your name is required")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "The name must not contain punctuation symbols apart from underscore (_)."
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
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(data) {
    setSubmitting(true);
    setResgisterError(null);

    try {
      const response = await axios.post(url, data);
      console.log("response", response.data);
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      setResgisterError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {resgisterError && <div>Register failed; profile already exist.</div>}
      <fieldset disabled={submitting}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          {errors.name && <span>{errors.name.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email", { required: true })} />
          {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control {...register("password", { required: true })} />
          {errors.password && <span>{errors.password.message}</span>}
        </Form.Group>
        <br />

        <Form.Group className="text-center">
          <Button variant="outline-dark" type="submit">
            {submitting ? "Submitting..." : "Register"}
          </Button>
          <p>
            Got an account?<a href="/login">Login here</a>
          </p>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default RegisterForm;
