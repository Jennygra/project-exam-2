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

function Register() {
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
          <Form.Control
            placeholder="Name"
            {...register("name", { required: true })}
          />
          {errors.name && <span>{errors.firstName.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </Form.Group>
        <br />

        <Form.Group>
          <Form.Control
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>{errors.email.message}</span>}
        </Form.Group>
        <br />

        <Button variant="dark" type="submit">
          Send
        </Button>
      </fieldset>
    </Form>
  );
}

export default Register;
