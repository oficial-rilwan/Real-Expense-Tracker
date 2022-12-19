import React, { useContext, useEffect, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { MenuItem, Select, TextField } from "@mui/material";
import SettingsLayout from "./components/Layout";
import styles from "./styles/styles.module.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import countries from "../../static/countries";
import { currencies } from "../../static";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../../utils/validation";
import MessageFeedback from "../../components/feedback";
import { AuthContext } from "../../context/auth";
import userService from "../../service/userService";
import { BeatLoader } from "react-spinners";

interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  dateOfBirth: Date | null;
  country: string;
  currency?: string;
}

const EditAccount = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token, user, refreshUser } = useContext(AuthContext);

  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateUserDto>({
    resolver: yupResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      dateOfBirth: null,
      country: "",
      currency: "",
    },
  });

  async function onSubmit(data: any) {
    try {
      setLoading(true);
      await userService.updateUser(data);
      refreshUser();
      navigate("/settings");
      setLoading(false);
    } catch (ex: any) {
      setError(ex.response.data);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user) return;
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
      dateOfBirth: user?.dateOfBirth,
      country: user?.country,
      currency: user?.currency,
    });
  }, [user]);
  if (!token) return <Navigate to="/" replace={true} />;
  return (
    <SettingsLayout>
      <div>
        <div className={styles._title}>Edit Profile</div>
        <form
          className={styles._profile_form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {error && <MessageFeedback message={error} severity="error" />}
          <div className={styles.form_control}>
            <label>First name</label>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  type="text"
                  className={styles._inputField}
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
          <div className={styles.form_control}>
            <label>Last name</label>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  type="text"
                  className={styles._inputField}
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
          <div className={styles.form_control}>
            <label>Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  variant="outlined"
                  type="text"
                  className={styles._inputField}
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
          <div className={styles.form_control}>
            <label>Gender</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select
                  fullWidth
                  variant="outlined"
                  className={styles._selectField}
                  displayEmpty
                  {...field}
                  error={Boolean(errors?.gender)}
                >
                  <MenuItem value="">-- select-gender --</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              )}
            />
            {errors?.gender && (
              <span className={styles.validationMessage}>
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className={styles.form_control}>
            <label>Date of birth</label>
            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    {...field}
                    className={styles._dateField}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </div>
          <div className={styles.form_control}>
            <label>Country</label>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  variant="outlined"
                  className={styles._selectField}
                  displayEmpty
                  error={Boolean(errors?.country)}
                >
                  <MenuItem value="">-- select-country --</MenuItem>
                  {countries.map((item) => (
                    <MenuItem key={item?.name} value={item?.name}>
                      {item?.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors?.country && (
              <span className={styles.validationMessage}>
                {errors.country.message}
              </span>
            )}
          </div>
          <div className={styles.form_control}>
            <label>Preferred currency</label>
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  fullWidth
                  variant="outlined"
                  className={styles._selectField}
                  displayEmpty
                  error={Boolean(errors?.currency)}
                >
                  <MenuItem value="">-- select-currency --</MenuItem>
                  {currencies.map((item) => (
                    <MenuItem key={item?.code} value={item?.code}>
                      <span className={styles._currency_menu}>
                        {`${item.code} ${item.symbol}`}
                        <span> - {item?.name}</span>
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors?.currency && (
              <span className={styles.validationMessage}>
                {errors.currency.message}
              </span>
            )}
          </div>
          <div className={styles._submit_btn}>
            <Link to="/settings">Cancel</Link>
            {loading ? (
              <BeatLoader color="#3f6ad8" />
            ) : (
              <button type="submit">Save profile</button>
            )}
          </div>
        </form>
      </div>
    </SettingsLayout>
  );
};

export default EditAccount;
