import React, { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordSchema } from "../../utils/validation";
import SettingsLayout from "./components/Layout";
import MessageFeedback from "../../components/feedback";
import styles from "./styles/styles.module.css";
import { AuthContext } from "../../context/auth";
import userService from "../../service/userService";
import { BeatLoader } from "react-spinners";

interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  repeatNewPassword: string;
}

const ChangePassword = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
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
    try {
      setLoading(true);
      await userService.changePassword(data);
      navigate("/settings");
      setLoading(false);
    } catch (ex: any) {
      setError(ex.response.data);
      setLoading(false);
    }
  }
  if (!token) return <Navigate to="/" replace={true} />;
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
            <Link to="/settings">Cancel</Link>
            {loading ? (
              <BeatLoader color="#3f6ad8" />
            ) : (
              <button type="submit">Save new password</button>
            )}
          </div>
        </form>
      </div>
    </SettingsLayout>
  );
};

export default ChangePassword;
