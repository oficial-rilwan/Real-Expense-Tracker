import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";
import styles from "./styles/styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signinSchema } from "../../utils/validation";
import { AuthContext } from "../../context/auth";
import { Navigate } from "react-router-dom";
import authService from "../../service/authService";
import { BeatLoader } from "react-spinners";
import MessageFeedback from "../../components/feedback";

interface AuthDto {
  email: string;
  password: string;
}

const Auth = () => {
  const { token, saveToken } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthDto>({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const res: any = await authService.signin(data);
      saveToken(res?.data);
      window.location.replace("/");
    } catch (ex: any) {
      setLoading(false);
      setError(ex.response.data);
    }
  }
  if (token) return <Navigate to="/" replace={true} />;
  return (
    <div className={styles.auth_form}>
      <div className={styles._form_wrapper}>
        <Link to="/" className={styles.logo}>
          <AccountBalanceIcon className={styles.icon} />
          <span>RealExp</span>
        </Link>
        <p>Welcome back,</p>
        <p>Please sign in to your account</p>
        <p>
          No account? <Link to="/account/signup">Sign up now</Link>
        </p>
        {error && <MessageFeedback message={error} severity="error" />}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Divider />
          <div className={styles.form_gp}>
            <div className={styles.input_field}>
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    size="small"
                    type="email"
                    variant="outlined"
                    placeholder="Email here..."
                    error={Boolean(errors?.email)}
                  />
                )}
              />
              {errors?.email && (
                <span className={styles.validationMessage}>
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className={styles.input_field}>
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    type="password"
                    size="small"
                    placeholder="Password here..."
                    error={Boolean(errors?.password)}
                  />
                )}
              />

              {errors?.password && (
                <span className={styles.validationMessage}>
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <FormControlLabel
            className={styles.check}
            control={<Checkbox size="small" color="primary" defaultChecked />}
            label="Keep me logged in"
          />
          <Divider />
          <div className={styles.submit_wrapper}>
            <Link to="/forgot-password">Recover Password</Link>
            {loading ? (
              <BeatLoader color="#3f6ad8" />
            ) : (
              <button type="submit">Login to Account</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
