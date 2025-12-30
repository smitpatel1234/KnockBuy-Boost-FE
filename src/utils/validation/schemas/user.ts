import * as Yup from "yup"

export const UsernameField = Yup.string()
  .max(50)
  .min(3)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/, "Invalid username").required("Username is required");

export const PasswordField = Yup.string()
  .max(50)
  .min(8)
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-&!])[A-Za-z\d-&!]{8,}$/, "Invalid password").required("Password is required");

export const EmailField = Yup.string().email().required("Email is required");

export const PhoneField = Yup.number().min(1000000000).max(9999999999).required("Phone number is required");

export const userCredentials = Yup.object({
  username: UsernameField,
  password: PasswordField,
  email: EmailField,
  phone_number: PhoneField,
});

export const UsernameAsIdentifier = Yup.object({ username: UsernameField });
export const emailAsIdentifier = Yup.object({ email: EmailField });
export const phoneNumberAsIdentifier = Yup.object({ phone_number: PhoneField });