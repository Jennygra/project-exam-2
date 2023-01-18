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
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

function Login() {
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
      navigate("/admin");
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
          <Form.Control
            {...register("username", { required: true })}
            placeholder="Username"
          />
          {errors.username && <div>{errors.username.message}</div>}
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Control
            {...register("password", { required: true })}
            placeholder="Password"
            type="password"
          />
          {errors.password && <div>{errors.password.message}</div>}
        </Form.Group>
        <br />
        <Button variant="dark" type="submit">
          {submitting ? "Logging in..." : "Login"}
        </Button>
      </fieldset>
    </Form>
  );
}

export default Login;
