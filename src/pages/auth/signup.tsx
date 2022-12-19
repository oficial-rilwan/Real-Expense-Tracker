import { Checkbox, Divider, FormControlLabel, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link, Navigate } from "react-router-dom";
import styles from "./styles/styles.module.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validation";
import CreateUserDto from "../../dtos/create-user";
import MessageFeedback from "../../components/feedback";
import authService from "../../service/authService";
import { AuthContext } from "../../context/auth";
import { BeatLoader } from "react-spinners";

const SignUp = () => {
  const { saveToken, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      const res: any = await authService.signup(data);
      saveToken(res.headers["x-auth-token"]);
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
        <p className={styles.s_welcome}>Welcome,</p>
        <p className={styles.s_alt}>
          It only takes a <span>few seconds</span> to create your account
        </p>
        {error && <MessageFeedback message={error} severity="error" />}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_gp}>
            <div className={styles.input_field}>
              <label>
                First name <span>*</span>
              </label>

              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    type="text"
                    size="small"
                    placeholder="First name here..."
                    error={Boolean(errors?.firstName)}
                  />
                )}
              />

              {errors?.firstName && (
                <span className={styles.validationMessage}>
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className={styles.input_field}>
              <label>
                Last name <span>*</span>
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    type="text"
                    size="small"
                    placeholder="Last name here..."
                    error={Boolean(errors?.lastName)}
                  />
                )}
              />

              {errors?.lastName && (
                <span className={styles.validationMessage}>
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className={styles.input_field}>
            <label>
              Email <span>*</span>
            </label>
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
          <div className={styles.form_gp}>
            <div className={styles.input_field}>
              <label>
                Password <span>*</span>
              </label>
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
            <div className={styles.input_field}>
              <label>
                Repeat Password <span>*</span>
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    variant="outlined"
                    type="password"
                    size="small"
                    placeholder="Password here..."
                    error={Boolean(errors?.confirmPassword)}
                  />
                )}
              />

              {errors?.confirmPassword && (
                <span className={styles.validationMessage}>
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>
          <FormControlLabel
            className={styles.check}
            control={<Checkbox size="small" color="primary" defaultChecked />}
            label={
              <p>
                Accept our <Link to="/terms">Terms and Conditions.</Link>
              </p>
            }
          />

          <div className={styles.submit_wrapper_2}>
            <div>
              Already have an account? <Link to="/auth">Sign in</Link>
            </div>
            {loading ? (
              <BeatLoader color="#3f6ad8" />
            ) : (
              <button type="submit">Create Account</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
