import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, LOGIN_PATH } from "../../data/Api";
import AuthContext from "../../context/authContext";
import { Form, Button, Alert } from "react-bootstrap";

const url = BASE_URL + LOGIN_PATH;

const schema = yup.object().shape({
  email: yup.string().required("Please fill out email"),
  password: yup.string().required("Please fill out password"),
});

function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [passwordShown, setPasswordShown] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
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
    setLoginError(null);

    try {
      const response = await axios.post(url, data);
      setAuth(response.data);
      navigate("/home");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {loginError && (
        <Alert variant="warning">
          Login failed: Invalid username or password.
        </Alert>
      )}
      <fieldset disabled={submitting}>
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
              class="fa-regular fa-eye"
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
          <Button variant="outline-dark" type="submit" aria-label="Login">
            {submitting ? "Logging in..." : "Login"}
          </Button>
          <p>
            Not registered? <a href="/register">Register here</a>
          </p>
        </Form.Group>
      </fieldset>
    </Form>
  );
}

export default LoginForm;
