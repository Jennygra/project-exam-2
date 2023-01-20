import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, LOGIN_PATH } from "../../constants/api/Api";
import AuthContext from "../../context/AuthContext/authContext";
import { Form, Button } from "react-bootstrap";

const url = BASE_URL + LOGIN_PATH;

const schema = yup.object().shape({
  email: yup.string().required("Please fill out email"),
  password: yup.string().required("Please fill out password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      console.log("response", response.data);
      navigate("/home");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <br />

      {loginError && <div>Login failed; Invalid username or password.</div>}
      <fieldset disabled={submitting}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control {...register("email", { required: true })} />
          {errors.email && <div>{errors.email.message}</div>}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register("password", { required: true })}
            type="password"
          />
          {errors.password && <div>{errors.password.message}</div>}
        </Form.Group>
        <br />
        <Form.Group className="text-center">
          <Button variant="outline-dark" type="submit">
            {submitting ? "Logging in..." : "Login"}
          </Button>
          <p>
            Not registered? <a href="#">Register here</a>
          </p>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default LoginForm;
