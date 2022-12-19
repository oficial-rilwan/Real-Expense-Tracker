import * as yup from "yup";

const signinSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(16),
});
const signupSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(6).max(16),
  confirmPassword: yup
    .string()
    .required("Passwords does not match")
    .oneOf([yup.ref("password")], "Passwords does not match"),
});
const userSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email().required("Email is required"),
  gender: yup.string(),
  country: yup.string(),
  currency: yup.string(),
  dateOfBirth: yup.date(),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Password is required").min(6).max(16),
  newPassword: yup.string().required("New password is required").min(6).max(16),
  repeatNewPassword: yup
    .string()
    .required("Passwords does not match")
    .oneOf([yup.ref("newPassword")], "Passwords does not match"),
});
const transactionSchema = yup.object({
  date: yup.date().required("Date is required"),
  category: yup.string().required("Category is required"),
  type: yup.string().required("Type is required"),
  amount: yup.string().required("Amount is required"),
  note: yup.string(),
});

export {
  signinSchema,
  signupSchema,
  userSchema,
  passwordSchema,
  transactionSchema,
};
