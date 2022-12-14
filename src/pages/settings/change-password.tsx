import React, { useState } from "react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../utils/validation";
import SettingsLayout from "./components/Layout";
import MessageFeedback from "../../components/feedback";
import styles from "./styles/styles.module.css";

interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePassword = () => {
  const [error, setError] = useState("");
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordDTO>({
    resolver: yupResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
    },
  });

  async function onSubmit(data: any) {
    console.log(data);
  }
  return (
    <SettingsLayout>
      <div>
        <div className={styles._title}>Change your password</div>
        <form
          className={styles._profile_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && <MessageFeedback message={error} severity="error" />}
          <div className={styles.form_control}>
            <label>Current password</label>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  variant="outlined"
                  className={styles._inputField}
                  error={Boolean(errors?.currentPassword)}
                />
              )}
            />
            {errors?.currentPassword && (
              <span className={styles.validationMessage}>
                {errors.currentPassword.message}
              </span>
            )}
          </div>
          <div className={styles.form_control}>
            <label>New password</label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  variant="outlined"
                  className={styles._inputField}
                  error={Boolean(errors?.newPassword)}
                />
              )}
            />
            {errors?.newPassword && (
              <span className={styles.validationMessage}>
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className={styles.form_control}>
            <label>Repeat new password</label>
            <Controller
              name="repeatNewPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  type="password"
                  variant="outlined"
                  className={styles._inputField}
                  error={Boolean(errors?.repeatNewPassword)}
                />
              )}
            />
            {errors?.repeatNewPassword && (
              <span className={styles.validationMessage}>
                {errors.repeatNewPassword.message}
              </span>
            )}
          </div>

          <div className={styles._submit_btn}>
            <Link to="">Cancel</Link>
            <button type="submit">Save new password</button>
          </div>
        </form>
      </div>
    </SettingsLayout>
  );
};

export default ChangePassword;
