import { Link } from "react-router-dom";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@material-ui/core";
import * as yup from "yup";
import { API } from "../../api/axios";
import "./login.scss";
import { useState } from "react";

interface ILoginInputs {
  username: string;
  password: string;
}

interface IResponse {
  data: string;
  message: string;
  status: string;
}

const schema = yup.object().shape({
  username: yup.string().required("username is required"),
  password: yup.string().min(6).required("password is required"),
});

const Login = () => {
  const [error, setError] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({ resolver: yupResolver(schema) });
  const onSubmit: SubmitHandler<ILoginInputs> = async (user) => {
    try {
      const { data } = await API.post<IResponse>("/login", user);
      localStorage.setItem("access_token", data.data);
      window.location.href = "/";
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="login-background">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <Link className="login-link" to="/register">
          Register
        </Link>
        <h1>Login</h1>
        {error && <span className="login-error">{error}</span>}
        <Controller
          name="username"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              className="login-input"
              {...field}
              label="Username"
              variant="outlined"
              error={!!errors.username}
              helperText={errors.username ? errors.username?.message : ""}
              fullWidth
              margin="dense"
            />
          )}
        />
        <Controller
          name="password"
          defaultValue=""
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="login-input"
              type="password"
              label="Password"
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password ? errors.password?.message : ""}
              fullWidth
              margin="dense"
            />
          )}
        />
        <input type="submit" value="Login" className="login-submit" />
      </form>
    </div>
  );
};

export default Login;
