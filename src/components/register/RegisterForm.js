import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
});

function RegisterForm() {
  const [submitSuccessful, setSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    console.log(data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      setSubmit(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {submitSuccessful && (
        <div>Thank you, the form was succesfully submitted</div>
      )}
      <br />

      <fieldset>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name", { required: true })} />
          {errors.name && <span>{errors.firstName.message}</span>}
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
          {errors.password && <span>{errors.email.message}</span>}
        </Form.Group>
        <br />

        <Form.Group className="text-center">
          <Button variant="outline-dark" type="submit">
            Register
          </Button>
          <p>
            Got an account? <a href="#">Login here</a>
          </p>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default RegisterForm;
